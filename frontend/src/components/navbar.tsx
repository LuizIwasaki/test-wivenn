import { FormHandles, SubmitHandler } from '@unform/core';
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/authentication";
import { FaHome } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
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
                                <div style={{ borderLeft: '2px solid lightgray', height: '40px' }}></div>
                                <Link role="button" className="nav-link" to="/home"> <span style={{ color: 'black' }}><FaHome /> Home</span></Link>
                                <Link role="button" className="nav-link" onClick={handleLogout}  to=""> <span style={{ color: 'black' }}>Sair</span></Link>
                            </Nav>
                        </>
                    ) : undefined
                }
            </Container>
        </Navbar>
    );
}

export default ProjectNavbar