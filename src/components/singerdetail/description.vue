<template>
  <div class="description">
    <p class="descs">{{descs.briefDesc}}</p>
    <div :key="index" v-for="(item,index) in desclist" class="lists">
      <h6 class="ti">{{item.ti}}</h6>
      <p class="txt">{{item.txt}}</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "description",
  data() {
    return {
      desclist: [],
      descs: []
    };
  },
  created() {
    let id = this.$route.query.id;
    axios({
      type: "get",
      url: `http://47.104.88.123:3000/artist/desc?id=${id}`
    }).then(res => {
      this.desclist = res.data.introduction;
      this.descs = res.data;
    });
  }
};
</script>
<style lang="scss" scoped>
.description {
  padding: 0.1rem 0.2rem 50px;
}
.descs {
  font-size: 0.12rem;
  line-height: 0.2rem;
  text-indent: 2em;
  color: #333;
}

h6 {
  font-weight: normal;
}
.lists {
  font-size: 0.3rem;
  margin: 0.1rem 0;

  .ti {
    font-size: 0.15rem;
    color: #000;
  }

  .txt {
    font-size: 0.1rem;
    color: #888;
    text-indent: 2em;
    margin-top: 0.1rem;
  }
}
</style>
