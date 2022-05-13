import * as ImageManipulator from "expo-image-manipulator";

export const resizeImageHandler = async (uri) => {
  try {
    const resizedPhoto = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 500, height: 500 } }],
      { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
    );
    if (resizedPhoto) {
      return resizedPhoto.uri;
    }
  } catch (error) {
    console.log(error);
  }
};
