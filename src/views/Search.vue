<template>
  <div class="search">
    <form action="/">
      <van-search v-model="value" placeholder="请输入搜索关键词" show-action />
    </form>

    <div>
      歌手分类
      <van-icon name="arrow" />
    </div>
    <div>
      <div>热门搜索</div>
      <div v-for="(item,index) in searchHot" :key="index">
        <span>{{item.first}}</span>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from "axios";
export default {
  name: "search",
  data() {
    return {
      searchHot: [],
      value: ""
    };
  },
  components: {},

  created() {
    axios({
      type: "get",
      url: "http://47.104.88.123:3000/search/hot"
    }).then(res => {
      this.searchHot = res.data.result.hots;
    });
  }
};
</script>
<style lang="scss" scoped>
.van-tabs__wrap .van-tabs__line {
  background-color: #444;
}
</style>
