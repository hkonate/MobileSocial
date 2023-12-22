import {TouchableOpacity, Text, StyleSheet, Image } from "react-native"
import concerticon from '../assets/Images/concerticon.png';
import karaokeicon from '../assets/Images/karaokeicon.png';
import restauranticon from '../assets/Images/restauranticon.png';
import gamingicon from '../assets/Images/gamingicon.png';
import sporticon from '../assets/Images/sportsicon.png';
import movieicon from '../assets/Images/movieicon.png';
import studyicon from '../assets/Images/studyicon.png';
import articon from '../assets/Images/articon.png';
import valideicon from "../assets/Images/validateicon.png"
import othersicon from '../assets/Images/othersicon.png';
import { handleFetchByCat } from "../Screens/Home/Home.function";
const ButtonGroup = ({id, setId,buttons, setEvents}) => {
    return buttons.map((button, idx) => 
    { 
        let icon, txt;
        switch (button){
            case "Tout":
                icon = valideicon;
                txt= "";
                break;
            case "Cinéma":
                icon = movieicon
                txt = "MOVIE"
                break;
            case "Arts":
                icon = articon;
                txt = "ART"
                break;
            case "Etudes":
                icon = studyicon;
                txt = "STUDY"
                break;
            case "Concerts":
                icon = concerticon;
                txt = "CONCERT"
                break;
            case "Karaoke":
                icon = karaokeicon;
                txt = "KARAOKE"
                break;
            case "Restaurants":
                icon = restauranticon;
                txt = "RESTAURANT"
                break;
            case  "Jeux":
                icon = gamingicon;
                txt = "GAMING"
                break
            case "Sports":
                icon = sporticon;
                txt = "SPORT"
                break;
            default: 
            icon = othersicon;
            txt = "OTHERS"
            break;
        }
        return <TouchableOpacity onPress={async ()=>
            {
                setId(idx)
                const res = await handleFetchByCat(txt)
                setEvents(res)
            }} 
            key={idx} 
            title={button}
            style={{backgroundColor: id === idx ? "#584CF4" : "white",...styles.button}}>
            <Image style={styles.icon} source={icon} />
            <Text style={{color: id === idx ? "white" : "#584CF4",...styles.textBtn}}>{button}</Text>
            </TouchableOpacity>
            }
    )
}

export default ButtonGroup

const styles = StyleSheet.create({
    button:{
         width: 110,
         marginRight: 15,
         height: 40,
         borderRadius: 20,
         borderWidth: 2,
         borderColor: "#584CF4",
         justifyContent: "center",
         alignItems: "center",
         flexDirection: "row",
         gap: 10
    },
    textBtn:{
        fontSize: 10,
        fontWeight: "bold"
    },
    icon:{
        width: 20,
        height: 20,

    },
})