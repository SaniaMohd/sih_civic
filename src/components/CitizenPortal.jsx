import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Camera, Upload, Send, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/civic-hero.jpg';

const CitizenPortal = () => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [reports, setReports] = useState([
    {
      id: '1',
      title: 'Pothole on Main Street',
      description: 'Large pothole causing damage to vehicles',
      category: 'roads',
      status: 'in-progress',
      location: 'Main Street, Downtown',
      date: '2024-01-08',
    },
    {
      id: '2',
      title: 'Broken streetlight',
      description: 'Streetlight not working, creating safety hazard',
      category: 'infrastructure',
      status: 'pending',
      location: 'Oak Avenue',
      date: '2024-01-07',
    }
  ]);
  const { toast } = useToast();

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !category) {
      toast({
        title: "Please fill all required fields",
        description: "Description and category are required to submit a report.",
        variant: "destructive",
      });
      return;
    }

    const newReport = {
      id: Date.now().toString(),
      title: description.slice(0, 50) + (description.length > 50 ? '...' : ''),
      description,
      category,
      status: 'pending',
      location: 'Auto-detected location', // In real app, use geolocation
      date: new Date().toISOString().split('T')[0],
    };

    setReports([newReport, ...reports]);
    setDescription('');
    setCategory('');
    setSelectedImage(null);
    setImagePreview(null);

    toast({
      title: "Report submitted successfully!",
      description: "Thank you for helping improve our community. We'll review your report shortly.",
    });
  };

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

  const categoryOptions = [
    { value: 'roads', label: 'Roads & Transportation' },
    { value: 'waste', label: 'Waste Management' },
    { value: 'infrastructure', label: 'Public Infrastructure' },
    { value: 'environment', label: 'Environmental Issues' },
    { value: 'safety', label: 'Public Safety' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-hero text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Help Build a Better Community
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Report civic issues in your neighborhood and track their progress. Together, we can make our city better.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Report Form */}
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-primary" />
                Report an Issue
              </CardTitle>
              <CardDescription>
                Help us identify and resolve issues in your community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="category">Issue Category *</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select category..." />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Please describe the issue in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-2 min-h-[120px]"
                  />
                </div>

                <div>
                  <Label htmlFor="image">Upload Photo</Label>
                  <div className="mt-2">
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label htmlFor="image">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 cursor-pointer hover:border-primary/50 transition-colors">
                        <div className="text-center">
                          {imagePreview ? (
                            <div className="space-y-2">
                              <img
                                src={imagePreview}
                                alt="Preview"
                                className="mx-auto h-32 w-32 object-cover rounded-lg"
                              />
                              <p className="text-sm text-muted-foreground">
                                Click to change image
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <Camera className="mx-auto h-12 w-12 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">
                                Click to upload an image
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Location will be auto-detected</span>
                </div>

                <Button type="submit" className="w-full" variant="civic" size="lg">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Report
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Your Reports */}
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle>Your Recent Reports</CardTitle>
              <CardDescription>
                Track the status of your submitted reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-sm">{report.title}</h3>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(report.status)}
                        <Badge variant={getStatusColor(report.status)} className="text-xs">
                          {report.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {report.location}
                      </span>
                      <span>{new Date(report.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CitizenPortal;