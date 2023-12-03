export const filterEvents = (events) => {
  const currentDate = new Date().getTime();
  const inAWeek = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
  const upCommingEvents = events.filter(
    (event) =>
      new Date(event.schedule).getTime() > currentDate &&
      new Date(event.schedule).getTime() < inAWeek
  );
  return upCommingEvents;
};
