<template>
  <div class="studentModelBox">
    <div class="mask" @click="hideModel"></div>
    <div class="add-student">
      <h3>编辑信息</h3>
      <form action="#" class="add-student-form">
        <div>
          <label for="sName">姓名</label>
          <input type="text" id="sName" :value="editInfo.sName" @input="changeInfo('sName', $event.target.value)" />
        </div>
        <div>
          <label for>性别</label>
          <input type="radio" id="boy" value="0" name="sex" :checked="editInfo.sSex == 0" @change="changeInfo('sSex', 0)" />
          <label for="boy" class="radio-label">男</label>
          <input type="radio" id="girl" value="1" name="sex" :checked="editInfo.sSex == 1" @change="changeInfo('sSex', 1)" />
          <label for="girl" class="radio-label">女</label>
        </div>
        <div>
          <label for="sEmail">邮箱</label>
          <input type="text" id="sEmail" :value="editInfo.sEmail" @input="changeInfo('sEmail', $event.target.value)" />
        </div>
        <div>
          <label for="sYear">出生年</label>
          <input type="text" id="sYear" :value="editInfo.sYear" @input="changeInfo('sYear', $event.target.value)" />
        </div>
        <div>
          <label for="sPhone">手机号</label>
          <input type="text" id="sPhone" :value="editInfo.sPhone" @input="changeInfo('sPhone', $event.target.value)" />
        </div>
        <div>
          <label for="sAddress">住址</label>
          <input type="text" id="sAddress" :value="editInfo.sAddress" @input="changeInfo('sAddress', $event.target.value)" />
        </div>
        <div>
          <label for>&nbsp;</label>
          <button type="submit" class="btn" @click="editForm">提交</button>
          <button type="reset" class="btn">重置</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "studentModel",

  data() {
    return {
      userInfo: {}
    };
  },
  computed: {
    ...mapState(["editInfo"])
  },
  methods: {
    hideModel() {
      this.$store.commit("changeModel", false);
    },
    changeInfo(k, v) {
      this.userInfo[k] = v;
    },
    editForm(e) {
      e.preventDefault();
      const user = Object.assign({}, this.editInfo, this.userInfo);
      this.$api.editStudentInfo(user).then( res => {
          this.hideModel();
          this.$store.dispatch("changeTableList", user);
      });
    }
  }
};
</script>

<style lang='scss' scoped>
%fixed-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.studentModelBox {
  @extend %fixed-box;
}
.mask {
  @extend %fixed-box;
  background-color: rgba(0, 0, 0, 0.5);
}
.add-student {
  position: absolute;
  width: 500px;
  height: 450px;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  h3 {
    padding: 10px 0 0 10px;
  }
  .add-student-form {
    width: 400px;
    font-size: 16px;
    margin: 50px auto;
    & > div {
      margin: 10px 0;
      height: 21px;
      line-height: 21px;
      label {
        display: inline-block;
        width: 100px;
        text-align: right;
        margin-right: 10px;
      }
      .radio-label {
        display: inline-block;
        width: 20px;
        margin-right: 10px;
        font-size: 16px;
      }
      input {
        font-size: 16px;
      }
      .btn {
        width: 90px;
        height: 30px;
        line-height: 30px;
        margin-right: 10px;
      }
    }
  }
}
</style>
