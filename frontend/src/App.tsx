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
      <ToastProvider>
        <div className="App d-flex flex-column" >

          <HashRouter>

            <ProjectNavbar />
            <div className='flex-grow-1' >
              <Container>
              
                <MainRouter />

              </Container>
            </div>
          </HashRouter>
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App
