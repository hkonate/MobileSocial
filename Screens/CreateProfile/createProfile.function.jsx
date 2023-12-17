import { CreatedProfile } from "../../Context/RequestContext/RequestActions";
import Fetch from "../../assets/Utils/useFetch";
import useSecureStore from "../../assets/Utils/useSecureStore";
import * as ImagePicker from "expo-image-picker";

export const handleUpdate = async (selectedPicture, bio, hobbies, dispatch) => {
  const formdata = new FormData();
  if (bio || hobbies || selectedPicture) {
    try {
      if (selectedPicture) {
        formdata.append("file", {
          uri: selectedPicture,
          name: `my-pic.${selectedPicture.split("/").pop().split(".")[0]}`,
          type: `image/${selectedPicture.split("/").pop().split(".")[1]}`,
        });
      }
      if (bio) {
        formdata.append("bio", bio);
      }

      if (hobbies) {
        formdata.append("hobbies", hobbies);
      }
      const useFetch = await Fetch();
      const data = await useFetch.PUTMEDIA("profile", formdata);
      if (data) {
        const { setValue } = useSecureStore();
        await setValue("createdProfile", JSON.stringify("done"));
        dispatch(CreatedProfile());
        return data;
      }
      return data;
    } catch (error) {
      return null;
    }
  }
};

export const getPermissionAndGetPicture = async (setSelectedPicture) => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status === "granted") {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (result.canceled === false) {
      setSelectedPicture(result.assets[0].uri);
    }
  }
};

export const getPermissionAndTakePicture = async (setSelectedPicture) => {
  //Demander le droit d'accéder à l'appareil photo
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status === "granted") {
    //ouvrir l'appareil photo
    const result = await ImagePicker.launchCameraAsync();
    if (result.canceled === false) {
      setSelectedPicture(result.assets[0].uri);
    }
  }
};