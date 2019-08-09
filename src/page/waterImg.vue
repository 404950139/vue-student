<template>
  <div>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="url in urls" :key="url">
        <img :src="url" alt />
      </el-carousel-item>
    </el-carousel>
    <div class="demo-image__lazy">
      <el-image v-for="url in urls" :key="url" :src="url" lazy class="img"></el-image>
    </div>
  </div>
</template>

<script>
export default {
  name: "waterImg",

  data() {
    return {
      urls: [
        "http://www.nixingdongman.com/static/water/1.jpg",
        "http://www.nixingdongman.com/static/water/2.jpg",
        "http://www.nixingdongman.com/static/water/3.jpg",
        "http://www.nixingdongman.com/static/water/4.jpg",
        "http://www.nixingdongman.com/static/water/5.jpg",
        "http://www.nixingdongman.com/static/water/6.gif"
      ]
    };
  },

  methods: {}
};
</script>

<style lang='scss' scoped>
.demo-image__lazy {
  width: 500px;
  margin: 20px auto;
  .img {
    width: 500px;
    height: 400px;
  }
}
.el-carousel {
  width: 100%;
  height: 500px;
  margin: 20px auto;
}
.el-carousel__item {
  width: 800px;
  height: 400px;
}
.el-carousel__item img {
  width: 100%;
  height: 100%;
}
</style>
