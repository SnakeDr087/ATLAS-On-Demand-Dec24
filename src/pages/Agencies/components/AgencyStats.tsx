import React from 'react';
import { Building2, Users, Shield, MapPin } from 'lucide-react';
import { type Agency } from '../../../types';

interface AgencyStatsProps {
  agencies: Agency[];
}

export function AgencyStats({ agencies }: AgencyStatsProps) {
  const activeAgencies = agencies.filter(a => a.status === 'active').length;
  const totalStates = new Set(agencies.map(a => a.state)).size;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatCard
        icon={<Building2 className="w-10 h-10 text-blue-600" />}
        label="Total Agencies"
        value={agencies.length.toString()}
      />
      <StatCard
        icon={<Shield className="w-10 h-10 text-green-600" />}
        label="Active Agencies"
        value={activeAgencies.toString()}
      />
      <StatCard
        icon={<MapPin className="w-10 h-10 text-purple-600" />}
        label="States Covered"
        value={totalStates.toString()}
      />
      <StatCard
        icon={<Users className="w-10 h-10 text-orange-600" />}
        label="Liaisons"
        value={agencies.length.toString()}
      />
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center">
        {icon}
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}