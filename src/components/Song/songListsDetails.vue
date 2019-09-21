<template>
  <!-- 歌单详情 -->
  <transition name="fade">
    <div class="songListsDetails">
      <!-- 遮罩层 -->
      <van-overlay z-index="996" custom-style="background-color:#fff" v-show="show" />
      <div class="overlay" v-show="show">
        <van-overlay z-index="998" custom-style="background-color:#fff" v-show="show" />
        <button @click="onClickHide">x</button>
        <img :src="list.coverImgUrl" alt />
        <p class="name">{{ list.name }}</p>
        <p class="description">{{ list.description }}</p>
        <div class="tags">
          <span v-for="(item,index) in list.tags" :key="index">{{ item }}</span>
        </div>
      </div>
      <!-- 遮罩层结束 -->
      <div class="nav">
        <van-icon name="arrow-left" @click="$router.back(-1)" />
        <span class="title">歌单</span>
        <van-icon class="con" name="coupon" />
      </div>
      <div class="cover">
        <div class="bg">
          <img :src="list.coverImgUrl" alt />
        </div>
        <div class="coverImg">
          <img @click="onClickShow" :src="list.coverImgUrl" alt />
          <div class="info">
            <p class="name">{{ list.name}}</p>
            <div class="avatar">
              <img :src="list.creator.avatarUrl" alt />
              <span>{{list.creator.nickname}}</span>
            </div>
          </div>
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
  name: "songListsDetails",
  data() {
    return {
      id: this.$route.query.id,
      list: {
        creator: {}
      },
      show: false
    };
  },
  methods: {
    updateList: function() {
      axios({
        type: "get",
        url: `http://47.104.88.123:3000/playlist/detail?id=${this.id}`
      }).then(res => {
        this.list = res.data.playlist;
      });
    },
    onClickShow() {
      this.show = true;
    },
    onClickHide() {
      this.show = false;
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
    if (this.id != this.$route.query.id) {
      // 当xid改变时 更新数据
      this.id = this.$route.query.id;
      (this.list = {
        creator: {}
      }),
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
.songListsDetails {
  padding: 0.45rem 0 50px;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: 100%;
}
.overlay {
  position: absolute;
  top: 0;
  z-index: 997;
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    position: absolute;
    z-index: 999;
    top: 0.1rem;
    right: 0.1rem;
    background: rgba(255, 255, 255, 0);
    border: 0;
    font-size: 0.25rem;
  }
  img {
    margin-top: 0.5rem;
    width: 50%;
  }
  .name {
    font-size: 0.14rem;
    line-height: 0.5rem;
  }
  .description {
    font-size: 0.12rem;
    line-height: 0.2rem;
    width: 80%;
    overflow: hidden;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 15;
    line-clamp: 15;
    -webkit-box-orient: vertical;
  }
  .tags {
    span {
      display: inline-block;
      margin: 0.1rem 0.05rem;
      padding: 0.02rem 0.04rem;
      border-radius: 0.5rem;
      font-size: 0.12px;
      color: orange;
      border: 1px solid orange;
    }
  }
}

.cover {
  width: 100%;
  height: 2.5rem;
  padding: 0.1rem;
  position: relative;
  background: rgba(250, 238, 238, 0.527);

  .coverImg {
    height: 1.5rem;
    display: flex;
    img {
      width: 1.5rem;
      height: 1.5rem;
    }
    .info {
      padding: 0.1rem;

      .name {
        font-size: 0.14rem;
      }
      .avatar {
        margin-top: 0.3rem;
        margin-left: 0.1rem;
        img {
          width: 0.3rem;
          height: 0.3rem;
          border-radius: 50%;
        }
        span {
          margin-left: 0.1rem;
          font-size: 0.13rem;
        }
      }
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
