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
import { AdminRoute } from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admn/AdminDashboard';
import CreateCategory from './pages/Admn/CreateCategory'
import CreateProduct from './pages/Admn/CreateProduct'
import Users from './pages/Admn/Users'
import UserProfile from './pages/UserProfile'
import Orders from './pages/Orders'


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/dashboard' element={<PrivateRoute />}>

          <Route path='' element={<Dashboard />} />
          <Route path='profile' element={<UserProfile />} />
          <Route path='orders' element={<Orders />} />
        </Route>
        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/create-category' element={<CreateCategory />} />
          <Route path='admin/create-product' element={<CreateProduct />} />
          <Route path='admin/users' element={<Users />} />
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
