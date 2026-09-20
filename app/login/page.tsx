'use client';

import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loginAttempts, setLoginAttempts] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [greeting, setGreeting] = useState<string>('Selamat Pagi');

  // Dynamic Greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 3 && hour < 11) setGreeting('Selamat Pagi');
    else if (hour >= 11 && hour < 15) setGreeting('Selamat Siang');
    else if (hour >= 15 && hour < 18) setGreeting('Selamat Sore');
    else setGreeting('Selamat Malam');
  }, []);

  // Cooldown Lockout
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isLocked && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    } else if (countdown === 0 && isLocked) {
      setIsLocked(false);
      setLoginAttempts(0);
      setErrorMessage('');
    }
    return () => { if (timer) clearInterval(timer); };
  }, [isLocked, countdown]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    if (isLocked) return;

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Email dan Password wajib diisi.');
      return;
    }

    if (email !== 'user@example.com' || password !== 'password123') {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      if (newAttempts >= 3) {
        setIsLocked(true);
        setCountdown(30);
        setErrorMessage('Percobaan gagal 3x. Akun dikunci sementara.');
      } else {
        setErrorMessage(`Email atau Password salah. (Sisa percobaan: ${3 - newAttempts})`);
      }
      return;
    }

    alert('Login Berhasil!');
    setLoginAttempts(0);
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-[#020409]">
      {/* Container Utama Split Card Galaxy */}
      <div className="w-full max-w-250 grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.15)] bg-black border border-cyan-500/20">
        
        {/* SISI KIRI: Form Login Galaxy */}
        <div 
          className="relative p-8 sm:p-12 flex flex-col justify-between overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: 'url(/bg_galaxy.jpg)' }}
        >
          {/* Ambient Glow */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Header / Logo */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/30 bg-linear-to-br from-cyan-500 to-blue-800">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457-.39-2.823-1.07-4" />
                </svg>
              </div>
              <span className="text-sm font-black tracking-wider text-white">PT. ANDIMA TRANSPORTINDO</span>
            </div>

            {/* Title & Dynamic Greeting */}
            <div className="mb-8">
              <h1 className="text-3xl font-black text-white tracking-tight [text-shadow:0_0_10px_rgba(255,255,255,0.4)]">
                {greeting}
              </h1>
              <p className="text-xs text-cyan-200/70 mt-2">
                Silakan masuk untuk mengakses dashboard operasional.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-200 mb-2">
                  Email / Username
                </label>
                <input
                  type="email"
                  placeholder="nama@andima.co.id"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  disabled={isLocked}
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none transition-all disabled:opacity-50 bg-slate-900/60 border border-cyan-500/30 backdrop-blur-md focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-200 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    disabled={isLocked}
                    className="w-full pl-4 pr-12 py-3 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none transition-all disabled:opacity-50 bg-slate-900/60 border border-cyan-500/30 backdrop-blur-md focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                  
                  {/* Eye Toggle */}
                  <button
                    type="button"
                    onMouseDown={() => setShowPassword(true)}
                    onMouseUp={() => setShowPassword(false)}
                    onMouseLeave={() => setShowPassword(false)}
                    onTouchStart={() => setShowPassword(true)}
                    onTouchEnd={() => setShowPassword(false)}
                    disabled={isLocked}
                    tabIndex={-1}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-cyan-500/60 hover:text-cyan-400 p-1 transition-colors disabled:opacity-50"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908A8.982 8.982 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2.5">
                  <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLocked}
                className="w-full py-3.5 px-4 text-white font-bold rounded-xl text-sm tracking-wider uppercase transition-all mt-2 disabled:opacity-50 bg-linear-to-r from-cyan-500 to-blue-700 hover:from-cyan-400 hover:to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.5)] active:scale-[0.99]"
              >
                {isLocked ? `Tunggu ${countdown}s` : 'LOGIN'}
              </button>
            </form>
          </div>

          {/* Footer Link */}
          <div className="relative z-10 mt-8 pt-6 border-t border-cyan-500/10 text-center text-xs text-slate-400">
            Lupa password akun?{' '}
            <Link href="/login/reset_password" className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-4">
              Reset di sini
            </Link>
          </div>
        </div>

        {/* SISI KANAN: Visual Gudang */}
        <div className="hidden lg:block overflow-hidden bg-slate-950 relative">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop"
            alt="Warehouse Operations"
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#020409] via-[#020409]/40 to-transparent" />

          <div className="absolute bottom-10 left-10 right-10 p-6 rounded-2xl bg-slate-900/80 border border-cyan-500/20 text-white backdrop-blur-md">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              Sistem Logistik Terpadu
            </div>
            <h3 className="text-lg font-bold">Keamanan & Pemantauan Real-time</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Memantau aktivitas pengiriman dan pengelolaan pergudangan secara presisi dan aman.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
