<template>
  <div class="songlist">没写</div>
</template>
<script>
import axios from "axios";
export default {
  name: "songlist",
  data() {
    return {
      keyword: this.$route.query.keyword,
      songlist: []
    };
  },
  methods: {},
  created() {},
  activated() {
    if (this.keyword != this.$route.query.keyword) {
      this.keyword = this.$route.query.keyword;
      this.songlist = [];
      axios({
        type: "get"
        // url: `http://47.104.88.123:3000/search?keywords=${this.$route.query.keyword}`
      }).then(res => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.songlist {
  width: 100%;
  padding-top: 0.1rem;
  padding-bottom: 50px;
  overflow: hidden;
  background: #fff;
}
</style>
