import Fetch from "../../assets/Utils/useFetch";

export const handleCreate = async (date, arrOfObjInputs) => {
  try {
    console.log(arrOfObjInputs);
    const textInputs = [
      "title",
      "address",
      "limit",
      "description",
      "inclusion",
    ];
    const formData = new FormData();
    for (const objectInput of arrOfObjInputs) {
      if ("files" in objectInput) {
        for (const file of objectInput.files) {
          formData.append("files", file);
        }
      } else {
        for (const textInput of textInputs) {
          formData.append(textInput, objectInput[textInput]);
        }
      }
    }
    formData.append("schedule", date);
    console.log("1");
    const updateEvent = await Fetch();
    const res = await updateEvent.POSTMEDIA("event", formData);
    return res;
  } catch (error) {
    console.log("er", error);
    return null;
  }
};
