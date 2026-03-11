import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // Hook de AuthContext para acessar as funções de autenticação
    const { signIn, signUp } = useAuth();

    // Hook do router para navegação
    const navigate = useNavigate();

    // Login com email e senha!
    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault(); // Previne recarregamento da página
        setIsLoading(true); // Ativa o estado de loading
        try {
            await signIn(email, password); // Chama a função de login do contexto
            toast.success("Login bem-sucedido!"); // Exibe mensagem de sucesso
            navigate('/dashboard'); // Redireciona para o dashboard
        } catch (error: any) {
            toast.error(`Erro ao fazer login: ${error.message}`); // Exibe mensagem de erro
        } finally {
            setIsLoading(false); // Desativa o estado de loading
        }
    };

    // Registro com email e senha!
    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault(); // Previne recarregamento da página
        setIsLoading(true); // Ativa o estado de loading
        try {
            await signUp(email, password); // Chama a função de registro do contexto
            toast.success("Registro bem-sucedido! Verifique seu email para confirmação."); // Exibe mensagem de sucesso
            // Redirecionamento é realizado automaticamente após confirmação do email, conforme configuração do supabase
        } catch (error: any) {
            toast.error(`Erro ao registrar: ${error.message}`); // Exibe mensagem de erro
        } finally {
            setIsLoading(false); // Desativa o estado de loading
        }
    };

    // Login com OAuth (Discord ou Google)
    const handleOAuthSignIn = async (provider: "discord" | "google") => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            },
        });
        if (error) {
            toast.error(`Erro ao fazer login com ${provider}: ${error.message}`); // Exibe mensagem de erro
        }
    };

    return (
        <div className="flex min-h-fit items-center justify-center bg-background px-4">
            <Card className="w-full min-w-md">
                <CardHeader className='text-center'>
                    <CardTitle className='text-2xl'>Seja bem-vinda(o)!</CardTitle>
                    <CardDescription>Faça login ou registre-se para continuar.</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Tabs para login / cadastro */}
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-4 p-">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="signup">Cadastro</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginPage;