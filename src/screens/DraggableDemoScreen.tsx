//this is the basic draggable seen in the repo for RNGH. Just tryna see something
import { Component } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { Animated, ScrollView, StyleSheet } from "react-native";
import type {
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent
} from "react-native-gesture-handler";
import { PanGestureHandler, State } from "react-native-gesture-handler";

import { LoremIpsum } from "../utils/loremIpsum";

const styles = StyleSheet.create({
  box: {
    alignSelf: "center",
    backgroundColor: "lime",
    height: 150,
    margin: 8,
    width: 150,
    zIndex: 99
  }
});

interface DraggableScreenProps {
  minDist?: number;
  boxStyle?: StyleProp<ViewStyle>;
}

export class DraggableBox extends Component<DraggableBoxProps> {
  private translateX: Animated.Value;
  private translateY: Animated.Value;
  private lastOffset: { x: number; y: number };
  private onGestureEvent: (event: PanGestureHandlerGestureEvent) => void;
  constructor(props: DraggableBoxProps) {
    super(props);
    this.translateX = new Animated.Value(0);
    this.translateY = new Animated.Value(0);
    this.lastOffset = { x: 0, y: 0 };
    this.onGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this.translateX,
            translationY: this.translateY
          }
        }
      ],
      { useNativeDriver: true }
    );
  }

  private onHandlerStateChange = (event: PanGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.lastOffset.x += event.nativeEvent.translationX;
      this.lastOffset.y += event.nativeEvent.translationY;
      this.translateX.setOffset(this.lastOffset.x);
      this.translateX.setValue(0);
      this.translateY.setOffset(this.lastOffset.y);
      this.translateY.setValue(0);
    }
  };

  render() {
    return (
      <PanGestureHandler
        {...this.props}
        minDist={this.props.minDist}
        onGestureEvent={this.onGestureEvent}
        onHandlerStateChange={this.onHandlerStateChange}
      >
        <Animated.View
          style={[
            styles.box,
            {
              transform: [
                { translateX: this.translateX },
                { translateY: this.translateY }
              ]
            },
            this.props.boxStyle
          ]}
        />
      </PanGestureHandler>
    );
  }
}

export class DraggableDemoScreen extends Component {
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <LoremIpsum words={50} />
        <DraggableBox />
        <LoremIpsum />
      </ScrollView>
    );
  }
}
