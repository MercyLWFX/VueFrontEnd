<template>
    <div >
        <el-backtop>
            <div width="100%" style="font-size: 30px">^</div>
        </el-backtop>
        <!--        <FrontHeader/>-->
        <FrontSearch/>
        <TypeNav style="position: relative;top: -80px"/>
        <!--        <div style="margin: 10px 0">-->
        <el-carousel height="540px" style="width: 780px;margin: 0 auto; position: relative;top: -80px"
                     :interval="10000">
            <el-carousel-item v-for="item in imgs" :key="item">
                <img :src="item" alt="" style="width: 100%;height: 540px">
            </el-carousel-item>
        </el-carousel>
        <div class="right">
            <div class="news">
                <h4>
                    <em class="fl">了解最热</em>
                </h4>
                <div class="clearix"></div>
                <ul class="news-list unstyled">
                    <li>
                        <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                    </li>
                    <li>
                        <span class="bold">[公告]</span>备战开学季 全民半价购数码
                    </li>
                    <li>
                        <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                    </li>
                    <li>
                        <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                    </li>
                    <li>
                        <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                    </li>
                    <li>
                        <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                    </li>
                    <li>
                        <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                    </li>
                    <li>
                        <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                    </li>
                    <li>
                        <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                    </li>
                    <li>
                        <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                    </li>
                    <li>
                        <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                    </li>
                    <li>
                        <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                    </li>
                    <li>
                        <span class="bold">[公告]</span>备战开学季 全民半价购数码
                    </li>
                    <li>
                        <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                    </li>
                </ul>
            </div>
            <div class="ads">
                <img src="../../assets/recmm.png"/>
            </div>
        </div>
        <div class="cat">
            职业资格列表
        </div>
        <div style="margin: 0 auto;position: relative;top: -69px;">
            <div class="tab_c_item" v-for="item in tableData" :key="item.id">
                <router-link :to="`/front/detail/${item.examName}`" class="clearfix">
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
        <div class="click_view_more">
            <router-link to="/front/more">
                点击查看更多&gt;&gt;
            </router-link>
        </div>


    </div>
</template>

<script>
    import FrontHeader from "@/components/FrontHeader";
    import FrontSearch from "@/components/FrontSearch";
    import TypeNav from "@/components/TypeNav";

    export default {
        name: "FrontHome",
        data() {
            return {
                imgs: [
                    require('../../assets/banner2.png'),
                    require('../../assets/banner3.png'),
                    require('../../assets/banner4.png'),
                ],
                files: [],
                tableData: [],
            }
        },
        components: {
            TypeNav,
            FrontHeader,
            FrontSearch
        },
        created() {
            this.load()
        },
        methods: {
            load() {
                this.request.get("/exam/pages", {
                    params: {
                        pageNum: 1,
                        pageSize: 8,
                    }
                }).then(res => {
                    console.log("#######################################")
                    console.log(res)
                    console.log("#######################################")
                    this.tableData = res.records
                })
            },
        }
    }
</script>


<style scpoed lang="less">
  .click_view_more{
    position: relative;
    top: -67px;
    margin: 0 auto;
    width: 780px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
    background-color: #ffa000;
  }
  .click_view_more a{
    color: #fff;
  }


  .t_c_intro {
    width: 100%;
    height: 50px;
    color: #646d96;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-top: 15px;
    font-size: 14px;
  }

  .t_c_info {
    font-size: 13px;
    color: #bea2a6;
    margin-top: 20px;
  }

  .t_c_info span {
    margin-right: 35px;
    font-size: 12px;
  }

  .t_c_right {
    float: left;
    width: 415px;
    margin-left: 20px;
    line-height: 25px;
  }

  .t_c_right h3 {
    width: 100%;
    margin-top: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
  }

  .t_c_left {
    float: left;
    width: 208px;
  }

  .t_c_left img {
    width: 100%;
  }

  .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    visibility: hidden;
    clear: both;
  }

  .clearfix {
    zoom: 1;
  }

  .tab_c_item {
    background-color: #FAFAFA;
    margin: 0 auto;
    width: 780px;
    height: 150px;
    padding: 24px 0 30px 0;
    border-bottom: 1px #d3d3d3 dashed;
  }

  .right {
    float: right;
    width: 250px;
    position: relative;
    top: -620px;
    right: 120px;

    .news {
      border: 1px solid #e4e4e4;
      margin-top: 5px;

      h4 {
        border-bottom: 1px solid #e4e4e4;
        padding: 5px 10px;
        margin: 5px 5px 0;
        line-height: 22px;
        overflow: hidden;
        font-size: 14px;

        .fl {
          float: left;
        }

        .fr {
          float: right;
          font-size: 12px;
          font-weight: 400;
        }
      }

      .news-list {
        padding: 5px 15px;
        line-height: 26px;
        height: 370px;

        .bold {
          font-weight: 700;
        }
      }
    }

    .lifeservices {
      border-right: 1px solid #e4e4e4;
      overflow: hidden;
      display: flex;
      flex-wrap: wrap;

      .life-item {
        border-left: 1px solid #e4e4e4;
        border-bottom: 1px solid #e4e4e4;
        margin-right: -1px;
        height: 64px;
        text-align: center;
        position: relative;
        cursor: pointer;
        width: 25%;

        .list-item {
          //background-image: url(../images/home/icons.png);
          width: 61px;
          height: 40px;
          display: block;
        }

        .service-intro {
          line-height: 22px;
          width: 60px;
          display: block;
        }

        &:nth-child(1) {
          .list-item {
            background-position: 0px -5px;
          }
        }

        &:nth-child(2) {
          .list-item {
            background-position: -62px -5px;
          }
        }

        &:nth-child(3) {
          .list-item {
            background-position: -126px -5px;
          }
        }

        &:nth-child(4) {
          .list-item {
            background-position: -190px -5px;
          }
        }

        &:nth-child(5) {
          .list-item {
            background-position: 0px -76px;
          }
        }

        &:nth-child(6) {
          .list-item {
            background-position: -62px -76px;
          }
        }

        &:nth-child(7) {
          .list-item {
            background-position: -126px -76px;
          }
        }

        &:nth-child(8) {
          .list-item {
            background-position: -190px -76px;
          }
        }

        &:nth-child(9) {
          .list-item {
            background-position: 0px -146px;
          }
        }

        &:nth-child(10) {
          .list-item {
            background-position: -62px -146px;
          }
        }

        &:nth-child(11) {
          .list-item {
            background-position: -126px -146px;
          }
        }

        &:nth-child(12) {
          .list-item {
            background-position: -190px -146px;
          }
        }
      }
    }

    .ads {
      margin-top: 5px;

      img {
        opacity: 0.8;
        width: 250px;
        height: auto;
        transition: all 400ms;

        &:hover {
          opacity: 1;
        }
      }
    }
  }

  .cat {
    margin: 0 auto;
    height: 40px;
    width: 800px;
    position: relative;
    top: -70px;
    font: 18px "Microsoft YaHei";
    background-color: #f3f1f6;
    text-align: center;
    line-height: normal;
  }
</style>
