//引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入饼状图模块
require("echarts/lib/chart/pie");
// 引入提示框和title组件，图例
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
require("echarts/lib/component/legendScroll"); //图例翻译滚动

const install = function(Vue) {
  Object.defineProperties(Vue.prototype, {
    $chart: {
      get() {
        return {
          pie1: function(id, addr, num) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();

            const optionData = {
              tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              legend: {
                orient: "vertical",
                x: "left",
                data: addr
              },
              series: [
                {
                  name: "访问来源",
                  type: "pie",
                  radius: ["50%", "70%"],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: "center"
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: "30",
                        fontWeight: "bold"
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data: num
                }
              ]
            };

            this.chart.setOption(optionData);
          }
        };
      }
    }
  });
};

export default {
  install
};
