import React from 'react';
import {
  BrowserRouter as RouterProvider,
  Routes,
  Route,
} from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from './styles/theme';
import HomePage from './pages/home-page';
import CarSearch from './pages/car-search-page';
import CarPage from './pages/car-page';
import Navbar from './components/partials/navbar';
import Footer from './components/partials/footer';
import SignIn from './pages/sign-in-page/sign-in';
import SignUp from './pages/sign-up-page/sign-up';

const App = () => (
  <ThemeProvider theme={lightTheme}>
    <CssBaseline>
      <RouterProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<CarSearch />} />
          <Route path="/car/:id" element={<CarPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
        <Footer />
      </RouterProvider>
    </CssBaseline>
  </ThemeProvider>
);

export default App;
