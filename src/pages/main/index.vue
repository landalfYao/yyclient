<template>
  <div class="container" :style="{height:innerHeight+'px'}">
    <div class="header">
      <div class="header-panel panel-between item-center">
        <div class="panel-start item-center w-250">
          <div class="logo"><img src="../../assets/logo.png" width="30" alt=""></div>
          <div class="ma-l30 bold fo-b">{{systemName}}</div>
        </div>
        <div class="w-800 panel-center">
          <!-- 中间部分 -->
          <el-menu  class="el-menu-demo" mode="horizontal" :default-active="defaultMeun" @select="selectTopNav">
            <el-menu-item v-for="(item,index) in topNav" :key="index" :index="item.path">{{item.label}}</el-menu-item>
          </el-menu>
        </div>
        <div class="w-250 text-right">
          <el-dropdown trigger="click">
            <el-button type="text" class="el-dropdown-link">
              管理员 三百<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item >
                <div class="dropdown-item fo-danger" @click="logout()">退出登录</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="main" >
      <div class="main-panel panel-center" :style="{height:(innerHeight-170)+'px'}">
        <div class="main-left">
          <el-menu
            :default-active="defaultActive"
            :unique-opened='true'
            class="el-menu-vertical">
            <el-submenu v-for="(item1,index1) in nav" :key="index1" :index="index1+''">
              <template slot="title">
                <i :class="item1.icon"></i>
                <span>{{item1.label}}</span>
              </template>
              <el-menu-item v-for="(item2,index2) in item1.sub" :key="index2" :index="item2.path">{{item2.label}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
        <div class="main-right">
          <div class="main-right-top panel-between">
            <div>
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }" ><span class="fo-g">首页</span></el-breadcrumb-item>
                <el-breadcrumb-item><span class="fo-g">活动管理</span></el-breadcrumb-item>
                <el-breadcrumb-item><span class="fo-g">活动列表</span></el-breadcrumb-item>
                <el-breadcrumb-item><span class="fo-g">活动详情</span></el-breadcrumb-item>
              </el-breadcrumb>
              <div class="fo-36 ma-t10">活动详情</div>
            </div>
            <div>
              <div >
                <el-input placeholder="输入页面名称" >
                  <template slot="append">
                    跳转
                  </template>
                </el-input>
              </div>
            </div>
          </div>
          <div class="main-right-panel" :style="{height:(innerHeight-230)+'px'}">
            <div class="main-right-panel-o" :style="{height:(innerHeight-230)+'px'}">
              <router-view></router-view>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="footer">某某公司 2018</div>
  </div>
</template>
<script>
export default require('./index.js')
</script>
