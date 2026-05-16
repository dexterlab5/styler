import Header from './Header'
import MainPage from './MainPage'
import Footer from './Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ServicePage from './ServicePage'
import AuthPage from './AuthPage'
import RegisterPage from './Register'
import Dashboard from './Dashboard'
import ProtectedRoute from './ProtectedRoute'
import NotFoundPage from './NotFoundPage'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/get-in" element={<AuthPage />}/>      
          <Route path="/register" element={<RegisterPage />}/>

          <Route path="/dashboard" element={<ProtectedRoute allowedForStudio={true} ><Dashboard /></ProtectedRoute>}/>     

          <Route path="*" element={<NotFoundPage />}/> 
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
