import Fetch from "../../assets/Utils/useFetch";
import * as ImagePicker from "expo-image-picker";

export const handleChange = async (eventId, arrOfObjInputs) => {
  try {
    const textInputs = ["title", "address", "limit", "description"];
    const formData = new FormData();
    for (const objectInput of arrOfObjInputs) {
      if ("files" in objectInput) {
        for (const file of objectInput.files) {
          formData.append("files", file);
        }
      } else {
        for (const textInput of textInputs) {
          if (
            textInput in objectInput &&
            objectInput[textInput].trim().length > 0
          ) {
            formData.append(textInput, objectInput[textInput]);
          }
        }
      }
    }
    const updateEvent = await Fetch();
    const res = await updateEvent.PUTMEDIA(`event/${eventId}`, formData);
    return res;
  } catch (error) {
    return null;
  }
};

export const getPermissionAndGetPicture = async (setSelectedPicture) => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      if (result.canceled === false) {
        setSelectedPicture((prev) => {
          prev.push({
            uri: result.assets[0].uri,
            name: `my-pic.${
              result.assets[0].uri.split("/").pop().split(".")[0]
            }`,
            type: `image/${
              result.assets[0].uri.split("/").pop().split(".")[1]
            }`,
          });
          return [...prev];
        });
      }
    }
  } catch (error) {
    alert("error");
  }
};

export const getPermissionAndTakePicture = async (setSelectedPicture) => {
  //Demander le droit d'accéder à l'appareil photo
  try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      //ouvrir l'appareil photo
      const result = await ImagePicker.launchCameraAsync();
      if (result.canceled === false) {
        setSelectedPicture((prev) => {
          prev.push({
            uri: result.assets[0].uri,
            name: `my-pic.${
              result.assets[0].uri.split("/").pop().split(".")[0]
            }`,
            type: `image/${
              result.assets[0].uri.split("/").pop().split(".")[1]
            }`,
          });
          return [...prev];
        });
      }
    }
  } catch (error) {
    alert("error");
  }
};
