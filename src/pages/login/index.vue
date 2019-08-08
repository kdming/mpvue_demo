<template>
  <div>
    <i-tabs v-bind:current='current' i-class='toplip' @change='handleChange'>
      <i-tab key='login' title='登录'></i-tab>
      <i-tab key='register' title='注册'></i-tab>
    </i-tabs>
    <!-- 用户登录 -->
    <div v-if="current == 'login'" class='userInfo'>
      <van-cell-group custom-class='user-cell'>
        <van-field 
          :value='phone' 
          @change="onChange($event, 'phone')"
          label='手机号'
          placeholder='请输入手机号' 
          border='false' 
        />
        <div style="margin-top:5%;">
          <van-field 
            :value='name'
            @change="onChange($event, 'name')"
            center clearable label='验证码' 
            placeholder='请输入验证码' 
            border='false' 
            use-button-slot
          >
            <van-button 
              @click="login"
              slot='button' 
              size='small' 
              type='primary' 
              custom-class='submit-button'
            >
              发送验证码
            </van-button>
          </van-field>
        </div>
      </van-cell-group>
      <div id='user-login-submit'>
        <van-button 
          @click="login"
          slot='button' 
          custom-class='submit-button' 
          size='large' 
          type='primary'
        >
          登录
        </van-button>
      </div>
    </div>
    <!-- 用户注册÷ -->
    <div v-if="current == 'register'" class='userInfo'>
      <van-cell-group custom-class='user-cell'>
        <van-field 
          :value="name"
          label='姓名'
          @change="onChange($event, 'name')"
          placeholder='请输入姓名' 
          border='false' 
        />
        <van-field
          v-bind:value='position' 
          label='职位' 
          placeholder='点击选择职位'
          @focus='ttShow' 
          border='false' 
        />
        <van-action-sheet
          v-bind:show="positionShow"
          :actions="actions"
          cancel-text="取消"
          @close="positionClose"
          @cancel="positionClose"
          @select="positionSelect"
        />
        <van-field 
          :value='phone'
          @change="onChange($event, 'phone')"
          label='手机号' 
          placeholder='请输入手机号' 
          border='false' 
        />
      </van-cell-group>
      <div id='user-login-submit'>
        <van-button 
          slot='button' 
          custom-class='submit-button' 
          size='large' 
          type='primary'
          @click="register"
        >
          注册
        </van-button>
      </div>
    </div>
</div>
</template>

<script>
import user from '@/apis/user'
export default {
  data() {
    return {
      current: 'register',
      current_scroll: 'login',
      positionShow: false,
      phone: '',
      name: '',
      position: '',
      validateCode: '',
      actions: [
        {
          name: '教授'
        },
        {
          name: '副教授'
        }
      ]
    };
  },
  methods: {
    handleChange(event) {
      // 清空用户信息
      this.name = ''
      this.phone = ''
      this.validateCode = ''
      this.position = ''
      const name = event.mp.detail.key
      this.current = name
    },
    register() {
      const data = {
        phone: this.phone,
        name: this.name,
        position: this.position,
      }
      user.register(data).then((res) => {
        console.log(res)
      })
    },
    login() {
      const data = {
        name: this.name,
        phone: this.phone
      }
      user.login(data).then((res) => {
        console.log(res)
      })
    },
    ttShow() {
      this.positionShow = true
    },
    positionClose(){
      this.positionShow = false
    },
    positionSelect(event) {
      this.position = event.mp.detail.name
      this.positionShow = false
    },
    onChange({mp}, key) {
      this[key] = mp.detail
    }
  }
}
</script>

<style scoped>
  .toplip {
    width: 50% !important;
    margin: 0% 25% 0% 25%;
  }
  .userInfo {
    margin-top: 40%;
    text-align: center;
    padding-right: 10%;
  }
  #user-login-submit {
    margin-left: 10%;
    margin-top: 10%;
  }
  .submit-button {
    font-weight: bold;
    background-color: #2ddbcdef !important;
    border: solid 0px #ffffff !important;
  }
</style>

