<template>
  <div class="mvplayer">
    <div class="singer-top"></div>
    <div class="nav">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <span class="title">视频</span>
      <van-icon />
    </div>
    <div class="player">
      <video width="100%" autoplay controls :src="url"></video>
    </div>
    <div class="content">
      <div class="name">{{info.name}}</div>
      <div v-if="info.desc != ''" :class="activeClass%2==0?'desca':'desc'">{{info.desc}}</div>
      <div
        v-if="info.desc != ''"
        :class="activeClass%2==0?'bbbb':'aaaa'"
        @click="getItem(activeClass)"
      >{{activeClass%2==0?'收起' : '展开'}}</div>
    </div>
    <!-- //相关视频推荐 -->
    <div class="relatedlist">
      <span class="listtitle">相关视频推荐</span>
      <div
        v-for="(item,index) in relatedlist"
        :key="index"
        @click="update(item.vid,item.type)"
        class="listdetail"
      >
        <div class="list-left">
          <img :src="item.coverUrl" alt />
        </div>
        <div class="word">
          <div class="mvname">{{item.title}}</div>
          {{item.creator[0].userName}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  name: "mvplayer",

  data() {
    return {
      url: "",
      info: {
        name: "",
        desc: ""
      },
      relatedlist: [],
      activeClass: 1
    };
  },
  watch: {},
  methods: {
    getItem(index) {
      index++;
      this.activeClass = index; // 把当前点击元素的index，赋值给activeClass
    },
    update(id, type) {
      this.mv = {
        brs: ""
      };
      this.relatedlist = [];
      this.activeClass = 1;
      if (type == 1) {
        axios({
          type: "get",
          url: `http://134.175.69.66:3000/video/url?id=${id}`
        }).then(res => {
          this.url = res.data.urls[0].url;
          this.info = { name: "", desc: "" };
        });
      } else {
        axios({
          type: "get",
          url: `http://134.175.69.66:3000/mv/detail?mvid=${id}`
        }).then(res => {
          let brsKey = Object.keys(res.data.data.brs);
          let key = brsKey[brsKey.length - 1];
          this.url = res.data.data.brs[key];
          this.info = { name: res.data.data.name, desc: res.data.data.desc };
        });
      }

      axios({
        type: "get",
        url: `http://134.175.69.66:3000/related/allvideo?id=${id}`
      }).then(res => {
        this.relatedlist = res.data.data;
      });
    },
    ...mapMutations(["isPlay"])
  },
  created() {
    this.update(this.$route.query.id);
    this.isPlay(false);
  },
  destroyed() {
    this.isPlay(true);
  }
};
</script>
<style lang="scss" scoped>

.content {
  margin: 0.2rem 0;
  padding: 0 0.12rem;
  position: relative;
  .name {
    font-size: 0.16rem;
    text-align: center;
    color: #666;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .desca {
    margin-top: 0.1rem;
    font-size: 0.1rem;
    color: #999;
    white-space: pre-wrap;
  }
  .desc {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    white-space: pre-wrap;
    color: #999;
    font-size: 0.1rem;
    margin-top: 0.1rem;
  }
  .aaaa {
    position: absolute;
    right: 0.13em;
    top: 0em;
    padding: 0 1em;
    color: rgb(240, 137, 137);
    background: #fff;
    font-size: 0.1rem;
  }
  .bbbb {
    position: absolute;
    right: 0.13em;
    top: 0em;
    padding: 0 1em;
    color: #999;
    background: #fff;
    font-size: 0.1rem;
  }
}
.relatedlist {
  margin-top: 0.1rem;
}
.listdetail {
  display: flex;
  align-items: center;
  margin-bottom: 0.1rem;
  .list-left {
    margin: 0 0.1rem;
    img {
      width: 1.5rem;
      margin-left: 0.1rem;
    }
  }
}

.word {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.13rem;
  color: #999;
  .mvname {
    color: #666;
    margin-bottom: 0.1rem;
  }
}
.listtitle {
  font-size: 0.13rem;
  color: rgb(243, 180, 180);
  margin-bottom: 0.1rem;
  margin-left: 0.1rem;
  display: block;
}
</style>
