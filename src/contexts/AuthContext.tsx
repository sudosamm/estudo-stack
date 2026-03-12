import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";
import { 
    type Session,
    type User,
} from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";


interface AuthContextType {
    session: Session | null;
    user: User | null;
    isAdmin: boolean;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        //Passo 1: Configurar o listener de autenticação do Supabase
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setSession(session);
                setUser(session?.user || null);
                if(session?.user) {
                    await checkAdminRole(session.user.id);
                } else {
                    setIsAdmin(false);
                }
                setIsLoading(false);
            }
        );

        //Passo 2: Buscar sessão atual ao montar o componente
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if(session?.user) {
                checkAdminRole(session.user.id);
            }
            setIsLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Verificar na tabela "user_roles" se o usuário tem o papel de admin
    const checkAdminRole = async (userId: string) => {
        const { data } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", userId)
            .eq("role", "admin")
            .maybeSingle();

        setIsAdmin(!!data);
    };

    // Login com email e senha
    const signIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({ 
            email, 
            password 
        });
        if (error) {
            console.error("Erro ao fazer login:", error.message);
            throw error;
        };
    };
    
    // Registro com email e senha
    const signUp = async (email: string, password: string) => {
        const { error } = await supabase.auth.signUp({ 
            email, 
            password,
            options: {
                emailRedirectTo: window.location.origin + "/welcome", // Redireciona para uma página de boas-vindas após o registro
            },
        });
        if (error) {
            console.error("Erro ao registrar:", error.message);
            throw error;
        };
    };

    // Logout
    const signOut = async () => {
        setIsLoading(true);
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Erro ao fazer logout:", error.message);
            throw error;
        };
    };

    return (
        <AuthContext.Provider
            value={{ session, user, isAdmin, isLoading, signIn, signUp, signOut }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para acessar o contexto de autenticação
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
};

