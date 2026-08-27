import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Shield,
  Award,
  ChevronRight,
  Heart,
} from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-rajmudra-black text-gray-300 pt-16 pb-12 border-t-2 border-rajmudra-orange relative overflow-hidden">
      {/* Subtle Shivaji Rajmudra Calligraphy Background Watermark */}
      <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none select-none text-right font-devanagari text-8xl font-black text-white pr-6 pb-4 hidden lg:block leading-tight">
        प्रतिपच्चंद्रलेखेव<br />वर्धिष्णुर्विश्ववंदिता
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-rajmudra-charcoal">
          {/* Col 1: Brand & Sanskrit Motto */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/assets/rajmudra-logo.png"
                alt="Rajmudra Career Academy Logo"
                className="w-14 h-14 rounded-full border-2 border-rajmudra-orange shadow-glow-orange object-cover"
              />
              <div>
                <h3 className="text-white font-black text-xl font-devanagari">॥ राजमुद्रा ॥</h3>
                <p className="text-rajmudra-orange text-xs font-bold font-devanagari">करिअर अकॅडमी • SINCE 2017</p>
              </div>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed font-devanagari">
              "प्रतिपच्चंद्रलेखेव वर्धिष्णुर्विश्ववंदिता शाहसूनोः शिवस्यैषा मुद्रा भद्राय राजते"
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Maharashtra's premier coaching academy for Police Bharti, MPSC Rajyaseva, Combined PSI/STI/ASO, and Saral Seva examinations.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="flex items-center gap-1.5 text-xs text-orange-400 bg-orange-950/60 px-2.5 py-1 rounded-full border border-orange-500/30">
                <Award className="w-3.5 h-3.5 text-rajmudra-orange" />
                12,500+ Selections
              </span>
              <span className="flex items-center gap-1.5 text-xs text-orange-400 bg-orange-950/60 px-2.5 py-1 rounded-full border border-orange-500/30">
                <Shield className="w-3.5 h-3.5 text-rajmudra-orange" />
                ISO 9001:2015
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white text-base font-bold mb-4 flex items-center gap-2 border-l-2 border-rajmudra-orange pl-2.5">
              महत्त्वाच्या लिंक्स (Quick Links)
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'About Rajmudra Academy', path: '/about' },
                { name: 'Upcoming Batches & Timetable', path: '/batches' },
                { name: 'Our Expert Faculty Members', path: '/faculty' },
                { name: 'Results & Hall of Fame', path: '/results' },
                { name: 'Photo & Event Gallery', path: '/gallery' },
                { name: 'Official Notices & GRs', path: '/notices' },
                { name: 'Frequently Asked Questions', path: '/faq' },
                { name: 'Online Admission Portal', path: '/apply' },
              ].map(item => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-1.5 hover:text-rajmudra-orange transition-colors text-gray-400 hover:translate-x-1 duration-200"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-rajmudra-orange opacity-70" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Courses */}
          <div>
            <h4 className="text-white text-base font-bold mb-4 flex items-center gap-2 border-l-2 border-rajmudra-orange pl-2.5">
              प्रमुख कोर्सेस (Featured Programs)
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Maharashtra Police Bharti (लेखी + मैदानी)', path: '/courses/police-bharti' },
                { name: 'MPSC Rajyaseva Integrated 2026', path: '/courses/mpsc-rajyaseva' },
                { name: 'MPSC Combined PSI / STI / ASO', path: '/courses/mpsc-combined-group-b-c' },
                { name: 'Talathi Bharti & Saral Seva Mega Batch', path: '/courses/talathi-saral-seva' },
                { name: 'Banking & SSC Speed Arithmetic Batch', path: '/courses/banking-ssc-fastrack' },
                { name: 'Agniveer Army & Defence Physical Academy', path: '/courses/defence-agniveer-academy' },
              ].map(item => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-1.5 hover:text-rajmudra-orange transition-colors text-gray-400 hover:translate-x-1 duration-200"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-rajmudra-orange opacity-70" />
                    <span className="truncate">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Campus Info */}
          <div>
            <h4 className="text-white text-base font-bold mb-4 flex items-center gap-2 border-l-2 border-rajmudra-orange pl-2.5">
              संपर्क केंद्र (Campus Info)
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rajmudra-orange flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Rajmudra Bhavan</strong>, Near Chhatrapati Shivaji Statue, Karve Road, Deccan Gymkhana, Pune, Maharashtra 411004
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-rajmudra-orange flex-shrink-0" />
                <div>
                  <a href="tel:+919822012345" className="hover:text-white block">+91 98220 12345</a>
                  <a href="tel:+919422054321" className="hover:text-white block">+91 94220 54321</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-rajmudra-orange flex-shrink-0" />
                <a href="mailto:info@rajmudra.com" className="hover:text-white">info@rajmudra.com</a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-rajmudra-orange flex-shrink-0" />
                <span>7:00 AM – 8:30 PM (Mon to Sat)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Rajmudra Career Academy. All rights reserved. Built for Excellence.</p>
          <div className="flex items-center gap-6">
            <Link to="/login" className="hover:text-rajmudra-orange transition-colors">Portal Login</Link>
            <Link to="/faq" className="hover:text-rajmudra-orange transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-rajmudra-orange transition-colors">Terms of Admission</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

