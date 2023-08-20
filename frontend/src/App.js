
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.module.css';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer';
import Home from './Pages/Home/Home';
import styles from './App.module.css';
import Protected from './components/Protected/Protected';
import Login from './Pages/Login/Login';

function App() {
  const isAuth = true;
  return (
    <div className={styles.back}>
      <BrowserRouter>
        <div className={styles.layout}>
          <Navbar/>
          
          <Routes>
            
            <Route 
            path='home'
            exact
            element={<div className={styles.main}><Home/></div>}
            />

            <Route
            path='crypto'
            exact
            element={<div>crypto page</div>}
            />

            <Route
            path='blogs'
            exact
            element={
            <Protected isAuth={isAuth}>
            <div>blog page</div>
            </Protected>
            }
            />

            <Route
            path='submit'
            exact
            element={
            <Protected isAuth={isAuth}>
              <div>submit blog page</div>
            </Protected>
            }
            />

            <Route
            path='login'
            exact
            element={
            <div>
             <Login/>
            </div>
            }
            />

            <Route
            path='signup'
            exact
            element={<div>signup page</div>}
            />
          </Routes>
          
          <Footer/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
