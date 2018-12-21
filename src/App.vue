<template>
  <div id="app">
    <el-container style="height:820px;" direction="vertical">
      <Header></Header>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <!-- <Homepage></Homepage> -->
    </el-container>
  </div>
</template>

<script>
import Header from'./components/Header'
import Login from'./components/Login'
import Register from'./components/Register'
import Homepage from'./components/Homepage'
export default {
  name: 'App',
  components: {
    Header,Login,Register,Homepage
  }
}
</script>

<style>
html,body,div,ul,ol,li,dl,dt,dd,h1,h2,h3,h4,h5,h6,form,input,textarea,p {
  margin:0px;
  padding:0px;
  font-family:微软雅黑;
}

ul {
  list-style:none;
}
img,a img {
  border:none;
}
a {
  text-decoration:none;
}
a:hover {
  text-decoration:none;
}
</style>
