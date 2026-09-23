'use client';

import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';

const REGISTERED_USERS = {
  'admin@andima.co.id': {
    passwordRole: 'Admin123!@#',
    role: 'Admin',
    redirectTo: '/dashboard/admin',
  },
  'manajemen@andima.co.id': {
    passwordRole: 'Manajemen123!@#',
    role: 'Manajemen',
    redirectTo: '/dashboard/manajemen',
  },
};

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [loginAttempts, setLoginAttempts] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isPermanentlyBlocked, setIsPermanentlyBlocked] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [greeting, setGreeting] = useState<string>('Selamat Pagi');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 3 && hour < 11) setGreeting('Selamat Pagi');
    else if (hour >= 11 && hour < 15) setGreeting('Selamat Siang');
    else if (hour >= 15 && hour < 18) setGreeting('Selamat Sore');
    else setGreeting('Selamat Malam');
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (isLocked && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    } else if (countdown === 0 && isLocked && !isPermanentlyBlocked) {
      setIsLocked(false);
      setErrorMessage('');
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isLocked, countdown, isPermanentlyBlocked]);

  const validateEmailFormat = (emailVal: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailVal);
  };

  const validatePasswordStrength = (passVal: string): boolean => {
    const hasLetter = /[a-zA-Z]/.test(passVal);
    const hasDigit = /\d/.test(passVal);
    const hasSpecial = /[^a-zA-Z0-9]/.test(passVal);
    return passVal.length >= 10 && hasLetter && hasDigit && hasSpecial;
  };

  const handleFailedAttempt = (customMessage: string) => {
    const newAttempts = loginAttempts + 1;
    setLoginAttempts(newAttempts);

    if (newAttempts >= 5) {
      setIsLocked(true);
      setIsPermanentlyBlocked(true);
      setErrorMessage('Akun Anda terblokir, untuk lebih lanjut bisa hubungi admin.');
    } else if (newAttempts === 4) {
      setErrorMessage(
        `${customMessage} Peringatan: 1 kali percobaan lagi gagal, akun Anda akan terblokir!`
      );
    } else if (newAttempts === 3) {
      setIsLocked(true);
      setCountdown(30);
      setErrorMessage(
        'Terlalu banyak percobaan gagal (3/5). Silakan tunggu 30 detik untuk mencoba lagi.'
      );
    } else {
      setErrorMessage(`${customMessage} (Sisa percobaan login: ${5 - newAttempts})`);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (isLocked || isPermanentlyBlocked) return;

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Email dan Password wajib diisi.');
      return;
    }

    if (!validateEmailFormat(email)) {
      setErrorMessage('Format email tidak valid (contoh: nama@andima.co.id).');
      return;
    }

    if (!validatePasswordStrength(password)) {
      setErrorMessage(
        'Password minimal 10 karakter dan terdiri dari kombinasi huruf, angka, serta karakter khusus.'
      );
      return;
    }

    const userAccount = REGISTERED_USERS[email.toLowerCase() as keyof typeof REGISTERED_USERS];
    if (!userAccount) {
      handleFailedAttempt('Email tidak terdaftar dalam sistem.');
      return;
    }

    if (userAccount.passwordRole !== password) {
      handleFailedAttempt('Password yang Anda masukkan salah.');
      return;
    }

    setLoginAttempts(0);
    setSuccessMessage(`Login Berhasil! Mengalihkan ke Dashboard ${userAccount.role}...`);

    setTimeout(() => {
      window.location.href = userAccount.redirectTo;
    }, 1500);
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#07111F] text-[#F6F9FC] selection:bg-[#18C7C0] selection:text-black">
      {/* 1. BACKGROUND GAMBAR LOGISTIK FULL SCREEN */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1600&auto=format&fit=crop"
          alt="Cargo Ship Logistics"
          className="w-full h-full object-cover object-right opacity-60"
        />
        {/* Soft Blending Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A] via-[#0D1B2A]/85 via-40% to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Ambient Light Glows */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#18C7C0]/20 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-[#8057E8]/20 rounded-full blur-3xl pointer-events-none z-0" />

      {/* 2. BRAND TEXT PROPOSIONAL DI KANAN TENGAH */}
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-8 lg:right-16 xl:right-24 z-20 pointer-events-none flex-col items-end text-right max-w-lg">
        <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center text-white font-bold shadow-xl shadow-[#18C7C0]/30 bg-gradient-to-br from-[#18C7C0] via-[#3B6FF5] to-[#8057E8] shrink-0 mb-4">
          <svg className="w-8 h-8 lg:w-9 lg:h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457-.39-2.823-1.07-4" />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-wider text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] leading-tight">
          PT. ANDIMA<br />
          <span className="text-[#18C7C0]">TRANSPORTINDO</span>
        </h1>
        <p className="text-xs sm:text-sm font-small tracking-widest text-[#D9E2EC] uppercase mt-2.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          Solusi Integrasi Logistik & Transportasi Terpercaya
        </p>
      </div>

      {/* 3. FORM LOGIN CONTAINER (DIBESARKAN & DISESUAIKAN SKALANYA) */}
      <div className="relative z-10 h-full w-full flex items-center justify-start px-6 sm:px-12 lg:px-20">
        <div className="w-full max-w-xl">

          {/* FORM GLASS FRAME DENGAN SIZE LEBIH MANTAP */}
          <div className="p-8 sm:p-11 rounded-3xl bg-[#0D1B2A]/80 border border-white/10 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            {/* Greeting */}
            <div className="mb-7 text-left">
              <h2 className="text-lg sm:text-xl font-bold text-[#F6F9FC] tracking-tight">
                {greeting},
              </h2>
              <p className="text-sm text-[#D9E2EC] mt-1.5">
                Silakan masuk dengan akun terdaftar untuk mengakses dashboard Anda.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#18C7C0] mb-2.5">
                  Email / Username
                </label>
                <input
                  type="email"
                  placeholder="admin@andima.co.id"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  disabled={isLocked || isPermanentlyBlocked}
                  className="w-full px-4.5 py-3.5 rounded-xl bg-[#07111F]/80 text-[#F6F9FC] placeholder-[#64748B] text-sm focus:outline-none transition-all disabled:opacity-50 border border-white/10 shadow-inner focus:border-[#18C7C0] focus:ring-2 focus:ring-[#18C7C0]/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#18C7C0] mb-2.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    disabled={isLocked || isPermanentlyBlocked}
                    className="w-full pl-4.5 pr-12 py-3.5 rounded-xl bg-[#07111F]/80 text-[#F6F9FC] placeholder-[#64748B] text-sm focus:outline-none transition-all disabled:opacity-50 border border-white/10 shadow-inner focus:border-[#18C7C0] focus:ring-2 focus:ring-[#18C7C0]/30"
                  />

                  <button
                    type="button"
                    onMouseDown={() => setShowPassword(true)}
                    onMouseUp={() => setShowPassword(false)}
                    onMouseLeave={() => setShowPassword(false)}
                    onTouchStart={() => setShowPassword(true)}
                    onTouchEnd={() => setShowPassword(false)}
                    disabled={isLocked || isPermanentlyBlocked}
                    tabIndex={-1}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#18C7C0] p-1 transition-colors disabled:opacity-50"
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

              {errorMessage && (
                <div className="p-4 rounded-xl bg-[#D9364F]/10 border border-[#D9364F]/30 text-[#D9364F] text-xs sm:text-sm flex items-center gap-2.5">
                  <svg className="w-5 h-5 shrink-0 fill-current" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="p-4 rounded-xl bg-[#16A37A]/10 border border-[#16A37A]/30 text-[#16A37A] text-xs sm:text-sm flex items-center gap-2.5">
                  <svg className="w-5 h-5 shrink-0 fill-current" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{successMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLocked || isPermanentlyBlocked}
                className="w-full py-4 px-5 text-white font-extrabold rounded-xl text-sm tracking-wider uppercase transition-all mt-2 disabled:opacity-50 bg-gradient-to-r from-[#3B6FF5] to-[#8057E8] hover:from-[#18C7C0] hover:to-[#3B6FF5] shadow-[0_6px_24px_rgba(59,111,245,0.4)] active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed"
              >
                {isPermanentlyBlocked
                  ? 'AKUN TERBLOKIR'
                  : isLocked
                  ? `Tunggu ${countdown}s`
                  : 'LOGIN'}
              </button>
            </form>

            {/* Info Demo Credentials */}
            <div className="mt-7 p-4 rounded-xl bg-[#07111F]/80 border border-white/5 text-xs text-[#64748B] space-y-1">
              <p className="font-bold text-[#18C7C0]">Kredensial Pengujian (Demo):</p>
              <p>• Admin: <span className="text-[#F6F9FC]">admin@andima.co.id</span> | Pass: <span className="text-[#F6F9FC]">Admin123!@#</span></p>
              <p>• Manajemen: <span className="text-[#F6F9FC]">manajemen@andima.co.id</span> | Pass: <span className="text-[#F6F9FC]">Manajemen123!@#</span></p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}