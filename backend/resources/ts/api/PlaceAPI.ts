import axios from "axios";
import { Place } from "../place/types/Place";

const getPlace = async () => {
    const { data } = await axios.get<Place[]>('api/places');
    return data;
}

export {
    getPlace
}