
import React from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

import { Landing } from './pages/Landing';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { SeniorDashboard } from './pages/dashboard/SeniorDashboard';
import { JuniorDashboard } from './pages/dashboard/JuniorDashboard';
import { InternshipDetails } from './pages/internships/InternshipDetails';
import { SeniorProfile } from './pages/profiles/SeniorProfile';
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
    
    if(loading) {
      return <div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return <Navigate to="/dashboard" replace />; // or an unauthorized page
    }
    
    return <Outlet />;
};

const DashboardRedirect: React.FC = () => {
    const { user } = useAuth();
    if (user?.role === UserRole.SENIOR) {
        return <SeniorDashboard />;
    }
    if (user?.role === UserRole.JUNIOR) {
        return <JuniorDashboard />;
    }
    return <Navigate to="/login" />;
}

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HashRouter>
          <Routes>
            <Route element={<AppLayout />}>
                {/* Public Routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/donations" element={<Donations />} />

                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardRedirect />} />
                    <Route path="/internships/:id" element={<InternshipDetails />} />
                    <Route path="/profiles/:id" element={<SeniorProfile />} />
                    <Route path="/mentoring" element={<MentoringDashboard />} />
                    <Route path="/counselling" element={<CounsellingBooking />} />
                    <Route path="/chat" element={<Chat />} />
                </Route>

                {/* Role-specific Protected Routes */}
                <Route element={<ProtectedRoute allowedRoles={[UserRole.JUNIOR]} />}>
                    <Route path="/mentoring/request" element={<MentoringRequest />} />
                </Route>
            </Route>
          </Routes>
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;