<template>
  <!-- 歌单详情 和 排行榜详情 -->
  <transition name="fade">
    <div class="listDetails">
      <div class="nav">
        <van-icon name="arrow-left" @click="$router.back(-1)" />
        <span class="title">排行榜</span>
        <van-icon class="con" name="coupon" />
      </div>
      <div class="cover">
        <div class="bg">
          <img :src="list.coverImgUrl" alt />
        </div>
        <div class="coverImg">
          <img :src="list.coverImgUrl" alt />
        </div>
        <div>
          <van-grid clickable :column-num="4">
            <van-grid-item icon="star-o" :text="getTrackCount" />
            <van-grid-item icon="comment-o" :text="getCommentCount" />
            <van-grid-item icon="share" :text="getShareCount" />
            <van-grid-item icon="down" text="下载" />
          </van-grid>
        </div>
      </div>
      <div class="songs">
        <ul class="song">
          <li v-for="(item, index) in list.tracks" :key="index">
            <div class="ranking">{{ index+1 }}</div>
            <div class="content">
              <div class="info">
                <p class="songName">{{ item.name }}</p>
                <p class="singer">{{item.ar[0].name}}---{{ item.al.name }}</p>
              </div>
              <div class="operate">
                <div class="mv" v-if="item.mv">
                  <router-link :to="{name:'',query:'item.mvD'}">
                    <van-icon name="video-o" />
                  </router-link>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>
<script>
import axios from "axios";
export default {
  name: "listdetails",
  data() {
    return {
      xid: this.$route.query.xid,
      list: {}
    };
  },
  methods: {
    updateList: function() {
      axios({
        type: "get",
        url: `http://47.104.88.123:3000/top/list?idx=${this.xid}`
      }).then(res => {
        this.list = res.data.playlist;
      });
    }
  },
  computed: {
    // 评论数量
    getCommentCount: function() {
      var count = this.list.commentCount;
      if (count < 100000) {
        return count + "";
      } else {
        return (count / 10000).toFixed(1) + "万";
      }
    },
    // 分享数量
    getShareCount: function() {
      var count = this.list.shareCount;
      if (count < 100000) {
        return count + "";
      } else {
        return (count / 10000).toFixed(1) + "万";
      }
    },
    // 收藏数量
    getTrackCount: function() {
      var count = this.list.trackCount;
      if (count < 100000) {
        return count + "";
      } else {
        return (count / 10000).toFixed(1) + "万";
      }
    }
  },
  created() {
    this.updateList();
  },
  // 当keep-aliver切换到当前组件时执行
  activated() {
    if (this.xid != this.$route.query.xid) {
      // 当xid改变时 更新数据
      this.xid = this.$route.query.xid;
      this.list = {};
      this.updateList();
    }
  }
};
</script>
<style lang="scss" scoped>
.fade-enter-active {
  transition: all 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  transform: translateX(100vw);
}
.listDetails {
  padding: 0.45rem 0 50px;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: 100%;
}
.cover {
  width: 100%;
  height: 2.5rem;
  padding: 0.1rem;
  position: relative;
  background: rgba(250, 238, 238, 0.527);

  .coverImg {
    width: 1.5rem;
    height: 1.5rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .bg {
    img {
      filter: blur(10px);
      position: absolute;
      top: 0;
      z-index: -1;
      width: 100%;
    }
  }
}
.songs {
  width: 100%;
  padding-top: 0.1rem;
  height: 4rem;
  background: #fff;
  .song {
    height: 0.5rem;
    li:first-child {
      .content {
        border: 0;
      }
    }
    li:nth-child(-n + 3) {
      .ranking {
        color: red;
      }
    }
    .ranking {
      float: left;
      height: 0.5rem;
      width: 0.5rem;
      font-size: 0.16rem;
      text-align: center;
      line-height: 0.5rem;
      color: #999;
    }
    .content {
      float: right;
      width: 3.25rem;
      height: 0.5rem;
      padding-left: 0.1rem;
      border-top: 1px solid #ccc;
      .info {
        height: 0.5rem;
        width: 2.5rem;
        float: left;
        .songName {
          font-size: 0.16rem;
          line-height: 0.3rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .singer {
          font-size: 0.12rem;
          color: #ccc;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .operate {
        line-height: 0.5rem;
        height: 0.5rem;
        float: right;
        padding-right: 0.3rem;
        .mv {
          font-size: 0.2rem;
        }
      }
    }
  }
}
</style>
