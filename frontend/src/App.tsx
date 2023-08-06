import ProjectNavbar from './components/navbar';
import './App.css'
import { AuthProvider } from './hooks/authentication';
import { ToastProvider } from './hooks/toast';
import MainRouter from './routes/main_routes'
import { HashRouter } from 'react-router-dom';
function App() {


  return (
    <div className="App d-flex flex-column" >

      <AuthProvider>
        <ToastProvider>
          <HashRouter>
            <MainRouter />
          </HashRouter>
        </ToastProvider>
      </AuthProvider>
    </div>
  );
}

export default App
