import {
  I18nManager,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useContext } from "react";
import { Header } from "../../../components/Header/Header";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import { colors } from "../../../globals/colors";

import ModalDropdown from "react-native-modal-dropdown";
import Typography from "../../../components/Typography/Typography";
import AttachmentSVG from "../../../SVGR/Globals/Attachment";
import * as ImagePicker from "expo-image-picker";
import { addEvent, updateEvents } from "../../../api/Events/Events";
import { CalendarModal } from "../../../components/Calendar/CalendarPicker";
import WheelPicker from "../../../components/WheelPicker/WheelPicker";
import EventsCenteredModal from "../../../components/Modals/EventsCenteredModal";
import { TextInputMask } from "react-native-masked-text";
import { useEffect } from "react";
import AppContext from "../../../appContext/AppContext";
import { resizeImageHandler } from "../../../utils/ImageResizer";

const CustomInput = ({ value, setValue, ...props }) => {
  return (
    <View>
      {!props.secondary ? (
        <TextInput
          textAlignVertical={"top"}
          style={[
            styles.textinput,
            { height: props.multi ? SCREEN_HEIGHT * 0.19 : 40 },
          ]}
          placeholder={props.placeholder}
          placeholderTextColor={colors.dark_blue}
          multiline={props.multi}
          value={value}
          onChangeText={(text) => setValue(text)}
        />
      ) : (
        <TouchableOpacity
          onPress={() => props.submit()}
          style={[styles.textinput, styles.row]}
        >
          <View>
            <Typography
              content={value || props.placeholder}
              align="left"
              size={14}
              color={colors.dark_blue}
            />
          </View>
          {props.icon && (
            <TouchableOpacity
              onPress={() => props.submit()}
              style={styles.icon}
            >
              <AttachmentSVG />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export const EventsForm = ({ navigation, route }) => {
  const { userData, fixedTitles } = useContext(AppContext);
  const { editMode, expertCase, data } = route.params;
  let mettingDropdown = ["location", "Online Meeting"];
  const [dateModal, setDateModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [meetingType, setMeetingType] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [about, setAbout] = useState("");
  const [nameError, setNameError] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [timeError, setTimeError] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [aboutError, setAboutError] = useState(null);
  const [linkError, setLinkError] = useState(null);

  const resetState = () => {
    setNameError(null);
    setDateError(null);
    setTimeError(null);
    setImageError(null);
    setAboutError(null);
    setLinkError(null);
    setAboutError(null);
  };

  useEffect(() => {
    if (!editMode) return;

    setEventName(data?.name);
    setDate(data?.date);
    setTime(data?.time);
    setAbout(data?.about);
    setMeetingType(data.location == null ? 1 : 0);
    setLink(data.location == null ? data.link : data.location);
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(await resizeImageHandler(result.uri));
    }
  };

  const addNewEventHandler = () => {
    // const uriArray = image?.split(".");
    // const fileExtension = uriArray[uriArray?.length - 1]; // e.g.: "jpg"
    // const fileTypeExtended = `${image?.type}/${fileExtension}`;
    let formdata = new FormData();
    formdata.append("name", eventName);
    formdata.append("date", date);

    formdata.append("time", time);
    formdata.append("is_online", meetingType == 1 ? 1 : 0);
    if (meetingType == 1) {
      formdata.append("link", link);
    } else {
      formdata.append("location", link);
    }
    if (!editMode) {
      if (image) {
        formdata.append("image", {
          uri: image,
          name: "event pic",
          type: "image/jpg",
        });
      }
    }
    formdata.append("about", about);

    setLoading(true);
    if (expertCase) {
      if (!editMode) {
        resetState();
        addEvent(formdata, data.id)
          .then((res) => {
            resetState();
            setSuccessModal(true);
          })
          .catch((err) => {
            if (err.response.data.errors.name) {
              setNameError(err.response.data.errors.name);
            }
            if (err.response.data.errors.date) {
              setDateError(err.response.data.errors.date);
            }
            if (err.response.data.errors.image) {
              setImageError(err.response.data.errors.image);
            }
            if (err.response.data.errors.time) {
              setTimeError(err.response.data.errors.time);
            }
            if (err.response.data.errors.about) {
              setAboutError(err.response.data.errors.about);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        updateEvents(formdata, data.id)
          .then((res) => {
            navigation.pop();
          })
          .catch((err) => {
            if (err.response.data.errors.name) {
              setNameError(err.response.data.errors.name);
            }
            if (err.response.data.errors.date) {
              setDateError(err.response.data.errors.date);
            }
            if (err.response.data.errors.image) {
              setImageError(err.response.data.errors.image);
            }
            if (err.response.data.errors.time) {
              setTimeError(err.response.data.errors.time);
            }
            if (err.response.data.errors.about) {
              setAboutError(err.response.data.errors.about);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
    } else {
      resetState();
      addEvent(formdata)
        .then((res) => {
          resetState();

          setSuccessModal(true);
        })
        .catch((err) => {
          if (err.response.data.errors.name) {
            setNameError(err.response.data.errors.name);
          }
          if (err.response.data.errors.date) {
            setDateError(err.response.data.errors.date);
          }
          if (err.response.data.errors.image) {
            setImageError(err.response.data.errors.image);
          }
          if (err.response.data.errors.time) {
            setTimeError(err.response.data.errors.time);
          }
          if (err.response.data.errors.about) {
            setAboutError(err.response.data.errors.about);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const getDateHandler = () => {
    setDateModal(true);
  };
  const successModalHandler = () => {
    setSuccessModal(false);
    if (expertCase) {
      navigation.pop();
    } else {
      navigation.navigate("Events");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        title={
          editMode
            ? fixedTitles.events["edit-event"].title
            : fixedTitles.events["add-event"].title
        }
        red={true}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.loader}>
          <ActivityIndicator
            animating={loading}
            size="large"
            color={colors.dark_blue}
          />
        </View>
        <>
          <CustomInput
            value={eventName}
            setValue={setEventName}
            icon={false}
            placeholder={fixedTitles.events["event-name"].title}
          />
          {nameError && (
            <View style={{ width: SCREEN_WIDTH - 40, alignSelf: "center" }}>
              <Typography content={nameError} color="red" align="left" />
            </View>
          )}
        </>
        <>
          <CustomInput
            value={date}
            submit={() => getDateHandler()}
            secondary={true}
            placeholder={fixedTitles.events["date"].title}
          />
          {dateError && (
            <View style={{ width: SCREEN_WIDTH - 40, alignSelf: "center" }}>
              <Typography content={dateError} color="red" align="left" />
            </View>
          )}
        </>

        <>
          {/* <CustomInput value={time} setValue={setTime} placeholder={"زمن"} /> */}
          <TextInputMask
            placeholderTextColor={colors.dark_blue}
            placeholder="00:00"
            style={styles.textinput}
            type={"datetime"}
            options={{
              format: "MM:DD",
            }}
            value={time}
            onChangeText={(text) => {
              setTime(text);
            }}
          />
          {timeError && (
            <View style={{ width: SCREEN_WIDTH - 40, alignSelf: "center" }}>
              <Typography content={timeError} color="red" align="left" />
            </View>
          )}
        </>

        <View
          style={{
            marginVertical: 7,
          }}
        >
          <ModalDropdown
            options={mettingDropdown}
            dropdownStyle={styles.dropdownStyles}
            isFullWidth
            showsVerticalScrollIndicator
            style={[
              styles.containerStyles,
              {
                marginBottom: 0,
              },
            ]}
            textStyle={styles.label}
            defaultValue={
              meetingType === 1
                ? mettingDropdown[1]
                : mettingDropdown[0] || "نوع الاجتماع"
            }
            onSelect={(item) => {
              setMeetingType(item);
            }}
            renderRowText={(item) => {
              return (
                <View>
                  <Typography
                    size={12}
                    content={item}
                    align="left"
                    color={colors.dark_blue}
                  />
                </View>
              );
            }}
            renderSeparator={() => <View />}
            renderRowComponent={TouchableOpacity}
            keyboardShouldPersistTaps="handled"
            renderRightComponent={() => {
              return <View style={styles.arrowContainer} />;
            }}
          />
        </View>

        <>
          <CustomInput
            value={link}
            setValue={setLink}
            placeholder={fixedTitles.events["add-link"].title}
          />
          {linkError && (
            <View style={{ width: SCREEN_WIDTH - 40, alignSelf: "center" }}>
              <Typography content={linkError} color="red" align="left" />
            </View>
          )}
        </>

        <>
          <CustomInput
            submit={() => pickImage()}
            secondary={true}
            placeholder={
              image ? "image.jpg" : fixedTitles.events["upload-image"].title
            }
            icon
          />
          {imageError && (
            <View style={{ width: SCREEN_WIDTH - 40, alignSelf: "center" }}>
              <Typography content={imageError} color="red" align="left" />
            </View>
          )}
        </>
        <>
          <CustomInput
            value={about}
            setValue={setAbout}
            placeholder={fixedTitles.events["about"].title}
            multi={true}
          />
          {aboutError && (
            <View style={{ width: SCREEN_WIDTH - 40, alignSelf: "center" }}>
              <Typography content={aboutError} color="red" align="left" />
            </View>
          )}
        </>
        <View>
          <TouchableOpacity
            onPress={() => addNewEventHandler()}
            style={styles.button}
          >
            <Typography
              content={
                editMode
                  ? fixedTitles.events["save"].title
                  : fixedTitles.events["add"].title
              }
              color={colors.white}
              align="center"
              size={16}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <WheelPicker
        setSelectedStartDate={setDate}
        visible={dateModal}
        close={() => setDateModal(false)}
        future
      />
      <EventsCenteredModal
        visible={successModal}
        close={() => successModalHandler()}
        loading={false}
        finished={true}
        message={"تم إضافة حدثك بنجاح"}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  textinput: {
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#F2F5F6",
    paddingBottom: 7,
    height: 40,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: "HelveticaRegular",
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: colors.dark_blue,
    marginVertical: 7,
  },
  dropdownStyles: {
    height: 100,
    marginTop: Platform.OS == "ios" ? 18 : -25,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: I18nManager.isRTL ? "flex-end" : "flex-start",
    backgroundColor: "white",
  },
  containerStyles: {
    textAlign: "right",

    // alignItems: "flex-start",
    backgroundColor: "#F2F5F6",
    width: "auto",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    paddingVertical: 9,
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
  },
  label: {
    color: colors.dark_blue,
    fontFamily: "HelveticaRegular",
    fontSize: 14,
  },
  arrowContainer: {
    width: SCREEN_WIDTH * 0.65,
    alignItems: "flex-end",
  },
  button: {
    width: SCREEN_WIDTH - 40,
    height: SCREEN_HEIGHT * 0.05,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.dark_blue,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    alignSelf: "center",
    shadowOpacity: 0.19,
    shadowRadius: 3.84,
    marginVertical: 30,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    elevation: 10,
    zIndex: 10,
  },
  loader: {
    position: "absolute",
    alignSelf: "center",
    zIndex: 100,
    elevation: 10,
    top: "50%",
  },
});
