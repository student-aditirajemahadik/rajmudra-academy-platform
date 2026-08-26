import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useToast } from '../../context/ToastContext';
import { User, Phone, Mail, GraduationCap, Save, Star } from 'lucide-react';
import { TeacherProfile } from '../../types';

export const TeacherProfilePage: React.FC = () => {
  const { teacherProfile, refreshProfiles, user } = useAuth();
  const { success } = useToast();

  const [profile, setProfile] = useState<TeacherProfile>(
    teacherProfile || (db.getTeachers()[0] as TeacherProfile)
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveTeacher(profile);
    refreshProfiles();
    setIsEditing(false);
    success('Faculty profile updated successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
            प्राध्यापक प्रोफाईल (Faculty Profile)
          </h2>
          <p className="text-xs text-gray-500">Manage your subject specialization, academic bio and achievements.</p>
        </div>
        <Button
          variant={isEditing ? 'ghost' : 'outline'}
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Bio'}
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="p-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={profile.avatar}
              alt={profile.fullName}
              className="w-28 h-28 rounded-2xl object-cover border-4 border-blue-400 shadow-md"
            />
            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-rajmudra-charcoal">{profile.fullName}</h3>
                  <p className="text-xs font-bold text-rajmudra-orange">{profile.teacherId}</p>
                </div>
                <Badge variant="blue" size="md">Verified Instructor</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600 pt-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-rajmudra-orange" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-rajmudra-orange" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-rajmudra-orange" />
                  <span>{profile.qualification}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span>{profile.experienceYears}+ Years Teaching Exp</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h4 className="text-sm font-bold text-rajmudra-charcoal border-b pb-2">
            Subject & Professional Bio
          </h4>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Subject Specialization</label>
              <input
                type="text"
                disabled={!isEditing}
                value={profile.subject}
                onChange={e => setProfile({ ...profile, subject: e.target.value })}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 disabled:bg-gray-50 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Faculty Biography / Description</label>
              <textarea
                rows={4}
                disabled={!isEditing}
                value={profile.bio}
                onChange={e => setProfile({ ...profile, bio: e.target.value })}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 disabled:bg-gray-50 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end pt-2">
              <Button type="submit" variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />}>
                Save Changes
              </Button>
            </div>
          )}
        </Card>
      </form>
    </div>
  );
};
