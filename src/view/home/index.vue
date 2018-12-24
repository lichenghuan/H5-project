<template>
  <div class='indexBox' v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="0">
 

    <div class="topBox">
      <div class='userImg' @click="goLogin">
        <img :src="userImg" alt="">
      </div>
      <div class='userAccount'>
        <span>{{userName}}</span>
      </div>

      <span class='myTeam' v-if="TOKEN" @click="$router.push({name:'myTeam'})">我的朋友</span>

    </div>

    <div class="shareBox" @click="btnFunc">
      <!-- 直接弹海报 -->
      <img src="../../assets/indexImg/symbols-icon_share.png" alt="">
      <p>马上分享</p>
    </div>

    <div class='assetsBox' v-if="!TOKEN">
      <div class="assetsTop">
        <div class="assetTopTitle">钱包</div>
        <div class="topMoney">
          <span>{{10241024 | money }}</span>
        </div>
      </div>
    </div>
 
 

    <div class="fourBox">
      <div class='fourMinBox'>
        <div><img src="../../assets/indexImg/icon_transaction.png" alt=""></div>
        <div>模块1</div>
      </div>
      <div class='fourMinBox'>
        <div><img src="../../assets/indexImg/icon_No.png" alt=""></div>
        <div>模块2</div>
      </div>
      <div class='fourMinBox'>
        <div><img src="../../assets/indexImg/icon_price.png" alt=""></div>
        <div>模块3</div>
      </div>
      <div class='fourMinBox'>
        <div><img src="../../assets/indexImg/icon_rule.png" alt=""></div>
        <div>模块4</div>
      </div>
    </div>


    <sticky :check-sticky-support="false" :offset="0">
      <tab :line-width=2 active-color='#C39400' :custom-bar-width="'60px'" v-model="stickyIndex" :animate="false">
        <tab-item :selected="demo4 === item" v-for="(item, index) in list4" :key="index" @on-item-click="tabChange">{{item}}</tab-item>
      </tab>
    </sticky>

    <div class='bottomBox1' v-show="stickyIndex==0" v-if="AIListData.length!=0">
      <div class='bottomRow1' v-for="(item,i) in AIListData" :key="i">
        <flexbox>
          <flexbox-item :span="3">
            <div class="flexD flexD1">{{item.exchTimeText}}</div>
          </flexbox-item>
          <flexbox-item :span="6">
            <div class="flexD flexD2">{{item.text}}</div>
          </flexbox-item>
          <flexbox-item>
            <div class="flexD flexD3" :style="{color:item.exchType==1?'#709efc':'#ed8678'}">{{item.exchTypeText}}</div>
          </flexbox-item>
        </flexbox>
      </div>
    </div>

    <div class="bottomBox2" v-show="stickyIndex==1" v-if="userAiListData.length!=0">
      <div style="height:5px;background:#fff"></div>

      <div class="bottomRow2" v-for="(item,i) in userAiListData" :key="i">
        <flexbox :gutter="0">
          <flexbox-item :span='2'>
            <div class="flexD flexD1">
              <img :src="item.headImg" alt="">
            </div>
          </flexbox-item>
          <flexbox-item :span="7">
            <div class="flexD flexD2">
              <p>{{item.phone}}</p>
              <p>{{item.createTime}}</p>
              <p>{{item.content}}</p>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="flexD flexD3">
              {{item.ranking}}
            </div>
          </flexbox-item>
        </flexbox>
      </div>
    </div>

  </div>

</template>

<script>
// import VueWebSock from "../../common/socket.js";
import { querystring, base64 } from 'vux'
import util from "../../common/util";


export default {
  name: "index",
  data() {
    return {
      isLogin: false,
      userImg: require("../../assets/indexImg/symbols-icon-user.png"),
      userName: "请登录",
      list4: ["AI动态", "高手动态"],
      demo4: "AI动态",
      stickyIndex: 0,
      list2: [1, 2],
      onFetching: false,
      bottomCount: 20,
      show2: false,
      menus2: {},
      contractData: [],
      AIListData: [],
      userAiListData: [],
      pageIndex: 0,
      busy: false,
    };
  },
  computed: {
    TOKEN() {
      if (this.$store.getters.token.length != 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    goLogin() {
      if (!this.TOKEN) {
        this.$router.push({ name: "login" });
      }
    },
    colorFilter(item) {
      if (item > 0) {
        return "#fe1717";
      } else if (item < 0) {
        return "#2dcc71";
      }
      return "#828f90";
    },
    tabChange(index) {
      this.$store.commit("FULL_NOMORE", false);
      this.$store.commit("FULL_LOADMORE", false);
      this.AIListData = [];
      this.userAiListData = [];
      this.busy = false;
      this.pageIndex = 1;

      switch (index) {
        case 0:
          this.getAiPageList(this.pageIndex);
          break;
        case 1:
          this.getUserAiPageList(this.pageIndex);
          break;

        default:
          break;
      }
    },
    btnFunc() {
      //登录后才能分享
      if (this.TOKEN) {
        //this.shareWX()
        this.$store.commit('QRCODE_ALERTFLAG', true);
      } else {
        this.$router.push({ name: 'login' });
      }
    },
    loadMore() {
      this.pageIndex++;

      switch (this.stickyIndex) {
        case 0:
          this.getAiPageList(this.pageIndex);
          break;
        case 1:
          if (this.pageIndex <= 4) {   //需求是最多显示80条记录
            this.getUserAiPageList(this.pageIndex);
          } else {
            this.$store.commit("FULL_NOMORE", true);
            this.$store.commit("FULL_LOADMORE", false);
          }
          break;

        default:
          break;
      }
    },
    change(path) {
      this.$router.push({
        path: path
      });
    },
    shareWX() {
      let url = location.href.split('#')[0] //获取锚点之前的链接
      var param = {
        url: url
      }
  
    },
    //获取AI动态
    getAiPageList(pageIndex) {
      if (this.pageIndex != 1) {
        this.$store.commit("FULL_LOADMORE", true);
      }

    },
    //获取高手动态
    getUserAiPageList(pageIndex) {
      if (this.pageIndex != 1) {
        this.$store.commit("FULL_LOADMORE", true);
      }
 
    },
    //判断用户是否登录
    userIsLogin() {
      if (this.TOKEN) {
        //登陆后
        this.isLogin = true;
        this.userImg = this.$store.getters.userData.avter;
        this.userName = this.$store.getters.userData.phone;
        this.shareWX()
      } else {
        // 未登录
        this.isLogin = false;
      }
    },
    //根据app传入的token获取用户信息
    tokenGetUserInfo() {
 
    },
    isInApp() {
      var userAgent = navigator.userAgent.toLowerCase();//获取UA信息
 
      if (userAgent.indexOf("ezhouxing") != -1) {//判断ua中是否含有和app端约定好的标识ezhouxing
        this.$store.commit('IS_IN_APP', true);
      } else {
        this.$store.commit('IS_IN_APP', false);
      }
    },
    getSearchToken() {
      //将获取到的base64解码
      var T = (querystring.parse(location.search));

      if (JSON.stringify(T) != '{}') {
        if (T.p && T.p.length !== 0 && T.p !== '') {
          this.$store.commit('IS_IN_APP', true);
        } else {
          this.$store.commit('IS_IN_APP', false);
        }
        if (T.token && T.token.length !== 0 && T.token !== '') {
          this.$store.commit("ACCESS_TOKEN", base64.decode(T.token));
          this.tokenGetUserInfo();
        } else {
          this.userIsLogin();
        }
      } else {
        this.userIsLogin();
      }
    },

  },
  created() {
    this.getSearchToken();
  }
};
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>


