<template>
  <div class="video">
    <ul>
      <li class="clear" v-for="(item,index) in mvs" :key="index">
        <div class="cover" @click="$router.push({ name: 'mvplayer', query:{id:item.id}})">
          <img :src="item.cover" alt />
        </div>
        <div class="info">
          <div class="name">{{ item.name }}</div>
          <div class="artistName">{{ item.artistName }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "mvs",
  data() {
    return {
      keyword: this.$route.query.keyword,
      mvs: []
    };
  },
  methods: {
    update() {
      this.keyword = this.$route.query.keyword;
      this.mvs = [];
      axios({
        type: "get",
        url: `http://134.175.69.66:3000/search?type=1004&keywords=${this.$route.query.keyword}`
      }).then(res => {
        console.log(res);
        this.mvs = res.data.result.mvs;
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
.video {
  width: 100%;
  padding-top: 0.1rem;
  overflow: hidden;
  background: #fff;
  ul {
    li {
      margin-top: 0.2rem;
      display: flex;
      height: 0.9rem;
      .cover {
        img {
          width: 1.6rem;
        }
      }
      .info {
        margin-left: 0.1rem;
        .name {
          margin: 0.1rem 0;
          font-size: 0.14rem;
        }
        .artistName {
          font-size: 0.12rem;
          color: rgba(0, 0, 0, 0.7);
        }
      }
    }
  }
}
</style>
