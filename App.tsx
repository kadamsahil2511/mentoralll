import React from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { Landing } from './pages/Landing';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { Account } from './components/layout/Account';
import { Register } from './pages/auth/Register';
import { EmployeeDashboard } from './pages/dashboard/employeeDashboard';
import { JuniorDashboard } from './pages/dashboard/JuniorDashboard';
import { InternshipDetails } from './pages/internships/InternshipDetails';
import { SeniorProfile } from './pages/profiles/SeniorProfile';
import { EmployeeProfile } from './pages/profiles/EmployeeProfile';
import { MentoringDashboard } from './pages/mentoring/MentoringDashboard';
import { MentoringRequest } from './pages/mentoring/MentoringRequest';
import { CounsellingBooking } from './pages/counselling/CounsellingBooking';
import { Donations } from './pages/donations/Donations';
import { Chat } from './pages/chat/Chat';
import { UserRole } from './types';

const AppLayout: React.FC = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const ProtectedRoute: React.FC<{ allowedRoles?: UserRole[] }> = ({ allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return <div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>;
  <Navigate to="/employeeDashboard" replace />;
  // if (!isAuthenticated) return <Navigate to="/login" replace />;

  // if (allowedRoles && user && !allowedRoles.includes(user.role)) {
  //   return <Navigate to="/employeeDashboard" replace />;
  // }

  return <Outlet />;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HashRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/donations" element={<Donations />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/register" element={<Register />} />
              <Route path="/employee-profile" element={<EmployeeProfile />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/employeeDashboard" element={<EmployeeDashboard />} />
                <Route path="/juniorDashboard" element={<JuniorDashboard />} />
                <Route path="/internships/:id" element={<InternshipDetails />} />
                <Route path="/profiles/:id" element={<SeniorProfile />} />
                <Route path="/mentoring" element={<MentoringDashboard />} />
                <Route path="/counselling" element={<CounsellingBooking />} />
                <Route path="/chat" element={<Chat />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={[UserRole.JUNIOR]} />}>
                <Route path="/mentoring/request" element={<MentoringRequest />} />
              </Route>

              {/* Catch-all redirect for authenticated users */}
              <Route path="/account" element={<Account />} />
              <Route path="*" element={<Navigate to="/employeeDashboard" replace />} />
            </Route>
          </Routes>
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
