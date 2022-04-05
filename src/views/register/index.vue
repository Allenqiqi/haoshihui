<template>
  <div class="register">
      <div class="register-info">
          <!-- 表单框 -->
          <van-form class="register-from" @submit="onSubmit">
               <p class="reg-p">账号注册</p>
                <van-field
                    v-model="phone"
                    name="phone"
                    label="手机号"
                    placeholder="手机号"
                />
                <van-field
                    v-model="pass"
                    type="password"
                    name="pass"
                    label="密码"
                    placeholder="请设置密码，8~20位"
                />
                 <van-field
                    v-model="code"
                    name="code"
                    label="验证码"
                    placeholder="验证码"
                />
                 <!-- 获取验证码 -->
                    <button class="v-code" @click="handleGetCode">
                      获取验证码
                      <span v-if="times>0">({{times}})</span>
                    </button>
                <div style="margin: 16px;">
                    <van-button
                        round block type="info"
                        native-type="submit"
                    >
                    注册
                    </van-button>
                </div>
            </van-form>

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
  </div>
</template>

<script>
import { getCode } from '@/api/register'
export default {
  name: 'register',
  data () {
    return {
      phone: '', // 手机号
      pass: '', // 密码
      code: '', // 验证码
      times: 0
    }
  },
  methods: {
    //   点击获取验证码
    async handleGetCode () {
      // 手机号正则
      const reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
      if (reg.test(this.phone.trim())) {
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
    // // 注册后登录
    async onSubmit (values) {
      // 手机号
      const userPhone = values.phone.trim()
      // 密码
      const userPass = values.pass.trim()
      // 手机号正则
      const reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
      // 密码正则
      const Preg = /(?!\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,30}/
      // 判断是否输入手机号
      if (userPhone) {
        // 判断手机号是否正确
        if (reg.test(userPhone)) {
          // 判断是否输入密码
          if (userPass) {
            // 判断密码格式是否正确
            if (Preg.test(userPass)) {
              const result = await this.$store.dispatch('user/loginAction', values)
              if (result) {
                this.$router.push('/mine')
              } else {
                this.$toast({
                  type: 'fail',
                  message: '手机号或验证码错误'
                })
              }
            } else {
              this.$toast({
                type: 'fail',
                message: '密码必须是8-20位字母、数字或字符,至少包含两种'
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
            message: '请输入正确的手机号'
          })
        }
      } else {
        this.$toast({
          type: 'fail',
          message: '请先输入手机号'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
        .register-info{
            height: 600px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .register-from{
                height: 300px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                position: relative;
                .reg-p{
                font-size: 19px;
                margin-bottom: 20px;
                margin-left: 10px;
                }
                .v-code{
                    width: 105px;
                    height: 40px;
                    outline: none;
                    border: none;
                    border-radius: 5px;
                    background-color: rgb(233, 233, 233);
                    font-size: 14px;
                    text-align: center;
                    line-height: 40px;
                    position: absolute;
                    top: 166px;
                    right: 3px;
                }
            }
        }
        .log-icon{
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
