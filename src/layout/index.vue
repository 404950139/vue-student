<template>
  <div class="wrapper">
    <div class="header">
      <div class="logo">
        <img src="../../static/img/logo.png" alt />
        <span>渡一教育</span>
      </div>
    </div>
    <div class="left-menu">
        <left-menu></left-menu>
    </div>
    <div class="right-content">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import leftMenu from "@/components/index/leftMenu";
export default {
  name: "index",
  components: {
    leftMenu
  },
  data() {
    return {};
  },
  methods: {}
};
</script>


<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .header {
    width: 100%;
    height: 70px;
    background-color: #354457;
    .logo {
      width: 200px;
      height: 70px;
      padding-left: 20px;
      color: #b3bcc5;
      font-size: 14px;
      line-height: 70px;
      img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
    }
  }
  .left-menu {
    width: 200px;
    height: calc(100% - 70px);
    background-color: #4d5e70;
    color: #b3bcc5;
    display: inline-block;
  }
  .right-content {
    display: inline-block;
    width: calc(100% - 200px);
    height: calc(100% - 70px);
    background-color: #eee;
    position: absolute;
    top: 70px;
  }
}
</style>
