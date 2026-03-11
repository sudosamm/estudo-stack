import { supabase } from "@/integrations/supabase/client";

const signInWithDiscord = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
            redirectTo: `${window.location.origin}/auth/callback`
        },
    });
    if (error) {
        console.error('Error signing in with Discord:', error);
        throw error;
    }
};

export { signInWithDiscord };