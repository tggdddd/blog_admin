import axios from 'axios'
import qs from 'qs'
import router from '@/router/index'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'

const toLogin = () => {
    useUserStore().logout().then(() => {
        router.push({
            name: 'login',
            query: {
                redirect: router.currentRoute.value.path !== '/login' ? router.currentRoute.value.fullPath : undefined
            }
        })
    })
}

const api = axios.create({
    baseURL: import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY === 'true' ? '/proxy/' : import.meta.env.VITE_APP_API_BASEURL,
    timeout: 10000,
    responseType: 'json'
})

api.interceptors.request.use(
    request => {
        const userStore = useUserStore()
        /**
         * 全局拦截请求发送前提交的参数
         * 以下代码为示例，在请求头里带上 token 信息
         */
        if (userStore.isLogin) {
            request.headers['Token'] = userStore.token
        }
        // 是否将 POST 请求参数进行字符串化处理
        if (request.method === 'post') {
            request.data = qs.stringify(request.data, {
                arrayFormat: 'brackets'
            })
        }
        return request
    }
)

api.interceptors.response.use(
    response => {
        /**
         * 全局拦截请求发送后返回的数据，如果数据有报错则在这做全局的错误提示
         * 返回数据格式为：{ code: '', ,msg: '', data: '' }
         * 规则是当 code 为 200 时表示请求成功，为 999 时表示接口需要登录或者登录状态失效，需要重新登录
         * 请求出错时 msg 会返回错误信息
         */
        // console.log("拦截回显：",response.data.code===200)
        // 返回的是字符串形式   ===会falsexx
        if (response.data.code == '000' || response.data.code == '321') {
            // if (response.data.error === '') {
            // 请求成功并且没有报错
            // console.log("拦截的返回为",response)
            toLogin()
            // } else {
            // 这里做错误提示
            // ElMessage.error(options)
            // return Promise.reject(response.data)
            // }
        } else {
            return Promise.resolve(response.data)
        }
    },
    error => {
        let message = error.data.msg
        // if (message == 'Network Error') {
        //     message = '后端网络故障'
        // } else if (message.includes('timeout')) {
        //     message = '接口请求超时'
        // } else if (message.includes('Request failed with status code')) {
        //     message = '接口' + message.substr(message.length - 3) + '异常'
        // }
        ElMessage({
            message,
            type: 'error'
        })
        return Promise.reject(error)
    }
)

export default api
