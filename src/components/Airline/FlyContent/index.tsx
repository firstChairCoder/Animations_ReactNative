import { useEffect } from "react";
import { BlurView } from "expo-blur";
import { StatusBar } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import styled from "styled-components/native";
import { Entypo as Icon } from "@expo/vector-icons";

import logo from "../../../../assets/images/logo.png";
import profile from "../../../../assets/images/profile.jpeg";
import nopic from "../../../../assets/images/nopic.jpeg";

interface Props {
  alignment?: "left" | "right";
  mt?: number;
  bold?: boolean;
  noResize?: boolean;
}

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  position: absolute;
  top: 0;
`;

const Header = styled(Animated.View)`
  width: 100%;
  height: 320px;
  align-items: center;
  background: #0438ae;
`;

const HeaderInfoText = styled(Animated.Text)<Props>`
  color: white;
  font-size: 16px;
  margin-top: 50px;
  opacity: 0.5;
`;

const HeaderContent = styled(Animated.View)`
  width: 85%;
  height: 200px;
  border-radius: 20px;
  margin-top: -220px;
  align-items: center;
  padding-top: 10px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
`;

const HeaderText = styled.Text<Props>`
  color: white;
  font-size: 16px;
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
  opacity: ${({ bold }) => (bold ? 1 : 0.7)};
`;

const Logo = styled.Image`
  height: 33px;
  width: 100px;
  margin-bottom: 10px;
`;

const FlyInfo = styled(Animated.View)`
  width: 85%;
  overflow: hidden;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-top: -85px;
`;

const FlyInfoContent = styled(BlurView)`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const TextRowContent = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const TextContent = styled.View<Props>`
  align-items: ${({ alignment = "left" }) =>
    alignment === "left" ? "flex-start" : "flex-end"};
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

const LargeText = styled.Text`
  color: white;
  font-size: 35px;
`;

const TicketInfo = styled.View`
  width: 100%;
  height: 80px;
  flex-direction: row;
  align-items: center;
  margin-top: 100px;
`;

const TicketView = styled.View`
  flex: 1;
  height: 100%;
  justify-content: flex-start;
  padding-top: 15px;
`;

const Desc = styled.Text`
  color: gray;
  margin-bottom: 3px;
`;

const Value = styled.Text`
  color: black;
`;

const Duration = styled.Text`
  color: black;
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
  text-align: left;
  margin-top: 40px;
`;

const TotalValue = styled.Text`
  color: gray;
  width: 100%;
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
`;

export const FlyContent = () => {
  const headertranslateY = useSharedValue(-320);
  const headerContentTranslateY = useSharedValue(320);
  const headerContentopacity = useSharedValue(0);

  const headerAnimatedStyled = useAnimatedStyle(() => ({
    transform: [{ translateY: headertranslateY.value }]
  }));

  const headerContentAnimatedStyled = useAnimatedStyle(() => ({
    transform: [{ translateY: headerContentTranslateY.value }]
  }));

  useEffect(() => {
    headertranslateY.value = withTiming(0, { duration: 700 });
    headerContentTranslateY.value = withTiming(0, { duration: 900 });
    headerContentopacity.value = withTiming(1, { duration: 700 });
  }, []);

  return (
    <Container>
      <StatusBar barStyle={"light-content"} />
      <Header style={headerAnimatedStyled}>
        <HeaderInfoText>Swipe down to see options</HeaderInfoText>
      </Header>
      <HeaderContent style={headerContentAnimatedStyled}>
        <Logo source={logo} resizeMode="contain" />
        <HeaderText>Your order has been submitted.</HeaderText>
        <HeaderText>We are waiting for booking confirmation.</HeaderText>
      </HeaderContent>
      <FlyInfo>
        <FlyInfoContent intensity={80}>
          <TextRowContent>
            <TextContent>
              <SmallText>Los Angeles</SmallText>
              <LargeText>LAX</LargeText>
              <SmallText>07 Dec, 12:00</SmallText>
            </TextContent>
            <HourContent>
              <Icon name="chevron-right" size={32} color={"white"} />
              <SmallText bold mt={10}>
                2hr 30min
              </SmallText>
            </HourContent>

            <TextContent alignment="right">
              <SmallText>New York</SmallText>
              <LargeText>NYC</LargeText>
              <SmallText>14:30</SmallText>
            </TextContent>
          </TextRowContent>

          <TicketInfo>
            <TicketView>
              <Desc>Flight</Desc>
              <Value>CX737</Value>
            </TicketView>

            <TicketView>
              <Desc>Class</Desc>
              <Value>Premium</Value>
            </TicketView>

            <TicketView>
              <Desc>Aircraft</Desc>
              <Value>Boeing - 737</Value>
            </TicketView>

            <TicketView>
              <Desc>Possibility</Desc>
              <Value>CX737</Value>
            </TicketView>
          </TicketInfo>

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

          <TotalText>Total price</TotalText>
          <TotalValue>$ 1,536.00</TotalValue>
        </FlyInfoContent>
      </FlyInfo>
    </Container>
  );
};
