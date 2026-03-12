const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center bg-muted p-8 rounded-2xl max-block-fit">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Meu Projeto
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Projeto criado com React + Vite + Tailwind + shadcn
        </p>
        <div className="flex gap-3 justify-center">
          <a
            href="https://vitejs.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md 
                       hover:bg-primary/90 transition-colors"
          >
            Docs do Vite
          </a>
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md 
                       hover:bg-secondary/80 transition-colors"
          >
            Docs do shadcn
          </a>
          
          <a
            href="/login"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md 
                       hover:bg-primary/90 transition-colors"
          >
            Página de login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;

/*
 * NOTAS:
 * - Use bg-background, text-foreground (tokens semânticos do index.css)
 * - NUNCA use cores hardcoded (bg-blue-500, text-white)
 * - O "min-h-screen" garante que o fundo ocupe toda a tela
 * - Exporte como default para facilitar imports lazy (React.lazy)
 */