import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigation } from '../components/layout/Navigation'
import { ProtectedRoute } from './ProtectedRoute'
import { AdminRoute } from './AdminRoute'
import { LoginPage } from '../features/auth/LoginPage'
import { SignupPage } from '../features/auth/SignupPage'
import { AcceptInvitePage } from '../features/auth/AcceptInvitePage'
import { DashboardPage } from '../features/dashboard/DashboardPage'
import { DoesListPage } from '../features/does/DoesListPage'
import { DoeDetailsPage } from '../features/does/DoeDetailsPage'
import { BucksListPage } from '../features/bucks/BucksListPage'
import { HerdPage } from '../features/herd/HerdPage'
import { AdminProfilePage } from '../features/admin/AdminProfilePage'
import { LandingPage } from '../features/landing/LandingPage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/accept-invite" element={<AcceptInvitePage />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/*"
            element={
              <div className="app-shell">
                <Navigation />
                <main className="app-main">
                  <Routes>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/does" element={<DoesListPage />} />
                    <Route path="/does/:id" element={<DoeDetailsPage />} />
                    <Route path="/bucks" element={<BucksListPage />} />
                    <Route path="/herd" element={<HerdPage />} />
                    <Route element={<AdminRoute />}>
                      <Route path="/admin" element={<AdminProfilePage />} />
                    </Route>
                  </Routes>
                </main>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
