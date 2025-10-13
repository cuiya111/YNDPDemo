// 引入 ECharts 主模块
import * as echarts from 'echarts/core';

// 引入需要的图表类型
import { LineChart } from 'echarts/charts';
import { BarChart } from 'echarts/charts';
import { PieChart } from 'echarts/charts';

// 引入需要的组件
import { TooltipComponent, GridComponent } from 'echarts/components';

// 引入需要的渲染器
import { CanvasRenderer } from 'echarts/renderers';

// 注册组件和图表
echarts.use([
    TooltipComponent,
    GridComponent,
    LineChart,
    BarChart,
    PieChart,
    CanvasRenderer
]);

export default echarts;