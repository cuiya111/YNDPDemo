<template>
    <div class="main">

        <!-- 左侧图表展示区域 -->
        <div class="left-content show-chart">
            <Summary></Summary>
            <ChartCarWeather ref="chartCarWeather"></ChartCarWeather>
            <ChartCarAge ref="chartCarAge"></ChartCarAge>
        </div>

        <!-- 中间区域 -->
        <div class="center-content">
            <div class="top">
                <FilterButton></FilterButton>
                <VisualAngle></VisualAngle>
            </div>
            <div class="bot">
                <InfoBox title="当前记录" record="21312条"></InfoBox>
                <InfoBox title="事故统计" record="8321次" :icon="'car'"></InfoBox>
                <InfoBox title="最后更新" record="12月31日" :icon="'file'"></InfoBox>
            </div>
        </div>

        <!-- 右侧图表展示区域 -->
        <div class="right-content show-chart">
            <ChartCarType ref="chartCarType"></ChartCarType>
            <ChartCarMonth ref="chartCarMonth"></ChartCarMonth>
            <ChartCarColor ref="chartCarColor"></ChartCarColor>
        </div>

    </div>
</template>

<script lang="ts">
    export default {
        name: "Main"
    }
</script>

<script lang="ts" setup>

    // 图表组件
    import Summary from '@/components/ChartList/Summary/index.vue';
    import ChartCarType from '@/components/ChartList/CarType.vue';
    import ChartCarWeather from '@/components/ChartList/CarWeather.vue';
    import ChartCarAge from '@/components/ChartList/CarAge.vue';
    import ChartCarMonth from '@/components/ChartList/CarMonth.vue';
    import ChartCarColor from '@/components/ChartList/CarColor.vue';
    // 中间区域组件
    import FilterButton from '@/components/Center/FilterButton.vue';
    import VisualAngle from '@/components/Center/VisualAngle.vue';
    import InfoBox from '@/components/Center/InfoBox.vue';

    import { ref ,onMounted } from "vue";
    import { useChartDataStore } from "@/store/index";

    // pinia数据
    const chartData = useChartDataStore();
    // 定时器ID
    let timer: number | null = null;
    // 组件实例
    const chartCarAge = ref();
    const chartCarWeather = ref();
    const chartCarType = ref();
    const chartCarMonth = ref();
    const chartCarColor = ref();

    // 调整全部图表大小
    function chartResizeAll() {
        chartCarAge.value.chartResize();
        chartCarWeather.value.chartResize();
        chartCarType.value.chartResize();
        chartCarMonth.value.chartResize();
        chartCarColor.value.chartResize();
    }

    // 重新渲染图表
    function chartRenderAll() {
        chartCarAge.value.renderChart(chartData.carAgeList);
        chartCarWeather.value.renderChart(chartData.carWeatherList);
        chartCarType.value.renderChart(chartData.carTypeList);
        chartCarMonth.value.renderChart(chartData.carMonthList);
        chartCarColor.value.renderChart(chartData.carColorList);
    }
    
    onMounted(() => {
        // 开启SSE监听
        chartData.createEventSource();
        // 监听窗口大小变化，自动调整图表大小
        window.addEventListener('resize', () => {
            chartResizeAll();
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                chartRenderAll();
            }, 600);
        });
    });

</script>

<style scoped lang="scss">
.main{
    // background-color: aquamarine;
    display: flex;
    justify-content: space-between;
    height: px2vh(970);

    .center-content{
        height: 100%;
        width: px2vw(895);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        // background-color: #bfa;

        .top{
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }

        .bot{
            display: flex;
            justify-content: space-between;
            align-items: center;

            padding: px2vh(20) px2vw(40);
        }
    }

    // .left-content{
    //     // background-color: hotpink;
    // }

    // .right-content{
    //     // background-color: lightcoral;
    // }

    .show-chart{
        width: px2vw(470);
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
}
</style>