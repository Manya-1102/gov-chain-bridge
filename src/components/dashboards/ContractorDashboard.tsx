import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Upload, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService, type Project } from "@/services/api";

interface ContractorDashboardProps {
  onBack: () => void;
}

const ContractorDashboard = ({ onBack }: ContractorDashboardProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch contractor projects
  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ['contractor-projects'],
    queryFn: apiService.getContractorProjects,
  });

  // Fetch contractor stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['contractor-stats'],
    queryFn: apiService.getContractorStats,
  });

  // Submit milestone mutation
  const submitMilestoneMutation = useMutation({
    mutationFn: ({ projectId, milestoneId }: { projectId: number; milestoneId: number }) =>
      apiService.submitMilestone(projectId, milestoneId),
    onSuccess: () => {
      toast({
        title: "Milestone Submitted",
        description: "Your milestone has been submitted for verification.",
      });
      queryClient.invalidateQueries({ queryKey: ['contractor-projects'] });
      queryClient.invalidateQueries({ queryKey: ['contractor-stats'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit milestone. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmitMilestone = (projectId: number, milestoneId: number) => {
    submitMilestoneMutation.mutate({ projectId, milestoneId });
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
              <div className="text-2xl font-bold text-foreground">
                {statsLoading ? "Loading..." : `$${stats?.totalEarned.toLocaleString() || 0}`}
              </div>
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
              <div className="text-2xl font-bold text-foreground">
                {statsLoading ? "Loading..." : `$${stats?.pendingAmount.toLocaleString() || 0}`}
              </div>
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
              <div className="text-2xl font-bold text-foreground">
                {statsLoading ? "Loading..." : stats?.activeProjects || 0}
              </div>
              <p className="text-xs text-crypto mt-1">Currently working on</p>
            </CardContent>
          </Card>
        </div>

        {/* Projects and Milestones */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">My Projects</h2>
          {projectsLoading ? (
            <div className="flex justify-center py-8">
              <div className="text-muted-foreground">Loading projects...</div>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No projects found.</p>
            </div>
          ) : (
            projects.map((project) => (
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
                      {project.completedMilestones} / {project.totalMilestones} Complete
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.milestones?.map((milestone) => (
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
                                disabled={submitMilestoneMutation.isPending}
                              >
                                <Upload className="w-4 h-4 mr-1" />
                                {submitMilestoneMutation.isPending ? "Submitting..." : "Submit"}
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
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ContractorDashboard;