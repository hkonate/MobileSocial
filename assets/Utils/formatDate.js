export const FormatDate = (schedule) =>{
    const dateActuelle = new Date(schedule);
    const options = {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    const dateFormatee = new Intl.DateTimeFormat('fr-FR', options).format(dateActuelle);
    const capitalizedDate = dateFormatee.replace(/(?:^|\s)(?!à)([^\s])/g, (match) => match.toUpperCase()).trim();
    return capitalizedDate
}