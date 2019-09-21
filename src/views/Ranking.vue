<template>
  <div class="ranking">
    <div class="nav">
      <van-icon class="con" name="coupon" />
      <span class="title">排行榜</span>
      <van-icon class="con" name="coupon" @click="showPlay(true)" />
    </div>
    <div class="officials">
      <h4>官方榜</h4>
      <router-link
        :to="{name:'ListDetails',query:{xid:item.xid}}"
        v-for="item in officialsLists"
        :key="item.id"
        class="list"
      >
        <div class="coverImg">
          <img :src="item.coverImgUrl" :alt="item.description" />
          <span class="updataTime">{{ item.updateFrequency }}</span>
        </div>
        <div class="singer">
          <p
            v-for="(track, index) in item.tracks"
            :key="index"
          >{{ index+1 }}、 {{ track.first }} - {{ track.second }}</p>
        </div>
      </router-link>
    </div>
    <lists :lists="recommendedLists"></lists>
    <lists :lists="internationalLists"></lists>
    <lists :lists="otherLists"></lists>
  </div>
</template>

<script>
import axios from "axios";
import Lists from "../components/Ranking/Lists.vue";
import { mapMutations } from "vuex";
// 列表里没有xid 手动加一个
const listXidName = [
  "云音乐新歌榜",
  "云音乐热歌榜",
  "网易原创歌曲榜",
  "云音乐飙升榜",
  "云音乐电音榜",
  "UK排行榜周榜",
  "美国Billboard周榜",
  "KTV唛榜",
  "iTunes榜",
  "Hit FM Top榜",
  "日本Oricon周榜",
  "韩国Melon排行榜周榜",
  "韩国Mnet排行榜周榜",
  "韩国Melon原声周榜",
  "中国TOP排行榜(港台榜)",
  "中国TOP排行榜(内地榜)",
  "香港电台中文歌曲龙虎榜",
  "华语金曲榜",
  "中国嘻哈榜",
  "法国 NRJ Vos Hits 周榜",
  "台湾Hito排行榜",
  "Beatport全球电子舞曲榜",
  "云音乐ACG音乐榜",
  "云音乐说唱榜",
  "云音乐古典音乐榜",
  "云音乐国电榜",
  "抖音排行榜",
  "新声榜",
  "云音乐韩语榜",
  "英国Q杂志中文版周榜",
  "电竞音乐榜",
  "云音乐欧美热歌榜",
  "云音乐欧美新歌榜",
  "说唱TOP榜"
];

export default {
  name: "ranking",
  data() {
    return {
      list: []
    };
  },
  created() {
    axios({
      type: "get",
      url: "http://47.104.88.123:3000/toplist/detail"
    }).then(res => {
      this.list = res.data.list;
      // 获取歌单要一个xid
      this.list.forEach((item, index) => {
        item.xid = listXidName.indexOf(item.name);
      });
    });
  },
  computed: {
    // 官方榜
    officialsLists: function() {
      return this.list.slice(0, 4);
    },
    // 推荐榜
    recommendedLists: function() {
      return this.list.slice(4, 10);
    },
    // 全球榜
    internationalLists: function() {
      return this.list.slice(10, 16);
    },
    otherLists: function() {
      return this.list.slice(17, 26);
    }
  },
  methods: {
    ...mapMutations(["showPlay"])
  },
  components: {
    lists: Lists
  }
};
</script>
<style lang="scss" scoped>
.ranking {
  padding: 0.5rem 0.1rem 100px;
}

.officials {
  margin-top: 0.1rem;
  h4 {
    font-weight: 500;
    margin: 0.1rem 0;
  }
  .list {
    width: 100%;
    margin-top: 0.08rem;
    display: flex;
    .coverImg {
      position: relative;
      img {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 0.08rem;
      }
      .updataTime {
        position: absolute;
        bottom: 0.04rem;
        left: 0.04rem;
        color: #fff;
        font-size: 0.12rem;
      }
    }
    .singer {
      width: 60%;
      margin-left: 0.1rem;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: center;
      p {
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: 0.12rem;
        color: rgba(0, 0, 0, 0.7);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
