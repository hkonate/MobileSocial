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

const Card = ({w,h, event}) =>{
    console.log(event);
   const concert = "CONCERT"
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


    return  <TouchableOpacity style={{width: w, height: h, ...styles.card}}> 
        <Image style={styles.image} source={imageSource}/>
        <Text style={styles.title}>{event.title[0].toUpperCase() + event.title.slice(1)}</Text>
        <Text  style={styles.date}>{capitalizedDate}</Text>
        <View style={styles.locationBox}>
            <Image style={styles.locationLogo} source={require("../assets/Images/location.png")}/>
            <Text numberOfLines={1} style={styles.place}>{event.address}</Text>
        </View>
    </TouchableOpacity>
    
    
}

export default Card;

const styles = StyleSheet.create({
    card:{
        backgroundColor: "white",
        borderRadius: 30,
        padding: 10,
        marginRight: 25
    },
    image:{
        width: "100%",
        height: "60%",
        borderRadius: 25,
        marginBottom: 15,
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
    }
})