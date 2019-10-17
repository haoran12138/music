<template>
  <div class="singer">
    <ul>
      <li
        v-for="(singer,index) in singerList"
        :key="index"
        @click="$router.push({ name: 'Singerdetail', query:{id:singer.id}})"
      >
        <div class="avatar">
          <img v-if="singer.picUrl" :src="singer.picUrl" alt />
          <img v-else :src="singer.img1v1Url" alt />
        </div>
        <div class="name">
          {{ singer.name }}
          <span
            v-if="singer.alia"
            class="alia"
          >({{singer.alia[singer.alia.length-1]}})</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "singer",
  data() {
    return {
      keyword: this.$route.query.keyword,
      singerList: []
    };
  },
  methods: {
    update() {
      this.keyword = this.$route.query.keyword;
      this.singerList = [];
      axios({
        type: "get",
        url: `http://134.175.69.66:3000/search?type=100&keywords=${this.$route.query.keyword}`
      }).then(res => {
        this.singerList = res.data.result.artists;
      });
    }
  },
  created() {
    this.update();
  },
  activated() {
    if (this.keyword != this.$route.query.keyword) {
      this.update();
    }
  }
};
</script>
<style lang="scss" scoped>
.singer {
  width: 100%;
  padding-top: 0.1rem;
  overflow: hidden;
  background: #fff;
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
      }
    }
  }
}
</style>
