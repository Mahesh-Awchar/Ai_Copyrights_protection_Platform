import React from 'react';
import { CircleUserRound } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export const AuthButton: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: window.location.origin
        }
      });
      
      if (error) throw error;
    } catch (error) {
      toast.error('Failed to sign in');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Failed to sign out');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={user ? handleLogout : handleLogin}
      disabled={loading}
      className={`p-2 rounded-full ${
        user ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300'
      } hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <CircleUserRound className="w-5 h-5" />
    </button>
  );
};

export default AuthButton