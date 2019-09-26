<template>
  <div class="login">
    <van-nav-bar title="邮箱登录" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-cell-group>
      <van-field
        v-model="email"
        required
        clearable
        label="邮箱"
        right-icon="question-o"
        left-icon="contact"
        @blur="sendemail"
        placeholder="请输入邮箱"
        @click-right-icon="$toast('请使用网易邮箱')"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        value="15031506"
        left-icon="contact"
      />
    </van-cell-group>
    <van-button class="loginbtn" @click="login">登录</van-button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      email: "cxq1503@163.com",
      password: "15031506"
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "Register"
      });
    },
    sendemail() {
      var regEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
      if (!regEmail.test(this.email)) {
        alert("邮箱格式不正确");
      }
    },
    login() {
      if (this.email && this.password) {
        axios({
          type: "post",
          url: `http://47.104.88.123:3000/login?email=${this.email}&password=${this.password}`
        })
          .then(res => {
            this.id = res.data.account.id;
            localStorage.setItem("id", JSON.stringify(this.id));
            this.$router.push({
              name: "Account"
            });
          })
          .catch(err => {
            alert("请输入正确的邮箱");
          });
      } else {
        this.$notify("请输入邮箱和密码");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 100;
  background: white;
}
.loginbtn {
  width: 100%;
  display: block;
  color: rgba(255, 255, 255, 1);
  background-color: rgba(0, 0, 0, 1);
  font-size: 0.16rem;
}
</style>
