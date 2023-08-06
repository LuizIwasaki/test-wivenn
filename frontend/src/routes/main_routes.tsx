import { Routes, Route } from "react-router-dom";
import { useAuth } from "../hooks/authentication";
import HomePage from '../pages/admin/home';
import LoginPage from "../pages/login";
import ProtectedRoute from "../components/protected_routes";


const MainRouter: React.FC = () => {

    const { user } = useAuth();

    return (
        <> 
            <Routes>
                <Route path='/' element={!!user ? <HomePage/> : <LoginPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/logout' element={<LoginPage/>}/>
                <Route path='/home' element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
 
                
            </Routes>
        </>
    );
};

export default MainRouter;