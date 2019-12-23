import React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { cards } from "../components";
import SortableCard, { CARD_HEIGHT } from "./SortableCard";

const { Value } = Animated;
export default () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {cards.map((card, index) => (
        <SortableCard key={card.id} {...{ card, index }} />
      ))}
    </View>
  );
};
