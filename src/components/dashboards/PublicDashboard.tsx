import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, ExternalLink, Wallet, TrendingUp, Calendar, DollarSign } from "lucide-react";

interface PublicDashboardProps {
  onBack: () => void;
}

const PublicDashboard = ({ onBack }: PublicDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const publicProjects = [
    {
      id: 1,
      name: "Highway Infrastructure Upgrade",
      description: "Major highway improvements including new lanes, drainage systems, and safety barriers",
      totalBudget: 5000000,
      fundsReleased: 2000000,
      completedMilestones: 2,
      totalMilestones: 5,
      contractor: "BuildCorp Ltd.",
      startDate: "2024-01-01",
      expectedCompletion: "2024-08-15",
      status: "In Progress",
      transactions: [
        { date: "2024-01-15", amount: 1000000, type: "Fund Release", milestone: "Site Survey & Planning" },
        { date: "2024-02-28", amount: 1000000, type: "Fund Release", milestone: "Foundation Work" },
      ],
    },
    {
      id: 2,
      name: "School Renovation Program",
      description: "Comprehensive renovation of three elementary schools including classroom upgrades and safety improvements",
      totalBudget: 2500000,
      fundsReleased: 833333,
      completedMilestones: 1,
      totalMilestones: 3,
      contractor: "EduBuild Inc.",
      startDate: "2024-02-01",
      expectedCompletion: "2024-05-15",
      status: "Pending Verification",
      transactions: [
        { date: "2024-02-01", amount: 833333, type: "Fund Release", milestone: "Structural Assessment" },
      ],
    },
    {
      id: 3,
      name: "Community Park Development",
      description: "Creation of a new 15-acre community park with playground, walking trails, and recreational facilities",
      totalBudget: 1800000,
      fundsReleased: 1800000,
      completedMilestones: 4,
      totalMilestones: 4,
      contractor: "GreenSpace Developers",
      startDate: "2023-09-01",
      expectedCompletion: "2024-02-15",
      status: "Completed",
      transactions: [
        { date: "2023-09-15", amount: 450000, type: "Fund Release", milestone: "Site Preparation" },
        { date: "2023-11-01", amount: 450000, type: "Fund Release", milestone: "Infrastructure Installation" },
        { date: "2023-12-15", amount: 450000, type: "Fund Release", milestone: "Facility Construction" },
        { date: "2024-02-15", amount: 450000, type: "Fund Release", milestone: "Final Completion" },
      ],
    },
  ];

  const filteredProjects = publicProjects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalBudget = publicProjects.reduce((sum, project) => sum + project.totalBudget, 0);
  const totalReleased = publicProjects.reduce((sum, project) => sum + project.fundsReleased, 0);
  const completedProjects = publicProjects.filter(p => p.status === "Completed").length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-success text-success-foreground";
      case "In Progress":
        return "bg-crypto text-crypto-foreground";
      case "Pending Verification":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
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
                <h1 className="text-2xl font-bold text-foreground">Public Transparency Portal</h1>
                <p className="text-muted-foreground">Real-time visibility into government project funding</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Budget
              </CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${totalBudget.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">Allocated across all projects</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Funds Released
              </CardTitle>
              <Wallet className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${totalReleased.toLocaleString()}</div>
              <p className="text-xs text-success mt-1">
                {Math.round((totalReleased / totalBudget) * 100)}% of total budget
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Projects
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-crypto" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{publicProjects.length}</div>
              <p className="text-xs text-crypto mt-1">{completedProjects} completed</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Transparency Score
              </CardTitle>
              <Calendar className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">98%</div>
              <p className="text-xs text-success mt-1">Blockchain verified</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle>Search Projects</CardTitle>
            <CardDescription>
              Find specific projects or browse all government initiatives
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by project name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Projects List */}
        <div className="space-y-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="shadow-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{project.name}</CardTitle>
                    <CardDescription className="text-base mb-3">
                      {project.description}
                    </CardDescription>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Contractor: {project.contractor}</span>
                      <span>•</span>
                      <span>Start Date: {project.startDate}</span>
                      <span>•</span>
                      <span>Expected Completion: {project.expectedCompletion}</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold mb-2">Budget Overview</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Budget:</span>
                        <span className="font-medium">${project.totalBudget.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Funds Released:</span>
                        <span className="font-medium text-success">${project.fundsReleased.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Remaining:</span>
                        <span className="font-medium">${(project.totalBudget - project.fundsReleased).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Progress</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Milestones:</span>
                        <span className="font-medium">{project.completedMilestones}/{project.totalMilestones}</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-gradient-success h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(project.completedMilestones / project.totalMilestones) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {Math.round((project.completedMilestones / project.totalMilestones) * 100)}% Complete
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Recent Transactions</h4>
                    <div className="space-y-1">
                      {project.transactions.slice(-2).map((tx, index) => (
                        <div key={index} className="text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{tx.date}</span>
                            <span className="font-medium text-success">${tx.amount.toLocaleString()}</span>
                          </div>
                          <div className="text-muted-foreground truncate">
                            {tx.milestone}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Wallet className="w-4 h-4" />
                    <span>All transactions verified on blockchain</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    View Full Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <Card className="shadow-card">
            <CardContent className="text-center py-12">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or browse all available projects.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default PublicDashboard;