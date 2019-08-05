<template>
  <div class="wrap">
    <ul class="pageList">
      <li :class="{'arrow': nowPage === 1}" @click="turnPage(-1)">&lt;</li>
      <!-- 当总页数小于等于7时 -->
      <template v-if="allPage <= 7">
        <li
          v-for="(item, index) in allPage"
          :key="index"
          :class="{'current': nowPage === item}"
          @click="turnPage(item)"
        >{{ item }}</li>
      </template>
      <!-- 当总页数大于7时 -->
      <template v-if="allPage > 7">
        <!-- 当前页小于等于4时 -->
        <template v-if="nowPage <= 4">
          <li
            v-for="i in 6"
            :class="{'current': nowPage === i}"
            :key="i"
            @click="turnPage(i)"
          >{{ i }}</li>
        </template>
        <!-- 当前页大于4时 -->
        <template v-if="nowPage > 4">
          <li @click="turnPage(1)">1</li>
          <span>...</span>
        </template>

        <template v-if="nowPage > 4 && nowPage <= allPage - 4">
          <li
            v-for="i in 5"
            :key="nowPage - 3 + i"
            :class="{'current': nowPage === nowPage - 3 + i}"
            @click="turnPage(nowPage - 3 + i)"
          >{{ nowPage - 3 + i }}</li>
        </template>

        <template v-if="nowPage <= allPage - 4">
          <span>...</span>
          <li @click="turnPage(allPage)">{{ allPage }}</li>
        </template>

        <template v-if="nowPage > allPage -4">
          <li
            v-for="i in 6"
            :key="allPage - 6 + i"
            :class="{'current': nowPage === allPage - 6 + i}"
            @click="turnPage(allPage - 6 + i)"
          >{{ allPage - 6 + i }}</li>
        </template>
      </template>

      <li :class="{'arrow': nowPage === allPage}" @click="turnPage(0)">&gt;</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "",

  data() {
    return {
      nPage: 1
    };
  },
  computed: {
    ...mapState(["turnType", "allPage", "keyWord", "pageSize", "nowPage"])
  },

  methods: {
    ...mapMutations(["setNowPage"]),
    turnPage(page) {
      // 先同步一下当前的页数
      this.nPage = this.nowPage;
      if (page == -1 && this.nowPage > 1) {
        this.nPage--;
      } else if (page == 0 && this.nowPage < this.allPage) {
        this.nPage++;
      } else if (page !== -1 && page !== 0) {
        this.nPage = page;
      }
      this.setNowPage(this.nPage);
      //   当前显示的是所有学生时
      if (this.turnType === "all") {
        this.$api.selectStudentByPage(this.nowPage - 1).then(res => {
          this.$store.commit("setAllUserInfo", res.data);
        });
        return;
        // 当前显示的是关键词的学生时
      } else if (this.turnType === "search") {
        this.$api
          .selectStudentByKAndP(this.keyWord, this.nowPage - 1, this.pageSize)
          .then(res => {
            this.$store.commit("setAllUserInfo", res.data);
          });
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.wrap {
  width: 100%;
  text-align: right;
  ul {
    user-select: none;
    padding: 0 20px;
    li {
      display: inline-block;
      width: 40px;
      height: 40px;
      cursor: pointer;
      line-height: 40px;
      text-align: center;
      &:hover {
        color: #409eff;
      }
      &.current {
        color: #409eff;
        cursor: default;
      }
      &.arrow {
        color: #c0c4cc;
        cursor: not-allowed;
      }
    }
  }
}
</style>