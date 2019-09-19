<template>
  <div class="ranking">
    <div class="nav">
      <van-icon class="con" name="coupon" />
      <span class="title">排行榜</span>
      <van-icon class="con" name="coupon" />
    </div>
    <div class="officials">
      <h4>官方排行榜</h4>
      <div v-for="item in officialsList" :key="item.id" class="list">
        <img :src="item.coverImgUrl" :alt="item.description" />
        <div class="singer">
          <p
            v-for="(track, index) in item.tracks"
            :key="index"
          >{{ index+1 }}、 {{ track.first }} - {{ track.second }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: "ranking",
  data() {
    return {
      list: [],
      artistToplist: [],
      rewardToplist: []
    };
  },
  created() {
    axios({
      type: "get",
      url: "http://47.104.88.123:3000/toplist/detail"
    }).then(res => {
      // 电台轮播图没数据  首页轮播图凑合下吧
      this.list = res.data.list;
      this.artistToplist = res.data.artistToplist;
      this.rewardToplist = res.data.rewardToplist;
    });
  },
  computed: {
    officialsList: function() {
      return this.list.splice(0, 4);
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped>
.ranking {
  padding: 0.5rem 0 50px;
}

.officials {
  margin-top: 0.1rem;
  .list {
    width: 100%;
    height: 1rem;
    margin-top: 0.08rem;
    display: flex;
    img {
      width: 1rem;
      height: 1rem;
    }
    .singer {
      width: 60%;
      margin-left: 0.1rem;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: center;
      p {

        height: .3rem;
        line-height: .3rem;
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
