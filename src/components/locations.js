import axios from "axios";

const apiKey = "fe4a2cf874351c8fec62995edd68bb0e";
export async function getCoordFromLocation(address) {
    try {
        const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${address}&limit=5&appid=${apiKey}`);
        
        if (response.data && response.data[0]) {
            const lat = response.data[0].lat;
            const lon = response.data[0].lon;
            return { lat, lon  };
        } else {
            console.log("Location not found.");
        }
    } catch (error) {
        console.log("API call error:", error);
    }
}