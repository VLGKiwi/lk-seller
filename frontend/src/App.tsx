import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { AdPage } from './pages/AdPage'
import { HomePage } from './pages/HomePage'
import { AdEditPage } from './pages/AdEditPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/ads" element={<HomePage />} />
        <Route path="/ads/:id" element={<AdPage />} />
        <Route path="/ads/:id/edit" element={<AdEditPage />} />
        <Route path="*" element={<Navigate to="/ads" replace />} />
      </Route>
    </Routes>
  )
}
