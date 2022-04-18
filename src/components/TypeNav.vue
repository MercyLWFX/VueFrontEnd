<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveIndex" @mouseenter="enterShow">
                <h2 class="all">职业资格分类</h2>
                <div class="sort" v-show="show">
                    <div class="all-sort-list2">
                        <div class="item bo" v-for="item in tableData" :key="item.categoryId">
                            <h3>
                                <router-link :to="`/front/more/${item.ascription}`">{{ item.classification }}</router-link>
                            </h3>
                            <div class="item-list clearfix">
                                <div class="subitem">
                                    <dl class="fore">
                                        <dd v-for="exam in item.exams" :key="exam.id">
                                            <em>
                                                <router-link :to="`/front/detail/${exam.examName}`" >{{ exam.examName }}</router-link>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <nav class="nav">
                <a href="###">竞赛信息</a>
                <a href="###">即将开始</a>
                <a href="###">正在报名</a>
                <a href="###">结果揭晓</a>
                <a href="###">优秀参与者</a>
                <a href="###">成为发布者</a>
                <a href="###">关于本站</a>
            </nav>

        </div>
    </div>

</template>

<script>
    export default {
        name: "TypeNav",
        data() {
            return {
                tableData: [],
                currentIndex: -1,
                show: true,
            }
        },
        created() {
            this.load()
        },
        methods: {
            load() {
                this.request.get("/classes/pages", {
                    params: {
                        pageNum: 0,
                        pageSize: 35,
                    }
                }).then(res => {

                    if (res.code === '200') {
                        this.tableData = res.data.records
                        console.log("######################*****************")
                        console.log(this.tableData)
                    }

                })
            },
            leaveIndex() {
                this.currentIndex = -1;
                if (this.$route.path != '/front/home') {
                    this.show = false;
                }

            },
            enterShow() {
                this.show = true
            },
        },
        mounted() {

        },
    };
</script>

<style scoped lang="less">
  .type-nav {
    border-bottom: 2px solid #36b7ea;

    .container {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      position: relative;

      .all {
        width: 210px;
        height: 45px;
        background-color: #36b7ea;
        line-height: 45px;
        text-align: center;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
      }

      .nav {

        a {
          height: 45px;
          margin: 0 22px;
          line-height: 45px;
          font-size: 16px;
          color: #333;
        }

      }

      .sort {
        position: absolute;
        left: 0;
        top: 45px;
        width: 210px;
        height: 580px;
        position: absolute;
        background: #fafafa;
        z-index: 999;

        .all-sort-list2 {

          .item {

            h3 {
              line-height: 30px;
              font-size: 14px;
              font-weight: 400;
              overflow: hidden;
              padding: 0 20px;
              margin: 0;

              a {
                color: #333;
              }

            }

            .item-list {
              display: none;
              position: absolute;
              width: 780px;
              min-height: 580px;
              background: #f7f7f7;
              left: 210px;
              border: 1px solid #ddd;
              top: 0;
              z-index: 9999 !important;

              .subitem {
                float: left;
                width: 650px;
                padding: 0 4px 0 8px;

                dl {
                  border-top: 1px solid #eee;
                  padding: 6px 0;
                  overflow: hidden;
                  zoom: 1;

                  &
                  .fore {
                    border-top: 0;
                  }

                  dt {
                    float: left;
                    width: 54px;
                    line-height: 22px;
                    text-align: right;
                    padding: 3px 6px 0 0;
                    font-weight: 700;
                  }

                  dd {
                    float: left;
                    width: 415px;
                    padding: 3px 0 0;
                    overflow: hidden;

                    em {
                      font-size: 16px;
                      float: left;
                      height: 20px;
                      line-height: 14px;
                      padding: 0 8px;
                      margin-top: 5px;
                      border-left: 1px solid #ccc;
                    }

                  }
                }
              }
            }

            &:hover {
              .item-list {
                display: block;
              }
            }
          }
        }
      }
    }
  }
</style>

