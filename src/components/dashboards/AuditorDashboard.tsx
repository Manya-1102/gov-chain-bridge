import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, FileCheck, AlertTriangle, CheckCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuditorDashboardProps {
  onBack: () => void;
}

const AuditorDashboard = ({ onBack }: AuditorDashboardProps) => {
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null);
  const { toast } = useToast();

  const pendingVerifications = [
    {
      id: 1,
      projectName: "Highway Infrastructure Upgrade",
      milestoneName: "Infrastructure Installation",
      contractorAddress: "0x742d35Cc6634C0532925a3b8D4C0b321",
      amount: 1000000,
      submittedDate: "2024-03-15",
      documents: [
        { name: "Progress_Photos.zip", size: "15.2 MB", type: "images" },
        { name: "Installation_Report.pdf", size: "2.8 MB", type: "document" },
        { name: "Quality_Checklist.pdf", size: "1.2 MB", type: "document" },
      ],
      description: "Installation of primary infrastructure components including drainage systems and base structures.",
    },
    {
      id: 2,
      projectName: "School Renovation Program",
      milestoneName: "Renovation Phase 1",
      contractorAddress: "0x8ba1f109551bD432803012645Hac189B3c4c0b",
      amount: 833333,
      submittedDate: "2024-03-12",
      documents: [
        { name: "Before_After_Photos.zip", size: "22.5 MB", type: "images" },
        { name: "Renovation_Summary.pdf", size: "3.1 MB", type: "document" },
      ],
      description: "Completion of classroom renovations, including electrical work and structural improvements.",
    },
  ];

  const recentVerifications = [
    {
      id: 3,
      projectName: "Highway Infrastructure Upgrade",
      milestoneName: "Foundation Work",
      status: "approved",
      verifiedDate: "2024-03-10",
      amount: 1000000,
    },
    {
      id: 4,
      projectName: "Community Center Construction",
      milestoneName: "Site Preparation",
      status: "approved",
      verifiedDate: "2024-03-08",
      amount: 500000,
    },
  ];

  const handleVerification = (id: number, approved: boolean, notes?: string) => {
    const action = approved ? "approved" : "rejected";
    toast({
      title: `Milestone ${action}`,
      description: `The milestone has been ${action} and recorded on the blockchain.`,
    });
    setSelectedMilestone(null);
  };

  const totalVerified = recentVerifications.reduce((sum, item) => sum + item.amount, 0);
  const pendingAmount = pendingVerifications.reduce((sum, item) => sum + item.amount, 0);

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
                <h1 className="text-2xl font-bold text-foreground">Auditor Dashboard</h1>
                <p className="text-muted-foreground">Verify milestone completions and ensure compliance</p>
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
                Pending Verifications
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{pendingVerifications.length}</div>
              <p className="text-xs text-warning mt-1">${pendingAmount.toLocaleString()} awaiting review</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Verified
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${totalVerified.toLocaleString()}</div>
              <p className="text-xs text-success mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Verification Rate
              </CardTitle>
              <FileCheck className="h-4 w-4 text-crypto" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">94%</div>
              <p className="text-xs text-crypto mt-1">Average approval rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Verifications */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle>Pending Verifications</CardTitle>
            <CardDescription>
              Review and verify submitted milestone completions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingVerifications.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{item.milestoneName}</h4>
                      <p className="text-sm text-muted-foreground mb-1">{item.projectName}</p>
                      <p className="text-xs text-muted-foreground">
                        Submitted: {item.submittedDate} | Amount: ${item.amount.toLocaleString()}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-warning">
                      Pending Review
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-foreground mb-3">{item.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.documents.map((doc, index) => (
                      <div key={index} className="flex items-center gap-2 bg-muted rounded-md px-3 py-1 text-xs">
                        <FileCheck className="w-3 h-3" />
                        <span>{doc.name}</span>
                        <span className="text-muted-foreground">({doc.size})</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedMilestone(item.id)}
                    >
                      Review Details
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-gradient-success"
                      onClick={() => handleVerification(item.id, true)}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleVerification(item.id, false)}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Verifications */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Verifications</CardTitle>
            <CardDescription>
              Previously completed verification activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentVerifications.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.milestoneName}</h4>
                    <p className="text-xs text-muted-foreground">{item.projectName}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">${item.amount.toLocaleString()}</span>
                    <Badge className="bg-success text-success-foreground">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Approved
                    </Badge>
                    <span className="text-xs text-muted-foreground">{item.verifiedDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Review Modal */}
        {selectedMilestone && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Milestone Verification</CardTitle>
                <CardDescription>
                  Review all documentation and provide verification decision
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Milestone Details</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Project:</span> Highway Infrastructure Upgrade</p>
                      <p><span className="font-medium">Milestone:</span> Infrastructure Installation</p>
                      <p><span className="font-medium">Amount:</span> $1,000,000</p>
                      <p><span className="font-medium">Contractor:</span> 0x742d35Cc...321</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Verification Checklist</h3>
                    <div className="space-y-2">
                      {[
                        "Documentation completeness",
                        "Quality standards compliance",
                        "Timeline adherence",
                        "Budget alignment",
                      ].map((item, index) => (
                        <label key={index} className="flex items-center gap-2 text-sm">
                          <input type="checkbox" className="rounded" />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Verification Notes</h3>
                  <Textarea 
                    placeholder="Add your verification notes, observations, and any recommendations..."
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setSelectedMilestone(null)}>
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => handleVerification(selectedMilestone, false)}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Reject
                  </Button>
                  <Button 
                    className="bg-gradient-success"
                    onClick={() => handleVerification(selectedMilestone, true)}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approve & Release Funds
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default AuditorDashboard;