import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, DollarSign, Calendar, Users, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GovernmentDashboardProps {
  onBack: () => void;
}

const GovernmentDashboard = ({ onBack }: GovernmentDashboardProps) => {
  const [showCreateProject, setShowCreateProject] = useState(false);
  const { toast } = useToast();

  const mockProjects = [
    {
      id: 1,
      name: "Highway Infrastructure Upgrade",
      budget: 5000000,
      contractor: "BuildCorp Ltd.",
      status: "In Progress",
      completedMilestones: 2,
      totalMilestones: 5,
      fundsReleased: 2000000,
    },
    {
      id: 2,
      name: "School Renovation Program",
      budget: 2500000,
      contractor: "EduBuild Inc.",
      status: "Pending Verification",
      completedMilestones: 1,
      totalMilestones: 3,
      fundsReleased: 833333,
    },
  ];

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Project Created Successfully",
      description: "The project has been recorded on the blockchain.",
    });
    setShowCreateProject(false);
  };

  const stats = [
    {
      title: "Total Budget Allocated",
      value: "$12.5M",
      icon: DollarSign,
      trend: "+12% from last quarter",
    },
    {
      title: "Active Projects",
      value: "8",
      icon: Calendar,
      trend: "2 new this month",
    },
    {
      title: "Verified Contractors",
      value: "24",
      icon: Users,
      trend: "+3 recently approved",
    },
    {
      title: "Funds Released",
      value: "$8.2M",
      icon: TrendingUp,
      trend: "65% of total budget",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Government Portal</h1>
                <p className="text-muted-foreground">Project Management & Budget Oversight</p>
              </div>
            </div>
            <Button onClick={() => setShowCreateProject(true)} className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <IconComponent className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-success mt-1">{stat.trend}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Projects List */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
            <CardDescription>
              Monitor project progress and milestone completion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProjects.map((project) => (
                <div key={project.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">Contractor: {project.contractor}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === "In Progress" 
                        ? "bg-warning-light text-warning-foreground" 
                        : "bg-success-light text-success-foreground"
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Budget:</span>
                      <span className="ml-2 font-medium">${project.budget.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Progress:</span>
                      <span className="ml-2 font-medium">
                        {project.completedMilestones}/{project.totalMilestones} milestones
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Funds Released:</span>
                      <span className="ml-2 font-medium">${project.fundsReleased.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{Math.round((project.completedMilestones / project.totalMilestones) * 100)}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-gradient-success h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(project.completedMilestones / project.totalMilestones) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Create Project Modal */}
        {showCreateProject && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Create New Project</CardTitle>
                <CardDescription>
                  Add a new project to the blockchain transparency system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateProject} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="projectName">Project Name *</Label>
                      <Input id="projectName" required placeholder="e.g., Highway Infrastructure" />
                    </div>
                    <div>
                      <Label htmlFor="budget">Total Budget (USD) *</Label>
                      <Input id="budget" type="number" required placeholder="5000000" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Detailed description of the project scope and objectives"
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contractor">Contractor Address *</Label>
                      <Input id="contractor" required placeholder="0x742d35Cc6634C0532925a3b8D4C0b" />
                    </div>
                    <div>
                      <Label htmlFor="milestones">Number of Milestones *</Label>
                      <Input id="milestones" type="number" required placeholder="5" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => setShowCreateProject(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-gradient-primary">
                      Create Project
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default GovernmentDashboard;