import axios from "axios";
const apiKey = "fe4a2cf874351c8fec62995edd68bb0e";

export async function getCoordFromLocation(address) {
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${address}&limit=5&appid=${apiKey}`);
    return response.data;
}
