<template>
    <div style="line-height: 60px; display: flex">
        <div style="flex: 1;">
            <span :class="collapseBtnClass" style="cursor: pointer; font-size: 18px" @click="collapse"></span>

            <el-breadcrumb separator="/" style="display: inline-block; margin-left: 10px">
                <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-dropdown style="width: 150px; cursor: pointer; text-align: right">
            <div style="display: inline-block">
                <div style="display: inline-block">
                    <img :src="user.avatarUrl" alt=""
                         style="width: 30px; border-radius: 50%; position: relative; top: 10px; right: 5px">
                    <span>{{ user.nickname }}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
                </div>
            </div>

            <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
                <el-dropdown-item style="font-size: 14px; padding: 5px 0;">
                    <router-link to="/password" style="text-decoration: none;color: #333333">修改密码</router-link>
                </el-dropdown-item>
                <el-dropdown-item style="font-size: 14px; padding: 5px 0;text-decoration: none">
                    <router-link to="/person" style="text-decoration: none;color: #333333">个人信息</router-link>
                </el-dropdown-item>
                <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                    <span style="text-decoration: none" @click="logOut">退出</span>
                </el-dropdown-item>

            </el-dropdown-menu>
        </el-dropdown>
    </div>
<!--    <el-dropdown style="width: 100px; cursor: pointer">-->
<!--        <div style="display: inline-block">-->
<!--            <img :src="user.avatarUrl" alt=""-->
<!--                 style="width: 30px; border-radius: 50%; position: relative; top: 10px; right: 5px">-->
<!--            <span>{{ user.nickname }}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>-->
<!--        </div>-->
<!--        <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">-->
<!--            <el-dropdown-item style="font-size: 14px; padding: 5px 0">-->
<!--                <router-link to="/person">个人信息</router-link>-->
<!--            </el-dropdown-item>-->
<!--            <el-dropdown-item style="font-size: 14px; padding: 5px 0">-->
<!--                <span style="text-decoration: none" @click="logout">退出</span>-->
<!--            </el-dropdown-item>-->
<!--        </el-dropdown-menu>-->
<!--    </el-dropdown>-->
</template>

<script>
    import {resetRouter} from "@/router";

    export default {
        name: "Header",
        props: {
            collapseBtnClass: String,
            user:Object
        },
        data(){
          return{
              // user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")):{}
          }
        },
        computed: {
            currentPathName () {
                return this.$store.state.currentPathName;　　//需要监听的数据
            }
        },
        methods:{
            collapse(){
                this.$emit("test");
            },
            logOut(){
                this.$router.push('/login')
                localStorage.removeItem("user")
                localStorage.removeItem("menus")
                localStorage.removeItem("token")
                resetRouter()
                this.$message.success("退出成功")
            }
        }
    }
</script>

<style scoped>

</style>