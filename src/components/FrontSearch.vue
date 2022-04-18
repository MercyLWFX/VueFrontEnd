<template>
    <header class="header">
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link to="/front/home" class="logo">
                    <img src="../assets/syslogo.png" alt=""/>
                </router-link>
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input
                            type="text"
                            id="autocomplete"
                            class="input-error input-xxlarge"
                            v-model="keyword"
                    />
                    <button
                            class="sui-btn btn-xlarge btn-danger"
                            type="button"
                            @click="goSearch"
                    >
                        搜索
                    </button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        data() {
            return {
                keyword: ""
            }
        },
        methods: {
            //搜索按钮的事件处理函数，用于跳转到search路由组件当中
            goSearch() {
                //代表的是如果有query参数也带过去
                if (this.$route.query) {
                    let loction = {
                        name: "search",
                        params: { keyword: this.keyword || undefined },
                    };
                    loction.query = this.$route.query;
                    this.$router.push(loction);
                }
            },
        },
        mounted() {
            //    通过全局事件总线清除关键字
            // this.$bus.$on("clear",()=>{
            //     this.keyword='';
            // })
        }
    };
</script>

<style lang="less" scoped>
  .sysTitle {
    // font-size: 20px;
    color: #36b7ea;
  }

  .header {
    & > .top {
      background-color: #eaeaea;
      height: 30px;
      line-height: 30px;

      .container {
        width: 1200px;
        //width: 600px;
        margin: 0 auto;
        overflow: hidden;

        .loginList {
          float: left;

          p {
            float: left;
            margin-right: 10px;

            .register {
              border-left: 1px solid #b3aeae;
              padding: 0 5px;
              margin-left: 5px;
            }
          }
        }

        .typeList {
          float: right;

          a {
            padding: 0 10px;

            & + a {
              border-left: 1px solid #b3aeae;
            }
          }
        }
      }
    }

    & > .bottom {
      width: 1200px;
      //width: 600px;
      margin: 0 auto;
      overflow: hidden;

      .logoArea {
        float: left;

        .logo {
          img {
            position: relative;
            top: -50px;
            width: 145px;
            margin: 25px 45px;
          }
        }
      }

      .searchArea {
        float: right;
        margin-top: 35px;

        .searchForm {
          overflow: hidden;

          input {
            box-sizing: border-box;
            width: 490px;
            height: 32px;
            padding: 0px 4px;
            border: 2px solid #36b7ea;
            float: left;

            &:focus {
              outline: none;
            }
          }

          button {
            height: 32px;
            width: 68px;
            background-color: #36b7ea;
            border: none;
            color: #fff;
            float: left;
            cursor: pointer;

            &:focus {
              outline: none;
            }
          }
        }
      }
    }
  }
</style>