<template>
    <div class="flex overflow-hidden">
        <canvas id="chartCanvas"></canvas>
        <div class="border ml-2 border-neutral-600 mr-3"></div>
        <div class="w-[250px] ">
            <div class="w-full h-10 bg-forecastbox rounded-lg flex items-center justify-between px-2 text-black">
                <p class="font-normal">Monday</p>
                <p class="font-chakra font-semibold text-[18px]">{{ forecast.list[dataindex].dt_txt.slice(11, 16) }}
                </p>
            </div>
            <div class="flex items-center justify-center flex-col ">
                <p class="mt-5 text-6xl font-bold font-chakra">{{ forecast.list[dataindex].main.temp }}<sup>c</sup>
                </p>
                <p class="text-[10px] font-light">Feels like 28.09</p>
            </div>
            <div class="w-full h-48  rounded-lg text-slate-400 p-4 flex justify-evenly flex-wrap">
                <div class=" w-20 h-30 flex flex-col rounded-lg items-center py-3"
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
</template>

<script setup>
import { Chart } from 'chart.js/auto';
import { ref, onMounted, onUnmounted } from 'vue';
import forecast from '../assets/testdata/forecast.json';
import { Icon } from '@iconify/vue';

const labels = ref(['00:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00']);
const dataindex = ref(0);
let myChart = null;
let grapWeatherData = ref()
const initial = () => {
    const ctx = document.getElementById('chartCanvas').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels.value,
            datasets: [{
                label: 'Temparature:',
                data: forecast.list.map((item) => item.main.temp),
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    grid: {
                        display: false
                    },
                },
            },
        }
    })
}


onMounted(() => {
    initial();

    myChart.canvas.onclick = onclickevent;
});

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