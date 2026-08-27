import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useToast } from '../../context/ToastContext';
import { User, Phone, Mail, MapPin, GraduationCap, Calendar, Save, CheckCircle2 } from 'lucide-react';
import { StudentProfile } from '../../types';

export const StudentProfilePage: React.FC = () => {
  const { studentProfile, refreshProfiles, user } = useAuth();
  const { success } = useToast();

  const [profile, setProfile] = useState<StudentProfile>(
    studentProfile || (db.getStudents()[0] as StudentProfile)
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveStudent(profile);
    refreshProfiles();
    setIsEditing(false);
    success('Student profile updated successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
            विद्यार्थी प्रोफाईल (Student Profile)
          </h2>
          <p className="text-xs text-gray-500">View and update your personal and academic information.</p>
        </div>
        <Button
          variant={isEditing ? 'ghost' : 'outline'}
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel Edit' : 'Edit Profile'}
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Top Profile Summary Card */}
        <Card className="p-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={profile.avatar}
              alt={profile.fullName}
              className="w-28 h-28 rounded-2xl object-cover border-4 border-rajmudra-orange shadow-md"
            />
            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-rajmudra-charcoal">{profile.fullName}</h3>
                  <p className="text-xs font-bold text-rajmudra-orange">{profile.studentId}</p>
                </div>
                <Badge variant="green" size="md">Active Student</Badge>
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
                  <Calendar className="w-4 h-4 text-rajmudra-orange" />
                  <span>DOB: {profile.dob} ({profile.gender})</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-rajmudra-orange" />
                  <span>Category: {profile.category || 'General'}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Detailed Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Address & Personal */}
          <Card className="p-6 space-y-4">
            <h4 className="text-sm font-bold text-rajmudra-charcoal uppercase tracking-wider border-b pb-2">
              Residential Address (पत्ता)
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Street Address</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={profile.address.street}
                  onChange={e => setProfile({ ...profile, address: { ...profile.address, street: e.target.value } })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 disabled:bg-gray-50 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">City</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profile.address.city}
                    onChange={e => setProfile({ ...profile, address: { ...profile.address, city: e.target.value } })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 disabled:bg-gray-50 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">District</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profile.address.district}
                    onChange={e => setProfile({ ...profile, address: { ...profile.address, district: e.target.value } })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 disabled:bg-gray-50 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Guardian Info */}
          <Card className="p-6 space-y-4">
            <h4 className="text-sm font-bold text-rajmudra-charcoal uppercase tracking-wider border-b pb-2">
              Guardian Details (पालकांची माहिती)
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Guardian Name</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={profile.guardian.name}
                  onChange={e => setProfile({ ...profile, guardian: { ...profile.guardian, name: e.target.value } })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 disabled:bg-gray-50 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Relation</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profile.guardian.relation}
                    onChange={e => setProfile({ ...profile, guardian: { ...profile.guardian, relation: e.target.value } })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 disabled:bg-gray-50 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Guardian Phone</label>
                  <input
                    type="tel"
                    disabled={!isEditing}
                    value={profile.guardian.phone}
                    onChange={e => setProfile({ ...profile, guardian: { ...profile.guardian, phone: e.target.value } })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 disabled:bg-gray-50 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {isEditing && (
          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save Updated Profile
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

