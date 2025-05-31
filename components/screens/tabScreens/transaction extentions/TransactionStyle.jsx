import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F7F9FC',
    },
    loadingContainer: {
        flex: 1,
        paddingTop: '7%',
        marginHorizontal: 15,
        backgroundColor: "#fff",
        borderRadius: 16,
      },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    headerText: {
      fontSize: 18,
      color: '#333',
    },
    messageButton: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: '#CCCCCC',
    },
    messageButtonText: {
      fontSize: 14,
      color: '#333',
    },
    amountContainer: {
      paddingHorizontal: 20,
      paddingBottom: 16,
    },
    amountText: {
      fontSize: 28,
      fontWeight: '600',
      color: '#000',
      marginBottom: 4,
    },
    initiatedText: {
      fontSize: 14,
      color: '#475367',
    },
    boldText: {
      fontWeight: '600',
    },
    sectionContainer: {
      paddingHorizontal: 20,
      marginBottom: 24
    },
    sectionHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: '#344054',
      marginBottom: 20
    },
    viewProfileText: {
      fontSize: 14,
      color: '#A97BE2',
      textDecorationLine: 'underline',
    },
    detailsBox: {
      borderWidth: 1,
      borderColor: '#E5E7EB',
      borderRadius: 8,
      padding: 16,
      backgroundColor: '#FCFCFD',
    },
    detailRow: {
      marginBottom: 12,
    },
    detailLabel: {
      fontSize: 14,
      color: '#657786',
      marginBottom: 4,
    },
    detailValue: {
      fontSize: 16,
      color: '#000',
      fontWeight: '400',
    },
    timelineBox: {
      borderWidth: 1,
      borderColor: '#E5E7EB',
      borderRadius: 8,
      padding: 16,
      backgroundColor: '#FCFCFD',
    },
    timelineItem: {
      flexDirection: 'row',
      marginBottom: 16,
    },
    timelineIconContainer: {
      alignItems: 'center',
      width: 20,
      marginRight: 12,
    },
    timelineIcon: {
      width: 15,
      height: 15,
      borderRadius: 999,
      backgroundColor: '#6938EF',
    },
    timelineConnector: {
      width: 2,
      flex: 1,
      backgroundColor: '#667185',
      marginTop: 2,
      marginBottom: -16,
    },
    timelineContent: {
      flex: 1,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#E8ECEF',
    },
    timelineLabel: {
      fontSize: 14,
      fontWeight: '400',
      color: '#333',
    },
    timelineDate: {
      fontSize: 12,
      color: '#657786',
      marginTop: 2,
    },
    dateInfoContainer: {
      borderWidth: 1,
      borderColor: '#E5E7EB',
      borderRadius: 8,
      padding: 16,
      backgroundColor: '#FFFFFF',
      marginTop: 16,
    },
    dateRow: {
      marginBottom: 12,
    },
    dateLabel: {
      fontSize: 14,
      color: '#657786',
      marginBottom: 4,
    },
    dateValue: {
      fontSize: 16,
      color: '#000',
      fontWeight: '400',
    },
    noteText: {
      fontSize: 12,
      color: '#657786',
      fontStyle: 'italic',
      marginTop: 8,
    },
    productImagesRow: {
      marginBottom: 0,
    },
    imagesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 8,
    },
    productImage: {
      width: 60,
      height: 60,
      borderRadius: 4,
      marginRight: 8,
      marginBottom: 8,
      backgroundColor: '#E5E7EB',
    },
    titleText: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: "left",
        color: '#000',
        paddingBottom: 30,
        paddingTop: 15,
        paddingLeft: 15
    },
  })