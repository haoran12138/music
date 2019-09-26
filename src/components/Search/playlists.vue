<template>
  <div class="playlists">
    <ul>
      <li
        v-for="(item,index) in playlists"
        :key="index"
        @click="$router.push({ name: 'SongListsDetails', query:{id:item.id}})"
      >
        <div class="cover">
          <img :src="item.coverImgUrl" alt />
        </div>
        <div class="name">{{ item.name }}</div>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "songlist",
  data() {
    return {
      keyword: this.$route.query.keyword,
      playlists: []
    };
  },
  methods: {
    update() {
      this.keyword = this.$route.query.keyword;
      this.playlists = [];
      axios({
        type: "get",
        url: `http://47.104.88.123:3000/search?type=1000&keywords=${this.$route.query.keyword}`
      }).then(res => {
        this.playlists = res.data.result.playlists;
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
.playlists {
  width: 100%;
  padding-top: 0.1rem;
  overflow: hidden;
  background: #fff;
  ul {
    li {
      margin-top: 0.2rem;
      height: 1rem;
      display: flex;
      align-items: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      .cover {
        img {
          width: 1rem;
        }
      }
      .name {
        margin-left: 0.2rem;
      }
    }
  }
}
</style>
