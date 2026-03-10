import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  // Logar tentativa de acesso a rota inexistente
  useEffect(() => {
    console.error(
      "404 Error: Usuário tentou acessar rota inexistente:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-foreground">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">
          Página não encontrada
        </p>
        <a
          href="/"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md 
                     hover:bg-primary/90 transition-colors inline-block"
        >
          Voltar ao Início
        </a>
      </div>
    </div>
  );
};

export default NotFound;

/*
 * POR QUE ESTA PÁGINA EXISTE?
 * A rota path="*" no App.tsx captura qualquer URL que não
 * corresponde às rotas definidas. Sem ela, o usuário veria
 * uma página em branco ou um erro.
 *
 * O useLocation() permite saber qual URL o usuário tentou acessar.
 * O console.error ajuda no debug durante desenvolvimento.
 */