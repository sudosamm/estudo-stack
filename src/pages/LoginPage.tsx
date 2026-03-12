import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription,CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // Hook de AuthContext para acessar as funções de autenticação
    const { signIn, signUp } = useAuth();

    // Hook do router para navegação
    const navigate = useNavigate();

    // Login com email e senha!
    const handleLogin = async (e: React.FormEvent) => {
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
                    <Tabs defaultValue="login" className="w-full ">
                        <TabsList className="grid place-self-center min-h-fit w-full grid-cols-2 space-x-2 mb-4 p-2 ">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="signup">Cadastro</TabsTrigger>
                        </TabsList>
                        {/* Conteúdo do tab de login */}
                        <TabsContent value="login">
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div className='space-y-2'>
                                    <Label htmlFor='login-email'>Email</Label>
                                    <Input
                                        id='login-email'
                                        type='email'
                                        placeholder='seu@email.com'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required // Validação HTML5 para campo obrigatório
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='login-password'>Senha</Label>
                                    <Input
                                        id='login-password'
                                        type='password'
                                        placeholder='********'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required // Validação HTML5 para campo obrigatório
                                    />
                                </div>
                                <Button type='submit' className='place-self-center w-full' disabled={isLoading}>
                                    {isLoading ? "Entrando..." : "Entrar"}
                                </Button>
                                {/* Link para reset de senha */}
                                <p className='text-center text-sm text-muted-foreground'>
                                    <button
                                        type='button'
                                        onClick={() => navigate("/forgot-password")}
                                        className='text-sm text-primary hover:underline'
                                    >
                                        Esqueceu sua senha?
                                    </button>
                                </p>
                            </form>
                        </TabsContent>
                        {/* Conteúdo do tab de cadastro */}
                        <TabsContent value="signup">
                            <form onSubmit={handleSignUp} className="space-y-4">
                                <div className='space-y-2'>
                                    <Label htmlFor='signup-email'>Email</Label>
                                    <Input
                                        id='signup-email'
                                        type='email'
                                        placeholder='seu@email.com'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required // Validação HTML5 para campo obrigatório
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='signup-password'>Senha</Label>
                                    <Input
                                        id='signup-password'
                                        type='password'
                                        placeholder='********'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required // Validação HTML5 para campo obrigatório
                                        minLength={8}
                                    />
                                </div>
                                <Button type='submit' className='place-self-center w-full' disabled={isLoading}>
                                    {isLoading ? "Cadastrando..." : "Criar conta"}
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                    {/* Separador */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">
                                Ou continue com
                            </span>
                        </div>
                    </div>
                    {/* Botões de login com OAuth */}
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant="outline"
                            onClick={() => handleOAuthSignIn("discord")}
                        >
                            Discord
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => handleOAuthSignIn("google")}
                        >
                            Google
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginPage;