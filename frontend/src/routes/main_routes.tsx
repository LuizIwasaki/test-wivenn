import { Routes, Route } from "react-router-dom";
import { useAuth } from "../hooks/authentication";
import HomePage from '../pages/admin/home';
import DepartmentCreation from "../pages/admin/department/create_deparment";
import EmployeeCreation from "../pages/admin/employee/create_employee";
import LoginPage from "../pages/login";
import ProtectedRoute from "../components/protected_routes";
import TaskCreation from "../pages/admin/task/create_task";

const MainRouter: React.FC = () => {

    const { user } = useAuth();

    return (
        <> 
            <Routes>
                <Route path='/' element={!!user ? <HomePage/> : <LoginPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/logout' element={<LoginPage/>}/>
                <Route path='/admin/department' element={<ProtectedRoute><DepartmentCreation/></ProtectedRoute>}/>
                <Route path= '/admin/employee' element={<ProtectedRoute><EmployeeCreation/></ProtectedRoute>}/>
                <Route path='/admin/task' element={<ProtectedRoute><TaskCreation/></ProtectedRoute>}/>
                <Route path='/home' element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
 
                
            </Routes>
        </>
    );
};

export default MainRouter;