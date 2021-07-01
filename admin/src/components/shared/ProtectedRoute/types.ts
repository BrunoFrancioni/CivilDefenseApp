import { RouteProps } from "react-router-dom";

export interface ProtectedRouteProps extends RouteProps {
    component: any;
    isLogged: boolean;
    path: string;
};