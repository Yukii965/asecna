import React, { useState } from 'react';
import {
  Lock,
  User,
  PlaneTakeoff,
  ShieldCheck,
  UserCircle,
  UserPlus,
  ArrowLeft,
} from 'lucide-react';

interface LoginProps {
  onLogin: (username: string, role: 'admin' | 'client') => void;
}

export interface UserAccount {
  username: string;
  password: string;
  role: 'admin' | 'client';
}

export const initialUsers: UserAccount[] = [
  { username: 'admin', password: '123', role: 'admin' },
];

const ADMIN_SECRET_KEY = 'ASECNA_2024';

const Login = ({ onLogin }: LoginProps) => {
  const [isRegistering, setIsRegistering] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'client'>('client');
  const [adminKey, setAdminKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isRegistering) {
      if (password !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas !');
        return;
      }

      if (role === 'admin' && adminKey !== ADMIN_SECRET_KEY) {
        alert('Code de sécurité Admin incorrect. Inscription refusée.');
        return;
      }

      alert(`Compte ${role} créé avec succès ! Connectez-vous maintenant.`);

      setIsRegistering(false);
      setConfirmPassword('');
      setAdminKey('');
    } else {
      if (username && password) {
        onLogin(username, role);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] p-4">
      <div className="bg-slate-900/80 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-slate-800 w-full max-w-md transition-all duration-500">
        {/* En-tête */}
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/20">
            {isRegistering ? (
              <UserPlus size={32} className="text-white" />
            ) : (
              <PlaneTakeoff size={32} className="text-white" />
            )}
          </div>

          <h1 className="text-3xl font-black text-white tracking-tight">
            {isRegistering ? 'Inscription' : 'ASECNA'}
          </h1>

          <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest font-semibold">
            {isRegistering ? 'Créer un nouvel accès' : 'Madagascar Terminals'}
          </p>
        </div>

        {/* Sélecteur de rôle */}
        <div className="flex p-1 bg-slate-950 rounded-xl mb-6 border border-slate-800">
          <button
            type="button"
            onClick={() => setRole('client')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              role === 'client'
                ? 'bg-slate-800 text-white shadow-lg'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <UserCircle size={18} />
            Client
          </button>

          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              role === 'admin'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <ShieldCheck size={18} />
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Identifiant */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
              Identifiant
            </label>

            <div className="relative">
              <User className="absolute left-3 top-3.5 text-slate-600" size={18} />

              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Nom d'utilisateur"
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
              Mot de passe
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-slate-600" size={18} />

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Confirmation mot de passe */}
          {isRegistering && (
            <div className="space-y-1 animate-in fade-in slide-in-from-top-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                Confirmer le mot de passe
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-slate-600" size={18} />

                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}

          {/* Clé admin */}
          {isRegistering && role === 'admin' && (
            <div className="space-y-1 animate-in zoom-in duration-300">
              <label className="text-[10px] font-bold text-red-400 uppercase ml-1 flex items-center gap-1">
                <Lock size={10} />
                Clé de sécurité Administrateur
              </label>

              <input
                type="password"
                required
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="w-full bg-red-500/5 border border-red-500/20 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-red-500 outline-none"
                placeholder="Entrez le code secret ASECNA"
              />

              <p className="text-[9px] text-slate-500 mt-1 italic">
                * Requis pour créer un compte avec privilèges élevés.
              </p>
            </div>
          )}

          <button
            type="submit"
            className={`w-full font-bold py-3.5 rounded-xl shadow-xl transition-all transform active:scale-[0.98] mt-4 ${
              role === 'admin'
                ? 'bg-blue-600 hover:bg-blue-500 text-white'
                : 'bg-slate-100 hover:bg-white text-slate-900'
            }`}
          >
            {isRegistering ? "Confirmer l'inscription" : 'Se connecter'}
          </button>
        </form>

        {/* Toggle login/register */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-sm text-slate-400 hover:text-blue-400 transition-colors inline-flex items-center gap-2"
          >
            {isRegistering ? (
              <>
                <ArrowLeft size={14} />
                Retour à la connexion
              </>
            ) : (
              <>
                Pas de compte ?{' '}
                <span className="text-blue-400 font-bold">Créer un accès</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;