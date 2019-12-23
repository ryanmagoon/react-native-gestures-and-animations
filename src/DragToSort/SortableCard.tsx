import React from "react";
import { Dimensions } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { panGestureHandler } from "react-native-redash";

import Card, {
  CardProps,
  CARD_HEIGHT as INNER_CARD_HEIGHT
} from "../components/Card";

export const CARD_HEIGHT = INNER_CARD_HEIGHT + 32;
const { width } = Dimensions.get("window");
const {
  Value,
  eq,
  cond,
  useCode,
  divide,
  floor,
  max,
  multiply,
  block,
  set,
  diff,
  lessThan,
  add,
  greaterThan,
  abs,
  not
} = Animated;

interface SortableCardProps extends CardProps {
  offsets: Animated.Value<number>[];
  index: number;
}

export default ({ card, index, offsets }: SortableCardProps) => {
  return (
    <PanGestureHandler>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width,
          height: CARD_HEIGHT,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Card {...{ card }} />
      </Animated.View>
    </PanGestureHandler>
  );
};
