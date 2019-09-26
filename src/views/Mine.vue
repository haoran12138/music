<template>
  <div class="mine">
    <div class="nav">
      <van-icon class="con" name="arrow-left" />
      <span class="title">我的音乐</span>
      <van-icon @click="showPlay(true)" class="con" name="service-o" />
    </div>
    <div class="myinfo">
      <div class="list">
        <div class="my">
          <van-icon name="music-o" size="24px" />
          <span class="title">本地音乐</span>
        </div>
        <div class="my">
          <span class="title">123</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="list">
        <div class="my">
          <van-icon name="play-circle-o" size="24px" />
          <span class="title">最近播放</span>
        </div>
        <div class="my">
          <span class="title">123</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="list">
        <div class="my">
          <van-icon name="volume-o" size="24px" />
          <span class="title">我的电台</span>
        </div>
        <div class="my">
          <span class="title">123</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="list">
        <div class="my">
          <van-icon name="star-o" size="24px" />
          <span class="title">我的收藏</span>
        </div>
        <div class="my">
          <span class="title">123</span>
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <div class="playlist">
      <div class="title">
        我创建的歌单
        <span class="num">({{ playlist.length}})</span>
      </div>
      <div
        @click="$router.push({name:'SongListsDetails',query:{id:item.id}})"
        class="list"
        v-for="item in myplaylist"
        :key="item.id"
      >
        <div class="cover">
          <img :src="item.coverImgUrl" alt />
        </div>
        <div class="info">
          <div class="name">{{ item.name }}</div>
          <div class="desc">
            <span class="num">{{ item.specialType }}首</span>
          </div>
        </div>
      </div>
    </div>
    <div class="playlist">
      <div class="title">
        我收藏的歌单
        <span class="num">({{ playlist.length}})</span>
      </div>
      <div
        class="list"
        v-for="item in playlist"
        :key="item.id"
        @click="$router.push({name:'SongListsDetails',query:{id:item.id}})"
      >
        <div class="cover">
          <img :src="item.coverImgUrl" alt />
        </div>
        <div class="info">
          <div class="name">{{ item.name }}</div>
          <div class="desc">
            <span class="num">{{ item.specialType }}首</span>
            <span class="by">,&nbsp;&nbsp;&nbsp;&nbsp;by&nbsp;&nbsp; {{ item.creator.nickname }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "mine",
  data() {
    return {
      playlist: [],
      myplaylist: []
    };
  },
  methods: {
    ...mapMutations(["showPlay"])
  },
  created() {
    let id = JSON.parse(localStorage.getItem("id"));
    axios({
      url: `http://47.104.88.123:3000/user/playlist?uid=${id}`
    }).then(res => {
      res.data.playlist.forEach((item, index) => {
        if (item.ordered) {
          this.playlist.push(item);
        } else {
          this.myplaylist.push(item);
        }
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.myinfo {
  margin-top: 0.1rem;
  font-size: 0.14rem;
  .list {
    padding: 0 9px 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid #505050;
    img {
      height: 24px;
      width: 24px;
    }
    .my {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        margin: 0 0.1rem;
      }
    }
  }
}
.playlist {
  margin-top: 0.16rem;
  .title {
    font-weight: 600;
    .num {
      font-size: 0.12rem;
      font-weight: 400;
      color: #666;
    }
  }
  .list {
    display: flex;
    margin-top: 0.1rem;
    .cover {
      width: 0.5rem;

      img {
        width: 0.5rem;
        border-radius: 0.05rem;
      }
    }
    .info {
      margin-left: 0.1rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 2.5rem;
      .name {
        font-size: 0.14rem;
        line-height: 0.3rem;
      }
      .desc {
        font-size: 0.1rem;
        color: #666;
      }
    }
  }
}
</style>
