<template>
  <div class="album">
    <div class="songlist">
      <div
        :key="index"
        v-for="(item,index) in albumlist"
        class="content-top"
        @click="$router.push({name:'Albumdetail',query:{id:item.id}})"
      >
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
      url: `http://134.175.69.66:3000/artist/album?id=${id}`
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
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 0.1rem;
  margin-top: 0.2rem;
  height: 1rem;
  color: rgb(53, 52, 52);
  img {
    width: 1rem;
    margin-left: 0.1rem;
  }
  .namecontent {
    margin-left: 0.1rem;
    font-size: 0.17rem;
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
