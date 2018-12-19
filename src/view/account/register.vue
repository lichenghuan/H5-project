<template>
  <div class="registerPage">
    <top-header>
      <slot>注册</slot>
    </top-header>

    <div class='loginBox'>
      <img :src="logoImg" alt="">
    </div>

      <div class="inputBox">
        <div>
          <x-input placeholder="请输入手机号" v-model="register.phone"></x-input>
        </div>
        <div>
          <div class='fr sendCode' @click="sendCode" ref="send" v-if='!sendFlag'>发送</div>
          <div class='fr sendCode' ref="sendc" v-else>60s</div>
          <x-input placeholder="请输入验证码" v-model="register.code"> </x-input>
        </div>
        <div>
          <x-input placeholder="请输入6~12位密码" type='password' v-model="register.pwd"></x-input>
        </div>
        <div>
          <x-input placeholder="请确认密码" type='password' v-model="register.repwd"></x-input>
        </div>
      </div>

      <div class='accountBox'>
        <span @click='$router.push({path:"/login"})'>已有账户登录</span>
      </div>

      <div class="btnBox">
        <span @click="doRegister">注册</span>
      </div>

      <div class='agreeBox'>
        <agree :agree='userAgree' @agreeChange='getAgreeVal'></agree>
      </div>

      <!-- <div class="problem">
        遇见问题
      </div> -->

    </div>
</template>

<script>
import agree from "~/common/agree";
import { querystring } from 'vux'
export default {
  name: "register",
  components: {
    agree
  },
  data() {
    return {
      logoImg: require("../../assets/loginLogo.png"),
      sendFlag: false,
      userAgree: true,
      qid: '',
      register: {
        phone: "",
        code: "",
        pwd: "",
        repwd: "",
      },
      timer:null
    };
  },
  created() {
    var T = querystring.parse(location.search);
    if (JSON.stringify(T) != '{}') {
      if (T.qid.length !== 0) {
        this.qid = T.qid
      }
    }
  },
  methods: {
    getAgreeVal(val) {
      this.userAgree = val;
    },
    Flag() {
      if (this.register.phone.trim() == "") {
        this.info("请输入手机号码");
        return false;
      } else if (this.register.code.trim() == "") {
        this.info("请输入短信验证码");
        return false;
      } else if (this.register.pwd.trim() == "") {
        this.info("请输入密码");
        return false;
      } else if (this.register.pwd.trim() != this.register.repwd.trim()) {
        this.info("两次输入密码不一致");
        return false;
      } else if (this.userAgree == false) {
        this.info("请阅读服务条款");
        return false;
      }
      return true;
    },
    info(msg) {
      this.$vux.toast.text(`${msg}`, "bottom");
    },
    countdown() {
      var second = 60;
      this.sendFlag = true;
      this.timer = setInterval(() => {
        second--;
        this.$refs.sendc.innerHTML = second + "s";
        if (second == 0) {
          clearInterval(this.timer);
          this.$refs.sendc.innerHTML = "发送";
          this.sendFlag = false;
        }
      }, 1000);
    },
    //发送短信
    sendCode() {
      if (this.register.phone.trim() == "") {
        this.info("请输入手机号码");
        return;
      }

      this.countdown();

      this.$http.post(this.$marketBaseUrl + this.$config.market.api.send, {
        phone: this.register.phone.trim(),
        type: 1
      }).then(res => {
        if (res.code != 200) {
          clearInterval(this.timer);
          this.$refs.sendc.innerHTML = "发送";
          this.sendFlag = false;
        }
      });
    },
    doRegister() {
      if (this.Flag()) {
        this.$http.post(this.$marketBaseUrl + this.$config.market.api.regist, {
          agentCode: "",
          qid: this.qid,
          phone: this.register.phone.trim(),
          code: this.register.code.trim(),
          pwd: this.register.pwd.trim(),
          sourceType: 3,
        }).then(res => {
          if (res.data == true) {
            setTimeout(() => {
              this.$router.push({ name: "login" });
            }, 1200);
          }


        });
      }
    }
  },
  created() {
    //扫码后跳到的注册页面，拿到qid
    if (this.$route.query) {
      this.qid = this.$route.query.qid;
    }
  },
};
</script>

<style lang="less" >
.registerPage {
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
    margin-bottom: 20px;
    padding: 0 40px;
    .sendCode {
      font-size: 14px;
      color: #e67e22;
      letter-spacing: 2px;
      height: 42px;
      box-sizing: border-box;
      padding-right: 10px;
      line-height: 42px;
    }
    > div:nth-child(1),
    > div:nth-child(2),
    > div:nth-child(3) {
      box-sizing: border-box;
      border-bottom: 1px solid #c3c3c3;
    }
  }
  .accountBox {
    box-sizing: border-box;
    height: 20px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 14px;
    color: #606060;
    letter-spacing: 0.12px;
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
  .problem {
    position: absolute;
    bottom: 15px;
    width: 100%;
    font-size: 12px;
    color: #e67e22;
    letter-spacing: 0.1px;
    text-align: center;
  }
}
</style>


