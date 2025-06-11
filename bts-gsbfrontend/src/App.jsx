import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext/AuthContext'
import Login from './pages/Login';
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            user ?
              <Navigate to="/dashboard" replace /> :
              <Login />
          }
        />
        <Route
          path="/dashboard"
          element={
            user ?
              <Dashboard /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/signin"
          element={
            user ?
              <Navigate to="/dashboard" replace /> :
              <Signin />
          }
        />
        <Route
          path="/settings"
          element={
            user ?
              <Settings /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App;
