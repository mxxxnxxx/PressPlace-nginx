import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import { Inputs } from "../../types/Inputs";
import { Places } from "../../types/Places";

const getPlaceSearch = async (page: number, InputsData?: Inputs,): Promise<Places> => {
    const { data } = await axios.get(`/api/places/search?page=${page}`, { params: InputsData });
    return camelcaseKeys(data, { deep: true });
};
export default getPlaceSearch