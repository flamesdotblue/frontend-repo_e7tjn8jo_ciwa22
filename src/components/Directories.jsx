import React, { useMemo, useState } from 'react';
import { Building2, Users, Warehouse, Boxes, Search, ChevronRight } from 'lucide-react';

const tabs = [
  { key: 'businesses', label: 'Businesses', icon: Building2 },
  { key: 'people', label: 'People', icon: Users },
  { key: 'properties', label: 'Properties', icon: Warehouse },
  { key: 'assets', label: 'Assets', icon: Boxes },
];

function Row({ title, subtitle, right, onView }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3">
      <div>
        <p className="text-sm font-medium text-slate-900">{title}</p>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {right && <span className="text-xs text-slate-500">{right}</span>}
        <button onClick={onView} className="inline-flex items-center gap-1 text-xs text-indigo-700 hover:underline">
          View <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

export default function Directories({ data, onOpenProperty }) {
  const [active, setActive] = useState('properties');
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const map = {
      businesses: data.businesses,
      people: data.people,
      properties: data.properties,
      assets: data.assets,
    };
    const items = map[active] || [];
    return items.filter((i) => JSON.stringify(i).toLowerCase().includes(q.toLowerCase()));
  }, [active, q, data]);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
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
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              type="search"
              placeholder={`Search ${active}...`}
              className="w-60 rounded-md border border-slate-200 bg-white pl-9 pr-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-indigo-400"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        {filtered.slice(0, 8).map((item) => {
          if (active === 'properties') {
            return (
              <Row
                key={item.id}
                title={item.name}
                subtitle={`Owner: ${item.businessName}`}
                right={item.city}
                onView={() => onOpenProperty(item)}
              />
            );
          }
          if (active === 'people') {
            return (
              <Row
                key={item.id}
                title={item.name}
                subtitle={item.role}
                right={item.organization}
                onView={() => {}}
              />
            );
          }
          if (active === 'businesses') {
            return (
              <Row
                key={item.id}
                title={item.name}
                subtitle={`${item.properties} properties`}
                right={item.type}
                onView={() => {}}
              />
            );
          }
          return (
            <Row
              key={item.id}
              title={item.name}
              subtitle={item.propertyName}
              right={item.status}
              onView={() => {}}
            />
          );
        })}
      </div>
    </section>
  );
}
