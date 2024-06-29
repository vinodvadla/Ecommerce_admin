import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import Progress from 'components/loading/Progress';
import LinearLoader from 'components/loading/LinearLoader';
import { useAuth } from 'Contexts/AuthContext';
import paths, { rootPaths } from './paths';

const App = lazy(() => import('App'));
const MainLayout = lazy(() => import('layouts/main-layout'));
const AuthLayout = lazy(() => import('layouts/auth-layout'));
const Dashboard = lazy(() => import('pages/dashboard/Dashboard'));
const Login = lazy(() => import('pages/authentication/Login'));
const Signup = lazy(() => import('pages/authentication/Signup'));
const ErrorPage = lazy(() => import('pages/errors/ErrorPage'));

const AppRouter = () => {
  const { currUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currUser) {
      navigate('/');
    }
  }, [currUser, navigate]);

  return (
    <Suspense fallback={<Progress />}>
      <Routes>
        <Route path={rootPaths.root} element={<App />}>
          {currUser ? (
            <Route
              element={
                <MainLayout>
                  <Suspense fallback={<LinearLoader />}>
                    <Outlet />
                  </Suspense>
                </MainLayout>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          ) : (
            <Route element={<AuthLayout />}>
              <Route path={paths.login} element={<Login />} />
              <Route path={paths.signup} element={<Signup />} />
              <Route path="/" element={<Navigate to={paths.login} replace />} />
            </Route>
          )}
        </Route>
      </Routes>
    </Suspense>
  );
};

const AppWrapper = () => (
  <Router basename="/">
    <AppRouter />
  </Router>
);

export default AppWrapper;
