import * as React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import Constants from 'expo-constants'

// import { onGestureEvent } from 'react-native-redash'
import { onGestureEvent } from 'react-native-redash'
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

export default () => {
  const state = new Value(State.UNDETERMINED)
  const translationX = new Value(0)
  const translationY = new Value(0)
  const gestureHandler = onGestureEvent({
    state,
    translationX,
    translationY
  })
  const translateX = translationX
  const translateY = translationY

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
