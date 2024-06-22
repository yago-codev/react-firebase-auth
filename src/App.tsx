import { BrowserRouter, Route, Routes } from "react-router-dom"

import { AuthProvider } from "./contexts/authContext"
import { Signup } from "./pages/Signup"
import { UserProfile } from "./pages/UserProfile"
import { Login } from "./pages/Login"
import { UpdateProfile } from "./pages/UpdateProfile"
import { PrivateRoutes } from "./components/PrivateRoutes"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={
            <Login />
          }/>
          <Route path="/signup" element={
            <Signup />
          }/>
          <Route path="/" element={
            <PrivateRoutes>
              <UserProfile />
            </PrivateRoutes>
          }/>
          <Route path="/update-profile" element={
            <PrivateRoutes>
              <UpdateProfile />
            </PrivateRoutes>
          }/>
          <Route path="*" element={
            <div>
              <h1>Rota não encontrada</h1>
            </div>
          }/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
