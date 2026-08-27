import React, { useState } from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { FileText, Plus, Trash2, Video, Search } from 'lucide-react';

export const AdminMaterialPage: React.FC = () => {
  const { success } = useToast();
  const [materials, setMaterials] = useState(db.getStudyMaterials());
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = materials.filter(m =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this study material?')) {
      db.deleteStudyMaterial(id);
      setMaterials(db.getStudyMaterials());
      success('Study material deleted.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
            अभ्यास साहित्य नियंत्रण (Study Material Repository)
          </h2>
          <p className="text-xs text-gray-500">Manage all uploaded PDF notes, assignments, and video lectures across academy courses.</p>
        </div>

        <div className="relative w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search material..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rajmudra-orange"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(mat => (
          <Card key={mat.id} hoverEffect className="p-5 border border-gray-200 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-rajmudra-orange uppercase">{mat.subject}</span>
                  <h3 className="text-sm font-bold text-rajmudra-charcoal font-devanagari">{mat.title}</h3>
                  <p className="text-xs text-gray-500">{mat.courseName}</p>
                </div>
                <Badge variant={mat.type === 'VIDEO' ? 'red' : 'orange'} size="sm">
                  {mat.type}
                </Badge>
              </div>

              <p className="text-xs text-gray-600 line-clamp-2">{mat.description}</p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-gray-400">By {mat.uploadedByName} • {mat.uploadDate}</span>
              <button
                onClick={() => handleDelete(mat.id)}
                className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

