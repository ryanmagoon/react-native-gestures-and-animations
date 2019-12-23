import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { loop } from "react-native-redash";
import { useMemoOne } from "use-memo-one";

import SimpleActivityIndicator from "./SimpleActivityIndicator";
import { Button, StyleGuide } from "../components";

const {
  Clock,
  Value,
  useCode,
  set,
  block,
  cond,
  startClock,
  stopClock,
  clockRunning,
  and,
  not
} = Animated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: StyleGuide.palette.background
  }
});

export default () => {
  return (
    <View style={styles.container}>
      <SimpleActivityIndicator />
    </View>
  );
};
