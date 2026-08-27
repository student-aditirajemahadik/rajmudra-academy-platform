import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { FolderLock, FileText, CheckCircle2, Upload, Eye } from 'lucide-react';

export const StudentDocumentsPage: React.FC = () => {
  const { studentProfile } = useAuth();
  const { success } = useToast();
  const studentId = studentProfile?.id || 'stu-01';
  const applications = db.getApplications().filter(a => a.studentId === studentId || a.id === 'app-01');
  const app = applications[0] || db.getApplications()[0];

  const handleUploadNew = () => {
    success('Document uploaded successfully for admin verification!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
            कागदपत्र व्यवस्थापन (Uploaded Documents)
          </h2>
          <p className="text-xs text-gray-500">Official student identity and educational certificates verified by Rajmudra Admin.</p>
        </div>

        <Button
          variant="outline"
          size="sm"
          leftIcon={<Upload className="w-4 h-4" />}
          onClick={handleUploadNew}
        >
          Upload Additional Certificate
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {app?.documents?.map(doc => (
          <Card key={doc.id} hoverEffect className="p-6 border border-gray-200 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-2xl bg-orange-50 text-rajmudra-orange">
                  <FileText className="w-6 h-6" />
                </div>
                <Badge variant={doc.status === 'VERIFIED' ? 'green' : 'orange'}>
                  {doc.status}
                </Badge>
              </div>

              <div>
                <h3 className="text-sm font-bold text-rajmudra-charcoal">{doc.title}</h3>
                <p className="text-xs text-gray-500 font-mono mt-0.5">{doc.fileName || 'document.pdf'}</p>
                <p className="text-[11px] text-gray-400 mt-1">{doc.fileSize || '1.2 MB'} • Uploaded {doc.uploadDate || '2026-08-20'}</p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              leftIcon={<Eye className="w-3.5 h-3.5" />}
              onClick={() => success(`Opening preview for ${doc.title}`)}
              className="w-full text-xs"
            >
              Preview Document
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

