<template>
  <transition name="slide">
    <div class="player" v-show="isShow">
      <div class="bg">
        <img :src="songs.al.picUrl" />
      </div>
      <div class="main">
        <div class="header">
          <van-icon class="down" name="arrow-down" size="0.25rem" @click="showPlay(false)" />
          <div class="songInfo">
            <div class="song">{{songs.name}}</div>
            <div class="singer">
              <span v-for="(ar,index) in songs.ar" :key="index">{{ ar.name }}</span>
            </div>
          </div>
        </div>
        <div class="changeSound">
          <van-slider active-color="#fff" inactive-color="#fff6" v-model="sound" />
        </div>
        <div class="cover">
          <img :src="songs.al.picUrl" alt />
        </div>
        <div class="lyrics">
          <div>{{lyric}}</div>
          <div v-show="isTlrc && isTlrcShow">{{tlyric}}</div>
          <button v-show="isTlrc" :class="{show:isTlrcShow}" @click="changShowTlrc">译</button>
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
            <!-- 播放控制器 -->
            <div class="changeMode" @click="changeMode">
              <span :class="modeClassName"></span>
            </div>
            <van-icon @click="previousPlay" name="arrow-left" />
            <button id="playPause">
              <van-icon :name="iconName" />
            </button>
            <van-icon @click="nextPlay" name="arrow" />
            <div @click="showPlayList = true">
              <span class="iconfont icon-bofangliebiao"></span>
            </div>
          </div>
        </div>
      </div>

      <van-popup
        round
        position="bottom"
        :style="{ height: '60vh',width:'100%',background:'rgba(255, 255,255, 0.86)' }"
        v-model="showPlayList"
        :lazy-render="false"
        @opened="opened"
      >
        <div class="popup">
          <div class="playList">
            <ul>
              <li @click="changeIndex(index)" v-for="(item,index) in playList" :key="index">
                <div class="name">{{ item.name }}</div>
                <span class="divide">-</span>
                <div class="singer">
                  <span v-for="(singer,index) in item.singer" :key="index">{{ singer.name }}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="close" @click="showPlayList = false">关&nbsp;闭</div>
        </div>
      </van-popup>
    </div>
  </transition>
</template>
<script>
import Lyric from "lrc-file-parser";
import { mapMutations, mapState, mapGetters } from "vuex";
import axios from "axios";
import "../../common/font/iconfont.css";
export default {
  name: "player",
  data() {
    return {
      // 我自己喜欢的默认歌曲
      url: "",
      songs: {
        al: {
          picUrl: ""
        }
      },
      sound: 100,
      iconName: "play-circle-o",
      showPlayList: false,
      modeClassName: "iconfont icon--lbxh",
      lrc: {},
      tlrc: {},
      lyric: "",
      tlyric: "",
      // 是否有翻译歌词
      isTlrc: false,
      // 是否显示歌词
      isTlrcShow: false
    };
  },
  computed: {
    ...mapState(["isShow", "playList", "playMode", "playIndex", "isPlay"]),
    ...mapGetters(["playId"]),
    playModeUrl() {
      return `./${this.playMode}.png`;
    }
  },
  methods: {
    ...mapMutations([
      "showPlay",
      "previousPlay",
      "nextPlay",
      "changePlayMode",
      "changeIndex"
    ]),
    changeMode() {
      const ModeClass = [
        "icon--lbxh",
        "icon-danquxunhuan",
        "icon-suijixunhuan"
      ];
      this.changePlayMode();
      this.modeClassName = "iconfont " + ModeClass[this.playMode - 1];
    },
    // 列表显示播放到第几个
    now() {
      const _this = this;
      $(".playList li")
        .eq(this.playIndex)
        .addClass("now")
        .siblings()
        .removeClass("now");
    },
    opened() {
      var nowTop = $(".playList li")
        .eq(this.playIndex)
        .position().top;
      $(".playList").animate({ scrollTop: nowTop + "px" }, 300);
    },
    newLrc() {
      this.tlrc = new Lyric({});
      this.lrc = new Lyric({
        onPlay: (line, text) => {
          this.lyric = text;
          if(this.isTlrc){
            this.tlyric = this.tlrc.lines[line].text;
          }
        },
        offset: -1000
      });
    },
    playLrc(time) {
      this.lrc.play(time);
    },
    pauseLrc() {
      this.lrc.pause();
    },
    setLrc(data) {
      this.lrc.setLyric(data.lrc.lyric);
      if (data.tlyric.lyric) {
        this.isTlrc = true;
        this.tlrc.setLyric(data.tlyric.lyric);
      } else {
        this.isTlrc = false;
      }
    },
    changShowTlrc() {
      this.isTlrcShow = !this.isTlrcShow;
    }
  },
  created() {
    this.newLrc();
    var _this = this;
    $(function() {
      var audio = document.getElementsByTagName("audio")[0];
      //播放暂停控制
      $("#playPause").click(function() {
        //监听音频播放时间并更新进度条
        audio.addEventListener("timeupdate", updateProgress, false);
        //监听播放完成事件
        audio.addEventListener("ended", audioEnded, false);

        //改变暂停/播放icon
        if (audio.paused) {
          audio.play();
          _this.playLrc(audio.currentTime * 1000);
          _this.iconName = "pause-circle-o";
        } else {
          audio.pause();
          _this.pauseLrc();
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
        _this.playLrc(audio.currentTime * 1000);
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
      if (_this.playMode === 2) {
        // 单曲循环
        audio.play();
        _this.playLrc(0);
      } else {
        audio.currentTime = 0;
        audio.pause();
        _this.iconName = "play-circle-o";
        _this.nextPlay();
      }
    }
  },
  watch: {
    // 监听id 是否改变 切换歌曲
    playId: function() {
      const _this = this;
      _this.showPlayList = false;
      // 重置
      _this.songs.al.picUrl = "";
      var audio = document.getElementsByTagName("audio")[0];
      audio.currentTime = 0;
      audio.pause();
      _this.iconName = "play-circle-o";
      $(".play-pause>span")
        .removeClass("icon-pause")
        .addClass("icon-play");

      // 获得歌曲url
      axios({
        type: "get",
        url: `http://134.175.69.66:3000/song/url?id=${this.playId}`
      }).then(res => {
        _this.url = res.data.data[0].url;
        setTimeout(() => {
          $("#playPause").click();
          _this.now();
        }, 1000);
      });
      // 获得歌曲信息
      axios({
        type: "get",
        url: `http://134.175.69.66:3000/song/detail?ids=${this.playId}`
      }).then(res => {
        _this.songs = res.data.songs[0];
      });
      // 获取歌词
      axios({
        type: "get",
        url: `http://134.175.69.66:3000/lyric?id=${this.playId}`
      }).then(res => {
        _this.setLrc(res.data);
      });
    },
    // 解决在播放页也可以滚动body 问题
    isShow: function() {
      if (this.isShow) {
        document.querySelector("body").style.overflowY = "hidden";
      } else {
        document.querySelector("body").style.overflowY = "scroll";
      }
    },
    // 监听音量改变
    sound: function() {
      $("#audioTag").get(0).volume = this.sound / 100;
    },
    // 播放模式改变
    isPlay() {
      if (this.url === "") {
        return;
      }
      var audio = document.getElementsByTagName("audio")[0];
      if (this.isPlay) {
        audio.play();
        this.iconName = "pause-circle-o";
      } else {
        audio.pause();
        this.iconName = "play-circle-o";
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
  background: #ffffff;
  color: #fff;
  font-weight: 300;
  .bg {
    position: fixed;
    z-index: 191;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    filter: blur(14px);
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
    background: rgba(153, 153, 153, 0.3);
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
          font-size: 0.18rem;
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
          color: rgba(255, 255, 255, 0.8);
          span:after {
            content: "/";
          }
          span:last-child:after {
            content: "";
          }
        }
      }
    }
    .changeSound {
      padding: 0 0.2rem;
      margin: 0.3rem 0;
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
    .lyrics {
      position: relative;
      display: flex;
      height: 20vh;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      div{
        margin: 1vh 0 ;
      }
      button {
        position: absolute;
        bottom: 0;
        right: 5vw;
        width: 8vw;
        height: 8vw;
        border: 1px solid #fff0;
        background: #fff0;
        color: #ffffff70;
        &.show {
          color: #ffffff;
        }
      }
    }
    .Audio {
      position: absolute;
      bottom: 0;
      width: 100%;
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
      margin: 0.3rem 0;
      display: flex;
      justify-content: space-around;
      align-items: center;

      & > i {
        font-size: 0.35rem;
      }
      div {
        text-align: center;
        width: 0.25rem;
        height: 0.25rem;
        .iconfont {
          font-size: 0.25rem;
        }
      }
      #playPause {
        border: 0;
        outline: 0;
        padding: 0;
        width: 0.5rem;
        height: 0.5rem;
        font-size: 0.5rem;
        background: none;
      }
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
.popup {
  color: #000;
  .playList {
    height: 50vh;
    overflow-y: auto;
    ul {
      position: relative;
      li {
        display: flex;
        padding: 0 0.1rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 0.5rem;
        line-height: 0.5rem;
        border-bottom: 1px solid #ccc;
        &:last-child {
          border-bottom: 0px;
        }
        &.now {
          color: #ff00d1;
        }
        .name {
          font-weight: 500;
          font-size: 0.16rem;
          width: 60%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .divide {
          margin: 0 0.1rem;
        }
        .singer {
          font-weight: 100;
          font-size: 0.1rem;
          width: 30%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          span {
            &::after {
              content: "/";
            }
            &:last-child:after {
              content: "";
            }
          }
        }
      }
    }
  }
  .close {
    height: 10vh;
    font-weight: 500;
    font-size: 0.16rem;
    text-align: center;
    line-height: 8vh;
  }
}
</style>
