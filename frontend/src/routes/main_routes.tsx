import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { FaHome } from "react-icons/fa";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "../hooks/authentication";
import HomePage from '../pages/admin/home';
import LoginPage from "../pages/login";
import ProtectedRoute from "../components/protected_routes";


const MainRouter: React.FC = () => {

    const { user } = useAuth();

    return (
        <>
            { !!user ? <BreadcrumbsItem to='/'><FaHome/> Home</BreadcrumbsItem> : undefined }
            <Routes>
                <Route path='/' element={!!user ? <HomePage/> : <LoginPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/home' element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
 
                
            </Routes>
        </>
    );
};

export default MainRouter;