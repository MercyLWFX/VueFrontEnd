const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    /*devServer: {
        proxy: {
            '/user': {//请求前缀,放在端口号的前端
                target: 'http://localhost:9090',//转发地址
            },
            '/file': {//请求前缀,放在端口号的前端
                target: 'http://localhost:9090',//转发地址
            },
            '/echarts': {//请求前缀,放在端口号的前端
                target: 'http://localhost:9090',//转发地址
            },
            '/menu': {//请求前缀,放在端口号的前端
                target: 'http://localhost:9090',//转发地址
            },
            '/role': {//请求前缀,放在端口号的前端
                target: 'http://localhost:9090',//转发地址
            },
        }
    }*/
})
