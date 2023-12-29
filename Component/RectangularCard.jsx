import { StyleSheet, Text, View, Image, TouchableOpacity, } from 'react-native'
import React from 'react'
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

const RectangularCard = ({events, navigation}) => {
   
  return (
    events && events.map((event, idx) =>{
        const dateActuelle = new Date(event.schedule)
        const currentDate = new Date()
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
            imageSource = defaultImage;
            break;
    }
    const dateFormatee = new Intl.DateTimeFormat('fr-FR', options).format(dateActuelle);
    const capitalizedDate = dateFormatee.replace(/(?:^|\s)(?!à)([^\s])/g, (match) => match.toUpperCase());
        return <TouchableOpacity key={idx} onPress={()=> currentDate < dateActuelle && navigation.navigate(Json.event.title, event)} style={styles.container}>
    <View style={styles.left}>
        <Image style={styles.image} source={imageSource}/>
    {
        event.price === 0 && <View style={styles.free}>
            <Text style={styles.freeText}>{Json.filter.label_3}</Text>
            </View>
    }
    </View>
      <View style={styles.right}>
        <Text numberOfLines={1} style={styles.title}>{(event.title[0].toUpperCase() + event.title.slice(1)).trim()}</Text>
        <Text numberOfLines={1} style={styles.date} >{capitalizedDate.trim()}</Text>
        <View style={styles.locationBox}>
        <Image style={styles.locationLogo} source={require("../assets/Images/location.png")}/>
        <Text numberOfLines={1} style={styles.place}>{event.address.trim()}</Text>
        </View>
      </View>
    </TouchableOpacity>})
  )
}

export default RectangularCard

const styles = StyleSheet.create({
    container:{
        width: "100%",
        height: 140,
        backgroundColor: "white",
        borderRadius: 25,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        gap: 10,
        marginBottom: 20
    },
    left:{
        height: "100%",
        width: "41%",
        borderRadius: 20,
        position: "relative"
    },
    right:{
        height: "100%",
        width: "59%",
        flexDirection: "column",
        gap: 10,
        paddingVertical: 10
    },
    image:{
        width: "100%",
        height: "100%",
        borderRadius: 25,
        objectFit: "cover"
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
    locationBox:{
        flexDirection: "row",
        alignItems: "center",
        width: "95%",
    },
    place:{
        fontSize: 14,
        flexWrap: "wrap",
    },
    locationLogo:{
        width: 20,
        height: 20,
        marginRight: 10
    },
    date:{
        fontSize: 14,
        color: "#584CF4",
        fontWeight: "bold",
    },
    title:{
        fontSize: 15,
        fontWeight: "bold",
    },
})