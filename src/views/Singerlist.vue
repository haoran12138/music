<template>
  <div class="singerlist">
    <div class="singer-top">
      <div class="singgertop">
        <van-icon name="arrow-left" @click="$router.back(-1)" />
        <span>{{$route.query.name}}</span>
        <van-icon />
      </div>
    </div>
    <div class="lists">
      <ul>
        <li
          v-for="(singer,index) in singerlist"
          :key="index"
          @click="$router.push({ name: 'Singerdetail', query:{id:singer.id}})"
        >
          <div class="avatar">
            <img :src="singer.picUrl" alt />
          </div>
          <div class="name">
            {{ singer.name }}
            <span v-if="singer.alias.length > 0" class="alia">({{singer.alias[0]}})</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Singerlist",
  data() {
    return {
      singerlist: []
    };
  },

  activated() {
    this.singerlist = [];
    axios({
      type: "get",
      url: `http://47.104.88.123:3000/artist/list?cat=${this.$route.query.id}`
    }).then(res => {
      this.singerlist = res.data.artists;
    });
  }
};
</script>
<style lang="scss" scoped>

.singer-top {
  width: 100%;
  position: fixed;
  top: 0;
  height: 0.5rem;
  z-index: 9;
  .singgertop {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 0.5rem;
    z-index: 999;
    top: 0;
    background-color: #fff;
  }
}
.lists {
  margin-top: 0.5rem;
}
ul {
  li {
    display: flex;
    align-items: center;
    height: 0.8rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .avatar {
      width: 0.5rem;
      height: 0.5rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .name {
      margin-left: 0.2rem;
      widows: 0.5rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .alia {
        font-size: 0.1rem;
        margin-left: 0.06rem;
        color: #999;
      }
    }
  }
}
</style>
