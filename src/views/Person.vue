<!--<template>
    <el-card style="width: 500px;">
        <el-form label-width="80px" size="small" >
            <el-upload
                    class="avatar-uploader"
                    action="http://localhost:9090/file/upload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
            >
                <img v-if="form.avatarUrl" :src="form.avatarUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-form-item label="用户名">
                <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="账户余额">
                <el-input v-model="form.money" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="账户余额">
                <el-input v-model="form.nickname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">确 定</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
                form: {
                    /*id: null,
                    username: null,
                    phone: null,
                    email: null,
                    money: null,
                    roleid: null,
                    nickname:null,
                    address:null,
                    avatarUrl:null,
                    age:null,
                    sex:null,
                    birth:null,
                    hobby:null,*/
                },
                user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
            }
        },
        created() {
            this.request.get("/user/person/" + this.user.username).then(res => {
                if (res.code === '200') {
                    this.form = res.data
                }
            })
        },
        methods: {
            async getUser() {
                return (await this.request.get("/user/username/" + this.user.username)).data
            },
            save() {
                this.request.post("/user/insert", this.form).then(res => {
                    if (res) {
                        this.$message.success("保存成功")

                        // 更新浏览器存储的用户信息
                        this.getUser().then(res => {
                            res.token = JSON.parse(localStorage.getItem("user")).token
                            localStorage.setItem("user", JSON.stringify(res))
                        })

                    } else {
                        this.$message.error("保存失败")
                    }
                })
            },
            handleAvatarSuccess(res) {
                this.form.avatarUrl = res
            },
        },
    }
</script>

<style scoped>
    .avatar-uploader {
        text-align: center;
        padding-bottom: 10px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 138px;
        height: 138px;
        line-height: 138px;
        text-align: center;
    }

    .avatar {
        width: 138px;
        height: 138px;
        display: block;
    }
</style>-->

<template>
    <div>
        <el-card style="width: 500px;">
            <el-form label-width="80px" size="small">
                <el-upload
                        class="avatar-uploader"
                        action="http://localhost:9090/file/upload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :headers="myHeaders"
                >
                    <img v-if="form.avatarUrl" :src="form.avatarUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-form-item label="用户名">
                    <el-input v-model="form.username" disabled autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="账户余额">
                    <el-input v-model="form.money" disabled autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="form.nickname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="save">确 定</el-button>
                    <el-button type="primary" @click="payMoney">充值余额</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <!--        <el-dialog title="充值信息" :visible.sync="vis" width="30%">
                    <el-form border stripe>
                        <el-form-item>
                            <el-input maxlength="20"
                                      style="width: 300px"
                                      v-model="money"
                                      placeholder="请输入金额"
                                      oninput="value=value.replace(/\D/g, '').replace(/^0{1,}/g, '')"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="payMoney">确定</el-button>
                            <el-button @click="vis=false">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>-->
        <el-dialog :title="paySucc?'支付成功':'扫码支付'" :visible.sync="dialogVisible" width="16%" center>
            <!-- 生成二维码图片 -->
            <vueQr :text="text" :size="200" v-if="!paySucc"></vueQr>
            <!-- 使用websocket监控是否扫描，扫描成功显示成功并退出界面 -->
            <span class="iconfont icon-success"
                  style="position: relative;font-size: 100px;color:#42B983;margin-left: 50px;top:-10px;" v-else></span>
        </el-dialog>
    </div>

</template>

<script>

    import vueQr from 'vue-qr'
    import axios from "axios";

    export default {
        name: "person",

        data() {
            return {
                form: {
                    /*id: null,
                    username: null,
                    phone: null,
                    email: null,
                    money: null,
                    roleid: null,
                    nickname:null,
                    address:null,
                    avatarUrl:null,
                    age:null,
                    sex:null,
                    birth:null,
                    hobby:null,*/
                },
                user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
                myHeaders: {token: JSON.parse(localStorage.getItem("token"))},
                vis: false,
                money: null,
                dialogVisible: false,
                text: "",
                paySucc: false
            }
        },
        components: {
            vueQr
        },
        created() {

            this.request.get("/user/person/" + this.user.username).then(res => {
                if (res.code === '200') {
                    this.form = res.data
                }
            })
        },
        methods: {
            async getUser() {
                return (await this.request.get("/user/username/" + this.user.username)).data
            },
            save() {
                this.request.post("/user/insert", this.form).then(res => {
                    if (res) {
                        this.$message.success("保存成功")

                        //触发父级更新user的方法
                        this.$emit("refreshUser")

                        // 更新浏览器存储的用户信息
                        this.getUser().then(res => {
                            res.token = JSON.parse(localStorage.getItem("user")).token
                            localStorage.setItem("user", JSON.stringify(res))
                        })

                    } else {
                        this.$message.error("保存失败")
                    }
                })
            },
            handleAvatarSuccess(res) {
                this.form.avatarUrl = res
            },
            pay() {
                this.vis = true
            },
            payMoney() {
                let _this = this;
                _this.paySucc = false;
                _this.dialogVisible = true;
                axios.request("http://localhost:9090/createQR",{
                    headers:{
                        token:JSON.parse(localStorage.getItem("token"))
                    }
                })
                    .then((response) => {
                        console.log("---------+++++++++++++++++++++++++-------------------")
                        console.log(response)
                        _this.text = response.data;
                        _this.dialogVisible = true;
                        //使用webSocket发送请求，下面会简单介绍websocket使用
                        if ("WebSocket" in window) {
                            // 打开一个 web socket
                            var ws = new WebSocket("ws://localhost:9090/bindingRecord");

                            ws.onopen = function () {
                                // Web Socket 已连接上，使用 send() 方法发送数据
                                // ws.send("data");
                                // alert("数据发送中...");
                            };

                            ws.onmessage = function (evt) {
                                var received_msg = evt.data;
                                // alert("数据已接收..." + evt.data);
                                if (Boolean(evt.data)) {
                                    _this.paySucc = true;
                                    //触发父级更新user的方法
                                    this.$emit("refreshUser")
                                    // 更新浏览器存储的用户信息
                                    this.getUser().then(res => {
                                        res.token = JSON.parse(localStorage.getItem("user")).token
                                        localStorage.setItem("user", JSON.stringify(res))
                                    })
                                    setTimeout(() => {
                                        _this.dialogVisible = false;
                                    }, 3 * 1000);
                                }
                                ws.close();

                            };

                            ws.onclose = function () {
                                // // 关闭 websocket
                                console.log("连接已关闭...");
                            };
                        } else {
                            // 浏览器不支持 WebSocket
                            alert("您的浏览器不支持 WebSocket!");
                        }
                    }).catch((err) => {
                    console.log(err)
                })
            },
            back(dataUrl, id) {
                console.log(dataUrl, id)
            }

        },
        mounted() {
            console.log(localStorage.getItem("token"))
            // this.myHeaders = JSON.parse(localStorage.getItem("token"))
            // console.log(this.myHeaders)
        }
    }
</script>

<style scoped>
    .avatar-uploader {
        text-align: center;
        padding-bottom: 10px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 138px;
        height: 138px;
        line-height: 138px;
        text-align: center;
    }

    .avatar {
        width: 138px;
        height: 138px;
        display: block;
    }
</style>