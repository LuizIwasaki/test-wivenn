import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/authentication";
import { FaHome, FaRegUser, FaSignOutAlt, FaWpforms } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import './navbar.css';
const ProjectNavbar: React.FC = () => {

    const { user } = useAuth();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout =  async () =>  {

        try {

            await logout();
            navigate('/login');

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Navbar bg='#161b22' variant='dark' expand='lg' style={{ height: '60px' }} >
            <Container>
                <Navbar.Brand>

                </Navbar.Brand>
                {
                    !!user ? (
                        <>
                            <Nav className="me-auto">
                                <div className="navbar-brand">
                                <Link role="button" className="nav-link" to="/home"> <span><FaHome /> Home</span></Link>
                                <Link role="button" className="nav-link" to="/admin/employee"> <span><FaRegUser /> Funcionários</span></Link>
                                <Link role='button' className="nav-link" to="/admin/department"> <span><FaWpforms /> Departamentos</span></Link>
                                <Link role="button" className="nav-link" to="/admin/task"> <span><FaWpforms /> Tarefas</span></Link>
                                <Link role="button" className="nav-link" onClick={handleLogout}  to="/login"><FaSignOutAlt /></Link>
                                </div>
                            </Nav>
                        </>
                    ) : undefined
                }
            </Container>
        </Navbar>
    );
}

export default ProjectNavbar