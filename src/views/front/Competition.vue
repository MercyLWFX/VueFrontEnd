<template>
    <div>
        <FrontSearch/>
        <TypeNav style="position: relative;top: -50px"/>
        <div id="newsmenu" class="index_menu" style=" height: 55px;width: 1100px;margin: 0 auto;position: relative;top: -50px;border: 2px solid skyblue">
            <ul>
                <li>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=商业创业">商业创业</router-link>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=创业大赛">创业大赛</router-link>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=营销策划">营销策划</router-link>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=财会金融">财会金融</router-link>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=兴趣爱好">兴趣爱好</router-link>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=选秀歌唱">选秀歌唱</router-link>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=摄影影视">摄影影视</router-link>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=动漫书画">动漫书画</router-link>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=播音主持">播音主持</router-link>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=文学演讲">文学演讲</router-link>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=模特大赛">模特大赛</router-link>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=武术舞蹈">武术舞蹈</router-link>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=广告公益">广告公益</router-link>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=广告创意">广告创意</router-link>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=公益大赛">公益大赛</router-link>
                </li>
                <br>
                <li>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=科技创新">科技创新</router-link>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=科技大赛">科技大赛</router-link>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=应用开发">应用开发</router-link>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=设计比赛">设计比赛</router-link>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=学科技能">学科技能</router-link>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=学科学术">学科学术</router-link>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=体育竞技">体育竞技</router-link>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=游戏竞技">游戏竞技</router-link>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=其他比赛">其他比赛</router-link>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=公益征集">公益征集</router-link>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=商业征集">商业征集</router-link>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=新闻资讯">新闻资讯</router-link>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=结果揭晓">结果揭晓</router-link>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=比赛论坛">比赛论坛</router-link>
                    <router-link  style="font-weight:bold;" to="/front/competition?types=IT应用开发">IT应用开发</router-link>
                </li>
            </ul>
        </div>
        <div style="margin: 0 auto;position: relative;top: -50px">
            <div class="fblist">
                <h1 class="xs2">竞赛信息预览</h1>
            </div>
            <div class="tab_c_item" v-for="item in tableData" :key="item.id">
                <router-link :to="`/front/detailCompetition/${item.id}`" class="clearfix">
                    <div class="t_c_left">
                        <img :src="item.imgurl" alt="news"
                             width="211" height="150">
                    </div>
                    <div class="t_c_right">
                        <h3>{{ item.name }}</h3>
                        <div class="t_c_info">
                            <span></span>
                            <span><img src="http://www.52jingsai.com/template/ituiz_qing/style/img/eye.gif"
                                       alt="">已报人数：{{ item.count }}</span>
                            <span>开始时间:{{ item.start }}</span>
                        </div>
                        <div class="t_c_intro">
                            <span>报名截止时间：{{ item.end }}</span>
                        </div>
                        <div class="t_c_intro">
                            <span>比赛类型：{{ item.types }}</span>
                        </div>

                    </div>
                </router-link>

            </div>
        </div>
        <div style="padding: 10px 0;position: relative;left: -400px">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[2, 5, 10, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import FrontSearch from "@/components/FrontSearch";
    import TypeNav from "@/components/TypeNav";

    export default {
        name: "Competition",
        data() {
            return {
                pageNum: 1,
                pageSize: 10,
                tableData: [],
                total: 0,
                types:this.$route.query.types
            }
        },
        components: {
            TypeNav,
            FrontSearch
        },
        created() {
            this.load()
        },
        methods: {
            load() {
                this.request.get("/competition/page", {
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        types: this.types
                    }
                }).then(res => {
                    // console.log("---------------------------------------")
                    // console.log(res)
                    this.tableData = res.data.records
                    this.total = res.total
                    // console.log(this.total)
                })
            },
            handleSizeChange(pageSize) {
                // console.log(pageSize)
                this.pageSize = pageSize
                this.load()
            },
            // 改变页面数据个数
            handleCurrentChange(pageNum) {
                // console.log(pageNum)
                this.pageNum = pageNum
                this.load()
            },
            //当前页数
            searchByName() {
                this.load()
            },
        },
        watch: {
            $route: {
                handler(newVal, oldVal) {
                    console.log(newVal)
                    location.reload()
                },
            }
        }
    }
</script>

<style scoped lang="css">

    .index_menu ul li a {
        padding: 0 8px;
        font: 14px 'Microsoft YaHei';
    }
    .fblist {
        margin: 0 auto;
        background-color: #f2f2f2;
        /*position: relative;*/
        /*top: -100px;*/
        text-align: center;
        height: 40px;
        width: 780px;
    }

    .foot_bg .wp li, #flk {
        width: 800px
    }

    .foot_bg .wp {
        position: relative
    }

    .foot_bg .wp .weixin_box {
        width: 126px;
        height: 80px;
        right: 0;
        position: absolute;
    }

</style>