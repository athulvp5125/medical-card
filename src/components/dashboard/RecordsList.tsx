
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  Download, 
  Share2, 
  MoreHorizontal,
  Syringe,
  Pill,
  FileBarChart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Record {
  id: number;
  title: string;
  type: string;
  date: string;
  provider: string;
}

interface RecordsListProps {
  records: Record[];
}

const RecordsList: React.FC<RecordsListProps> = ({ records }) => {
  const getRecordIcon = (type: string) => {
    switch (type) {
      case "vaccination":
        return <Syringe className="h-5 w-5 text-blue-500" />;
      case "medication":
        return <Pill className="h-5 w-5 text-purple-500" />;
      case "labResult":
        return <FileBarChart className="h-5 w-5 text-yellow-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getRecordBadge = (type: string) => {
    switch (type) {
      case "vaccination":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">Vaccination</Badge>;
      case "medication":
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">Medication</Badge>;
      case "labResult":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Lab Result</Badge>;
      case "examination":
        return <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">Examination</Badge>;
      default:
        return <Badge variant="secondary">Document</Badge>;
    }
  };

  if (records.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <FileText className="h-12 w-12 mx-auto mb-2 opacity-40" />
        <p>No records found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {records.map((record) => (
        <Card key={record.id} className="card-hover">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-muted rounded-md">
                {getRecordIcon(record.type)}
              </div>
              <div>
                <h3 className="font-medium">{record.title}</h3>
                <div className="flex flex-col sm:flex-row sm:gap-3 text-sm text-muted-foreground">
                  <span>
                    {new Date(record.date).toLocaleDateString()}
                  </span>
                  <span className="hidden sm:block text-muted-foreground">•</span>
                  <span>{record.provider}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getRecordBadge(record.type)}
              <div className="hidden sm:flex space-x-2">
                <Button variant="ghost" size="icon" title="Download">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" title="Share">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="sm:hidden">Download</DropdownMenuItem>
                  <DropdownMenuItem className="sm:hidden">Share</DropdownMenuItem>
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Edit Information</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RecordsList;
