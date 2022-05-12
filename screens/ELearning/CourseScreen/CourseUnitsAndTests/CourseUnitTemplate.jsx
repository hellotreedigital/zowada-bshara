import React, { useContext, useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { colors } from "../../../../globals/colors";
import { SCREEN_WIDTH } from "../../../../globals/globals";
import Typography from "../../../../components/Typography/Typography";
import { globalStyles } from "../../../../globals/globaStyles";
import ThumbsUp from "../../../../assets/ThumbsUp.png";
import Comment from "../../../../assets/Comment.png";
import { ImagePopUpModal } from "../../../../components/Modals/ImagePopUpModal";
import * as VideoThumbnails from "expo-video-thumbnails";
import { likeUnlikeVideo } from '../../../../api/ELearning/ELearning'
import AppContext from "../../../../appContext/AppContext";

export const CourseUnitTemplate = ({
  item,
  navigation,
  handleClickEvent,
  courseId,
  refreshLesson,
  ...props
}) => {
  if (
    item.item.file !== null &&
    item.item.file !== undefined
  ) {

    const { fixedTitles } = useContext(AppContext);


    function proceedWithCourse (){
      if(item.item.isLast){
        navigation.push('courseCertificateScreen');
      }
      else refreshLesson()
    }

    return (
      <ItemTemplate1
        item={item}
        navigation={navigation}
        handleClickEvent={handleClickEvent}
        proceedWithCourse={proceedWithCourse}
        props={props}
        courseId={courseId}
      />
    );
  } else {

    function proceedWithCourse(){
      refreshLesson();
    }

    return (
      <ItemTemplate2
        item={item}
        navigation={navigation}
        handleClickEvent={handleClickEvent}
        proceedWithCourse={proceedWithCourse}
        props={props}
        courseId={courseId}
      />
    );
  }
};

const ItemTemplate1 = ({
  item,
  navigation,
  _handleClickEvent,
  proceedWithCourse,
  courseId
}) => {
  let [visible, setVisible] = useState(false);
  let [video, setVideo] = useState({});
  const [image, setImage] = useState(null);
  const { fixedTitles } = useContext(AppContext);

  useEffect(() => {
    setVideo(item.item);
  }, [])
  

  useEffect(() => {
    (async () => {
      try {
        const { uri } = await VideoThumbnails.getThumbnailAsync(
          `https://staging.zowada-backend.hellotree.dev/storage/${item.item.file}`,
          {
            time: 1000,
          }
        );
        setImage(uri);
      } catch (e) {
        console.warn(e);
      }
    })();
  }, []);

  function closeImageModel() {
    setVisible(false);
  }

  function continueWithCoursee() {
    setVisible(false);
    proceedWithCourse();
  }

  async function likeVideo(vid){

    const like = await likeUnlikeVideo(courseId, vid.lesson_id, vid.id, 'like');
    let v = Object.assign({}, video);
    v.liked_by_count = like.data.likes_count;
    setVideo(v);
  }

  function goToVideoComments(vid){
    let screenData = {
      courseId : courseId,
      lessonId: vid.lesson_id,
      videoId: vid.id
    }
    navigation.push('videoCommentsScreen', {data:screenData})
  }

  return (
    <View
      style={[
        globalStyles.cardShadowStyle1,
        globalStyles.verticalBottomSpacer20,
        video.disabled && globalStyles.disabledVideo
      ]}
    >
      <View style={[styles.card]}>
        <View style={[styles.columns]}>
          <View style={[styles.rows, styles.backgroundGrey, styles.topPart]}>
            <ImagePopUpModal
              visible={visible}
              imageUrl={`https://staging.zowada-backend.hellotree.dev/storage/${video.file}`}
              closeBtnHandler={() => {
                closeImageModel();
              }}
              continueWithCoursee={() => {continueWithCoursee()}}
              courseId={courseId}
              video={video}
            />

            <TouchableOpacity
            disabled={video.disabled}
              onPress={() => {
                setVisible(true);
              }}
            >
              <ImageBackground
                style={[
                  styles.image,
                  { width: SCREEN_WIDTH * 0.25, height: SCREEN_WIDTH * 0.25 },
                ]}
                resizeMode="cover"
                source={{ uri: image }}
              />
            </TouchableOpacity>

            <View
              style={[
                styles.columns,
                styles.spaceHorizontal,
                { width: "70%" },
                globalStyles.leftText,
              ]}
            >
              <Typography
                align="left"
                color={colors.blue}
                size={14}
                content={video.title}
              />
              <View style={{ flexDirection: "row", width: "100%" }}>
                <Text
                  style={[
                    { flex: 1, flexWrap: "wrap", height: "auto" },
                    globalStyles.leftText,
                    globalStyles.textDarkBlue
                  ]}
                >
                  {video.description}
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.columns]}>
            <View
              style={[
                styles.rows,
                styles.bottomPart,
                globalStyles.verticalTopSpacer10,
                globalStyles.verticalBottomNoSpace,
              ]}
            >
              <TouchableOpacity disabled={video.disabled} onPress={() => likeVideo(video)}>
                <Image
                  resizeMode="cover"
                  source={ThumbsUp}
                  style={styles.imagee}
                />
              </TouchableOpacity>
              <View style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                <Text style={{ height: "auto", textAlignVertical: "center"}}>
                  {video.liked_by_count}
                </Text>
              </View>

            </View>

            <TouchableOpacity
              style={[
                styles.rows,
                styles.bottomPart,
              ]}
              disabled={video.disabled}
              onPress={() => {goToVideoComments(video)}}
            >
              <Image
                resizeMode="cover"
                source={Comment}
                style={[styles.imagee]}
              />
              <View style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                <Text style={{ height: 20, textAlignVertical: "center", padding:0}}>
                {fixedTitles.coursesTitles["show-all-s"].title} {video.comments_count} {fixedTitles.coursesTitles["comment"].title}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const ItemTemplate2 = ({
  item,
  _navigation,
  handleClickEvent,
  proceedWithCourse
}) => {
  let [visible, setVisible] = useState(false);
  const { fixedTitles } = useContext(AppContext);
  

  function closeImageModel() {
    setVisible(false);
  }

  function continueWithCoursee(itemm) {
    setVisible(false);
    proceedWithCourse(itemm);
  }

  function onItemClicked(i){
    handleClickEvent(i);
  }

  return (
    <View
      style={[
        globalStyles.cardShadowStyle1,
        globalStyles.verticalBottomSpacer20,
        (item.item.disabled) && globalStyles.disabledVideo
      ]}
    >
      <TouchableOpacity
        style={[styles.card]}
        disabled={item.item.disabled}
        onPress={() => {onItemClicked(item.item)}}
      >
        <View style={[styles.columns]}>
          <View style={[styles.rows, styles.topPart]}>
            <ImagePopUpModal
              visible={visible}
              imageUrl={item.item.image}
              closeBtnHandler={() => {
                closeImageModel();
              }}
              continueWithCourse={continueWithCoursee}
            />

            <View style={[styles.columns, styles.spaceHorizontal, globalStyles.leftText]}>
              <Typography
                color={colors.blue}
                size={14}
                content={item.item.infoText}
                align='left'
              />
              <Text style={[globalStyles.leftText, { height: "auto" }]}>{item.item.title}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  columns: {
    display: "flex",
    flexDirection: "column",
  },
  verticalJustify: {
    justifyContent: "center",
  },
  rows: {
    display: "flex",
    flexDirection: "row",
    padding: 15,
  },
  topPart: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bottomPart: {
    paddingTop: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  backgroundGrey: {
    backgroundColor: colors.light_grey,
  },
  spaceHorizontal: {
    paddingHorizontal: 10,
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
  imagee: {
    width: 20,
    height: 20,
    margin: 5,
  },
})