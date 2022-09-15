import React from "react";
import {
  PanGestureHandler,
  State as GestureState,
} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
const {
  event,
  cond,
  block,
  set,
  eq,
  not,
  clockRunning,
  and,
  startClock,
  stopClock,
  spring,
  lessThan,
  call,
} = Animated;

class SwipeRow extends React.Component {
  clock = new Animated.Clock();
  gestureState = new Animated.Value(GestureState.UNDETERMINED);
  animState = {
    finished: new Animated.Value(0),
    position: new Animated.Value(0),
    velocity: new Animated.Value(0),
    time: new Animated.Value(0),
  };
  animConfig = {
    toValue: new Animated.Value(0),
    damping: 20,
    mass: 0.2,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 0.2,
    restDisplacementThreshold: 0.2,
  };

  onHandlerStateChange = event([
    {
      nativeEvent: ({ state }) =>
        block([
          set(this.gestureState, state),
          cond(
            and(eq(state, GestureState.END), not(clockRunning(this.clock))),
            startClock(this.clock)
          ),
        ]),
    },
  ]);

  onGestureEvent = event([
    {
      nativeEvent: ({ translationX }) =>
        block([
          cond(eq(this.gestureState, GestureState.ACTIVE), [
            set(this.animState.position, translationX),
            cond(
              lessThan(translationX, this.props.swipeThreshold),
              call([this.animState.position], () =>
                this.props.onSwipe(this.props.item)
              )
            ),
          ]),
        ]),
    },
  ]);

  animatedCodeHandler = () =>
    block([
      cond(clockRunning(this.clock), [
        spring(this.clock, this.animState, this.animConfig),
        cond(this.animState.finished, [
          stopClock(this.clock),
          set(this.animState.finished, 0),
        ]),
      ]),
    ]);

  render() {
    return (
      <PanGestureHandler
        minDeltaX={10}
        onGestureEvent={this.onGestureEvent}
        onHandlerStateChange={this.onHandlerStateChange}
      >
        <Animated.View
          style={{
            flex: 1,
            transform: [{ translateX: this.animState.position }],
          }}
        >
          <Animated.Code>{this.animatedCodeHandler}</Animated.Code>
          {this.props.children}
        </Animated.View>
      </PanGestureHandler>
    );
  }
}

export default SwipeRow;
