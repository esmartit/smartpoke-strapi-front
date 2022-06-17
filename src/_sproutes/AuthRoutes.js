import {lazy } from "react"
const Login = lazy(() => (import("../_sppages/_spauthentication/Login")));
const Register = lazy(() => (import('../_sppages/_spauthentication/Register')));

var AuthRoutes = [
    { path: '/_spauthentication/Login', name: 'Login', icon: 'mdi mdi-account-key', component: Login },
    { path: '/_spauthentication/Register', name: 'Register', icon: 'mdi mdi-account-plus', component: Register },
];
export default AuthRoutes; 