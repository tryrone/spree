import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  // Base text styles
  text: {
    fontFamily: 'Poppins',
  },
  
  // Text weight variations
  textBold: {
    fontFamily: 'Poppins-Bold',
  },
  textLight: {
    fontFamily: 'Poppins-Light',
  },
  textItalic: {
    fontFamily: 'Poppins-Italic',
  },

  // Additional global styles can be added here
  h1: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
  },
  h2: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20
  },
  colum: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  storeRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginVertical: 5
  },
});

// export const colors = {
//   primary: '#19141E',
//   background: '#FFFFFF',
//   text: '#000000',
//   // Add more colors as needed
// };