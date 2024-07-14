<template>
  <div style="height: 500px;">
    <el-amap @init="initMap" @click="clickMap">
      <el-amap-marker v-if="markerCenter" v-model:position="markerCenter" anchor="bottom-center" :draggable="true" @dragend="dragMarker"></el-amap-marker>
    </el-amap>
  </div>
  <div>
    <button @click="selectPoint">地图选点</button>
    <span style="margin: 0 20px;">地址：</span>
    <span>{{address}}</span>
  </div>
</template>
<script setup>

import { ref, onBeforeMount } from "vue";
import {initMapApi} from "@/util/map.js";

onBeforeMount(() => {
  initMapApi()
})

let geocoder = null

const markerCenter = ref()

const address = ref('')

let canSelect = false
const selectPoint = () => {
  canSelect = true
  markerCenter.value = null
}

const initMap = (map) => {
  AMap.plugin('AMap.Geocoder', () => {
    geocoder = new AMap.Geocoder({
    })
  })
}

const clickMap = (e) => {
  if(!canSelect){
    return
  }
  markerCenter.value = [e.lnglat.lng, e.lnglat.lat]
  canSelect = false
  convertLocation()
  console.log('click map: ', e)
}

const convertLocation = () => {
  if(geocoder){
    geocoder.getAddress(markerCenter.value, (status, result) => {
      if (status === 'complete' && result.info === 'OK') {
        console.log('result: ', result)
        address.value = result.regeocode.formattedAddress
      }
    })
  }
}

const dragMarker = () => {
  convertLocation()
}

</script>

<style>
</style>

