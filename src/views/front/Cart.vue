<template>
    <div>
        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 1000px; margin: 0 auto;color: #8c939d;min-height: 450px"
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
                    label="报名状态"
                    width="180">
                未报名
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
                    <el-button type="primary" @click="payOne(scope.row.id,scope.row.expense)">支付</el-button>
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
        <div class="cart">
            <div class="cart-tool">
                <div class="select-all">
                    <el-button @click="toggleSelection(tableData)">全选</el-button>
                    <el-button @click="toggleSelection()">取消选择</el-button>
                </div>
                <div class="option">
                    <el-button type="warning" @click="delBatch">删除选中的报名</el-button>
                </div>
                <div class="option">
                    <el-button type="warning" @click="change">点击切换资格证或竞赛预报名</el-button>
                </div>
                <div class="money-box">
                    <div class="chosed">已选择
                        <span>0</span>件商品</div>
                    <div class="sumprice">
                        <em>总价（不含运费） ：</em>
                        <i class="summoney">{{total}}</i>
                    </div>
                    <div class="sumbtn">
                        <el-button  type="danger" style="height: 48px;width: 90px" @click="sumTotal" class="sum-btn">结算</el-button>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import user from "@/views/User";

    export default {
        data() {
            return {
                tableData: [],
                multipleSelection: [],
                user:localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")):{},
                total:0,
                flag:false
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
                        // console.log(res.data[0])
                        if (res.code === '200') {
                            this.tableData=res.data[0].exams
                            // console.log("***********************************************************")
                            // console.log(this.tableData)
                        }
                    })
                }
            },
            loadCompetition(){
                this.request.get("/sign/prepayII",{
                    params: {
                        userId: this.user.id,
                    }
                }).then(res => {
                    console.log(res)
                    if (res.code === '200') {
                        this.tableData=res.data[0].competitions
                        this.tableData.forEach((val)=>{
                            val.examName=val.name
                        })
                        console.log("***********************************************************")
                        console.log(this.tableData)
                    }
                })
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
            },
            delBatch() {
                let ids = this.multipleSelection.map(v => v.id)  //建一个对象的数组转为一个类似于[1,2,3]的数字
                console.log(ids)
                this.request.post("/sign/del/batch",ids).then(res => {
                    if (res.code==='200') {
                        this.$message.success("批量删除成功")
                        this.load()
                    } else {
                        this.$message.error("批量删除失败")
                    }
                })
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            payOne(id,total){
                // console.log(id)
                // console.log(total)
                this.request.get("/form/"+ this.user.id).then(res => {
                    if (res.data === null) {
                        this.$message.success("请先填写报名基本信息")
                        this.$router.push("/form")
                    } else {
                        this.$router.push({
                            name:'Pay',
                            params:{
                                examId:id,
                                total:total
                            }
                        })
                    }
                })

            },
            sumTotal(){
                // console.log(this.multipleSelection.map(v => v.id))
                this.request.get("/form/"+ this.user.id).then(res => {
                    if (res.data === null) {
                        this.$message.success("请先填写报名基本信息")
                        this.$router.push("/form")
                    } else {
                        this.$router.push({
                            name:'Pay',
                            params:{
                                examId:this.multipleSelection.map(v => v.id),
                                total:this.total,
                            }
                        })
                    }
                })

            },
            change(){
                this.flag=!this.flag
                if (this.flag==false){
                    this.load();
                }else {
                    this.loadCompetition();
                }
            }
        },
        watch:{
            multipleSelection:{
                handler(newVal,oldVal){
                    this.total=0
                    newVal.forEach(row=>{
                        this.total+=row.expense
                    })
                }
            }
        }
    }
</script>

<style scoped lang="less">

  .cart {
    width: 1000px;
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
      //position: absolute;
      //bottom: 0px;
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
  }
</style>