import {StyleSheet, Platform, I18nManager} from 'react-native';
import {
    aspectRatio,
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
    STATUS_BAR_HEIGHT,
} from "../../../../globals/globals";
import { colors } from "../../../../globals/colors";

export const CourseUnitsAndTestsStyles = StyleSheet.create({
    mainPageContainer:{
        position:'relative',
        marginHorizontal: 20
    },
    checkoutPop:{
        position:'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        width: SCREEN_WIDTH,
        minHeight: SCREEN_HEIGHT * 0.25,
        paddingVertical: 10,
        paddingHorizontal: 10,
        elevation:10
    },
    status: {
        zIndex: 10000,
        // marginHorizontal: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      },
      statusPosition: {
        position: "absolute",
        top: STATUS_BAR_HEIGHT,
      },
      left: {
        marginLeft: 24,
      },
      right: {
        marginRight: 24,
        flexDirection: "row",
      },
      icon: {
        width: SCREEN_HEIGHT * 0.037,
        height: SCREEN_HEIGHT * 0.037,
        borderRadius: SCREEN_HEIGHT * 0.037,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: SCREEN_WIDTH * 0.0315,
      },
      spacing: {
        marginRight: 10,
      },
      headTitle: {
        marginVertical: 20,
        marginHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
      },
      container: {
        flex: 1,
      },
      background: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
      },
      logo: {
        width: SCREEN_WIDTH,
        alignItems: "center",
        marginTop: aspectRatio < 2 ? 24 : SCREEN_HEIGHT * 0.039,
        zIndex: 99999,
        flexDirection: "row",
        justifyContent: "center",
      },
      title: {
        marginTop: SCREEN_HEIGHT * 0.04,
        marginBottom: 24,
      },
      content: {
        width: SCREEN_WIDTH,
        alignItems: "center",
      },
      icon: {
        backgroundColor: colors.white,
        width: SCREEN_HEIGHT * 0.05,
        height: SCREEN_HEIGHT * 0.05,
        borderRadius: (SCREEN_HEIGHT * 0.05) / 2,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#00000070",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.43,
        shadowRadius: 7.51,
    
        elevation: 15,
      },
      row: {
        flexDirection: I18nManager.isRTL ? "row" : "row-reverse",
        marginBottom: 22,
      },
      form: {
        width: SCREEN_WIDTH,
        flex: 0.2,
      },
      or: {
        marginBottom: 17,
      },
      checkbox: {
        margin: SCREEN_HEIGHT * 0.012,
        marginLeft: 12,
        borderRadius: 3,
        height: SCREEN_HEIGHT * 0.012,
        width: SCREEN_HEIGHT * 0.012,
        borderWidth: 1,
      },
      submit: {
        alignItems: "center",
        marginVertical: 24,
      },
      loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: SCREEN_HEIGHT,
        position: "absolute",
        width: SCREEN_WIDTH,
      },
      policy: {
        width: SCREEN_WIDTH * 0.92,
        // marginHorizontal: 12,
        flexDirection: "row",
      },
      arrow: {
        position: "absolute",
        top: Platform.OS === "ios" ? 0 : 14,
        left: 22,
      },
      textTextContainer:{
        flex: 1,
        justifyContent: 'center',
        padding: 10
      },
      testText:{
        fontSize:16,
        textAlign: 'center',
      },
      rows:{
          display:'flex',
          flexDirection:'row',
          alignItems: "center",
      },
      columns:{
        display:'flex',
        flexDirection:"column",
        paddingHorizontal: 0,
        marginHorizontal: 0,
        justifyContent: 'center',
        marginHorizontal: 5
    },
    testQuestionCol1:{
      width:'10%'
    },
    testQuestionCol2:{
      width:'80%'
    },
    justifyTop:{
      justifyContent:'flex-start',
      height:'100%',
      alignItems:'flex-start',
      paddingTop: 10
    },
    answerRow:{
      marginVertical: 10,
      padding: 20,
      backgroundColor:colors.light_grey,
      borderRadius:10
    },
    answerText:{
      marginHorizontal: 10
    }, 
    bottomPadding:{
      paddingBottom: 60
    },SelectedAnswer:{
      backgroundColor:colors.blue
    },
    resultContainer:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      alignItems: 'baseline'
    },
    score:{
      fontSize: 70
    },
    totalValue:{
      fontSize:50
    },
    caseStudyInput: {
      width: SCREEN_WIDTH*0.75,
      textAlign: I18nManager.isRTL ? "right" : "left",
      backgroundColor: "rgba(255,255,255,0.3)",
      borderRadius: 10,
      padding: 15,
      color: "white",
      fontFamily: "HelveticaLight",
      backgroundColor:colors.light_grey,
      textAlignVertical: "top"
    },
    textboxfieldd: {
      fontFamily: "HelveticaLight",
    },
    articleSpacer:{
      height: SCREEN_HEIGHT*0.1
    },
    columnWrapper: {        
      margin: 0,
      display: "flex",
      justifyContent: "space-between"
    },
    articleImageCollectionHeader:{
      color:colors.blue,
      textDecorationLine: "underline",
      textDecorationStyle:"solid",
      textDecorationColor:colors.blue,
      marginBottom: 25,
      fontWeight: "bold"
    },
    topPart:{
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    bottomPart:{
        paddingTop: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    imagee:{
        width:20,
        height:20,
        margin: 5
    },
    certificateImagesContainer:{
      position:'relative',
      display:'flex',
      width:SCREEN_WIDTH*0.5,
      height:SCREEN_HEIGHT* 0.75,
    },
    posterImageContainer:{
      width:'auto',
      position:'absolute'
    }, 
    posterImage:{
        width:"100%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    posterContainer:{
      padding: 0,
      backgroundColor: "#ffffff",
      borderRadius:10
    },
    noPaddingNoMargin:{
      padding: 0,
      margin: 0
    }

})