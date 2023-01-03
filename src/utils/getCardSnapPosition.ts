import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const NUM_COLUMNS = 3;
const NUM_ROWS = Math.floor(7 / NUM_COLUMNS);
export const CARD_SIZE = { width: 100, height: 150 };
export const InitTranslationY = height - CARD_SIZE.height;
export const InitTranslationX = width / 2 - CARD_SIZE.width / 2;

export const getCardSnapPosition = (index: number, safeAreaBottom: number) => {
  const adjustedTranslationY = InitTranslationY - safeAreaBottom - 40;
  // shift the array, e.g index 1 becomes 0
  // because 0th element does not snap, it scales and moves a bit
  const column = (index - 1) % NUM_COLUMNS;
  const row = Math.floor((index - 1) / NUM_COLUMNS);
  return {
    x:
      index === 0
        ? InitTranslationX
        : ((column + 1) * (width - NUM_COLUMNS * CARD_SIZE.width)) /
            (NUM_COLUMNS + 1) +
          column * CARD_SIZE.width,
    y:
      index === 0
        ? adjustedTranslationY
        : ((row + 1) * (adjustedTranslationY - NUM_ROWS * CARD_SIZE.height)) /
            (NUM_ROWS + 1) +
          row * CARD_SIZE.height,
  };
};
