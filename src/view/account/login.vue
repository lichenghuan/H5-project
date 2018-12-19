<template>
  <div class="loginPage">
    <top-header>
      <slot>登录</slot>
    </top-header>

    <div class='loginBox'>
      <img :src="logoImg" alt="">
        </div>

      <div class="inputBox">
        <div>
          <x-input placeholder="请输入手机号" v-model="username"></x-input>
        </div>
        <div>
          <x-input placeholder="请输入登录密码" v-model="pwd" type='password'></x-input>
        </div>
      </div>

      <div class='regBox'>
        <span class='fl' @click='$router.push({path:"/forgetPwd"})'>忘记密码</span>
        <span class='fr' @click='$router.push({path:"/register"})'>立即注册</span>
      </div>

      <div class="btnBox">
        <span @click="Login">登录</span>
      </div>

    </div>
</template>

<script>
import { jCookie, jLocalStorage, jSession } from "../../utils/storage";

export default {
  name: "login",
  data() {
    return {
      logoImg: require("../../assets/loginLogo.png"),
      username: "",
      pwd: "",
      userAgree: false
    };
  },
  computed: {},
  methods: {
    getAgreeVal(val) {
      this.userAgree = val;
    },
    redirect() {
      var _route = this.$route.query;

      if (JSON.stringify(_route) !== "{}") {
        //登录后的页面跳转操作
        if (_route.to) {
          //跳转下单页面
          this.$router.push({
            name: _route.to,
            query: _route
          });
        } else if (_route.stickyIndex) {
          //跳转行情自选页面
          this.$router.push({
            name: _route.redirect,
            query: _route
          });
        } else if (_route.selfSelectFlag == 1 || _route.selfSelectFlag == 2) {
          //跳转 行情-加入/移出自选
          this.$router.push({
            name: _route.redirect,
            query: _route
          });
        } else {
          //路由重定向页面
          this.$router.push({ path: _route.redirect });
        }
      } else {
        this.$router.push({ path: "/" });
      }
    },
    Login() {
      if (this.username.trim() == "") {
        this.$vux.toast.text(`请输入账号`, "bottom");
        return;
      } else if (this.pwd.trim() == "") {
        this.$vux.toast.text(`请输入密码`, "bottom");
        return;
      }

      this.$http.post(this.$marketBaseUrl + this.$config.market.api.login, {
        username: this.username.trim(),
        password: this.pwd.trim()
      }).then(res => {
        //this.$vux.toast.text(`${res.message}`, "bottom");
        if (res.code == 200) {
          this.$store.commit("USER_DATA", res.data.accountDto);
          this.$store.commit("ACCESS_TOKEN", res.data.token);
          this.$store.commit("REFRESH_TOKEN", res.data.refreshToken);
          this.$store.commit("EXPIRESIN", res.data.expiration);

          this.redirect();
        }
      });
    }
  },
  mounted() {
    console.log("登录页");
    console.log(this.$route.query);
  }
};
</script>

<style lang="less" >
.loginPage {
  height: 100%;
  background: #fff;
  .loginBox {
    height: 166px;
    text-align: center;
    box-sizing: border-box;
    padding-top: 10px;
    > img {
      height: 115px;
      width: 115px;
    }
  }
  .inputBox {
    font-size: 14px;
    margin-bottom: 15px;
    padding: 0 40px;
    > div:nth-child(1) {
      box-sizing: border-box;
      border-bottom: 1px solid #c3c3c3;
    }
  }
  .regBox {
    box-sizing: border-box;
    padding: 0 40px;
    height: 20px;
    margin-bottom: 20px;
    > span {
      font-size: 14px;
      color: #606060;
      letter-spacing: 0.12px;
    }
  }
  .btnBox {
    height: 44px;
    margin-bottom: 10px;
    text-align: center;
    > span {
      display: inline-block;
      width: 310px;
      line-height: 44px;
      font-size: 18px;
      color: #ffffff;
      letter-spacing: 6px;
      height: 44px;
      background: #dfc55e;
      border-radius: 22px;
    }
  }
}
</style>


