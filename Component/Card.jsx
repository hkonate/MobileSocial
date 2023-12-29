import { TouchableOpacity, StyleSheet, Image, Text, View } from "react-native";
import concertImage from '../assets/Images/CONCERT.jpg';
import karaokeImage from '../assets/Images/KARAOKE.jpg';
import restaurantImage from '../assets/Images/RESTAURANT.jpg';
import gamingImage from '../assets/Images/GAMING.jpg';
import sportImage from '../assets/Images/SPORT.jpg';
import movieImage from '../assets/Images/MOVIE.jpg';
import studyImage from '../assets/Images/STUDY.jpg';
import artImage from '../assets/Images/ART.jpg';
import othersImage from '../assets/Images/OTHERS.jpg';
import Json from "../assets/Utils/fr.json"
import { FormatDate } from "../assets/Utils/formatDate";
const Card = ({event, navigation}) =>{
    const capitalizedDate = FormatDate(event?.schedule)
    let imageSource
    switch (event.category) {
        case 'CONCERT':
            imageSource = concertImage;
            break;
        case 'KARAOKE':
            imageSource = karaokeImage;
            break;
        case 'RESTAURANT':
            imageSource = restaurantImage;
            break;
        case 'GAMING':
            imageSource = gamingImage;
            break;
        case 'SPORT':
            imageSource = sportImage;
            break;
        case 'MOVIE':
            imageSource = movieImage;
            break;
        case 'STUDY':
            imageSource = studyImage;
            break;
        case 'ART':
            imageSource = artImage;
            break;
        case 'OTHERS':
            imageSource = othersImage;
            break;
        default:
            imageSource = defaultImage;
            break;
    }
    return  <TouchableOpacity onPress={()=> navigation.push(Json.event.title, event)} style={styles.card}>
        <View style={{width: "100%", height: "60%", position: "relative", marginBottom: 15}}>
        <Image style={styles.image} source={imageSource}/>
        {
        event.price === 0 && <View style={styles.free}>
            <Text style={styles.freeText}>{Json.filter.label_3}</Text>
            </View>
    }
        </View>
        <Text numberOfLines={1} style={styles.title}>{(event.title[0].toUpperCase() + event.title.slice(1)).trim()}</Text>
        <Text  numberOfLines={1} style={styles.date}>{capitalizedDate.trim()}</Text>
        <View style={styles.locationBox}>
            <Image style={styles.locationLogo} source={require("../assets/Images/location.png")}/>
            <Text numberOfLines={1} style={styles.place}>{event.address.trim()}</Text>
        </View>
    </TouchableOpacity>
}

export default Card;

const styles = StyleSheet.create({
    card:{
        backgroundColor: "white",
        borderRadius: 30,
        padding: 10,
        marginRight: 25,
        width: 250,
        height: 340
    },
    image:{
        width: "100%",
        height: "100%",
        borderRadius: 25,
        objectFit: "cover"
    },
    title:{
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10
    },
    date:{
        fontSize: 14,
        color: "#584CF4",
        fontWeight: "bold",
        marginBottom: 18
    },
    locationBox:{
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 10,
        width: "94%"
    },
    place:{
        fontSize: 14,
        flexWrap: "wrap"
    },
    locationLogo:{
        width: 20,
        height: 20,
        marginRight: 10
    },
    free:{
        backgroundColor: "#584CF4",
        width: "27%",
        height: "18%",
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: 15,
        bottom: 15
    },
    freeText:{
        fontSize: 8,
        color: "white",
        fontWeight: "bold"
    },
})