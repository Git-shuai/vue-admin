import cookie from "cookie_js";

const adminToken="admin_toKen";
const username="vue_admin_username";
const password="vue_admin_password";
const isCollapse="isCollapse";

export function getToken() {
    return cookie.get(adminToken);
}

export function setToken(token) {
    return cookie.set(adminToken,token);
}

export function removeToken() {
    return cookie.remove(adminToken);
}

export function setUsername(value) {
    return cookie.set(username,value);
}

export function getUsername() {
    return cookie.get(username);
}

export function removeUsername() {
    return cookie.remove(username);
}

export function setPassword(value) {
    return cookie.set(password,value);
}

export function getPassword() {
    return cookie.get(password);
}

export function removePassword() {
    return cookie.remove(password);
}


export function getIsCollapse() {
    return cookie.get(isCollapse) === 'true';

}

export function setIsCollapse(value) {
    return cookie.set(isCollapse,JSON.stringify(value));
}

export function removeIsCollapse() {
    return cookie.remove(isCollapse);
}
