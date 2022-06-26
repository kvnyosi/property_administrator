import { Routes,Route } from 'react-router-dom';
import Layout from './component/Layout';
import Public from './component/Public';
import Login from './features/auth/Login';
import Welcome from './features/auth/Welcome';
import RequireAuth from './features/auth/RequireAuth';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Public Routes */}
        {/* <Route index element={<Public />} /> */}
        <Route index element={<Login />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path='welcome' element={<Welcome />} />
        </Route>

      </Route>
    </Routes>  
  );
}

export default App;
