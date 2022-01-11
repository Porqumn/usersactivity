import UsersPage from "./components/Pages/UsersPage";
import CalculatePage from "./components/Pages/CalculatePage";
import AboutPage from "./components/Pages/AboutPage.js";
import {ABOUT_ROUTE, CALCULATE_ROUTE, TABLE_ROUTE} from "./utils/consts";

export const routes = [
    {
        path: TABLE_ROUTE,
        Component: UsersPage
    },
    {
        path: CALCULATE_ROUTE,
        Component: CalculatePage
    },
    {
        path: ABOUT_ROUTE,
        Component: AboutPage
    },
]