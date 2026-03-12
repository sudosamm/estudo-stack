import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
    children: ReactNode;
    requiredRole?: "admin" | "moderator" // Role necessária
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const { user, isAdmin, isLoading } = useAuth();

    // Enquanto o estado de autenticação está sendo carregado, podemos mostrar um loading
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"/>
                    <p className="text-sm text-muted-foreground">
                        Verificando sessão...
                    </p>
                </div>
            </div>
        )
    }

    // Se o usuário não estiver autenticado, redireciona para a página de login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Se precisa de admin e o usuário não é admin, redireciona para a página de login ou uma página de acesso negado
    if (requiredRole === "admin" && !isAdmin) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Se o usuário estiver autenticado (e tiver o papel necessário, se aplicável), renderiza os filhos

    return <>{children}</>;
};

export default ProtectedRoute;