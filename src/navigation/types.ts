export type RootStackParamList = {
  Home: undefined;
  Details: undefined;

  Player: undefined;
  Clock: undefined;
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
*/
