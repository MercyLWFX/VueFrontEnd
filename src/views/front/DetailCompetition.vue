<template>
    <div class="detail">
        <section class="con">
            <!-- 主要内容区域 -->
            <div class="mainCon">
                <!-- 左侧放大镜区域 -->
                <div class="previewWrap">
                    <div class="spec-preview">
                        <img :src="tableData.imgurl" alt="">
                    </div>
                </div>
                <!-- 右侧选择区域布局 -->
                <div class="InfoWrap">
                    <div class="goodsDetail">
                        <h3 class="InfoName">{{ tableData.name }}</h3>
                        <div class="priceArea">
                            <div class="priceArea1">
                                <div class="title">报名费用：</div>
                                <div class="price">
                                    <i>¥</i>
                                    <em>{{tableData.expense}}</em>
                                </div>
                            </div>
                        </div>
                        <div class="support">
                            <div class="supportArea">
                                <div class="title">资格类别</div>
                                <div class="fixWidth">{{ tableData.types }}</div>
                            </div>
                            <div class="supportArea">
                                <div class="title">发起部门</div>
                                <div class="fixWidth">{{ tableData.master }}</div>
                            </div>
                            <div class="supportArea">
                                <div class="title">累计报名人数</div>
                                <div class="fixWidth">{{ tableData.count }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="choose">
                        <div class="chooseArea">
                            <div class="choosed"></div>
                            <dl>
                                <dt class="title">开始时间</dt>
                                <dd class="active">{{ tableData.start }}</dd>

                            </dl>
                            <dl>
                                <dt class="title">结束时间</dt>
                                <dd class="active">{{ tableData.end }}</dd>
                            </dl>

                        </div>
                        <div class="cartWrap">

                            <div class="add">
                                <el-button type="primary" @click="prePay">加入预报名</el-button>
                                <el-button type="danger">立即报名</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- 内容详情页 -->
        <el-collapse  style="width: 1200px;margin: 0 auto">
            <el-collapse-item title="简介" name="1">
               <pre style="font: 16px 'Microsoft YaHei'">{{tableData.detail}}</pre>
            </el-collapse-item>
<!--            <el-collapse-item title="发起依据" name="2">-->
<!--                <div>{{tableData.basis}}</div>-->
<!--            </el-collapse-item>-->
        </el-collapse>
    </div>
</template>

<script>
    export default {
        name: "DetailCompetition",
        data() {
            return {
                id: this.$route.params.id,
                tableData: {},
                user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : {},
            }
        },
        created() {
            this.load()
        },
        methods: {
            load() {
                console.log(this.id)
                this.request.get("/competition/detail/"+this.id).then(res => {
                    if (res.code === '200') {
                        this.tableData = res.data
                        console.log(this.tableData)
                    }
                })
            },
            prePay(){
                if (this.user==null){
                    this.$router.push("/login")
                    this.$message.error("请登录")
                }else {
                    this.request.get("/sign/pre",{
                        params: {
                            userId: this.user,
                            examId: this.tableData.id,
                            ispay: 0
                        }
                    }).then(res => {
                        if (res.code === '200') {
                            this.$message.success("成功加入预报名")
                        }else {
                            this.$message.error(res.msg)
                        }
                    })
                }

            }
        }
    }
</script>

<style lang="less" scoped>
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover ~ .mask,
    .event:hover ~ .big {
      display: block;
    }
  }

  .detail {
    .con {
      width: 1200px;
      margin: 15px auto 0;

      .conPoin {
        padding: 9px 15px 9px 0;

        & > span + span:before {
          content: "/\00a0";
          padding: 0 5px;
          color: #ccc;
        }
      }

      .mainCon {
        overflow: hidden;
        margin: 5px 0 15px;

        .previewWrap {
          float: left;
          width: 400px;
          position: relative;
        }

        .InfoWrap {
          width: 700px;
          float: right;

          .InfoName {
            font-size: 14px;
            line-height: 21px;
            margin-top: 15px;
          }

          .news {
            color: skyblue;
            margin-top: 15px;
          }

          .priceArea {
            background: #d9e6f3;
            padding: 7px;
            margin: 13px 0;

            .priceArea1 {
              overflow: hidden;
              line-height: 28px;
              margin-top: 10px;

              .title {
                float: left;
                margin-right: 15px;
              }

              .price {
                float: left;
                color: #c81623;

                i {
                  font-size: 16px;
                }

                em {
                  font-size: 24px;
                  font-weight: 700;
                }

                span {
                  font-size: 12px;
                }
              }

              .remark {
                float: right;
              }
            }

            .priceArea2 {
              overflow: hidden;
              line-height: 28px;
              margin-top: 10px;

              .title {
                margin-right: 15px;
                float: left;
              }

              .fixWidth {
                width: 520px;
                float: left;

                .red-bg {
                  background: #c81623;
                  color: #fff;
                  padding: 3px;
                }

                .t-gray {
                  color: #999;
                }
              }
            }
          }

          .support {
            border-bottom: 1px solid #ededed;
            padding-bottom: 5px;

            .supportArea {
              overflow: hidden;
              line-height: 28px;
              margin-top: 10px;

              .title {
                margin-right: 15px;
                float: left;
              }

              .fixWidth {
                width: 520px;
                float: left;
                color: #999;
              }
            }
          }

          .choose {
            .chooseArea {
              overflow: hidden;
              line-height: 28px;
              margin-top: 10px;

              dl {
                overflow: hidden;
                margin: 13px 0;

                dt {
                  margin-right: 15px;
                  float: left;
                }

                dd {
                  float: left;
                  margin-right: 5px;
                  color: #666;
                  line-height: 24px;
                  padding: 2px 14px;
                  border-top: 1px solid #eee;
                  border-right: 1px solid #bbb;
                  border-bottom: 1px solid #bbb;
                  border-left: 1px solid #eee;

                  &.active {
                    color: green;
                    border: 1px solid green;
                  }
                }
              }
            }

            .cartWrap {
              .controls {
                width: 48px;
                position: relative;
                float: left;
                margin-right: 15px;

                .itxt {
                  width: 38px;
                  height: 37px;
                  border: 1px solid #ddd;
                  color: #555;
                  float: left;
                  border-right: 0;
                  text-align: center;
                }

                .plus,
                .mins {
                  width: 15px;
                  text-align: center;
                  height: 17px;
                  line-height: 17px;
                  background: #f1f1f1;
                  color: #666;
                  position: absolute;
                  right: -8px;
                  border: 1px solid #ccc;
                }

                .mins {
                  right: -8px;
                  top: 19px;
                  border-top: 0;
                }

                .plus {
                  right: -8px;
                }
              }

              .add {
                float: left;

                a {
                  background-color: #e1251b;
                  padding: 0 25px;
                  font-size: 16px;
                  color: #fff;
                  height: 36px;
                  line-height: 36px;
                  display: block;
                }
              }
            }
          }
        }
      }
    }

    .product-detail {
      width: 1200px;
      //float: right;
      margin: 30px auto 0;
      //position: relative;
      //right: -700px;
      overflow: hidden;

      .aside {
        width: 210px;
        float: left;
        border: 1px solid #ccc;

        .tabWraped {
          height: 40px;

          h4 {
            border-top: 3px solid #fff;
            float: left;
            line-height: 37px;
            width: 105px;
            text-align: center;
            border-bottom: 1px solid #ccc;

            &.active {
              border-top: 3px solid #e1251b;
              border-bottom: 0;
              font-weight: normal;
            }
          }
        }

        .tabContent {
          padding: 10px;

          .tab-pane {
            display: none;

            &.active {
              display: block;
            }

            &:nth-child(1) {
              .partList {
                overflow: hidden;

                li {
                  width: 50%;
                  float: left;
                  border-bottom: 1px dashed #ededed;
                  line-height: 28px;
                }
              }

              .goodsList {
                & > li {
                  margin: 5px 0 15px;
                  border-bottom: 1px solid #ededed;
                  padding-bottom: 5px;

                  .list-wrap {
                    .p-img {
                      text-align: center;

                      img {
                        width: 152px;
                      }
                    }

                    .price {
                      font-size: 16px;
                      color: #c81623;
                    }

                    .operate {
                      text-align: center;
                      margin: 5px 0;

                      a {
                        background-color: transparent;
                        border: 1px solid #8c8c8c;
                        color: #8c8c8c;
                        display: inline-block;
                        padding: 2px 14px;
                        line-height: 18px;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      .detail {
        width: 1200px;
        float: right;

        .fitting {
          border: 1px solid #ddd;
          margin-bottom: 15px;

          .kt {
            border-bottom: 1px solid #ddd;
            background: #f1f1f1;
            color: #333;
            padding: 5px 0 5px 15px;
          }

          .good-suits {
            height: 170px;
            padding-top: 10px;

            .master {
              width: 127px;
              height: 165px;
              text-align: center;
              position: relative;
              float: left;

              img {
                width: 87px;
              }

              p {
                color: #c81623;
                font-size: 16px;
                font-weight: 700;
              }

              i {
                position: absolute;
                top: 48px;
                right: -25px;
                font-size: 16px;
              }
            }

            .suits {
              width: 668px;
              height: 165px;
              float: left;

              .suitsItem {
                float: left;
                width: 127px;
                padding: 0 20px;
                text-align: center;

                img {
                  width: 120px;
                  height: 130px;
                }

                p {
                  font-size: 12px;
                }

                label {
                  display: block;
                  position: relative;

                  input {
                    vertical-align: middle;
                  }

                  span {
                    vertical-align: middle;
                  }
                }
              }
            }

            .result {
              border-left: 1px solid #ddd;
              width: 153px;
              height: 165px;
              padding-left: 20px;
              float: left;

              .num {
                font-size: 14px;
                margin-bottom: 10px;
                margin-top: 10px;
              }

              .price-tit {
                font-weight: bold;
                margin-bottom: 10px;
              }

              .price {
                color: #b1191a;
                font-size: 16px;
                margin-bottom: 10px;
              }

              .addshopcar {
                background-color: #e1251b;
                border: 1px solid #e1251b;
                padding: 10px 25px;
                font-size: 16px;
                color: #fff;
                display: inline-block;
                box-sizing: border-box;
              }
            }
          }
        }

        .intro {
          .tab-wraped {
            background: #ededed;
            text-align: center;
            width: 100px;
            height: 40px;
            font: 30px "Microsoft YaHei";
            // border: 1px solid #ddd;
            overflow: hidden;

            li {
              float: left;

              & + li > a {
                border-left: 1px solid #ddd;
              }

              &.active {
                height: 40px;
                font-size: 20px;
                text-align: center;

                a {
                  // border: 0;
                  background: skyblue;
                  color: #fff;
                }
              }

              a {
                display: block;
                height: 40px;
                line-height: 40px;
                padding: 0 11px;
                text-align: center;
                color: #666;
                background: #fcfcfc;
                border-top: 1px solid #ddd;
                border-bottom: 1px solid #ddd;
              }
            }
          }

          .tab-content {
            .tab-pane {
              display: none;

              &.active {
                display: block;
              }

              &:nth-child(1) {
                .goods-intro {
                  padding-left: 10px;

                  li {
                    font: 12px/1.5 Tahoma, 'Microsoft Yahei', 'Simsun';
                    float: right;
                    //margin: 5px auto;
                    //background-color: #ffa000;
                    width: 700px;
                  }
                }

                .intro-detail {
                  img {
                    width: 100%;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>