import React, { useState, useRef } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";

import {
  Transition,
  Transitioning,
  TransitioningView
} from "react-native-reanimated";
import { Button, Text } from "../components";

import Switch from "./Switch";
import ProfilePic from "./ProfilePic";
import SocialMediaIcons from "./SocialMediaIcons";
import Followers from "./Followers";

export { profilePic } from "./ProfilePic";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  text: {
    textAlign: "center"
  }
});

export default () => {
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <ProfilePic />
      <View>
        <Text type="title3" style={styles.text}>
          Krzysztof Magiera
        </Text>
        <Text type="headline" style={styles.text}>
          Kraków, Poland
        </Text>
      </View>
      <Followers followers={3569} following={310} />
      <SocialMediaIcons />
      <Text type="body" style={styles.text}>
        When speaking of animations, the key to success is to avoid frame drops
      </Text>
      <Button label="Follow" primary onPress={() => {}} />
    </View>
  );
};
