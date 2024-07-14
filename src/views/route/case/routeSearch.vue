<template>
  <div class="map-wrapper">
    <div id="mapcontainer"></div>
    <div class="search-box">
      <el-autocomplete
          v-model="keyword"
          :fetch-suggestions="handleSearch"
          :trigger-on-focus="false"
          clearable
          placeholder="输入城市+关键字搜索"
          @select="handleSelect"
          style="width: 300px"
      />
      <el-input
          v-model="location.longitude"
          placeholder="点击地图选择经度"
          maxlength="15"
          readonly
          style="width: 150px; margin: 0 5px"
      ></el-input>
      <el-input
          v-model="location.latitude"
          placeholder="点击地图选择纬度"
          maxlength="15"
          readonly
          style="width: 150px"
      ></el-input>
    </div>
  </div>
</template>

<script setup>
import AMapLoader from '@amap/amap-jsapi-loader';
import mapConfig from "@/config/mapConfig.js";
import {computed, onMounted, ref, shallowRef, watch} from "vue";
window._AMapSecurityConfig = {
  securityJsCode: mapConfig.securityJsCode,
};
const props = defineProps({
  modelValue: {
    type: Object,
    default() {
      return {
        longitude: '', latitude: ''
      };
    },
  },
});
const emit = defineEmits(['update:modelValue']);
const map = shallowRef(null);
// 地点
const location = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});
watch(location, (val) => {
      if (val.longitude && val.latitude) {
        drawMarker();
      }
    }
);
const keyword = ref('');
let placeSearch, AMapObj, marker, geocoder;
function initMap() {
  AMapLoader.load({
    key: mapConfig.key, // 申请好的Web端Key，首次调用 load 时必填
    version: '2.0'
  }).then(AMap => {
    AMapObj = AMap;
    map.value = new AMap.Map('mapcontainer');
    // 添加点击事件
    map.value.on('click', onMapClick);
    if (location.value.longitude) {
      drawMarker();
    }
    AMap.plugin(
        ['AMap.ToolBar','AMap.Scale','AMap.Geolocation','AMap.PlaceSearch', 'AMap.Geocoder'],
        () => {
          // 缩放条
          const toolbar = new AMap.ToolBar();
          // 比例尺
          const scale = new AMap.Scale();
          // 定位
          const geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 10000, //超过10秒后停止定位，默认：5s
            position: 'RT', //定位按钮的停靠位置
            buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
          });
          geocoder = new AMap.Geocoder({
            city: '全国',
          });
          map.value.addControl(geolocation);
          map.value.addControl(toolbar);
          map.value.addControl(scale);
          placeSearch = new AMap.PlaceSearch({
            map: map.value,
            city: '',
            pageSize: 30, // 单页显示结果条数
            pageIndex: 1, // 页码
            citylimit: false, // 是否强制限制在设置的城市内搜索
            autoFitView: true,
          });
        }
    );
  })
}
onMounted(() => {
  // initMap();
});
// 搜索地图
function handleSearch(queryString, cb) {
  placeSearch.search(queryString, (status, result) => {
    if (result && typeof result === 'object' && result.poiList) {
      const list = result.poiList.pois;
      list.forEach(item => {
        item.value = item.name;
        item.label = item.name;
      });
      cb(list);
    } else {cb([])}
  });
}
// 点击地图
function onMapClick(e) {
  const { lng, lat } = e.lnglat;
  // 逆地理编码
  geocoder.getAddress([lng, lat], (status, result) => {
    console.log("result", result);
    if (status === 'complete' && result.info === 'OK') {
      const { addressComponent, formattedAddress } = result.regeocode;
      let { city, province, district } = addressComponent;
      if (!city) {
        // 直辖市
        city = province;
      }
      location.value = {
        longitude: lng,
        latitude: lat,
        address: formattedAddress,
        zone: [province, city, district],
      };
      console.log(location.value)
    }
  });
}
// 点击搜索项
function handleSelect(item) {
  const { pname, cityname, adname, address, name } = item;
  const { lng, lat } = item.location;
  location.value = {
    longitude: lng,
    latitude: lat,
    address,
    zone: [pname, cityname, adname],
    name,
  };
  map.value.setZoomAndCenter(16, [lng, lat]);
}
// 绘制地点marker
function drawMarker(val) {
  const { longitude, latitude } = location.value || val;
  if (marker) {
    marker.setMap(null);
  }
  marker = new AMapObj.Marker({
    position: new AMapObj.LngLat(longitude, latitude),
    anchor: 'bottom-center',
  });
  map.value.add(marker);
  map.value.setZoomAndCenter(16, [longitude, latitude]);
}
</script>

<style lang="scss" scoped>
.map-wrapper {
  position: relative;
  width: 100%;
  height: 400px;
  #mapcontainer {
    width: 100%;
    height: 100%;
  }
  .search-box {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
    display: flex;
    align-items: center;
  }
}
</style>

