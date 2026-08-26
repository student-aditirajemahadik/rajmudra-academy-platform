import React, { useState } from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import {
  FileText,
  Download,
  Video,
  FileCheck,
  Search,
  BookOpen,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { StudyMaterial } from '../../types';

export const StudentMaterialPage: React.FC = () => {
  const materials = db.getStudyMaterials();
  const { success } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');

  const filtered = materials.filter(m => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'ALL' || m.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleAction = (mat: StudyMaterial) => {
    if (mat.type === 'VIDEO') {
      window.open(mat.downloadUrl, '_blank');
      success(`Opening video lecture: ${mat.title}`);
    } else {
      success(`Downloaded study material: ${mat.title}`);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'VIDEO':
        return <Video className="w-5 h-5 text-red-500" />;
      case 'TEST_PAPER':
        return <FileCheck className="w-5 h-5 text-blue-500" />;
      default:
        return <FileText className="w-5 h-5 text-rajmudra-orange" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
            अभ्यास साहित्य व नोट्स (Study Material Hub)
          </h2>
          <p className="text-xs text-gray-500">Download subject notes, previous question papers, and video lectures.</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {['ALL', 'PDF', 'DOCUMENT', 'TEST_PAPER', 'VIDEO'].map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                typeFilter === t
                  ? 'bg-rajmudra-orange text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search notes by subject..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rajmudra-orange"
          />
        </div>
      </div>

      {/* Materials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(mat => (
          <Card key={mat.id} hoverEffect className="p-5 border border-gray-200 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-200">
                    {getIcon(mat.type)}
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold text-rajmudra-orange uppercase tracking-wider">{mat.subject}</span>
                    <h3 className="text-sm font-bold text-rajmudra-charcoal font-devanagari line-clamp-1">{mat.title}</h3>
                  </div>
                </div>
                <Badge variant={mat.type === 'VIDEO' ? 'red' : 'orange'} size="sm">
                  {mat.type}
                </Badge>
              </div>

              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                {mat.description}
              </p>

              <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-gray-100">
                <span>By {mat.uploadedByName}</span>
                <span>{mat.fileSize || 'Online Stream'} • {mat.uploadDate}</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              leftIcon={mat.type === 'VIDEO' ? <ExternalLink className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
              onClick={() => handleAction(mat)}
              className="w-full text-xs"
            >
              {mat.type === 'VIDEO' ? 'Watch Lecture Video' : 'Download Notes PDF'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
