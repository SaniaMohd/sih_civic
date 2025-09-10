import { useState } from 'react';
import Navigation from '@/components/Navigation';
import CitizenPortal from '@/components/CitizenPortal';
import AdminDashboard from '@/components/AdminDashboard';

const Index = () => {
  const [currentView, setCurrentView] = useState('citizen');

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      
      {currentView === 'citizen' ? (
        <CitizenPortal />
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
};

export default Index;