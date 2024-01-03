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
const ButtonGroup = ({id, setId,buttons, setEvents, modal, defined,setInputsData}) => {
    return buttons.map((button, idx) => 
    { 
        let icon, txt;
        switch (button){
            case "":
                icon = valideicon;
                txt= "Tout";
                break;
            case "MOVIE":
                icon = movieicon
                txt = "Cinéma"
                break;
            case "ART":
                icon = articon;
                txt = "Arts"
                break;
            case "STUDY":
                icon = studyicon;
                txt ="Etudes"
                break;
            case "CONCERT":
                icon = concerticon;
                txt = "Concerts"
                break;
            case "KARAOKE":
                icon = karaokeicon;
                txt = "Karaoke"
                break;
            case "RESTAURANT":
                icon = restauranticon;
                txt = "Restaurants"
                break;
            case  "GAMING":
                icon = gamingicon;
                txt = "Jeux"
                break
            case "SPORT":
                icon = sporticon;
                txt = "Sports"
                break;
            default: 
            icon = othersicon;
            txt = "Autres"
            break;
        }
        return (defined && button === "") ? null : <TouchableOpacity onPress={async ()=>
            {
                setId(idx)
                if(!modal){
                    const res = await handleFetchByCat(button)
                    setEvents(res)
                }else if(defined){
                    setInputsData((prev) => {
                        const index = prev.findIndex((input) => "category" in input);
                        index !== -1
                          ? (prev[index] = { category: button })
                          : prev.push({ category: button });
                        return [...prev];
                      })
                }
            }} 
            key={idx} 
            title={txt}
            style={{backgroundColor: id === idx ? "#584CF4" : "white",...styles.button}}>
            <Image style={styles.icon} source={icon} />
            <Text style={{color: id === idx ? "white" : "#584CF4",...styles.textBtn}}>{txt}</Text>
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