<template>
  <div class="toast" v-if="over" :class="{'fade-in': showClass, 'fade-out': !showClass}">
    <div v-if="type == 'success'">√{{msg}}</div>
    <div v-if="type == 'fail'">×{{msg}}</div>
  </div>
</template>

<script>
export default {
  name: 'toast',

  data () {
    return {

    }
  },

  methods: {}
}
</script>

<style lang='scss' scoped>
    .toast {
        position: fixed;
        top: 40px;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px 15px 15px 20px;
        background: #f0f9eb;
        font-weight: 600;
    }
    .success {
        background-color: #f0f9eb;
    }
    .fail {
        background-color: #fef0f0;
    }
    .fade-in {
        animation: fadeIn .3s;
    }
    .fade-out {
        animation: fadeOut .3s;
    }
    @keyframes fadeIn {
        0% {
            top: 0;
            opacity: 0;
        }
        100% {
            top: 40px;
            opacity: 1;
        }
    }
    @keyframes fadeOut {
        100% {
            top: 0;
            opacity: 0;
        }
        0% {
            top: 40px;
            opacity: 1;
        }
    }
</style>
