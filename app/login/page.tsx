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

  // Dynamic Greeting berdasarkan waktu
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 3 && hour < 11) {
      setGreeting('Selamat Pagi');
    } else if (hour >= 11 && hour < 15) {
      setGreeting('Selamat Siang');
    } else if (hour >= 15 && hour < 18) {
      setGreeting('Selamat Sore');
    } else {
      setGreeting('Selamat Malam');
    }
  }, []);

  // Timer untuk handle Cooldown saat dikunci (Lockout)
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (isLocked && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0 && isLocked) {
      setIsLocked(false);
      setLoginAttempts(0);
      setErrorMessage('');
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isLocked, countdown]);

  const validateEmailFormat = (emailStr: string): boolean => {
    return /\S+@\S+\.\S+/.test(emailStr);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (isLocked) return;

    if (!email.trim() && !password.trim()) {
      setErrorMessage('Email dan Password wajib diisi.');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('Email tidak boleh kosong.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Password tidak boleh kosong.');
      return;
    }

    if (!validateEmailFormat(email)) {
      setErrorMessage('Format email tidak valid.');
      return;
    }

    const registeredEmail = 'user@example.com';
    const correctPassword = 'password123';

    if (email !== registeredEmail) {
      handleFailedAttempt('Email tidak terdaftar.');
      return;
    }

    if (password !== correctPassword) {
      handleFailedAttempt('Password salah.');
      return;
    }

    alert('Login Berhasil! Selamat datang.');
    setLoginAttempts(0);
  };

  const handleFailedAttempt = (msg: string) => {
    const newAttempts = loginAttempts + 1;
    setLoginAttempts(newAttempts);

    if (newAttempts >= 3) {
      setIsLocked(true);
      setCountdown(30);
      setErrorMessage('Percobaan login gagal 3x. Akun dikunci sementara.');
    } else {
      setErrorMessage(`${msg} (Sisa percobaan: ${3 - newAttempts})`);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#F8F9FC] px-4 py-8 sm:px-6 lg:px-8 text-[#000000]">
      {/* Box Utama (Card) */}
      <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-2xl border border-[#B0C6D4]/50 p-6 sm:p-10 transition-all duration-300">
        
        {/* Header & Greeting */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#1E3765] uppercase opacity-80 block mb-2">
            Portal Login
          </span>
          <h1 className="text-2xl sm:text-3.5xl font-bold text-[#1E3765] tracking-tight leading-tight">
            {greeting}!
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-2.5 max-w-[280px] mx-auto leading-relaxed">
            Silakan masukkan akun Anda untuk melanjutkan.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 pl-0.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              disabled={isLocked}
              className="w-full px-4 py-3.5 sm:px-4.5 sm:py-3.5 rounded-xl border border-[#B0C6D4] focus:outline-none focus:ring-2 focus:ring-[#1E3765] focus:border-transparent placeholder:text-gray-400 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 pl-0.5">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                disabled={isLocked}
                className="w-full pl-4 pr-12 py-3.5 sm:pl-4.5 sm:pr-12 sm:py-3.5 rounded-xl border border-[#B0C6D4] focus:outline-none focus:ring-2 focus:ring-[#1E3765] focus:border-transparent placeholder:text-gray-400 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200"
              />
              
              {/* Tombol Reveal password */}
              <button
                type="button"
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
                onMouseLeave={() => setShowPassword(false)}
                onTouchStart={() => setShowPassword(true)}
                onTouchEnd={() => setShowPassword(false)}
                disabled={isLocked}
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1E3765] active:scale-90 p-1.5 transition-all duration-150 ease-in-out disabled:opacity-50 select-none cursor-pointer flex items-center justify-center"
                aria-label="Tahan untuk melihat password"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5 text-[#1E3765]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12c1.074-4.65 5.062-8 9.964-8s8.89 3.35 9.964 8c-1.074 4.65-5.062 8-9.964 8s-8.89-3.35-9.964-8z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="p-3.5 text-xs rounded-xl bg-red-50 text-red-600 border border-red-200 flex items-start gap-2.5 mt-1 animate-fade-in">
              <svg className="w-4 h-4 mt-0.5 shrink-0 fill-current" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
              </svg>
              <span className="leading-relaxed font-medium">{errorMessage}</span>
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLocked}
            className="w-full py-4 px-4 bg-[#1E3765] hover:bg-[#16294c] active:scale-[0.98] text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none mt-2"
          >
            {isLocked ? `Coba lagi dalam ${countdown}s` : 'Masuk'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500 border-t border-[#B0C6D4]/20 pt-5">
          Lupa password?{' '}
          <Link 
            href="/login/reset_password" 
            className="text-[#1E3765] font-semibold hover:underline transition-colors"
          >
            Reset di sini
          </Link>
        </div>

      </div>
    </main>
  );
}