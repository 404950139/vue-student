<template>
  <transition name="turnOpacity">
    <div class="add-student">
      <form action="#" class="add-student-form">
        <div>
          <label for="sName">姓名</label>
          <input type="text" id="sName" v-model="formData.sName" />
        </div>
        <div>
          <label for>性别</label>
          <input
            type="radio"
            id="boy"
            value="0"
            name="sex"
            :checked="formData.sSex == 0 ? true : false"
            v-model="formData.sSex"
          />
          <label for="boy" class="radio-label">男</label>
          <input type="radio" id="girl" value="1" name="sex" v-model="formData.sSex" />
          <label for="girl" class="radio-label">女</label>
        </div>
        <div>
          <label for="sEmail">邮箱</label>
          <input type="text" id="sEmail" v-model="formData.sEmail" />
        </div>
        <div>
          <label for="sYear">出生年</label>
          <input type="text" id="sYear" v-model="formData.sYear" />
        </div>
        <div>
          <label for="sPhone">手机号</label>
          <input type="text" id="sPhone" v-model="formData.sPhone" />
        </div>
        <div>
          <label for="sAddress">住址</label>
          <input type="text" id="sAddress" v-model="formData.sAddress" />
        </div>
        <div>
          <label for>&nbsp;</label>
          <input type="submit" value="提交" class="btn" @click="submitForm" />
          <input type="reset" value="重置" class="btn" />
        </div>
      </form>
    </div>
  </transition>
</template>

<script>
export default {
  name: "addStudent",

  data() {
    return {
      formData: {
        sName: "",
        sSex: 0,
        sEmail: "",
        sYear: "",
        sPhone: "",
        sAddress: ""
      }
    };
  },

  methods: {
    submitForm(e) {
      e.preventDefault();
      // 提交学生信息
      this.$api.insertStudentForm(this.formData).then( res => {
        this.$router.push({path: 'studentList'});
      });

      // for (let i = 0; i < 1000; i++) {
      //   let address = ["哈尔滨", "辽宁", "浙江", "福建", "新疆", "西藏", "台湾", "香港"];
      //   let form = {};
      //   form.sName = '测试' + ( i + 200 );
      //   form.sSex = Math.round(Math.random() * 1);
      //   form.sEmail = "404860@qq.com";
      //   form.sYear = 1998;
      //   form.sPhone = 18864578546 + i;
      //   form.sAddress = address[Math.ceil(Math.random() * 7)];
      //   // console.log(form);

      //   this.$api.insertStudentForm(form).then(res => {
      //     console.log(res);
      //   });
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
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
.add-student {
  position: absolute;
  top: 0;
  width: 100%;
  .add-student-form {
    margin: 50px auto;
    width: 400px;
    font-size: 16px;
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