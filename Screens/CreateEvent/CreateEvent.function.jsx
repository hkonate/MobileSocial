import Fetch from "../../assets/Utils/useFetch";

export const handleCreate = async (files, date, arrOfObjInputs) => {
  try {
    const textInputs = ["title", "address", "limit", "description", "category", "price"];
    const formData = new FormData();
    for (const objectInput of arrOfObjInputs) {
      if("inclusive" in objectInput){
        for (const inclusive of objectInput.inclusive) {
          formData.append("inclusive[]", inclusive);
        }
      }
      else {
        for (const textInput of textInputs) {
          if (
            textInput in objectInput && ( typeof objectInput[textInput] === "number" ||
            objectInput[textInput].trim().length > 0)
          ) {
            formData.append(textInput, objectInput[textInput]);
          }
        }
      }
    }
    if(files){
    for (const file of files) {
      formData.append("files", file);
    }}
    formData.append("schedule", date.toString());
    const updateEvent = await Fetch();
    const res = await updateEvent.POSTMEDIA("event", formData);
    return res;
  } catch (error) {
    return null;
  }
};
