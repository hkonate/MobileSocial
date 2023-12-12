import Fetch from "../../assets/Utils/useFetch";

export const handleCreate = async (files, date, arrOfObjInputs) => {
  try {
    const formData = new FormData();
    for (const objectInput of arrOfObjInputs) {
      if ("title" in objectInput) formData.append("title", objectInput.title);
      if ("description" in objectInput)
        formData.append("description", objectInput.description);
      if ("address" in objectInput)
        formData.append("address", objectInput.address);
      if ("limit" in objectInput) formData.append("limit", objectInput.limit);
    }
    for (const file of files) {
      formData.append("files", file);
    }
    formData.append("schedule", date.toString());
    const updateEvent = await Fetch();
    const res = await updateEvent.POSTMEDIA("event", formData);
    return res;
  } catch (error) {
    return null;
  }
};
