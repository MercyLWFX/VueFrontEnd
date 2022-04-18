<template>
    <div>
        <FrontHeader/>
<!--                <FrontSearch/>
                <TypeNav style="position: relative;top: -75px;left: auto"/>
                <Home style="width: 780px; margin: 0 auto;position: relative;top: -85px"/>-->
        <router-view/>
        <Footer/>
    </div>
</template>

<script>
    import Footer from "@/components/Footer";
    import TypeNav from "@/components/TypeNav";
    import FrontSearch from "@/components/FrontSearch";
    import FrontHeader from "@/components/FrontHeader";
    import Home from "@/views/front/Home";

    export default {
        name: "Front",
        data() {
            return {
                user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
            }
        },
        components: {
            Home,
            TypeNav,
            Footer,
            FrontHeader,
            FrontSearch
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
