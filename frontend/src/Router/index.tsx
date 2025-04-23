import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthLayout } from '../view/layouts/AuthLayout';
import { Dashboard } from '../view/pages/Dashboard';
import { Login } from '../view/pages/Login';
import { Register } from '../view/pages/Register';
import { AuthGuard } from './AuthGuard';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<h1><Register /></h1>} />
          </Route>
          
        </Route>

        <Route element={<AuthGuard isPrivate={true} />}></Route>
        <Route path='/' element={<h1><Dashboard/></h1>} />
      </Routes>
    </BrowserRouter>
  );
}
