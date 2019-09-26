<template>
  <div class="songs">
    <ul class="song">
      <li
        class="clear"
        @click="play({index:index,playList:playList})"
        v-for="(item, index) in songList"
        :key="index"
      >
        <div class="content">
          <div class="info">
            <p class="songName">{{ item.name }}</p>
            <p class="singer">
              <span v-for="ar in item.artists" :key="ar.id">{{ar.name}}</span>
              &nbsp;- &nbsp;{{ item.album.name }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  name: "songs",
  data() {
    return {
      keyword: this.$route.query.keyword,
      songList: []
    };
  },
  methods: {
    ...mapMutations(["play", "showPlay"]),
    update() {
      this.keyword = this.$route.query.keyword;
      this.songList = [];
      axios({
        type: "get",
        url: `http://47.104.88.123:3000/search?keywords=${this.$route.query.keyword}`
      }).then(res => {
        this.songList = res.data.result.songs;
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
  },
  computed: {
    playList: function() {
      let playList = [];
      this.songList.forEach((item, index) => {
        playList.push({
          id: item.id,
          name: item.name,
          singer: item.artists
        });
      });
      return playList;
    }
  }
};
</script>
<style lang="scss" scoped>
.songs {
  width: 100%;
  padding-top: 0.1rem;
  overflow: hidden;
  background: #fff;
  ul {
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
      width: 3.25rem;
      height: 0.5rem;
      .info {
        height: 0.5rem;
        width: 3.25rem;
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
          span:after {
            content: "/";
          }
          span:last-child:after {
            content: "";
          }
        }
      }
    }
  }
}
</style>
