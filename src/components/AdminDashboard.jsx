import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Users, 
  TrendingUp,
  Filter,
  Eye,
  MessageSquare
} from 'lucide-react';

const AdminDashboard = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  
  const [reports] = useState([
    {
      id: '1',
      title: 'Pothole on Main Street',
      description: 'Large pothole causing damage to vehicles near the intersection',
      category: 'roads',
      status: 'in-progress',
      location: 'Main Street, Downtown',
      date: '2024-01-08',
      priority: 'high',
      submittedBy: 'John Doe'
    },
    {
      id: '2',
      title: 'Broken streetlight',
      description: 'Streetlight not working, creating safety hazard for pedestrians',
      category: 'infrastructure',
      status: 'pending',
      location: 'Oak Avenue',
      date: '2024-01-07',
      priority: 'medium',
      submittedBy: 'Jane Smith'
    },
    {
      id: '3',
      title: 'Illegal waste dumping',
      description: 'Construction waste dumped in public park area',
      category: 'waste',
      status: 'resolved',
      location: 'Central Park',
      date: '2024-01-06',
      priority: 'high',
      submittedBy: 'Mike Johnson'
    },
    {
      id: '4',
      title: 'Damaged sidewalk',
      description: 'Cracked sidewalk poses tripping hazard',
      category: 'infrastructure',
      status: 'pending',
      location: 'Pine Street',
      date: '2024-01-05',
      priority: 'low',
      submittedBy: 'Sarah Wilson'
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'in-progress':
        return <AlertTriangle className="h-4 w-4 text-primary" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-success" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'in-progress':
        return 'default';
      case 'resolved':
        return 'success';
      default:
        return 'secondary';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'warning';
      case 'low':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const updateReportStatus = (reportId, newStatus) => {
    // In a real app, this would update the database
    console.log(`Updating report ${reportId} to status: ${newStatus}`);
  };

  const filteredReports = reports.filter(report => {
    const statusMatch = filterStatus === 'all' || report.status === filterStatus;
    const categoryMatch = filterCategory === 'all' || report.category === filterCategory;
    return statusMatch && categoryMatch;
  });

  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === 'pending').length,
    inProgress: reports.filter(r => r.status === 'in-progress').length,
    resolved: reports.filter(r => r.status === 'resolved').length,
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage civic issue reports</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-warning">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-primary">{stats.inProgress}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold text-success">{stats.resolved}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Reports */}
        <Card className="shadow-elevated">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Issue Reports</CardTitle>
                <CardDescription>Review and manage submitted civic issues</CardDescription>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-full sm:w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="roads">Roads</SelectItem>
                    <SelectItem value="waste">Waste</SelectItem>
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="environment">Environment</SelectItem>
                    <SelectItem value="safety">Safety</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <div key={report.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-lg">{report.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant={getPriorityColor(report.priority)} className="text-xs">
                            {report.priority} priority
                          </Badge>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(report.status)}
                            <Badge variant={getStatusColor(report.status)}>
                              {report.status.replace('-', ' ')}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground">{report.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {report.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {report.submittedBy}
                        </span>
                        <span>{new Date(report.date).toLocaleDateString()}</span>
                        <Badge variant="outline" className="text-xs">
                          {report.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                      <Select 
                        value={report.status} 
                        onValueChange={(value) => updateReportStatus(report.id, value)}
                      >
                        <SelectTrigger className="w-full sm:w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        <span className="hidden sm:inline">View Details</span>
                      </Button>
                      
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <span className="hidden sm:inline">Contact</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;