<template>
    <ChartFrame title="月度事故统计" :icon="'white'">
        <div class="ChartCarType">
            <div class="show" ref="chart"></div>
        </div>
    </ChartFrame>
</template>

<script lang="ts">
    export default {
        name: "CarType"
    }
</script>

<script lang="ts" setup>

    import echarts from "@/echarts/index";
    import { onMounted, ref } from "vue";
    // import { useChartDataStore } from "@/store/index";
    // import type { CarMonthList } from "@/api/types";
    import { grid, axisSplitLine, axisLabel, tooltip } from "@/echarts/options";
    import ChartFrame from "@/components/ChartFrame/index.vue";

    // 图表容器
    const chart = ref(null);
    // Echarts实例
    let myChart: echarts.ECharts;
    // 是否渲染
    let isRender: boolean = false;
    // 数据
    // const chartData = useChartDataStore();

    // 渲染图表
    const renderChart = () => {
        if (!isRender) {
            myChart = echarts.init(chart.value);
            isRender = true;
        }
        const chartOptions = {
            color: ["#3176FF"],
            tooltip: tooltip(),
            xAxis: {
                type: 'category',
                data: ['08月', '09月', '10月', '11月', '12月'],
                axisLabel: axisLabel()
            },
            yAxis: {
                type: 'value',
                axisLabel: axisLabel(),
                min: 'dataMin',
                splitNumber: 4,
                axisTick: {
                    interval: 4
                },
                splitLine: axisSplitLine(),
            },
            grid: grid(),
            series: [
                {
                    name: "事故数量",
                    type: 'line',
                    smooth: true,
                    areaStyle: {
                        color: '#3176FF',
                        opacity: 0.3
                    },
                    data: [320, 332, 301, 334, 390],
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

    // // 更新图表
    // watch(() => chartData.carMonthList, () => {
    //     renderChart(chartData.carMonthList);
    // });
    // 页面加载完成后请求图表数据
    onMounted(async function(){
        renderChart();
    });

</script>

<style scoped lang="scss">
.ChartCarType{
    width: 100%;
    height: 100%;
    .show{
        width: 100%;
        height: 100%;
    }
}
</style>