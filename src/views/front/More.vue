<template>
    <div>
        <FrontSearch/>
        <TypeNav style="position: relative;top: -50px"/>
        <div style="margin: 0 auto;position: relative;top: -50px" >
            <div class="fblist">
                <h1 class="xs2">职业资格预览  {{$route.params.ascription}}</h1>
            </div>
            <div class="tab_c_item" v-for="item in tableData" :key="item.id">
                <router-link :to="`/front/detail/${item.examName}`"  class="clearfix">
                    <div class="t_c_left">
                        <img :src="item.imgurl" alt="news"
                             width="211" height="150">
                    </div>
                    <div class="t_c_right">
                        <h3>{{ item.examName }}</h3>
                        <div class="t_c_info">
                            <span></span>
                            <span><img src="images/liulan.png" alt=""> {{ item.count }}</span>
                            <span>开始时间:{{ item.start }}</span>
                        </div>
                        <div class="t_c_intro">
                            <span>报名截止时间：{{ item.end }}</span>
                        </div>
                    </div>
                </router-link>

            </div>
        </div>
        <div style="padding: 10px 0;position: relative;left: 450px">
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
        name: "More",
        data() {
            return {
                pageNum: 1,
                pageSize: 10,
                tableData: [],
                total:0,
                ascription:this.$route.params.ascription
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
                this.request.get("/exam/pages", {
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        ascription: this.ascription
                    }
                }).then(res => {
                    console.log("############################################################")
                    console.log(res)
                    this.tableData = res.records
                    this.total = res.total
                    console.log(this.total)
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
        watch:{
            $route:{
                handler(newVal,oldVal){
                    console.log(newVal)
                    location.reload()
                },
            }
        }
    }
</script>

<style scoped lang="css">
    .fblist{
        margin: 0 auto;
        background-color: #ffa000;
        /*position: relative;*/
        /*top: -100px;*/
        text-align: center;
        height: 40px;
        width: 100%;
    }

</style>