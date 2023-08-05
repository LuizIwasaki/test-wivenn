import './App.css'
import MainRouter from './routes/main_routes'
import { HashRouter } from 'react-router-dom';
function App() {
  return (
    <div className="App d-flex flex-column" >

        
                  <HashRouter>
                    <MainRouter/>
                  </HashRouter>

            </div>
);
}

export default App
