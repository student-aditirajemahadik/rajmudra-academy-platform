import React from 'react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Target,
  Award,
  HeartHandshake,
  CheckCircle2,
  Users,
  Building,
  GraduationCap,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      {/* Page Header */}
      <section className="bg-rajmudra-black text-white py-16 sm:py-20 border-b-2 border-rajmudra-orange relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <Badge variant="orange">अकॅडमी परिचय • ABOUT RAJMUDRA</Badge>
          <h1 className="text-3xl sm:text-5xl font-black font-devanagari">
            शिस्त, ध्यास आणि यशाची अखंड परंपरा
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            सन 2017 पासून महाराष्ट्रातील ग्रामीण व शहरी भागातील हजारो तरुण-तरुणींना प्रशासकीय सेवेत आणि पोलीस दलात अधिकारी म्हणून घडवणारी अग्रगण्य संस्था.
          </p>
        </div>
      </section>

      {/* Origin Story & Heritage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <Badge variant="orange">Since 2017</Badge>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-rajmudra-charcoal font-devanagari">
                छत्रपती शिवरायांच्या प्रेरणेतून साकारलेली 'राजमुद्रा'
              </h2>
            </div>
            
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-devanagari">
              <strong>"प्रतिपच्चंद्रलेखेव वर्धिष्णुर्विश्ववंदिता शाहसूनोः शिवस्यैषा मुद्रा भद्राय राजते"</strong> — या ब्रीदवाक्याला प्रमाण मानून राजमुद्रा अकॅडमीची स्थापना करण्यात आली.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Founded in Pune in 2017, Rajmudra Career Academy was established with a singular mission: to provide world-class, affordable, and deeply disciplined competitive exam coaching. We believe that every student with grit and dedication deserves an ecosystem of top educators, physical drill masters, and modern study facilities.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-orange-50/80 border border-orange-200">
                <div className="text-2xl font-black text-rajmudra-orange">8+ Years</div>
                <div className="text-xs font-semibold text-gray-700">Dedicated Service</div>
              </div>
              <div className="p-4 rounded-xl bg-orange-50/80 border border-orange-200">
                <div className="text-2xl font-black text-rajmudra-orange">12,500+</div>
                <div className="text-xs font-semibold text-gray-700">Students Coached</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80"
                alt="Rajmudra Academy Classroom"
                className="rounded-3xl shadow-xl border-4 border-white object-cover max-h-[420px] w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-rajmudra-black text-white p-5 rounded-2xl border-2 border-rajmudra-orange shadow-glow-orange hidden sm:block">
                <div className="text-sm font-black text-rajmudra-orange font-devanagari">॥ राजमुद्रा करिअर अकॅडमी ॥</div>
                <div className="text-xs text-gray-300">Pune Headquarters</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, and Core Values */}
      <section className="bg-gray-100/70 py-16 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 space-y-4 border-t-4 border-t-rajmudra-orange">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-rajmudra-orange flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-rajmudra-charcoal font-devanagari">आमचे ध्येय (Vision)</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                महाराष्ट्रातील प्रत्येक कानाकोपऱ्यातील गुणवंत विद्यार्थ्याला प्रशासकीय व पोलीस सेवेत सन्मानाने पोहोचवणे आणि प्रामाणिक, कर्तव्यदक्ष अधिकारी घडवणे.
              </p>
            </Card>

            <Card className="p-8 space-y-4 border-t-4 border-t-rajmudra-charcoal">
              <div className="w-12 h-12 rounded-xl bg-gray-100 text-rajmudra-charcoal flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-rajmudra-charcoal font-devanagari">आमचे उद्दिष्ट (Mission)</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                अद्ययावत अभ्यासक्रम, नियमित सराव परीक्षा, वैयक्तिक मार्गदर्शन आणि आंतरराष्ट्रीय दर्जाचे मैदानी प्रशिक्षण यांच्या माध्यमातून 100% परिपूर्ण तयारी करून घेणे.
              </p>
            </Card>

            <Card className="p-8 space-y-4 border-t-4 border-t-amber-500">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-rajmudra-charcoal font-devanagari">मूल्ये (Core Values)</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                शिस्त (Discipline), सातत्य (Consistency), निष्ठा (Dedication), आणि राष्ट्रसेवा (National Service) हीच आमची मूळ जीवनमूल्ये आहेत.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Director's Message */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-rajmudra-charcoal text-white rounded-3xl p-8 sm:p-12 border border-rajmudra-border-gray">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 text-center">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                alt="Director Sandip Patil"
                className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-rajmudra-orange shadow-glow-orange"
              />
              <div className="mt-4">
                <h4 className="text-lg font-bold text-white">संदीप पाटील सर</h4>
                <p className="text-xs text-rajmudra-orange font-semibold">संचालक, राजमुद्रा करिअर अकॅडमी</p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="text-xs font-bold uppercase text-rajmudra-orange tracking-wider">
                संचालकांचे मनोगत (Director's Note)
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-devanagari">
                "जिद्द आणि योग्य मार्गदर्शनाचा मेळ असेल तर कोणतीही परीक्षा अशक्य नाही!"
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed font-devanagari">
                स्पर्धा परीक्षेचा प्रवास हा केवळ अभ्यासाचा नसून संयम, शारीरिक तंदुरुस्ती आणि मानसिक एकाग्रतेचा आहे. राजमुद्रा अकॅडमीत आम्ही प्रत्येक विद्यार्थ्याकडे केवळ विद्यार्थी म्हणून न पाहता भविष्यातील एक सक्षम अधिकारी म्हणून पाहतो. सातत्यपूर्ण सराव, योग्य नियोजन आणि निस्वार्थ मार्गदर्शन यांच्या जोरावर आमचे विद्यार्थी यशाची शिखरे पादाक्रांत करत आहेत.
              </p>
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate('/apply')}
                >
                  Join Rajmudra Academy &rarr;
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

