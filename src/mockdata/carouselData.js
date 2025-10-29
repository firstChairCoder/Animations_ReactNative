import faker from "faker";

import icons from "./aviIcons";

const data = icons.map((icon) => ({
  key: faker.datatype.uuid(),
  name: faker.commerce.product(),
  icon
}));

export default data;
