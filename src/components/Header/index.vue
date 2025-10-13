<template>
    <div class="header-container">
        <!-- 左侧标题 -->
        <div class="left-title">{{ sub_title }}</div>
        <!-- 中间标题区域 -->
        <div class="center-title">
            <h1>{{ title }}</h1>
        </div>
        <!-- 右侧其他区域 -->
        <div class="other-area">
            <!-- 时间 -->
            <div class="time header-item">
                <div class="hour-minute-second top">{{ time }}</div>
                <div class="date bot">{{ date }}</div>
            </div>
            <!-- 横线 -->
            <div class="line"></div>
            <!-- 天气 -->
            <div class="weather">
                <img src="../../assets/header/cloud.png" class="weather-icon">
                <div class="header-item">
                    <div class="top">25度</div>
                    <div class="bot">多云转晴</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "Header"
    }
</script>

<script lang="ts" setup>
    import { ref, onMounted } from "vue";

    const title = import.meta.env.VITE_APP_TITLE;
    const sub_title = import.meta.env.VITE_APP_SUB_TITLE;

    const time = ref(getFormattedTime());
    const date = ref(getFormattedDate());

    function getFormattedTime() {
        const now = new Date();
        // 获取小时、分钟和秒，并确保它们都是两位数
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        // 拼接并返回格式化的时间字符串
        return `${hours}:${minutes}:${seconds}`;
    }

    function getFormattedDate() {
        const now = new Date();
        // 获取年份、月份和日期
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的，所以加1
        const day = String(now.getDate()).padStart(2, '0'); // 确保日期是两位数

        // 拼接并返回格式化的日期字符串
        return `${year}.${month}.${day}`;
    }

    onMounted(function(){
        setInterval(() => {
            time.value = getFormattedTime();
        }, 1000);
    });
</script>

<style scoped lang="scss">
.header-container {
    width: 100%;
    height: px2vh(54.85);
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    margin-bottom: px2vh(20);

    .left-title {
        font-size: px2vh(30);
        color: #fff;
        white-space: nowrap;
    }
    .center-title {
        width: px2vw(1360);
        height: px2vh(55);
        background-image: url(../../assets/header/title-frame.png);
        background-repeat: no-repeat;
        background-position: center center;
        background-size:contain;
        display: flex;
        justify-content: center;
        align-items: center;
        // font-family: 'Source Han Sans', sans-serif;

        // 居中显示
        position: absolute;
        // top: px2vh(15);
        left: 50%;
        transform: translate(-50%);

        h1{
            font-size: px2vh(30);
            font-weight: 400;
            letter-spacing: 0px;
            color: #fff;
        }
    }

    .other-area{
        display: flex;
        align-items: center;
        color: #fff;
        .header-item {
            display: flex;
            flex-direction: column;
            align-items: end;

            .top{
                font-size: px2vh(16);
                font-weight: normal;
                margin-bottom: px2vh(5);
            }
            .bot{
                font-size: px2vh(12);
                font-weight: normal;
                letter-spacing: 0em;
                color: rgba(255, 255, 255, 0.6);
            }
        }

        .weather{
            display: flex;
            align-items: center;

            .weather-icon{
                display: block;
                width: px2vw(44);
                height: px2vh(44);
            }
        }

        .line{
            width: px2vw(1);
            height: px2vh(20);
            margin: 0 px2vw(20);
            background: #D8D8D8;
        }
    }
}
</style>