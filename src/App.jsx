import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Directories from './components/Directories';
import PropertyDetail from './components/PropertyDetail';

const demoData = {
  businesses: [
    { id: 'b1', name: 'Jower Real Estate Investments', type: 'LLC', properties: 6 },
    { id: 'b2', name: 'Safe House Foundation', type: 'Nonprofit', properties: 3 },
  ],
  people: [
    { id: 'p1', name: 'Alice Johnson', role: 'Property Manager', organization: 'Jower Real Estate' },
    { id: 'p2', name: 'Mark Lee', role: 'Tenant', organization: 'Safe House #3' },
    { id: 'p3', name: 'Victor Ramos', role: 'Vendor - HVAC', organization: 'ABC Mechanical' },
  ],
  properties: [
    { id: 'pr1', name: '123 Oak Avenue', businessName: 'Jower Real Estate Investments', city: 'Tampa, FL', address: '123 Oak Ave, Tampa, FL' },
    { id: 'pr2', name: 'Safe House #3', businessName: 'Safe House Foundation', city: 'Orlando, FL', address: '501 Pine St, Orlando, FL' },
    { id: 'pr3', name: '456 Maple Lane', businessName: 'Jower Real Estate Investments', city: 'St. Petersburg, FL', address: '456 Maple Ln, St. Pete, FL' },
  ],
  assets: [
    { id: 'a1', name: 'Toyota Truck', propertyName: '123 Oak Avenue', status: 'Active' },
    { id: 'a2', name: 'HVAC System #5', propertyName: 'Safe House #3', status: 'Service' },
  ],
  documents: [
    { id: 'd1', title: 'Lease Agreement - Oak Ave', date: '2025-01-05', attachedTo: { type: 'Property', name: '123 Oak Avenue' } },
    { id: 'd2', title: 'Inspection Photos - Safe House #3', date: '2025-02-18', attachedTo: { type: 'Property', name: 'Safe House #3' } },
    { id: 'd3', title: 'Invoice - HVAC Repair', date: '2025-03-02', attachedTo: { type: 'Asset', name: 'HVAC System #5' } },
  ],
  projects: [
    { id: 'pj1', name: 'Renovation - Kitchen', propertyId: 'pr1', propertyName: '123 Oak Avenue', status: 'Active', due: 'Apr 30' },
    { id: 'pj2', name: 'Roof Inspection', propertyId: 'pr2', propertyName: 'Safe House #3', status: 'Planned', due: 'May 12' },
  ],
};

export default function App() {
  const [current, setCurrent] = useState('Dashboard');
  const [openProperty, setOpenProperty] = useState(null);

  const propertyRich = useMemo(() => {
    if (!openProperty) return null;
    return {
      ...openProperty,
      tenants: ['Mark Lee', 'Sarah Chan'],
      assets: ['HVAC System #5', 'Water Heater #2'],
      documents: [
        { id: 'pd1', title: 'Lease Agreement (Signed)', type: 'Lease', date: '2025-01-05' },
        { id: 'pd2', title: 'Inspection Report', type: 'Report', date: '2025-02-01' },
        { id: 'pd3', title: 'Property Photos', type: 'Media', date: '2025-02-18' },
      ],
      accounting: [
        { label: 'Rent - March', amount: 1800, date: '2025-03-01' },
        { label: 'Maintenance - HVAC Repair', amount: 420, date: '2025-03-02' },
        { label: 'Property Tax', amount: 2100, date: '2025-02-15' },
      ],
      projects: demoData.projects.filter(p => p.propertyId === openProperty.id),
    };
  }, [openProperty]);

  const handleNavigate = (label) => {
    setCurrent(label);
    if (label !== 'Properties') setOpenProperty(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar current={current} onNavigate={handleNavigate} />

      {current === 'Dashboard' && (
        <Dashboard data={demoData} onQuickAdd={(type) => console.log('Quick add', type)} />
      )}

      {['Businesses', 'People', 'Properties', 'Assets'].includes(current) && (
        <Directories data={demoData} onOpenProperty={(prop) => { setOpenProperty(prop); setCurrent('Property Detail'); }} />
      )}

      {current === 'Property Detail' && (
        <PropertyDetail property={propertyRich} />
      )}

      {current === 'Documents' && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
            Centralized Document Library coming soon. Use the Dashboard to preview recent files.
          </div>
        </section>
      )}

      {current === 'Projects' && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
            Project overview will live here.
          </div>
        </section>
      )}

      {current === 'Accounting' && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
            Income, expenses, and rent roll will be surfaced here.
          </div>
        </section>
      )}

      {current === 'Map' && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="relative h-80 w-full overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="absolute inset-0 p-6">
              <h3 className="text-sm font-semibold text-slate-900">Portfolio Map</h3>
              <div className="relative mt-4 h-60">
                {demoData.properties.map((p, idx) => (
                  <div key={p.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${15 + (idx * 30) % 80}%`, top: `${25 + (idx * 35) % 60}%` }}>
                    <div className="flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs shadow-sm ring-1 ring-slate-200">
                      <span className="h-2 w-2 rounded-full bg-indigo-600" />
                      {p.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
