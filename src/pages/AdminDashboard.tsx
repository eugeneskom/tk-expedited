// src/pages/AdminDashboard.tsx
import React, { useState } from 'react';
import UsersList from '../components/dashboard/UsersList';
import CarriersList from '../components/dashboard/CarriersList';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return <UsersList />;
      case 'carriers':
        return <CarriersList />;
      default:
        return null;
    }
  };

  return (
    <div className=" mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'carriers' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('carriers')}
        >
          Carriers
        </button>
      </div>
      {renderTabContent()}
    </div>
  );
};

export default AdminDashboard;