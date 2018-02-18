export function handleDistance(distance){
    if(Number(distance)/1000>=1){
        return Number(distance)/1000 + "km";
    }else{
        return distance + 'm';
    }
}