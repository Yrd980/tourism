<template>
  <div class="main-container">
    <div class="attraction-list">
      <div class="attraction-item" v-for="attraction in attractions" :key="attraction.id">
        <img :src="attraction.image" alt="Attraction Image"/>
        <div class="attraction-info">
          <h3>{{ attraction.name }}</h3>
          <p>{{ attraction.description }}</p>
          <el-button plain @click="showMap(attraction.position[0],attraction.position[1])">
            查看
          </el-button>
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogTableVisible" :visible.sync="dialogTableVisible" :key="dialogKey" title="地图"
               width="1280">
      <div class="map-detail-container">
        <div class="map-container">
          <el-amap
              :center="selectPos"
              :zoom="zoom"
              @init="initMap"
              @click="clickMap"
          >
            <el-amap-control-map-type :visible="visible"/>
          </el-amap>
        </div>
        <div class="detail-container">
          <el-input
              v-model="keyword"
              v-if="visible"
              @input="handleSearch"
              :autofocus="true"
              ref="inputValue"
              clearable
              placeholder="输入城市+关键字搜索"
              style="width: 300px"
          >
            <template #loading>
              <svg class="circular" viewBox="0 0 50 50">
                <circle class="path" cx="25" cy="25" r="20" fill="none"/>
              </svg>
            </template>
          </el-input>
          <div class="toolbar">
            <button @click="switchVisible()">
              {{ visible ? '隐藏搜索' : '显示搜索' }}
            </button>
            <button @click="switchClick()">
              {{ click ? '取消设置点' : '设置点' }}
            </button>
          </div>
          <el-tabs v-model="chooseTab" type="card" stretch>
            <!-- 当前天气 -->
            <el-tab-pane name="weather" label="当前天气">
              <div id="weatherContainer">
                <div id="currentWeather">
                  <h2>当前天气</h2>
                  <p><strong>天气状况：</strong>{{ currentWeather.weather }}</p>
                  <p><strong>温度：</strong>{{ currentWeather.temperature }}°C</p>
                  <p><strong>风向：</strong>{{ currentWeather.windDirection }}</p>
                  <p><strong>风力：</strong>{{ currentWeather.windPower }}</p>
                  <p><strong>湿度：</strong>{{ currentWeather.humidity }}%</p>
                </div>
                <div id="forecastWeather">
                  <h2>天气预报</h2>
                  <ul id="forecastList">
                    <li v-for="(forecast, index) in forecasts" :key="index">
                      <p>日期: {{ forecast.date }}
                        白天: {{ forecast.dayWeather }}, {{ forecast.dayTemp }}°C, {{ forecast.dayWindDir }}风
                        {{ forecast.dayWindPower }}级
                        夜间: {{ forecast.nightWeather }}, {{ forecast.nightTemp }}°C, {{ forecast.nightWindDir }}风
                        {{ forecast.nightWindPower }}级
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </el-tab-pane>

            <!-- 交通 -->
            <el-tab-pane name="traffic" label="交通">
              <!-- 目的地输入框 -->
              <el-input v-model="destination" placeholder="请输入目的地" class="input-field"/>

              <!-- 途径点输入框 -->
              <div v-for="(waypoint, index) in waypoints" :key="index" class="waypoint-row">
                <el-input
                    v-model="waypoints[index]"
                    placeholder="请输入途径点"
                    class="input-field"
                />
                <el-button type="danger" :icon="Delete" class="delBut" size="small" circle/>
                <el-button color="" type="text" icon="el-icon-close" @click="removeWaypoint(index)"/>
              </div>

              <!-- 添加途径点按钮 -->
              <el-button type="text" icon="el-icon-plus" @click="addWaypoint">添加途径点</el-button>

              <!-- 终点输入框 -->
              <el-input v-model="finalDestination" placeholder="请输入终点" class="input-field"/>

              <!-- 提交导航按钮 -->
              <el-button type="primary" @click="submitNavigation">导航</el-button>
              <!-- 交通信息展示代码 -->
              <div id="navigation"></div>
            </el-tab-pane>

            <!-- 地址 -->
            <el-tab-pane name="addressTab" v-if="visible" label="地址">
              <div id="panel"></div>
            </el-tab-pane>

            <!-- 景点 -->
            <el-tab-pane name="scenic" label="景点">
              <div id="panel1"></div>
            </el-tab-pane>

            <!-- 美食 -->
            <el-tab-pane name="food" label="美食">
              <div id="panel2"></div>
            </el-tab-pane>

            <!-- 附近的旅店 -->
            <el-tab-pane name="hotel" label="住宿">
              <div id="panel3"></div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="js">
import {onBeforeMount, ref} from 'vue';
import {ElAmap} from "@vuemap/vue-amap";
import RouteUtil from "@/util/routeUtil.js";
import {initMapApi} from "@/util/map.js";
import {attractionData} from "@/views/route/data.js";
import {Delete,} from '@element-plus/icons-vue'

// 地图属性
const zoom = ref(16)
const center = ref([])
const markers = ref([]) //存放标记
const attractions = ref(attractionData); //临时

//函数变量
const currentWeather = ref({}) //当天天气
const forecasts = ref() //预报天气
const chooseTab = ref('weather') //切换标签页,默认展示天气
const selectPos = ref([]) //当前位置
const keyword = ref(''); //搜索关键字
const inputValue = ref(null) //使用el-input的expose
const destination = ref('') // 目的地
const waypoints = ref([]) // 途径点数
const finalDestination = ref('')//终点


// 配置搜索
const defaultOptions = {
  // map: map, 初始化报错因为组件进行设计模式注入
  pageSize: 6, // 单页显示结果条数
  pageIndex: 1, // 页码
  citylimit: false, // 是否强制限制在设置的城市内搜索
  autoFitView: true,
};

let dialogKey = 0 //对话框刷新
let map = null; //地图示例
let poiInfo //搜索的信息
let pos //逆地址得到的信息

//以下为插件名
let geocoder = null //位置
let driving = null //驾车
let placeSearch = null //搜索

//设置可见
const dialogTableVisible = ref(false) //弹出框
const click = ref(false) // 点击设置点
const switchClick = () => {
  click.value = !click.value;
}
const visible = ref(false) // 卫星图等展示
const switchVisible = () => {
  visible.value = !visible.value;
}
const nav = ref(false) // 设置导航
const switchNav = () => {
  nav.value = !nav.value;
}

// 获得地图变量使用插件
const initMap = (mapInstance) => {
  map = mapInstance;
  //添加插件
  AMap.plugin('AMap.Geocoder', () => {
    geocoder = new AMap.Geocoder({
      // ...geoCodeConfig, 'offset': new AMap.Pixel(-18, -36),
    })
  })

  //通用搜索
  AMap.plugin('AMap.PlaceSearch', () => {
    placeSearch = createSearch('', "panel")
  })

  // 添加列表项点击事件监听
  // 无法暴露
  placeSearch.on('listElementClick', e => {
    // 当POI列表项被点击时，执行以下代码
    let tmp = e.data; // 当前选中的POI信息
    poiInfo = RouteUtil.getLocByPoi(tmp)
    let lng = poiInfo[0];
    let lat = poiInfo[1];
    transport(lng, lat);
    // inputValue.value.clear();
  })

  AMap.plugin("AMap.Driving", () => {
    let drivingOptions = {
      map: map,
      panel: "navigation",
      //驾车策略，包括 LEAST_TIME，LEAST_FEE, LEAST_DISTANCE,REAL_TRAFFIC
      policy: AMap.DrivingPolicy.LEAST_TIME,
    };
    // let opts = {
    //   waypoints: [
    //     new AMap.LngLat(121.4957, 31.2304),
    //     new AMap.LngLat(121.4890, 31.2204),
    //   ]
    // }
    driving = new AMap.Driving(drivingOptions);
    //根据起终点坐标规划驾车路线
    // driving.search(new AMap.LngLat(121.4737, 31.2304), new AMap.LngLat(121.4853, 31.2222), opts);
  });

  //放大缩小
  map.plugin('AMap.ToolBar', () => {
    const toolBar = new AMap.ToolBar();
    map.addControl(toolBar);
  })

  //定位
  map.plugin('AMap.Geolocation', () => {
    const navigation = new AMap.Geolocation({
      enableHighAccuracy: true,//是否使用高精度定位，默认:true
      timeout: 10000,          //超过10秒后停止定位，默认：5s
      position: 'LB',    //定位按钮的停靠位置
      offset: [10, 36], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
      zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
    });
    map.addControl(navigation);
  })

  // transport(location.value.longitude, location.value.latitude)
  transport(selectPos.value[0], selectPos.value[1])
};

// 点击展示地图
const showMap = (lng, lat) => {
  dialogKey++
  dialogTableVisible.value = true
  //  方便初始化定位
  selectPos.value = [lng, lat]
  drawMarker(lng, lat)
  //关闭搜索
  inputValue.value.clear()
  switchVisible()
  chooseTab.value = "weather"
}

// 添加途径点输入框
const addWaypoint = () => {
  waypoints.value.push('');
}

// 移除途径点输入框
const removeWaypoint = (index) => {
  waypoints.value.splice(index, 1);
}

const submitNavigation = async (way) => {
  way = driving
  let origin = await getLanAndLong(destination.value);
  let opts = [];
  for (const waypoint of waypoints.value) {
    let pos = await getLanAndLong(waypoint);
    opts.push(new AMap.LngLat(pos));
  }
  let target = await getLanAndLong(finalDestination.value);
  way.search(origin, target, opts,(status,result)=>{
    if(status === 'complement'){
      console.log(result.info)
      console.log(result.routes)
    }
  });
};


const createSearch = (type, panel) => {
  return new AMap.PlaceSearch({
    ...defaultOptions, type, panel, map
  });
}

// 单个搜索
const handleSearch = () => {
  placeSearch.search(keyword.value);
  //切换到地址页面
  chooseTab.value = "addressTab";
  // 防止出现undefined
  if (poiInfo) {
    transport(poiInfo[0], poiInfo[1])
  }
}

//初始化标签页
const initTab = () => {
  const tabOptions = {
    'scenic': {type: '景点', panel: "panel1"},
    'food': {type: '餐饮服务', panel: "panel2"},
    'hotel': {type: '住宿', panel: "panel3"}
  };

  for (const [key, value] of Object.entries(tabOptions)) {
    let placeSearch = createSearch(value.type, value.panel);
    placeSearch.searchNearBy('', selectPos.value, 600, function (status, result) {
          if (status === 'complete') {
            console.log(key + " " + chooseTab.value)
          } else {
            console.log('搜索失败');
          }
        }
    )
  }
}

//点击地图添加点
const clickMap = async e => {
  if (click.value === false) return
  const {lng, lat} = e.lnglat;
  const newMarker = new AMap.Marker({
    position: new AMap.LngLat(lng, lat),
    anchor: 'bottom-center'
  });
  map.add(newMarker);
  markers.value.push(newMarker);

  console.log(1)
  const res = await getLanAndLong('长沙火车站')
  console.log(res)
  console.log(2)
}

// 绘制地点marker
const drawMarker = (longitude, latitude) => {
  let marker = new AMap.Marker({
    position: new AMap.LngLat(longitude, latitude),
    anchor: 'bottom-center',
  });
  markers.value.push(marker);
  map.add(marker);
}

// 跳转
const transport = async (lng, lat) => {
  const res = await RouteUtil.getPosition(lng, lat)
  selectPos.value = [lng, lat]
  const city = res.city
  const weatherData = await RouteUtil.getWeather(city);
  // 提取当前天气
  currentWeather.value = weatherData[0];
  // 提取天气预报
  forecasts.value = weatherData[1].forecasts;
  drawMarker(lng, lat)
  initTab()
  map.setZoomAndCenter(zoom.value, selectPos.value);
}


//逆地址处理
const getLanAndLong = async posName => {

  return new Promise((resolve, reject) => {
    // 使用geocoder的getLocation方法获取位置信息
    geocoder.getLocation(posName, (status, result) => {
      // 检查状态是否为complete并且信息是否为OK
      if (status === "complete" && result.info === "OK") {
        // 获取位置信息
        let pos = result.geocodes[0].location;
        // 解构经纬度
        let {lng, lat} = pos;
        // 如果成功，解析成功，则使用resolve来解决Promise
        resolve([lng, lat]);
      } else {
        // 如果发生错误或者没有找到结果，则使用reject来拒绝Promise
        reject(new Error('Failed to get location for posName: ' + posName));
      }
    });

  })


};
// 根据经纬度获得地址和省市区街区
// async function getGeo(lng, lat) {
//   return new Promise((resolve, reject) => {
//     geocoder.getAddress([lng, lat], (status, result) => {
//       if (status === 'complete' && result.info === 'OK') {
//         const {addressComponent, formattedAddress} = result.regeocode;
//         let {city, province, district} = addressComponent;
//         if (!city) {
//           // 直辖市
//           city = province;
//         }
//         location.value = {
//           longitude: lng,
//           latitude: lat,
//           address: formattedAddress,
//           zone: [province, city, district],
//         };
//         resolve();
//       } else {
//         reject(new Error('Failed to get address'));
//       }
//     });
//   });
// }
// const location = ref({
//   longitude: '',
//   latitude: '',
//   address: '',
//   zone: [],
// })
// const geoCodeConfig = {
//   'showButton': true,//是否显示定位按钮
//   'position': 'LB',//定位按钮的位置
//   /* LT LB RT RB */
//   'offset': [10, 20],//定位按钮距离对应角落的距离
//   'showMarker': true,//是否显示定位点
//   'markerOptions': {//自定义定位点样式，同Marker的Options
//     'content': '<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:36px;height:36px"/>'
//   },
//   'showCircle': true,//是否显示定位精度圈
//   'circleOptions': {//定位精度圈的样式
//     'strokeColor': '#0093FF',
//     'noSelect': true,
//     'strokeOpacity': 0.5,
//     'strokeWeight': 1,
//     'fillColor': '#02B0FF',
//     'fillOpacity': 0.25
//   }
// }
// try {
//   // 使用geocoder的getLocation方法获取位置信息
//   const result = await geocoder.getLocation(posName);
//   // 检查状态是否为complete并且信息是否为OK
//   if (result.status === "complete" && result.info === "OK") {
//     // 获取位置信息
//     const pos = result.geocodes[0].location;
//     // 解构经纬度
//     const {lng, lat} = pos;
//     // 返回经纬度数组
//     return [lng, lat];
//   } else {
//     throw new Error('Failed to get location for posName: ' + posName);
//   }
// } catch (error) {
//   // 如果发生错误，抛出错误
//   throw error;
// }
//
// // 如果有候选词列表
// let suggestions = ''
// const querySearch = (queryString, cb) => {
//   const results = queryString
//       ? suggestions.filter(queryString => {
//         return (suggestion) => {
//           return suggestion.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
//         }
//       })
//       : suggestions;
//   // 调用callback返回建议列表的数据
//   cb(results);
// }

//加快初始化
onBeforeMount(() => {
  initMapApi()
})

</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  height: 800px;
}

.attraction-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.attraction-item {
  width: calc(33.33% - 10px);
  margin-bottom: 20px;
}

.map-detail-container {
  display: flex;
  height: 600px;
}

.map-container {
  flex: 6;
  height: 100%;
}

.detail-container {
  display: flex;
  flex-direction: column;
  flex: 4;
  background-color: #f9f9f9;
  height: 100%;
}

#panel {
  width: 400px;
  height: 500px;
}

#panel1 {
  width: 400px;
  height: 500px;
}

#panel2 {
  width: 400px;
  height: 500px;
}

#panel3 {
  width: 400px;
  height: 500px;
}

#navigation {
  background-color: white;
  top: 10px;
  right: 10px;
  width: 400px;
}

.route-input-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.input-field {
  margin-bottom: 10px;
}

.waypoint-row {
  display: flex;
  align-items: center;
}

.waypoint-row .el-input {
  flex-grow: 1;
  margin-right: 10px;
}

.el-button--text {
  padding: 0;
}

.delBut {
  transform: scale(0.85) translateY(-10px);
}

</style>

