<template>
    <ChartFrame title="年龄段事故统计">
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
    // import { useChartDataStore } from "@/stores/chartData";
    // import type { CarAgeList } from "@/api/types";
    import { grid, axisSplitLine, tooltip, axisLabel } from "@/echarts/options";
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
            grid: grid(),
            tooltip: tooltip(),
            xAxis: {
                type: 'category',
                data: ['0-5岁', '6-10岁', '11-15岁', '16-20岁', '21-25岁'],
                axisLabel: axisLabel()
            },
            yAxis: {
                type: 'value',
                min: 'dataMin',
                axisLabel: axisLabel(),
                splitNumber: 4,
                splitLine: axisSplitLine(),
            },
            series: [
                {
                    name: "事故数量",
                    type: 'line',
                    data: [320, 332, 301, 334, 390],
                    areaStyle:{
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                { offset: 0, color: '#2F6DFF' }, // 起始颜色
                                { offset: .3, color: '#2F6DFF' },
                                { offset: 1, color: 'rgba(255,255,255,.2)' }  // 结束颜色
                            ]
                        ),
                    }
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
    // watch(() => chartData.carAgeList, () => {
    //     renderChart(chartData.carAgeList);
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