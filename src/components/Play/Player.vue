<template>
  <transition name="slide">
    <div class="player" v-show="isShow">
      <div class="bg">
        <img :src="songs.al.picUrl" />
      </div>
      <div class="main">
        <div class="header">
          <van-icon class="down" name="arrow-down" size="0.2rem" @click="showPlay(false)" />
          <div class="songInfo">
            <div class="song">{{songs.al.name}}</div>
            <div class="singer">
              <span v-for="(ar,index) in songs.ar" :key="index">{{ ar.name }}</span>
            </div>
          </div>
        </div>
        <div class="cover">
          <img :src="songs.al.picUrl" alt />
        </div>
        <div class="Audio">
          <audio id="audioTag" :src="url"></audio>
          <div class="schedule">
            <span class="played-time">00:00</span>
            <div class="pgs">
              <div class="pgs-play" id="progress"></div>
            </div>
            <span class="audio-time" id="audioTime">00:00</span>
          </div>
          <div class="controls">
            <van-icon @click="previousPlay" name="arrow-left" />
            <button id="playPause">
              <van-icon :name="iconName" />
            </button>
            <van-icon @click="nextPlay" name="arrow" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import axios from "axios";
export default {
  name: "player",
  data() {
    return {
      url: "",
      songs: {
        al: {
          picUrl: ""
        }
      },
      iconName: "play-circle-o"
    };
  },
  computed: {
    ...mapState(["isShow", "playList", "playIndex", "playId"])
  },
  methods: {
    ...mapMutations(["showPlay", "previousPlay", "nextPlay"]),
    scheduleChange(e) {
      console.log(e.detail);
    }
  },
  created() {
    var _this = this;
    $(function() {
      var audio = $("#audioTag").get(0);
      //播放暂停控制
      $("#playPause").click(function() {
        //监听音频播放时间并更新进度条
        audio.addEventListener("timeupdate", updateProgress, false);
        //监听播放完成事件
        audio.addEventListener("ended", audioEnded, false);

        //改变暂停/播放icon
        if (audio.paused) {
          audio.play();
          _this.iconName = "pause-circle-o";
        } else {
          audio.pause();
          _this.iconName = "play-circle-o";
        }
      });

      //读取视频长度,设置页面时长显示-loadedmetadata:指定视频/音频（audio/video）的元数据加载后触发
      //audio.duration 获取音频的时长，单位为秒
      $("#audioTag").on("loadedmetadata", function() {
        //alert(audio.duration)
        $("#audioTime").text(transTime(this.duration));
      });

      var pgsWidth = $(".pgs").width(); //0.907是 进度条这个div和整个进度条图片宽度的比例
      //点击进度条跳到指定点播放
      $(".pgs").click(function(e) {
        var rate = e.offsetX / pgsWidth;
        audio.currentTime = audio.duration * rate;
        updateProgress();
      });
    });
    //转换音频时长显示
    function transTime(time) {
      var duration = parseInt(time);
      var minute = parseInt(duration / 60);
      var sec = (duration % 60) + "";
      var isM0 = ":";
      if (minute == 0) {
        minute = "00";
      } else if (minute < 10) {
        minute = "0" + minute;
      }
      if (sec.length == 1) {
        sec = "0" + sec;
      }
      return minute + isM0 + sec;
    }

    //更新进度条
    function updateProgress() {
      var audio = document.getElementsByTagName("audio")[0];
      var value = Math.round(
        (Math.floor(audio.currentTime) / Math.floor(audio.duration)) * 100
      );
      $(".pgs-play").css("width", value + "%");
      $(".played-time").html(transTime(audio.currentTime));
    }
    //播放完成
    function audioEnded() {
      var audio = document.getElementsByTagName("audio")[0];
      audio.currentTime = 0;
      audio.pause();
      _this.iconName = "play-circle-o";
      _this.nextPlay();
    }
  },
  watch: {
    // 监听id 是否改变 切换歌曲
    playId: function() {
      const _this = this;
      // 重置
      this.songs.al.picUrl = "";
      var audio = document.getElementsByTagName("audio")[0];
      audio.currentTime = 0;
      audio.pause();
      _this.iconName = "play-circle-o";

      $(".play-pause>span")
        .removeClass("icon-pause")
        .addClass("icon-play");
      axios({
        type: "get",
        url: `http://47.104.88.123:3000/song/url?id=${this.playId}`
      }).then(res => {
        _this.url = res.data.data[0].url;
        setTimeout(() => {
          $("#playPause").click();
        }, 2000);
      });
      axios({
        type: "get",
        url: `http://47.104.88.123:3000/song/detail?ids=${this.playId}`
      }).then(res => {
        _this.songs = res.data.songs[0];
      });
    },
    isShow: function() {
      // 解决在播放页也可以滚动body 问题
      if (this.isShow) {
        document.querySelector("body").style.overflowY = "hidden";
      } else {
        document.querySelector("body").style.overflowY = "scroll";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(100vh);
}

.player {
  position: fixed;
  z-index: 190;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #fff;
  color: #fff;
  font-weight: 300;
  .bg {
    position: fixed;
    z-index: 191;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    filter: blur(10px);
    img {
      width: 100vh;
    }
  }
  // 在模糊背景的上面
  .main {
    position: fixed;
    z-index: 192;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(153, 153, 153, 0.6);
    .header {
      .down {
        float: left;
        width: 0.5rem;
        height: 0.4rem;
        text-align: center;
        line-height: 0.4rem;
      }
      .songInfo {
        height: 0.4rem;
        padding: 0 0.5rem;
        text-align: center;
        .song {
          font-weight: 400;
          line-height: 0.25rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .singer {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 0.1rem;
          span:after {
            content: "/";
          }
          span:last-child:after {
            content: "";
          }
        }
      }
    }
    .cover {
      margin: 0 auto;
      margin-top: 10vh;
      width: 2.5rem;
      height: 2.5rem;
      img {
        height: 100%;
      }
    }
    .Audio {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 25vh;
    }
    .pgs {
      width: 70vw;
      margin: 0.1rem auto;
      background-color: #ffffff40;
      text-align: center;
      position: relative;
      overflow: hidden;
      height: 0.08rem;
      border-radius: 30px;
    }
    .pgs-play {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      background-color: #fff;
      z-index: 1;
    }
    .audio-name {
      position: absolute;
      top: 0;
      width: 100%;
      left: 0;
      text-align: center;
      color: #666;
      font-size: 12px;
    }
    .controls {
      width: 100%;
      padding: 0;
      margin-top: 0.2rem;
      display: flex;
      justify-content: center;
      align-items: center;

      & > i {
        font-size: 0.35rem;
      }
    }
    #playPause {
      border: 0;
      outline: 0;
      padding: 0;
      width: 0.5rem;
      height: 0.5rem;
      margin: 0 0.4rem;
      font-size: 0.5rem;
      background: none;
    }

    .played-time,
    .audio-time {
      color: #fff;
      font-size: 12px;
      display: inline-block;
      float: left;
      width: 34px;
    }
    .audio-time {
      float: right;
      display: inline-block;
      vertical-align: middle;
    }
    .schedule {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.1rem;
    }
  }
}
</style>
