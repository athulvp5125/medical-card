
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Loader2 } from "lucide-react";

interface UploadRecordProps {
  onClose: () => void;
}

const UploadRecord: React.FC<UploadRecordProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [provider, setProvider] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !type || !date || !provider || !file) {
      toast({
        variant: "destructive",
        title: "Incomplete form",
        description: "Please fill in all fields",
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      // This is a mock upload - would be replaced with actual file upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Record uploaded successfully",
        description: `${title} has been added to your records.`,
      });
      
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "An error occurred while uploading your record",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Medical Record</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Record Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., COVID-19 Vaccination"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Record Type</Label>
            <Select value={type} onValueChange={setType} required>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select record type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vaccination">Vaccination</SelectItem>
                <SelectItem value="medication">Medication</SelectItem>
                <SelectItem value="labResult">Lab Result</SelectItem>
                <SelectItem value="examination">Medical Examination</SelectItem>
                <SelectItem value="condition">Medical Condition</SelectItem>
                <SelectItem value="allergy">Allergy</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="provider">Provider</Label>
            <Input
              id="provider"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              placeholder="e.g., Dr. Smith, City Hospital"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file">Upload Document</Label>
            <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center">
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop your files here or click to browse
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Supported formats: PDF, JPG, PNG (max 10MB)
              </p>
              <Input
                id="file"
                type="file"
                className="cursor-pointer"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                required
              />
              {file && (
                <p className="text-sm font-medium mt-2">{file.name}</p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
                </>
              ) : (
                "Upload Record"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadRecord;
