import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/authentication";
import { FaHome } from 'react-icons/fa';


const ProjectNavbar: React.FC = () => {

    const { user } = useAuth();

    return (
        <Navbar bg='#161b22' variant='dark' expand='lg' style={{ height: '60px' }}>
            <Container>
                <Navbar.Brand>

                </Navbar.Brand>
                {
                    !!user ? (
                        <>
                            <Nav className="me-auto">
                                <div style={{ borderLeft: '2px solid lightgray', height: '40px' }}></div>
                                <Link role="button" className="nav-link" to="/home"> <span style={{ color: 'black' }}><FaHome /> Home</span></Link>
                            </Nav>
                        </>
                    ) : undefined
                }
            </Container>
        </Navbar>
    );
}

export default ProjectNavbar