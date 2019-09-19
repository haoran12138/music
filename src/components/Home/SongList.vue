<template>
  <div class="songlist">
    <div class="tit">
      <img src="../../assets/a.png" alt />
      <div class="description">
        <h3>精品歌单推荐</h3>
        <p>评论过万的英文歌与潜力股</p>
        <p>听歌写评论 评评更健康</p>
      </div>
    </div>
    <div class="playlist">
      <figure v-for="item in playlist" :key="item.id">
        <img v-lazy="item.coverImgUrl" :src="item.coverImgUrl" alt />
        <figcaption>{{ item.name }}</figcaption>
      </figure>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: "songlist",
  data() {
    return {
      playlist: []
    };
  },
  components: {},
  created() {
    axios({
      type: "get",
      url: "http://47.104.88.123:3000/top/playlist?limit=20&order=hot"
    }).then(res => {
      this.playlist = res.data.playlists;
    });
  }
};
</script>
<style scoped lang="scss">
.tit {
  box-sizing: border-box;
  padding: 0.15rem 0.1rem;
  width: 100%;
  height: 1.2rem;
  background: #a4c0c7;
  color: #fff;
  display: flex;
  img {
    height: 0.9rem;
    width: 0.9rem;
  }
  .description {
    margin-left: 0.3rem;
    p:nth-of-type(1) {
      font-size: .12rem;
      margin-top: .2rem;
    }
    p:nth-of-type(2) {
      margin-top: 0.05rem;
      font-size: .10rem;
      color:rgba(255, 255, 255, 0.5);
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
      font-size: .1rem;
      line-height: 170%;
      padding: .05rem;
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
