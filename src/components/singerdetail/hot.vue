<template>
  <div class="hot clear">
    <ul class="song">
      <li class="clear" v-for="(item, index) in songlist" :key="index">
        <div class="ranking">{{ index+1 }}</div>
        <div class="content">
          <div class="info" @click="play({index:index,playList:playList})">
            <div class="songName">{{ item.name }}</div>
            <div class="singer">
              <div class="singerName">
                <span v-for="singer in item.ar" :key="singer.id">{{ singer.name }}</span>
              </div>
              <span class="alname">{{ item.al.name }}</span>
            </div>
          </div>
          <div @click="$router.push({name:'mvplayer',query:{id:item.mv} })" class="operate">
            <div class="mv" v-if="item.mv">
              <van-icon name="video-o" />
            </div>
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
  name: "hot",
  data() {
    return {
      id: 0,
      songlist: []
    };
  },
  methods: {
    ...mapMutations(["play"])
  },
  activated() {
    this.id = this.$route.query.id;
  },
  watch: {
    id: function() {
      this.songlist = [];
      axios({
        type: "get",
        url: `http://47.104.88.123:3000/artists?id=${this.id}`
      }).then(res => {
        this.songlist = res.data.hotSongs;
      });
    }
  },
  computed: {
    playList() {
      let playList = [];
      this.songlist.forEach((item, index) => {
        playList.push({
          id: item.id,
          name: item.name,
          singer: item.ar
        });
      });
      return playList;
    }
  }
};
</script>
<style lang="scss" scoped>
.hot {
  margin-top: 0.2rem;
}
.content-top {
  height: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 0.1rem;
  color: rgb(53, 52, 52);
}
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
    float: right;
    width: 3.25rem;
    height: 0.5rem;
    padding-left: 0.1rem;
    border-top: 1px solid #ccc;
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
        color: #999;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        .singerName {
          float: left;
          span:after {
            content: "/";
          }
          span:last-child:after {
            content: "";
          }
        }
        .alname {
          color: #ccc;
          margin-left: 0.2rem;
        }
      }
    }
    .operate {
      line-height: 0.5rem;
      height: 0.5rem;
      float: right;
      padding-right: 0.3rem;
      .mv {
        font-size: 0.2rem;
      }
    }
  }
}
</style>
