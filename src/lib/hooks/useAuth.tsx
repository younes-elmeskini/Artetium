"use client";
import { useState, useEffect, useCallback } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
  });

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/verify", { method: "GET" });
      
      setAuthState({
        isAuthenticated: res.ok,
        isLoading: false,
      });
    } catch {
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);
  
  useEffect(() => {
    async function performCheck() {
      await checkAuth();
    }
  
    performCheck();
  }, [checkAuth]);

  // Écouter les événements de connexion/déconnexion
  useEffect(() => {
    const handleAuthChange = () => {
      checkAuth();
    };

    // Écouter les événements personnalisés
    window.addEventListener('auth-changed', handleAuthChange);
    
    // Écouter les changements de focus de la fenêtre (pour détecter les changements d'onglet)
    window.addEventListener('focus', handleAuthChange);

    return () => {
      window.removeEventListener('auth-changed', handleAuthChange);
      window.removeEventListener('focus', handleAuthChange);
    };
  }, [checkAuth]);

  return {
    ...authState,
    refreshAuth: checkAuth
  };
}
