import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Register';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword'
import { PrivateRoute } from './components/Routes/Private';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/dashboard' element={<PrivateRoute />}>

          <Route path='' element={<Dashboard />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/policy' element={<PrivacyPolicy />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
