<template>
  <div class="singersort">
    <div class="singer-top">
      <div class="singgertop">
        <van-icon name="arrow-left" @click="$router.back(-1)" />
        <span>歌手分类</span>
        <van-icon />
      </div>
    </div>
    <div class="sortcontent">
      <div v-for="(item,index) in arr" :key="index" class="content">
        <router-link :to="{name:'Singerlist',query:{id:item.id,name:item.name}  }">
          <div>
            <span>{{item.name}}</span>
            <van-icon name="arrow" />
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { Script } from "vm";
export default {
  data() {
    return {
      arr: [
        { name: "入驻歌手 ", id: 5001 },
        { name: "华语男歌手", id: 1001 },
        { name: "华语女歌手 ", id: 1002 },
        { name: "华语组合/乐队", id: 1003 },
        { name: "欧美男歌手 ", id: 2001 },
        { name: "欧美女歌手 ", id: 2002 },
        { name: "欧美组合/乐队 ", id: 2003 },
        { name: "日本男歌手 ", id: 6001 },
        { name: "日本女歌手", id: 6002 },
        { name: "日本组合/乐队 ", id: 6003 },
        { name: "韩国男歌手 ", id: 7001 },
        { name: "韩国女歌手", id: 7002 },
        { name: "韩国组合/乐队", id: 7003 },
        { name: "其他男歌手 ", id: 4001 },
        { name: "其他女歌手", id: 4002 },
        { name: "其他组合/乐队", id: 4003 }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.singer-top {
  width: 100%;
  position: fixed;
  top: 0;
  height: 0.5rem;
  z-index: 9;
  .singgertop {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 0.5rem;
    z-index: 999;
    top: 0;
    background-color: #fff;
  }
}
.sortcontent {
  .content {
    color: rgb(184, 176, 176);
    padding: 0 0.4rem;
    margin-top: 0.14rem;
    font-size: 0.16rem;
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
