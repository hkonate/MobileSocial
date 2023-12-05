import Fetch from "../../assets/Utils/useFetch";

export const handleAttendee = async (attend, eventId) => {
  try {
    const fetch = await Fetch();
    const response = await fetch.PUT(
      `event/${eventId}/${attend === "Participer"}`
    );
    if (response) return response;
    return null;
  } catch (error) {
    console.log("error be:", error);
    return null;
  }
};

export const handleDelete = async (eventId) => {
  try {
    const fetch = await Fetch();
    const response = await fetch.DELETE(`event/${eventId}`);
    if (response) return response;
    return null;
  } catch (error) {
    return null;
  }
};
