<template>
    <div id="map"></div>
</template>

<script setup>
import leaflet, { map } from 'leaflet';
import { ref, onMounted } from 'vue';
import 'leaflet.fullscreen/Control.FullScreen.js';
import 'leaflet.fullscreen/Control.FullScreen.css';

onMounted(async () => {
    let map = leaflet.Map;
    map = leaflet
        .map("map")
        .setView([12.9141, 74.8560], 13);

    leaflet
        .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        })
        .addTo(map);
    leaflet.control.fullscreen({
        position: 'topright',
        title: 'show me the fullscreen',
        titleCancel: 'Exit fullscreen',
        forceSeparateButton: true,
        forcePseudoFullscreen: true,
        fullscreenElement: false
    }).addTo(map);
})  
</script>

<style scoped>
#map {
    height: 100%;
    width: 100%;
    border-radius: 1.1rem;
}
</style>
