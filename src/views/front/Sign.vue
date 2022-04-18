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
                    width="180">
            </el-table-column>

            <el-table-column
                    prop="expense"
                    label="报名费用"
                    width="180"
            >
            </el-table-column>
            <el-table-column

                    label="报名状态"
                    width="80"
            >
                已报名
            </el-table-column>
            <el-table-column
                    prop="end"
                    label="开始时间"
                    show-overflow-tooltip
            >
            </el-table-column>
        </el-table>
        <el-button type="danger" style="position: relative;left: 700px" size="big" @click="change">点击切换已报资格证或竞赛
        </el-button>
    </div>
</template>

<script>
    export default {
        name: "Sign",
        data() {
            return {
                tableData: [],
                multipleSelection: [],
                user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
                total: 0,
                flag: false
            }
        },
        created() {
            this.load()
        },
        methods: {
            load() {
                if (this.user == {}) {
                    this.$router.push("/login")
                    this.$message.error("请登录")
                } else {
                    this.request.get("/sign/dopay", {
                        params: {
                            userId: this.user.id,
                        }
                    }).then(res => {
                        // console.log(res.data[0])
                        if (res.code === '200') {
                            this.tableData = res.data[0].exams
                        }
                    })
                }
            },
            loadPayCompetition() {
                this.request.get("/sign/payCompetition", {
                    params: {
                        userId: this.user.id,
                    }
                }).then(res => {
                    console.log(res)
                    if (res.code === '200') {
                        this.tableData = res.data[0].competitions
                        console.log(this.tableData)
                        this.tableData.forEach((val)=>{
                            val.examName=val.name
                        })
                    }
                })
            },
            handleSelectionChange(val) {
                // this.total=0
                // if (this.multipleSelection){
                //     this.multipleSelection.forEach(row => {
                //         this.total+=row.expense
                //     });
                // }
                this.multipleSelection = val;
            },
            headClass() {
                return 'text-align: center;background:#f5f5f5;'
            },
            rowClass() {
                return 'text-align: center;'
            },
            del(id) {
                console.log(id)
                this.request.delete("/sign/del", {
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
                this.request.post("/user/batchdel", this.user.id, ids).then(res => {
                    if (res) {
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
            change() {
                this.flag = !this.flag
                if (this.flag) {
                    this.load()
                } else {
                    this.loadPayCompetition()
                }
            },
        },
    };

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