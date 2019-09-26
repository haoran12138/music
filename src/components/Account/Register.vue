<template>
  <div class="register">
    <div class="nav">
      <span class="title">账户</span>
    </div>
    <img src="../../assets/logo.png" class="logo" />
    <div class="login">
      <div class="person" @click="login">邮箱登录</div>
      <div class="person" @click="tiyan">游客体验</div>
    </div>
    <p>其他登录方式</p>
    <ul class="tubiao">
      <li>
        <img src="../../assets/icon_QQ.png" class="tu" />
      </li>
      <li>
        <img src="../../assets/weixin.png" class="tu" />
      </li>
      <li>
        <img src="../../assets/weibo.png" class="tu" />
      </li>
      <li>
        <img src="../../assets/dd.png" class="tu" />
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "register",
  components: {},

  methods: {
    ranking() {
      this.$router.push({
        name: "Ranking"
      });
    },
    login() {
      this.$router.push({
        name: "Login"
      });
    },
    tiyan() {
      this.$router.push({
        name: "Home"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  margin-top: 1rem;
}
.logo {
  display: block;
  margin: 0.8rem auto;
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 50%;
}

.person {
  width: 2.6rem;
  height: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 0.05rem;
  color: rgba(255, 255, 255, 1);
  margin: 0.2rem auto;
  font-size: 0.16rem;
  line-height: 0.4rem;
  text-align: center;
  color: #000;
}
p {
  width: 0.88rem;
  height: 0.48rem;
  left: 1.16rem;
  top: 4.23rem;
  color: rgba(80, 80, 80, 1);
  font-size: 0.14rem;
  line-height: 0.48rem;
  text-align: center;
  margin: 0rem auto;
  margin-top: 0.84rem;
}
.tubiao {
  margin-top: 0.13rem;
  display: flex;
  justify-content: space-around;
  li {
    width: 0.4rem;
    height: 0.4rem;
    left: 1.05rem;
    top: 4.84rem;
    color: rgba(80, 80, 80, 1);
    background-color: rgba(181, 181, 181, 1);
    border-radius: 0.2rem;
    font-size: 0.12rem;
    line-height: 1.2%;
    text-align: center;

    .tu {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      background: white;
    }
  }
}
</style>
