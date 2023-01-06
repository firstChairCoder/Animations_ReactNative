import { React } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import {
	Skia,
	Image,
	Circle,
	Box,
	Canvas,
	Group,
	Mask,
	useImage,
	rrect,
	rect,
	useComputedValue,
	useValue,
	RadialGradient,
	vec,
	Shadow,
	useSharedValueEffect,
	interpolate,
	Extrapolate
} from "@shopify/react-native-skia";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	useAnimatedReaction,
	useAnimatedSensor,
	SensorType,
	useSharedValue,
} from "react-native-reanimated";

import { toMatrix3, processTransform3d } from "../utils/Matrix4";
import { degreeToRad} from "../utils/degreeToRad"

const { width, height } = Dimensions.get("screen")
const styles = StyleSheet.create({
	placeholder: {
		backgroundColor: "rgba(0,0,0,0.5)",
		borderRadius: 6,
	},
	text: {
		color: "rgba(255,255,255,0.8)",
		fontWeight: "500",
		fontSize: 20,
	},
	textWrapper: {
		height: 60,
		backgroundColor: "#17161A",
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 32,
		borderRadius: 12,
	},
});

export const SensorRotationScreen = () => {
	const insets = useSafeAreaInsets();
	const SIZE = width - 100;
	const y = 100;
	const x = (width - SIZE) / 2;
	const image = useImage(require("../../assets/images/nft.png"));
	const lightXOrigin = width / 2;
	const lightYOrigin = (SIZE + y) / 2;

	const rotateX = useValue(0);
	const rotateY = useValue(0);
	const lightX = useValue(0);
	const lightY = useValue(0);
	const pitch = useSharedValue(0);
	const roll = useSharedValue(0);
	const animatedSensor = useAnimatedSensor(SensorType.ROTATION, {
		interval: 1,
	});

	useAnimatedReaction(
		() => animatedSensor.sensor.value,
		(s) => {
			pitch.value = s.pitch;
			roll.value = s.roll;
		},
		[]
	);

	useSharedValueEffect(
		() => {
			lightX.current = interpolate(
				roll.value,
				[-Math.PI, Math.PI],
				[-500 * 2, 500 * 2]
			);

			lightY.current = interpolate(
				pitch.value,
				[-Math.PI, Math.PI],
				[-500 * 2, 500 * 2]
			);

			rotateY.current = interpolate(
				roll.value,
				[-Math.PI, Math.PI],
				[degreeToRad(40), degreeToRad(-40)],
				Extrapolate.CLAMP
			);

			rotateX.current = interpolate(
				pitch.value,
				[-Math.PI, Math.PI],
				[degreeToRad(40), degreeToRad(-40)],
				Extrapolate.CLAMP
			);
		},
		roll,
		pitch
	);

	const nft = image && (
		<Group clip={rrect(rect(x, y, SIZE, SIZE), 24, 24)}>
			<Image
				image={image}
				x={x}
				y={y}
				width={SIZE}
				height={SIZE}
				rect={rect(x, y, SIZE, SIZE)}
			/>
		</Group>
	);

	const matrix = useComputedValue(() => {
		const mat3 = toMatrix3(
			processTransform3d([
				{ perspective: 300 },
				{ rotateY: rotateY.current },
				{ rotateX: rotateX.current },
			])
		);

		return Skia.Matrix(mat3);
	}, [rotateX, rotateY]);

	const mask = (
		<Box box={rrect(rect(x, y, SIZE, SIZE), 24, 24)}>
			<Shadow dx={12} dy={12} blur={25} color="black" />
		</Box>
	);

	const transform = useComputedValue(
		() => [{ translateX: lightX.current }, { translateY: lightY.current }],
		[lightX, lightY]
	);

	const light = (
		<Group
			origin={vec(lightXOrigin, lightYOrigin)}
			transform={transform}
			blendMode="plus"
		>
			<Circle cy={lightYOrigin} cx={lightXOrigin} r={256}>
				<RadialGradient
					c={vec(lightXOrigin, lightYOrigin)}
					r={128}
					mode="clamp"
					colors={[
						"rgba(255,255,255,0.4)",
						"rgba(255,255,255,0.25)",
						"rgba(255,255,255,0.05)",
					]}
				/>
			</Circle>
		</Group>
	);

	return (
		<View style={{ flex: 1 }}>
			<Canvas style={{ width: "100%", height: SIZE + 100 + y }}>
				<Group origin={{ x: width / 2, y: height / 2 }} matrix={matrix}>
					<Mask clip mask={mask}>
						{nft}
					</Mask>
				</Group>
				{light}
			</Canvas>

			<View style={{ top: -60, marginHorizontal: 50 }}>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<View
						style={[styles.placeholder, { height: 24, width: 80 }]}
					/>
					<View
						style={[styles.placeholder, { height: 24, width: 80 }]}
					/>
				</View>
			</View>

			<View style={{ flex: 1, marginHorizontal: 50 }}>
				<View
					style={[styles.placeholder, { height: 40, width: "60%" }]}
				/>
				<View
					style={[
						styles.placeholder,
						{ height: 24, width: "80%", marginTop: 12 },
					]}
				/>
				<View
					style={[
						styles.placeholder,
						{ height: 32, width: "90%", marginTop: 48 },
					]}
				/>
			</View>

			<View
				style={[
					styles.textWrapper,
					{ marginBottom: insets.bottom + 20 },
				]}
			>
				<Text style={styles.text}>View on Opensea ↗</Text>
			</View>
		</View>
	);
};
