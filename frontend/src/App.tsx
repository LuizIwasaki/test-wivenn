import ProjectNavbar from './components/navbar';
import './App.css'
import { AuthProvider } from './hooks/authentication';
import { ToastProvider } from './hooks/toast';
import MainRouter from './routes/main_routes'
import { HashRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
function App() {


  return (

    <AuthProvider>
        <div className="App d-flex flex-column" >

          <HashRouter>

            <div className='flex-grow-1' >
              <Container>
      <ToastProvider>
            <ProjectNavbar />   
                <MainRouter />
      </ToastProvider>
              </Container>
            </div>
          </HashRouter>
        </div>
    </AuthProvider>
  );
}

export default App
