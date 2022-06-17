import {lazy } from "react"
const Login = lazy(() => (import("../views/authentication/Login")));
const Register = lazy(() => (import('../views/authentication/Register')));

var AuthRoutes = [
    { path: '/authentication/Login', name: 'Login', icon: 'mdi mdi-account-key', component: Login },
    { path: '/authentication/Register', name: 'Register', icon: 'mdi mdi-account-plus', component: Register },
];
export default AuthRoutes; 