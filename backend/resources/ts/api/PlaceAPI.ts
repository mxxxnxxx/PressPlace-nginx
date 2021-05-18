import axios from "axios";
import { Place } from "../types/place";

const getPlace = async () => {
    const { data } = await axios.get<Place[]>('api/places');
    console.log(data);
    return data;
}

export {
    getPlace
}