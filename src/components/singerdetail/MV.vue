<template>
  <div class="mv">
    <div class="songlist">
      <div
        :key="index"
        v-for="(item,index) in mvlist"
        class="content-top"
        @click="$router.push({name:'mvplayer',query:{id:item.id}  })"
      >
        <div class="cover">
          <img :src="item.imgurl" alt />
        </div>
        <div class="namecontent">
          <div class="nametop">{{item.name}}</div>
          <div class="namebottom">{{item.publishTime}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "mv",
  data() {
    return {
      mvlist: []
    };
  },
  created() {
    let id = this.$route.query.id;
    axios({
      type: "get",
      url: `http://47.104.88.123:3000/artist/mv?id=${id}`
    }).then(res => {
      this.mvlist = res.data.mvs;
    });
  }
};
</script>
<style lang="scss" scoped>
.mv {
  margin-top: 0.2rem;
}

.content-top {
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 0.1rem;
  color: rgb(53, 52, 52);
  .cover {
    height: 0.8rem;
    width: 1.2rem;
    img {
      height: 0.8rem;
      margin-left: 0.1rem;
    }
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
</style>

