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
const SmallCard = ({ event, navigation}) =>{
    const dateActuelle = new Date(event.schedule)
    const options = {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
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
            // Default image for unspecified categories
            imageSource = defaultImage;
            break;
    }
    const dateFormatee = new Intl.DateTimeFormat('fr-FR', options).format(dateActuelle);
    const capitalizedDate = dateFormatee.replace(/(?:^|\s)(?!à)([^\s])/g, (match) => match.toUpperCase());


    return  <TouchableOpacity onPress={()=> navigation.navigate(Json.event.title, event)} style={styles.card}> 
        <View style={{width: "100%", height: "60%", position: "relative"}}>
        <Image style={styles.image} source={imageSource}/>
        {
        event.price === 0 && <View style={styles.free}>
            <Text style={styles.freeText}>{Json.filter.label_3}</Text>
            </View>
    }
        </View>
        <Text numberOfLines={1} style={styles.title}>{(event.title[0].toUpperCase() + event.title.slice(1)).trim()}</Text>
        <Text numberOfLines={2} style={styles.date}>{capitalizedDate}</Text>
        <View style={styles.locationBox}>
            <Image style={styles.locationLogo} source={require("../assets/Images/location.png")}/>
            <Text numberOfLines={1} style={styles.place}>{event.address}</Text>
        </View>
    </TouchableOpacity>
    
    
}

export default SmallCard;

const styles = StyleSheet.create({
    card:{
        backgroundColor: "white",
        borderRadius: 20,
        padding: 5,
        overflow: "hidden",
        width: "47%",
        height: 190,
        gap: 4
    },
    image:{
        width: "100%",
        height: "100%",
        borderRadius: 20,
        objectFit: "cover"
    },
    title:{
        fontSize: 10,
        fontWeight: "bold",
        width: "100%", 
    },
    date:{
        fontSize: 10,
        color: "#584CF4",
        fontWeight: "bold",
    },
    locationBox:{
        flexDirection: "row",
        alignItems: "center",
        width: "100%"
    },
    place:{
        fontSize: 8,
        flexWrap: "wrap"
    },
    locationLogo:{
        width: 12,
        height: 12,
        marginRight: 2
    },
    free:{
        backgroundColor: "#584CF4",
        width: "38%",
        height: "22%",
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: 7,
        top: 10
    },
    freeText:{
        fontSize: 8,
        color: "white",
        fontWeight: "bold"
    },
})