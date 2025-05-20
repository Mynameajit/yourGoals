
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRoute from './Utils/AuthRoute';
import { useUserContext } from './Context/userContex.jsx';
import Loader from './Components/Loader.jsx';

// Lazy loading pages
const Home = lazy(() => import('./Pages/Home.jsx'));
const Signup = lazy(() => import('./Pages/SignUp.jsx'));
const PageNotFound = lazy(() => import('./Components/PageNotFound.jsx'));


const App = () => {
  const { isAuth } = useUserContext();

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<AuthRoute isAuth={isAuth} />}>
            <Route path='/' element={<Home />} />
          </Route>

          <Route
            path='/signUp'
            element={
              <AuthRoute path='/' isAuth={!isAuth}>
                <Signup />
              </AuthRoute>
            }
          />

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
