import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from "@/contexts/AuthContext";
/*import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/layouts/AdminLayout";
import ClienteLayout from "@/layouts/ClienteLayout";
import Dashboard from "@/pages/admin/dashboard"
import HomeCliente from "@/pages/client/home";
import Usuarios from "@/pages/admin/usuarios";*/
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import LoginPage from '@/pages/LoginPage';
import './App.css'

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
          <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <Routes>
                {/* Rotas públicas */ }
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<LoginPage />} />
                {/* Rotas protegidas - Admin 
                <Route element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminLayout />
                  </ProtectedRoute>
                }>
                  <Route path="/admin" element={<Dashboard />} />
                  <Route path="/admin/usuarios" element={<Usuarios />} />
                </Route>
                {/* Rotas protegidas - Cliente (qualquer logado) 
                <Route element={
                  <ProtectedRoute>
                    <ClienteLayout />
                  </ProtectedRoute>
                }>
                  <Route path="/home" element={<HomeCliente />} />
                  <Route path="/perfil" element={<HomeCliente />} />
                </Route>
                {/* Rota para página não encontrada */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
