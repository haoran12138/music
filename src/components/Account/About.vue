<template>
  <div class="about">
    <van-nav-bar title="关于" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
    <div class="content">
      <h3>软件介绍</h3>
      <br />
      <p>该软件是一款由GLCY团队开发的音乐产品，是郑州研究院的成果 ，依托专业音乐人、DJ、好友推荐及社交功能，在线音乐服务主打歌单、社交、大牌推荐和音乐指纹，以歌单、DJ节目、社交、地理位置为核心要素，主打发现和分享。</p>
      <br />
      <h3>音乐特点</h3>
      <br />
      <p>
        “个性化推荐”、“私人FM”，根据用户习惯自动匹配；
        320K 音质享受；
        国内首个以“歌单”作为核心架构的音乐APP，国内最大、最优质的“歌单”库，批量遇见好听音乐更加简单；轻松创建“歌单”。
      </p>

      <p>
        “乐评”氛围，同一首歌，通过其他人的评论，体会当中故事、体会同样的感受，在评论中找到共鸣。
        用户自上传“主播电台”，音乐故事、脱口秀、情感话题，每个人都能轻松表达自己。
      </p>

      <p>明星、专业音乐人、DJ进驻，专业的私房“歌单”和音乐推荐，格调顿现；专业音乐编辑每周新奇独到的专题评论， 听歌也可更有趣。</p>
      <br />
      <h3>用户须知</h3>

      <br />
      <p>1.用户可以根据自己的喜好创建、收藏、分享歌单，应用以用户创造的歌单为基本线索。</p>

      <p>2.用户可以导入原有手机通讯录、SNS关系，或者借助云音乐自身LBS功能构建音乐社交圈。</p>

      <p>3.用户可以建立自己的主页，可以互相关注，分享音乐，用户的动态在这个圈子里即时呈现。</p>

      <p>4.云音乐包含DJ及音乐人独家自制节目。</p>

      <p>5.应用音乐指纹技术，通过听取音乐旋律，帮助用户找到歌曲。</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "Account"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  padding: 0 0.2rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0.46rem 0 0.5rem 0;
  p {
    text-indent: 2em;
  }
}
</style>
