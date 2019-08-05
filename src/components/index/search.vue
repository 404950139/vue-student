<template>
  <div class="searchBox">
    <label for="search-word" class="search-word">关键字搜索</label>
    <input type="text" id="search-word" class="search-input" v-model="studentWord" @input="onInput" />
    <button class="search-button" @click="searchStudent">搜索</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "",

  data() {
    return {
      // 输入的关键词
      studentWord: "",
      timer: null
    };
  },
  computed: {
    ...mapState(['pageSize'])
  },

  methods: {
    onInput() {
      // 防抖
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.searchStudent();
      }, 1000);
    },
    searchStudent() {
      this.$api
        .selectStudentByKAndP(this.studentWord, 0, this.pageSize)
        .then(res => {
          // 设置关键词
          this.$store.commit('setKeyWords', this.studentWord);
          // 触发父组件，更新table的内容
          this.$store.commit('setAllUserInfo', res.data);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.searchBox {
  width: 100%;
  height: 60px;
  line-height: 60px;
  .search-word {
    padding-left: 10px;
    font-size: 16px;
    color: #646987;
    font-weight: 800;
  }
  .search-input {
    font-size: 16px;
    width: 200px;
    height: 30px;
    border: none;
  }
  .search-button {
    height: 28px;
    line-height: 28px;
    padding: 0 10px;
    outline: none;
    display: inline-block;
    border: none;
    background-color: #354457;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
}
</style>
