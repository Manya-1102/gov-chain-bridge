import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Building2, Search, Users } from "lucide-react";
import GovernmentDashboard from "@/components/dashboards/GovernmentDashboard";
import ContractorDashboard from "@/components/dashboards/ContractorDashboard";
import AuditorDashboard from "@/components/dashboards/AuditorDashboard";
import PublicDashboard from "@/components/dashboards/PublicDashboard";

type UserRole = "government" | "contractor" | "auditor" | "public" | null;

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  const roles = [
    {
      id: "government" as const,
      title: "Government Portal",
      description: "Create projects, manage budgets, and track fund allocation",
      icon: Building2,
      bgGradient: "bg-gradient-primary",
    },
    {
      id: "contractor" as const,
      title: "Contractor Dashboard",
      description: "Submit milestone completions and track project progress",
      icon: Users,
      bgGradient: "bg-gradient-success",
    },
    {
      id: "auditor" as const,
      title: "Auditor Interface",
      description: "Verify milestones and validate project deliverables",
      icon: Shield,
      bgGradient: "bg-gradient-crypto",
    },
    {
      id: "public" as const,
      title: "Public Transparency",
      description: "View project progress, fund flows, and government spending",
      icon: Search,
      bgGradient: "bg-gradient-primary",
    },
  ];

  if (selectedRole) {
    const renderDashboard = () => {
      switch (selectedRole) {
        case "government":
          return <GovernmentDashboard onBack={() => setSelectedRole(null)} />;
        case "contractor":
          return <ContractorDashboard onBack={() => setSelectedRole(null)} />;
        case "auditor":
          return <AuditorDashboard onBack={() => setSelectedRole(null)} />;
        case "public":
          return <PublicDashboard onBack={() => setSelectedRole(null)} />;
        default:
          return null;
      }
    };

    return renderDashboard();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-card">
        <div className="container mx-auto px-6 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Government Transparency Portal
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Blockchain-powered transparency for government project funding and milestone tracking
            </p>
          </div>
        </div>
      </header>

      {/* Role Selection */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Select Your Role
          </h2>
          <p className="text-muted-foreground">
            Choose your access level to interact with the transparency system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <Card
                key={role.id}
                className="relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-government hover:scale-105 group"
                onClick={() => setSelectedRole(role.id)}
              >
                <div className={`absolute inset-0 ${role.bgGradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 relative">
                    <div className={`w-16 h-16 ${role.bgGradient} rounded-full flex items-center justify-center`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold">
                    {role.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-sm mb-6">
                    {role.description}
                  </CardDescription>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Access Portal
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Overview */}
        <div className="mt-16 bg-card rounded-lg shadow-card p-8">
          <h3 className="text-xl font-semibold text-center mb-8">System Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Blockchain Security</h4>
              <p className="text-sm text-muted-foreground">
                Immutable ledger ensures transparent and secure fund tracking
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Multi-Role Access</h4>
              <p className="text-sm text-muted-foreground">
                Role-based dashboards for government, contractors, and auditors
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-crypto rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Public Transparency</h4>
              <p className="text-sm text-muted-foreground">
                Complete visibility into project progress and fund allocation
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;