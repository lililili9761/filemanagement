<template>
<div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
      :label-position="labelPosition">
      <h2 style="text-align: center;margin:20px 0;font-size: 26px">登录</h2>
      <el-form-item label="用户名" prop="account">
        <el-input style="width:100%" type="account" v-model="ruleForm.account" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input style="width:100%" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width:100%;margin-top:20px" type="primary" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
        <div style="text-align: right;margin-top:5px;">还没注册？<router-link to="/register" @click.native="buttonstatus">马上注册</router-link></div>
    </el-form>
</div>
</template>

<style>
  .el-header {
    background-color: #f8f8f8;
    border-bottom: 1px solid #e7e7e7;
    color: #333;
    line-height: 60px;
  }

  .el-input {
    width: 22%;
  }

  .el-menu.el-menu--horizontal {
    background-color: #f8f8f8;
    color: #333;
    border: none;
    height: 59px;
    padding-left: 80%;
  }

  .el-menu--horizontal>.el-menu-item {
    height: 59px;
  }

  .el-menu--horizontal>.el-menu-item:hover {
    height: 59px;
    border-bottom: 2px solid cornflowerblue;
  }

  .el-menu--horizontal>.el-menu-item.is-active {
    height: 60px;
    background: #f8f8f8;
    border-bottom: 2px solid cornflowerblue;
  }

  .demo-ruleForm {
    margin: 0 auto;
    padding: 50px;
    width: 500px !important;
  }

  .el-form-item__label {
    line-height: 20px;
    color: #333;
    font-weight: 400;
    font-size: 16px;
  }
</style>

<script>
import EventHandler from '../assets/EventHandler.js';
  export default {
    name: 'Login',
    data() {
      var validateAcc = (rule, value, callback) => {
        var reg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
        if (value === '') {
          callback(new Error('用户名不能为空'));
        } else if(!reg.test(value)){
            
            callback(new Error('用户名只能由中文、英文、数字和下划线组成'));
        } else {
            callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('密码不能为空'));
        } else {
            callback();
        }
      };
      return {
        labelPosition: 'top',
        activeIndex: '2',
        ruleForm: {
          account: '',
          password: '',
        },
        rules: {
          account: [{
            validator: validateAcc,
            trigger: 'blur'
          }],
          password: [{
            validator: validatePass,
            trigger: 'blur'
          }]
        },
        existuser:false,
        isadmin:false
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            this.$router.push('/homepage');
            // var me = this;
            // this.$axios.post('api/login',this.ruleForm)
            //     .then((res)=>{
            //         this.existuser = res.data.existuser;
            //         this.isadmin = res.data.isadmin;
            //         if(existuser) {
            //             setTimeout(function(){
            //                 me.$router.push('/homepage');
            //                 window.location.reload();
            //             },1000)
            //         }
            //     })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
        buttonstatus:function(){
            EventHandler.$emit('status',this.activeIndex);
        }
    }
  }
</script>