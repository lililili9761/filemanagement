<template>
  <el-header style="text-align: right; font-size: 14px; padding: 0">
    <el-row>
      <el-col :span="4">
        <h3 style="text-align:center; font-size:18px; font-weight:600; color:#666"><i class="el-icon-document"></i>文件管理系统</h3>
      </el-col>
      <el-col :span="20" style="height: 60px; padding-right: 2em">
        <div class="search"v-if="username">
          <el-input 
          style="margin-right:1em" 
          placeholder="请输入文件名搜索" 
          prefix-icon="el-icon-search" 
          v-model="input"
          clearable></el-input>
          <el-button @click.native="search" icon="el-icon-search" circle></el-button>
          <el-button @click.native="resetform" icon="el-icon-refresh" circle></el-button>
        </div>
        <el-menu :default-active="activeIndex" v-if="!username" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">
                <router-link class="nav-link" to="/">
                  <span style="display:inline-block;height:100%;width:100%;">登录</span>
                </router-link>
            </el-menu-item>
            <el-menu-item index="2">
                <router-link class="nav-link" to="/register">
                  <span style="display:inline-block;height:100%;width:100%;">注册</span>
                </router-link>
            </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </el-header>
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
      color:#333;
      border:none;
      height: 59px;
      padding-left:80%;
  }
  .el-menu--horizontal>.el-menu-item{
      height: 59px;
  }
  .el-menu--horizontal>.el-menu-item:hover{
      height: 59px;
      border-bottom: 2px solid cornflowerblue;
  }

  .el-menu--horizontal>.el-menu-item.is-active {
      height: 60px;
      background:#f8f8f8;
      border-bottom: 2px solid cornflowerblue;
  }
</style>

<script>
import EventHandler from '../assets/EventHandler.js';
export default {
  name:'Header',
  data() {
    return {
      activeIndex: '1',
      input:'',
      username:'',
      tableData:[],
    }
  },
  mounted:function() {
    var me = this;
    EventHandler.$on('status',(data)=>{
      me.activeIndex=data;
    });
    var username = this.$cookies.get('username');
    this.username = username;
    this.$axios.get('/api/show_files')
      .then((res)=>{
        this.tableData = res.data;
      })
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    search:function(e) {
      var me = this;
      var newdata = [];
      if(me.input) {
        me.$axios.get('/api/show_files')
        .then((res)=>{
          me.tableData = res.data;
          newdata = me.tableData;
        })
        var newt = me.tableData.filter(function(x){
          if(x.file_name.indexOf(me.input)>-1) {
            newdata.push(x);
          }
        })
      } 
      EventHandler.$emit("newdata",newdata);
      me.$router.push('/homepage');
    },
    resetform:function(){
      this.$axios.get('/api/show_files')
        .then((res)=>{
          this.tableData = res.data;
        })
      EventHandler.$emit("newdata",this.tableData);
      this.$router.push('/homepage');
      this.input = "";
    }
  },
}
</script>