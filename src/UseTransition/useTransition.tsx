import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import {
  bInterpolate,
  transformOrigin,
  useTransition
} from "react-native-redash";

import { Button, Card, StyleGuide, cards } from "../components";

const { multiply, interpolate, not } = Animated;
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end"
  }
});

export default () => {
  return (
    <View style={styles.container}>
      {cards.map((card, index) => {
        return (
          <Animated.View key={card.id}>
            <Card {...{ card }} />
          </Animated.View>
        );
      })}
      <Button label="Start" primary onPress={() => true} />
    </View>
  );
};
