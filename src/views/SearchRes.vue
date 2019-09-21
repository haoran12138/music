<template>
  <div class="searchRes">
    <div class="nav">
      <van-icon class="con" name="arrow-left" @click="$router.back(-1)" />
      <span class="title">{{keyword}}</span>
      <!-- 为了让适用弹性盒加的-->
      <span></span>
    </div>
    <van-tabs animated>
      <van-tab title="歌曲">
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
      </van-tab>
      <van-tab title="歌手">没写</van-tab>
      <van-tab title="专辑">没写</van-tab>
      <van-tab title="视频">没写</van-tab>
    </van-tabs>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from "axios";
import { mapMutations } from "vuex";
export default {
  name: "searchres",
  data() {
    return {
      keyword: this.$route.query.keyword,
      songList: []
    };
  },
  components: {},
  methods: {
    ...mapMutations(["play", "showPlay"])
  },
  created() {},
  activated() {
    (this.keyword = this.$route.query.keyword),
      axios({
        type: "get",
        url: `http://47.104.88.123:3000/search?keywords=${this.$route.query.keyword}`
      }).then(res => {
        this.songList = res.data.result.songs;
      });
  },
  computed: {
    playList: function() {
      let playList = [];
      this.songList.forEach((item, index) => {
        playList.push({
          id: item.id
        });
      });
      return playList;
    }
  }
};
</script>
<style lang="scss" scoped>
.searchRes {
  padding-top: 0.4rem;
}
.songs {
  width: 100%;
  padding-top: 0.1rem;
  overflow: hidden;
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
      width: 3.25rem;
      height: 0.5rem;
      padding-left: 0.1rem;
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
