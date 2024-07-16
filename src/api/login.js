
// 登录方法

import axios from 'axios';

export function login(username, password, code, uuid) {
    return axios.post('/login', {
        data: { username, password, code, uuid }
    })
        .then(response => response.data)
        .catch(error => {
            console.error('查询星级酒店列表失败:', error);
            throw error;
        });
}

// 注册方法
export function register(data) {
    return axios.post('/register', {
        data: data
    })
        .then(response => response.data)
        .catch(error => {
            console.error('查询星级酒店列表失败:', error);
            throw error;
        });
}


// 获取用户详细信息
export function getInfo() {
    return axios.get('/system/user/getInfo')
        .then(response => response.data)
        .catch(error => {
            console.error('查询星级酒店列表失败:', error);
            throw error;
        });
}

// 退出方法
export function logout() {
    return axios.delete('/logout')
        .then(response => response.data)
        .catch(error => {
            console.error('查询星级酒店列表失败:', error);
            throw error;
        });
}

// 获取验证码
export function getCodeImg() {
    return axios.get('/code', {
        timeout: 20000
    })
        .then(response => response.data)
        .catch(error => {
            console.error('验证码获取失败:', error);
            throw error;
        });
}