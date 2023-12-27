import Fetch from "../../assets/Utils/useFetch"

export const HandleEventFilter =  async (goBack, setEvents, category, eventName, inclusiveArr, rangePrice, filter) => {
        try {
          const fetchEvent = await Fetch()
          let inclusiveFilter = ""
          inclusiveArr.forEach(element => {
            inclusiveFilter += `&inclusive[]=${element}`
          });
          const eventsFiltered = await fetchEvent.GET(`event/?equals=${category}&title=${eventName}${inclusiveArr.length > 0 && inclusiveFilter}&lte=${rangePrice[1]}&gte=${rangePrice[0]}`)
          setEvents(eventsFiltered)
        } catch (error) {
          console.log(error);
          alert("Erreur", error)
          if(filter)
          goBack()
        }
}