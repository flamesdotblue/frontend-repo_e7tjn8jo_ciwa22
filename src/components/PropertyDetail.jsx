import React, { useState } from 'react';
import { Building2, Users, FileText, Wallet, ClipboardList, Link2, MapPin } from 'lucide-react';

const tabs = [
  { key: 'overview', label: 'Overview', icon: Building2 },
  { key: 'documents', label: 'Documents', icon: FileText },
  { key: 'accounting', label: 'Accounting', icon: Wallet },
  { key: 'projects', label: 'Projects', icon: ClipboardList },
  { key: 'relations', label: 'Relations', icon: Link2 },
  { key: 'notes', label: 'Notes', icon: Users },
];

export default function PropertyDetail({ property }) {
  const [active, setActive] = useState('overview');

  if (!property) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{property.name}</h2>
            <p className="text-sm text-slate-500">Owned by {property.businessName} • {property.city}</p>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{property.address}</span>
          </div>
        </div>
        <div className="border-t border-slate-100 px-4">
          <div className="flex flex-wrap items-center gap-2 py-2">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                  active === key ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="border-t border-slate-100 p-6">
          {active === 'overview' && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs text-slate-500">Owner Business</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{property.businessName}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs text-slate-500">Active Tenants</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{property.tenants.length}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs text-slate-500">Assets On-site</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{property.assets.length}</p>
              </div>
            </div>
          )}
          {active === 'documents' && (
            <div className="space-y-3">
              {property.documents.map((d) => (
                <div key={d.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{d.title}</p>
                    <p className="text-xs text-slate-500">{d.type} • {d.date}</p>
                  </div>
                  <button className="text-xs text-indigo-700 hover:underline">Open</button>
                </div>
              ))}
            </div>
          )}
          {active === 'accounting' && (
            <div className="space-y-3">
              {property.accounting.map((a, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{a.label}</p>
                    <p className="text-xs text-slate-500">{a.date}</p>
                  </div>
                  <span className="text-sm font-medium text-slate-900">${a.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
          {active === 'projects' && (
            <div className="space-y-3">
              {property.projects.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{p.name}</p>
                    <p className="text-xs text-slate-500">Status: {p.status} • Due {p.due}</p>
                  </div>
                  <button className="text-xs text-indigo-700 hover:underline">Open</button>
                </div>
              ))}
            </div>
          )}
          {active === 'relations' && (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs text-slate-500">People</p>
                <ul className="mt-2 space-y-1">
                  {property.tenants.map((t) => (
                    <li key={t} className="text-sm text-slate-700">{t}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs text-slate-500">Assets</p>
                <ul className="mt-2 space-y-1">
                  {property.assets.map((a) => (
                    <li key={a} className="text-sm text-slate-700">{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {active === 'notes' && (
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-700">Add observations and notes related to inspections, tenant feedback, maintenance, and upcoming changes.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
