<template>
  <div class="account">
    <div class="nav">
      <span class="title">账户</span>
      <van-icon class="con" name="bar-chart-o" @click="ranking" />
    </div>

    <section>
      <!-- 第一块 -->
      <div class="person">
        <div class="per-top">
          <figure>
            <img :src="person.avatarUrl?person.avatarUrl:defaultimg" />
            <figcaption v-if="isShow">
              <h2>{{person.nickname}}</h2>
              <p>{{person.signature}}</p>
              <em>Lv.{{level}}</em>
            </figcaption>
            <div v-if="!isShow" class="nologin">
              <p>还没有登录，立即</p>
              <span @click="login">登录</span>
            </div>
          </figure>

          <div class="qiandao" v-if="isShow">
            <span @click="qiandao" :style="{color:f_color,background:bg_color}">{{qian}}</span>
          </div>
        </div>
        <ul class="per-bot" v-show="isShow">
          <li @click="dongtai">
            <h2>动态</h2>
            <span>0</span>
          </li>
          <li @click="concern">
            <h2>关注</h2>
            <span>{{person.follows}}</span>
          </li>
          <li>
            <h2 @click="fen">粉丝</h2>
            <span>{{person.followeds}}</span>
          </li>
          <li class="per-teshu">
            <h2>我的资料</h2>
          </li>
        </ul>
      </div>

      <!-- 第二块 -->
      <article class="main">
        <ul>
          <li>
            <van-icon name="envelop-o" />
            <div>
              <h2 @click="message">
                <p>我的消息</p>
                <span></span>
              </h2>
              <van-icon name="arrow" />
            </div>
          </li>
        </ul>
      </article>
      <!-- 第三块 -->
      <article class="main">
        <ul>
          <li>
            <van-icon name="vip-card-o" />
            <div>
              <h2>会员中心</h2>
              <van-icon name="arrow" />
            </div>
          </li>
          <li>
            <van-icon name="bag-o" />
            <div>
              <h2>商城</h2>
              <van-icon name="arrow" />
            </div>
          </li>
          <li>
            <van-icon name="service-o" />
            <div @click="online">
              <h2>在线听歌免流量</h2>
              <van-icon name="arrow" />
            </div>
          </li>
        </ul>
      </article>
      <!-- 第四块 -->
      <article class="main">
        <ul>
          <li>
            <van-icon name="setting-o" />
            <div>
              <h2>设置</h2>
              <van-icon name="arrow" />
            </div>
          </li>
          <li>
            <van-icon name="flower-o" />
            <div>
              <h2>主题换肤</h2>
              <van-icon name="arrow" />
            </div>
          </li>
          <li>
            <van-icon name="bulb-o" />
            <div>
              <h2>夜间模式</h2>
              <van-icon name="arrow" />
            </div>
          </li>

          <li>
            <van-icon name="underway-o" />
            <div>
              <h2>定时关闭</h2>
              <van-icon name="arrow" />
            </div>
          </li>
          <li>
            <van-icon name="bullhorn-o" />
            <div>
              <h2>音乐闹钟</h2>
              <van-icon name="arrow" />
            </div>
          </li>
          <li>
            <van-icon name="question-o" />
            <div>
              <h2 @click="about">关于</h2>
              <van-icon name="arrow" />
            </div>
          </li>
        </ul>
      </article>
      <!-- 第五块 -->
      <article>
        <van-button class="loginOut" @click="loginOut">退出登录</van-button>
      </article>
    </section>
  </div>
</template>
 <script>
import { Toast } from "vant";
import axios from "axios";
// @ is an alias to /src

export default {
  name: "Account",
  components: {},
  data() {
    return {
      isShow: false,
      qian: "签到",
      f_color: " white",
      bg_color: "red",
      person: {},
      level: "",
      id: JSON.parse(localStorage.getItem("id")),
      defaultimg: require("../assets/logo.png")
    };
  },
  created() {
    this.isLogin();
  },
  methods: {
    isLogin() {
      if (this.id == undefined) {
      } else {
        this.isShow = true;
      }
      axios({
        type: "get",
        url: `http://47.104.88.123:3000/user/detail?uid=${this.id}`
      })
        .then(res => {
          this.person = res.data.profile;
          console.log(this.person);
          this.level = res.data.level;
        })
        .catch(err => {
          console.log("请登录");
        });
    },

    login() {
      this.$router.push({
        name: "Register"
      });
    },
    ranking() {
      this.$router.push({
        name: "Ranking"
      });
    },
    qiandao() {
      this.qian = "已签到";
      this.f_color = "#e8e7e7";
      this.bg_color = "#cecece";
    },
    dongtai() {
      this.$toast({
        message: "暂时没有动态"
      });
    },
    concern() {
      this.$router.push({
        name: "Concern"
      });
    },
    fen() {
      this.$router.push({
        name: "Fen"
      });
    },
    message() {
      this.$router.push({
        name: "Mymessage"
      });
    },
    online() {
      this.$router.push({
        name: "Home"
      });
    },
    about() {
      this.$router.push({
        name: "About"
      });
    },
    loginOut() {
      // localStorage.removeItem("id");
      axios({
        type: "get",
        url: `http://47.104.88.123:3000/logout`
      })
        .then(res => {
          console.log(res.data.code);
          this.code = res.data.code;
          if ((this.code = 200)) {
            localStorage.removeItem("id");
            this.person = {};
            this.isShow = false;
          }
        })
        .catch(err => {
          console.log("退出登录");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.nav .title {
  margin-left: 0.48rem;
}
.account {
  padding-bottom: 0.5rem;
}

section {
  width: 100%;
  flex: 1;
  background: #eeeff0;
  font-size: 0.16rem;
  overflow: auto;
}

.person {
  width: 100%;
  height: 1.5rem;
  background: #fff;
  margin-bottom: 0.1rem;
}
.per-top {
  width: 100%;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.per-top figure {
  width: 2.44rem;
  height: 1rem;
  margin-left: 0.25rem;
  display: flex;
  align-items: center;
  img {
    display: block;
    width: 0.6rem;
    border-radius: 50%;
  }
  figcaption {
    height: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 0.1rem;
    h2 {
      font-size: 0.16rem;
      font-weight: bold;
    }
    p {
      font-size: 0.14rem;
      color: #b0b1b2;
    }
    em {
      width: 0.4rem;
      height: 0.2rem;
      line-height: 0.2rem;
      display: block;
      border-radius: 0.3rem;
      background: #cecece;
      font-weight: bold;
      font-size: 0.12rem;
      text-align: center;
      color: white;
    }
  }
}

.qiandao {
  width: 0.8rem;
  height: 0.3rem;
  margin-right: 0.2rem;
  line-height: 0.3rem;
  text-align: center;
  border-radius: 0.3rem;
  span {
    display: block;
    font-size: 0.16rem;
  }
}
.nologin {
  font-size: 0.16rem;
  color: #b0b1b2;
  margin-left: 0.1rem;
  display: flex;
  span {
    display: block;
    color: blue;
    margin-left: 0.1rem;
  }
}

.per-bot {
  width: 100%;
  height: 0.5rem;
  display: flex;
  align-items: center;
  border-top: 1px solid #e2e3e4;
}
.per-bot li {
  width: 1.85rem;
  height: 0.5rem;
  padding-top: 0.05rem;
  text-align: center;
  border-right: 1px solid #e2e3e4;
  display: flex;
  flex-direction: column;
}

.per-bot li h2 {
  font-size: 0.16rem;
  color: #979798;
}
.per-bot li span {
  font-size: 0.15rem;
  color: #323233;
}
.per-bot .per-teshu {
  border-right: 0;
  position: relative;
}

// 第二块到最后
.main {
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: space-around;
  margin-bottom: 0.1rem;

  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    li:last-child div:last-child {
      border-bottom: none;
    }
    li {
      width: 100%;
      height: 0.4rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .van-icon {
        font-size: 0.16rem;
        margin: 0 0.25rem;
        color: #8f8e94;
      }
      div {
        flex: 1;
        border-bottom: 1px solid #eeeff0;
        height: 0.4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        h2 {
          font-size: 0.16rem;
          font-weight: normal;
          display: flex;
          justify-content: space-around;
          p {
            width: 0.7rem;
          }
          span {
            width: 0.1rem;
            height: 0.1rem;
            background: red;
            border-radius: 50%;
            color: #fff;
            font-size: 0.12rem;
          }
        }
        h3 {
          font-size: 0.14rem;
          color: #b0b1b2;
          font-weight: normal;
          margin-right: -3.82rem;
        }
      }
    }
  }
}

.loginOut {
  width: 100%;
  display: block;
  color: rgba(255, 255, 255, 1);
  background-color: rgba(0, 0, 0, 1);
  font-size: 0.16rem;
}
</style>
