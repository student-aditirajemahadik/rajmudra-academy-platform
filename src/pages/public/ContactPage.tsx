import React, { useState } from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building,
  MessageSquare,
} from 'lucide-react';
import { Enquiry } from '../../types';

export const ContactPage: React.FC = () => {
  const { success } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    courseInterested: 'Maharashtra Police Bharti (लेखी + मैदानी) 2026',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newEnquiry: Enquiry = {
        id: `enq-${Date.now()}`,
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email || 'N/A',
        courseInterested: formData.courseInterested,
        message: formData.message,
        source: 'Website Contact Page',
        date: new Date().toISOString().split('T')[0],
        status: 'NEW',
      };

      db.saveEnquiry(newEnquiry);
      setIsSubmitting(false);
      setIsSubmitted(true);
      success('Thank you! Your enquiry has been received. Our counselor will contact you shortly.');
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        courseInterested: 'Maharashtra Police Bharti (लेखी + मैदानी) 2026',
        message: '',
      });
    }, 600);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="bg-rajmudra-black text-white py-14 sm:py-16 border-b-2 border-rajmudra-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <Badge variant="orange">संपर्क केंद्र • CONTACT US</Badge>
          <h1 className="text-3xl sm:text-5xl font-black font-devanagari">
            राजमुद्रा अकॅडमीशी संपर्क साधा
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            पुणे मुख्य कार्यालय, संपर्क क्रमांक, प्रवेश चौकशी व मोफत समुपदेशन केंद्र.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 sm:p-8 space-y-6 border-l-4 border-l-rajmudra-orange">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-rajmudra-charcoal font-devanagari">
                  ॥ राजमुद्रा करिअर अकॅडमी ॥
                </h3>
                <p className="text-xs text-rajmudra-orange font-bold uppercase tracking-wider">
                  Head Office & Training Campus
                </p>
              </div>

              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-rajmudra-orange flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-rajmudra-charcoal block">Campuses:</strong>
                    <span>Rajmudra Bhavan, Near Chhatrapati Shivaji Statue, Karve Road, Deccan Gymkhana, Pune, Maharashtra 411004</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-rajmudra-orange flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-rajmudra-charcoal block">Helpline Numbers:</strong>
                    <a href="tel:+919822012345" className="hover:text-rajmudra-orange block font-medium">+91 98220 12345</a>
                    <a href="tel:+919422054321" className="hover:text-rajmudra-orange block font-medium">+91 94220 54321</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-rajmudra-orange flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-rajmudra-charcoal block">Email Inquiries:</strong>
                    <a href="mailto:info@rajmudra.com" className="hover:text-rajmudra-orange block">info@rajmudra.com</a>
                    <a href="mailto:admissions@rajmudra.com" className="hover:text-rajmudra-orange block">admissions@rajmudra.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-rajmudra-orange flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-rajmudra-charcoal block">Working Hours:</strong>
                    <span>Monday to Saturday: 7:00 AM – 8:30 PM</span>
                    <span className="block text-xs text-gray-500">Sunday: 8:00 AM – 2:00 PM</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Simulated Map Placeholder */}
            <Card className="p-6 bg-gradient-to-br from-rajmudra-charcoal to-rajmudra-black text-white space-y-3 border border-rajmudra-border-gray">
              <div className="flex items-center gap-2 text-rajmudra-orange font-bold text-xs uppercase tracking-wider">
                <Building className="w-4 h-4" />
                <span>Pune Campus Location</span>
              </div>
              <div className="h-40 rounded-xl bg-rajmudra-charcoal-dark border border-gray-700 flex flex-col items-center justify-center p-4 text-center space-y-2">
                <MapPin className="w-8 h-8 text-rajmudra-orange animate-bounce" />
                <div className="text-xs font-bold text-gray-200">Deccan Gymkhana, Karve Road, Pune</div>
                <div className="text-[10px] text-gray-400">Easy connectivity via Metro & PMT Bus Stations</div>
              </div>
            </Card>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-rajmudra-charcoal font-devanagari">
                  प्रवेश चौकशी व मोफत समुपदेशन फॉर्म
                </h2>
                <p className="text-xs text-gray-500">
                  Fill in your details below. Our academic counselor will call you within 2 hours.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-8 bg-green-50 rounded-2xl border border-green-200 text-center space-y-3 animate-in fade-in">
                  <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
                  <h3 className="text-lg font-bold text-green-900 font-devanagari">चौकशी यशस्वीरीत्या नोंदवली गेली!</h3>
                  <p className="text-xs sm:text-sm text-green-700 max-w-md mx-auto">
                    तुमचे तपशील आमच्या प्रवेश समुपदेशकांकडे प्राप्त झाले आहेत. लवकरच आम्ही तुमच्याशी संपर्क साधू.
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-2"
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Full Name (पूर्ण नाव) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Patil"
                        value={formData.fullName}
                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Mobile Number (मोबाईल क्र.) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 98220 12345"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Email Address (ईमेल)
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. rahul@gmail.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Course Interested (इच्छुक अभ्यासक्रम)
                      </label>
                      <select
                        value={formData.courseInterested}
                        onChange={e => setFormData({ ...formData, courseInterested: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none bg-white"
                      >
                        <option>Maharashtra Police Bharti (लेखी + मैदानी) 2026</option>
                        <option>MPSC Rajyaseva (Civil Services) Integrated Foundation</option>
                        <option>MPSC Combined Group B & C (PSI / STI / ASO)</option>
                        <option>Talathi Bharti & Saral Seva Mega Batch 2026</option>
                        <option>Banking & SSC Fastrack Batch</option>
                        <option>Agniveer Army & Defence Physical Academy</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Your Message or Questions (तुमची विचारणा / प्रश्न)
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Ask about batch timings, fees, hostel facilities, ground drill..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    leftIcon={<Send className="w-4 h-4" />}
                    className="w-full shadow-glow-orange"
                  >
                    Submit Enquiry Form &rarr;
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
