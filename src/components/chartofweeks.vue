<template>
    <div class="w-[63rem] h-full flex overflow-hidden">
        <div
            class="bg-forecastbox w-14 h-full text-black rounded-md flex flex-col justify-evenly items-center font-medium mr-4">
            <button @click="updatechartdata('Sun')">Sun</button>
            <button @click="updatechartdata('Mon')">Mon</button>
            <button @click="updatechartdata('Tue')">Tue</button>
            <button @click="updatechartdata('Wed')">Wed</button>
            <button @click="updatechartdata('Thu')">Thu</button>
            <button @click="updatechartdata('Fri')">Fri</button>
            <button @click="updatechartdata('Sat')">Sat</button>
        </div>
        <div class="w-full h-full flex">
            <canvas id="chartCanvas"></canvas>
            <div class="border ml-2 border-neutral-600 mr-3"></div>
            <div class="w-[185px]">
                <div class="w-full h-10 bg-forecastbox rounded-lg flex items-center justify-between px-2 text-black">
                    <p class="font-normal">Monday</p>
                    <p class="font-chakra font-semibold text-[18px]"
                        v-if="updatedDates.length !== 0 && updatedDates.length !== null && dataindex < updatedDates.length">
                        {{
                            updatedDates[dataindex]?.dt_txt.slice(11, 16) }}
                    </p>
                </div>
                <div class="flex items-center justify-center flex-col ">
                    <p class="mt-5 text-6xl font-bold font-chakra"
                        v-if="updatedDates.length !== 0 && updatedDates.length !== null">{{
                            updatedDates[dataindex].main.temp }}<sup>c</sup>
                    </p>
                    <p class="text-[10px] font-light">Feels like 28.09</p>
                    <div class="w-full h-48  rounded-lg text-slate-400 py-4 pl-3  flex justify-between flex-wrap">
                        <div class=" w-[75px] h-30  flex flex-col rounded-lg items-center py-3"
                            v-for="(item, index) in grapWeatherData" :key="index">
                            <Icon :icon="item[1]" width="20" height="20" :color="item[2]" />
                            <p class="font-chakra text-[25px] font-bold mb-[-5px] text-slate-300">{{ item[3] }}<span
                                    class="font-light text-sm">{{ item[4]
                                    }}</span></p>
                            <p class="font-medium text-[10px] ">{{ item[0] }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Chart } from 'chart.js/auto';
import { ref, onMounted } from 'vue';
import forecast from '../assets/testdata/forecast.json';
import { Icon } from '@iconify/vue';

const months = ref(['00:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00']);
const dateList = ref({});
let myChart = null;
let updatedDates = ref([])
const dataindex = ref(0);
let grapWeatherData = ref();

const initial = () => {
    const ctx = document.getElementById('chartCanvas').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months.value,
            datasets: [
                {
                    label: 'My First Dataset',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: []
                }],
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    },
    );
};

onMounted(() => {
    initial();

    const dateSet = new Set();
    forecast.list.forEach(element => {
        dateSet.add(element.dt_txt.slice(0, 10));
    });

    for (const i of dateSet) {
        dateList.value[getDayofweek(i)] = i;
    }
    myChart.canvas.onclick = onclickevent;
});

const getDayofweek = (date) => {
    const days = ref(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
    const d = new Date(date);
    return days.value[d.getDay()];
}

const updatechartdata = (item) => {
    updatedDates.value = forecast.list.filter(element => element.dt_txt.includes(dateList.value[item]));
    myChart.data.datasets[0].data = updatedDates.value.map(e => e.main.temp);
    myChart.update();
};

const onclickevent = (click) => {
    const points = myChart.getElementsAtEventForMode(click, 'nearest', { intersect: false }, true);
    if (points[0]) {
        dataindex.value = points[0].index;
        grapWeatherData = [
            ["wind", "tabler:wind", "green", forecast.list[dataindex.value].wind.speed, "km"],
            ["Humidity", "lets-icons:humidity", "red", forecast.list[dataindex.value].main.humidity, "%"],
            ["Pressure", "lets-icons:pressure", "red", forecast.list[dataindex.value].main.pressure, "MB"],
            ["visibility", "material-symbols:visibility-outline", "red", forecast.list[dataindex.value].visibility / 1000, "km"]
        ]
    }
}

</script>

<style scoped></style>