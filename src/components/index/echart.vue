<template>
  <div class="echartWrap">
    <div id="pie1"></div>
  </div>
</template>

<script>
export default {
  name: "",

  data() {
    return {
      addr: [],
      num: []
    };
  },
  mounted() {
    this.$api.selectCountByAddress("福建,哈尔滨,辽宁,浙江,新疆,西藏,台湾,香港").then(res => {
      let e1 = [];
      let e2 = [];
      let e4 = [];
      for (let i in res.data) {
        e1.push(i);
        e2.push(res.data[i]);
      }
      for (let i = 0; i < e2.length; i++) {
        let e3 = {};
        e3["value"] = e2[i];
        e3["name"] = e1[i];
        e4.push(e3);
      }
      this.$chart.pie1("pie1", e1, e4);
    });
  },

  methods: {}
};
</script>

<style lang='scss' scoped>
.echartWrap {
  width: 100%;
  height: 100%;
}
#pie1 {
  width: 500px;
  height: 500px;
  margin: 50px auto;
}
</style>
