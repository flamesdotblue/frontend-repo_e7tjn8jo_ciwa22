import React from 'react';
import { Home, Building2, Users, FileText, Wallet, ClipboardList, Warehouse, MapPin, Boxes } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: Home },
  { label: 'Businesses', icon: Building2 },
  { label: 'People', icon: Users },
  { label: 'Properties', icon: Warehouse },
  { label: 'Documents', icon: FileText },
  { label: 'Accounting', icon: Wallet },
  { label: 'Projects', icon: ClipboardList },
  { label: 'Assets', icon: Boxes },
  { label: 'Map', icon: MapPin },
];

export default function Navbar({ current, onNavigate }) {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600 text-white font-bold">R</div>
            <span className="text-sm font-semibold tracking-tight text-slate-900">Raymond Ops</span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => onNavigate(label)}
                className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                  current === label
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
                aria-current={current === label ? 'page' : undefined}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <input
              type="search"
              placeholder="Search everything..."
              className="hidden sm:block w-56 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-indigo-400"
            />
            <button className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700">Add</button>
          </div>
        </div>
        <div className="md:hidden pb-3">
          <div className="grid grid-cols-3 gap-2">
            {navItems.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => onNavigate(label)}
                className={`flex items-center justify-center gap-2 rounded-md px-2 py-2 text-xs transition-colors ${
                  current === label
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
