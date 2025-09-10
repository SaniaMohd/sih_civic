import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, MapPin, User, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = ({ currentView, onViewChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-border shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <MapPin className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-xl font-bold text-foreground">CivicReport</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant={currentView === 'citizen' ? 'civic' : 'ghost'}
              onClick={() => onViewChange('citizen')}
              className="flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              Report Issue
            </Button>
            <Button 
              variant={currentView === 'admin' ? 'civic' : 'ghost'}
              onClick={() => onViewChange('admin')}
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Admin Dashboard
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "md:hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}>
          <div className="py-2 space-y-2">
            <Button 
              variant={currentView === 'citizen' ? 'civic' : 'ghost'}
              onClick={() => {
                onViewChange('citizen');
                setMobileMenuOpen(false);
              }}
              className="w-full justify-start gap-2"
            >
              <User className="h-4 w-4" />
              Report Issue
            </Button>
            <Button 
              variant={currentView === 'admin' ? 'civic' : 'ghost'}
              onClick={() => {
                onViewChange('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full justify-start gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Admin Dashboard
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;