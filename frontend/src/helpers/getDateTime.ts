export default function getDateTime(timeinMilliSeconds:string) {

    const timezone = new Date().getTimezoneOffset()/60;
    const timezoneInMilliSeconds = timezone * 60 * 60 * 1000;
    const dateOld = new Date(Date.parse(timeinMilliSeconds));
    const time = dateOld.getTime() - timezoneInMilliSeconds;
    const date = new Date(time);
    const day = date.getDay()+1;
    const month = date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
    const year = date.getFullYear();
    const hour = date.getHours()<10 ? "0"+date.getHours() : date.getHours();
    const minutes = date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();

    return {
        date,
        day,
        month,
        year,
        hour,
        minutes
    }
}