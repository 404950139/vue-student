<template>
  <transition name="turnOpacity">
    <div class="studentListBox">
      <search @changeTable="changeBykeyWords"></search>
      <table-list v-if="refTable"></table-list>
      <turn-page></turn-page>
      <transition name="studentModel">
        <student-model v-if="showModel"></student-model>
      </transition>
    </div>
  </transition>
</template>

<script>
import search from "@/components/index/search"; // 搜索组件
import tableList from "@/components/index/tableList"; // 学生列表组件
import studentModel from "@/components/index/studentModel";
import turnPage from "@/components/index/turnPage";
import { mapState } from "vuex";
export default {
  name: "studentList",
  components: {
    search,
    tableList,
    studentModel,
    turnPage
  },

  data() {
    return {
      studentList: [],
      nowPage: 0,
      refTable: true
    };
  },
  computed: {
    ...mapState(["showModel"])
  },

  methods: {
    changeBykeyWords(data) {
      this.studentList = data;
    }
  },
  created() {
    // 查询所有学生
    // this.$api.selectAllStudent().then( res => {
    //   this.studentList = res.data;
    // });

    // 通过页数查询学生
    this.$api.selectStudentByPage(this.nowPage).then(res => {
      this.$store.commit("setAllUserInfo", res.data);
    });
  }
};
</script>

<style lang="scss" scoped>
.studentListBox {
  position: absolute;
  top: 0;
  width: 100%;
}
.turnOpacity-leave-active,
.turnOpacity-enter-active {
  transition: opacity 0.3s;
}

.turnOpacity-enter,
.turnOpacity-leave-to {
  opacity: 0;
}

.turnOpacity-enter-to,
.turnOpacity-leave {
  opacity: 1;
}
.studentModel-leave-active,
.studentModel-enter-active {
  transition: all 0.3s;
}
.studentModel-enter,
.studentModel-leave-to {
  top: -100%;
  height: 0;
}
.studentModel-enter-to,
.studentModel-leave {
  top: 50%;
  height: 100%;
}
</style>