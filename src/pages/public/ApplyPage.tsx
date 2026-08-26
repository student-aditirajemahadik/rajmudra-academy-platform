import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import {
  GraduationCap,
  User,
  BookOpen,
  FileText,
  Upload,
  CheckCircle2,
  Save,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Building,
  Check,
  AlertCircle,
} from 'lucide-react';
import { Application, ApplicationDocument } from '../../types';

export const ApplyPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { success, error, info } = useToast();

  const courses = db.getCourses().filter(c => c.isActive);
  const initialCourseId = searchParams.get('courseId') || courses[0]?.id || '';
  const initialBatchId = searchParams.get('batchId') || '';

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedAppNumber, setGeneratedAppNumber] = useState('');

  // Multi-step form state
  const [formData, setFormData] = useState({
    // Step 1: Registration
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',

    // Step 2: Personal Information
    dob: '',
    gender: 'MALE',
    category: 'Open / General',
    address: '',
    city: 'Pune',
    district: 'Pune',
    pincode: '411004',
    aadhaarNumber: '',
    guardianName: '',
    relation: 'Father',
    guardianPhone: '',
    guardianOccupation: 'Agriculture / Service',

    // Step 3: Educational Information
    highestQualification: 'Graduation (Degree)',
    collegeUniversity: '',
    passingYear: '2024',
    marksPercentage: '',

    // Step 4: Course Selection
    courseId: initialCourseId,
    preferredBatchId: initialBatchId,
    mode: 'OFFLINE' as 'OFFLINE' | 'ONLINE' | 'HYBRID',
    hostelRequired: false,
    physicalTrainingRequired: true,

    // Step 5: Documents
    documents: [
      { id: 'doc-1', title: 'Passport Size Photograph', type: 'PHOTO', fileName: '', fileSize: '', uploadDate: '', status: 'PENDING' },
      { id: 'doc-2', title: 'Aadhaar Card / ID Proof', type: 'ID_PROOF', fileName: '', fileSize: '', uploadDate: '', status: 'PENDING' },
      { id: 'doc-3', title: '10th / 12th Marksheet', type: 'MARKSHEET_12TH', fileName: '', fileSize: '', uploadDate: '', status: 'PENDING' },
    ] as ApplicationDocument[],

    // Declaration
    agreeToTerms: true,
  });

  // Check for saved draft on mount
  useEffect(() => {
    const draft = db.getApplicationDraft();
    if (draft) {
      setFormData(prev => ({
        ...prev,
        ...draft,
        courseId: initialCourseId || (draft as any).courseSelection?.courseId || prev.courseId,
      }));
      info('Loaded previously saved admission application draft.');
    }
  }, [initialCourseId, info]);

  const selectedCourse = courses.find(c => c.id === formData.courseId) || courses[0];
  const availableBatches = db.getBatchesByCourseId(formData.courseId);

  const handleSaveDraft = () => {
    db.saveApplicationDraft(formData);
    success('Application draft saved successfully in your browser!');
  };

  const handleDocumentSimulatedUpload = (docId: string, customName: string) => {
    const updatedDocs = formData.documents.map(d => {
      if (d.id === docId) {
        return {
          ...d,
          fileName: customName,
          fileSize: `${(Math.random() * 2 + 0.4).toFixed(1)} MB`,
          uploadDate: new Date().toISOString().split('T')[0],
          status: 'PENDING' as const,
        };
      }
      return d;
    });
    setFormData(prev => ({ ...prev, documents: updatedDocs }));
    success(`Uploaded document: ${customName}`);
  };

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
        error('Please fill in your Full Name, Email, and Phone number.');
        return false;
      }
    }
    if (step === 2) {
      if (!formData.dob || !formData.address.trim() || !formData.guardianName.trim()) {
        error('Please complete all required personal and guardian fields.');
        return false;
      }
    }
    if (step === 3) {
      if (!formData.highestQualification.trim() || !formData.marksPercentage.trim()) {
        error('Please provide your educational qualifications and marks percentage.');
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(6, prev + 1));
      window.scrollTo({ top: 150, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  const handleSubmitApplication = () => {
    const appNum = `RMA-APP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const selectedBatch = availableBatches.find(b => b.id === formData.preferredBatchId);

    const newApp: Application = {
      id: `app-${Date.now()}`,
      applicationNumber: appNum,
      personalInfo: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob || '2002-01-01',
        gender: formData.gender,
        category: formData.category,
        address: formData.address,
        city: formData.city,
        district: formData.district,
        pincode: formData.pincode,
        aadhaarNumber: formData.aadhaarNumber || '9988-7766-5544',
      },
      guardianInfo: {
        guardianName: formData.guardianName,
        relation: formData.relation,
        guardianPhone: formData.guardianPhone || formData.phone,
        guardianOccupation: formData.guardianOccupation,
      },
      educationInfo: {
        highestQualification: formData.highestQualification,
        collegeUniversity: formData.collegeUniversity || 'State Board / University',
        passingYear: formData.passingYear,
        marksPercentage: formData.marksPercentage,
      },
      courseSelection: {
        courseId: formData.courseId,
        courseName: selectedCourse?.name || 'Police Bharti',
        preferredBatchId: formData.preferredBatchId,
        preferredBatchName: selectedBatch?.name || 'Standard Morning Batch',
        mode: formData.mode,
        hostelRequired: formData.hostelRequired,
        physicalTrainingRequired: formData.physicalTrainingRequired,
      },
      documents: formData.documents.filter(d => d.fileName),
      status: 'SUBMITTED',
      submissionDate: new Date().toISOString(),
      totalFees: selectedCourse?.discountedFees || selectedCourse?.fees || 15000,
    };

    db.saveApplication(newApp);
    db.clearApplicationDraft();
    setGeneratedAppNumber(appNum);
    setIsSubmitted(true);
    success(`Application ${appNum} submitted successfully!`);
  };

  const steps = [
    { num: 1, label: 'Registration' },
    { num: 2, label: 'Personal Info' },
    { num: 3, label: 'Education' },
    { num: 4, label: 'Course & Batch' },
    { num: 5, label: 'Documents' },
    { num: 6, label: 'Review & Submit' },
  ];

  return (
    <div className="space-y-10 pb-24">
      {/* Header */}
      <section className="bg-rajmudra-black text-white py-12 sm:py-14 border-b-2 border-rajmudra-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <Badge variant="orange">ऑनलाइन प्रवेश अर्ज • ADMISSION APPLICATION 2026</Badge>
          <h1 className="text-2xl sm:text-4xl font-black font-devanagari">
            राजमुद्रा करिअर अकॅडमी प्रवेश नोंदणी
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto">
            खालील 6 टप्प्यांत आपला संपूर्ण प्रवेश अर्ज भरा आणि शासकीय अधिकारी होण्याच्या दिशेने पहिले पाऊल टाका.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {isSubmitted ? (
          /* Submission Success View */
          <Card className="p-8 sm:p-12 text-center space-y-6 border-2 border-green-500 shadow-2xl animate-in zoom-in-95">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full mx-auto flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <Badge variant="green" size="md">APPLICATION SUBMITTED</Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-rajmudra-charcoal font-devanagari">
                अभिनंदन! आपला प्रवेश अर्ज यशस्वीरीत्या जमा झाला आहे.
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto">
                आपला अर्ज राजमुद्रा अकॅडमीच्या प्रवेश समितीकडे छाननीसाठी पाठवला गेला आहे.
              </p>
            </div>

            {/* Generated Application Card */}
            <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border-2 border-rajmudra-orange text-center space-y-2 max-w-md mx-auto shadow-sm">
              <div className="text-xs font-bold text-gray-600 uppercase tracking-wider">Your Official Application Number</div>
              <div className="text-2xl sm:text-3xl font-black text-rajmudra-orange font-mono tracking-wider">
                {generatedAppNumber}
              </div>
              <div className="text-[11px] text-gray-500">
                Course: <strong>{selectedCourse?.name}</strong>
              </div>
            </div>

            {/* Next Steps Guide */}
            <div className="text-left bg-gray-50 p-6 rounded-2xl border border-gray-200 max-w-lg mx-auto space-y-3 text-xs sm:text-sm text-gray-700">
              <h4 className="font-bold text-rajmudra-charcoal">पुढील पायऱ्या (Next Steps):</h4>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 mt-0.5" />
                <span>अकॅडमीकडून कागदपत्र पडताळणी केली जाईल (Status: UNDER_REVIEW).</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 mt-0.5" />
                <span>मंजुरीनंतर (Approved), विद्यार्थी पोर्टलवरून बॅच व फी भरता येईल.</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 mt-0.5" />
                <span>काही अडचण असल्यास +91 98220 12345 वर संपर्क साधा.</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/login')}
              >
                Go to Portal Login
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                }}
              >
                Submit Another Application
              </Button>
            </div>
          </Card>
        ) : (
          /* Multi-Step Stepper & Form Body */
          <div className="space-y-8">
            {/* Stepper Progress Bar */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-200">
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {steps.map(s => {
                  const isCurrent = currentStep === s.num;
                  const isCompleted = currentStep > s.num;
                  return (
                    <div
                      key={s.num}
                      onClick={() => s.num < currentStep && setCurrentStep(s.num)}
                      className={`flex flex-col items-center text-center p-2 rounded-xl cursor-pointer transition-all ${
                        isCurrent
                          ? 'bg-orange-50 text-rajmudra-orange font-bold border border-orange-200'
                          : isCompleted
                          ? 'text-green-700 font-semibold'
                          : 'text-gray-400'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${
                          isCurrent
                            ? 'bg-rajmudra-orange text-white shadow-glow-orange'
                            : isCompleted
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                      </div>
                      <span className="text-[11px] truncate max-w-[90px]">{s.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 1: Registration */}
            {currentStep === 1 && (
              <Card className="p-6 sm:p-8 space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-bold text-rajmudra-charcoal font-devanagari">
                    टप्पा १: विद्यार्थी नोंदणी (Step 1: Basic Registration)
                  </h3>
                  <p className="text-xs text-gray-500">Enter your primary contact details to create your academy account.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Full Name of Candidate (उमेदवाराचे पूर्ण नाव) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Prathamesh Anil Kulkarni"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Email Address (ईमेल आयडी) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. student@gmail.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Mobile Number (WhatsApp Enabled) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 98220 12345"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Create Password (पासवर्ड तयार करा)
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Confirm Password (पासवर्ड निश्चित करा)
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
                    />
                  </div>
                </div>
              </Card>
            )}

            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
              <Card className="p-6 sm:p-8 space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-bold text-rajmudra-charcoal font-devanagari">
                    टप्पा २: वैयक्तिक व पालकांची माहिती (Personal & Guardian Details)
                  </h3>
                  <p className="text-xs text-gray-500">Provide official identity, address and guardian information.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Date of Birth (जन्मदिनांक) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={e => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Gender (लिंग) <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.gender}
                      onChange={e => setFormData({ ...formData, gender: e.target.value as any })}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none bg-white"
                    >
                      <option value="MALE">Male (पुरुष)</option>
                      <option value="FEMALE">Female (महिला)</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Social Category (प्रवर्ग)
                    </label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none bg-white"
                    >
                      <option>Open / General</option>
                      <option>OBC</option>
                      <option>EWS</option>
                      <option>SC</option>
                      <option>ST</option>
                      <option>VJNT</option>
                      <option>SEBC</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Residential Address (कायमचा पत्ता) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="House/Flat No, Street, Landmark"
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      District (जिल्हा)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Pune / Satara"
                      value={formData.district}
                      onChange={e => setFormData({ ...formData, district: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Aadhaar Card Number (आधार क्रमांक)
                    </label>
                    <input
                      type="text"
                      placeholder="12 digit Aadhaar"
                      value={formData.aadhaarNumber}
                      onChange={e => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Parent / Guardian Name (पालकांचे नाव) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Anil Kulkarni"
                      value={formData.guardianName}
                      onChange={e => setFormData({ ...formData, guardianName: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Guardian Contact (पालकांचा फोन)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 98221 11223"
                      value={formData.guardianPhone}
                      onChange={e => setFormData({ ...formData, guardianPhone: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
                    />
                  </div>
                </div>
              </Card>
            )}

            {/* Step 3: Educational Information */}
            {currentStep === 3 && (
              <Card className="p-6 sm:p-8 space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-bold text-rajmudra-charcoal font-devanagari">
                    टप्पा ३: शैक्षणिक पात्रता (Educational Background)
                  </h3>
                  <p className="text-xs text-gray-500">Enter your highest qualification and score.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Highest Qualification (सर्वोच्च शिक्षण) <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.highestQualification}
                      onChange={e => setFormData({ ...formData, highestQualification: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none bg-white"
                    >
                      <option>10th (S.S.C.) Pass</option>
                      <option>12th (H.S.C.) Pass</option>
                      <option>Graduation (Degree)</option>
                      <option>Post Graduation (Master Degree)</option>
                      <option>Diploma</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Passing Year (उत्तीर्ण वर्ष)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2023"
                      value={formData.passingYear}
                      onChange={e => setFormData({ ...formData, passingYear: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Marks Percentage / Grade (टक्केवारी) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 78.50%"
                      value={formData.marksPercentage}
                      onChange={e => setFormData({ ...formData, marksPercentage: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      School / College Name (शाळा / कॉलेजचे नाव)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Fergusson College, Pune"
                      value={formData.collegeUniversity}
                      onChange={e => setFormData({ ...formData, collegeUniversity: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
                    />
                  </div>
                </div>
              </Card>
            )}

            {/* Step 4: Course & Batch Selection */}
            {currentStep === 4 && (
              <Card className="p-6 sm:p-8 space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-bold text-rajmudra-charcoal font-devanagari">
                    टप्पा ४: कोर्स व बॅच निवड (Course & Batch Selection)
                  </h3>
                  <p className="text-xs text-gray-500">Select your target exam coaching program and preferred timing.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Select Target Course (अभ्यासक्रम निवडा) <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.courseId}
                      onChange={e => setFormData({ ...formData, courseId: e.target.value, preferredBatchId: '' })}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none bg-white font-medium"
                    >
                      {courses.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name} — ₹{c.discountedFees || c.fees} ({c.durationText})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Preferred Batch Timetable (सोयीची बॅच)
                    </label>
                    <select
                      value={formData.preferredBatchId}
                      onChange={e => setFormData({ ...formData, preferredBatchId: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none bg-white"
                    >
                      <option value="">-- Let Academy Assign Best Available Batch --</option>
                      {availableBatches.map(b => (
                        <option key={b.id} value={b.id}>
                          {b.name} ({b.startTime} - {b.endTime} | {b.days})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-orange-50/50">
                      <input
                        type="checkbox"
                        checked={formData.hostelRequired}
                        onChange={e => setFormData({ ...formData, hostelRequired: e.target.checked })}
                        className="w-4 h-4 text-rajmudra-orange rounded focus:ring-rajmudra-orange"
                      />
                      <div>
                        <div className="text-xs font-bold text-rajmudra-charcoal">Hostel & Mess Required?</div>
                        <div className="text-[11px] text-gray-500">वसतिगृह व भोजन व्यवस्था हवी आहे</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-orange-50/50">
                      <input
                        type="checkbox"
                        checked={formData.physicalTrainingRequired}
                        onChange={e => setFormData({ ...formData, physicalTrainingRequired: e.target.checked })}
                        className="w-4 h-4 text-rajmudra-orange rounded focus:ring-rajmudra-orange"
                      />
                      <div>
                        <div className="text-xs font-bold text-rajmudra-charcoal">Physical Ground Drill Training</div>
                        <div className="text-[11px] text-gray-500">दैनंदिन मैदानी सराव समाविष्ट करा</div>
                      </div>
                    </label>
                  </div>
                </div>
              </Card>
            )}

            {/* Step 5: Documents Upload UI */}
            {currentStep === 5 && (
              <Card className="p-6 sm:p-8 space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-bold text-rajmudra-charcoal font-devanagari">
                    टप्पा ५: आवश्यक कागदपत्रे अपलोड (Document Upload UI)
                  </h3>
                  <p className="text-xs text-gray-500">Upload your verification documents (Simulated instant upload).</p>
                </div>

                <div className="space-y-4">
                  {formData.documents.map(doc => (
                    <div
                      key={doc.id}
                      className="p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-white rounded-xl text-rajmudra-orange shadow-sm border border-gray-200">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-rajmudra-charcoal">{doc.title}</div>
                          <div className="text-[11px] text-gray-500">
                            {doc.fileName ? (
                              <span className="text-green-600 font-semibold">✓ {doc.fileName} ({doc.fileSize})</span>
                            ) : (
                              'Formats: JPG, PNG, PDF (Max 5MB)'
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        {doc.fileName ? (
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Uploaded</span>
                            <button
                              onClick={() => handleDocumentSimulatedUpload(doc.id, `updated_${doc.type.toLowerCase()}.pdf`)}
                              className="text-xs text-rajmudra-orange hover:underline font-semibold"
                            >
                              Replace
                            </button>
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            leftIcon={<Upload className="w-3.5 h-3.5" />}
                            onClick={() => handleDocumentSimulatedUpload(doc.id, `${doc.type.toLowerCase()}_sample.pdf`)}
                            className="text-xs"
                          >
                            Upload File
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Step 6: Review & Submit */}
            {currentStep === 6 && (
              <Card className="p-6 sm:p-8 space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-bold text-rajmudra-charcoal font-devanagari">
                    टप्पा ६: अर्जाचे अंतिम पुनरावलोकन (Review & Submit Application)
                  </h3>
                  <p className="text-xs text-gray-500">Review all information before final submission.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-200 text-xs sm:text-sm text-gray-700">
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 uppercase font-semibold">Applicant Name</div>
                    <div className="font-bold text-rajmudra-charcoal text-base">{formData.fullName}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 uppercase font-semibold">Contact & Email</div>
                    <div className="font-bold text-rajmudra-charcoal">{formData.phone} | {formData.email}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 uppercase font-semibold">Selected Course</div>
                    <div className="font-bold text-rajmudra-orange">{selectedCourse?.name}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 uppercase font-semibold">Course Fee</div>
                    <div className="font-bold text-rajmudra-charcoal">₹{selectedCourse?.discountedFees || selectedCourse?.fees}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 uppercase font-semibold">Educational Marks</div>
                    <div className="font-bold text-rajmudra-charcoal">{formData.highestQualification} ({formData.marksPercentage})</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 uppercase font-semibold">Hostel & Ground</div>
                    <div className="font-bold text-rajmudra-charcoal">
                      Hostel: {formData.hostelRequired ? 'Yes' : 'No'} | Ground Drill: {formData.physicalTrainingRequired ? 'Yes' : 'No'}
                    </div>
                  </div>
                </div>

                <label className="flex items-start gap-3 p-4 rounded-xl border border-orange-200 bg-orange-50/50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={e => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                    className="w-4 h-4 text-rajmudra-orange rounded focus:ring-rajmudra-orange mt-0.5"
                  />
                  <div className="text-xs text-gray-700 leading-snug">
                    मी याद्वारे घोषित करतो/करते की वरील सर्व माहिती खरी व अचूक आहे. मी राजमुद्रा अकॅडमीच्या शिस्त व नियमांचे तंतोतंत पालन करण्यास बांधील आहे.
                  </div>
                </label>
              </Card>
            )}

            {/* Stepper Bottom Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    size="md"
                    onClick={prevStep}
                    leftIcon={<ArrowLeft className="w-4 h-4" />}
                  >
                    Previous Step
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="md"
                  leftIcon={<Save className="w-4 h-4 text-rajmudra-orange" />}
                  onClick={handleSaveDraft}
                  className="text-xs text-gray-600"
                >
                  Save Draft
                </Button>
              </div>

              <div className="w-full sm:w-auto">
                {currentStep < 6 ? (
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={nextStep}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="w-full sm:w-auto shadow-glow-orange"
                  >
                    Continue to Next Step &rarr;
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleSubmitApplication}
                    disabled={!formData.agreeToTerms}
                    leftIcon={<ShieldCheck className="w-5 h-5" />}
                    className="w-full sm:w-auto shadow-glow-orange bg-green-600 hover:bg-green-700"
                  >
                    Submit Official Application
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
