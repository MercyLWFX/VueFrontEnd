<template>
    <!--    头部-->
    <div style="display: flex; height: 60px; line-height: 60px; border-bottom: 1px solid #eee">
        <div style="width: 300px; display: flex; padding-left: 30px">
            <div style="flex: 50;position: relative;left: 50px;color: skyblue">欢迎来到报名系统</div>
        </div>
        <div style="flex: 1">
            <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal" router>
                <el-menu-item index="/front/home">首页</el-menu-item>
<!--                <el-menu-item index="/front/video">视频播放</el-menu-item>-->
                <el-menu-item index="/front/article">文章列表</el-menu-item>
                <el-menu-item index="/front/socialDetail">共享社区</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">我的工作台</template>
                    <el-menu-item index="/">个人中心</el-menu-item>
                    <el-menu-item index="/CommArticles">社区发帖</el-menu-item>
                </el-submenu>
                <el-menu-item index="/front/sign">已报名</el-menu-item>
                <el-menu-item index="/front/cart">预报名管理</el-menu-item>
            </el-menu>
        </div>
        <div style="width: 200px">
            <div v-if="!user.username" style="text-align: right; padding-right: 30px">
                <el-button @click="$router.push('/login')">登录</el-button>
                <el-button @click="$router.push('/register')">注册</el-button>
            </div>
            <div v-else>
                <el-dropdown style="width: 150px; cursor: pointer; text-align: right">
                    <div style="display: inline-block">
                        <img :src="user.avatarUrl" alt=""
                             style="width: 30px; border-radius: 50%; position: relative; top: 10px; right: 5px">
                        <span>{{ user.nickname }}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
                    </div>
                    <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
                        <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                            <router-link to="/password">修改密码</router-link>
                        </el-dropdown-item>
                        <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                            <router-link to="/person">个人信息</router-link>
                        </el-dropdown-item>
                        <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                            <span style="text-decoration: none" @click="logout">退出</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Front",
        data() {
            return {
                user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
            }
        },

        created() {
        },
        methods: {
            logout() {
                this.$store.commit("logout")
                this.$message.success("退出成功")
            }
        }
    }
</script>

<style scoped>
    .item {
        display: inline-block;
        width: 100px;

        text-align: center;
        cursor: pointer
    }

    .item a {
        color: #1E90FF;
    }

    .item:hover {
        background-color: LightPink;
    }
</style>