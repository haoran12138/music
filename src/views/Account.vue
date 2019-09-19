<template>
  <div class="home">
    <div class="nav">
      <van-icon class="con" name="coupon" />
      <span class="title">账户</span>
      <van-icon class="con" name="coupon" />
    </div>账户
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {}
};
</script>
<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  .search {
    width: 250px;
    height: 30px;
    background: #dadada;
    border: none;
    border-radius: 20px;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    -ms-border-radius: 20px;
    -o-border-radius: 20px;
    text-align: center;
    font-size: 12px;
  }

  .con {
    font-size: 24px;
  }
}
</style>
