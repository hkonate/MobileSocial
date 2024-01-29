import Fetch from "../../assets/Utils/useFetch"

export const HandleEventFilter =  async (goBack, setEvents, category, eventName, inclusiveArr, rangePrice, filter) => {
        try {
          const fetchEvent = await Fetch()
          let inclusiveFilter = "?"
          let firstParams= true
          console.log(eventName);
          if(category){
            inclusiveFilter += `equals${category}`
            firstParams = false
          }
          if(eventName.trim().length > 0){
              if(firstParams){
              inclusiveFilter += `title=${eventName.trim()}`
              firstParams = false
            }else{
              inclusiveFilter += `&title=${eventName.trim()}`
            }
          }
          if(firstParams){
            inclusiveFilter += `lte=${rangePrice[1]}`
            firstParams = false
          }else{
            inclusiveFilter += `&lte=${rangePrice[1]}`
          }
          if(firstParams){
            inclusiveFilter += `gte=${rangePrice[0]}`
            firstParams = false
          }else{
            inclusiveFilter += `&gte=${rangePrice[0]}`
          }

          inclusiveArr.forEach(element => {
            if(firstParams){
              inclusiveFilter += `inclusive[]=${element}`
              firstParams = false
            }else{
              inclusiveFilter += `&inclusive[]=${element}`
            }
          });

          console.log(inclusiveFilter);
          const eventsFiltered = await fetchEvent.GET(`event/?${inclusiveFilter}`)
         
          setEvents(eventsFiltered)
        } catch (error) {
          console.log(error.message);
          alert("Erreur", error)
          if(filter)
          goBack()
        }
}