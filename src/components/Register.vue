<template>
    <div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" :label-position="labelPosition">
        <h2 style="text-align: center;margin:20px 0;font-size: 26px">注册</h2>
        <el-form-item label="用户名" prop="account">
            <el-input style="width:100%" type="account" v-model="ruleForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input style="width:100%" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input style="width:100%" type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button style="margin-top:20px;width:100%;;" type="primary" @click="submitForm('ruleForm')">注册</el-button>
        </el-form-item>
        <el-form-item>
            <el-button style="width:100%" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        <div style="text-align: right;margin-top:5px;">已有账号？<router-link to="/" @click.native="buttonstatus">马上登录</router-link>
        </div>
    </el-form>
</div>
</template>

<style>
    .demo-ruleForm{
        margin:0 auto;
        padding:50px;
        width:500px !important;
    }
    .el-form-item__label {
        line-height: 20px;
        color:#333;
        font-weight: 400;
        font-size: 16px;
    }
</style>

<script>
import EventHandler from '../assets/EventHandler.js';
export default {
    name: 'Register',
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
        var validatePass=(rule, value,callback)=> {
            if (value === '') {
                callback(new Error('密码不能为空'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            labelPosition: 'top',
            activeIndex: '1',
            ruleForm: {
                acccount: '',
                password: '',
                checkPass: '',
            },
            rules: {
                account: [{
                    validator: validateAcc,
                    trigger: 'blur'
                }],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
            },
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                alert('submit!');
                this.$router.push('/');
                // var me = this;
                // this.$axios.post("api/register",this.ruleForm)
                //     .then((res)=>{
                //         if() {
                //             setTimeout(function(){
                //                 me.$router.push('/');
                //             },1000);
                //         }
                //     })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        buttonstatus:function(){
            EventHandler.$emit('status',this.activeIndex);
        }
    }
}
</script>