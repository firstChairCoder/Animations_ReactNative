import React, { FC, useState } from "react";
import {
	Circle,
	useComputedValue,
	useClockValue,
	Skia,
	Path,
} from "@shopify/react-native-skia";
import { Platform, useWindowDimensions } from "react-native";

import { getRandomColor } from "../../utils/getRandomColor";

const speedX = 0.25;
const speedY = 350;
const timeOffset = Platform.OS === "ios" ? 40 : 65;

const pathX = (start: number, acc: number, time: number) => {
	return start + acc * time;
};
const pathY = (start: number, acc: number, time: number) => {
	return start - acc * (1 - Math.pow(time / 1000 - 1, 2));
};

const particleCount = Platform.OS === "ios" ? 60 : 30;
const Sprayer: FC = () => {
	const { width, height } = useWindowDimensions();

	const cx = width / 2;
	const cy = height - 20;

	const path = Skia.Path.Make();
	path.moveTo(cx - 10, cy);
	path.lineTo(cx, cy - 30);
	path.lineTo(cx + 10, cy);
	path.close();

	return (
		<>
			{Array(particleCount)
				.fill(0)
				.map((_, i) => (
					<MiniExplosion
						key={`${i}`}
						index={i}
						cx={cx}
						cy={cy - 30}
					/>
				))}
			<Path path={path} color="white" />
		</>
	);
};

export default Sprayer;

function MiniExplosion(cx: number, cy: number, index: number) {
	const clock = useClockValue();
	const [{ startX, startY }] = useState({
		startX: (Math.random() * speedX - speedX * 0.5) * 0.5,
		startY: Math.random() * speedY * 0.5 + speedY * 0.5,
	});

	const x = useComputedValue(() => {
		return pathX(
			cx,
			startX,
			Math.max(0, (clock.current - index * timeOffset) % 1500)
		);
	}, [clock]);

	const y = useComputedValue(() => {
		return pathX(
			cy +
				pathY(
					0,
					startY,
					Math.max(0, (clock.current - index * timeOffset) % 1500)
				)
		);
	}, [clock]);
	const [color] = useState(getRandomColor());

	return <Circle cx={x} cy={y} r={4} color={color} />;
}
