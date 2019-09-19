<template>
  <div class="radio">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in banners" :key="item.bannerId">
        <img :src="item.pic" alt />
      </van-swipe-item>
    </van-swipe>
    <div class="todayPerfereds">
      <h5>电台 - 今日优选</h5>
      <div class="perfered" v-for="item in todayPerfereds" :key="item.id">
        <img :src="item.picUrl" alt />
        <div class="description">
          <p>{{item.rcmdText}}</p>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
    <h5>放些假数据 图片太大了</h5>
    <div class="playlist">
      <figure v-for="item in newset" :key="item.id">
        <img v-lazy="item.picUrl" :src="item.picUrl" alt />
        <figcaption>{{ item.name }}</figcaption>
      </figure>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: "radio",
  data() {
    return {
      banners: [],
      todayPerfereds: [],
      newset: []
    };
  },
  created() {
    axios({
      type: "get",
      url: "http://47.104.88.123:3000/banner?type=1"
    }).then(res => {
      // 电台轮播图没数据  首页轮播图凑合下吧
      this.banners = res.data.banners;
    });
    axios({
      type: "get",
      url: "http://47.104.88.123:3000/dj/today/perfered"
    }).then(res => {
      // 电台轮播图没数据  首页轮播图凑合下吧
      this.todayPerfereds = res.data.data;
    });
    axios({
      type: "get",
      url: "http://47.104.88.123:3000/album/newest"
    }).then(res => {
      // 电台轮播图没数据  首页轮播图凑合下吧
      this.newset = res.data.albums;
    });
  },
  components: {}
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
.todayPerfereds {
  h5 {
    margin-bottom: 0.2rem;
  }
  margin-top: 0.5rem;
  .perfered {
    height: 0.8rem;
    width: 100%;
    margin-top: 0.15rem;
    display: flex;
    img {
      width: 0.8rem;
      height: 0.8rem;
    }
    .description {
      margin-left: 0.2rem;

      p {
        margin-top: 0.1rem;
      }
      p:last-child {
        margin-top: 0.15rem;
        font-size: 0.1rem;
        color: rgba(0, 0, 0, 0.7);
      }
    }
  }
}

.playlist {
  margin-top: 0.1rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  figure {
    width: 1.72rem;
    height: 2.4rem;
    img {
      width: 1.72rem;
      height: 1.72rem;
      border-radius: 0.1rem;
      display: block;
    }
    figcaption {
      color: rgba(80, 80, 80, 1);
      font-size: 0.15rem;
      line-height: 170%;
      padding: 0.05rem;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
