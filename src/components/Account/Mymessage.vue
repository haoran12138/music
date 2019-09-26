<template>
  <div class="mymessage">
    <van-nav-bar title="我的消息" left-text="返回" fixed left-arrow @click-left="onClickLeft">
      <van-icon name="bar-chart-o" @click="ranking" />
    </van-nav-bar>
    <ul class="conlist">
      <li>
        <van-image round width="0.6rem" height="0.6rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <div>
          <h2>樱桃小丸子</h2>
          <p>我是樱桃小丸子，让我们一起聊天吧！</p>
        </div>
      </li>
      <li>
        <van-image round width="0.6rem" height="0.6rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <div>
          <h2>樱桃小丸子</h2>
          <p>我是樱桃小丸子，让我们一起聊天吧！</p>
        </div>
      </li>
      <li>
        <van-image round width="0.6rem" height="0.6rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <div>
          <h2>樱桃小丸子</h2>
          <p>我是樱桃小丸子，让我们一起聊天吧！</p>
        </div>
      </li>
      <li>
        <van-image round width="0.6rem" height="0.6rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <div>
          <h2>樱桃小丸子</h2>
          <p>我是樱桃小丸子，让我们一起聊天吧！</p>
        </div>
      </li>
      <li>
        <van-image round width="0.6rem" height="0.6rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <div>
          <h2>樱桃小丸子</h2>
          <p>我是樱桃小丸子，让我们一起聊天吧！</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "mymessage",

  data() {
    return {};
  },
  components: {},

  methods: {
    onClickLeft() {
      this.$router.push({
        name: "Account"
      });
    },
    ranking() {
      this.$router.push({
        name: "Ranking"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.conlist {
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0.46rem 0 0.5rem 0;
  li {
    display: flex;
    padding: 0.1rem 0;
    justify-content: space-around;
    h2 {
      font-size: 0.16rem;
      height: 0.36rem;
      width: 2.2rem;
      margin-left: 0.1rem;
    }
    p {
      width: 2.2rem;
      height: 0.18rem;
      font-size: 0.14rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0 0.1rem;
    }
  }
}
</style>
