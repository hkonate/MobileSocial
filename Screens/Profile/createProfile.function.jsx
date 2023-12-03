import { CreatedProfile } from "../../Context/RequestContext/RequestActions";
import Fetch from "../../assets/Utils/useFetch";
import useSecureStore from "../../assets/Utils/useSecureStore";

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
      const data = await useFetch.PUT("profile", formdata);
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
