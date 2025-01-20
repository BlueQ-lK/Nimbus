<template>
    <div>
        <div class="nav-bar">
            <div class="flex w-64">
                <Icon icon="tdesign:location" width="24" height="24" />
                <p v-if="location && location.name">{{ location.name }}, </p>
                <p v-if="location && location.state" class="ml-2"> {{ location.state }}, </p>
                <p v-if="location && location.country" class="ml-2">{{ location.country }} </p>
                <p v-else>Londan</p>
            </div>
            <div>
                <h1 class="logo cursor-default"><span class="text-red-600 font-bold">N</span>imbus</h1>
            </div>
            <div>
                <div class="search-bar">
                    <input type="text" placeholder="Search for a city" class="search-input" v-model="addressInput"
                        @keydown.enter="searchClickEvent(addressInput)" />
                    <div class="w-20 flex items-center bg-black rounded-r-[24px] justify-center h-full ">
                        <Icon icon="bx:bx-search" width="24" height="24" @click="searchClickEvent(addressInput)" />
                    </div>
                </div>
            </div>
        </div>
        <div class="flex">
            <div class="left-box">
                <div class="flex">
                    <div class="current-det">
                        <div class="flex justify-between items-top">
                            <div>
                                <p class="text-xs font-light">Current weather</p>
                                <p class="text-xs font-light text-slate-400">{{ currentTimeToDisplay }}</p>
                            </div>
                            <p class="font-medium tracking-wider">{{ presentDayname }}</p>
                        </div>
                        <div class="cur-temp">
                            <div class="flex ">
                                <p class="mt-5 mb-4 text-6xl font-bold font-chakra">{{
                                    currentWeatherDet && currentWeatherDet.main ?
                                        Math.floor(currentWeatherDet.main.temp) : null
                                }}°<sup>c</sup>
                                </p>
                                <img :src="`http://openweathermap.org/img/wn/${currentWeatherDet ? currentWeatherDet.weather[0].icon : null}@2x.png`"
                                    class="ml-10 size-24" />
                            </div>
                            <div class="flex w-full h-20 ">
                                <div class="ml-2">
                                    <p class="mb-1 text-xs font-light">Feels like <span
                                            class="text-sm font-semibold font-chakra">{{
                                                currentWeatherDet && currentWeatherDet.main ?
                                                    currentWeatherDet.main.feels_like : "N/A"
                                            }}°</span>
                                    </p>
                                    <p class="mb-1 text-xs font-light">Wind: <span
                                            class="text-sm font-semibold font-chakra">{{
                                                currentWeatherDet && currentWeatherDet.main ? currentWeatherDet.wind.speed :
                                                    "N/A" }} km/h
                                        </span></p>
                                    <p class="text-xs font-light">Wind direction: <span
                                            class="text-sm font-semibold font-chakra">{{
                                                currentWeatherDet && currentWeatherDet.main ? currentWeatherDet.wind.deg :
                                                    "N/A"
                                            }}</span></p>
                                </div>
                                <div class="ml-10">
                                    <p class="mb-1 text-xs font-light">Humidity: <span
                                            class="text-sm font-semibold font-chakra">{{
                                                currentWeatherDet && currentWeatherDet.main ?
                                                    currentWeatherDet.main.humidity : "N/A"
                                            }}%</span></p>
                                    <p class="mb-1 text-xs font-light">Visibility: <span
                                            class="text-sm font-semibold font-chakra">{{
                                                currentWeatherDet && currentWeatherDet.main ? currentWeatherDet.visibility /
                                                    1000 : "N/A" }}
                                            km</span></p>
                                    <p class="text-xs font-light">Pressure: <span
                                            class="text-sm font-semibold font-chakra">{{
                                                currentWeatherDet && currentWeatherDet.main ?
                                                    currentWeatherDet.main.pressure : "N/A" }}MB</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between flex-col mr-4">
                        <div class="sundetail">
                            <div>
                                <p class="text-sm font-light mb-2">Sunrise</p>
                                <p class="font-chakra text-2xl font-medium">{{
                                    currentWeatherDet && currentWeatherDet.main ?
                                        dateFormater(currentWeatherDet.sys.sunrise) : "n/a" }}
                                </p>
                            </div>
                            <Icon icon="hugeicons:sunrise" width="80" height="80" class="ml-5 stroke-[4px]"
                                color="#ffa700" />
                        </div>
                        <div class="sundetail">
                            <div>
                                <p class="text-sm font-light mb-2">Sunset</p>
                                <p class="font-chakra text-2xl font-medium">{{
                                    currentWeatherDet && currentWeatherDet.main ?
                                        dateFormater(currentWeatherDet.sys.sunset) : "n/a" }}
                                </p>
                            </div>
                            <Icon icon="hugeicons:sunset" width="80" height="80" class="ml-5 stroke-[4px]"
                                color="#ff8100" />
                        </div>
                    </div>
                    <div class="airquality">
                        <div
                            class="bg-airQuality w-full h-14 rounded-lg text-black flex py-2 items-center justify-evenly px-1.5">
                            <p class="font-semibold font-chakra text-3xl">{{ airQualityDet
                                ? Math.floor(airQualityDet.list[0].components.pm2_5) : "n/a"
                                }}</p>
                            <div>
                                <p class=" font-medium text-[14px]">PM2.5</p>
                                <p class="font-normal text-[10px]">pg/m<sup>2</sup></p>
                            </div>
                        </div>
                        <p class="mt-2 font-semibold tracking-wide text-center">{{
                            airQualityDet ? airQualityIndex(airQualityDet.list[0].main.aqi) : "N/A" }}</p>
                        <p class="text-center text-xs">Air Quality</p>
                        <hr class="mt-2 mb-3" />
                        <div class="flex mt-[5px] h-6 w-full items-center" v-for="i in 3" :key="i">
                            <div class="bg-airQuality w-6 h-5 rounded-sm flex justify-center items-center">
                                <p class="text-black text-[12px] font-bold">{{ i === 1 ? 'CO' : (i === 2 ? 'NO' : 'SO')
                                    }}</p>
                            </div>
                            <p class="ml-2 font-chakra text-[15px] font-semibold">{{
                                airQualityDet ? Math.floor(airQualityDet.list[0].components[i === 1 ? 'co' : (i === 2 ?
                                    'no2' : 'so2')]) : "n/a "
                            }} <span class="text-xs font-light">µg/m³</span></p>
                        </div>
                    </div>
                    <div class="map">
                        <mapComp />
                    </div>
                </div>
                <div class="flex justify-between p-3 w-52 text-lg font-light mt-2">
                    <p>Weather Forecast</p>
                </div>
                <div class=" detailForecast">
                    <chartComp :dataparent="childata" />
                </div>
            </div>
            <div class="right-box">
                <div class=" w-full h-28 mb-5 flex items-center cursor-pointer justify-center    hover:bg-slate-600 rounded-lg"
                    v-for="(item, index) in newsResult" :key="index"
                    @click="openNewsPageOnclick(item.news_obj.source_url)">
                    <img :src="item.news_obj.image_url" alt="" class="w-24 h-full mr-4 rounded-lg">
                    <div>
                        <p class="font-light text-sm line-clamp-4 max-h20">{{ item.news_obj.title }}</p>
                        <p class="font-extralight text-[12px]  text-slate-400 mt-1">Source: {{
                            item.news_obj.source_name }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- javascript -->

<script setup>
import { onMounted, ref, onUnmounted } from 'vue';
import { Icon } from '@iconify/vue';
import chartComp from '@/components/chartComp.vue';
import { getCoordFromLocation } from '@/components/locations.js'
import axios from 'axios';
import mapComp from '../components/mapComp.vue'

const addressInput = ref("")
const currentWeatherDet = ref(null);
const airQualityDet = ref(null);
const childata = ref(null);
let currentTimeToDisplay = ref("");
const location = ref(null)
const newsResult = ref(null);


const openNewsPageOnclick = (item) => {
    window.open(item, '_blank');
}


const presentDayname = new Date().toLocaleString('en-US', { weekday: 'long' });
setInterval(() => {
    let date = new Date();
    currentTimeToDisplay.value = date.toLocaleTimeString();
}, 1000)

onMounted(() => {
    weatherForecastapiCall(51.5074, 0.1278);
    newsInformation();
})

const newsInformation = async () => {
    try {
        const response = await axios.get('https://cors-anywhere.herokuapp.com/https://inshorts.com/api/en/news?category=all_news&max_limit=5&include_card_data=true');
        newsResult.value = response.data.data.news_list
    } catch (error) { console.log(error) }
}

const dateFormater = (date) => {
    return new Date(date * 1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' });
}

const airQualityIndex = (data) => {
    switch (data) {
        case 1:
            return "Good";
        case 2:
            return "Fair";
        case 3:
            return "Moderate";
        case 4:
            return "Poor";
        case 5:
            return "Very Poor";
    }
}

const searchClickEvent = async (address) => {
    if (address) {
        location.value = await getCoordFromLocation(address)
        if (Object.keys(location.value).length !== 0) {
            weatherForecastapiCall(location.value.lat, location.value.lon);
        }
        else {
            console.log("empty location")
        }
    }
}

const weatherForecastapiCall = async (lat, lon) => {
    const apikey = "fe4a2cf874351c8fec62995edd68bb0e";
    try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`)
        currentWeatherDet.value = response.data;
    }
    catch (error) { console.log(error); }
    try {
        const airqualityResponse = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apikey}`)
        airQualityDet.value = airqualityResponse.data;
    }
    catch (error) { console.log(error) };
    try {
        const forecastResponse = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`);
        childata.value = forecastResponse.data;
    }
    catch (error) { console.log(error); }
}

</script>

<!-- styles -->

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.logo {
    font-size: 25px;
    font-family: "Cinzel Decorative", serif;
    font-weight: 400;
    font-style: normal;
    letter-spacing: 2px;
}

.nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2.5rem;
    margin-bottom: 1.6rem;
}

.search-bar {
    background: var(--light-bg-color);
    display: flex;
    align-items: center;
    height: 2.2rem;
    border-radius: 24px;
    width: 19rem;
    padding-left: 0.5rem;
}

.search-input,
.search-input::placeholder {
    color: rgba(255, 255, 255, 0.696);
    background: transparent;
    outline: transparent;
    border: none;
    width: 15rem;
    height: 100%;
    border-radius: 24px 0 0 24px;
    padding: 0.7rem;
    font-size: 13px;
}

/* container */
.left-box {
    width: 70rem;
    height: 43rem;
}

.current-det {
    background: var(--light-bg-color);
    width: 20rem;
    height: 15rem;
    border-radius: var(--default-border-radius);
    padding: 1.2rem 1rem 0.7rem 1rem;
    margin-right: 1rem;
    overflow: scroll;
}

.right-box {
    background: var(--light-bg-color);
    width: 30rem;
    height: 43rem;
    border-radius: var(--default-border-radius);
    padding: 1.5rem;
}


.sundetail {
    background: var(--light-bg-color);
    width: 15rem;
    height: 7rem;
    border-radius: var(--default-border-radius);
    display: flex;
    padding: 1.3rem 1rem;
}

.airquality {
    background: var(--light-bg-color);
    width: 8rem;
    height: 15rem;
    border-radius: var(--default-border-radius);
    margin-right: 1rem;
    padding: 1rem 0.7rem;
}

.map {
    background: var(--light-bg-color);
    width: 17rem;
    height: 15rem;
    border-radius: var(--default-border-radius);
}

.detailForecast {
    background: var(--light-bg-color);
    width: 63rem;
    height: 24rem;
    border-radius: var(--default-border-radius);
    display: flex;
    padding: 1rem;
}
</style>