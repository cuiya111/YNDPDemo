<template>
  <!-- 中国地图容器 -->
  <div ref="mapRef" class="china-map-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
// 引入中国地图数据（注意：需根据 ECharts 版本调整路径，新版本常用 json 格式）
import chinaMap from 'echarts/map/json/china.json';

// 1. 定义 DOM 引用与图表实例
const mapRef = ref<HTMLDivElement | null>(null);
let myChart: echarts.ECharts | null = null;

// 2. 初始化 ECharts 中国地图
const initChinaMap = () => {
  if (!mapRef.value) return;

  // 注册中国地图（关键：需先注册地图数据才能使用）
  echarts.registerMap('china', chinaMap as any);

  // 初始化图表实例
  myChart = echarts.init(mapRef.value);

  // 3. 地图核心配置项（复用原 option 逻辑）
  const mapOption = {
        geo: {
            map: 'china', // 关联已注册的中国地图
            aspectScale: 0.75, // 地图宽高比（0.75 适配中国地图常见比例）
            layoutCenter: ["50%", "51.5%"], // 地图在容器中的位置（水平居中，垂直微调）
            layoutSize: '118%', // 地图大小（超出容器 18%，避免边缘空白）
            roam: true, // 开启拖拽缩放
            itemStyle: {
            normal: {
            borderColor: 'rgba(147, 235, 248, 1)',
            borderWidth: 0.5,
            // 地图渐变颜色（从 #009DA1 到 #005B9E）
            color: {
                type: 'linear-gradient',
                x: 0,
                y: 1500,
                x2: 2500,
                y2: 0,
                colorStops: [
                { offset: 0, color: '#009DA1' },
                { offset: 1, color: '#005B9E' }
                ],
                global: true
            },
            opacity: 0.5
            },
            // emphasis: {
            //   areaColor: '#2a333d' // 鼠标 hover 时的区域颜色
            // }
        },
        // 南海诸岛特殊样式（与背景色一致，避免突兀）
        regions: [{
            name: '南海诸岛',
            itemStyle: {
            areaColor: 'rgba(0, 10, 52, 1)',
            borderColor: 'rgba(0, 10, 52, 1)'
            },
            // emphasis: {
            // areaColor: 'rgba(0, 10, 52, 1)',
            // borderColor: 'rgba(0, 10, 52, 1)'
            // }
        }],
        z: 2 // 层级：geo 层在 series.map 层之上
        },
    series: [{
      type: 'map', // 第二层地图（与 geo 层形成叠加）
      map: 'china',
      tooltip: { show: false }, // 隐藏该层 tooltip，避免与 geo 层冲突
      label: {
        show: false,
        color: '#FFFFFF',
        fontSize: 15 // 省份名称文字大小
      },
      aspectScale: 0.75,
      layoutCenter: ["50%", "50%"], // 与 geo 层位置微调，形成视觉层次
      layoutSize: '118%',
      roam: true, // 开启拖拽缩放（与 geo 层同步）
      itemStyle: {
        normal: {
          borderColor: 'rgba(147, 235, 248, 0.6)', // 边框透明度低于 geo 层
          borderWidth: 0.8,
          // 第二层地图渐变颜色（与 geo 层一致，保持整体风格统一）
          areaColor: {
            type: 'linear-gradient',
            x: 0,
            y: 1200,
            x2: 1000,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#009DA1' },
              { offset: 1, color: '#005B9E' }
            ],
            global: true
          }
        },
        // emphasis: {
        //   areaColor: 'rgba(147, 235, 248, 0)' // hover 时透明，凸显 geo 层
        // }
      },
      zlevel: 1 // 层级：series.map 层在 geo 层之下
    }]
  };

  // 4. 渲染地图
  myChart.setOption(mapOption);

  // 5. 绑定 georoam 事件，实现两层地图同步拖拽缩放
  myChart.on('georoam', (params: any) => {
    if (!myChart) return;
    const currentOption = myChart.getOption() as {
      geo?: Array<any>;
      series?: Array<any>;
    }; // 获取当前图表配置

    // 捕捉缩放事件：让 geo 层的缩放等级和中心位置与 series.map 层同步
    if (params.zoom != null && params.zoom !== undefined) {
      if (currentOption.geo && currentOption.series) {
        currentOption.geo[0].zoom = currentOption.series[0].zoom;
        currentOption.geo[0].center = currentOption.series[0].center;
      }
    } 
    // 捕捉拖拽事件：让 geo 层的中心位置与 series.map 层同步
    else {
      if (currentOption.geo && currentOption.series) {
        currentOption.geo[0].center = currentOption.series[0].center;
      }
    }

    // 应用更新后的配置（true 表示不合并，直接覆盖）
    myChart.setOption(currentOption, true);
  });
};

// 6. 窗口 resize 自适应（避免窗口缩放后地图变形）
const handleResize = () => {
  myChart?.resize();
};

// 7. 生命周期管理（确保组件挂载时初始化，卸载时清理）
onMounted(() => {
  initChinaMap();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  // 销毁图表实例，释放内存（避免内存泄漏）
  if (myChart) {
    myChart.dispose();
    myChart = null;
  }
});
</script>

<style scoped lang="scss">
/* 地图容器样式：占满父容器，确保地图显示完整 */
.china-map-container {
  width: 100%;
  height: 100%;
  position: absolute; // 绝对定位，作为背景层
  top: 0;
  left: 0;
}
</style>