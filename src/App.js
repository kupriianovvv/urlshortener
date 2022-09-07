import Login from "./components/Login"
import Register from "./components/Register"
import RequireAuth from "./components/RequireAuth"
import Home from "./components/Home"
import Layout from "./components/Layout"
import { Routes, Route } from 'react-router-dom';


const App = () => {
return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
