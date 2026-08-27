import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, HelpCircle, PhoneCall } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const navigate = useNavigate();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'राजमुद्रा करिअर अकॅडमीमध्ये कोणकोणत्या परीक्षांचे प्रशिक्षण दिले जाते?',
      a: 'राजमुद्रामध्ये महाराष्ट्र पोलीस भरती (लेखी + मैदानी), MPSC राज्यसेवा (Prelims + Mains), MPSC कम्बाइन गट-ब व गट-क (PSI, STI, ASO, Tax Asst.), तलाठी भरती (TCS/IBPS), सरळसेवा आणि सैन्य भरती (अग्निवीर) या परीक्षांची परिपूर्ण तयारी करून घेतली जाते.',
    },
    {
      q: 'पोलीस भरतीसाठी मैदानी प्रशिक्षण कसे आणि कुठे घेतले जाते?',
      a: 'अकॅडमीच्या स्वतःच्या आंतरराष्ट्रीय दर्जाच्या 400 मीटर ट्रॅकवर दररोज सकाळी 2 तास NIS प्रमाणित प्रशिक्षकांच्या उपस्थितीत 1600 मी धावणे, 100 मी स्प्रिंट आणि गोळाफेकचा बायोमेट्रिक टायमिंगसह कसून सराव घेतला जातो.',
    },
    {
      q: 'अकॅडमीत वसतिगृह (Hostel) आणि मेसची सोय उपलब्ध आहे का?',
      a: 'होय, मुले आणि मुलींसाठी अकॅडमी परिसराजवळ स्वतंत्र, सुरक्षित आणि सर्व सोयींनी युक्त हॉस्टेल उपलब्ध आहे. तसेच स्वच्छ व पौष्टिक शाकाहारी मेसची व्यवस्था आहे.',
    },
    {
      q: 'फीस हप्त्यांमध्ये (Installments) भरता येते का?',
      a: 'होय, विद्यार्थ्यांच्या सोयीसाठी 2 किंवा 3 सोप्या हप्त्यांमध्ये फी भरण्याची सुविधा उपलब्ध आहे. तसेच एकरकमी फी भरल्यास विशेष सवलत दिली जाते.',
    },
    {
      q: 'साप्ताहिक टेस्ट सिरीज कशी घेतली जाते?',
      a: 'प्रत्येक रविवारी सकाळी 100 गुणांची प्रत्यक्ष OMR शीटवर आणि आमच्या डिजिटल लॅबमध्ये TCS/IBPS पॅटर्ननुसार ऑनलाइन CBT सराव परीक्षा घेतली जाते. त्याच दिवशी संध्याकाळी विद्यार्थ्यांचा निकाल व रँक जाहीर केली जाते.',
    },
    {
      q: 'अभ्यासिका (Library) २४ तास खुली असते का?',
      a: 'होय, अकॅडमीच्या विद्यार्थ्यांसाठी 24x7 वातानुकूलित, हाय-स्पीड इंटरनेट आणि सीसीटीव्ही सुरक्षिततेसह अभ्यासिका विनामूल्य उपलब्ध असते.',
    },
    {
      q: 'ऑनलाइन ॲडमिशन फॉर्म कसा भरायचा?',
      a: 'तुम्ही आमच्या वेबसाइटवरील "Apply Now" बटणावर क्लिक करून थेट ऑनलाइन फॉर्म भरू शकता. फॉर्म भरल्यानंतर तुम्हाला तात्पुरता ॲप्लिकेशन नंबर मिळेल आणि 24 तासांच्या आत ॲडमिशन कन्फर्म केले जाईल.',
    },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="bg-rajmudra-black text-white py-14 sm:py-16 border-b-2 border-rajmudra-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <Badge variant="orange">वारंवार विचारले जाणारे प्रश्न • FAQ</Badge>
          <h1 className="text-3xl sm:text-5xl font-black font-devanagari">
            प्रवेश व अकॅडमी संबंधित प्रश्नोत्तरे
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            प्रवेश प्रक्रिया, बॅच वेळापत्रक, हॉस्टेल सुविधा आणि शुल्कासंबंधी सर्व प्रश्नांचे निरसन.
          </p>
        </div>
      </section>

      {/* FAQ Accordion List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <Card
              key={idx}
              className={`overflow-hidden border transition-all ${
                isOpen ? 'border-rajmudra-orange shadow-md' : 'border-gray-200'
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className={`w-full p-5 text-left font-bold text-sm sm:text-base flex items-center justify-between gap-4 font-devanagari transition-colors ${
                  isOpen ? 'bg-orange-50/70 text-rajmudra-orange' : 'bg-white text-rajmudra-charcoal hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className={`w-5 h-5 flex-shrink-0 ${isOpen ? 'text-rajmudra-orange' : 'text-gray-400'}`} />
                  <span>{faq.q}</span>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 flex-shrink-0 text-gray-400" />}
              </button>

              {isOpen && (
                <div className="p-5 bg-white border-t border-gray-100 text-xs sm:text-sm text-gray-600 leading-relaxed font-devanagari">
                  {faq.a}
                </div>
              )}
            </Card>
          );
        })}

        {/* CTA Card */}
        <div className="p-8 mt-10 rounded-2xl bg-rajmudra-charcoal text-white text-center space-y-4 border border-rajmudra-border-gray">
          <h3 className="text-xl font-bold font-devanagari">अजून काही शंका आहेत का?</h3>
          <p className="text-xs text-gray-300">आमच्या समुपदेशकांशी थेट संपर्क साधा आणि मोफत करिअर मार्गदर्शन मिळवा.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="primary"
              size="md"
              leftIcon={<PhoneCall className="w-4 h-4" />}
              onClick={() => window.open('tel:+919822012345')}
            >
              Call +91 98220 12345
            </Button>
            <Button
              variant="outline"
              size="md"
              className="text-white border-gray-600 hover:border-rajmudra-orange hover:bg-rajmudra-orange"
              onClick={() => navigate('/contact')}
            >
              Visit Contact Page
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

