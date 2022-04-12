import React, {useState} from "react";
import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from "react-native";
import { colors } from "../../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../globals/globals";
import Typography from "../../../../components/Typography/Typography";
import TrashSVG from '../../../../SVGR/Globals/Trash';
import {globalStyles} from '../../../../globals/globaStyles';
import ThumbsUp from "../../../../assets/ThumbsUp.png";
import ThumbsDown from "../../../../assets/ThumbsDown.png";
import Comment from "../../../../assets/Comment.png";
import {ImagePopUpModal} from "../../../../components/Modals/ImagePopUpModal"



export const CourseUnitTemplate = ({ item, handleClickEvent, ...props }) => {
    let[visible, setVisible] = useState(false);
    
    function closeImageModel(){
        setVisible(false)
    }
    
    function continueWithCourse(){
        setVisible(false);
        props.continueWithCourse();
    }

    return (
        <View style={[styles.card]} onPress={()=> handleClickEvent ? handleClickEvent(item) : {}}>
            <View style={[styles.columns]}>
                <View style={[styles.rows, styles.backgroundGrey, styles.topPart]}>
                <ImagePopUpModal visible={visible} imageUrl={item.item.image} closeBtnHandler={() => {closeImageModel()}} continueWithCourse={continueWithCourse}/>

                        <TouchableOpacity onPress={() => {setVisible(true)}}>
                        <ImageBackground
                        style={[
                            styles.image,
                            { width: SCREEN_WIDTH * 0.25, height: SCREEN_WIDTH * 0.25 },
                        ]}
                        resizeMode="cover"
                        source={{ uri: item.item.image }}
                    />
                        </TouchableOpacity>
                    
                    <View style={[styles.columns, styles.spaceHorizontal]}>
                        <Typography
                        color={colors.blue}
                        size={14}
                        content={item.item.name}
                    />
                    <Text style={{height: 'auto'}}>{item.item.title}</Text>
                    
                    </View>
                </View>

                <View style={[styles.columns]}>
                <View style={[styles.rows, styles.bottomPart]}>
                    <Image resizeMode="cover" source={ThumbsUp} style={styles.imagee} /> 
                    <Text style={{height: 'auto'}}>135000</Text>

                    <Image resizeMode="cover" source={ThumbsDown} style={styles.imagee} /> 
                    <Text style={{height: 'auto'}}>7500</Text>                    
                </View>

                <View style={[styles.rows, styles.bottomPart]}>
                    <Image resizeMode="cover" source={Comment} style={styles.imagee} /> 
                    <Text style={{height: 'auto'}}>عرض جميع 20 تعليق</Text>               
                </View>


                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        display:'flex',
        marginTop:15,
        borderRadius: 10,
        shadowColor: "#00000070",
    },
    columns:{
        display:'flex',
        flexDirection: 'column',
    },
    verticalJustify:{
        justifyContent:'center'
    },
    rows:{
        display:'flex',
        flexDirection: 'row',
        padding: 15
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
    backgroundGrey:{
        backgroundColor: colors.light_grey
    },
    spaceHorizontal:{
        paddingHorizontal: 10
    },
    image: {
        borderRadius: 10,
        overflow: "hidden",
    },
    info: {
        flexDirection: "row",
        backgroundColor: "transparent",
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    infoRight: {
        flexDirection: "row",
        marginBottom: 10,
        marginHorizontal: 5,
    },
    locationText: {
        marginHorizontal: 12,
    },
    imagee:{
        width:20,
        height:20,
        margin: 5
    }
});