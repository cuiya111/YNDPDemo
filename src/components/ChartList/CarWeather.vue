<template>
    <ChartFrame title="不同天气事故统计">
        <div class="ChartCarType" ref="chart"></div>
    </ChartFrame>
</template>

<script lang="ts">
    export default {
        name: "CarType"
    }
</script>

<script lang="ts" setup>
    import echarts from "@/echarts/index";
    import { onMounted, ref, watch } from "vue";
    import { useChartDataStore } from "@/store/index";
    import type { CarWeatherList } from "@/api/types";
    import { fitChartSize } from "@/utils/chartSize";
    import { grid,axisSplitLine, axisLabel, tooltip } from "@/echarts/options";
    import ChartFrame from "@/components/ChartFrame/index.vue";

    // 图表容器
    const chart = ref(null);
    // Echarts实例
    let myChart: echarts.ECharts;
    // 是否渲染
    let isRender: boolean = false;
    // 数据
    const chartData = useChartDataStore();

    // 渲染图表
    const renderChart = (value: CarWeatherList) => {
        if (!isRender) {
            myChart = echarts.init(chart.value);
            isRender = true;
        }
        const chartOptions = {
            color: ["#3176FF"],
            tooltip: tooltip(),
            xAxis: {
                type: 'category',
                data: value.map(item => item.weacondition),
                axisLabel: axisLabel(),
                splitNumber: 4,
            },
            grid: grid(),
            yAxis: {
                type: 'value',
                axisLabel: axisLabel(),
                splitLine: axisSplitLine(),
            },
            series: [
                {
                    name: "事故数量",
                    type: 'bar',
                    data: value.map(item => item.num),
                    itemStyle:{
                        borderRadius: [fitChartSize(5), fitChartSize(5), 0, 0]
                    },
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset: 0, color: '#2F6DFF' }, // 起始颜色
                            { offset: .3, color: '#2F6DFF' },
                            { offset: 1, color: 'rgba(255,255,255,.2)' }  // 结束颜色
                        ]
                    ),
                },
            ],
        };
        myChart.setOption(chartOptions, isRender);
    };

    // 调整图表大小
    function chartResize(){
        myChart.resize();
    }

    // 暴露方法
    defineExpose({
        chartResize,
        renderChart,
    });

    // 更新图表
    watch(() => chartData.carWeatherList, () => {
        renderChart(chartData.carWeatherList);
    });
    // 页面加载完成后请求图表数据
    onMounted(async function(){
        await chartData.getCarWeatherData();
    });



</script>

<style scoped lang="scss">
.ChartCarType{
    width: 100%;
    height: 100%;
    // height: px2vh(300);
    // background-color: hotpink;
    .show{
        width: 100%;
        height: 100%;
    }
}
</style>