import { fitChartSize } from "@/utils/chartSize";

// 网格
export function grid(options?: object){
    return {
        left: '0',
        right: '0',
        bottom: '10%',
        top: "10%",
        containLabel: true,
        ...options
    }
}

// 坐标轴分割线
export function axisSplitLine(options?: object){
    return {
        lineStyle:{
            color: 'rgba(255, 255, 255, 0.4)',
            type: "dashed",
        },
        ...options
    }
}

// 坐标轴刻度标签
export function axisLabel(options?: object){
    return {
        color: '#fff',
        fontSize: fitChartSize(13),
        ...options
    }
}

// 提示工具
export function tooltip(options?: object){
    return {
        trigger: 'axis',
        // backgroundColor: "rgba(47, 109, 255, 0.5)",
        // borderColor: "#2F6DFF",
        // padding: fitChartSize(5),
        // textStyle:{
        //     color: "#fff",
        //     fontSize: fitChartSize(12),
        // },
        ...options
    }
}