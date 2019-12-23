import React from "react";
import {
  Dimensions,
  ImageStyle,
  StyleSheet,
  View,
  ViewStyle
} from "react-native";

import { FlexibleCard as Card, StyleGuide, cards } from "../components";

interface Layout {
  id: string;
  name: string;
  layout: {
    container: ViewStyle;
    child?: ImageStyle;
  };
}
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background
  }
});

export default () => {
  return (
    <View style={styles.container}>
      {cards.map(card => (
        <Card key={card.id} style={{}} {...{ card }} />
      ))}
    </View>
  );
};
