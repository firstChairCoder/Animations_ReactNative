export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  Wallet: undefined;
  SlideCounter: undefined;
  Layout: undefined;
  Swipe: undefined;
  BottomSheet: undefined;
  Menu: undefined;
  Square: undefined;
  Countdown: undefined;

  Player: undefined;
  Clock: undefined;
  Intro: undefined;
};

export type RootParamList = RootStackParamList | null;

// declare global {
//   namespace ReactNavigation {
//     type RootParamList = RootStackParamList;
//   }
// }

//@typescript-eslint/no-namespace
/* The purpose of namespace is to provide logical grouping of constructs, but ES6 modules allow us
/* achieve this using the filesystem without polluting the global scope. It also gives us more
flexibility when using the types.

update: voided :-p
*/
