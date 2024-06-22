import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeOut,
  FlipOutXUp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from "react-native-reanimated";
import styled from "styled-components/native";
import { Entypo as Icon } from "@expo/vector-icons";

import logo from "../../assets/images/logo.png";
import airplane from "../../assets/images/airplane.png";
import profile from "../../assets/images/profile.jpeg";
import nopic from "../../assets/images/nopic.jpeg";
import {
  Button,
  CardSelect,
  Cloud,
  FlyContent,
  StatusContent
} from "../components/Airline";

interface Props {
  alingment?: "left" | "right";
  mt?: number;
  bold?: boolean;
  noResize?: boolean;
}

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

const Background = styled(Animated.View)`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const FlyInfo = styled(Animated.View)`
  width: 100%;
  height: 41%;
  overflow: hidden;
`;

const Content = styled(LinearGradient).attrs({
  colors: ["#0438AE", "#0438AE", "#859DDF"],
  start: { x: 0.5, y: -0.6 },
  end: { x: 0.5, y: 1 }
})`
  width: 100%;
  height: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 40px;
`;

const Logo = styled.Image`
  height: 33px;
  width: 180px;
`;

const TextRowContent = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 37px;
`;

const TextContent = styled.View<Props>`
  align-items: ${({ alingment = "left" }) =>
    alingment === "left" ? "flex-start" : "flex-end"};
`;

const HourContent = styled.View<Props>`
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 8px;
`;

const SmallText = styled.Text<Props>`
  color: white;
  margin-top: ${({ mt }) => (mt ? mt : 0)}px;
  font-weight: ${({ bold }) => (bold ? "600" : "normal")};
  opacity: ${({ mt }) => (mt ? 1 : 0.8)};
`;

const Airplane = styled(Animated.Image)`
  height: 200px;
  width: 360px;
  position: absolute;
  align-self: center;
  top: 27%;
  z-index: 999;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
  overflow: visible;
`;

const TicketInfo = styled(Animated.View)`
  width: 100%;
  height: 80px;
  flex-direction: row;
  background: white;
  align-items: center;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const TicketView = styled.View`
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  padding-top: 15px;
`;

const Desc = styled.Text`
  color: #16171a;
  margin-bottom: 3px;
  width: 75%;
`;

const Value = styled.Text`
  color: #16171a;
  width: 69%;
`;

const InfoContent = styled(Animated.View)`
  flex: 1;
  width: 85%;
  align-items: center;
`;

const Duration = styled.Text`
  color: #16171a;
`;

const Row = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

const ColumnView = styled.View`
  flex: 1;
`;

const Profile = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 25px;
`;

const TotalText = styled.Text`
  color: gray;
  width: 100%;
  text-align: right;
  margin-top: 40px;
`;

const TotalValue = styled.Text`
  color: #16171a;
  width: 100%;
  text-align: right;
  font-size: 18px;
  margin-top: 5px;
`;

export const AirlineScreen = () => {
  const [confirm, setConfirm] = useState(false);
  const [showFlyInfo, setShowFlyInfo] = useState(false);
  const [showCardSelect, setShowCardSelect] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  const airplaneShadowX = useSharedValue(0);
  const airplaneShadowY = useSharedValue(0);
  const airplaneScale = useSharedValue(1);
  const airplaneTranslateY = useSharedValue(0);
  const airplaneRotateZ = useSharedValue(0);

  const backgroundColor = useSharedValue("white");
  const backgroundAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value
  }));

  const airplaneAnimatedStyle = useAnimatedStyle(() => {
    airplaneShadowX.value = interpolate(
      airplaneShadowY.value,
      [0, 200],
      [0, -450]
    );
    airplaneScale.value = interpolate(
      airplaneShadowY.value,
      [0, 200],
      [1, 0.8]
    );
    airplaneTranslateY.value = interpolate(
      airplaneShadowY.value,
      [0, 200],
      [0, 60]
    );

    return {
      transform: [
        { rotateZ: airplaneRotateZ.value + "deg" },
        { scale: airplaneScale.value },
        { translateY: airplaneTranslateY.value }
      ] //console warning
    };
  });

  function handleConfirm() {
    if (showCardSelect) {
      setShowCardSelect(false);
      setConfirm(true);
      setShowStatus(true);
    } else {
      setShowCardSelect(true);
    }
  }

  useEffect(() => {
    if (confirm) {
      backgroundColor.value = withTiming("#F1F1F1", { duration: 600 });
      setTimeout(() => {
        airplaneRotateZ.value = withSequence(
          withTiming(-10, { duration: 4000 }),
          withTiming(-10, { duration: 2000 }),
          withTiming(0, { duration: 2000 })
        );
      }, 6000);
      setTimeout(() => {
        setShowStatus(false);
        backgroundColor.value = withTiming("white", { duration: 800 });
        setTimeout(() => setShowFlyInfo(true), 600);
      }, 14000);
    }
  }, [confirm]);

  return (
    <>
      <Background style={backgroundAnimatedStyle} />
      <Container>
        <StatusBar style="dark" />

        {!confirm && (
          <FlyInfo exiting={FlipOutXUp.duration(600)}>
            <Content>
              <Logo resizeMode="contain" source={logo} />
              <TextRowContent>
                <TextContent>
                  <SmallText>Los Angeles</SmallText>
                  <SmallText>LAX</SmallText>
                  <SmallText>07 Dec, 12:00</SmallText>
                </TextContent>
                <HourContent>
                  <Icon name="chevron-right" size={32} color="white" />
                  <SmallText bold mt={10}>
                    2hr 30min
                  </SmallText>
                </HourContent>
                <TextContent alingment="right">
                  <SmallText>New York City</SmallText>
                  <SmallText>NYC</SmallText>
                  <SmallText>14:30</SmallText>
                </TextContent>
              </TextRowContent>
            </Content>
          </FlyInfo>
        )}

        <Airplane
          source={airplane}
          resizeMode="contain"
          style={airplaneAnimatedStyle}
        />

        <Cloud bottom={200} confirmed={confirm} delay={2000} />
        <Cloud confirmed={confirm} bottom={-100} delay={4000} />

        {!confirm && (
          <TicketInfo exiting={FlipOutXUp.duration(600)}>
            <TicketView>
              <Desc>Flight</Desc>
              <Value>$125</Value>
            </TicketView>
            <TicketView>
              <Desc>Class</Desc>
              <Value>Premium{"\n"}Economy</Value>
            </TicketView>
            <TicketView>
              <Desc>Aircraft</Desc>
              <Value>AC737</Value>
            </TicketView>
            <TicketView>
              <Desc>Possibility</Desc>
              <Value>$125</Value>
            </TicketView>
          </TicketInfo>
        )}

        {!confirm && (
          <InfoContent exiting={FadeOut.duration(600)}>
            <Duration>
              23hr 45min <Desc>total duration</Desc>
            </Duration>
            <Row>
              <ColumnView>
                <Duration>
                  Joshua A. <Desc>firstchaircoder@gmail.com</Desc>
                </Duration>
              </ColumnView>

              <Profile source={nopic} />
            </Row>
            <Row>
              <ColumnView>
                <Duration>
                  Andrea R.{"\n"}
                  <Desc>andrea@gmail.com</Desc>
                </Duration>
              </ColumnView>
              <Profile source={profile} />
            </Row>

            <TotalText>Total you will pay</TotalText>
            <TotalValue>$ 1,536.00</TotalValue>
          </InfoContent>
        )}

        {(!confirm || showFlyInfo) && (
          <Button showFlyInfo={showFlyInfo} onPress={handleConfirm} />
        )}

        {showCardSelect && <CardSelect />}

        {showStatus && <StatusContent />}

        {showFlyInfo && <FlyContent />}
      </Container>
    </>
  );
};
