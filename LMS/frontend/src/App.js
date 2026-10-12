"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, BookOpen, Calendar, ClipboardList, Settings, Bell, 
  Search, Menu, X, Sparkles, LogOut, CheckSquare, Send, 
  MessageSquare, FileText, Camera, Video, Moon, Sun, TrendingUp, 
  CheckCircle, Activity, Zap, ExternalLink, Monitor, MonitorOff, 
  PhoneOff, MicOff, Hand, Copy, Mic, User, Clock, MapPin, Download, Trash2
} from 'lucide-react';

// --- PREMIUM UI CSS-IN-JS (Bubbly Typography + Perfect Dark Mode Background Fix) ---
const injectProfessionalStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --font-family: 'Arial', sans-serif;
      --font-weight-heading: 700;
      --font-weight-body: 600;
      --letter-spacing-tight: 0em;
      --letter-spacing-normal: 0em;
      --line-height-body: 1.5;
      --line-height-heading: 1.3;
      
      /* Light Mode Colors */
      --bg-main-light: #ffffff;
      --bg-secondary-light: #f8fafc;
      --bg-tertiary-light: #f1f5f9;
      --card-bg-light: #ffffff;
      --sidebar-bg-light: #ffffff;
      --color-primary-light: #0f172a;
      --color-secondary-light: #64748b;
      --color-muted-light: #94a3b8;
      --border-light-light: #e2e8f0;
      --border-dark-light: #e2e8f0;
      --highlight-light: #e8f0fe;
      --highlight-border-light: #c2e7ff;
      
      /* Dark Mode Colors (Deep Rich Dark Setup) */
      --bg-main-dark: #0f172a;
      --bg-secondary-dark: #1e293b;
      --bg-tertiary-dark: #334155;
      --card-bg-dark: #1e293b;
      --sidebar-bg-dark: #0f172a;
      --color-primary-dark: #f8fafc;
      --color-secondary-dark: #cbd5e1;
      --color-muted-dark: #94a3b8;
      --border-light-dark: #334155;
      --border-dark-dark: #424242;
      --highlight-dark: #2d3748;
      --highlight-border-dark: #4a5568;
      --accent-dark: #bb86fc;
      
      /* Electric Gradient Premium Tokens */
      --gradient-electric: linear-gradient(135deg, #4f46e5, #0ea5e9);
      --gradient-electric-hover: linear-gradient(135deg, #4338ca, #0284c7);
      --gradient-premium: linear-gradient(135deg, #7c3aed, #2563eb);
      --gradient-premium-hover: linear-gradient(135deg, #6d28d9, #1d4ed8);
      
      /* Default Core Variables mapped to Light Mode */
      --bg-main: var(--bg-main-light);
      --bg-secondary: var(--bg-secondary-light);
      --bg-tertiary: var(--bg-tertiary-light);
      --card-bg: var(--card-bg-light);
      --sidebar-bg: var(--sidebar-bg-light);
      --color-primary: var(--color-primary-light);
      --color-secondary: var(--color-secondary-light);
      --color-muted: var(--color-muted-light);
      --border-light: var(--border-light-light);
      --border-dark: var(--border-dark-light);
      --highlight: var(--highlight-light);
      --highlight-border: var(--highlight-border-light);
      --accent: var(--accent-dark);
    }
    
    /* Strict Dark mode style overrides when .dark-mode class is active */
    body.dark-mode, .dark-mode, :root.dark-mode {
      --bg-main: var(--bg-main-dark) !important;
      --bg-secondary: var(--bg-secondary-dark) !important;
      --bg-tertiary: var(--bg-tertiary-dark) !important;
      --card-bg: var(--card-bg-dark) !important;
      --sidebar-bg: var(--sidebar-bg-dark) !important;
      --color-primary: var(--color-primary-dark) !important;
      --color-secondary: var(--color-secondary-dark) !important;
      --color-muted: var(--color-muted-dark) !important;
      --border-light: var(--border-light-dark) !important;
      --border-dark: var(--border-dark-dark) !important;
      --highlight: var(--highlight-dark) !important;
      --highlight-border: var(--highlight-border-dark) !important;
      --accent: var(--accent-dark) !important;
    }  

    /* Global Typography Override for Bubbly & Bouncy Feel */
    * {
      box-sizing: border-box;
      font-family: var(--font-family) !important;
    }

    body {
      font-family: var(--font-family) !important;
      font-weight: var(--font-weight-body);
      font-style: normal !important;
      background-color: var(--bg-main) !important;
      color: var(--color-primary) !important;
      line-height: var(--line-height-body);
      letter-spacing: var(--letter-spacing-normal);
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    }

    h1, h2, h3, h4, h5, h6, .app-brand-title {
      font-family: var(--font-family) !important;
      font-weight: var(--font-weight-heading) !important;
      font-style: normal !important;
      line-height: var(--line-height-heading);
      letter-spacing: var(--letter-spacing-tight);
      margin: 0;
      margin-bottom: 0.75rem;
      color: var(--color-primary) !important;
    }

    h1 { font-size: 28px; }
    h2 { font-size: 26px; }
    h3 { font-size: 24px; }
    h4 { font-size: 22px; }
    h5 { font-size: 20px; }
    h6 { font-size: 18px; }

    /* Custom Input elements dynamic font assignment */
    input, select, textarea, button {
      font-family: var(--font-family) !important;
    }

    /* Subject banner font fixes */
    .course-card .course-title {
      font-size: 14px !important;
      line-height: 1.2 !important;
      font-weight: 600 !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    .course-card .course-code {
      font-size: 12px !important;
      line-height: 1.1 !important;
      font-weight: 500 !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    /* Mobile optimization */
    @media (max-width: 768px) {
      .course-card .course-title {
        font-size: 12px !important;
      }
      .course-card .course-code {
        font-size: 10px !important;
      }
    }

    p {
      font-family: var(--font-family) !important;
      font-weight: var(--font-weight-body);
      line-height: var(--line-height-body);
      letter-spacing: var(--letter-spacing-normal);
      margin: 0;
      margin-bottom: 1rem;
      color: var(--color-primary) !important;
    }

    .text-secondary {
      color: var(--color-secondary) !important;
    }

    .text-muted {
      color: var(--color-muted) !important;
    }

    .heading-large {
      font-size: 28px;
      font-weight: var(--font-weight-heading);
      letter-spacing: var(--letter-spacing-tight);
      line-height: var(--line-height-heading);
      color: var(--color-primary) !important;
    }

    .heading-medium {
      font-size: 24px;
      font-weight: var(--font-weight-heading);
      letter-spacing: var(--letter-spacing-tight);
      line-height: var(--line-height-heading);
      color: var(--color-primary) !important;
    }

    .body-text {
      font-size: 16px;
      font-weight: var(--font-weight-body);
      line-height: var(--line-height-body);
      letter-spacing: var(--letter-spacing-normal);
      color: var(--color-primary) !important;
    }

    .caption-text {
      font-size: 14px;
      font-weight: var(--font-weight-body);
      line-height: var(--line-height-body);
      letter-spacing: var(--letter-spacing-normal);
      color: var(--color-secondary) !important;
    }

    /* Google Classroom Sidebar Styles */
    .sidebar-item {
      minHeight: 60px;
      padding: 12px 16px;
      margin: 2px 8px;
      border-radius: 25px;
      transition: all 0.2s ease;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 12px;
      position: relative;
    }

    .sidebar-item:hover {
      background-color: rgba(0,0,0,0.05);
    }
    
    body.dark-mode .sidebar-item:hover {
      background-color: rgba(255,255,255,0.05);
    }

    .sidebar-item.active {
      background-color: #e8f0fe;
      border: 1px solid #c2e7ff;
      font-weight: 600;
      margin: 2px 4px;
    }

    .sidebar-label {
      font-size: 14px;
      font-weight: 600;
      color: var(--color-primary);
    }

    .sidebar-sublabel {
      font-size: 12px;
      font-weight: 500;
      color: var(--color-secondary);
      margin-top: 2px;
    }

    .sidebar-icon {
      width: 20px;
      height: 20px;
      color: var(--color-secondary);
      flex-shrink: 0;
    }

    .sidebar-avatar {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: white;
      font-size: 14px;
      flex-shrink: 0;
    }

    .sidebar-separator {
      height: 1px;
      background-color: var(--border-light);
      margin: 8px 16px;
    }

    .sidebar-section-title {
      font-size: 12px;
      font-weight: 600;
      color: var(--color-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 8px 16px;
    }

    .glass {
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .glass-header {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border-light);
    }

    .premium-card {
      background: var(--card-bg);
      border-radius: 1rem;
      border: 1px solid var(--border-light);
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
    }

    /* Course cards */
    .course-card {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .course-card:hover {
      transform: translateY(-4px);
    }

    /* Sidebar activation animation fixes */
    .sidebar-item {
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    ::-webkit-scrollbar-track {
      background: var(--bg-secondary);
    }

    ::-webkit-scrollbar-thumb {
      background: var(--border-light);
      border-radius: 4px;
    }

    /* Text truncation */
    .truncate {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideInFromRight {
      from { opacity: 0; transform: translateX(20px); }
      to { opacity: 1; transform: translateX(0); }
    }

    .animate-fade-in {
      animation: fadeIn 0.3s ease-out;
    }

    .animate-slide-in-from-right {
      animation: slideInFromRight 0.5s ease-out;
    }
  `;
  document.head.appendChild(style);
};

// --- LOGIN SCREEN COMPONENT (moved outside App to prevent remount) ---
const LoginScreen = ({
  authDarkMode,
  setAuthDarkMode,
  isRegisterMode,
  setIsRegisterMode,
  handleLogin,
  handleRegister,
  username,
  setUsername,
  password,
  setPassword,
  registerData,
  setRegisterData,
  t
}) => {
  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-all duration-300 ${authDarkMode ? 'dark bg-[#0e1322]' : 'bg-gray-100'}`}>
      {/* Ambient Glows for Dark Mode */}
      {authDarkMode && (
        <>
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </>
      )}
      <div className={`w-full max-w-sm sm:max-w-md mx-auto p-8 rounded-2xl shadow-2xl transition-all duration-300 relative z-10 ${authDarkMode ? 'bg-slate-900/95 border border-slate-800' : 'bg-white border border-gray-200'}`}>
        {/* Dark Mode Toggle */}
        <div className="flex justify-end mb-2">
          <button
            onClick={() => setAuthDarkMode(!authDarkMode)}
            className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
          >
            {authDarkMode ? (
              <Sun size={20} className="text-cyan-300" />
            ) : (
              <Moon size={20} className="text-slate-700" />
            )}
          </button>
        </div>

        {/* School Logo */}
        <img src="/PTCLOGO.webp" alt="PTC Logo" className="w-28 h-28 md:w-32 md:h-32 mx-auto mb-0 object-contain drop-shadow-md" />

       {/* University Typography */}
        <h1 className={`font-bold uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl drop-shadow-sm mb-2 text-center transition-all duration-300 ${authDarkMode ? 'text-white' : 'text-slate-950'}`} style={{ fontFamily: 'Arial, sans-serif' }}>PATEROS TECHNOLOGICAL COLLEGE</h1>
        <p className={`font-semibold text-base mb-2 text-center transition-all duration-300 ${authDarkMode ? 'text-white' : 'text-slate-700'}`} style={{ fontFamily: 'Arial, sans-serif' }}>Learning Management System</p>
        <p className={`font-normal text-sm mb-6 text-center transition-all duration-300 ${authDarkMode ? 'text-gray-300' : 'text-slate-500'}`} style={{ fontFamily: 'Arial, sans-serif' }}>Access for Teachers, Administrators, and Students</p>
        
        {!isRegisterMode ? (
          // Login Form
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              key="global-login-username-field"
              id="login-username"
              type="text" 
              placeholder="Student ID / Email" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className={`w-full px-4 py-3 border rounded-xl outline-none transition-all focus:border-blue-500 text-sm font-medium ${authDarkMode ? 'bg-slate-900/90 border-slate-700 placeholder:text-slate-400' : 'bg-white border-gray-300 placeholder:text-gray-500'}`} 
              style={{ color: authDarkMode ? '#ffffff' : '#0f172a' }}
              required
            />
            <input 
              key="global-login-password-field"
              id="login-password"
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className={`w-full px-4 py-3 border rounded-xl outline-none transition-all focus:border-blue-500 text-sm font-medium ${authDarkMode ? 'bg-slate-900/90 border-slate-700 placeholder:text-slate-400' : 'bg-white border-gray-300 placeholder:text-gray-500'}`} 
              style={{ color: authDarkMode ? '#ffffff' : '#0f172a' }}
              required
            />
            <button type="submit" className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all shadow-md active:scale-[0.99]">
              {t.signIn}
            </button>
          </form>
        ) : (
          // Registration Form
          <form onSubmit={handleRegister} className="space-y-4">
            <input 
              key="global-register-fullname-field"
              id="register-fullname"
              name="name"
              type="text" 
              placeholder="Full Name" 
              value={registerData.name} 
              onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))} 
              className={`w-full px-4 py-3 border rounded-xl outline-none transition-all focus:border-blue-500 text-sm font-medium ${authDarkMode ? 'bg-slate-900/90 border-slate-700 placeholder:text-slate-400' : 'bg-white border-gray-300 placeholder:text-gray-500'}`} 
              style={{ color: authDarkMode ? '#ffffff' : '#0f172a' }}
              required
            />
            <input 
              key="global-register-email-field"
              id="register-email"
              name="email"
              type="email" 
              placeholder="Email Address" 
              value={registerData.email} 
              onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))} 
              className={`w-full px-4 py-3 border rounded-xl outline-none transition-all focus:border-blue-500 text-sm font-medium ${authDarkMode ? 'bg-slate-900/90 border-slate-700 placeholder:text-slate-400' : 'bg-white border-gray-300 placeholder:text-gray-500'}`} 
              style={{ color: authDarkMode ? '#ffffff' : '#0f172a' }}
              required
            />
            <input 
              key="global-register-password-field"
              id="register-password"
              name="password"
              type="password" 
              placeholder="Password" 
              value={registerData.password} 
              onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))} 
              className={`w-full px-4 py-3 border rounded-xl outline-none transition-all focus:border-blue-500 text-sm font-medium ${authDarkMode ? 'bg-slate-900/90 border-slate-700 placeholder:text-slate-400' : 'bg-white border-gray-300 placeholder:text-gray-500'}`} 
              style={{ color: authDarkMode ? '#ffffff' : '#0f172a' }}
              required
            />
            <input 
              key="global-register-confirm-password-field"
              id="register-confirm-password"
              name="confirmPassword"
              type="password" 
              placeholder="Confirm Password" 
              value={registerData.confirmPassword} 
              onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))} 
              className={`w-full px-4 py-3 border rounded-xl outline-none transition-all focus:border-blue-500 text-sm font-medium ${authDarkMode ? 'bg-slate-900/90 border-slate-700 placeholder:text-slate-400' : 'bg-white border-gray-300 placeholder:text-gray-500'}`} 
              style={{ color: authDarkMode ? '#ffffff' : '#0f172a' }}
              required
            />
            <select
              key="global-register-role-field"
              id="register-role"
              name="role"
              value={registerData.role}
              onChange={(e) => setRegisterData(prev => ({ ...prev, role: e.target.value }))}
              className={`w-full px-4 py-3 border rounded-xl outline-none transition-all focus:border-blue-500 text-sm font-medium ${authDarkMode ? 'bg-slate-900/90 border-slate-700' : 'bg-white border-gray-300'}`}
              style={{ color: authDarkMode ? '#ffffff' : '#0f172a' }}
              required
            >
              <option value="student">Student</option>
              <option value="professor">Professor</option>
            </select>
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-md active:scale-[0.99]">
              Create Account
            </button>
          </form>
        )}

        <div className="mt-6">
          {!isRegisterMode ? (
            <button 
              onClick={() => setIsRegisterMode(true)}
              className={`text-sm font-semibold hover:underline transition-all ${authDarkMode ? 'text-slate-100' : 'text-slate-800'}`}
              style={{ color: authDarkMode ? '#f8fafc' : '#1e293b' }}
            >
              Don't have an account? Register here
            </button>
          ) : (
            <button 
              onClick={() => setIsRegisterMode(false)}
              className={`text-sm font-semibold hover:underline transition-all ${authDarkMode ? 'text-slate-100' : 'text-slate-800'}`}
              style={{ color: authDarkMode ? '#f8fafc' : '#1e293b' }}
            >
              Already have an account? Log in here
            </button>
          )}
        </div>

        <p className={`text-xs mt-4 text-center transition-all duration-300 ${authDarkMode ? 'text-slate-100' : 'text-slate-500'}`} style={{ color: authDarkMode ? '#f8fafc' : '#64748b' }}>Demo Student: student / student | Demo Prof: prof / 12345 | Register new accounts to test!</p>
      </div>
    </div>
  );
};

// --- CALENDAR VIEW COMPONENT (moved outside App to prevent remount) ---
const CalendarView = ({ setActiveNav, user }) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentMonth = "May 2026";
  const isProfessor = user?.role === 'professor';

  // Faculty events for professors
  const facultyEvents = [
    { title: "Faculty Meeting - IT Department", date: "Friday, 2 PM", type: "meeting" },
    { title: "Deadline: Encoding of Midterm Grades", date: "Next Monday", type: "deadline" },
    { title: "Consultation Hours - BSIT 4A", date: "Wednesday, 10 AM", type: "consultation" }
  ];

  // Simple mock matrix for rendering days
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="p-4 md:p-6 lg:p-8 h-[calc(100vh-64px)] overflow-y-auto transition-colors duration-300" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="mb-4">
        <button
          onClick={() => setActiveNav('Home')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border-none cursor-pointer text-sm font-semibold hover:scale-105 transition-all duration-200"
          style={{ 
            background: 'var(--gradient-electric)', 
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
          }}
        >
          ← Return to Dashboard
        </button>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold m-0" style={{ color: 'var(--color-primary)' }}>Academic Calendar</h2>
        <p className="m-0 mt-1 text-sm" style={{ color: 'var(--color-secondary)' }}>
          {isProfessor ? 'Track your faculty meetings and academic deadlines' : 'Track your class schedules and events'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div 
          whileHover={{ translateY: -2 }}
          transition={{ duration: 0.2 }}
          className="lg:col-span-2 rounded-2xl border p-6 shadow-sm hover:shadow-lg transition-all duration-200"
          style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-light)' }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold m-0" style={{ color: 'var(--color-primary)' }}>{currentMonth}</h3>
          </div>
          
          <div className="grid grid-cols-7 gap-2 text-center font-bold text-xs mb-4" style={{ color: 'var(--color-muted)' }}>
            {daysOfWeek.map(day => <div key={day}>{day}</div>)}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map(day => (
              <motion.div 
                key={day} 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="p-3 border rounded-xl text-center text-sm font-medium relative min-h-[50px] flex flex-col justify-between cursor-pointer transition-all duration-200"
                style={{ borderColor: 'var(--border-light)', color: 'var(--color-primary)' }}
              >
                <span>{day}</span>
                {day === 19 && (
                  <div className="w-2 h-2 rounded-full mx-auto mt-1" title="Today" style={{ background: 'var(--gradient-electric)' }} />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="space-y-4">
          <motion.div
            whileHover={{ translateY: -2 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border p-4 shadow-sm hover:shadow-lg transition-all duration-200"
            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-light)' }}
          >
            <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-primary)' }}>
              {isProfessor ? 'Upcoming Faculty Events' : 'Schedules Today'}
            </h3>
            {isProfessor ? (
              <div className="space-y-2">
                {facultyEvents.map((event, index) => (
                  <div key={index} className="p-2 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <p className="text-xs font-semibold" style={{ color: 'var(--color-primary)' }}>{event.title}</p>
                    <p className="text-[10px]" style={{ color: 'var(--color-muted)' }}>{event.date}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs m-0" style={{ color: 'var(--color-muted)' }}>No synchronous sessions recorded for today.</p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// --- TASKS VIEW COMPONENT (moved outside App to prevent remount) ---
const TasksView = ({ setActiveNav, tasks, user, professorTasks, showSubmitModal, setShowSubmitModal, setSelectedTaskForSubmit, showGradingModal, setShowGradingModal, setSelectedTaskForGrading, submittedTasks, gradedTasks }) => {
  const isProfessor = user?.role === 'professor';
  const displayTasks = isProfessor ? professorTasks : tasks;

  const handleTaskClick = (task) => {
    if (isProfessor) {
      setSelectedTaskForGrading(task);
      setShowGradingModal(true);
    } else {
      setSelectedTaskForSubmit(task);
      setShowSubmitModal(true);
    }
  };

  const isTaskSubmitted = (taskId) => submittedTasks.includes(taskId);
  const isTaskGraded = (taskId) => gradedTasks.includes(taskId);

  return (
    <div className="p-4 md:p-6 lg:p-8 h-[calc(100vh-64px)] overflow-y-auto transition-colors duration-300" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="mb-4">
        <button
          onClick={() => setActiveNav('Home')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border-none cursor-pointer text-sm font-semibold hover:scale-105 transition-all duration-200"
          style={{ 
            background: 'var(--gradient-electric)', 
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
          }}
        >
          ← Return to Dashboard
        </button>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold m-0" style={{ color: 'var(--color-primary)' }}>
          {isProfessor ? 'Grading Queue' : 'Tasks & Assignments'}
        </h2>
        <p className="m-0 mt-1 text-sm" style={{ color: 'var(--color-secondary)' }}>
          {isProfessor ? 'Manage pending submissions and grading tasks' : 'Manage your academic tasks and deadlines'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <motion.div 
            whileHover={{ translateY: -2 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border p-6 shadow-sm hover:shadow-lg transition-all duration-200"
            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-light)' }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold m-0 text-base" style={{ color: 'var(--color-primary)' }}>
                {isProfessor ? 'Pending Grading' : 'Pending Tasks'}
              </h3>
              <span className="text-xs px-2.5 py-1 rounded-full font-bold" style={{ background: 'var(--gradient-electric)', color: '#ffffff' }}>Active</span>
            </div>

            <div className="space-y-3">
              {displayTasks && displayTasks.length > 0 ? (
                displayTasks.map(task => {
                  const isSubmitted = isTaskSubmitted(task.id);
                  const isGraded = isTaskGraded(task.id);
                  
                  return (
                    <motion.div 
                      key={task.id}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className={`p-4 border rounded-xl flex items-center justify-between transition-all duration-200 hover:shadow-md ${isSubmitted || isGraded ? 'opacity-60' : 'cursor-pointer'}`}
                      style={{ borderColor: 'var(--border-light)' }}
                    >
                      <div>
                        <h4 className="text-sm font-bold m-0" style={{ color: 'var(--color-primary)' }}>{task.title}</h4>
                        <p className="text-xs m-0 mt-1" style={{ color: 'var(--color-muted)' }}>Due: {task.dueDate}</p>
                        {isSubmitted && <p className="text-xs m-0 mt-1 text-green-600 font-semibold">✓ Submitted Successfully</p>}
                        {isGraded && <p className="text-xs m-0 mt-1 text-blue-600 font-semibold">✓ Graded</p>}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded-md font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--color-secondary)' }}>
                          {task.priority}
                        </span>
                        {!isSubmitted && !isGraded && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTaskClick(task);
                            }}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:scale-105"
                            style={{ background: 'var(--gradient-electric)' }}
                          >
                            {isProfessor ? 'Give Grades' : 'Submit'}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <p className="text-sm text-center py-6" style={{ color: 'var(--color-muted)' }}>
                  {isProfessor ? 'All grading tasks completed!' : 'Hooray! No pending tasks found.'}
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// --- COURSES VIEW COMPONENT (moved outside App to prevent remount) ---
const CoursesView = ({ setActiveNav, filteredCourses, handleCourseClick }) => (
  <div className="p-4 md:p-6 lg:p-8 h-[calc(100vh-64px)] overflow-y-auto">
    <div className="mb-6">
      <button
        onClick={() => setActiveNav('Home')}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border-none cursor-pointer text-sm font-semibold hover:scale-105 transition-all duration-200 mb-4"
        style={{ 
          background: 'var(--gradient-electric)', 
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
        }}
      >
        ← Return to Dashboard
      </button>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'var(--font-family)' }}>
        All Courses
      </h2>
      <p className="text-gray-600 dark:text-gray-400">Browse and manage your enrolled courses</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredCourses.map((course, index) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
          onClick={() => handleCourseClick(course)}
          className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-transparent transition-all"
        >
          <div className={`h-24 ${course.color} p-4 relative overflow-hidden`}>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-white/10"></div>
            <span className="text-white text-xs font-semibold">{course.code}</span>
            <h3 className="text-white font-bold text-sm mt-1 line-clamp-2" style={{ color: '#ffffff', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>{course.title}</h3>
          </div>
          <div className="p-4">
            <p className="text-sm text-white mb-3">{course.professor}</p>
            <div className="flex items-center justify-between text-xs text-white">
              <span>{course.room}</span>
              <span>{course.progress}% complete</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

// --- ARCHIVED VIEW COMPONENT ---
const ArchivedView = ({ setActiveNav, t }) => (
  <div className="p-4 md:p-6 lg:p-8 h-[calc(100vh-64px)] overflow-y-auto transition-colors duration-300" style={{ backgroundColor: 'var(--bg-main)' }}>
    <div className="mb-4">
      <button
        onClick={() => setActiveNav('Home')}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border-none cursor-pointer text-sm font-semibold hover:scale-105 transition-all duration-200"
        style={{ 
          background: 'var(--gradient-electric)', 
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
        }}
      >
        ← Return to Dashboard
      </button>
    </div>
    <div className="mb-4">
      <h2 className="text-2xl font-bold m-0" style={{ color: 'var(--color-primary)' }}>{t.archivedClasses}</h2>
      <p className="m-0 mt-1 text-sm" style={{ color: 'var(--color-secondary)' }}>View your past courses and completed semesters</p>
    </div>

    <div className="rounded-2xl border p-8 shadow-sm text-center" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-light)' }}>
      <BookOpen size={48} className="mx-auto mb-4" style={{ color: 'var(--color-muted)' }} />
      <p className="text-base font-medium mb-2" style={{ color: 'var(--color-primary)' }}>No archived classes yet</p>
      <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Classes from previous semesters will appear here</p>
    </div>
  </div>
);

// --- SETTINGS VIEW COMPONENT (moved outside App to prevent remount) ---
const SettingsView = ({
  setActiveNav,
  t,
  currentUser,
  allowEmail,
  setAllowEmail,
  commentsOnPosts,
  setCommentsOnPosts,
  classesEnrolled,
  setClassesEnrolled,
  invitations,
  setInvitations,
  dueDateReminders,
  setDueDateReminders,
  currentLang,
  setCurrentLang,
  isDarkMode,
  toggleDarkMode,
  user
}) => {
  const isProfessor = user?.role === 'professor';

  return (
  <div className="p-4 md:p-6 lg:p-8 h-[calc(100vh-64px)] overflow-y-auto">
    <div className="mb-6 text-center">
      <button
        onClick={() => setActiveNav('Home')}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border-none cursor-pointer text-sm font-semibold hover:scale-105 transition-all duration-200 mb-4 mx-auto"
        style={{ 
          background: 'var(--gradient-electric)', 
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
        }}
      >
        ← Return to Dashboard
      </button>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mx-auto" style={{ fontFamily: 'var(--font-family)' }}>
        {t.settings}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mx-auto">{t.customizeExperience}</p>
    </div>

    <div className="w-full max-w-6xl mx-auto px-8 py-4 space-y-6">
      {/* Profile Card */}
      <motion.div 
        whileHover={{ translateY: -2 }}
        transition={{ duration: 0.2 }}
        className="rounded-2xl border p-6 shadow-sm hover:shadow-lg transition-all duration-200"
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-light)' }}
      >
        <h3 className="font-bold mb-4" style={{ color: 'var(--color-primary)' }}>{t.profile}</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg" style={{ background: 'var(--gradient-electric)' }}>
            {currentUser ? currentUser.charAt(0).toUpperCase() : 'S'}
          </div>
          <div className="flex-1">
            <p className="font-medium text-lg" style={{ color: 'var(--color-primary)' }}>{currentUser || 'Student'}</p>
            <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
              {isProfessor ? 'Instructor / Faculty Member • IT Department' : 'BSIT 3J • 3rd Year'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => alert('Profile picture change feature coming soon!')}
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            {t.change}
          </button>
          <span style={{ color: 'var(--border-light)' }}>|</span>
          <button 
            onClick={() => alert('Account settings panel coming soon!')}
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            {t.accountSettings}
          </button>
        </div>
      </motion.div>

      {/* Global Notifications Grid */}
      <motion.div 
        whileHover={{ translateY: -2 }}
        transition={{ duration: 0.2 }}
        className="rounded-2xl border p-6 shadow-sm hover:shadow-lg transition-all duration-200"
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-light)' }}
      >
        <h3 className="font-bold mb-4" style={{ color: 'var(--color-primary)' }}>{t.notifications}</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium" style={{ color: 'var(--color-primary)' }}>{t.emailNotifications}</p>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Receive email notifications for updates</p>
            </div>
            <button
              onClick={() => setAllowEmail(!allowEmail)}
              className={`relative w-14 h-7 rounded-full transition-colors ${allowEmail ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${allowEmail ? 'translate-x-8' : 'translate-x-1'}`}></div>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium" style={{ color: 'var(--color-primary)' }}>{t.commentsOnPosts}</p>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Get notified when someone comments</p>
            </div>
            <button
              onClick={() => setCommentsOnPosts(!commentsOnPosts)}
              className={`relative w-14 h-7 rounded-full transition-colors ${commentsOnPosts ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${commentsOnPosts ? 'translate-x-8' : 'translate-x-1'}`}></div>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium" style={{ color: 'var(--color-primary)' }}>{t.classesEnrolled}</p>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Updates for your enrolled classes</p>
            </div>
            <button
              onClick={() => setClassesEnrolled(!classesEnrolled)}
              className={`relative w-14 h-7 rounded-full transition-colors ${classesEnrolled ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${classesEnrolled ? 'translate-x-8' : 'translate-x-1'}`}></div>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium" style={{ color: 'var(--color-primary)' }}>{t.invitations}</p>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Class invitations and requests</p>
            </div>
            <button
              onClick={() => setInvitations(!invitations)}
              className={`relative w-14 h-7 rounded-full transition-colors ${invitations ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${invitations ? 'translate-x-8' : 'translate-x-1'}`}></div>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium" style={{ color: 'var(--color-primary)' }}>{t.dueDateReminders}</p>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Reminders for upcoming due dates</p>
            </div>
            <button
              onClick={() => setDueDateReminders(!dueDateReminders)}
              className={`relative w-14 h-7 rounded-full transition-colors ${dueDateReminders ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${dueDateReminders ? 'translate-x-8' : 'translate-x-1'}`}></div>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Language Settings */}
      <motion.div 
        whileHover={{ translateY: -2 }}
        transition={{ duration: 0.2 }}
        className="rounded-2xl border p-6 shadow-sm hover:shadow-lg transition-all duration-200"
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-light)' }}
      >
        <h3 className="font-bold mb-4" style={{ color: 'var(--color-primary)' }}>{t.languageSettings}</h3>
        <div className="space-y-3">
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>{t.selectLanguage}</p>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setCurrentLang('en')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${currentLang === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              English
            </button>
            <button
              onClick={() => setCurrentLang('tl')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${currentLang === 'tl' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Tagalog
            </button>
            <button
              onClick={() => setCurrentLang('es')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${currentLang === 'es' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Español
            </button>
            <button
              onClick={() => setCurrentLang('ja')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${currentLang === 'ja' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              日本語
            </button>
            <button
              onClick={() => setCurrentLang('ko')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${currentLang === 'ko' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              한국어
            </button>
          </div>
        </div>
      </motion.div>

      {/* Appearance */}
      <motion.div 
        whileHover={{ translateY: -2 }}
        transition={{ duration: 0.2 }}
        className="rounded-2xl border p-6 shadow-sm hover:shadow-lg transition-all duration-200"
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-light)' }}
      >
        <h3 className="font-bold mb-4" style={{ color: 'var(--color-primary)' }}>Appearance</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium" style={{ color: 'var(--color-primary)' }}>Dark Mode</p>
            <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Toggle dark theme for better night viewing</p>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`relative w-14 h-7 rounded-full transition-colors ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${isDarkMode ? 'translate-x-8' : 'translate-x-1'}`}></div>
          </button>
        </div>
      </motion.div>
    </div>
  </div>
  );
};

// --- SUBJECT VIEW COMPONENT (moved outside App to prevent remount) ---
const SubjectView = ({
  selectedCourseDetail,
  setActiveNav,
  classroomTab,
  setClassroomTab,
  tasks,
  currentUser,
  isProfChatOpen,
  setIsProfChatOpen,
  getProfessorAvatar,
  isVideoCallActive,
  setIsVideoCallActive,
  chatMessages,
  setChatMessages,
  typedMessage,
  setTypedMessage,
  isDarkMode,
  DashboardHome,
  setActiveMeeting,
  user
}) => {
  if (!selectedCourseDetail) return <DashboardHome />;

  const tabs = ['Stream', 'Classwork', 'People'];

  return (
    <div className="p-4 md:p-6 lg:p-8 h-[calc(100vh-64px)] overflow-y-auto transition-colors duration-300" style={{ backgroundColor: 'var(--bg-main)' }}>
      {/* RTD Row */}
      <div className="mb-4">
        <button
          onClick={() => setActiveNav('Home')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border-none cursor-pointer text-sm font-semibold hover:scale-105 transition-all duration-200"
          style={{ 
            background: 'var(--gradient-electric)', 
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
          }}
        >
          ← Return to Dashboard
        </button>
      </div>

      {/* Premium Gradient Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl p-5 mb-4 shadow-lg"
        style={{ 
          background: 'linear-gradient(135deg, #4f46e5, #0ea5e9)',
          minHeight: '140px'
        }}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-white/90 text-sm font-semibold tracking-wide uppercase">
                {selectedCourseDetail.code}
              </span>
              <span className="text-white/60">•</span>
              <span className="text-white/80 text-sm font-medium">
                {selectedCourseDetail.section}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-family)' }}>
              {selectedCourseDetail.title}
            </h1>
            <p className="text-white/80 text-sm">{selectedCourseDetail.professor}</p>
          </div>
        </div>
      </motion.div>

      {/* Classroom Nav Tabs */}
      <div className="flex gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setClassroomTab(tab)}
            className="px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 border-none cursor-pointer"
            style={{
              background: classroomTab === tab 
                ? 'var(--gradient-electric)' 
                : 'var(--bg-secondary)',
              color: classroomTab === tab 
                ? '#ffffff' 
                : 'var(--color-primary)',
              boxShadow: classroomTab === tab 
                ? '0 4px 12px rgba(79, 70, 229, 0.3)' 
                : 'none'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Sidebar Panel */}
        <div className="space-y-4">
          {/* Meet Card */}
          <motion.div
            whileHover={{ translateY: -2 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border p-4 shadow-sm hover:shadow-lg transition-all duration-200"
            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-light)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl" style={{ background: 'var(--gradient-electric)' }}>
                <Video size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm" style={{ color: 'var(--color-primary)' }}>Meet</h3>
                <p className="text-xs" style={{ color: 'var(--color-muted)' }}>Video integration</p>
              </div>
            </div>
            <button
              onClick={() => setActiveMeeting({
                isOpen: true,
                roomUrl: selectedCourseDetail.meetLink,
                title: `${selectedCourseDetail.code} - ${selectedCourseDetail.title}`,
                role: user?.role || 'student'
              })}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-white rounded-xl text-sm font-semibold hover:shadow-lg active:scale-[0.98] transition-all duration-200"
              style={{ background: 'var(--gradient-electric)' }}
            >
              <Camera size={16} />
              Join
            </button>
          </motion.div>

          {/* Upcoming Tasks */}
          <motion.div
            whileHover={{ translateY: -2 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border p-4 shadow-sm hover:shadow-lg transition-all duration-200"
            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-light)' }}
          >
            <h3 className="font-bold text-sm mb-4" style={{ color: 'var(--color-primary)' }}>Upcoming Tasks</h3>
            <div className="space-y-3">
              {tasks.slice(0, 3).map(task => (
                <div
                  key={task.id}
                  className="p-3 rounded-xl border transition-all duration-200 hover:shadow-md cursor-pointer"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}
                >
                  <div className="flex items-start gap-2">
                    <CheckSquare size={14} style={{ color: task.completed ? 'var(--color-muted)' : '#0369a1' }} />
                    <div className="flex-1">
                      <p className="text-xs font-medium" style={{ color: 'var(--color-primary)' }}>{task.title}</p>
                      <p className="text-[10px] mt-1" style={{ color: 'var(--color-muted)' }}>Due: {task.dueDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Stream Feed Panel */}
        <div className="lg:col-span-2 space-y-4">
          {/* Announce Input */}
          <motion.div
            whileHover={{ translateY: -2 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border p-3 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer"
            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-light)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: 'var(--gradient-electric)' }}>
                {currentUser ? currentUser.charAt(0).toUpperCase() : 'S'}
              </div>
              <div className="flex-1">
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Announce something to your class...</p>
              </div>
            </div>
          </motion.div>

          {/* Announcement Stream */}
          <div className="space-y-4">
            {[
              { name: 'Prof. Toni D. Granado', avatar: 'T', date: 'May 19, 2026', message: 'I have already recorded your midterm grades and attendance. Please check your student portal for updates.' },
              { name: 'Cynthia B. Dulagan', avatar: 'C', date: 'May 18, 2026', message: 'Please submit your Chapter 5 drafts by Saturday. Make sure to include all required references.' },
              { name: 'Prof. Toni D. Granado', avatar: 'T', date: 'May 17, 2026', message: 'Prepare for the hands-on lab next week. We will be covering system integration patterns.' }
            ].map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ translateY: -2 }}
                className="rounded-2xl border p-4 shadow-sm hover:shadow-lg transition-all duration-200"
                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-light)' }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: 'var(--gradient-electric)' }}>
                    {post.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>{post.name}</p>
                      <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{post.date}</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm mb-4" style={{ color: 'var(--color-secondary)' }}>{post.message}</p>
                <div className="flex items-center gap-2 pt-3 border-t" style={{ borderColor: 'var(--border-light)' }}>
                  <input
                    key="global-stream-comment-input-field"
                    type="text"
                    placeholder="Add class comment..."
                    className="flex-1 px-3 py-2 rounded-xl text-sm outline-none transition-all focus:ring-2"
                    style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--color-primary)', borderColor: 'var(--border-light)' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Professor Chat Head (Only visible inside subject view) */}
      <div className="fixed bottom-28 right-6 z-50">
        {/* Chat Head Button */}
        <motion.button
          onClick={() => setIsProfChatOpen(!isProfChatOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all ring-2 ring-blue-500 animate-pulse"
          style={{ backgroundColor: 'var(--gradient-electric)' }}
        >
          <img
            src={getProfessorAvatar(selectedCourseDetail.professor)}
            alt={selectedCourseDetail.professor}
            className="w-full h-full rounded-full object-cover"
          />
        </motion.button>

        {/* Messenger-Style Chat Box */}
        <AnimatePresence>
          {isProfChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3, ease: 'ease-out' }}
              className="absolute bottom-20 right-0 w-80 rounded-2xl shadow-2xl border overflow-hidden"
              style={{ backgroundColor: isDarkMode ? '#0f172a' : '#ffffff', borderColor: isDarkMode ? '#334155' : '#e2e8f0' }}
            >
              {/* Chat Header */}
              <div className="p-3 flex items-center justify-between border-b" style={{ backgroundColor: 'var(--gradient-electric)', borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className="flex items-center gap-3">
                  <img
                    src={getProfessorAvatar(selectedCourseDetail.professor)}
                    alt={selectedCourseDetail.professor}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-white font-semibold text-sm">{selectedCourseDetail.professor}</p>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      <p className="text-white/80 text-xs">Online</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsVideoCallActive(true)}
                    className="text-white hover:text-white/80 transition-colors p-1"
                  >
                    <Video size={20} />
                  </button>
                  <button
                    onClick={() => setIsProfChatOpen(false)}
                    className="text-white hover:text-white/80 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Chat Body */}
              <div className="h-64 overflow-y-auto p-3 space-y-3" style={{ backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc' }}>
                {chatMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <p className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
                      Start a conversation with {selectedCourseDetail.professor}
                    </p>
                  </div>
                ) : (
                  chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                          msg.isUser
                            ? 'bg-blue-500 text-white rounded-br-sm'
                            : isDarkMode
                            ? 'bg-slate-700 text-slate-100 rounded-bl-sm'
                            : 'bg-gray-200 text-gray-900 rounded-bl-sm'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p className="text-[10px] mt-1 opacity-70">{msg.time}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Chat Input Footer */}
              <div className="p-3 border-t" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (typedMessage.trim()) {
                      setChatMessages([
                        ...chatMessages,
                        {
                          text: typedMessage,
                          isUser: true,
                          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        }
                      ]);
                      setTypedMessage('');
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    key="global-chat-heads-input-field"
                    type="text"
                    placeholder="Type a message..."
                    value={typedMessage}
                    onChange={(e) => setTypedMessage(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl text-sm outline-none transition-all focus:ring-2"
                    style={{
                      backgroundColor: isDarkMode ? '#1e293b' : '#f1f5f9',
                      color: isDarkMode ? '#f8fafc' : '#0f172a',
                      borderColor: isDarkMode ? '#334155' : '#e2e8f0'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={!typedMessage.trim()}
                    className="p-2 rounded-xl transition-all disabled:opacity-50 hover:scale-105"
                    style={{ backgroundColor: 'var(--gradient-electric)' }}
                  >
                    <Send size={16} className="text-white" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- DASHBOARD HOME COMPONENT (moved outside App to prevent remount) ---
const DashboardHome = ({ t, currentUser, courses, tasks, filteredCourses, handleCourseClick, getProfessorAvatar, getUnreadCount, user, setActiveMeeting, setShowAttendanceModal, setShowBadgesModal }) => {
  const isProfessor = user?.role === 'professor';

  return (
  <div className="p-4 md:p-6 lg:p-8 h-[calc(100vh-64px)] overflow-y-auto">
    {/* Welcome Header Greeting */}
    <div className="mb-6">
      <h2 className="font-bold text-xl sm:text-2xl tracking-tight mb-2 text-slate-800 dark:text-white" style={{ fontFamily: 'var(--font-family)' }}>
        {t.welcome}, {currentUser || 'User'}! 👋
      </h2>
      <p className="font-medium text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        {isProfessor ? 'Here is your teaching load and grading tasks today.' : 'Here is what\'s happening with your courses today.'}
      </p>
    </div>

    {/* Quick Actions */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowAttendanceModal(true)}
        className="p-4 rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-200 flex items-center gap-3"
        style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', borderColor: 'transparent' }}
      >
        <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
          <ClipboardList size={20} className="text-white" />
        </div>
        <div className="text-left">
          <div className="text-sm font-semibold text-white">📊 View Attendance Sheet</div>
          <div className="text-xs text-white/80">Track your class attendance</div>
        </div>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowBadgesModal(true)}
        className="p-4 rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-200 flex items-center gap-3"
        style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderColor: 'transparent' }}
      >
        <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
          <TrendingUp size={20} className="text-white" />
        </div>
        <div className="text-left">
          <div className="text-sm font-semibold text-white">🏆 Student Badges & Milestones</div>
          <div className="text-xs text-white/80">View your achievements</div>
        </div>
      </motion.button>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ translateY: -2 }}
        transition={{ duration: 0.2 }}
        className="p-4 rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-200"
        style={{ background: 'linear-gradient(135deg, #4f46e5, #0ea5e9)', borderColor: 'transparent' }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <BookOpen size={20} className="text-white" />
          </div>
          <span className="text-2xl font-bold text-white">{courses.length}</span>
        </div>
        <div className="text-sm font-semibold text-white/90">Active Courses</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.2 }}
        whileHover={{ translateY: -2 }}
        className="p-4 rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-200"
        style={{ background: 'linear-gradient(135deg, #10b981, #059669)', borderColor: 'transparent' }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <CheckCircle size={20} className="text-white" />
          </div>
          <span className="text-2xl font-bold text-white">{tasks.filter(t => t.completed).length}</span>
        </div>
        <div className="text-sm font-semibold text-white/90">Completed Tasks</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.2 }}
        whileHover={{ translateY: -2 }}
        className="p-4 rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-200"
        style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderColor: 'transparent' }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Activity size={20} className="text-white" />
          </div>
          <span className="text-2xl font-bold text-white">{getUnreadCount()}</span>
        </div>
        <div className="text-sm font-semibold text-white/90">Unread Notifications</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.2 }}
        whileHover={{ translateY: -2 }}
        className="p-4 rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-200"
        style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', borderColor: 'transparent' }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <TrendingUp size={20} className="text-white" />
          </div>
          <span className="text-2xl font-bold text-white">
            {Math.round(courses.reduce((sum, c) => sum + c.progress, 0) / courses.length)}%
          </span>
        </div>
        <div className="text-sm font-semibold text-white/90">Average Progress</div>
      </motion.div>
    </div>

    {/* Course Grid - Google Classroom Style */}
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-xl text-gray-900 dark:text-white" style={{ fontFamily: 'var(--font-family)' }}>
          {t.courses}
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">{filteredCourses.length} enrolled</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ translateY: -4, boxShadow: '0 20px 40px rgba(79, 70, 229, 0.15)' }}
            onClick={() => handleCourseClick(course)}
            className="group rounded-3xl overflow-hidden cursor-pointer border transition-all duration-200"
            style={{ minHeight: '240px', backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-light)' }}
          >
            {/* Google Classroom Style Banner Header */}
            <div 
              className={`relative h-24 ${course.color} p-4 flex flex-col justify-between`}
              style={{ 
                backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.1) 100%)` 
              }}
            >
              {/* Top row - Code and Section */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-white text-xs font-semibold tracking-wide uppercase">
                    {course.code}
                  </span>
                  <span className="mx-2 text-white">•</span>
                  <span className="text-white text-xs font-medium">
                    {course.section}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <BookOpen size={14} className="text-white" />
                </div>
              </div>

              {/* Course Title */}
              <h3 className="text-white font-bold text-base sm:text-lg md:text-xl leading-tight line-clamp-2 pr-4"
                  style={{ fontFamily: "'Arial', sans-serif", color: '#ffffff', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
                {course.title}
              </h3>
              
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/10"></div>
              
              {/* Professor Avatar Badge */}
              <div 
                className="absolute bottom-0 right-3 translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full border-4 border-white dark:border-slate-800 shadow-md object-cover overflow-hidden bg-white"
              >
                <img 
                  src={getProfessorAvatar(course.professor)} 
                  alt={course.professor}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            
            {/* Card Body */}
            <div className="p-4 flex flex-col gap-3">
              {/* Professor/Class Info */}
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full ${course.color} flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
                  {isProfessor ? course.code.charAt(0) : course.professor.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-medium truncate text-white" style={{ fontFamily: 'var(--font-family)' }}>
                    {isProfessor ? `${course.students} Students` : course.professor}
                  </p>
                  <p className="text-xs sm:text-sm text-white">{isProfessor ? course.year : course.sched}</p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-center text-xs sm:text-sm mb-1.5">
                  <span className="font-medium text-white">{t.courseProgress}</span>
                  <span className={`font-bold text-white`}>
                    {course.progress}%
                  </span>
                </div>
                <div className="w-full rounded-full h-2 overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="h-2 rounded-full"
                    style={{ background: 'var(--gradient-electric)' }}
                  />
                </div>
              </div>
              
              {/* Latest Announcement Preview */}
              <div className="rounded-xl p-2.5 border transition-all duration-200 hover:shadow-md" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}>
                <div className="flex items-start gap-2">
                  <MessageSquare size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-muted)' }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-muted)' }}>Latest Update</p>
                    <p className="text-xs line-clamp-2 leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
                      {course.announcement}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Action Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMeeting({
                    isOpen: true,
                    roomUrl: course.meetLink,
                    title: `${course.code} - ${course.title}`,
                    role: user?.role || 'student'
                  });
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-white rounded-xl text-sm font-semibold hover:shadow-lg active:scale-[0.98] transition-all duration-200"
                style={{ fontFamily: 'var(--font-family)', background: 'var(--gradient-electric)' }}
              >
                <Video size={16} />
                {isProfessor ? t.manageClassroom : t.joinMeet}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
  );
};

// --- DASHBOARD COMPONENT (moved outside App to prevent remount) ---
const Dashboard = ({ isDarkMode, isMobileSidebarOpen, setIsMobileSidebarOpen, searchQuery, handleSearch, showNotifications, setShowNotifications, getUnreadCount, toggleDarkMode, renderMainContent, user }) => {
  const isProfessor = user?.role === 'professor';

  return (
  <div className="flex-1 overflow-auto">
    {/* Header */}
    <header className={`sticky top-0 z-30 border-b transition-all duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}
            style={{ borderColor: 'var(--border-light)' }}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}
          >
            <Menu size={20} className={isDarkMode ? 'text-slate-100' : 'text-gray-900'} />
          </button>
          <div className="flex items-center gap-2">
            <img src="/PTCLOGO.webp" alt="PTC Logo" className="w-8 h-8 object-contain" />
            <h1 className={`font-bold uppercase tracking-wide text-[11px] sm:text-xs md:text-sm drop-shadow-sm ${isDarkMode ? 'text-white' : 'text-slate-950'}`} style={{ fontFamily: "'Arial', sans-serif" }}>
              {isProfessor ? 'FACULTY PORTAL' : 'PATEROS TECHNOLOGICAL COLLEGE'}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
            <Search size={16} className={isDarkMode ? 'text-slate-300' : 'text-gray-500'} />
            <input
              key="global-search-input-field"
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className={`bg-transparent outline-none text-sm w-48 ${isDarkMode ? 'text-slate-100 placeholder:text-slate-400' : 'text-gray-900 placeholder:text-gray-500'}`}
              style={{ fontFamily: 'var(--font-family)' }}
            />
          </div>
          
          {/* Notifications */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2 rounded-lg ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}
          >
            <Bell size={20} className={isDarkMode ? 'text-slate-100' : 'text-gray-900'} />
            {getUnreadCount() > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {getUnreadCount()}
              </span>
            )}
          </button>
          
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
          >
            {isDarkMode ? <Sun size={20} className="text-white" /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>

    {/* Main Content - Render based on activeNav */}
    <main className="h-[calc(100vh-64px)] overflow-y-auto">
      {renderMainContent()}
    </main>
  </div>
  );
};

// --- NOTIFICATION DROPDOWN COMPONENT (moved outside App to prevent remount) ---
const NotificationDropdown = ({ showNotifications, setShowNotifications, isDarkMode, notifications, handleNotificationClick, courses, setSelectedCourseDetail, setActiveNav }) => (
  <AnimatePresence>
    {showNotifications && (
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        className={`absolute right-4 top-16 w-80 rounded-2xl border z-50 overflow-hidden ${isDarkMode ? 'bg-slate-950 border border-slate-800 shadow-2xl' : 'bg-white border border-gray-200 shadow-xl'}`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white" style={{ fontFamily: 'var(--font-family)' }}>Notifications</h3>
            <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          </div>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell size={32} className="mx-auto mb-2 opacity-20" />
              <p>No notifications</p>
            </div>
          ) : (
            notifications.map(notification => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => {
                  handleNotificationClick(notification);
                  const targetCourse = courses.find(c => notification.message.includes(c.code));
                  if (targetCourse) {
                    setSelectedCourseDetail(targetCourse);
                    setActiveNav('Subject');
                    setShowNotifications(false);
                  }
                }}
                className={`p-4 border-b cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-all duration-150 border-gray-100 dark:border-gray-700 ${!notification.read ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg shadow-md ${
                    notification.type === 'assignment' ? 'bg-blue-600 text-white' :
                    notification.type === 'grade' ? 'bg-green-600 text-white' :
                    'bg-gray-600 text-white'
                  }`}>
                    {notification.type === 'assignment' ? <FileText size={16} /> :
                     notification.type === 'grade' ? <CheckSquare size={16} /> :
                     <Bell size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`} style={{ fontFamily: 'var(--font-family)' }}>{notification.title}</p>
                    <p className={`text-xs mt-1 line-clamp-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{notification.message}</p>
                    <p className={`text-xs mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>{notification.time}</p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// --- COURSE MODAL COMPONENT (moved outside App to prevent remount) ---
const CourseModal = ({ showCourseModal, setShowCourseModal, selectedCourseDetail, user, logAttendance }) => {
  if (!showCourseModal || !selectedCourseDetail) return null;
  
  const handleJoinMeet = () => {
    const room = selectedCourseDetail.code || "SP101-BSIT3J";
    const name = encodeURIComponent(user?.name || user?.username || "Admin User");
    const role = user?.role === 'professor' ? 'professor' : 'student';
    
    // Log attendance
    if (logAttendance) {
      logAttendance(user?.name || user?.username || "Admin User", selectedCourseDetail.code);
    }
    
    window.open(`http://localhost:5173/?room=${room}&name=${name}&role=${role}`, '_blank');
  };

  const handleInfoTileClick = (type, value) => {
    if (type === 'schedule') {
      navigator.clipboard.writeText(value);
      alert('Schedule copied to clipboard!');
    } else if (type === 'room') {
      alert(`Room location: ${value}`);
    } else if (type === 'instructor') {
      alert(`Instructor: ${value}`);
    } else if (type === 'progress') {
      alert(`Course Progress: ${value}%`);
    }
  };
  
  return (
    <AnimatePresence>
      {showCourseModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowCourseModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-wide">
                      {selectedCourseDetail.code}
                    </span>
                    <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full uppercase tracking-wide">
                      {selectedCourseDetail.section}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'var(--font-family)' }}>{selectedCourseDetail.title}</h2>
                </div>
                <button 
                  onClick={() => setShowCourseModal(false)} 
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-600 transition-all duration-200 hover:scale-110"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-120px)]">
              <div className="space-y-6">
                {/* Info Tiles Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleInfoTileClick('instructor', selectedCourseDetail.professor)}
                    className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-800 hover:border-blue-500 hover:shadow-md cursor-pointer transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-600 rounded-lg">
                        <User size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Instructor</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{selectedCourseDetail.professor}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleInfoTileClick('schedule', selectedCourseDetail.sched)}
                    className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200 dark:border-purple-800 hover:border-purple-500 hover:shadow-md cursor-pointer transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-600 rounded-lg">
                        <Clock size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Schedule</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{selectedCourseDetail.sched}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleInfoTileClick('room', selectedCourseDetail.room)}
                    className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-800 hover:border-green-500 hover:shadow-md cursor-pointer transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-600 rounded-lg">
                        <MapPin size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Room</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{selectedCourseDetail.room}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleInfoTileClick('progress', selectedCourseDetail.progress)}
                    className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl border border-orange-200 dark:border-orange-800 hover:border-orange-500 hover:shadow-md cursor-pointer transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-600 rounded-lg">
                        <TrendingUp size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Progress</p>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900 dark:text-white">{selectedCourseDetail.progress}%</p>
                        </div>
                        <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedCourseDetail.progress}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* PTC Meet Integration */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl border border-blue-500 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                      <Video size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg" style={{ fontFamily: 'var(--font-family)' }}>PTC Meet Integration</h3>
                      <p className="text-sm text-blue-100">Join your virtual classroom instantly</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleJoinMeet}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Camera size={20} />
                    Join PTC Meet Class
                  </motion.button>
                </motion.div>
                
                {/* Announcement */}
                <div className="p-5 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-family)' }}>
                    <Bell size={18} className="text-blue-600" />
                    Latest Announcement
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{selectedCourseDetail.announcement}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- ATTENDANCE MODAL COMPONENT ---
const AttendanceModal = ({ showAttendanceModal, setShowAttendanceModal, attendanceLogs, attendanceFilter, setAttendanceFilter, exportAttendanceToCSV }) => {
  if (!showAttendanceModal) return null;

  const filteredLogs = attendanceFilter === 'All' 
    ? attendanceLogs 
    : attendanceLogs.filter(log => log.status === attendanceFilter);

  return (
    <AnimatePresence>
      {showAttendanceModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowAttendanceModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'var(--font-family)' }}>
                    📊 Attendance Sheet
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">Track your class attendance records</p>
                </div>
                <button 
                  onClick={() => setShowAttendanceModal(false)} 
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-600 transition-all duration-200 hover:scale-110"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <div className="flex gap-2">
                {['All', 'Present', 'Late'].map((filter) => (
                  <motion.button
                    key={filter}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setAttendanceFilter(filter)}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                      attendanceFilter === filter 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {filter}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-200px)]">
              {filteredLogs.length === 0 ? (
                <div className="text-center py-12">
                  <ClipboardList size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400">No attendance records found</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredLogs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{log.studentName}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{log.subject}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600 dark:text-gray-400">{log.date}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{log.timestamp}</p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${
                            log.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {log.status}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={exportAttendanceToCSV}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
              >
                <Download size={20} />
                Export to CSV / Download Report
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- BADGES MODAL COMPONENT ---
const BadgesModal = ({ showBadgesModal, setShowBadgesModal, badges, claimedBadges, claimBadge }) => {
  if (!showBadgesModal) return null;

  return (
    <AnimatePresence>
      {showBadgesModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowBadgesModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-orange-500/10 to-yellow-500/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'var(--font-family)' }}>
                    🏆 Student Badges & Milestones
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">View your achievements and progress</p>
                </div>
                <button 
                  onClick={() => setShowBadgesModal(false)} 
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-600 transition-all duration-200 hover:scale-110"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-120px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {badges.map((badge) => (
                  <motion.div
                    key={badge.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-5 rounded-2xl border transition-all ${
                      badge.earned 
                        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800' 
                        : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 opacity-60'
                    }`}
                  >
                    <div className="text-center mb-3">
                      <div className={`text-4xl mb-2 ${badge.earned ? '' : 'grayscale'}`}>
                        {badge.icon}
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm">{badge.name}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{badge.description}</p>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{badge.progress}/{badge.required}</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(badge.progress / badge.required) * 100}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={`h-full rounded-full ${
                            badge.earned 
                              ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
                              : 'bg-gradient-to-r from-gray-400 to-gray-500'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Claim Button */}
                    {badge.earned && !claimedBadges.includes(badge.id) && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => claimBadge(badge.id)}
                        className="w-full py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-bold text-sm hover:from-yellow-600 hover:to-orange-600 transition-all shadow-md"
                      >
                        🎉 Claim Badge
                      </motion.button>
                    )}

                    {claimedBadges.includes(badge.id) && (
                      <div className="w-full py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-xl font-bold text-sm text-center">
                        ✅ Claimed
                      </div>
                    )}

                    {!badge.earned && (
                      <div className="w-full py-2 bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded-xl font-bold text-sm text-center">
                        🔒 Locked
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- SUBMISSION MODAL COMPONENT ---
const SubmissionModal = ({ showSubmitModal, setShowSubmitModal, selectedTaskForSubmit, submittedTasks, setSubmittedTasks }) => {
  if (!showSubmitModal || !selectedTaskForSubmit) return null;

  const handleSubmit = () => {
    setSubmittedTasks([...submittedTasks, selectedTaskForSubmit.id]);
    setShowSubmitModal(false);
  };

  return (
    <AnimatePresence>
      {showSubmitModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowSubmitModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Submit Assignment</h3>
                <button onClick={() => setShowSubmitModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Assignment:</p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">{selectedTaskForSubmit.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Due: {selectedTaskForSubmit.dueDate}</p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Upload File</label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <FileText size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">PDF, DOC, DOCX (Max 10MB)</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 rounded-xl text-white font-medium transition-all hover:scale-105"
                  style={{ background: 'var(--gradient-electric)' }}
                >
                  Submit
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- GRADING MODAL COMPONENT ---
const GradingModal = ({ showGradingModal, setShowGradingModal, selectedTaskForGrading, gradedTasks, setGradedTasks, gradeValue, setGradeValue, gradeComment, setGradeComment }) => {
  if (!showGradingModal || !selectedTaskForGrading) return null;

  const handleGradeSubmit = () => {
    setGradedTasks([...gradedTasks, selectedTaskForGrading.id]);
    setShowGradingModal(false);
    setGradeValue('');
    setGradeComment('');
  };

  return (
    <AnimatePresence>
      {showGradingModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowGradingModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Grade Submission</h3>
                <button onClick={() => setShowGradingModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Task:</p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">{selectedTaskForGrading.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Due: {selectedTaskForGrading.dueDate}</p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Grade Value</label>
                <input
                  type="text"
                  value={gradeValue}
                  onChange={(e) => setGradeValue(e.target.value)}
                  placeholder="e.g., 95/100"
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Comments</label>
                <textarea
                  value={gradeComment}
                  onChange={(e) => setGradeComment(e.target.value)}
                  placeholder="Add feedback for the student..."
                  rows={3}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowGradingModal(false)}
                  className="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGradeSubmit}
                  disabled={!gradeValue.trim()}
                  className="flex-1 px-4 py-2 rounded-xl text-white font-medium transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'var(--gradient-electric)' }}
                >
                  Save Grade
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- VIDEO MEETING MODAL COMPONENT (Role-Aware PTC Meet Integration) ---
const VideoMeetingModal = ({ 
  activeMeeting, 
  setActiveMeeting, 
  isEmbeddedStream, 
  setIsEmbeddedStream, 
  isDarkMode, 
  user,
  activeMeetingUrl,
  setActiveMeetingUrl
}) => {
  const [sharedMeetUrl, setSharedMeetUrl] = useState('');
  
  if (!activeMeeting.isOpen) return null;
  
  const isProfessor = user?.role === 'professor';
  const meetingTitle = isProfessor ? 'Hosting Live Classroom (Host Controls)' : 'Joined Live Class (Student Mode)';
  
  const handleGenerateGoogleMeet = () => {
    window.open('http://localhost:5173/', '_blank');
  };
  
  const handleShareLink = () => {
    if (sharedMeetUrl.trim()) {
      setActiveMeetingUrl(sharedMeetUrl.trim());
      alert('PTC Meet link shared with class successfully!');
      setSharedMeetUrl('');
    }
  };
  
  const handleJoinActiveMeet = () => {
    if (activeMeetingUrl) {
      window.open(activeMeetingUrl, '_blank');
    }
  };
  
  const handleOpenExternal = () => {
    if (activeMeeting.roomUrl) {
      window.open(activeMeeting.roomUrl, '_blank');
    }
  };
  
  const handleToggleStream = () => {
    setIsEmbeddedStream(!isEmbeddedStream);
  };
  
  const handleCloseMeeting = () => {
    setActiveMeeting({ isOpen: false, roomUrl: '', title: '', role: '' });
    setIsEmbeddedStream(true);
  };
  
  const handleCopyLink = () => {
    if (activeMeeting.roomUrl) {
      navigator.clipboard.writeText(activeMeeting.roomUrl);
      alert('Meeting link copied to clipboard!');
    }
  };
  
  // Generate PTC Meet room URL for embedded preview
  const room = activeMeeting.title?.replace(/[^a-zA-Z0-9]/g, '') || 'SP101-BSIT3J';
  const userName = user?.name || user?.username || 'User';
  const userRole = user?.role || 'student';
  const ptcMeetRoomUrl = `http://localhost:5173/?room=${room}&name=${encodeURIComponent(userName)}&role=${userRole}`;
  
  return (
    <AnimatePresence>
      {activeMeeting.isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseMeeting();
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-5xl mx-4 rounded-2xl shadow-2xl overflow-hidden"
            style={{ backgroundColor: isDarkMode ? '#1e293b' : '#ffffff' }}
          >
            {/* Meeting Header */}
            <div className="p-4 flex items-center justify-between border-b" style={{ backgroundColor: 'var(--gradient-electric)', borderColor: 'rgba(255,255,255,0.1)' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Video size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{meetingTitle}</h3>
                  <p className="text-white/80 text-xs">{activeMeeting.title || 'Live Session'}</p>
                </div>
              </div>
              <button
                onClick={handleCloseMeeting}
                className="text-white hover:text-white/80 transition-colors p-1"
              >
                <X size={24} />
              </button>
            </div>

            {/* Meeting Content */}
            <div className="p-4">
              {/* Professor PTC Meet Generation Controls */}
              {isProfessor && (
                <div className="mb-4 p-4 rounded-xl" style={{ backgroundColor: isDarkMode ? '#0f172a' : '#f1f5f9' }}>
                  <h4 className="font-bold mb-3 text-sm" style={{ color: 'var(--color-primary)' }}>PTC Meet Host Controls</h4>
                  <div className="flex flex-wrap gap-3 mb-3">
                    <button
                      onClick={handleGenerateGoogleMeet}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                      style={{ background: 'var(--gradient-electric)' }}
                    >
                      <Video size={16} />
                      Generate & Open PTC Meet (As Host)
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Paste PTC Meet URL (e.g., http://localhost:5173/?room=SP101)"
                      value={sharedMeetUrl}
                      onChange={(e) => setSharedMeetUrl(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl text-sm outline-none transition-all"
                      style={{ backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', color: isDarkMode ? '#f8fafc' : '#0f172a', borderColor: 'var(--border-light)' }}
                    />
                    <button
                      onClick={handleShareLink}
                      disabled={!sharedMeetUrl.trim()}
                      className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ background: 'var(--gradient-electric)' }}
                    >
                      Share Link with Class
                    </button>
                  </div>
                  {activeMeetingUrl && (
                    <div className="mt-2 p-2 rounded-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
                      <p className="text-xs font-medium" style={{ color: '#22c55e' }}>✓ Active meeting link shared: {activeMeetingUrl}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Student PTC Meet Join Controls */}
              {!isProfessor && activeMeetingUrl && (
                <div className="mb-4 p-4 rounded-xl" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
                  <h4 className="font-bold mb-3 text-sm" style={{ color: 'var(--color-primary)' }}>Active PTC Meet Class</h4>
                  <button
                    onClick={handleJoinActiveMeet}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}
                  >
                    <Video size={16} />
                    Join Active PTC Meet Class
                  </button>
                  <p className="text-xs mt-2 text-center" style={{ color: 'var(--color-muted)' }}>
                    Professor has shared: {activeMeetingUrl}
                  </p>
                </div>
              )}

              {/* Action Buttons Row */}
              <div className="flex flex-wrap gap-3 mb-4">
                <button
                  onClick={handleOpenExternal}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                  style={{ background: 'var(--gradient-electric)' }}
                >
                  <ExternalLink size={16} />
                  Open Course Meet Link (External Tab)
                </button>
                <button
                  onClick={handleToggleStream}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105 ${isEmbeddedStream ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'}`}
                >
                  {isEmbeddedStream ? <Monitor size={16} /> : <MonitorOff size={16} />}
                  {isEmbeddedStream ? 'Toggle In-App Stream (Embedded PTC Meet)' : 'Toggle In-App Stream (Embedded PTC Meet)'}
                </button>
              </div>

              {/* Embedded Stream / External Placeholder */}
              {isEmbeddedStream ? (
                <div className="relative w-full h-[400px] rounded-xl overflow-hidden border-2" style={{ borderColor: 'var(--border-light)' }}>
                  <iframe
                    src={ptcMeetRoomUrl}
                    allow="camera; microphone; display-capture; autoplay; clipboard-write"
                    className="w-full h-full"
                    style={{ backgroundColor: '#000' }}
                    title="PTC Meet Video Integration"
                  />
                </div>
              ) : (
                <div className="w-full h-[400px] rounded-xl flex items-center justify-center border-2" style={{ backgroundColor: isDarkMode ? '#0f172a' : '#f1f5f9', borderColor: 'var(--border-light)' }}>
                  <div className="text-center">
                    <ExternalLink size={48} className="mx-auto mb-4" style={{ color: 'var(--color-muted)' }} />
                    <p className="font-medium mb-2" style={{ color: 'var(--color-primary)' }}>Meeting opened in external tab</p>
                    <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Use the buttons above to join PTC Meet or enable embedded PTC Meet preview</p>
                  </div>
                </div>
              )}

              {/* Role-Specific Controls */}
              <div className="mt-4 p-4 rounded-xl" style={{ backgroundColor: isDarkMode ? '#0f172a' : '#f1f5f9' }}>
                <h4 className="font-bold mb-3 text-sm" style={{ color: 'var(--color-primary)' }}>
                  {isProfessor ? 'Host Controls' : 'Student Controls'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {isProfessor ? (
                    <>
                      <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all text-sm font-medium">
                        <PhoneOff size={16} />
                        End Meeting for All
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 transition-all text-sm font-medium">
                        <MicOff size={16} />
                        Mute All Participants
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-all text-sm font-medium">
                        <Monitor size={16} />
                        Share Screen
                      </button>
                      <button 
                        onClick={handleCopyLink}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-all text-sm font-medium"
                      >
                        <Copy size={16} />
                        Copy Meeting Link
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 transition-all text-sm font-medium">
                        <Hand size={16} />
                        Raise Hand
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-all text-sm font-medium">
                        <Mic size={16} />
                        Toggle Microphone
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 transition-all text-sm font-medium">
                        <Video size={16} />
                        Toggle Video
                      </button>
                      <button 
                        onClick={handleCloseMeeting}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all text-sm font-medium"
                      >
                        <LogOut size={16} />
                        Leave Meeting
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- PROFESSOR COURSES DATA (Global for Sidebar access) ---
const professorCourses = [
  { id: 1, code: 'SIA 101', title: 'Systems Integration & Architecture', section: 'BSIT 3J', year: '3rd Year', students: 45, color: 'bg-[#2d1b33] text-white', textColor: '#ffffff', professor: 'Prof. Instructor', progress: 65, meetLink: 'http://localhost:5173/?room=SIA101-BSIT3J', room: 'Lab 305', sched: 'Fri 9:00-12:00PM', announcement: 'Midterm lab grading in progress.' },
  { id: 2, code: 'SE 101', title: 'Software Engineering 1', section: 'BSIT 2G', year: '2nd Year', students: 38, color: 'bg-[#0c4a6e] text-white', textColor: '#ffffff', professor: 'Prof. Instructor', progress: 50, meetLink: 'http://localhost:5173/?room=SE101-BSIT2G', room: 'Lab 301', sched: 'Tue/Thu 2:00-4:00PM', announcement: 'Quiz 2 results ready for validation.' },
  { id: 3, code: 'CAP 101', title: 'Capstone Project & Research', section: 'BSIT 4A', year: '4th Year', students: 12, color: 'bg-[#92400e] text-white', textColor: '#ffffff', professor: 'Prof. Instructor', progress: 30, meetLink: 'http://localhost:5173/?room=CAP101-BSIT4A', room: 'RM 405', sched: 'Wed 10:00-12:00PM', announcement: 'Chapter 1 proposal reviews pending.' },
  { id: 4, code: 'IAS 101', title: 'Information Assurance & Security', section: 'BSIT 3H', year: '3rd Year', students: 42, color: 'bg-[#064e3b] text-white', textColor: '#ffffff', professor: 'Prof. Instructor', progress: 75, meetLink: 'http://localhost:5173/?room=IAS101-BSIT3H', room: 'Lab 302', sched: 'Mon/Wed 1:00-3:00PM', announcement: 'Security lab submissions received.' }
];

// --- SIDEBAR COMPONENT (moved outside App to prevent remount) ---
const Sidebar = ({
  t,
  courses,
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
  activeNav,
  setActiveNav,
  isDarkMode,
  activeItem,
  handleSubjectSelect,
  handleLogout,
  user
}) => {
  const isProfessor = user?.role === 'professor';

  const navigationItems = [
    { id: 'Home', name: t.home, icon: Home },
    { id: 'Calendar', name: t.calendar, icon: Calendar },
    { id: 'Gemini', name: t.gemini, icon: Sparkles },
    { id: 'Tasks', name: t.todo, icon: CheckSquare },
  ];

  // Separate courses to list them under "Enrolled" or "Teaching Load"
  const activeEnrolledCourses = isProfessor ? professorCourses : courses;

  return (
    <>
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
      
      <motion.aside
        initial={false}
        animate={{ 
          width: isMobileSidebarOpen ? '288px' : (window.innerWidth >= 768 ? '288px' : '0px'),
          opacity: isMobileSidebarOpen ? 1 : (window.innerWidth >= 768 ? 1 : 0),
          transform: isMobileSidebarOpen ? 'translateX(0)' : (window.innerWidth >= 768 ? 'translateX(0)' : 'translateX(-100%)')
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="h-full border-r z-50 overflow-hidden flex-shrink-0 fixed inset-y-0 left-0 md:relative md:translate-x-0 md:w-64 md:block transition-transform duration-300"
        style={{ backgroundColor: 'var(--sidebar-bg)', borderColor: 'var(--border-light)' }}
      >
        <div className="flex flex-col h-full min-w-[288px]">
          {/* Nav links rendering loop */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-all border-none cursor-pointer text-left font-semibold text-sm hover:scale-[1.02] hover:shadow-lg rounded-2xl ${isActive && isDarkMode ? 'shadow-[0_2px_12px_rgba(59,130,246,0.3)]' : ''}`}
                  style={{
                    backgroundColor: isActive 
                      ? (isDarkMode ? 'rgba(59, 130, 246, 0.2)' : '#e0f2fe') 
                      : 'transparent',
                    color: isActive 
                      ? (isDarkMode ? '#ffffff' : '#0369a1') 
                      : (isDarkMode ? '#cbd5e1' : 'var(--color-primary)'),
                    transform: isActive ? 'scale(1.02)' : 'scale(1)',
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: isActive ? (isDarkMode ? '#ffffff' : '#0369a1') : (isDarkMode ? '#94a3b8' : 'var(--color-secondary)') }} />
                  <span>{item.name}</span>
                </button>
              );
            })}

            {/* ENROLLED / SUBJECTS LIST SECTION (Google Classroom Matching Layout) */}
            <div className="mt-4">
              <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-300" style={{ color: 'var(--color-muted)' }}>
                {isProfessor ? t.teachingLoad : t.enrolled}
              </div>
              <div className="mt-1 space-y-1">
                {activeEnrolledCourses.map((course) => {
                  const isActive = activeItem === course.id;

                  return (
                    <button
                      key={course.id}
                      onClick={() => {
                        handleSubjectSelect(course);
                        setIsMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-left text-sm font-medium hover:scale-[1.02] hover:shadow-md transition-all duration-150 group border-none cursor-pointer ${isActive && isDarkMode ? 'shadow-[0_2px_12px_rgba(59,130,246,0.3)]' : ''}`}
                      style={{
                        backgroundColor: isActive 
                          ? (isDarkMode ? 'rgba(59, 130, 246, 0.2)' : '#e0f2fe') 
                          : 'transparent',
                        color: isActive 
                          ? (isDarkMode ? '#ffffff' : '#0369a1') 
                          : (isDarkMode ? '#cbd5e1' : 'var(--color-primary)'),
                      }}
                    >
                      {/* Miniature Colored Circle with Initial letter */}
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm shrink-0 group-hover:scale-110 transition-transform ${course.color.split(' ')[0]}`}
                      >
                        {course.code.charAt(0)}
                      </div>
                      {/* Subject Code and Section Row */}
                      <div className="overflow-hidden flex-1">
                        <p className="truncate font-semibold m-0 leading-tight" style={{ color: isActive ? (isDarkMode ? '#ffffff' : '#0369a1') : (isDarkMode ? '#cbd5e1' : 'var(--color-primary)') }}>
                          {course.code}
                        </p>
                        <p className="text-[11px] truncate m-0 opacity-70" style={{ color: isActive ? (isDarkMode ? '#ffffff' : '#0369a1') : (isDarkMode ? '#94a3b8' : 'var(--color-muted)') }}>
                          {course.section}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Bottom Settings Track */}
          <div className="p-4 border-t" style={{ borderColor: 'var(--border-light)' }}>
            <button 
              onClick={() => setActiveNav('Settings')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left font-semibold text-sm hover:scale-[1.02] hover:shadow-md transition-all duration-150 border-none cursor-pointer"
              style={{ color: 'var(--color-primary)' }}
            >
              <Settings className="w-5 h-5" style={{ color: 'var(--color-secondary)' }} />
              <span>Settings</span>
            </button>
            <button 
              onClick={() => setActiveNav('Archived')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left font-semibold text-sm hover:scale-[1.02] hover:shadow-md transition-all duration-150 border-none cursor-pointer mt-1"
              style={{ color: 'var(--color-primary)' }}
            >
              <BookOpen className="w-5 h-5" style={{ color: 'var(--color-secondary)' }} />
              <span>Archived classes</span>
            </button>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all border-none cursor-pointer font-bold text-sm mt-2">
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

// --- FLOATING CHAT COMPONENT (moved outside App to prevent remount) ---
const FloatingChat = ({ 
  isAiChatOpen, 
  setIsAiChatOpen, 
  aiMessage, 
  setAiMessage, 
  isAiLoading, 
  aiResponse, 
  systemCommandNotification, 
  sendAiMessage, 
  getUnreadCount,
  isDarkMode,
  user,
  setAiResponse,
  setSystemCommandNotification
}) => {
  // Render ONLY if user is faculty/prof/admin/host
  const isFaculty = user?.role === 'host' || 
                    user?.role === 'faculty' || 
                    user?.role === 'professor' || 
                    user?.name?.toLowerCase().includes('admin') || 
                    user?.name?.toLowerCase().includes('prof');

  if (!isFaculty) return null; // Completely hidden for Student accounts

  const isProfessor = user?.role === 'professor';
  
  const quickPrompts = isProfessor ? [
    { text: "Generate Quiz Outline", icon: "📝" },
    { text: "Optimize Capstone Code Structure", icon: "⚡" },
    { text: "Explain System Integration Patterns", icon: "🔗" },
    { text: "Review Assignment Requirements", icon: "✅" }
  ] : [
    { text: "📅 Next Deadline?", icon: "📅" },
    { text: "📖 Class Syllabus", icon: "📖" },
    { text: "💡 How to Join Meet?", icon: "💡" },
    { text: "📊 My Progress", icon: "📊" }
  ];

  const handleQuickPrompt = (prompt) => {
    setAiMessage(prompt);
    setTimeout(() => sendAiMessage(), 100);
  };

  const handleClearChat = () => {
    setAiResponse('');
    setSystemCommandNotification('');
    setAiMessage('');
  };

  return (
  <div className="fixed bottom-6 right-6 z-50">
    <AnimatePresence>
      {isAiChatOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="mb-4 w-96 rounded-2xl shadow-2xl border overflow-hidden bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Zap size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ fontFamily: 'var(--font-family)' }}>AI Assistant</h3>
                  <p className="text-xs text-white/80">{isProfessor ? 'Faculty Support' : 'Student Support'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleClearChat}
                  className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-all"
                  title="Clear chat"
                >
                  <Trash2 size={16} />
                </button>
                <button onClick={() => setIsAiChatOpen(false)} className="text-white/80 hover:text-white">
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Zap size={16} className="text-white" />
                </div>
                <div className="max-w-[80%] bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-sm">
                  <p className="text-sm" style={{ fontFamily: 'var(--font-family)' }}>
                    {isProfessor 
                      ? "Hey! 👋 I'm your AI faculty assistant. How can I help with your teaching tasks today?" 
                      : "Hey! 👋 I'm your AI student assistant. How can I help with your studies today?"}
                  </p>
                </div>
              </div>
              
              {systemCommandNotification && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <Zap size={16} className="text-white" />
                  </div>
                  <div className="max-w-[80%] bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-3 shadow-sm border border-green-200 dark:border-green-800">
                    <p className="text-sm font-semibold" style={{ fontFamily: 'var(--font-family)' }}>{systemCommandNotification}</p>
                  </div>
                </motion.div>
              )}
              
              {aiResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Zap size={16} className="text-white" />
                  </div>
                  <div className="max-w-[80%] bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-sm border border-purple-200 dark:border-purple-800">
                    <p className="text-sm" style={{ fontFamily: 'var(--font-family)' }}>{aiResponse}</p>
                  </div>
                </motion.div>
              )}
              
              {isAiLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Zap size={16} className="text-white" />
                  </div>
                  <div className="max-w-[80%] bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Quick Prompts */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Quick Actions:</p>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickPrompt(prompt.text)}
                  className="px-3 py-1.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300 transition-all"
                >
                  {prompt.icon} {prompt.text}
                </button>
              ))}
            </div>
          </div>
          
          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex gap-2">
              <input
                key="global-ai-assistance-input-field"
                type="text"
                value={aiMessage}
                onChange={(e) => setAiMessage(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 px-4 py-3 rounded-2xl bg-gray-100 dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                style={{ fontFamily: 'var(--font-family)' }}
                onKeyPress={(e) => e.key === 'Enter' && sendAiMessage()}
              />
              <button
                onClick={sendAiMessage}
                disabled={isAiLoading || !aiMessage.trim()}
                className="p-3 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white disabled:opacity-50 hover:from-purple-700 hover:to-blue-700 transition-all"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    
    {/* Floating Button with Pulsing Indicator */}
    <motion.button
      onClick={() => setIsAiChatOpen(!isAiChatOpen)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all relative"
    >
      <div className="absolute inset-0 rounded-full bg-purple-600 animate-ping opacity-75"></div>
      <MessageSquare size={24} className="relative z-10" />
      {getUnreadCount() > 0 && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold z-20">
          {getUnreadCount()}
        </div>
      )}
    </motion.button>
  </div>
  );
};

// --- MAIN APP COMPONENT ---
const App = () => {
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [user, setUser] = useState(null);
  
  // Registration State
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student"
  });
  
  // Auth Screen Dark Mode (separate from dashboard dark mode)
  const [authDarkMode, setAuthDarkMode] = useState(false);
  
  // Navigation State
  const [activeNav, setActiveNav] = useState('Home');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });
  
  // UI State
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [selectedCourseDetail, setSelectedCourseDetail] = useState(null);
  const [classroomTab, setClassroomTab] = useState('Stream');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiMessage, setAiMessage] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [isProfChatOpen, setIsProfChatOpen] = useState(false);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [systemCommandNotification, setSystemCommandNotification] = useState('');
  const [typedMessage, setTypedMessage] = useState("");
  const [activeItem, setActiveItem] = useState(null);
  
  // Attendance State
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [attendanceFilter, setAttendanceFilter] = useState('All');
  
  // Badges State
  const [showBadgesModal, setShowBadgesModal] = useState(false);
  const [badges, setBadges] = useState([
    { id: 1, name: '100% Punctual', icon: '⏰', description: 'Attend 5 classes on time', progress: 3, required: 5, earned: false },
    { id: 2, name: 'Early Bird Submitter', icon: '🐦', description: 'Submit 3 assignments early', progress: 2, required: 3, earned: false },
    { id: 3, name: 'Meet Pioneer', icon: '📷', description: 'Join 10 PTC Meet sessions', progress: 1, required: 10, earned: false },
    { id: 4, name: 'Perfect Attendance', icon: '🏆', description: 'Never miss a class for a month', progress: 15, required: 20, earned: false },
    { id: 5, name: 'Quiz Master', icon: '📝', description: 'Score 90%+ on 5 quizzes', progress: 2, required: 5, earned: false },
    { id: 6, name: 'Team Player', icon: '🤝', description: 'Participate in 5 group activities', progress: 3, required: 5, earned: false },
  ]);
  const [claimedBadges, setClaimedBadges] = useState([]);
  
  // Active Meeting State for Role-Aware PTC Meet Integration
  const [activeMeeting, setActiveMeeting] = useState({ isOpen: false, roomUrl: '', title: '', role: '' });
  const [isEmbeddedStream, setIsEmbeddedStream] = useState(true);
  const [activeMeetingUrl, setActiveMeetingUrl] = useState(''); // Global shared PTC Meet URL from professor
  
  // Assignment & Grading Modal States
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedTaskForSubmit, setSelectedTaskForSubmit] = useState(null);
  const [showGradingModal, setShowGradingModal] = useState(false);
  const [selectedTaskForGrading, setSelectedTaskForGrading] = useState(null);
  const [gradeValue, setGradeValue] = useState("");
  const [gradeComment, setGradeComment] = useState("");
  const [submittedTasks, setSubmittedTasks] = useState([]);
  const [gradedTasks, setGradedTasks] = useState([]);
  
  // GCR Notification Toggle States
  const [allowEmail, setAllowEmail] = useState(true);
  const [commentsOnPosts, setCommentsOnPosts] = useState(true);
  const [classesEnrolled, setClassesEnrolled] = useState(true);
  const [invitations, setInvitations] = useState(true);
  const [dueDateReminders, setDueDateReminders] = useState(true);
  
  // Language State
  const [currentLang, setCurrentLang] = useState('en');
  
 // Language Dictionary
 const languageDictionary = {
    en: {
      welcome: "Welcome back",
      courses: "Your Courses",
      settings: "Settings",
      profile: "Profile",
      notifications: "Notifications",
      languageSettings: "Language Settings",
      accountSettings: "Account Settings",
      change: "Change",
      emailNotifications: "Email notifications",
      commentsOnPosts: "Comments on posts",
      classesEnrolled: "Classes you're enrolled in",
      invitations: "Invitations to classes",
      dueDateReminders: "Due date reminders",
      customizeExperience: "Customize your experience",
      selectLanguage: "Select Language",
      home: "Home",
      calendar: "Calendar",
      gemini: "Gemini",
      todo: "To-do",
      teachingLoad: "Teaching Load",
      enrolled: "Enrolled",
      signIn: "Sign In",
      dashboard: "Dashboard",
      announcements: "Announcements",
      archivedClasses: "Archived classes",
      signOut: "Sign Out",
      activeCourses: "Active Courses",
      completedTasks: "Completed Tasks",
      unreadNotifications: "Unread Notifications",
      averageProgress: "Average Progress",
      courseProgress: "Course Progress",
      latestUpdate: "Latest Update",
      manageClassroom: "Manage Classroom",
      joinMeet: "Join Meet",
      academicCalendar: "Academic Calendar",
      upcomingFacultyEvents: "Upcoming Faculty Events",
      schedulesToday: "Schedules Today",
      gradingQueue: "Grading Queue",
      tasksAssignments: "Tasks & Assignments",
      pendingGrading: "Pending Grading",
      pendingTasks: "Pending Tasks",
      giveGrades: "Give Grades",
      submit: "Submit",
      allCourses: "All Courses",
      browseCourses: "Browse and manage your enrolled courses"
    },
    tl: {
      welcome: "Mabuting pagbabalik",
      courses: "Iyong mga Kurso",
      settings: "Mga Setting",
      profile: "Profile",
      notifications: "Mga Notification",
      languageSettings: "Mga Setting ng Wika",
      accountSettings: "Mga Setting ng Account",
      change: "Baguhin",
      emailNotifications: "Mga notification sa email",
      commentsOnPosts: "Mga komento sa post",
      classesEnrolled: "Mga klase na iyong pinasok",
      invitations: "Mga imbitasyon sa klase",
      dueDateReminders: "Mga paalala sa due date",
      customizeExperience: "I-customize ang iyong karanasan",
      selectLanguage: "Pumili ng Wika",
      home: "Home",
      calendar: "Calendar",
      gemini: "Gemini",
      todo: "To-do",
      teachingLoad: "Teaching Load",
      enrolled: "Enrolled",
      signIn: "Mag-sign In",
      dashboard: "Dashboard",
      announcements: "Mga Anunsyo",
      archivedClasses: "Mga naka-archive na klase",
      signOut: "Mag-sign Out",
      activeCourses: "Mga Aktibong Kurso",
      completedTasks: "Mga Natapos na Gawain",
      unreadNotifications: "Mga Hindi Babasahing Notification",
      averageProgress: "Average na Progreso",
      courseProgress: "Progreso ng Kurso",
      latestUpdate: "Pinakabagong Update",
      manageClassroom: "Pamahalaan ang Classroom",
      joinMeet: "Sumali sa Meet",
      academicCalendar: "Akademikong Kalendaryo",
      upcomingFacultyEvents: "Mga Paparating na Faculty Events",
      schedulesToday: "Mga Iskedyul Ngayon",
      gradingQueue: "Pila sa Pag-grade",
      tasksAssignments: "Mga Gawain at Assignment",
      pendingGrading: "Nakabiting Pag-grade",
      pendingTasks: "Mga Nakabiting Gawain",
      giveGrades: "Bigyan ng Grade",
      submit: "Isumite",
      allCourses: "Lahat ng Kurso",
      browseCourses: "Tignan at pamahalaan ang iyong mga kurso"
    },
    es: {
      welcome: "Bienvenido de nuevo",
      courses: "Tus Cursos",
      settings: "Ajustes",
      profile: "Perfil",
      notifications: "Notificaciones",
      languageSettings: "Configuración de Idioma",
      accountSettings: "Configuración de Cuenta",
      change: "Cambiar",
      emailNotifications: "Notificaciones por correo",
      commentsOnPosts: "Comentarios en publicaciones",
      classesEnrolled: "Clases en las que estás inscrito",
      invitations: "Invitaciones a clases",
      dueDateReminders: "Recordatorios de fecha de entrega",
      customizeExperience: "Personaliza tu experiencia",
      selectLanguage: "Seleccionar Idioma",
      home: "Inicio",
      calendar: "Calendario",
      gemini: "Gemini",
      todo: "Tareas",
      teachingLoad: "Carga Docente",
      enrolled: "Inscrito",
      signIn: "Iniciar Sesión",
      dashboard: "Panel",
      announcements: "Anuncios",
      archivedClasses: "Clases archivadas",
      signOut: "Cerrar Sesión",
      activeCourses: "Cursos Activos",
      completedTasks: "Tareas Completadas",
      unreadNotifications: "Notificaciones No Leídas",
      averageProgress: "Progreso Promedio",
      courseProgress: "Progreso del Curso",
      latestUpdate: "Última Actualización",
      manageClassroom: "Gestionar Clase",
      joinMeet: "Unirse a Meet",
      academicCalendar: "Calendario Académico",
      upcomingFacultyEvents: "Próximos Eventos de Facultad",
      schedulesToday: "Horarios de Hoy",
      gradingQueue: "Cola de Calificación",
      tasksAssignments: "Tareas y Asignaciones",
      pendingGrading: "Calificación Pendiente",
      pendingTasks: "Tareas Pendientes",
      giveGrades: "Asignar Calificaciones",
      submit: "Enviar",
      allCourses: "Todos los Cursos",
      browseCourses: "Navega y gestiona tus cursos inscritos"
    },
    ja: {
      welcome: "おかえりなさい",
      courses: "あなたのコース",
      settings: "設定",
      profile: "プロフィール",
      notifications: "通知",
      languageSettings: "言語設定",
      accountSettings: "アカウント設定",
      change: "変更",
      emailNotifications: "メール通知",
      commentsOnPosts: "投稿へのコメント",
      classesEnrolled: "受講中のクラス",
      invitations: "クラスへの招待",
      dueDateReminders: "期限リマインダー",
      customizeExperience: "エクスペリエンスをカスタマイズ",
      selectLanguage: "言語を選択",
      home: "ホーム",
      calendar: "カレンダー",
      gemini: "Gemini",
      todo: "To-Do",
      teachingLoad: "担当授業",
      enrolled: "受講中",
      signIn: "サインイン",
      dashboard: "ダッシュボード",
      announcements: "お知らせ",
      archivedClasses: "アーカイブされたクラス",
      signOut: "サインアウト",
      activeCourses: "アクティブなコース",
      completedTasks: "完了したタスク",
      unreadNotifications: "未読通知",
      averageProgress: "平均進捗",
      courseProgress: "コース進捗",
      latestUpdate: "最新の更新",
      manageClassroom: "クラスを管理",
      joinMeet: "Meetに参加",
      academicCalendar: "学術カレンダー",
      upcomingFacultyEvents: "今後の教員イベント",
      schedulesToday: "今日のスケジュール",
      gradingQueue: "採点キュー",
      tasksAssignments: "タスクと課題",
      pendingGrading: "採点待ち",
      pendingTasks: "保留中のタスク",
      giveGrades: "成績を付ける",
      submit: "提出",
      allCourses: "すべてのコース",
      browseCourses: "受講中のコースを閲覧・管理"
    },
    ko: {
      welcome: "다시 오신 것을 환영합니다",
      courses: "귀하의 강좌",
      settings: "설정",
      profile: "프로필",
      notifications: "알림",
      languageSettings: "언어 설정",
      accountSettings: "계정 설정",
      change: "변경",
      emailNotifications: "이메일 알림",
      commentsOnPosts: "게시물 댓글",
      classesEnrolled: "수강 중인 클래스",
      invitations: "클래스 초대",
      dueDateReminders: "마감일 알림",
      customizeExperience: "경험 사용자 정의",
      selectLanguage: "언어 선택",
      home: "홈",
      calendar: "캘린더",
      gemini: "Gemini",
      todo: "할 일",
      teachingLoad: "담당 강의",
      enrolled: "수강 중",
      signIn: "로그인",
      dashboard: "대시보드",
      announcements: "공지사항",
      archivedClasses: "보관된 클래스",
      signOut: "로그아웃",
      activeCourses: "활성 강좌",
      completedTasks: "완료된 작업",
      unreadNotifications: "읽지 않은 알림",
      averageProgress: "평균 진행률",
      courseProgress: "강좌 진행률",
      latestUpdate: "최신 업데이트",
      manageClassroom: "클래스 관리",
      joinMeet: "Meet 참여",
      academicCalendar: "학술 캘린더",
      upcomingFacultyEvents: "예정된 교직원 이벤트",
      schedulesToday: "오늘 일정",
      gradingQueue: "성적 평가 대기열",
      tasksAssignments: "작업 및 과제",
      pendingGrading: "성적 평가 대기 중",
      pendingTasks: "보류 중인 작업",
      giveGrades: "성적 부여",
      submit: "제출",
      allCourses: "모든 강좌",
      browseCourses: "수강 중인 강좌 찾아보기 및 관리"
    }
  };
  
  const t = languageDictionary[currentLang];
  
  // Data States
  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete Chapter 5 Quiz", completed: false, dueDate: "2026-04-25", priority: 'high' },
    { id: 2, title: "Submit Lab Report", completed: true, dueDate: "2026-04-23", priority: 'medium' },
    { id: 3, title: "Review Lecture Notes", completed: false, dueDate: "2026-04-26", priority: 'low' }
  ]);

  // Professor-specific tasks (Grading Queue)
  const professorTasks = [
    { id: 1, title: "Grade Midterm Lab - SIA 101 (BSIT 3J)", completed: false, dueDate: "Today", priority: 'high' },
    { id: 2, title: "Review Capstone Chapter 1 Proposals (BSIT 4A)", completed: false, dueDate: "5 Groups Pending", priority: 'high' },
    { id: 3, title: "Check Quiz 2 Auto-Graded Results (BSIT 2G)", completed: false, dueDate: "Needs Validation", priority: 'medium' }
  ];
  
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New Assignment", message: "SP 101 - Chapter 5 Quiz posted", time: "2 min ago", read: false, type: "assignment" },
    { id: 2, title: "Grade Posted", message: "Your midterm grade is available", time: "1 hour ago", read: false, type: "grade" },
    { id: 3, title: "Class Update", message: "Schedule change for tomorrow", time: "3 hours ago", read: true, type: "update" }
  ]);

  // Enhanced Course data (FORCED WHITE TEXT AND PREMIUM MATTE DARK BACKGROUNDS)
  const courses = [
    { id: 1, code: 'SP 101', title: 'SOCIAL ISSUES AND PROFESSIONAL PRACTICES', section: 'BSIT 3J', color: 'bg-[#134e4a] text-white', textColor: '#ffffff', professor: 'Cynthia B. Dulagan', progress: 70, meetLink: 'http://localhost:5173/?room=SP101-BSIT3J', room: 'RM 401', sched: 'Tue/Thu 1:00-2:30PM', announcement: 'I have already recorded your midterm grades and attendance.' },
    { id: 2, code: 'CAPSTONE 1', title: 'CAPSTONE 1', section: 'BSIT 3J', color: 'bg-[#1e1b4b] text-white', textColor: '#ffffff', professor: 'SHERYL ANN RICAFORT', progress: 45, meetLink: 'http://localhost:5173/?room=CAPSTONE1-BSIT3J', room: 'Lab 302', sched: 'Mon/Wed 8:00-10:00AM', announcement: 'Please submit your Chapter 2 drafts by Saturday.' },
    { id: 3, code: 'SIA 101', title: 'SYSTEM INTEGRATION AND ARCHITECTURE', section: 'BSIT 3J', color: 'bg-[#2d1b33] text-white', textColor: '#ffffff', professor: 'Toni D. Granado', progress: 30, meetLink: 'http://localhost:5173/?room=SIA101-BSIT3J', room: 'Lab 305', sched: 'Fri 9:00-12:00PM', announcement: 'Prepare for the hands-on lab next week.' },
    { id: 4, code: 'TECH 32', title: 'TECHNOPRENEURSHIP', section: 'BSIT 3J', color: 'bg-[#064e3b] text-white', textColor: '#ffffff', professor: 'Katherine C. Baggay', progress: 85, meetLink: 'http://localhost:5173/?room=TECH32-BSIT3J', room: 'RM 202', sched: 'Mon 1:00-4:00PM', announcement: 'Pitch deck presentations start on Monday.' },
    { id: 5, code: 'MRC 22', title: 'METHODS OF RESEARCH IN COMPUTING', section: 'BSIT 3J', color: 'bg-[#4c1d95] text-white', textColor: '#ffffff', professor: 'Toni D. Granado', progress: 10, meetLink: 'http://localhost:5173/?room=MRC22-BSIT3J', room: 'RM 405', sched: 'Wed 2:00-5:00PM', announcement: 'Finalize your research titles for approval.' },
    { id: 6, code: 'WS 102', title: 'WEB PROGRAMMING', section: 'BSIT 3J', color: 'bg-[#1e293b] text-white', textColor: '#ffffff', professor: 'Roclyn Yamson', progress: 60, meetLink: 'http://localhost:5173/?room=WS102-BSIT3J', room: 'Lab 301', sched: 'Tue 8:00-11:00AM', announcement: "Don't forget to push your React projects to GitHub." },
    { id: 7, code: 'ED 101', title: 'EMBEDDED SYSTEMS/ROBOTICS', section: 'BSIT 3J', color: 'bg-[#134e4a] text-white', textColor: '#ffffff', professor: 'Edmar Tan', progress: 50, meetLink: 'http://localhost:5173/?room=ED101-BSIT3J', room: 'Lab 402', sched: 'Thu 9:00-12:00PM', announcement: 'Bring your Arduino kits on our face-to-face class.' },
    { id: 8, code: 'NET 102', title: 'NETWORK ADMINISTRATION AND MAINTENANCE', section: 'BSIT 3J', color: 'bg-[#2d1b33] text-white', textColor: '#ffffff', professor: 'Harvey Rey B. Del Rosario', progress: 20, meetLink: 'http://localhost:5173/?room=NET102-BSIT3J', room: 'Lab 306', sched: 'Sat 8:00-11:00AM', announcement: 'Server configuration quiz is scheduled for Tuesday.' }
  ];

  const [filteredCourses, setFilteredCourses] = useState(courses);
  // --- Theme Sync Effect Fix ---
  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;
    if (isDarkMode) {
      root.classList.add('dark', 'dark-mode');
      body.classList.add('dark', 'dark-mode');
    } else {
      root.classList.remove('dark', 'dark-mode');
      body.classList.remove('dark', 'dark-mode');
    }
  }, [isDarkMode]);

  // Inject Styles on Mount
  useEffect(() => {
    injectProfessionalStyles();
  }, []);

  useEffect(() => {
    // Use professor courses if user is professor, otherwise use student courses
    if (user?.role === 'professor') {
      setFilteredCourses(professorCourses);
    } else {
      setFilteredCourses(courses);
    }
  }, [user]);

  // Essential Functions
  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) return;
    
    const trimmedUser = username.trim().toLowerCase();
    const trimmedPass = password.trim();

    if (trimmedUser === 'student' && trimmedPass === 'student') {
      setUser({ 
        username: 'student', 
        role: 'student', 
        name: 'Student User',
        section: 'BSIT 3J' 
      });
      setIsLoggedIn(true);
      setCurrentUser('Student User');
      return;
    } else if (trimmedUser === 'admin' && trimmedPass === 'admin') {
      setUser({ 
        username: 'admin', 
        role: 'professor', 
        name: 'Admin User',
        section: 'Faculty' 
      });
      setIsLoggedIn(true);
      setCurrentUser('Admin User');
      return;
    }
    
    // Invalid credentials
    alert("Invalid username or password. Please use student/student or admin/admin.");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Registration is disabled. Please use the hardcoded credentials: student/student or admin/admin.");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setCurrentUser("");
    setUser(null);
    setActiveNav('Home');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleCourseClick = (course) => {
    setSelectedCourseDetail(course);
    setShowCourseModal(true);
  };

  const handleSubjectSelect = (course) => {
    setSelectedCourseDetail(course);
    setActiveItem(course.id);
    setActiveNav('Subject');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(course => 
        course.code.toLowerCase().includes(query.toLowerCase()) ||
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.professor.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  };

  const logAttendance = (studentName, subjectCode) => {
    const newLog = {
      studentName,
      subject: subjectCode,
      timestamp: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      status: 'Present'
    };
    setAttendanceLogs([...attendanceLogs, newLog]);
    
    // Update Meet Pioneer badge progress
    setBadges(prevBadges => prevBadges.map(badge => 
      badge.id === 3 ? { ...badge, progress: badge.progress + 1 } : badge
    ));
  };

  const exportAttendanceToCSV = () => {
    const headers = ['Student Name', 'Subject', 'Date', 'Time', 'Status'];
    const csvContent = [
      headers.join(','),
      ...attendanceLogs.map(log => `${log.studentName},${log.subject},${log.date},${log.timestamp},${log.status}`)
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendance_report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const claimBadge = (badgeId) => {
    if (!claimedBadges.includes(badgeId)) {
      setClaimedBadges([...claimedBadges, badgeId]);
      alert(`🎉 Badge claimed successfully!`);
    }
  };

  const getUnreadCount = () => {
    return notifications.filter(n => !n.read).length;
  };

  const handleNotificationClick = (notification) => {
    setNotifications(notifications.map(n => 
      n.id === notification.id ? { ...n, read: true } : n
    ));
  };

  // --- LOCAL COMMAND INTERCEPTOR ---
  const interceptSystemCommand = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Calendar navigation commands
    if (lowerMessage.includes('go to calendar') || 
        lowerMessage.includes('buksan ang calendar') || 
        lowerMessage.includes('calendar view')) {
      setActiveNav('Calendar');
      return '🔄 [System Command] Navigating you to the Calendar...';
    }
    
    // Settings navigation commands
    if (lowerMessage.includes('go to settings') || 
        lowerMessage.includes('buksan ang settings') || 
        lowerMessage.includes('settings')) {
      setActiveNav('Settings');
      return '🔄 [System Command] Navigating you to the Settings...';
    }
    
    // To-Do navigation commands
    if (lowerMessage.includes('go to to-do') || 
        lowerMessage.includes('to do list') || 
        lowerMessage.includes('mga gawain')) {
      setActiveNav('Tasks');
      return '🔄 [System Command] Navigating you to the To-Do List...';
    }
    
    // Home/Dashboard navigation commands
    if (lowerMessage.includes('go home') || 
        lowerMessage.includes('dashboard') || 
        lowerMessage.includes('homepage')) {
      setActiveNav('Home');
      return '🔄 [System Command] Navigating you to the Dashboard...';
    }
    
    return null; // No command detected
  };

  // --- GEMINI SYSTEM PROMPT WITH LMS ARCHITECTURE ---
  const getGeminiSystemPrompt = () => {
    return `You are the Core Integrated AI Engineering Assistant for the Pateros Technological College Learning Management System (PTC LMS). You possess full awareness of this platform's structural anatomy, which consists of:
1. Student Dashboard (Central Portal displaying enrolled active courses like SIA 101, SP 101, CAPSTONE 1).
2. Integrated Calendar View (For scheduling academic events and tracking deadlines).
3. Task Management Interface (To-Do List Tracker for assignments and quizzes).
4. Notification Dropdown Panel (Google Workspace styling for instant grade/assignment updates).
5. Expanded Settings Panel (Centered desktop dashboard for language adjustments, profile management, and theme toggling).

Your purpose is dual-faceted:
- FOR USERS/STUDENTS: Guide them seamlessly, offer clear context about their classes, explain LMS concepts, and recognize system commands.
- FOR DEVELOPERS: Act as a live coding and system architecture consultant. If asked about extending or debugging the classroom codebase, layout structures, Tailwind properties, or state interactions within App.js, provide direct, high-level code patterns and architectural advice optimized specifically for this application.`;
  };

  const sendAiMessage = () => {
    if (!aiMessage.trim()) return;
    
    // Step 1: Check for local system commands first
    const commandResult = interceptSystemCommand(aiMessage);
    if (commandResult) {
      // Display system command notification in chat
      setSystemCommandNotification(commandResult);
      setAiMessage('');
      
      // Auto-clear notification after 3 seconds
      setTimeout(() => {
        setSystemCommandNotification('');
      }, 3000);
      return;
    }
    
    // Step 2: If no command, proceed with normal AI processing
    setIsAiLoading(true);
    
    // In a real implementation, this would send to Gemini API with the system prompt
    // For now, we simulate the response with the enhanced context
    setTimeout(() => {
      const systemPrompt = getGeminiSystemPrompt();
      setAiResponse("I understand you're asking about: " + aiMessage + ". I'm here to help you with your studies, assignments, and course navigation! As your PTC LMS AI Assistant, I can guide you through the system or help with development questions.");
      setIsAiLoading(false);
    }, 1500);
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPendingTasksCount = () => {
    return tasks.filter(t => !t.completed).length;
  };

  const getProfessorAvatar = (professorName) => {
    const femaleNames = ['Sheryl', 'Toni', 'Katherine', 'Cynthia'];
    const maleNames = ['Edmar', 'Harvey', 'Roclyn'];
    
    const firstName = professorName.split(' ')[0];
    
    if (femaleNames.some(name => professorName.includes(name))) {
      return `https://api.dicebear.com/7.x/adventurer/svg?seed=${firstName}&gender=female`;
    } else if (maleNames.some(name => professorName.includes(name))) {
      return `https://api.dicebear.com/7.x/adventurer/svg?seed=${firstName}&gender=male`;
    } else {
      return `https://api.dicebear.com/7.x/adventurer/svg?seed=${firstName}`;
    }
  };






  // --- MAIN CONTENT RENDERER ---
  const renderMainContent = () => {
    switch(activeNav) {
      case 'Home':
        return <DashboardHome
          t={t}
          currentUser={currentUser}
          courses={courses}
          tasks={tasks}
          filteredCourses={filteredCourses}
          handleCourseClick={handleCourseClick}
          getProfessorAvatar={getProfessorAvatar}
          getUnreadCount={getUnreadCount}
          user={user}
          setActiveMeeting={setActiveMeeting}
          setShowAttendanceModal={setShowAttendanceModal}
          setShowBadgesModal={setShowBadgesModal}
        />;
      case 'Courses':
        return <CoursesView setActiveNav={setActiveNav} filteredCourses={filteredCourses} handleCourseClick={handleCourseClick} />;
      case 'Calendar':
        return <CalendarView setActiveNav={setActiveNav} user={user} />;
      case 'Tasks':
        return <TasksView 
          setActiveNav={setActiveNav} 
          tasks={tasks} 
          user={user} 
          professorTasks={professorTasks}
          showSubmitModal={showSubmitModal}
          setShowSubmitModal={setShowSubmitModal}
          setSelectedTaskForSubmit={setSelectedTaskForSubmit}
          showGradingModal={showGradingModal}
          setShowGradingModal={setShowGradingModal}
          setSelectedTaskForGrading={setSelectedTaskForGrading}
          submittedTasks={submittedTasks}
          gradedTasks={gradedTasks}
        />;
      case 'Settings':
        return <SettingsView
          setActiveNav={setActiveNav}
          t={t}
          currentUser={currentUser}
          allowEmail={allowEmail}
          setAllowEmail={setAllowEmail}
          commentsOnPosts={commentsOnPosts}
          setCommentsOnPosts={setCommentsOnPosts}
          classesEnrolled={classesEnrolled}
          setClassesEnrolled={setClassesEnrolled}
          invitations={invitations}
          setInvitations={setInvitations}
          dueDateReminders={dueDateReminders}
          setDueDateReminders={setDueDateReminders}
          currentLang={currentLang}
          setCurrentLang={setCurrentLang}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          user={user}
        />;
      case 'Archived':
        return <ArchivedView setActiveNav={setActiveNav} t={t} />;
      case 'Subject':
        return <SubjectView
          selectedCourseDetail={selectedCourseDetail}
          setActiveNav={setActiveNav}
          classroomTab={classroomTab}
          setClassroomTab={setClassroomTab}
          tasks={tasks}
          currentUser={currentUser}
          isProfChatOpen={isProfChatOpen}
          setIsProfChatOpen={setIsProfChatOpen}
          getProfessorAvatar={getProfessorAvatar}
          isVideoCallActive={isVideoCallActive}
          setIsVideoCallActive={setIsVideoCallActive}
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          typedMessage={typedMessage}
          setTypedMessage={setTypedMessage}
          isDarkMode={isDarkMode}
          DashboardHome={DashboardHome}
          setActiveMeeting={setActiveMeeting}
          user={user}
        />;
      default:
        return <DashboardHome
          t={t}
          currentUser={currentUser}
          courses={courses}
          tasks={tasks}
          filteredCourses={filteredCourses}
          handleCourseClick={handleCourseClick}
          getProfessorAvatar={getProfessorAvatar}
          getUnreadCount={getUnreadCount}
          user={user}
          setActiveMeeting={setActiveMeeting}
        />;
    }
  };



  // --- MAIN RETURN ---
  if (!isLoggedIn) {
    return (
      <LoginScreen
        authDarkMode={authDarkMode}
        setAuthDarkMode={setAuthDarkMode}
        isRegisterMode={isRegisterMode}
        setIsRegisterMode={setIsRegisterMode}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        registerData={registerData}
        setRegisterData={setRegisterData}
        t={t}
      />
    );
  }

  return (
    <div className="flex h-screen overflow-hidden transition-colors duration-300" style={{ backgroundColor: 'var(--bg-main)', color: 'var(--color-primary)', fontFamily: "'Arial', sans-serif" }}>
      <Sidebar
        t={t}
        courses={courses}
        isMobileSidebarOpen={isMobileSidebarOpen}
        setIsMobileSidebarOpen={setIsMobileSidebarOpen}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        isDarkMode={isDarkMode}
        activeItem={activeItem}
        handleSubjectSelect={handleSubjectSelect}
        handleLogout={handleLogout}
        user={user}
      />
      <Dashboard
        isDarkMode={isDarkMode}
        isMobileSidebarOpen={isMobileSidebarOpen}
        setIsMobileSidebarOpen={setIsMobileSidebarOpen}
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        getUnreadCount={getUnreadCount}
        toggleDarkMode={toggleDarkMode}
        renderMainContent={renderMainContent}
        user={user}
      />
      <NotificationDropdown 
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        isDarkMode={isDarkMode}
        notifications={notifications}
        handleNotificationClick={handleNotificationClick}
        courses={courses}
        setSelectedCourseDetail={setSelectedCourseDetail}
        setActiveNav={setActiveNav}
      />
      <CourseModal 
        showCourseModal={showCourseModal}
        setShowCourseModal={setShowCourseModal}
        selectedCourseDetail={selectedCourseDetail}
        user={user}
        logAttendance={logAttendance}
      />
      <AttendanceModal 
        showAttendanceModal={showAttendanceModal}
        setShowAttendanceModal={setShowAttendanceModal}
        attendanceLogs={attendanceLogs}
        attendanceFilter={attendanceFilter}
        setAttendanceFilter={setAttendanceFilter}
        exportAttendanceToCSV={exportAttendanceToCSV}
      />
      <BadgesModal 
        showBadgesModal={showBadgesModal}
        setShowBadgesModal={setShowBadgesModal}
        badges={badges}
        claimedBadges={claimedBadges}
        claimBadge={claimBadge}
      />
      <SubmissionModal 
        showSubmitModal={showSubmitModal}
        setShowSubmitModal={setShowSubmitModal}
        selectedTaskForSubmit={selectedTaskForSubmit}
        submittedTasks={submittedTasks}
        setSubmittedTasks={setSubmittedTasks}
      />
      <GradingModal 
        showGradingModal={showGradingModal}
        setShowGradingModal={setShowGradingModal}
        selectedTaskForGrading={selectedTaskForGrading}
        gradedTasks={gradedTasks}
        setGradedTasks={setGradedTasks}
        gradeValue={gradeValue}
        setGradeValue={setGradeValue}
        gradeComment={gradeComment}
        setGradeComment={setGradeComment}
      />
      <VideoMeetingModal
        activeMeeting={activeMeeting}
        setActiveMeeting={setActiveMeeting}
        isEmbeddedStream={isEmbeddedStream}
        setIsEmbeddedStream={setIsEmbeddedStream}
        isDarkMode={isDarkMode}
        user={user}
        activeMeetingUrl={activeMeetingUrl}
        setActiveMeetingUrl={setActiveMeetingUrl}
      />
      {user && (
        <FloatingChat 
          isAiChatOpen={isAiChatOpen}
          setIsAiChatOpen={setIsAiChatOpen}
          aiMessage={aiMessage}
          setAiMessage={setAiMessage}
          isAiLoading={isAiLoading}
          aiResponse={aiResponse}
          systemCommandNotification={systemCommandNotification}
          sendAiMessage={sendAiMessage}
          getUnreadCount={getUnreadCount}
          isDarkMode={isDarkMode}
          user={user}
          setAiResponse={setAiResponse}
          setSystemCommandNotification={setSystemCommandNotification}
        />
      )}
    </div>
  );
};

export default App;


