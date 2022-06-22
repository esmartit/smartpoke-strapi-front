// import { lazy } from "react"
import Login from "../_sppages/_spauthentication/Login";
import Register from "../_sppages/_spauthentication/Register";
//const Login = lazy(() => (import("../views/authentication/Login")));
//const Register = lazy(() => (import('../views/authentication/Register')));
// const Login2 = lazy(() => (import('../views/authentication/Login2')));
// const Register2 = lazy(() => (import('../views/authentication/Register2')));
// const Lockscreen = lazy(() => (import('../views/authentication/LockScreen')));
// const Recoverpwd = lazy(() => (import('../views/authentication/RecoverPwd')));
// const Maintanance = lazy(() => (import('../views/authentication/Maintanance')));


var AuthRoutes = [
    { path: '/authentication/Login', name: 'Login', icon: 'mdi mdi-account-key', component: Login },    
    { path: '/authentication/Register', name: 'Register', icon: 'mdi mdi-account-plus', component: Register },    
    // { path: '/authentication/LockScreen', name: 'Lockscreen', icon: 'mdi mdi-account-off', component: Lockscreen },
    // { path: '/authentication/RecoverPwd', name: 'Recover Password', icon: 'mdi mdi-account-convert', component: Recoverpwd },
    // { path: '/authentication/Maintanance', name: 'Maintanance', icon: 'mdi mdi-pencil-box-outline', component: Maintanance }
];
export default AuthRoutes; 