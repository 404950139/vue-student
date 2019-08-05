<template>
  <div class="wrapper">
    <dl class="menuBox">
      <dt>学生管理</dt>
      <router-link :to="{path: '/studentList'}" tag="dd">学生列表</router-link>
      <router-link :to="{path: '/addStudent'}" tag="dd">新增学生</router-link>
      <router-link :to="{path: '/echart'}" tag="dd">图形化</router-link>
      <router-link :to="{path: '/blank/waterImg'}" tag="dd">图片</router-link>
    </dl>
  </div>
</template>

<script>
export default {
  name: "",

  data() {
    return {};
  },

  methods: {}
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  .menuBox {
    width: 100%;
    dt {
      font-weight: bolder;
      padding-left: 8px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
    }
    dd {
      padding-left: 30px;
      cursor: pointer;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      &.router-link-active {
        color: #354457;
        background-color: #ddd;
        opacity: 1;
      }
    }
  }
}
</style>
