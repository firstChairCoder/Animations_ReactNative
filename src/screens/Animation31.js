/* eslint-disable react-native/no-inline-styles */
// Inspo: https://dribbble.com/shots/5935613-Marvel-Movies-Interaction
//WIP!
import React, { Component } from "react";
import {
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { PanGestureHandler } from "react-native-gesture-handler";

import superheroes from "../mockdata/heroesData";

const { width, height } = Dimensions.get("window");
const MAX_CARDS_DISPLAYED = 4;
const ADVANCE_THRESHOLD = 0.2; // % of screen swipe horizontal
const GESTURE_STATES = [
  "UNDETERMINED",
  "FAILED",
  "BEGAN",
  "CANCELLED",
  "ACTIVE",
  "END",
];
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  flexOne: {
    flex: 1,
  },
  backgroundContainer: {
    borderRadius: 40,
  },
  innerBackgroundContainer: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  navBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 60,
    left: 25,
    right: 25,
    zIndex: 100,
  },
  backArrowContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
  },
  moviesHeaderText: {
    fontFamily: "serif",
    fontSize: 36,
    letterSpacing: 1.8,
  },
  dummy: {
    width: 50,
  },
  card: {
    borderRadius: 40,
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  heroImage: {
    alignSelf: "center",
    position: "absolute",
  },
  paddedContainer: {
    flex: 1,
    paddingTop: 200,
    paddingHorizontal: 40,
  },
  heroHeaderText: {
    color: "#FFFFFF",
    fontSize: 70,
    fontFamily: "serif",
    fontWeight: "bold",
    lineHeight: 76,
  },
  subHeaderText: {
    fontFamily: "serif",
    fontWeight: "bold",
    fontSize: 28,
  },
  knowMoreContainer: {
    marginTop: 20,
  },
  knowMoreText: {
    color: "#FFB23E",
    fontFamily: "serif",
    fontWeight: "bold",
    fontSize: 22,
    letterSpacing: 1.8,
  },
  nameRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  marvelLogo: {
    height: 25,
    left: -20,
    width: 68,
  },
  bodyTextContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(0,0,0,0.2)",
    paddingVertical: 15,
    marginBottom: 15,
  },
  bodyText: {
    fontFamily: "serif",
    fontWeight: "200",
    fontSize: 16,
    lineHeight: 32,
  },
  moviesContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  movieImage: {
    borderRadius: 15,
    height: 250,
    width: (width - 80) / 2 - 15,
  },
});

export default class Animation31 extends Component {
  slideUp = new Animated.Value(0);
  slideUpValue = 0;
  slideUpImage = new Animated.Value(0);
  slideUpHeader = new Animated.Value(0);
  slideUpName = new Animated.Value(0);
  slideUpPhaseTwo = new Animated.Value(0);
  slideUpBody = new Animated.Value(0);
  slideUpMoviesHeader = new Animated.Value(0);
  slideUpMovies0 = new Animated.Value(0);
  slideUpMovies1 = new Animated.Value(0);
  progress = new Animated.Value(0);
  progressValue = 0;
  progressPreviousValue = 0;
  screenWidth = width;
  screenHeight = height;

  state = {
    activeIndex: 0,
  };

  componentDidMount() {
    this.progress.addListener(({ value }) => (this.progressValue = value));
    this.slideUp.addListener(({ value }) => (this.slideUpValue = value));
  }

  onGestureEvent = (e) => {
    if (this.slideUpValue > 0) {
      return;
    }

    const { translationX } = e.nativeEvent;
    const adjustedX = -translationX / this.screenWidth;
    const newValue = Math.max(
      0,
      Math.min(superheroes.length - 1, this.progressPreviousValue + adjustedX)
    );
    this.progress.setValue(newValue);
  };

  onHandlerStateChange = (e) => {
    if (this.slideUpValue > 0) {
      return;
    }

    const { state } = e.nativeEvent;
    if (GESTURE_STATES[state] === "END") {
      this.finishSwipe();
    }
  };

  finishSwipe() {
    const swipeDiff = this.progressValue - this.progressPreviousValue;
    const direction = swipeDiff < 0 ? "right" : "left";
    let toValue =
      direction === "left"
        ? Math.floor(this.progressPreviousValue)
        : Math.ceil(this.progressPreviousValue);
    if (Math.abs(swipeDiff) > ADVANCE_THRESHOLD) {
      toValue =
        direction === "left"
          ? Math.ceil(this.progressValue)
          : Math.floor(this.progressValue);
    }
    Animated.timing(this.progress, {
      toValue,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      this.progressPreviousValue = toValue;
      this.setState({ activeIndex: toValue });
    });
  }

  getSpringAnimations(animatedValKeys, toValue) {
    return animatedValKeys.map((key) =>
      Animated.spring(this[key], { toValue, speed: 5 })
    );
  }

  onKnowMoreTextPress = () => {
    Animated.stagger(1000, [
      Animated.stagger(300, [
        Animated.stagger(
          100,
          this.getSpringAnimations(["slideUp", "slideUpImage"], 1)
        ),
        Animated.stagger(
          100,
          this.getSpringAnimations(["slideUpHeader", "slideUpName"], 1)
        ),
      ]),
      Animated.stagger(100, [
        Animated.timing(this.slideUpPhaseTwo, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.linear),
          useNativeDriver: true,
        }),
        ...this.getSpringAnimations(
          [
            "slideUpBody",
            "slideUpMoviesHeader",
            "slideUpMovies0",
            "slideUpMovies1",
          ],
          1
        ),
      ]),
    ]).start();
  };

  onBackArrowPress = () => {
    const animations = this.getSpringAnimations(
      [
        "slideUpMovies1",
        "slideUpMovies0",
        "slideUpMoviesHeader",
        "slideUpBody",
        "slideUpPhaseTwo",
        "slideUpName",
        "slideUpHeader",
        "slideUpImage",
        "slideUp",
      ],
      0
    );
    Animated.stagger(50, animations).start();
  };

  getStyleForHeroImageAtIndex(hero, index) {
    const opacityInputRange = Array(superheroes.length)
      .fill()
      .map((_, i) => i);
    const opacityOutputRange = Array(superheroes.length)
      .fill()
      .map((_, i) => {
        if (i > index) {
          return 0;
        } else if (i === index) {
          return 1;
        } else {
          return 0.3;
        }
      });

    return [
      {
        opacity: this.progress.interpolate({
          inputRange: opacityInputRange,
          outputRange: opacityOutputRange,
          extrapolate: "clamp",
        }),
        top: this.progress.interpolate({
          inputRange: [index - 0.5, index, index + 0.1, index + 0.6],
          outputRange: [-50, -125, -125, -50],
          extrapolate: "clamp",
        }),
        transform: [
          {
            scale: this.progress.interpolate({
              inputRange: [index - 0.5, index, index + 0.1, index + 0.4],
              outputRange: [0.3, 1, 1, 0.3],
              extrapolate: "clamp",
            }),
          },
          {
            translateY:
              this.state.activeIndex === index
                ? this.slideUpImage.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -125],
                  })
                : 0,
          },
        ],
      },
    ];
  }

  getStyleForCardAtIndex(hero, index) {
    const opacityInputRange = Array(superheroes.length)
      .fill()
      .map((_, i) => i);
    const opacityOutputRange = Array(superheroes.length)
      .fill()
      .map((_, i) => {
        if (i > index) {
          return 0;
        } else if (i === index) {
          return 1;
        } else {
          return Math.max(0, i - (index - MAX_CARDS_DISPLAYED)) / 50;
        }
      });

    return [
      {
        opacity: this.progress.interpolate({
          inputRange: opacityInputRange,
          outputRange: opacityOutputRange,
        }),
      },
      {
        transform: [
          {
            scale: this.progress.interpolate({
              inputRange: [index - 1, index],
              outputRange: [0.95, 1],
            }),
          },
          {
            translateY: this.progress.interpolate({
              inputRange: [index - 1, index],
              outputRange: [this.screenHeight * 0.3, this.screenHeight * 0.335],
            }),
          },
          {
            translateX: this.progress.interpolate({
              inputRange: [index, index + 1],
              outputRange: [0, -200],
              extrapolate: "clamp",
            }),
          },
          {
            rotate: this.progress.interpolate({
              inputRange: [index, index + 0.25],
              outputRange: ["0deg", "-15deg"],
              extrapolate: "clamp",
            }),
          },
        ],
      },
    ];
  }

  render() {
    return (
      <View style={styles.container}>
        {superheroes.map((hero, index) => {
          const isActiveCard = this.state.activeIndex === index;
          return (
            <PanGestureHandler
              key={hero.key}
              onGestureEvent={this.onGestureEvent}
              onHandlerStateChange={this.onHandlerStateChange}
            >
              <Animated.View
                pointerEvents={isActiveCard ? "auto" : "none"}
                zIndex={superheroes.length - index}
                style={[
                  styles.card,
                  ...this.getStyleForCardAtIndex(hero, index),
                ]}
              >
                <Animated.View
                  style={[
                    StyleSheet.absoluteFillObject,
                    styles.backgroundContainer,
                    {
                      backgroundColor: "#FFFFFF",
                      transform: [
                        {
                          translateY: isActiveCard
                            ? this.slideUp.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, -300],
                              })
                            : 0,
                        },
                      ],
                    },
                  ]}
                >
                  <Animated.View
                    style={[
                      StyleSheet.absoluteFillObject,
                      styles.innerBackgroundContainer,
                      {
                        bottom: isActiveCard
                          ? this.slideUpPhaseTwo.interpolate({
                              inputRange: [0, 1],
                              outputRange: [-700, this.screenHeight],
                            })
                          : 0,
                        transform: [
                          {
                            translateY: isActiveCard
                              ? this.slideUp.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [0, -300],
                                })
                              : 0,
                          },
                        ],
                      },
                    ]}
                  >
                    <LinearGradient
                      colors={[hero.backgroundColor, "#FFFFFF"]}
                      style={[styles.innerBackgroundContainer, styles.flexOne]}
                      start={{ x: 0, y: 0.75 }}
                      end={{ x: 0, y: 1 }}
                    />
                    <Animated.View
                      style={[
                        StyleSheet.absoluteFillObject,
                        styles.innerBackgroundContainer,
                        {
                          backgroundColor: this.progress.interpolate({
                            inputRange: [index - 1, index],
                            outputRange: ["#000000", "transparent"],
                          }),
                        },
                      ]}
                    />
                  </Animated.View>
                </Animated.View>
                <View style={styles.paddedContainer}>
                  <Animated.Image
                    source={hero.imgSrc}
                    style={[
                      styles.heroImage,
                      hero.style,
                      ...this.getStyleForHeroImageAtIndex(hero, index),
                    ]}
                  />
                  <Animated.Text
                    style={[
                      styles.heroHeaderText,
                      {
                        color: isActiveCard
                          ? this.slideUpPhaseTwo.interpolate({
                              inputRange: [0, 1],
                              outputRange: ["#FFFFFF", "#000000"],
                            })
                          : "#FFFFFF",
                        transform: [
                          {
                            translateY: isActiveCard
                              ? this.slideUpHeader.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [0, -150],
                                })
                              : 0,
                          },
                        ],
                      },
                    ]}
                  >
                    {hero.header}
                  </Animated.Text>
                  <Animated.View
                    style={[
                      styles.nameRow,
                      {
                        transform: [
                          {
                            translateY: isActiveCard
                              ? this.slideUpName.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [0, -150],
                                })
                              : 0,
                          },
                        ],
                      },
                    ]}
                  >
                    <Animated.Text
                      style={[
                        styles.subHeaderText,
                        {
                          color: isActiveCard
                            ? this.slideUpPhaseTwo.interpolate({
                                inputRange: [0, 1],
                                outputRange: ["#FFFFFF", "#000000"],
                              })
                            : "#FFFFFF",
                        },
                      ]}
                    >
                      {hero.name}
                    </Animated.Text>
                    <Animated.Image
                      source={require("../../assets/images/heroes/marvel-logo.png")}
                      style={[
                        styles.marvelLogo,
                        {
                          opacity: isActiveCard
                            ? this.slideUpBody.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1],
                              })
                            : 0,
                          transform: [
                            {
                              scale: isActiveCard
                                ? this.slideUpBody.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 1],
                                  })
                                : 0,
                            },
                          ],
                        },
                      ]}
                    />
                  </Animated.View>
                  <Animated.View
                    style={[
                      styles.knowMoreContainer,
                      {
                        opacity: isActiveCard
                          ? this.slideUp.interpolate({
                              inputRange: [0, 1],
                              outputRange: [1, 0],
                            })
                          : 1,
                        transform: [
                          {
                            translateX: isActiveCard
                              ? this.slideUp.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [0, 50],
                                })
                              : 0,
                          },
                        ],
                      },
                    ]}
                  >
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={this.onKnowMoreTextPress}
                    >
                      <Text style={styles.knowMoreText}>know more ⟶</Text>
                    </TouchableOpacity>
                  </Animated.View>
                  <Animated.View
                    style={[
                      styles.bodyTextContainer,
                      {
                        opacity: isActiveCard
                          ? this.slideUpBody.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, 1],
                            })
                          : 0,
                        transform: [
                          {
                            translateY: isActiveCard
                              ? this.slideUpBody.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [0, -170],
                                })
                              : 0,
                          },
                        ],
                      },
                    ]}
                  >
                    <Text style={styles.bodyText}>
                      {hero.bodyText.slice(0, 170)}
                      ...
                      <Text style={{ color: hero.backgroundColor }}>
                        {" see more"}
                      </Text>
                    </Text>
                  </Animated.View>
                  <Animated.Text
                    style={[
                      styles.subHeaderText,
                      {
                        opacity: isActiveCard
                          ? this.slideUpMoviesHeader.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, 1],
                            })
                          : 0,
                        transform: [
                          {
                            translateY: isActiveCard
                              ? this.slideUpMoviesHeader.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [0, -170],
                                })
                              : 0,
                          },
                        ],
                      },
                    ]}
                  >
                    movies
                  </Animated.Text>
                  <View style={styles.moviesContainer}>
                    {[0, 1].map((n) => (
                      <Animated.Image
                        key={n}
                        source={hero.movieImgSrc[n]}
                        style={[
                          styles.movieImage,
                          {
                            opacity: isActiveCard
                              ? this[`slideUpMovies${n}`].interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [0, 1],
                                })
                              : 0,
                            transform: [
                              {
                                translateY: isActiveCard
                                  ? this[`slideUpMovies${n}`].interpolate({
                                      inputRange: [0, 1],
                                      outputRange: [0, -170],
                                    })
                                  : 0,
                              },
                            ],
                          },
                        ]}
                      />
                    ))}
                  </View>
                </View>
              </Animated.View>
            </PanGestureHandler>
          );
        })}
        <View style={styles.navBar}>
          <TouchableOpacity
            onPress={this.onBackArrowPress}
            style={styles.backArrowContainer}
          >
            <Image source={require("../../assets/images/heroes/back.png")} />
          </TouchableOpacity>
          <Animated.Text
            style={[
              styles.moviesHeaderText,
              {
                transform: [
                  {
                    translateY: this.slideUp.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -100],
                    }),
                  },
                ],
              },
            ]}
          >
            movies
          </Animated.Text>
          <View style={styles.dummy} />
        </View>
      </View>
    );
  }
}
