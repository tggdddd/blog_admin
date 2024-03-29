import api from '@/api'

import useRouteStore from './route'
import useMenuStore from './menu'
import apiUrl from '@/api/url'
const useUserStore = defineStore(
    // 唯一ID
    'user',
    {
        state: () => ({
            account: localStorage.account || '',
            token: localStorage.token || '',
            failure_time: localStorage.failure_time || '',
            permissions: []
        }),
        getters: {
            isLogin: state => {
                let retn = false
                if (state.token) {
                    if (new Date().getTime() < state.failure_time * 1000) {
                        retn = true
                    }
                }
                return retn
            }
        },
        actions: {
            login(data) {
                return new Promise((resolve, reject) => {
                    // 通过 mock 进行登录
                    api.post(apiUrl.login, data, {
                        // baseURL: '/mock/'
                    }).then(res => {
                        if (res.code == '200') {
                            localStorage.setItem('account', res.data.account)
                            localStorage.setItem('token', res.data.token)
                            localStorage.setItem('failure_time', res.data.failure_time)
                            this.account = res.data.account
                            this.token = res.data.token
                            this.failure_time = res.data.failure_time
                        } else {
                            // ElMessage.error(error.msg)
                            reject(res)
                            return
                        }
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })
            },
            logout() {
                return new Promise(resolve => {
                    const routeStore = useRouteStore()
                    const menuStore = useMenuStore()
                    localStorage.removeItem('account')
                    localStorage.removeItem('token')
                    localStorage.removeItem('failure_time')
                    this.account = ''
                    this.token = ''
                    this.failure_time = ''
                    routeStore.removeRoutes()
                    menuStore.setActived(0)
                    resolve()
                })
            },
            // 获取我的权限
            getPermissions() {
                return new Promise(resolve => {
                    // 通过 mock 获取权限
                    api.get('member/permission', {
                        baseURL: '/mock/',
                        params: {
                            account: this.account
                        }
                    }).then(res => {
                        this.permissions = res.data.permissions
                        resolve(res.data.permissions)
                    })
                })
            },
            editPassword(data) {
                return new Promise((resolve, reject) => {
                    api.post(apiUrl.editPassword, {
                        account: this.account,
                        password: data.password,
                        newpassword: data.newpassword
                    }).then(response => {
                        resolve(response)
                    }).catch(
                        error => {
                            reject(error)
                        }
                    )
                })
            }
        }
    }
)

export default useUserStore
