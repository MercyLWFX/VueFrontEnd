<template>
    <el-container style="min-height: 100vh">

        <el-aside :width="sideWidth + 'px'" style="box-shadow: 2px 0 6px rgb(0 21 41 / 35%);">
            <Asides :isCollapse="isCollapse" :logoTextShow="logoTextShow"  />
        </el-aside>

        <el-container>
            <el-header style="border-bottom: 1px solid #ccc;">
                <Header :collapseBtnClass="collapseBtnClass" v-on:test="collapse" :user="user"/>
            </el-header>

            <el-main>
                <!--        表示当前页面的子路由会在 <router-view /> 里面展示-->
                <router-view @refreshUser="getUser">

                </router-view>
            </el-main>

        </el-container>
    </el-container>
</template>

<script>

    import Asides from "@/components/Asides";
    import Header from "@/components/Header";
    import user from "@/views/User";

    export default {
        name: 'Home',
        data() {
            return {
                collapseBtnClass: 'el-icon-s-fold',
                isCollapse: false,
                sideWidth: 200,
                logoTextShow: true,
                user: {},
            }
        },
        components: {
            Asides,
            Header
        },
        created() {
          //  从后台获取最新的数据
          this.getUser()
        },
        methods: {
            collapse() {  // 点击收缩按钮触发
                this.isCollapse = !this.isCollapse
                if (this.isCollapse) {  // 收缩
                    this.sideWidth = 64
                    this.collapseBtnClass = 'el-icon-s-unfold'
                    this.logoTextShow = false
                } else {   // 展开
                    this.sideWidth = 200
                    this.collapseBtnClass = 'el-icon-s-fold'
                    this.logoTextShow = true
                }
            },
            getUser(){
                let username=localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).username:""
                this.request.get("/user/username/" + username).then(res=>{
                    this.user=res.data
                })
            }
        }
    }
</script>