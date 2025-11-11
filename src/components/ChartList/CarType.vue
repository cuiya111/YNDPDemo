<template>
    <ChartFrame title="车型事故统计" :icon="'blue'">
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
    // import type { CarTypeList } from "@/api/types";
    import { fitChartSize } from "@/utils/chartSize";
    import { grid, tooltip } from "@/echarts/options";
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
			color: ["#EF6765", "#38CDD3", "#1A95E7", "#FEC72F", "#CAE0FE"],
			tooltip: tooltip({
				trigger: 'item',
				formatter: '{a} <br/>{b}: {c} ({d}%)',
			}),
			grid: grid(),
			series: [
				{
					label: {
						color: '#fff',
						fontSize: fitChartSize(13),
						position: 'outer',
					},
					labelLine: {
						length: fitChartSize(20),
					},
					name: "事故数量",
					type: 'pie',
					radius: ['38%', '70%'],
					labelLayout: {
						fontSize: fitChartSize(13)
					},
					data: [
                        { value: 1048, name: '小型车' },
                        { value: 735, name: '中型车' },
                        { value: 580, name: '大型车' },
                        { value: 484, name: '摩托车' },
                        { value: 300, name: '其他' },
                    ],
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
    // watch(() => chartData.carTypeList, () => {
    //     renderChart(chartData.carTypeList);
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