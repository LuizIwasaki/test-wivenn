import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/authentication";
import { IFCChildren } from "../types/i_fc_children";

interface IProtectedRouteParams {
    redirectPath?: string;
}

const ProtectedRoute: React.FC<IFCChildren & IProtectedRouteParams> = ({ children, redirectPath = '/' }) => {

    const {user} = useAuth();

    // não permitir se não existir nenhum funcionário logado
    // doesn't allow if there is no employee logged in
    if (!user) return <Navigate to={redirectPath} replace />;
    return (
        <>{children || <Outlet/>}</>
    );

}

export default ProtectedRoute;