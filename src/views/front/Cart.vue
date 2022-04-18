<template>
    <!-- 购物车列表 -->
<!--    <div class="cart">

        <h4>全部商品</h4>
        <div class="cart-main">
            <div class="cart-th">
                <div class="cart-th1">全部</div>
                <div class="cart-th2">商品</div>
                <div class="cart-th3">单价（元）</div>
&lt;!&ndash;                <div class="cart-th5">小计（元）</div>&ndash;&gt;
                <div class="cart-th6">操作</div>
            </div>
            <div class="cart-body">
                <ul class="cart-list" v-for="item in tableData" :key="item.id">
                    <li class="cart-list-con1">
                        <input type="checkbox" name="chk_list">
                    </li>
                    <li class="cart-list-con2">
                        <img :src="item.imgurl">
                    </li>
                    <li class="cart-list-con3">
                        <div class="item-msg">{{item.examName}}</div>
                    </li>

                    <li class="cart-list-con4">
                        <span class="price">{{item.expense}}</span>
                    </li>
&lt;!&ndash;                    <li class="cart-list-con5">
                        <a href="javascript:void(0)" class="mins">-</a>
                        <input autocomplete="off" type="text" value="1" minnum="1" class="itxt">
                        <a href="javascript:void(0)" class="plus">+</a>
                    </li>&ndash;&gt;
&lt;!&ndash;                    <li class="cart-list-con6">
                        <span class="sum">399</span>
                    </li>&ndash;&gt;
                    <li class="cart-list-con7">
                        <a href="#none" class="sindelet">删除</a>
                        <br>
                        <a href="#none">移到收藏</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="cart-tool">
            <div class="select-all">
                <el-checkbox>全选</el-checkbox>
            </div>
&lt;!&ndash;            <el-table-column&ndash;&gt;
&lt;!&ndash;                    class="select-all"&ndash;&gt;
&lt;!&ndash;                    type="selection"&ndash;&gt;
&lt;!&ndash;                    width="55">&ndash;&gt;
&lt;!&ndash;            </el-table-column>&ndash;&gt;
            <div class="option">
                <a href="#none">删除选中的报名</a>
                <a href="#none">移到我的关注</a>
                <a href="#none">清除下柜商品</a>
            </div>
            <div class="money-box">
                <div class="chosed">已选择
                    <span>0</span>件商品
                </div>
                <div class="sumprice">
                    <em>总价（不含运费） ：</em>
                    <i class="summoney">0</i>
                </div>
                <div class="sumbtn">
                    <a class="sum-btn" href="###" target="_blank">结算</a>
                </div>
            </div>
        </div>
    </div>-->
    <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 1000px; margin: 0 auto;color: #8c939d;height: 450px"
            :header-cell-style="headClass"
            :cell-style="rowClass"
            @selection-change="handleSelectionChange">
        <el-table-column
                type="selection"
                width="55">
        </el-table-column>
        <el-table-column
                label="预报考内容"
                prop="imgurl"
                width="120"
        >
            <template slot-scope="scope">
                <img style="width: 100px;height: 100px;float: left;" :src="scope.row.imgurl" alt="">
            </template>
        </el-table-column>
        <el-table-column
                prop="examName"
                label="报考名称"
                width="280">
        </el-table-column>

        <el-table-column
                prop="expense"
                label="报名费用"
                width="180"
        >
        </el-table-column>
        <el-table-column
                label="操作"
                show-overflow-tooltip>
            <template slot-scope="scope">
                <el-button type="primary">支付</el-button>
                <el-popconfirm
                        class="ml-5"
                        confirm-button-text='确定吗'
                        cancel-button-text='再想想'
                        icon="el-icon-info"
                        icon-color="red"
                        title="您确定删除吗？"
                        @confirm="del(scope.row.id)"
                >
                    <el-button type="danger" slot="reference">删除 <i class="el-icon-remove-outline"></i>
                    </el-button>
                </el-popconfirm>
            </template>


        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                multipleSelection: [],
                user:localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")):{},
            }
        },
        created() {
            this.load()
        },

        methods: {
            load(){
                if (this.user=={}){
                    this.$router.push("/login")
                    this.$message.error("请登录")
                }else {
                    this.request.get("/sign/prepay",{
                        params: {
                            userId: this.user.id,
                        }
                    }).then(res => {
                        console.log(res.data[0])
                        if (res.code === '200') {
                            this.tableData=res.data[0].exams
                        }
                    })
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            headClass () {
                return 'text-align: center;background:#f5f5f5;'
            },
            rowClass () {
                return 'text-align: center;'
            },
            del(id){
                console.log(id)
                this.request.delete("/sign/del",{
                    params: {
                        userId: this.user.id,
                        examId: id
                    }
                }).then(res => {
                    console.log(res)
                    if (res.code === '200') {
                        this.$message.success("您已经取消这次预报名")
                        this.load()
                    }
                })
            }
        }
    }
</script>

<style scoped lang="css">
  .el-table th.gutter {

    display: table-cell !important;

  }
  /*.cart {
    width: 1200px;
    margin: 0 auto;
    margin-bottom: 100px;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        & > div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3, .cart-th4, .cart-th5, .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          & > li {
            float: left;
          }

          .cart-list-con1 {
            width: 4.1667%;
          }

          .cart-list-con2 {
            width: 25%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con3 {
            width: 20.8333%;

            .item-txt {
              text-align: center;
            }
          }

          .cart-list-con4 {
            width: 12.5%;

          }

          .cart-list-con5 {
            width: 12.5%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 12.5%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 12.5%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }*/
</style>