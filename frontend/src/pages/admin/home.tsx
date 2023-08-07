import { AuthProvider } from '../../hooks/authentication';
import { Card, Container } from 'react-bootstrap';

const HomePage: React.FC = () => {



    return (
        <AuthProvider>
            
            <div className="App d-flex flex-column" >

                    <div className='flex-grow-1'>
                        <Container className='h-100 w-100 ' >

                        </Container>
                    </div>

            </div>
        </AuthProvider>
    );
};

export default HomePage;