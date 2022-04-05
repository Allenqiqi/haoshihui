<template>
  <div class="login">
      <van-tabs>
        <!-- 账号密码登录 -->
          <van-tab title="账号密码登录">
              <van-form class="fm">
                  <van-cell-group inset>
                    <van-field
                      class="phone-input"
                      v-model="userPhone"
                      name="phone"
                      label="手机号"
                      placeholder="请输入手机号"
                      :rules="[{ required: true, message: '请填写用户名' }]"
                    />
                    <van-field
                    class="pass-input"
                      v-model="userPass"
                      type="password"
                      name="密码"
                      label="密码"
                      placeholder="请输入密码"
                      :rules="[{ required: true, message: '请填写密码' }]"
                    />
                  </van-cell-group>
                  <div style="margin: 16px;" >
                    <van-button round block type="primary"
                      native-type="submit" class="sub"
                      @click="handleUserLogin"
                      >
                      登录
                    </van-button>
                  </div>
                  <!-- 忘记密码 -->
                  <div class="register">
                     <p @click="goToRegister">点击注册</p>
                     <p>忘记密码</p>
                  </div>
              </van-form>
          </van-tab>
          <!-- 快捷登录 -->
          <van-tab title="快捷登录">
              <van-form class="fm">
                  <van-cell-group inset>
                    <van-field
                       v-model="userPhone"
                      class="phone-input"
                      name="phone"
                      label="手机号"
                      placeholder="请输入手机号"
                    />
                    <van-field
                      v-model="code"
                     class="pass-input v-input"
                      name="code"
                      label="验证码"
                      placeholder="请输入验证码"
                    >
                    </van-field>
                    <!-- 获取验证码 -->
                    <button class="v-code" @click="handleGetCode">
                      获取验证码
                      <span v-if="times>0">({{times}})</span>
                    </button>
                  </van-cell-group>
                  <div style="margin: 16px;" >
                    <van-button round block type="primary"
                      native-type="submit" class="sub"
                      @click="handleCodeLogin"
                      >
                      登录
                    </van-button>
                  </div>
                  <div class="register"></div>
              </van-form>
          </van-tab>
      </van-tabs>
      <!-- 其他登录 -->
      <div class="log-icon">
          <van-divider>其他登录</van-divider>
           <div class="log-options">
             <i class="iconfont icon1">&#xe607;</i>
             <i class="iconfont icon2">&#xe73e;</i>
             <i class="iconfont icon3">&#xe73c;</i>
           </div>
      </div>
  </div>
</template>

<script>
import { getCode } from '@/api/register' // 点击获取验证码
export default {
  name: 'Login',
  data () {
    return {
      userPhone: '', // 手机号
      userPass: '', // 密码
      code: '', // 验证码
      times: 0
    }
  },
  methods: {
    /**
     * 前往注册
     */
    goToRegister () {
      this.$router.push('/register')
    },
    /**
     *  账号密码登录
     */
    handleUserLogin () {
      // 手机号
      const phone = this.userPhone.trim()
      // 密码
      const pass = this.userPass.trim()
      // 判断是否输入手机号
      if (phone) {
        // 判断是否输入密码
        if (pass) {
          // 判断输入的账号密码是否与数据中匹配
          if (phone === this.$store.state.user.userInfo && pass === this.$store.state.user.userPass) {
            this.$router.push('/mine')
          } else {
            this.$toast({
              type: 'fail',
              message: '账号或密码错误'
            })
          }
        } else {
          this.$toast({
            type: 'fail',
            message: '请输入密码'
          })
        }
      } else {
        this.$toast({
          type: 'fail',
          message: '请输入出手机号'
        })
      }
    },
    /**
     * 快捷登录
     */
    //   点击获取验证码
    async handleGetCode () {
      // 手机号正则
      const reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
      // 获取验证码
      if (reg.test(this.userPhone.trim())) {
        // 记录倒计时时间
        this.times = 60
        document.querySelector('.v-code').disabled = true
        this.timer = setInterval(() => {
          this.times--
          if (this.times <= 0) {
            clearInterval(this.timer)
            this.code = ''
            document.querySelector('.v-code').disabled = false
          }
        }, 1000)
        // 获取验证码
        const result = await getCode(this.phone)
        this.$toast({
          message: '验证码：' + result.code,
          type: 'success'
        })
        this.code = result.code
      } else {
        this.$toast({
          type: 'fail',
          message: '请输入正确的手机号'
        })
      }
    },
    // 点击登录
    handleCodeLogin () {
      // 手机号正则
      const reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
      // 判断是否输入手机号
      if (this.userPhone.trim()) {
        // 判断手机号格式是否正确
        if (reg.test(this.userPhone)) {
          if (this.userPhone.trim() === this.$store.state.user.userInfo) {
            if (this.code) {
              this.$router.push('/mine')
            } else {
              this.$toast({
                type: 'fail',
                message: '请输入验证码'
              })
            }
          } else {
            this.$toast({
              type: 'fail',
              message: '该账号未注册'
            })
          }
        } else {
          this.$toast({
            type: 'fail',
            message: '请输入正确的手机号'
          })
        }
      } else {
        this.$toast({
          type: 'fail',
          message: '请输入手机号'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
     .login{
       height: 600px;
       display: flex;
       flex-direction: column;
       justify-content: space-around;
      .fm{
          width: 100%;
          height: 260px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          margin-bottom: 30px;
          position: relative;
          .phone-input{
            margin-bottom: 20px;
          }
          .sub{
            background-color: rgb(42, 78, 240);
            border-color: rgb(42, 78, 240);
          }
           .v-code{
              width: 105px;
              height: 40px;
              font-size: 14px;
              outline: none;
              border: none;
              border-radius: 5px;
              background-color: rgb(233, 233, 233);
              text-align: center;
              line-height: 40px;
              position: absolute;
              top: 65px;
              right: 0;
            }
          .register{
            display: flex;
            justify-content: space-around;
            color: rgb(42, 78, 240);
            font-size: 13px;
          }
      }
      .log-options{
        display: flex;
        justify-content: space-around;
        i{
          font-size: 35px;
        }
        .icon1{
          color: rgb(14, 182, 56);
          margin-left: 30px;
        }
        .icon2{
          color:rgb(30, 125, 235) ;
        }
        .icon3{
          color: rgb(179, 57, 63);
          margin-right: 30px;
        }
      }
   }

</style>
