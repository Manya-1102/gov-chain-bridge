import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Upload, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContractorDashboardProps {
  onBack: () => void;
}

const ContractorDashboard = ({ onBack }: ContractorDashboardProps) => {
  const { toast } = useToast();

  const mockProjects = [
    {
      id: 1,
      name: "Highway Infrastructure Upgrade",
      budget: 5000000,
      totalMilestones: 5,
      milestones: [
        { id: 1, name: "Site Survey & Planning", status: "completed", amount: 1000000, dueDate: "2024-01-15" },
        { id: 2, name: "Foundation Work", status: "completed", amount: 1000000, dueDate: "2024-02-28" },
        { id: 3, name: "Infrastructure Installation", status: "in-progress", amount: 1000000, dueDate: "2024-04-15" },
        { id: 4, name: "Road Surface Construction", status: "pending", amount: 1000000, dueDate: "2024-06-30" },
        { id: 5, name: "Final Inspection & Handover", status: "pending", amount: 1000000, dueDate: "2024-08-15" },
      ],
    },
    {
      id: 2,
      name: "School Renovation Program",
      budget: 2500000,
      totalMilestones: 3,
      milestones: [
        { id: 1, name: "Structural Assessment", status: "completed", amount: 833333, dueDate: "2024-02-01" },
        { id: 2, name: "Renovation Phase 1", status: "submitted", amount: 833333, dueDate: "2024-03-30" },
        { id: 3, name: "Final Completion", status: "pending", amount: 833334, dueDate: "2024-05-15" },
      ],
    },
  ];

  const handleSubmitMilestone = (projectId: number, milestoneId: number) => {
    toast({
      title: "Milestone Submitted",
      description: "Your milestone completion has been submitted for verification.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground";
      case "submitted":
        return "bg-warning text-warning-foreground";
      case "in-progress":
        return "bg-crypto text-crypto-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "submitted":
        return <Clock className="w-4 h-4" />;
      case "in-progress":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const totalEarned = mockProjects.reduce((sum, project) => 
    sum + project.milestones
      .filter(m => m.status === "completed")
      .reduce((mSum, milestone) => mSum + milestone.amount, 0), 0
  );

  const pendingAmount = mockProjects.reduce((sum, project) => 
    sum + project.milestones
      .filter(m => m.status === "submitted")
      .reduce((mSum, milestone) => mSum + milestone.amount, 0), 0
  );

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
                <h1 className="text-2xl font-bold text-foreground">Contractor Dashboard</h1>
                <p className="text-muted-foreground">Track your projects and submit milestones</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Earned
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${totalEarned.toLocaleString()}</div>
              <p className="text-xs text-success mt-1">From completed milestones</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Verification
              </CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${pendingAmount.toLocaleString()}</div>
              <p className="text-xs text-warning mt-1">Awaiting auditor approval</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Projects
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-crypto" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{mockProjects.length}</div>
              <p className="text-xs text-crypto mt-1">Currently working on</p>
            </CardContent>
          </Card>
        </div>

        {/* Projects and Milestones */}
        <div className="space-y-6">
          {mockProjects.map((project) => (
            <Card key={project.id} className="shadow-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    <CardDescription>
                      Total Budget: ${project.budget.toLocaleString()}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-primary">
                    {project.milestones.filter(m => m.status === "completed").length} / {project.totalMilestones} Complete
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.milestones.map((milestone) => (
                    <div key={milestone.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {getStatusIcon(milestone.status)}
                            <h4 className="font-medium">{milestone.name}</h4>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Due: {milestone.dueDate}</span>
                            <span>Amount: ${milestone.amount.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(milestone.status)}>
                            {milestone.status.replace("-", " ")}
                          </Badge>
                          {milestone.status === "in-progress" && (
                            <Button 
                              size="sm" 
                              onClick={() => handleSubmitMilestone(project.id, milestone.id)}
                              className="bg-gradient-success"
                            >
                              <Upload className="w-4 h-4 mr-1" />
                              Submit
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      {milestone.status === "in-progress" && (
                        <div className="mt-3 p-3 bg-muted rounded-md">
                          <p className="text-sm text-muted-foreground mb-2">
                            Ready to submit this milestone? Upload your proof of completion:
                          </p>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Upload className="w-4 h-4 mr-1" />
                              Upload Documents
                            </Button>
                            <Button variant="outline" size="sm">
                              Add Photos
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ContractorDashboard;