import * as ImagePicker from "expo-image-picker";
import Fetch from "../../assets/Utils/useFetch";

export const getPermissionAndGetPicture = async (setSelectedPicture) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      if (result.canceled === false) {
        setSelectedPicture(prev=>({...prev, picture: result.assets[0].uri}));
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
        setSelectedPicture(prev=>({...prev, picture: result.assets[0].uri}));
      }
    }
  };


  export const handleUpdateProfile = async (profileData) => {
    try {
        const fetchProfile = await Fetch();
        const formData = new FormData();
        const formDataUser = new FormData()

        let res = null;
        let resUser = null;
        let canUpdateProfile = false;
        if(profileData.bio.trim().length> 0){
            formData.append("bio", profileData.bio.trim());
            canUpdateProfile =  true;
        };
    
        if(profileData.hobbies.trim().length> 0) {
            formData.append("hobbies", profileData.hobbies.trim());
            canUpdateProfile =  true;
        };
    
        if(profileData.picture){ formData.append("file",  {
            uri: profileData.picture,
            name: `my-pic.${profileData.picture.split("/").pop().split(".")[0]}`,
            type: `image/${profileData.picture.split("/").pop().split(".")[1]}`,
            
          });
          canUpdateProfile =  true;
        }

        if(canUpdateProfile) {res = await fetchProfile.PUTMEDIA("profile", formData);}
        if(profileData.user.pseudo.trim().length > 0){  
            formDataUser.append("pseudo", profileData.user.pseudo);
            resUser = await fetchProfile.PUTMEDIA("user", formDataUser);
        }
        if(res && resUser) return true;
        return null;
    } catch (error) {
        return null;
    }

    
  }