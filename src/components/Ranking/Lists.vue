<template lang="">
  <div class="lists">
      <h4>{{ title }}</h4>
      <div class="content">
        <router-link v-for="item in lists" :key="item.id"  :to="{name:'ListDetails',query:{xid:item.xid}}" class="list">
          <div class="coverImg">
            <img v-lazy="item.coverImgUrl" :src="item.coverImgUrl" :alt="item.description" />
            <span class="updataTime">{{ item.updateFrequency }}</span>
          </div>
          <div class="name"> {{ item.name }} </div>
        </router-link>
      </div>
  </div>
</template>
<script>
export default {
  name: "Lists",
  props: ["title", "lists"]
};
</script>
<style lang="scss" scoped>
.lists {
  overflow: hidden;
  margin-top: 0.4rem;
}
h4 {
  font-weight: 500;
  margin: 0.1rem 0;
}
.content {
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  .list {
    margin-top: 0.08rem;
    float: left;
    .coverImg {
      position: relative;
      img {
        width: 1.1rem;
        height: 1.1rem;
        border-radius: 0.08rem;
      }
      .updataTime {
        position: absolute;
        bottom: 0.04rem;
        left: 0.04rem;
        color: #fff;
        font-size: 0.1rem;
      }
    }
    .name {
      width: 1rem;
      height: 0.3rem;
      font-size: 0.1rem;
      text-align: center;
    }
  }
}
</style>
