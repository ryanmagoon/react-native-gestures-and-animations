import * as React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import Constants from 'expo-constants'

// import { onGestureEvent } from 'react-native-redash'
import { clamp, onGestureEvent } from 'react-native-redash'
import { Card, StyleGuide, cards } from '../components'
import { CARD_HEIGHT, CARD_WIDTH } from '../components/Card'

const { Value, diffClamp, cond, set, eq, add, event } = Animated
const { width, height } = Dimensions.get('window')
const containerWidth = width
const containerHeight = height - Constants.statusBarHeight - 44
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background
  }
})
const [card] = cards

const withOffset = (
  value: Animated.Value<number>,
  state: Animated.Value<State>
) => {
  const offset = new Value(0)

  return cond(
    eq(state, State.END),
    [set(offset, add(value, offset)), offset],
    add(offset, value)
  )
}

export default () => {
  const state = new Value(State.UNDETERMINED)
  const translationX = new Value(0)
  const translationY = new Value(0)
  const gestureHandler = onGestureEvent({
    state,
    translationX,
    translationY
  })
  const translateX = clamp(
    withOffset(translationX, state),
    0,
    containerWidth - CARD_WIDTH
  )
  const translateY = clamp(
    withOffset(translationY, state),
    0,
    containerHeight - CARD_HEIGHT
  )

  return (
    <View style={styles.container}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={{ transform: [{ translateX }, { translateY }] }}>
          <Card {...{ card }} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}
