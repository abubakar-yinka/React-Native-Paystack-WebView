import { StyleSheet, StatusBar } from 'react-native';

export const STATUSBAR_HEIGHT = StatusBar.currentHeight;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: STATUSBAR_HEIGHT,
  },
});
