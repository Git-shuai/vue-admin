import Vue from "vue";
import VueRouter from "vue-router";
//引入组件
import Layout from "@/views/layout";

Vue.use(VueRouter);



const routes = [
    {
        path: "/",
        redirect: "login",
        hidden: true,
        meta: {
            name: "主页"
        },
    },
    {
        path: "/login",
        name: "Login",
        hidden: true,
        meta: {
            name: "登录"
        },
        component: () => import("../views/login/index.vue")
    },
    {
        path: "/console",
        name: "Console",
        redirect: "index",
        meta: {
            name: "控制台",
            icon: "console"
        },
        component: Layout,
        children: [
            {
                path: "/index",
                name: "Index",
                meta: {
                    name: "首页"
                },
                component: () => import("../views/console/index.vue")
            }
        ]
    },
    /**
     * 博客管理
     */
    {
        path: "/blogMG",
        name: "BlogMG",
        meta: {
            name: "博客管理",
            icon: "blog"
        },
        component: Layout,
        children: [
            {
                path: "/articleIndex",
                name: "ArticleIndex",
                meta: {
                    name: "文章管理",
                    icon: ""
                },
                component: () => import("../views/blog/index.vue")
            },
            {
                path: "/articleTag",
                name: "ArticleTag",
                meta: {
                    name: "标签管理",
                    icon: ""
                },
                component: () => import("../views/blog/tag.vue")
            }
            ,
            {
                path: "/infoDetailed",
                name: "InfoDetailed",
                hidden: true,
                meta: {
                    name: "文章详情",
                    icon: ""
                },
                component: () => import("../views/blog/infoDetailed.vue")
            }
        ]
    },
    {
        path: "/user",
        name: "User",
        meta: {
            name: "用户管理",
            icon: "user"
        },
        component: Layout,
        children: [
            {
                path: "/userIndex",
                name: "UserIndex",
                meta: {
                    name: "用户列表",
                    icon: ""
                },
                component: () => import("../views/user/index.vue")
            }
        ]
    }
];

const router = new VueRouter({
    routes
});

export default router;
