
import config from ".";
import HomePage from '../components/layouts/HomePage';
import AdminPage from "../components/layouts/AdminPage";
import UserPage from "../components/layouts/UserPage";
import BookDetail from "../components/layouts/BookDetail";
import LoginPage from "../components/layouts/LoginPage";
import SignupPage from "../components/layouts/SignupPage";

const publicRoutes = [
    { path: config.route.home, component: HomePage },
    { path: config.route.login, component: LoginPage },
    { path: config.route.signup, component: SignupPage },

]

const privateRoutes = [
    { path: config.route.admin, component: AdminPage },
    { path: config.route.user, component: UserPage },
    { path: config.route.bookDetail, component: BookDetail },
]

export { publicRoutes, privateRoutes }