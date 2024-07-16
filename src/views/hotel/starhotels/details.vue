<template>
    <!-- 外层容器，用于包裹酒店信息和选项卡 -->
    <div class="hotelMsg">
        <!-- 如果hotel对象存在，显示酒店信息 -->
        <div v-if="hotel" class="hotel-card">
            <div class="header">
                <!-- 显示酒店名称 -->
                <h2>{{ hotel.name }}</h2>
            </div>
            <div class="content">
                <div class="left">
                    <!-- 显示酒店图片 -->
                    <img :src="hotel.imageUrl" class="hotel-image" alt="hotel image" />
                </div>
                <div class="right">
                    <!-- 显示酒店星级 -->
                    <p><strong>星级:</strong> {{ hotel.starLevel }}</p>
                    <!-- 显示酒店总余量 -->
                    <p><strong>总余量:</strong> {{ hotel.totalQuantity }}</p>
                    <!-- 显示酒店地址 -->
                    <p><strong>地址:</strong> {{ hotel.address }}</p>
                    <div class="map-container">
                        <!-- 链接到地图，显示酒店位置 -->
                        <a :href="mapLink" target="_blank">查看大地图</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="select">
            <div class="head">
                <!-- 使用el-tabs组件实现选项卡切换 -->
                <el-tabs v-model="selectName" class="tabs" @tab-click="handleClick">
                    <!-- 房间选项卡 -->
                    <el-tab-pane label="房间" name="first">
                        <div class="roomSelect">
                            <!-- 房型选择下拉菜单 -->
                            <el-select v-model="selectedRoomTypes" multiple placeholder="房型" style="width: 240px" @change="onRoomTypeChange(selectedRoomTypes)">
                                <el-option v-for="item in roomTypeOptions" :key="item.value" :label="item.label" :value="item.value"/>
                            </el-select>
                            <!-- 价格范围选择下拉菜单 -->
                            <el-select v-model="selectedPrices" multiple clearable collapse-tags placeholder="价格范围" popper-class="custom-header"
                                       :max-collapse-tags="1" style="width: 240px"@change="onRoomPriceChange">
                                <!-- 自定义头部，包含价格滑块 -->
                                <template #header>
                                    <div class="slider-demo-block">
                                        <span class="demonstration">最低价格</span>
                                        <el-slider class="cost" v-model="sliderValue" :step="50" show-stops :max="7000" @change="onRoomPriceChange"/>
                                    </div>
                                </template>
                                <el-option v-for="item in prices" :key="item.value" :label="item.label" :value="item.value"/>
                            </el-select>
                        </div>
                        <div class="roomType">
                            <!-- 使用el-scrollbar实现房型列表滚动 -->
                            <el-scrollbar height="400px">
                                <!-- 遍历并显示可见的房型列表 -->
                                <div v-for="room in roomListVisible" :key="room.id" class="scrollbar-demo-item">
                                    <div class="room-head">
                                        <!-- 显示房型名称 -->
                                        <h3>{{ room.name }}</h3>
                                    </div>
                                    <div class="room-content">
                                        <div class="card-left">
                                            <!-- 显示房型图片 -->
                                            <img :src="room.imageUrl" class="room-image" alt="hotel image" />
                                        </div>
                                        <div class="card-right">
                                            <!-- 显示房型价格 -->
                                            <p><strong>价格:</strong> <span class="price">￥{{ room.price }}</span> </p>
                                            <!-- 显示房型剩余量 -->
                                            <p><strong>剩余量:</strong> {{ room.quantity }}间</p>
                                            <!-- 显示房型销售量 -->
                                            <p><strong>营销量:</strong> <span class="sales">超{{ room.sales }}次被预订！</span> </p>
                                            <!-- 预订按钮，点击后弹出预订对话框 -->
                                            <el-button type="warning" @click="handleBooking(room)">
                                                <span class="booking">预订</span>
                                            </el-button>
                                            <div>
                                                <!-- 预订对话框 -->
                                                <el-dialog class="myDialog" v-model="dialogVisible" title="预订房间" @close="handleDialogClose" >
                                                    <div>
                                                        <!-- 显示选中的房间名称 -->
                                                        <p>房间名: {{selectedRoom.name}}</p>
                                                        <!-- 预订信息表单 -->
                                                        <el-form :model="bookingForm" label-width="80px">
                                                            <el-form-item label="姓名" prop="name">
                                                                <el-input v-model="bookingForm.name"></el-input>
                                                            </el-form-item>
                                                            <el-form-item label="联系电话" prop="phone">
                                                                <el-input v-model="bookingForm.phone"></el-input>
                                                            </el-form-item>
                                                            <el-form-item label="住房时间" prop="time">
                                                                <div class="block">
                                                                    <span class="demonstration"></span>
                                                                    <!-- 日期选择器，用于选择住房时间 -->
                                                                    <el-date-picker v-model="clockBooking" type="daterange"
                                                                                    range-separator="To" start-placeholder="Start date"
                                                                                    end-placeholder="End date" :shortcuts="shortcuts"
                                                                                    @change="calculateTotalPrice"/>
                                                                </div>
                                                            </el-form-item>
                                                            <el-form-item label="总价">
                                                                <!-- 显示总价，禁用输入框 -->
                                                                <el-input v-model="formattedTotalPrice" disabled></el-input>
                                                            </el-form-item>
                                                            <el-form-item>
                                                                <img src="../../../assets/weChatcode/erweima.jpg" class="money-image" alt="Description of image">
                                                            </el-form-item>
                                                        </el-form>
                                                        <div slot="footer" class="dialog-footer">
                                                            <!-- 取消按钮，关闭对话框 -->
                                                            <el-button @click="handleDialogClose">取消</el-button>
                                                            <!-- 确认预订按钮，提交预订信息 -->
                                                            <el-button type="primary" @click="submitBookingMsg" :disabled="!isPaymentSuccessful">确定预订</el-button>
                                                        </div>
                                                    </div>
                                                </el-dialog>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-scrollbar>
                        </div>
                    </el-tab-pane>
                    <!-- 点评选项卡 -->
                    <el-tab-pane label="点评" name="second">
                        <div class="reviewSelect">
                            <!-- 房型选择下拉菜单，用于筛选点评 -->
                            <el-select v-model="selectedRoomType" multiple placeholder="房型" style="width: 240px" @change="onRoomTypeReviewChange(selectedRoomType)">
                                <el-option v-for="item in roomTypeOptions" :key="item.value" :label="item.label" :value="item.value"/>
                            </el-select>
                        </div>
                        <div class="reviews">
                            <!-- 使用el-scrollbar实现点评列表滚动 -->
                            <el-scrollbar height="400px">
                                <!-- 遍历并显示可见的点评列表 -->
                                <div v-for="review in reviewListVisible" :key="review.id" class="scrollbar-demo-item01">
                                    <div class="review-head">
                                        <div class="review-head-left">
                                            <!-- 显示点评用户头像 -->
                                            <img :src="review.avatar" class="visitor-image" alt="visitor image" />
                                            <!-- 显示点评用户名称 -->
                                            <h3>{{ review.guest_name }}</h3>
                                        </div>
                                        <div class="review-head-right">
                                            <!-- 显示点评评分，并根据评分设置颜色 -->
                                            <p><strong>评分:</strong>
                                                <span class="rating" :style="{ color: ratingColor(review.rating) }">
                                                {{ review.rating }}
                                                </span>
                                                / 100
                                            </p>
                                        </div>
                                    </div>
                                    <div class="review-content">
                                        <div class="review-card-left">
                                            <!-- 显示点评的房型名称 -->
                                            <p><strong>房型:</strong> {{ review.room_type_name }} </p>
                                            <!-- 显示点评的入住时间 -->
                                            <p><strong>时间:</strong> 于{{ review.review_date }}入住</p>
                                        </div>
                                        <div class="review-card-right">
                                            <!-- 显示点评内容 -->
                                            {{review.content}}
                                        </div>
                                    </div>
                                </div>
                            </el-scrollbar>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted, getCurrentInstance, computed, watch} from 'vue';
import { useRoute } from 'vue-router';
import {getStarhotel, addStarhotelBookingMsg} from '@/api/hotel/starhotels';
import useUserStore from '@/store/modules/user'
import router from "@/router/index.js";

// 获取当前组件实例的代理对象
const { proxy } = getCurrentInstance();

// 使用用户存储实例
const userStore = useUserStore();

// 弹窗状态和选择的房间
const dialogVisible = ref(false);  // 控制预订弹窗的显示与隐藏
const selectedRoom = ref(null);  // 当前选择的房间
const hotel = ref(null);  // 酒店详情
const starhotelRoomsList = ref([]);  // 酒店房间列表
const roomListVisible = ref([]);  // 可见的房间列表
const starhotelReviewsList = ref([]);  // 酒店点评列表
const reviewListVisible = ref([]);  // 可见的点评列表
const route = useRoute();  // 获取路由信息
const selectedRoomTypes = ref([]);  // 选中的房间类型
const selectedRoomType = ref([]);  // 选中的房间类型（用于点评）
const selectedPrices = ref([]);  // 选中的价格区间
const sliderValue = ref(200);  // 滑块的初始值
const mapLink = ref('')  // 地图链接
const isPaymentSuccessful = ref(true);// 初始状态为付款成功,后续可扩展功能
// 房间类型选项
const roomTypeOptions = ref([
{ value: '标准大床房', label: '标准大床房' },
{ value: '高级大床房', label: '高级大床房' },
{ value: '商务大床房', label: '商务大床房' },
{ value: '标准双床房', label: '标准双床房' },
{ value: '高级双床房', label: '高级双床房' },
{ value: '商务双床房', label: '商务双床房' },
{ value: '特色房', label: '特色房' }
]);

// 传入的 review 属性
const props = defineProps({
review: {
type: Object,
required: true
}
});

// 评分颜色计算函数
const ratingColor = (rating) => {
if (rating >= 90) return '#00FF00'; // 绿色
if (rating >= 60) return '#7FFF00'; // 黄绿色
if (rating >= 40) return '#FFFF00'; // 黄色
if (rating >= 20) return '#FFA500'; // 橙色
return '#FF0000'; // 红色
};

// 价格选项
const prices = ref([
{ value: '0-100', label: '￥0-￥100' },
{ value: '100-200', label: '￥100-￥200' },
{ value: '200-500', label: '￥200-￥500' },
{ value: '500-800', label: '￥500-￥800' },
{ value: '800-1500', label: '￥800-￥1500' },
{ value: '1500-999999', label: '￥1500以上' }
]);

const totalPrice = ref(0);  // 总价
const clockBooking = ref('');  // 预订时间
let selectName = ref('first');  // 默认选中的标签页为 '房间'
const bookingForm = ref({  // 预订表单信息
name: '',
phone: '',
checkInTime: '',
checkOutTime: ''
});

// 组件挂载后执行的逻辑
onMounted(() => {
    getHotelDetails(route.params.hotelId);  // 获取酒店详情信息
});

// 异步获取酒店详情信息
async function getHotelDetails(id) {
await getStarhotel(id).then(response => {
    starhotelRoomsList.value = response[0];  // 将酒店房间列表赋值给 starhotelRoomsList
    roomListVisible.value = starhotelRoomsList.value;  // 将房间列表赋值给可见的房间列表
    hotel.value = response[1];  // 将酒店详情赋值给 hotel
    console.log(hotel.value)
    starhotelReviewsList.value = response[2];  // 将酒店点评列表赋值给 starhotelReviewsList
    reviewListVisible.value = starhotelReviewsList.value;  // 将点评列表赋值给可见的点评列表
    });
}

// 房间类型变化时的处理函数
function onRoomTypeChange(value1) {
    if(value1.length ===0){
        roomListVisible.value = starhotelRoomsList.value;
    }else {
        roomListVisible.value = starhotelRoomsList.value.filter(room => {
            return selectedRoomTypes.value.includes(room.name);
        });
    }
}

// 房间价格变化时的处理函数
function onRoomPriceChange() {
    if (selectedPrices.value.length === 0) {
        const minPrice = sliderValue.value;
        roomListVisible.value = starhotelRoomsList.value.filter(room => {
            return room.price >= minPrice;
        });
    } else {
        const minPrice1 = sliderValue.value;
        roomListVisible.value = starhotelRoomsList.value.filter(room => {
        const priceRange = selectedPrices.value.find(price => {
            const range = price.split('-');
            const minPrice = parseInt(range[0]);
            const maxPrice = parseInt(range[1]);
            return room.price >= minPrice && room.price <= maxPrice && room.price >= minPrice1;
            });
        return priceRange !== undefined;
        });
    }
}

// 处理预订操作的函数
function handleBooking(room) {
    // 检查用户是否登录
    if (!isLoggedIn()) {
        // 如果未登录，提示用户登录
        showLoginPrompt();
        return;
    }

    // 设置选中的房间
    selectedRoom.value = room;
    // 显示预订弹窗
    dialogVisible.value = true;
}

// 模拟检查用户是否登录的函数
function isLoggedIn() {
    return userStore.id !== -1;
}

// 模拟显示登录提示的函数
function showLoginPrompt() {

    router.push({ name: 'Login' });
}

// 关闭预订弹窗的函数
const handleDialogClose = () => {
    dialogVisible.value = false;  // 关闭预订弹窗
};

// 提交预订信息的函数
function submitBookingMsg() {
    const bookingData = {  // 构造预订信息对象
        guest_id: userStore.id,  // 客户ID
        hotel_id: selectedRoom.value.hotel_id,  // 酒店ID
        room_type_id: selectedRoom.value.id,  // 房间类型ID
        guest_name: bookingForm.value.name,  // 客户姓名
        contact_number: bookingForm.value.phone,  // 联系电话
        check_in_time: clockBooking.value[0],  // 入住时间
        check_out_time: clockBooking.value[1],  // 离店时间
        totalPrice: totalPrice.value  // 总价
};

    addStarhotelBookingMsg(bookingData).then(response => {  // 调用接口添加预订信息
        proxy.$modal.msgSuccess("预订成功！");  // 弹出成功消息
    });
    // 延迟一秒刷新页面
    setTimeout(() => {
        location.reload();
        }, 1000);
        dialogVisible.value = false;  // 关闭预订弹窗
}

// 时间快捷方式选项
const shortcuts = [
    {
        text: 'Last week',
        value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
        },
    },
    {
        text: 'Last month',
        value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
        },
    },
    {
        text: 'Last 3 months',
        value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
        },
    },
];


// 格式化显示总价
const formattedTotalPrice = computed(() => {
    return totalPrice.value ? `￥${totalPrice.value}` : '￥0';
});

// 计算总价函数
const calculateTotalPrice = () => {
    if (clockBooking.value.length === 2) {
        const checkIn = new Date(clockBooking.value[0]);
        const checkOut = new Date(clockBooking.value[1]);
        const diffTime = Math.abs(checkOut - checkIn);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));  // 计算入住天数
        totalPrice.value = diffDays * selectedRoom.value.price;  // 计算总价
    } else {
        totalPrice.value = 0;  // 若时间选择不完整，总价为0
    }
};

// 监听预订时间变化，重新计算总价
watch(clockBooking, () => {
    calculateTotalPrice();
});

// 评论功能：根据选择的房型筛选评论
function onRoomTypeReviewChange(value01){
    console.log(selectedRoomType.value)
    console.log(starhotelReviewsList.value)
    if (value01.length === 0){
        reviewListVisible.value = starhotelReviewsList.value;
    }else {
        reviewListVisible.value = starhotelReviewsList.value.filter(review => {
            return selectedRoomType.value.includes(review.room_type_name);
        });
    }
}
</script>

<style scoped>

.block{
    width: 50%;
}
.hotelMsg {
    padding: 20px;
    flex-direction: column;
    display: flex;

}
.hotel-card {
    flex: 3;
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    margin-right: 5px;
    margin-left: 100px;
}
.header{
    margin-left: 30px;
    margin-bottom: 20px;
}
.content{
    display: flex;
    align-items: flex-start;
}
.left{
    flex: 5;
}
.right{
    flex: 3;
}
.money-image {
    position: relative;
    width: 180px; /* 正方形的宽度 */
    height: 180px; /* 正方形的高度 */
    margin-bottom: 20px;
}

a {
     display: block;
     margin-bottom: 20px;
 }
.hotel-image {
    width: 60%;
    border-radius: 10px;
    max-height: 350px;
    object-fit: fill;
    margin-left: 30px;
    margin-bottom: 20px;
}
.select{
    flex: 8;
    margin-left: 100px;
    padding-top: 20px;
}
.slider-demo-block {
    max-width: 600px;
    display: flex;
    align-items: center;
}
.cost {
    margin-top: 0;
    margin-left: 12px;
}
.demonstration {
    font-size: 12px;
    color: var(--el-text-color-secondary);
    line-height: 44px;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0;
}
.slider-demo-block .demonstration + .cost {
    flex: 0 0 70%;
}
.roomType {
    margin-top: 20px;
}
.scrollbar-demo-item {
    display: flex;
    flex: 3;
    flex-direction: column;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    height: 300px;
    margin: 5px;
    border-radius: 4px;
    color: #000;
}
.room-head{
    margin-left: 30px;
}
.room-content{
    display: flex;
    align-items: flex-start;
}
.card-left{
    flex: 4;
}
.card-right{
    flex: 2;
}
.price {
    color: #409EFF;
    font-weight: bold;
    font-size: 30px;
}
.sales {
    font-weight: bold;
    color: #E6A23C;
    font-size: 20px;
}
.booking{
    font-size: 22px;
    font-weight: bolder;
}
.room-image {
    width: 50%;
    border-radius: 10px;
    max-height:240px;
    object-fit: cover;
    margin-left: 30px;
    padding-bottom: 10px;
}
:deep(.el-dialog){
    width: 460px;
    background: rgba(255,255,255,0.5) ;
    z-index: 9999;
}
:deep(.el-overlay){
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(0.5px) !important;
}
.scrollbar-demo-item01 {
    margin-top: 30px;
    margin-left: 5px;
    margin-right: 5px;
    display: flex;
    flex: 3;
    flex-direction: column;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    height: 300px;
    border-radius: 8px;
    color: #000;
}
.review-head{
    display: flex;
    align-items: flex-start;
}
.review-head-left{
    flex: 2;
    padding-right: 15px;
    padding-left: 20px;
}
.visitor-image {
    max-width: 80px;
    max-height:80px;
    object-fit: cover;
    padding-top: 20px;
}
.review-head-right{
    flex: 4;
}
.rating {
    font-weight: bold;
    color: #1890ff;
    font-size: 30px;
}
.review-content{
    display: flex;
    align-items: flex-start;
}
.review-card-left{
    padding-right: 15px;
    padding-left: 20px;
    flex: 2;
}
.review-card-right{
    flex: 4;
    padding-right: 20px;
    word-wrap: break-word; /* 使单词在必要时换行 */
    white-space: normal; /* 允许文本换行 */
    overflow-wrap: break-word; /* 支持更现代的浏览器，允许在必要时换行 */
    word-break: break-all; /* 强制在长词或 URL 中的任意位置换行 */
}
</style>
