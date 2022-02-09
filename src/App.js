
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import {ThemeStoreProvider} from  "./Context/Theme.jsx"
function App() {
  return (
    <div className='App'>
     <ThemeStoreProvider>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}>  </Route>
      </Routes>
      </BrowserRouter>
     </ThemeStoreProvider>
    </div>
  );
}

export default App;
