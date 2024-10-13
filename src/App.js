import AOS from 'aos'; 
import Layout from "./Layout";
import NoPage from "./NoPage";
import LandingPage from "./components/Landing";
import Properties from "./components/Properties";
import PropertyInspection from './components/InspectionProcess/PropertyInspection';
import Login from './components/auth/login/index';
import Register from './components/auth/register/index';
import PropertyDetails from './components/PropertyDetails';
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { AuthProvider } from "./contexts/authContext";
import "./index.css";
import 'aos/dist/aos.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  useEffect(() => {
    AOS.init(); // Initialize AOS directly
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* Everything that has navbar goes in here: */}
            <Route element={<Layout />}>
              <Route path="properties" element={<Properties />} />
              <Route path="inspection" element={<PropertyInspection />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            {/* Change for page after user logged in */}
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>

  );
}

export default App;