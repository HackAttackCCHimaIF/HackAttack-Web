import React from "react";
import { Users, UserCheck, FileClock, ShieldCheck } from "lucide-react"; // contoh icon

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => {
  return (
    <div className="relative rounded-bl-4xl rounded-tr-4xl p-[2px] bg-gradient-to-r min-h-[160px] from-[#0F75BD] to-[#64BB48]">
      <div className="bg-[#575757] rounded-bl-4xl rounded-tr-4xl p-5 flex items-center justify-between h-full text-white">
        <div>
            <div className="text-lg font-semibold">{title}</div>
            <div className="text-xl font-bold">{value}</div>
        </div>
        <div className=" w-12 h-12 rounded-full bg-gradient-to-r from-[#0F75BD] to-[#64BB48] flex items-center justify-center">
            {icon}
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="w-full h-full p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Tim"
          value={80}
          icon={<Users className="text-white w-6 h-6" />}
        />
        <StatCard
          title="Registered"
          value={80}
          icon={<UserCheck className="text-white w-6 h-6" />}
        />
        <StatCard
          title="Pending"
          value={30}
          icon={<FileClock className="text-white w-6 h-6" />}
        />
        <StatCard
          title="Verified"
          value={50}
          icon={<ShieldCheck className="text-white w-6 h-6" />}
        />
      </div>
      <div className="pt-8">
        {/* <RegistrationTable/> */}
        {children}
      </div>
    </div>
  );
};

export default AdminDashboard;
