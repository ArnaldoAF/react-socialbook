export default function getDateTime(timeinMilliSeconds:string) {

    const timezone = new Date().getTimezoneOffset()/60;
    const timezoneInMilliSeconds = timezone * 60 * 60 * 1000;
    const date = new Date(Date.parse(timeinMilliSeconds));
    const day = date.getDay()+1;
    const month = date.getMonth()+1;
    const hour = date.getHours() - timezone;
    const minutes = date.getMinutes() - timezone;

    return {
        date,
        day,
        month,
        hour,
        minutes
    }
}