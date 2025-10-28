"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoadingButton } from "@/components/circularLoader";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);


  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur");
      setMessage("Connexion réussie.");
      setEmail("");
      setPassword("");
      
      // Déclencher l'événement de changement d'authentification
      window.dispatchEvent(new CustomEvent('auth-changed'));
      
      router.push("/");
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold">Se connecter</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white rounded px-3 py-2 disabled:opacity-60"
        >
          <LoadingButton loading={loading}>
            {loading ? "En cours..." : "Se connecter"}
          </LoadingButton>
        </button>
        {message && <p className="text-sm text-center">{message}</p>}
      </form>
    </div>
  );
}