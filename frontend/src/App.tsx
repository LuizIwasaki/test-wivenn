import './App.css'
import { AuthProvider } from './hooks/authentication';
import MainRouter from './routes/main_routes'
import { HashRouter } from 'react-router-dom';
function App() {
  return (
    <div className="App d-flex flex-column" >

          <AuthProvider>
                  <HashRouter>
                    <MainRouter/>
                  </HashRouter>
                  </AuthProvider>
            </div>
);
}

export default App
