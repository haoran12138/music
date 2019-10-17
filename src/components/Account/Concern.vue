<template>
  <div class="concern">
    <van-nav-bar title="关注" left-text="返回" fixed left-arrow @click-left="onClickLeft">
      <van-icon name="bar-chart-o" @click="ranking" />
    </van-nav-bar>

    <ul class="conlist">
      <li v-for="(item,index) in conlist" :key="index">
        <van-image round width="0.6rem" height="0.6rem" :src="item.avatarUrl" />
        <div>
          <h2>{{item.nickname}}</h2>
          <p>{{item.signature}}</p>
        </div>
        <button class="btn btnclone" @click="favor(index)"></button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "concern",
  data() {
    return {
      conlist: [],
      userlist: [],
      t: ""
    };
  },
  components: {},

  created() {
    let id = JSON.parse(localStorage.getItem("id"));
    axios({
      type: "get",
      url: `http://134.175.69.66:3000/user/follows?uid=${id}`
    }).then(res => {
      this.conlist = res.data.follow;
      console.log(res.data.follow);
      this.index = this.conlist.index;
    });
  },
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
    },

    favor(index) {
      // console.log(index);

      let domBtn = document.querySelectorAll("button")[index];
      if (domBtn.className == "btn btnclone") {

        domBtn.className = "btn btnconcern";
      } else {
        domBtn.className = "btn btnclone";
       let id = JSON.parse(localStorage.getItem("id"));
        axios({
          type: "get",
          url: `http://134.175.69.66:3000/follow?id=${id}&t=1`
        }).then(res => {
          this.conlist = res.data.user;
          console.log(res.data.user);
          this.index = this.conlist.index;

        });

      }
    },

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
    .btn {
      outline: none;
      width: 0.7rem;
      height: 0.3rem;
      color: white;
      font-size: 0.12rem;
      line-height: 0.3rem;
      margin-top: 0.1rem;
      text-align: center;
      border-radius: 0.2rem;
      border: 1px solid #ccc;
    }
  }
  .btnconcern {
    background: red;
    &::after {
      content: "关注";
    }
  }
  .btnclone {
    background: #cccccc;
    &::after {
      content: "已关注";
    }
  }
}
</style>
