<template>
  <!-- ECharts 3D 地球容器，需占满父容器 -->
  <div ref="globeRef" class="echarts-globe"></div>
</template>

<script setup lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue';
    import * as echarts from 'echarts';
    import 'echarts-gl'; // 引入 3D 扩展
    import world from 'echarts/map/json/world.json'
    echarts.registerMap('world', world as any);

    // 1. 定义 DOM 引用和图表实例
    const globeRef = ref<HTMLDivElement | null>(null);
    let mainChart: echarts.ECharts | null = null;
    let mapChart: echarts.ECharts | null = null;
    

    // 2. 初始化 ECharts 图表
    const initEcharts = () => {
    if (!globeRef.value) return;

    // 2.1 初始化主图表（3D 地球）
    mainChart = echarts.init(globeRef.value);

    // 2.2 创建地图纹理画布
    const canvas = document.createElement('canvas');
    canvas.width = 4096; // 高分辨率纹理，保证清晰度
    canvas.height = 2048;
    mapChart = echarts.init(canvas, null, { width: 4096, height: 2048 });

    // 2.3 地图纹理配置
    const mapOption = {
        geo: {
        map: 'world', // 使用世界地图
        label: { fontSize: 40 }, // 地图文字大小
        itemStyle: {
            areaColor: 'grey', // 陆地颜色
            borderColor: '#00FDFF' // 国界颜色（亮蓝色）
        },
        emphasis: { areaColor: 'transparent' }, //  hover 时透明
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        boundingCoords: [[-180, 90], [180, -90]] // 地图坐标范围
        }
    };
    mapChart.setOption(mapOption);

    // 2.4 3D 地球核心配置
    const globeOption = {
        backgroundColor: 'transparent', // 背景透明（关键！避免遮挡）
        tooltip: {
        show: true,
        formatter: (d: any) => `经度：${d.data[0]}</br>纬度：${d.data[1]}</br>数据量：${d.data[3]}`
        },
        
        globe: {
            displacementScale: 0.04, // 地球表面起伏程度
            shading: 'lambert', // 光照模型（朗伯阴影，更真实）
            light: {
                main: {
                color: '#fff', // 主光源颜色
                intensity: 1, // 光源强度
                shadowQuality: 'high', // 阴影质量
                shadow: true,
                alpha: 40, // 光源方位角
                beta: -30 // 光源仰角
                },
                ambient: { intensity: 0.8 } // 环境光强度
            },
            viewControl: {
                alpha: 30, // 初始视角方位角
                beta: 160, // 初始视角仰角
                autoRotate: true, // 开启自动旋转
                roam: true, // 开启鼠标缩放和平移
                autoRotateAfterStill: 100,
                distance: 210, // 相机距离地球的距离
                targetCoord: [104, 35] // 视角对准中国（经度104°，纬度35°）
            },
            layers: [{ type: 'blend', texture: mapChart }] // 叠加地图纹理
        }
        
    };

    // 2.5 渲染 3D 地球
    mainChart.setOption(globeOption);
    };

    // 3. 监听窗口resize，自适应图表大小
    const handleResize = () => {
    mainChart?.resize();
    mapChart?.resize();
    };

    // 4. 生命周期钩子：挂载时初始化，卸载时销毁
    onMounted(() => {
    initEcharts();
    window.addEventListener('resize', handleResize);
    });

    onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    mainChart?.dispose(); // 销毁图表，释放内存
    mapChart?.dispose();
    mainChart = null;
    mapChart = null;
    });
</script>

<style scoped lang="scss">
.echarts-globe {
  width: 100%;
  height: 100%;
  position: absolute; // 绝对定位，作为背景层
  top: 0;
  left: 0;
}
</style>