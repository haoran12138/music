<template>
  <div class="searchList">
    <div class="nav">
      <van-icon class="con" name="arrow-left" @click="$router.back(-1)" />
      <input v-model="value" class="search" type="text" placeholder="搜索音乐、歌词、电台" />
      <!-- 为了让适用弹性盒加的-->
      <span></span>
    </div>
    <div v-show="!value" class="default">
      <div class="sort" @click="$router.push({name:'Singersort'})">歌手分类 ></div>
      <div class="songs">
        <ul class="song">
          <li
            class="clear"
            @click="$router.push({ name: 'SearchRes', query:{keyword:item.searchWord}})"
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="ranking">{{ index+1 }}</div>
            <div class="detail">
              <div class="info">
                <div class="searchWord">
                  {{ item.searchWord }}
                  <span class="score">{{ item.score }}</span>
                  <span class="iconType" v-if="item.iconType">HOT</span>
                </div>
                <div class="content">{{item.content}}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-show="value" class="suggest">
      <div
        @click="$router.push({ name: 'SearchRes', query:{keyword:value}})"
      >搜索 &nbsp; &nbsp;"{{ value }}"</div>
      <ul>
        <li
          v-for="(item,index) in suggest"
          :key="index"
          @click="$router.push({ name: 'SearchRes', query:{keyword:item.keyword}})"
        >
          <van-icon name="search" />
          &nbsp; &nbsp; &nbsp;{{ item.keyword }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from "axios";
export default {
  name: "search",
  data() {
    return {
      suggest: [],
      list: {},
      value: ""
    };
  },
  created() {
    axios({
      type: "get",
      url: `http://47.104.88.123:3000/search/hot/detail`
    }).then(res => {
      this.list = res.data.data;
    });
  },
  watch: {
    value: function() {
      if (this.value.trim()) {
        axios({
          type: "get",
          url: `http://47.104.88.123:3000/search/suggest?keywords=${this.value}&type=mobile`
        }).then(res => {
          this.suggest = res.data.result.allMatch;
        });
      }
    }
  },
  activated() {
    document.querySelector("input.search").focus();
  },
  deactivated() {
    this.value = "";
  }
};
</script>
<style lang="scss" scoped>
.searchList {
  padding-top: 0.4rem;
}
.sort {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ccc;
  height: 0.5rem;
  font-size: 0.15rem;
}
.songs {
  width: 100%;
  padding-top: 0.1rem;
  overflow: hidden;
  background: #fff;
  .song {
    height: 0.5rem;
    li:first-child {
      .content {
        border: 0;
      }
    }
    li:nth-child(-n + 3) {
      .ranking {
        color: red;
      }
    }
    .ranking {
      float: left;
      height: 0.5rem;
      width: 0.5rem;
      font-size: 0.16rem;
      text-align: center;
      line-height: 0.5rem;
      color: #999;
    }
    .detail {
      float: right;
      width: 3.25rem;
      height: 0.5rem;
      padding-left: 0.1rem;
      .info {
        height: 0.5rem;
        width: 2.5rem;
        float: left;
        .searchWord {
          font-size: 0.16rem;
          line-height: 0.3rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          .score {
            font-size: 0.1rem;
            color: #ccc;
            margin: 0 0.1rem;
          }
          .iconType {
            color: #f01e1e;
            font-size: 0.1rem;
            font-weight: 600;
            font-style: italic;
          }
        }
        .content {
          font-size: 0.12rem;
          color: #8e8e8e;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
.suggest {
  width: 100%;
  margin-top: 0.1rem;
  line-height: 0.3rem;
  padding: 0 0.2rem;
  div {
    color: rgb(0, 197, 197);
    font-size: 0.18rem;
    height: 0.2rem;
    margin-bottom: 0.2rem;
  }
  ul {
    li {
      display: flex;
      align-items: center;
      border-top: 1px solid #ccc;
      height: 0.5rem;
      line-height: 0.5rem;
      &:last-child {
        border-bottom: 1px solid #ccc;
      }
    }
  }
}
</style>
