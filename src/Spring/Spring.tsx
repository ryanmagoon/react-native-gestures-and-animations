import * as React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import Constants from 'expo-constants'

import { clamp, onGestureEvent } from 'react-native-redash'
import { Card, StyleGuide, cards } from '../components'
import { CARD_HEIGHT, CARD_WIDTH } from '../components/Card'

const {
  Clock,
  Value,
  diffClamp,
  cond,
  set,
  eq,
  add,
  decay,
  clockRunning,
  startClock,
  stopClock,
  block,
  and,
  not,
  neq,
  spring
} = Animated
const { width, height } = Dimensions.get('window')
const containerWidth = width
const containerHeight = height - Constants.statusBarHeight - 44
const snapX = (containerWidth - CARD_WIDTH) / 2
const snapY = (containerHeight - CARD_HEIGHT) / 2
const offsetX = new Value(snapX)
const offsetY = new Value(snapY)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background
  }
})
const [card] = cards

const withSpring = (
  value: Animated.Value<number>,
  velocity: Animated.Value<number>,
  gestureState: Animated.Value<State>,
  offset: Animated.Value<number>,
  snapPoint: number
) => {
  const clock = new Clock()
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0)
  }
  const config = {
    damping: 10,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    toValue: snapPoint
  }

  const isDecayInterrupted = and(
    eq(gestureState, State.BEGAN),
    clockRunning(clock)
  )
  const finishDecay = [set(offset, state.position), stopClock(clock)]

  return block([
    cond(isDecayInterrupted, finishDecay),
    cond(
      eq(gestureState, State.END),
      [
        cond(and(not(clockRunning(clock)), not(state.finished)), [
          set(state.velocity, velocity),
          set(state.time, 0),
          startClock(clock)
        ]),
        spring(clock, state, config),
        cond(state.finished, finishDecay)
      ],
      [set(state.finished, 0), set(state.position, add(offset, value))]
    ),
    state.position
  ])
}

export default () => {
  const state = new Value(State.UNDETERMINED)
  const translationX = new Value(0)
  const translationY = new Value(0)
  const velocityX = new Value(0)
  const velocityY = new Value(0)
  const gestureHandler = onGestureEvent({
    state,
    translationX,
    translationY,
    velocityX,
    velocityY
  })
  const translateX = clamp(
    withSpring(translationX, velocityX, state, offsetX, snapX),
    0,
    containerWidth - CARD_WIDTH
  )
  const translateY = clamp(
    withSpring(translationY, velocityY, state, offsetY, snapY),
    0,
    containerHeight - CARD_HEIGHT
  )
  return (
    <View style={styles.container}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            transform: [{ translateX }, { translateY }]
          }}
        >
          <Card {...{ card }} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}
