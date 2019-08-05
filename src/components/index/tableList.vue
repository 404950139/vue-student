<template>
  <div class="limitHeight">
    <table class="tableListBox">
      <thead>
        <tr>
          <th>学号</th>
          <th>姓名</th>
          <th>性别</th>
          <th>邮箱</th>
          <th>年龄</th>
          <th>手机号</th>
          <th>地址</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in userInfo" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.sName }}</td>
          <td>{{ item.sSex == 0 ? '男' : '女' }}</td>
          <td>{{ item.sEmail }}</td>
          <td>{{ new Date().getFullYear() - item.sYear }}</td>
          <td>{{ item.sPhone }}</td>
          <td>{{ item.sAddress }}</td>
          <td>
            <button class="btn edit" @click="changeModel(item)">编辑</button>
            <button class="btn del" @click="deleteInfo(item.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "",

  data() {
    return {};
  },
  computed: {
    ...mapState(["userInfo", "nowPage", "count", "pageSize"])
  },

  methods: {
    changeModel(item) {
      this.$store.commit("changeModel", true);
      this.$store.commit("setEditInfo", item);
    },
    deleteInfo(id) {
      let isDelete = window.confirm("确定删除？");
      if (isDelete) {
        this.$api.deleteStudentInfo(id).then(() => {
          // 删除成功后重新获取当前页面的数据
          if (this.nowPage > Math.ceil((this.count - 1) / this.pageSize)) {
            this.$api.selectStudentByPage(this.nowPage - 2).then(res => {
              this.$store.commit("setAllUserInfo", res.data);
              this.$store.commit("setNowPage", this.nowPage - 1);
            });
          } else {
            this.$api.selectStudentByPage(this.nowPage - 1).then(res => {
              this.$store.commit("setAllUserInfo", res.data);
              this.$store.commit("setNowPage", this.nowPage);
            });
          }
        });
      }
    }
  },
  created() {}
};
</script>

<style lang='scss' scoped>
.limitHeight {
  width: 100%;
  height: 380px;
}
.tableListBox {
  width: 100%;
  text-align: center;
  thead {
    background-color: #e3e8ee;
    color: #646987;
    font-size: 14px;
  }
  tbody {
    background-color: #fff;
    font-size: 14px;
    .btn {
      padding: 3px 10px;
      color: #fff;
      border: none;
      outline: none;
      cursor: pointer;
    }
    .edit {
      background-color: #5cb85c;
    }
    .del {
      background-color: #d9534f;
    }
  }
  tr {
    height: 30px;
    line-height: 30px;
  }
}
</style>
