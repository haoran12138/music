<template>
  <div class="recommend">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in banners" :key="item.bannerId">
        <img :src="item.pic" alt />
      </van-swipe-item>
    </van-swipe>
    <van-grid clickable :column-num="3">
      <van-grid-item icon="home-o" text="私人FM" to="/" />
      <van-grid-item icon="home-o" text="每日歌曲推荐" to="/" />
      <van-grid-item icon="home-o" text="热歌榜" :to="{name:'ListDetails',query:{xid:1}}" />
    </van-grid>
    <div class="playlist">
      <h3>推荐歌单</h3>
      <div class="highquality">
        <figure v-for="item in highquality" :key="item.id">
          <router-link :to="{name:'SongListsDetails',query:{id:item.id}}">
            <img v-lazy="item.coverImgUrl" :src="item.coverImgUrl" alt />
            <figcaption>{{ item.name }}</figcaption>
          </router-link>
        </figure>
      </div>
    </div>
    <div class="playlist">
      <h3>推荐MV</h3>
      <div class="personalizedMv">
        <figure
          v-for="item in personalizedMv"
          :key="item.id"
          @click="$router.push({name:'mvplayer',query:{id:item.id} })"
        >
          <img v-lazy="item.picUrl" :src="item.picUrl" alt />
          <figcaption>{{ item.name }}</figcaption>
        </figure>
      </div>
    </div>
    <div class="playlist">
      <h3>独家放送</h3>
      <div class="toMove">
        <figure
          v-for="item in toMove"
          :key="item.id"
          @click="$router.push({name:'mvplayer',query:{id:item.id}})"
        >
          <img v-lazy="item.cover" alt />
          <figcaption>
            {{ item.name }}
            <i>{{item.artistName}}</i>
          </figcaption>
        </figure>
      </div>
    </div>
    <div class="playlist">
      <h3>独家电台</h3>
      <div class="djprogram">
        <figure v-for="item in djprogram" :key="item.id">
          <img v-lazy="item.picUrl" :src="item.picUrl" alt />
          <figcaption>{{ item.name }}</figcaption>
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: "recommend",
  data() {
    return {
      banners: [],
      highquality: [],
      toMove: [],
      djprogram: [],
      personalizedMv: []
    };
  },
  components: {},
  created() {
    axios({
      type: "get",
      url: "http://134.175.69.66:3000/banner?type=2"
    }).then(res => {
      this.banners = res.data.banners;
    });
    axios({
      type: "get",
      url: "http://134.175.69.66:3000/top/playlist/highquality?limit=6"
    }).then(res => {
      this.highquality = res.data.playlists;
    });
    axios({
      type: "get",
      url: "http://134.175.69.66:3000/top/mv?limit=4"
    }).then(res => {
      this.toMove = res.data.data;
    });
    axios({
      type: "get",
      url: "http://134.175.69.66:3000/personalized/djprogram"
    }).then(res => {
      this.djprogram = res.data.result;
    });
    axios({
      type: "get",
      url: "http://134.175.69.66:3000/personalized/mv"
    }).then(res => {
      this.personalizedMv = res.data.result;
    });
  }
};
</script>
<style scoped lang="scss">
.van-swipe {
  height: 1.46rem;
  img {
    width: 100%;
    border-radius: 0.15rem;
  }
}

.van-hairline--top::after,
.van-grid-item__content::after {
  border-color: #fff;
}

.playlist {
  margin-top: 0.1rem;
  width: 100%;
  h3 {
    padding-left: 0.1rem;
  }
  .highquality,
  .toMove,
  .djprogram,
  .personalizedMv {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 0.1rem;
    figure {
      width: 1.15rem;
      height: 1.65rem;
      img {
        width: 1.15rem;
        height: 1.1rem;
        border-radius: 0.1rem;
        display: block;
      }
      figcaption {
        color: rgba(80, 80, 80, 1);
        font-size: 12px;
        line-height: 170%;
        padding: 5px 5px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
  .toMove,
  .personalizedMv {
    figure {
      width: 1.75rem;
      height: 1.4rem;
      img {
        width: 1.75rem;
        height: 1rem;
        border-radius: 0.1rem;
        display: block;
      }
      figcaption {
        color: rgba(80, 80, 80, 1);
        padding: 5px 10px;
        font-size: 12px;
        line-height: 150%;
        text-align: left;
        font-weight: 600;
        i {
          float: right;
          font-weight: 400;
          padding-right: 5px;
        }
      }
    }
  }
}
</style>
