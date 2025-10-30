import React from 'react';
import { Bell, FileText, MapPin, Plus, ArrowRight, DollarSign, Building2, ClipboardList, Users } from 'lucide-react';

function KpiCard({ icon: Icon, label, value, trend }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-500">{label}</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
        </div>
        <div className="rounded-md bg-indigo-50 p-2 text-indigo-700">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {trend && <p className="mt-2 text-xs text-emerald-600">{trend}</p>}
    </div>
  );
}

function MapSnippet({ properties }) {
  return (
    <div className="relative h-56 w-full overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      <div className="absolute inset-0 p-4">
        <div className="flex items-center gap-2 text-slate-700">
          <MapPin className="h-4 w-4" />
          <span className="text-sm font-medium">Properties Map</span>
        </div>
        <div className="relative mt-4 h-40">
          {properties.slice(0, 10).map((p, idx) => (
            <div
              key={p.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${20 + (idx * 70) % 80}%`, top: `${20 + (idx * 50) % 70}%` }}
            >
              <div className="flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs shadow-sm ring-1 ring-slate-200">
                <span className="h-2 w-2 rounded-full bg-indigo-600" />
                {p.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard({ data, onQuickAdd }) {
  const { properties, projects, documents, people } = data;
  const kpis = [
    { icon: Building2, label: 'Total Properties', value: properties.length },
    { icon: ClipboardList, label: 'Active Projects', value: projects.filter(p => p.status === 'Active').length },
    { icon: DollarSign, label: 'Monthly Income', value: `$${(properties.length * 1200).toLocaleString()}` },
    { icon: Users, label: 'Contacts', value: people.length },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">Recent Documents</h3>
              <button className="inline-flex items-center gap-1 text-xs text-indigo-700 hover:underline">
                View all <ArrowRight className="h-3 w-3" />
              </button>
            </div>
            <ul className="mt-3 divide-y divide-slate-100">
              {documents.slice(0, 5).map((doc) => (
                <li key={doc.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-slate-50 p-2 text-slate-700 ring-1 ring-slate-200">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{doc.title}</p>
                      <p className="text-xs text-slate-500">Attached to {doc.attachedTo.type}: {doc.attachedTo.name}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">{doc.date}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
              <button className="inline-flex items-center gap-1 text-xs text-indigo-700 hover:underline">
                Manage <ArrowRight className="h-3 w-3" />
              </button>
            </div>
            <ul className="mt-3 divide-y divide-slate-100">
              {projects.slice(0, 4).map((p) => (
                <li key={p.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-amber-50 p-2 text-amber-700 ring-1 ring-amber-100">
                      <Bell className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Milestone due: {p.name}</p>
                      <p className="text-xs text-slate-500">Property: {p.propertyName}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">{p.due}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-6">
          <MapSnippet properties={properties} />
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-900">Quick Actions</h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {[
                { label: 'Add Document', action: () => onQuickAdd('Document') },
                { label: 'New Project', action: () => onQuickAdd('Project') },
                { label: 'Add Property', action: () => onQuickAdd('Property') },
                { label: 'View Transactions', action: () => onQuickAdd('Accounting') },
              ].map((btn) => (
                <button
                  key={btn.label}
                  onClick={btn.action}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  <Plus className="h-4 w-4" />
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
