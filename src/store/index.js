import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 播放器是否显示
    isShow: false,
    // 播放列表  放首默认歌曲
    playList: [],
    // 播放第几个
    playIndex: -1,
    playId: '',
    // 播放模式  1:列表循环  2:单曲循环  3:随机播放
    playMode: 1,
    // 视频播放的时候暂停音乐
    isPlay: true,
  },

  mutations: {
    showPlay(state, payload) {
      state.isShow = payload;
    },
    play(state, payload) {
      state.isShow = true;
      state.isPlay = true;
      state.playIndex = payload.index;
      state.playList = payload.playList;
      state.playId = state.playList[state.playIndex].id;
    },
    // 上一首
    previousPlay(state) {
      if (state.playList.length === 0) return;
      if (state.playIndex === 0) {
        // eslint-disable-next-line no-unused-expressions
        state.playIndex = state.playList.length - 1;
      } else {
        state.playIndex -= 1;
      }
      state.playId = state.playList[state.playIndex].id;
    },
    // 下一首
    nextPlay(state) {
      if (state.playList.length === 0) return;
      const listLength = state.playList.length || 0;
      if (state.playMode === 3) {
        state.playIndex = Math.floor(Math.random() * listLength);
      } else if (state.playIndex === listLength - 1) {
        state.playIndex = 0;
      } else {
        state.playIndex += 1;
      }
      state.playId = state.playList[state.playIndex].id;
    },
    changeIndex(state, payload) {
      state.playIndex = payload;
      state.playId = state.playList[state.playIndex].id;
    },
    changePlayMode(state) {
      state.playMode += 1;
      if (state.playMode === 4) {
        state.playMode = 1;
      }
    },
    isPlay(state, payload) {
      state.isPlay = payload;
    },
  },
  // actions中存储一些异步操作的内容
  actions: {},
  getters: {
	  /*
	  playId:(state)=>{
		  return state.playList[state.playIndex].id;	  
	  }
	  
	  */
  },
  modules: {},
});

export default store;
