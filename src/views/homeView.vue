<template>
    <div>
        <div class="nav-bar">
            <div class="flex">
                <Icon icon="tdesign:location" width="24" height="24" />
                <!-- <p>{{ locdata[0].name + ", " + locdata[0].state + ", " + locdata[0].country }}</p> -->
            </div>
            <div>
                <div class="search-bar">
                    <input type="text" placeholder="Search for a city" class="search-input" v-model="addressInput" />
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
                                <p class="text-xs font-light text-slate-400">12:45</p>
                            </div>
                            <p class="font-medium tracking-wider">Monday</p>
                        </div>
                        <div class="cur-temp">
                            <div class="flex ">
                                <p class="mt-5 mb-4 text-6xl font-bold font-chakra">{{
                                    currentWeatherDet && currentWeatherDet.main ?
                                        Math.floor(currentWeatherDet.main.temp) : "N/A"
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
                            <p class="font-semibold font-chakra text-3xl">{{ currentWeatherDet && currentWeatherDet.main
                                ? Math.floor(airqu.list[0].components.pm2_5) : "n/a"
                                }}</p>
                            <div>
                                <p class=" font-medium text-[14px]">PM2.5</p>
                                <p class="font-normal text-[10px]">pg/m<sup>2</sup></p>
                            </div>
                        </div>
                        <p class="mt-2 font-semibold tracking-wide text-center">{{
                            airQualityIndex(airqu.list[0].main.aqi) }}</p>
                        <p class="text-center text-xs">Air Quality</p>
                        <hr class="mt-2 mb-3" />
                        <div class="flex mt-[5px] h-6 w-full items-center" v-for="i in 3" :key="i">
                            <div class="bg-airQuality w-6 h-5 rounded-sm flex justify-center items-center">
                                <p class="text-black text-[12px] font-bold">{{ i === 1 ? 'CO' : (i === 2 ? 'NO' : 'SO')
                                    }}</p>
                            </div>
                            <p class="ml-2 font-chakra text-[15px] font-semibold">{{
                                Math.floor(airqu.list[0].components[i === 1 ? 'co' : (i === 2 ? 'no2' : 'so2')])
                            }} <span class="text-xs font-light">µg/m³</span></p>
                        </div>
                    </div>
                    <div class="map"></div>
                </div>
                <div class="flex justify-between p-3 w-52 text-lg font-light mt-2">
                    <p class="cursor-pointer" @click="today = true" :class="{ 'font-medium': today, }">Today</p>
                    <p class="cursor-pointer" @click="today = false" :class="{ 'font-medium': !today }">
                        Next 6 days
                    </p>
                </div>
                <div class=" detailForecast">
                    <chartComp v-if="today" />
                    <chartofweeks v-if="!today" />
                </div>
            </div>
            <div class="right-box">
                <div class="locationOption">
                    <div v-for="(item, index) in locdata" :key="index">
                        <p>{{ item.name + ", " + item.state + ", " + item.country }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- javascript -->

<script setup>
import { onMounted, ref } from 'vue';
import airqu from '../assets/testdata/airPollution.json';
import { Icon } from '@iconify/vue';
import chartComp from '@/components/chartComp.vue';
import chartofweeks from '@/components/chartofweeks.vue';
import { getCoordFromLocation } from '@/components/locations.js'
import axios from 'axios';

const weekData = ref([
    { day: "Tue", icon: "http://openweathermap.org/img/wn/11n@2x.png", temperature: 23 },
    { day: "Wed", icon: "http://openweathermap.org/img/wn/11n@2x.png", temperature: 23 },
    { day: "Thu", icon: "http://openweathermap.org/img/wn/11n@2x.png", temperature: 23 },
    { day: "Fri", icon: "http://openweathermap.org/img/wn/11n@2x.png", temperature: 23 },
    { day: "Sat", icon: "http://openweathermap.org/img/wn/11n@2x.png", temperature: 23 },
    { day: "Sun", icon: "http://openweathermap.org/img/wn/11n@2x.png", temperature: 23 }
]);
const today = ref(true);
const addressInput = ref("")
const locdata = ref();
const currentWeatherDet = ref(null);

onMounted(() => {
    weatherForecastapiCall(51.5074, 0.1278)
})

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
        try {
            locdata.value = await getCoordFromLocation(address)
            if (locdata.value[0]) {
                const lat = locdata.value[0].lat;
                const lon = locdata.value[0].lon
                weatherForecastapiCall(lat, lon);
            }
            else {
                console.log("unsuccess")
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const weatherForecastapiCall = async (lat, lon) => {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fe4a2cf874351c8fec62995edd68bb0e&units=metric`)
    currentWeatherDet.value = response.data;
}

</script>

<!-- styles -->

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: end;
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
    width: 30rem;
    height: 43rem;
    z-index: 1111;
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

.locationOption {
    background: var(--light-bg-color);
    width: 28rem;
    height: 19rem;
    border-radius: var(--default-border-radius);
}
</style>