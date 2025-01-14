<template>
    <div class="flex overflow-hidden">
        <div
            class="bg-forecastbox w-14 h-full text-black rounded-md flex flex-col justify-evenly items-center font-medium mr-4">
            <div v-for="day in days" :key="day">
                <button @click="updatechartdata(day)" :class="{ 'bg-slate-50 w-11 h-8': inputDate === day }"
                    v-if="dateList[day]">{{ day
                    }}</button>
                <button v-else class="opacity-50" disabled>{{ day }}</button>
            </div>
        </div>
        <canvas id="chartCanvas"></canvas>
        <div class="border ml-2 border-neutral-600 mr-3"></div>
        <div class="w-[250px] ">
            <div class="w-full h-10 bg-forecastbox rounded-lg flex items-center justify-between px-2 text-black">
                <div v-if="dataparent">
                    <p class="font-normal" v-if="inputDate === 'Sun'">Sunday</p>
                    <p class="font-normal" v-else-if="inputDate === 'Mon'">Monday</p>
                    <p class="font-normal" v-else-if="inputDate === 'Tue'">Tuesday</p>
                    <p class="font-normal" v-else-if="inputDate === 'Wed'">Wednesday</p>
                    <p class="font-normal" v-else-if="inputDate === 'Thu'">Thursday</p>
                    <p class="font-normal" v-else-if="inputDate === 'Fri'">Friday</p>
                    <p class="font-normal" v-else-if="inputDate === 'Sat'">Saturday</p>
                </div>
                <p v-else>Loading...</p>
                <p class="font-chakra font-semibold text-[18px]">{{ filterChartOnPoints ?
                    filterChartOnPoints[dataindex].dt_txt.slice(11, 16) : null }}
                </p>
            </div>
            <div class="flex items-center justify-center flex-col ">
                <p class="mt-5 text-6xl font-bold font-chakra">{{ filterChartOnPoints ?
                    Math.round(filterChartOnPoints[dataindex].main.temp) : null }}<sup
                        v-if="filterChartOnPoints">c</sup>
                </p>
                <p class="text-[10px] font-light" v-if="filterChartOnPoints">Feels like {{ filterChartOnPoints ?
                    filterChartOnPoints[dataindex].main.feels_like : null }}</p>
            </div>

            <div class="w-full h-48  rounded-lg text-slate-400  flex justify-evenly flex-wrap pl-1">
                <p v-if="!filterChartOnPoints" class="mt-20 align-middle">Click any points on chart for more details</p>
                <div class=" w-20 h-30 flex flex-col rounded-lg items-center py-3 "
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
import { ref, onMounted, onUnmounted, watchEffect } from 'vue';
import { Icon } from '@iconify/vue';


const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const labels = ref(['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']);
const dataindex = ref(0);
let myChart = null;
let grapWeatherData = ref([]);
let chartData = ref([]);
const dateList = ref({});
const inputDate = ref(null);
const filterDataforchart = ref(null);
const filterChartOnPoints = ref(null);

const props = defineProps({
    dataparent: {
        type: Object,
        required: false,
        default: null
    },
    coord: {
        type: String,
        required: false
    }
})

const chartDataExtracter = () => {
    //const currentdate = new Date().toISOString().split('T')[0];
    const currentdate = dateList.value[inputDate.value]
    console.log(currentdate)
    filterDataforchart.value = props.dataparent.list.filter((item) => item.dt_txt.startsWith(currentdate));
    chartData.value = labels.value.map((ele) => {
        const item = filterDataforchart.value.find((item) => ele === item.dt_txt.slice(11, 16));
        return item ? item.main.temp : null;
    });
}

const initial = () => {
    const ctx = document.getElementById('chartCanvas').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels.value,
            datasets: [{
                label: 'Temparature:',
                data: chartData.value,
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

onUnmounted(() => {
    if (myChart) {
        myChart.destroy();
    }
});

const updatechartdata = (item) => {
    inputDate.value = item;
    chartDataExtracter();
    myChart.data.datasets[0].data = chartData.value;
    myChart.update();
};

const getDayofweek = (date) => {
    const days = ref(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
    const d = new Date(date);
    return days.value[d.getDay()];
}

watchEffect(() => {
    if (props.dataparent) {
        const dateSet = new Set();
        props.dataparent.list.forEach(element => {
            dateSet.add(element.dt_txt.slice(0, 10));
        });

        for (const i of dateSet) {
            dateList.value[getDayofweek(i)] = i;
        }
        if (myChart) {
            myChart.canvas.onclick = onclickevent;
        } else {
            initial();
            myChart.canvas.onclick = onclickevent;
        }
    }
});

const onclickevent = (click) => {
    const points = myChart.getElementsAtEventForMode(click, 'nearest', { intersect: true }, true);
    if (points[0]) {
        dataindex.value = points[0].index;

        filterChartOnPoints.value = labels.value.map((ele) => {
            const item = filterDataforchart.value.find((item) => ele === item.dt_txt.slice(11, 16))
            return item ? item : null
        })
        console.log(dataindex.value)
        console.log(filterChartOnPoints.value[dataindex.value].main.temp)
        grapWeatherData = [
            ["wind", "tabler:wind", "green", filterChartOnPoints.value[dataindex.value].wind.speed, "km"],
            ["Humidity", "lets-icons:humidity", "red", filterChartOnPoints.value[dataindex.value].main.humidity, "%"],
            ["Pressure", "lets-icons:pressure", "red", filterChartOnPoints.value[dataindex.value].main.pressure, "MB"],
            ["visibility", "material-symbols:visibility-outline", "red", filterChartOnPoints.value[dataindex.value].visibility / 1000, "km"]
        ]

    }
}
</script>
