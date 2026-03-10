import { createClient } from "@supabase/supabase-js";
import.meta.env;

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL || "";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

/*
 * NOTAS:
 * - As variáveis de ambiente devem ser prefixadas com GUERZONIANSUS_ para serem acessíveis no cliente.
 * - O createClient do Supabase é usado para criar uma instância que pode ser importada em toda a aplicação.
 * - Nunca exponha chaves sensíveis no frontend. Use apenas as chaves anônimas fornecidas pelo Supabase.
 */