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
import SignIn from './pages/sign-in-page';
import SignUp from './pages/sign-up-page';
import PageLayout from './components/layouts/page-layout';
import WindowHeightLayout from './components/layouts/window-height-layout';

const App = () => (
  <ThemeProvider theme={lightTheme}>
    <CssBaseline>
      <RouterProvider>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path="/" element={<WindowHeightLayout />}>
            <Route path="/search" element={<CarSearch />} />
            <Route path="/car/:id" element={<CarPage />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
        </Routes>
      </RouterProvider>
    </CssBaseline>
  </ThemeProvider>
);

export default App;
