import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 播放器是否显示
    isShow: false,
    // 播放列表
    playList: [],
    // 播放第几个
    playIndex: 0,
    playId: '',
  },

  mutations: {
    showPlay(state, payload) {
      state.isShow = payload;
    },
    play(state, payload) {
      state.isShow = true;
      state.playIndex = payload.index;
      state.playList = payload.playList;
      state.playId = state.playList[state.playIndex].id;
    },
    // 上一首
    previousPlay(state) {
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
      if (state.playIndex === state.playList.length - 1) {
        // eslint-disable-next-line no-unused-expressions
        state.playIndex = 0;
      } else {
        state.playIndex += 1;
      }
      state.playId = state.playList[state.playIndex].id;
    },
  },
  // actions中存储一些异步操作的内容
  actions: {},
  getters: {},
  modules: {},
});

export default store;
