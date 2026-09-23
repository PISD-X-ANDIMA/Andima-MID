'use client';

import React, { useState } from 'react';

export default function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [selectedException, setSelectedException] = useState<any>(null);
  // State simulasi role: 'admin' atau 'management'
  const [userRole, setUserRole] = useState<'admin' | 'management'>('admin');

  const exceptionsList = [
    { id: 'TKT-8921', unit: 'Fuso Wingbox - B 9211 UY', route: 'Jakarta - Surabaya', issue: 'Terlambat check-point KM 210 (Macet Tol)', status: 'Requires human review', time: '10 min lalu' },
    { id: 'TKT-8894', unit: 'Tronton Dump - H 1442 GA', route: 'Semarang - Solo', issue: 'Suhu mesin melebihi batas normal (>105°C)', status: 'Exception requiring attention', time: '25 min lalu' },
    { id: 'TKT-8850', unit: 'Container 40ft - B 8122 XZ', route: 'Tanjung Priok - Cikarang', issue: 'Dokumen e-Seal belum diverifikasi', status: 'Requires human review', time: '1 jam lalu' },
  ];

  const fleetStatus = [
    { name: 'Tersedia (Ready)', count: 142, color: 'bg-[#18C7C0]' },
    { name: 'Dalam Perjalanan (Active)', count: 88, color: 'bg-[#3B6FF5]' },
    { name: 'Perawatan (Maintenance)', count: 12, color: 'bg-[#E05262]' },
  ];

  // Daftar menu dasar (Tanpa Laporan Operasional & History Log)
  const baseMenuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard Utama', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
      ) 
    },
    { 
      id: 'fleet', 
      label: 'Manajemen Armada', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path></svg>
      ) 
    },
    { 
      id: 'finance', 
      label: 'Keuangan & Akuntansi', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
      ) 
    },
    { 
      id: 'hr', 
      label: 'SDM & Human Capital', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
      ) 
    },
  ];

  // Tambahkan Laporan Operasional & History Log tepat di bawahnya hanya jika role === 'admin'
  const menuItems = userRole === 'admin' 
    ? [
        ...baseMenuItems,
        { 
          id: 'reports', 
          label: 'Laporan Operasional', 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          ) 
        },
        { 
          id: 'history', 
          label: 'History Log', 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          ) 
        },
      ]
    : baseMenuItems;

  return (
    <div className="flex h-screen bg-[#D9E2EC] font-sans overflow-hidden">
      
      {/* 1. SIDEBAR GELAP */}
      <aside className="w-64 bg-[#07111F] text-[#D9E2EC] flex flex-col justify-between border-r border-[#142B45] z-20">
        <div>
          {/* Logo Brand */}
          <div className="p-6 border-b border-[#142B45] flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3B6FF5] to-[#18C7C0] flex items-center justify-center text-white font-bold text-lg shadow-lg">
              A
            </div>
            <div>
              <h1 className="text-white font-bold tracking-wider text-sm">ANDIMA</h1>
              <p className="text-[10px] text-[#64748B] uppercase tracking-widest">Transportindo</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-[#3B6FF5] text-white shadow-md shadow-[#3B6FF5]/30' 
                      : 'text-[#64748B] hover:text-white hover:bg-[#0D1B2A]'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-[#64748B]'}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Sidebar (Logout di Kiri Bawah & Info) */}
        <div className="p-4 border-t border-[#142B45] space-y-3">
          <button 
            onClick={() => alert('Berhasil keluar dari sistem.')}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[#E05262] hover:bg-[#E05262]/10 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            <span>Logout</span>
          </button>

          <div className="bg-[#0D1B2A] p-3 rounded-xl border border-[#142B45] text-xs">
            <p className="text-white font-semibold">Enterprise v4.2</p>
            <p className="text-[#64748B] mt-0.5">Role: {userRole.toUpperCase()}</p>
          </div>
        </div>
      </aside>

      {/* 2. AREA KONTEN UTAMA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Header */}
        <header className="h-16 bg-[#0D1B2A] border-b border-[#142B45] px-8 flex items-center justify-between z-10">
          <div className="flex items-center space-x-4">
            <h2 className="text-white font-bold text-lg capitalize tracking-wide">
              {activeMenu === 'dashboard' ? 'Executive Logistics Dashboard' : activeMenu}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#18C7C0]/10 text-[#18C7C0] border border-[#18C7C0]/20">
              Live System
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Tombol Simulasi Ganti Role */}
            <button 
              onClick={() => {
                const newRole = userRole === 'admin' ? 'management' : 'admin';
                setUserRole(newRole);
                if (newRole === 'management' && (activeMenu === 'reports' || activeMenu === 'history')) {
                  setActiveMenu('dashboard');
                }
              }}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#172033] text-xs font-semibold text-[#D9E2EC] border border-[#142B45] hover:border-[#3B6FF5] transition-all"
            >
              <svg className="w-3.5 h-3.5 text-[#18C7C0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              <span>Switch to: {userRole === 'admin' ? 'Management' : 'Admin'}</span>
            </button>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#64748B]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </span>
              <input
                type="text"
                placeholder="Cari resi, unit, atau driver..."
                className="bg-[#172033] text-white text-xs rounded-xl pl-9 pr-4 py-2 border border-[#142B45] focus:outline-none focus:border-[#3B6FF5] w-64"
              />
            </div>
            
            <button className="relative p-2 rounded-xl bg-[#172033] text-[#64748B] hover:text-white border border-[#142B45]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E05262]"></span>
            </button>

            <div className="flex items-center space-x-3 pl-4 border-l border-[#142B45]">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#8057E8] to-[#3B6FF5] flex items-center justify-center text-white font-bold text-xs">
                {userRole === 'admin' ? 'AD' : 'MG'}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white capitalize">{userRole}</p>
                <p className="text-[10px] text-[#64748B]">Andima Head Office</p>
              </div>
            </div>
          </div>
        </header>

        {/* Workspace Ruang Terang */}
        <main className="flex-1 overflow-y-auto p-8 space-y-6 bg-[#D9E2EC]">
          {activeMenu === 'history' ? (
            <div className="bg-[#FFFFFF] p-6 rounded-2xl shadow-sm border border-[#CBD5E1]">
              <h3 className="text-base font-bold text-[#172033] mb-4">System History Log</h3>
              <p className="text-xs text-[#64748B] mb-4">Catatan aktivitas dan perubahan data operasional secara real-time.</p>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-[#EEF4F8] rounded-xl border border-[#CBD5E1] flex justify-between">
                  <span className="font-medium text-[#172033]">[TKT-8921] Status diperbarui menjadi Requires human review</span>
                  <span className="text-[#64748B]">10 min lalu</span>
                </div>
                <div className="p-3 bg-[#EEF4F8] rounded-xl border border-[#CBD5E1] flex justify-between">
                  <span className="font-medium text-[#172033]">[Fleet] Unit Fuso Wingbox - B 9211 UY berangkat</span>
                  <span className="text-[#64748B]">1 jam lalu</span>
                </div>
              </div>
            </div>
          ) : activeMenu === 'reports' ? (
            <div className="bg-[#FFFFFF] p-6 rounded-2xl shadow-sm border border-[#CBD5E1]">
              <h3 className="text-base font-bold text-[#172033] mb-4">Laporan Operasional</h3>
              <p className="text-xs text-[#64748B]">Rekapitulasi lengkap kinerja armada dan logistik bulanan.</p>
            </div>
          ) : (
            <>
              {/* BARIS 1: KPI CARDS */}
              <div className="grid grid-cols-4 gap-6">
                {[
                  { title: 'Total Pendapatan (MTD)', value: 'Rp 4.28 M', change: '+12.4%', accent: 'text-[#18C7C0]', borderAccent: 'border-l-[#18C7C0]' },
                  { title: 'Tingkat Utilisasi Armada', value: '92.1%', change: '+3.2%', accent: 'text-[#3B6FF5]', borderAccent: 'border-l-[#3B6FF5]' },
                  { title: 'On-Time Delivery (OTD)', value: '98.4%', change: '+0.8%', accent: 'text-[#18C7C0]', borderAccent: 'border-l-[#18C7C0]' },
                  { title: 'Pengecualian / Isu Aktif', value: '3 Kasus', change: 'Urgent', accent: 'text-[#E05262]', borderAccent: 'border-l-[#E05262]' },
                ].map((kpi, idx) => (
                  <div key={idx} className={`bg-[#FFFFFF] p-6 rounded-2xl shadow-sm border border-[#CBD5E1] border-l-4 ${kpi.borderAccent} hover:shadow-md transition-shadow`}>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">{kpi.title}</p>
                    <div className="flex items-baseline justify-between mt-3">
                      <h3 className="text-2xl font-extrabold text-[#172033]">{kpi.value}</h3>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-lg bg-[#EEF4F8] ${kpi.accent}`}>
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* BARIS 2: GRAFIK & STATUS ARMADA */}
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 bg-[#FFFFFF] p-6 rounded-2xl shadow-sm border border-[#CBD5E1]">
                  <div className="flex items-center justify-between pb-4 border-b border-[#EEF4F8]">
                    <div>
                      <h3 className="text-base font-bold text-[#172033]">Tren Performa Logistik & Pendapatan</h3>
                      <p className="text-xs text-[#64748B]">Perbandingan volume pengiriman dan revenue bulanan</p>
                    </div>
                  </div>
                  <div className="h-64 flex items-end justify-between pt-8 px-4">
                    {[
                      { m: 'Jan', h1: 'h-32', h2: 'h-40' },
                      { m: 'Feb', h1: 'h-40', h2: 'h-36' },
                      { m: 'Mar', h1: 'h-48', h2: 'h-52' },
                      { m: 'Apr', h1: 'h-36', h2: 'h-44' },
                      { m: 'Mei', h1: 'h-56', h2: 'h-48' },
                      { m: 'Jun', h1: 'h-60', h2: 'h-56' },
                    ].map((col, idx) => (
                      <div key={idx} className="flex flex-col items-center space-y-2 flex-1 mx-2">
                        <div className="w-full flex items-end justify-center space-x-1.5 h-full">
                          <div className={`w-full max-w-[24px] ${col.h1} bg-[#3B6FF5] rounded-t-lg transition-all hover:opacity-80`}></div>
                          <div className={`w-full max-w-[24px] ${col.h2} bg-[#18C7C0] rounded-t-lg transition-all hover:opacity-80`}></div>
                        </div>
                        <span className="text-xs font-medium text-[#64748B]">{col.m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#FFFFFF] p-6 rounded-2xl shadow-sm border border-[#CBD5E1] flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#172033] mb-1">Komposisi & Status Armada</h3>
                    <p className="text-xs text-[#64748B] mb-6">Real-time status unit PT Andima</p>
                    <div className="space-y-4">
                      {fleetStatus.map((item, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-[#EEF4F8] border border-[#CBD5E1] flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className={`w-3.5 h-3.5 rounded-full ${item.color}`}></span>
                            <span className="text-xs font-bold text-[#172033]">{item.name}</span>
                          </div>
                          <span className="text-xs font-extrabold text-[#172033] bg-white px-2.5 py-1 rounded-lg border border-[#CBD5E1]">
                            {item.count} Unit
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* BARIS 3: TABEL EXCEPTION */}
              <div className="bg-[#FFFFFF] p-6 rounded-2xl shadow-sm border border-[#CBD5E1]">
                <div className="flex items-center justify-between pb-4 border-b border-[#EEF4F8]">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-[#E05262]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    <h3 className="text-base font-bold text-[#172033]">Pengecualian & Eskalasi Operasional (Exception Handling)</h3>
                  </div>
                </div>

                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#CBD5E1] text-[#64748B] uppercase tracking-wider font-bold">
                        <th className="pb-3 px-4">ID Tiket</th>
                        <th className="pb-3 px-4">Unit & Kendaraan</th>
                        <th className="pb-3 px-4">Rute Perjalanan</th>
                        <th className="pb-3 px-4">Keterangan Isu</th>
                        <th className="pb-3 px-4">Status & Waktu</th>
                        <th className="pb-3 px-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EEF4F8]">
                      {exceptionsList.map((item, idx) => (
                        <tr key={idx} className="hover:bg-[#EEF4F8]/50 transition-colors">
                          <td className="py-4 px-4 font-bold text-[#3B6FF5]">{item.id}</td>
                          <td className="py-4 px-4 font-bold text-[#172033]">{item.unit}</td>
                          <td className="py-4 px-4 text-[#64748B]">{item.route}</td>
                          <td className="py-4 px-4 text-[#172033] font-medium">{item.issue}</td>
                          <td className="py-4 px-4">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#E05262]/10 text-[#E05262] border border-[#E05262]/20">
                              {item.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button 
                              onClick={() => setSelectedException(item)}
                              className="px-3 py-1.5 bg-[#3B6FF5] text-white font-bold rounded-lg hover:bg-[#3B6FF5]/90 shadow-sm"
                            >
                              Tindak Lanjuti
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

    </div>
  );
}