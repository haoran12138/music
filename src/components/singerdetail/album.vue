<template>
  <div class="album">
    <div class="songlist">
      <div :key="index" v-for="(item,index) in albumlist" class="content-top">
        <span class="content-index">{{index+1}}</span>
        <img :src="item.picUrl" alt />
        <div class="namecontent">
          <div class="nametop">{{item.name}}</div>
          <div class="namebottom">{{item.alias[0]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "album",
  data() {
    return {
      albumlist: []
    };
  },
  created() {
    let id = this.$route.query.id;
    axios({
      type: "get",
      url: `http://47.104.88.123:3000/artist/album?id=${id}`
    }).then(res => {
      this.albumlist = res.data.hotAlbums;
    });
  }
};
</script>
<style lang="scss" scoped>
.album {
  margin-top: 0.2rem;
}
.content-top {
  height: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 0.1rem;
  color: rgb(53, 52, 52);
  img {
    width: 0.5rem;
    height: 0.5rem;
    margin-left: 0.1rem;
  }
  .namecontent {
    flex: 1;
    box-sizing: border-box;
    height: 0.6rem;
    margin-left: 0.1rem;
    font-size: 0.17rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .namebottom {
      font-size: 0.1rem;
      color: #cecece;
    }
  }
}
.songlist div:nth-of-type(-n + 3) span {
  color: rgb(240, 112, 112);
}
</style>
