<template>
    <body>
    <div class="container" v-bind:class="{'right-panel-active':change}">
        <!-- 注册 -->
        <div class="container_form container--signup">
            <el-form action="#" :model="user" status-icon :rules="rules" ref="user" class="form" id="form1">
                <h2 class="form_title">Sign Up</h2>
                <!--                    <input type="text" placeholder="User" class="input" v-model="user.username" />-->
                <!--                    <input type="email" placeholder="Email" class="input" v-model="user.email" />-->
                <!--                    <input type="password" placeholder="Password" class="input" v-model="user.password"  />-->
                <el-form-item prop="username">
                    <el-input placeholder="请输入账号" size="large" style="margin: 5px 0;width: 320px"
                              prefix-icon="el-icon-user" v-model="user.username"></el-input>
                </el-form-item>
                <el-form-item prop="email">
                    <el-input placeholder="请输入邮箱" size="large" style="margin: 5px 0;width: 320px" autocomplete="off"
                              prefix-icon="el-icon-message" v-model="user.email"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="请输入密码" size="large" style="margin: 5px 0;width: 320px" autocomplete="off"
                              prefix-icon="el-icon-lock" show-password v-model="user.password"></el-input>
                </el-form-item>
                <!--                                    <el-form-item label="密码" prop="pass">
                                                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="确认密码" prop="checkPass">
                                                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                                                    </el-form-item>-->
                <el-form-item prop="confirmPassword">
                    <el-input placeholder="请确认密码" size="large" style="margin: 5px 0;width: 320px"
                              prefix-icon="el-icon-lock" show-password autocomplete="off"
                              v-model="user.confirmPassword"></el-input>
                </el-form-item>
                <input type="button" class="btn" @click="register('user')" value="Sign Up">
<!--                </input>-->
            </el-form>
        </div>

        <!-- 登录 -->
        <div class="container_form container--signin">
            <el-form :model="user" status-icon :rules="rules" ref="user" class="form" id="form2">
                <h2 class="form_title">Sign In</h2>
                <el-form-item prop="username">
                    <el-input placeholder="请输入账号" size="large" style="margin: 5px 0;width: 320px"
                              prefix-icon="el-icon-user" v-model="user.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="请输入密码" size="large" style="margin: 5px 0;width: 320px" autocomplete="off"
                              prefix-icon="el-icon-lock" show-password v-model="user.password"></el-input>
                </el-form-item>
<!--                <input type="password" placeholder="Password" class="input" v-model="user.password"/>-->
                <a href="#" class="link">Forgot your password?</a>
                <input type="button" class="btn" @click="login" value="Sign In">
            </el-form>
        </div>

        <!-- 浮层 -->
        <div class="container_overlay">
            <div class="overlay">
                <div class="overlay_panel overlay--left">
                    <button class="btn" id="signIn" @click="rpa">Sign In</button>
                </div>
                <div class="overlay_panel overlay--right">
                    <button class="btn" id="signUp" @click="addRpa">Sign Up</button>
                </div>
            </div>
        </div>
    </div>
    <!-- 背景 -->
    <div class="slidershow">
        <div class="slidershow--image" style="background-image: url('https://source.unsplash.com/Snqdjm71Y5s')"></div>
        <div class="slidershow--image" style="background-image: url('https://source.unsplash.com/5APj-fzKE-k')"></div>
        <div class="slidershow--image" style="background-image: url('https://source.unsplash.com/wnbBH_CGOYQ')"></div>
        <div class="slidershow--image" style="background-image: url('https://source.unsplash.com/OkTfw7fXLPk')"></div>
    </div>
    </body>
</template>

<script>
    // import '../../node_modules/normalize.css/normalize.css'
    // import "normalize.css"
    // import './css/style.css';
    import {setRouters} from "@/router";
    // import user from "@/views/User";
    export default {
        name: 'Login',
        data() {
            var checkEmail = (rule, value, callback) => {
                var regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (value === '') {
                    callback(new Error("邮箱不能为空"))
                } else if (regEmail.test(value)) {
                    callback();
                } else {
                    callback(new Error("请输入合法的验证码"));
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.user.confirmPassword !== '') {
                        this.$refs.user.validateField('confirmPassword');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                console.log(value)
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.user.password) {
                    console.log(value)
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                user: {
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {validator: validatePass, trigger: 'blur'},
                    ],
                    confirmPassword: [
                        {validator: validatePass2, trigger: 'blur'},
                    ],
                    email: [
                        {validator: checkEmail, trigger: "blur"},
                    ],
                },
                change: true,
            }
        },
        methods: {
            rpa() {
                this.change = false
            },
            addRpa() {
                this.change = true
            },
            login() {
                console.log(this.user)
                this.request.post("/user/login", this.user).then(res => {
                    if (res.code === '200') {
                        localStorage.setItem("user", JSON.stringify(res.data))//将用户信息存储到浏览器中
                        localStorage.setItem("token",JSON.stringify(res.data.token))
                        localStorage.setItem("menus",JSON.stringify(res.data.menus))
                        //动态设置当前用户的路由
                        setRouters()
                        this.$message.success("登录成功")
                        if (res.data.rolename==="ROLE_USER"){
                            this.$router.push("/front")
                        }else{
                            this.$router.push("/")
                        }


                    } else {
                        this.$message.error(res.msg)
                    }

                })
            },
            register(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const temp = {
                            username: '',
                            email: '',
                            password: '',
                        }
                        temp.email = this.user.email
                        temp.username = this.user.username
                        temp.password = this.user.password
                        this.request.post("/user/register", temp).then(res => {
                            if (res.code === '200') {

                                this.$message.success("注册成功请登录")
                            } else {
                                this.$message.error("注册失败")
                            }

                        })
                    } else {
                        this.$message.error("注册失败")
                        return false;
                    }
                });
                // console.log(this.user)

            }
        }

    };
</script>
<style lang="css" scoped>
    .form_title {
        font-weight: 300;
        margin: 0;
        margin-bottom: 1.25rem;
    }

    .link {
        color: #333;
        font-size: 0.9rem;
        margin: 1.5rem 0;
        text-decoration: none;
    }

    .container {
        background-color: #e9e9e9;
        border-radius: 0.7rem;
        box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
        0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
        height: 658px;
        /*//420px;*/
        overflow: hidden;
        position: relative;
        width: 758px;
    }

    .container {
        max-width: 758px;
    }

    .container_form {
        height: 100%;
        position: absolute;
        top: 0;
        transition: all 0.6s ease-in-out;
    }

    .container--signin {
        left: 0;
        width: 50%;
        z-index: 5;
    }

    .container.right-panel-active .container--signin {
        transform: translateX(100%);
    }

    .container--signup {
        left: 0;
        opacity: 0;
        width: 50%;
        z-index: 4;
    }

    .container.right-panel-active .container--signup {
        -webkit-animation: show 0.6s;
        animation: show 0.6s;
        opacity: 1;
        transform: translateX(100%);
        z-index: 8;
    }

    .container_overlay {
        height: 100%;
        left: 50%;
        overflow: hidden;
        position: absolute;
        top: 0;
        transition: transform 0.6s ease-in-out;
        width: 50%;
        z-index: 100;
    }

    .container.right-panel-active .container_overlay {
        transform: translateX(-100%);
    }

    .overlay {
        background-color: rgba(255, 255, 255, 0.25);
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 100%;
        left: -100%;
        position: relative;
        transform: translateX(0);
        transition: transform 0.6s ease-in-out;
        width: 200%;
    }

    .container.right-panel-active .overlay {
        transform: translateX(50%);
    }

    .overlay_panel {
        align-items: center;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        position: absolute;
        text-align: center;
        top: 0;
        transform: translateX(0);
        transition: transform 0.6s ease-in-out;
        width: 50%;
    }

    .overlay--left {
        transform: translateX(-20%);
    }

    .container.right-panel-active .overlay--left {
        transform: translateX(0);
    }

    .overlay--right {
        right: 0;
        transform: translateX(0);
    }

    .container.right-panel-active .overlay--right {
        transform: translateX(20%);
    }

    .btn {
        background-color: #095c91;
        background-image: linear-gradient(90deg, #095c91 0%, #0393a3 74%);
        border-radius: 20px;
        border: 0.2px solid #315a7491;
        color: #e9e9e9;
        cursor: pointer;
        font-size: 0.8rem;
        font-weight: bold;
        letter-spacing: 0.1rem;
        padding: 0.9rem 4rem;
        text-transform: uppercase;
        transition: transform 80ms ease-in;
    }

    .form > .btn {
        margin-top: 1.5rem;
    }

    .btn:active {
        transform: scale(0.95);
    }

    .btn:focus {
        outline: none;
    }

    .form {
        background-color: #e9e9e9;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0 3rem;
        height: 100%;
        text-align: center;
    }

    .input {
        background-color: #fff;
        border: none;
        padding: 0.9rem 0.9rem;
        margin: 0.5rem 0;
        width: 100%;
    }

    @-webkit-keyframes show {
        0%,
        49.99% {
            opacity: 0;
            z-index: 4;
        }

        50%,
        100% {
            opacity: 1;
            z-index: 8;
        }
    }

    @keyframes show {
        0%,
        49.99% {
            opacity: 0;
            z-index: 4;
        }

        50%,
        100% {
            opacity: 1;
            z-index: 8;
        }
    }


    .slidershow {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }

    .slidershow--image {
        position: absolute;
        width: 100%;
        height: 100%;
        background: no-repeat 50% 50%;
        background-size: cover;
        -webkit-animation-name: kenburns;
        animation-name: kenburns;
        -webkit-animation-timing-function: linear;
        animation-timing-function: linear;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        -webkit-animation-duration: 16s;
        animation-duration: 16s;
        opacity: 1;
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
    }

    .slidershow--image:nth-child(1) {
        -webkit-animation-name: kenburns-1;
        animation-name: kenburns-1;
        z-index: 3;
    }

    .slidershow--image:nth-child(2) {
        -webkit-animation-name: kenburns-2;
        animation-name: kenburns-2;
        z-index: 2;
    }

    .slidershow--image:nth-child(3) {
        -webkit-animation-name: kenburns-3;
        animation-name: kenburns-3;
        z-index: 1;
    }

    .slidershow--image:nth-child(4) {
        -webkit-animation-name: kenburns-4;
        animation-name: kenburns-4;
        z-index: 0;
    }

    @-webkit-keyframes kenburns-1 {
        0% {
            opacity: 1;
            -webkit-transform: scale(1.2);
            transform: scale(1.2);
        }
        1.5625% {
            opacity: 1;
        }
        23.4375% {
            opacity: 1;
        }
        26.5625% {
            opacity: 0;
            -webkit-transform: scale(1);
            transform: scale(1);
        }
        100% {
            opacity: 0;
            -webkit-transform: scale(1.2);
            transform: scale(1.2);
        }
        98.4375% {
            opacity: 0;
            -webkit-transform: scale(1.21176);
            transform: scale(1.21176);
        }
        100% {
            opacity: 1;
        }
    }

    @keyframes kenburns-1 {
        0% {
            opacity: 1;
            -webkit-transform: scale(1.2);
            transform: scale(1.2);
        }
        1.5625% {
            opacity: 1;
        }
        23.4375% {
            opacity: 1;
        }
        26.5625% {
            opacity: 0;
            -webkit-transform: scale(1);
            transform: scale(1);
        }
        100% {
            opacity: 0;
            -webkit-transform: scale(1.2);
            transform: scale(1.2);
        }
        98.4375% {
            opacity: 0;
            -webkit-transform: scale(1.21176);
            transform: scale(1.21176);
        }
        100% {
            opacity: 1;
        }
    }

    @-webkit-keyframes kenburns-2 {
        23.4375% {
            opacity: 1;
            -webkit-transform: scale(1.2);
            transform: scale(1.2);
        }
        26.5625% {
            opacity: 1;
        }
        48.4375% {
            opacity: 1;
        }
        51.5625% {
            opacity: 0;
            -webkit-transform: scale(1);
            transform: scale(1);
        }
        100% {
            opacity: 0;
            -webkit-transform: scale(1.2);
            transform: scale(1.2);
        }
    }

    @keyframes kenburns-2 {
        23.4375% {
            opacity: 1;
            -webkit-transform: scale(1.2);
            transform: scale(1.2);
        }
        26.5625% {
            opacity: 1;
        }
        48.4375% {
            opacity: 1;
        }
        51.5625% {
            opacity: 0;
            -webkit-transform: scale(1);
            transform: scale(1);
        }
        100% {
            opacity: 0;
            -webkit-transform: scale(1.2);
            transform: scale(1.2);
        }
    }

    @-webkit-keyframes kenburns-3 {
        48.4375% {
            opacity: 1;
            -webkit-transform: scale(1.2);
            transform: scale(1.2);
        }
        51.5625% {
            opacity: 1;
        }
        73.4375% {
            opacity: 1;
        }
        76.5625% {
            opacity: 0;
            -webkit-transform: scale(1);
            transform: scale(1);
        }
        100% {
            opacity: 0;
            -webkit-transform: scale(1.2);
            transform: scale(1.2);
        }
    }

    @keyframes kenburns-3 {
        48.4375% {
            opacity: 1;
            -webkit-transform: scale(1.2);
            transform: scale(1.2);
        }
        51.5625% {
            opacity: 1;
        }
        73.4375% {
            opacity: 1;
        }
        76.5625% {
            opacity: 0;
            -webkit-transform: scale(1);
            transform: scale(1);
        }
        100% {
            opacity: 0;
            -webkit-transform: scale(1.2);
            transform: scale(1.2);
        }
    }

    @-webkit-keyframes kenburns-4 {
        73.4375% {
            opacity: 1;
            -webkit-transform: scale(1.2);
            transform: scale(1.2);
        }
        76.5625% {
            opacity: 1;
        }
        98.4375% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }

    @keyframes kenburns-4 {
        73.4375% {
            opacity: 1;
            -webkit-transform: scale(1.2);
            transform: scale(1.2);
        }
        76.5625% {
            opacity: 1;
        }
        98.4375% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }

    body {
        align-items: center;
        background-color: #e9e9e9;
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        display: grid;
        height: 100vh;
        place-items: center;
    }
</style>

