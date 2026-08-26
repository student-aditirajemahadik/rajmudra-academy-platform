import React from 'react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Trophy, Award, Star, CheckCircle, TrendingUp, Users, Shield } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const ResultsPage: React.FC = () => {
  const annualSelectionsData = [
    { year: '2019', selections: 320 },
    { year: '2020', selections: 450 },
    { year: '2021', selections: 680 },
    { year: '2022', selections: 940 },
    { year: '2023', selections: 1250 },
    { year: '2024', selections: 1680 },
    { year: '2025', selections: 2100 },
  ];

  const toppers = [
    {
      name: 'Swapnil Patil',
      exam: 'Maharashtra Police Bharti 2024',
      post: 'Selected as Police Constable (Pune City - Merit 04)',
      marks: 'Ground: 48/50 | Written: 92/100',
      district: 'Pune',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    },
    {
      name: 'Pooja Ghorpade',
      exam: 'MPSC Combined Group B 2024',
      post: 'Police Sub-Inspector (PSI - Open Women Rank 09)',
      marks: 'Prelims: 68/100 | Mains: 142/200',
      district: 'Satara',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    },
    {
      name: 'Vaibhav Deshmukh',
      exam: 'Maharashtra Talathi Exam 2023',
      post: 'Talathi (Satara District Merit Rank 02)',
      marks: 'TCS Score: 184 / 200',
      district: 'Satara',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    },
    {
      name: 'Rutuja Shinde',
      exam: 'MPSC Rajyaseva Civil Services 2024',
      post: 'Selected as Naib Tehsildar (Class II)',
      marks: 'State Rank 24 | Interview: 78/100',
      district: 'Kolhapur',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    },
    {
      name: 'Amol Kadam',
      exam: 'Maharashtra Police Driver Bharti',
      post: 'Police Driver (Thane Rural - Merit 01)',
      marks: 'Driving Skill: 49/50 | Written: 88/100',
      district: 'Sangli',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    },
    {
      name: 'Snehal Jagtap',
      exam: 'MPSC State Tax Inspector (STI)',
      post: 'State Tax Inspector (Finance Dept)',
      marks: 'Mains Score: 138/200',
      district: 'Ahmednagar',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="bg-rajmudra-black text-white py-14 sm:py-16 border-b-2 border-rajmudra-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <Badge variant="orange">यशाचा सुवर्णमहोत्सव • HALL OF FAME</Badge>
          <h1 className="text-3xl sm:text-5xl font-black font-devanagari">
            राजमुद्रेचा दैदिप्यमान निकाल
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            महाराष्ट्र शासन सेवेत दाखल झालेल्या आमच्या सर्व यशस्वी विद्यार्थ्यांचा आणि महाराष्ट्राच्या कानाकोपऱ्यातील भावी अधिकाऱ्यांचा सन्मान!
          </p>
        </div>
      </section>

      {/* KPI Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="p-6 border-l-4 border-l-rajmudra-orange text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-rajmudra-orange">1,200+</div>
            <div className="text-xs font-bold text-gray-700">Police Constables</div>
            <div className="text-[10px] text-gray-500">Maharashtra Police & SRPF</div>
          </Card>
          <Card className="p-6 border-l-4 border-l-amber-500 text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-amber-500">145+</div>
            <div className="text-xs font-bold text-gray-700">PSI / STI / ASO</div>
            <div className="text-[10px] text-gray-500">MPSC Combined Group B</div>
          </Card>
          <Card className="p-6 border-l-4 border-l-emerald-500 text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-emerald-500">380+</div>
            <div className="text-xs font-bold text-gray-700">Talathi & Saral Seva</div>
            <div className="text-[10px] text-gray-500">TCS/IBPS Recruitment</div>
          </Card>
          <Card className="p-6 border-l-4 border-l-blue-500 text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-blue-500">42+</div>
            <div className="text-xs font-bold text-gray-700">Rajyaseva Officers</div>
            <div className="text-[10px] text-gray-500">Class 1 & Class 2 Officers</div>
          </Card>
        </div>
      </div>

      {/* Selections Growth Chart */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-rajmudra-charcoal font-devanagari">
                वर्षनिहाय यशस्वी विद्यार्थ्यांची संख्या (Selections Growth Trend)
              </h2>
              <p className="text-xs text-gray-500">
                Number of Rajmudra students appointed in government services (2019 - 2025)
              </p>
            </div>
            <Badge variant="orange">Consistently Top Performing</Badge>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={annualSelectionsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" stroke="#888888" fontSize={12} />
                <YAxis stroke="#888888" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', color: '#fff', borderRadius: '12px', border: 'none' }}
                  cursor={{ fill: 'rgba(255, 96, 0, 0.05)' }}
                />
                <Bar dataKey="selections" fill="#FF6000" radius={[8, 8, 0, 0]} name="Government Selections" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Toppers Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 space-y-1">
          <Badge variant="orange">गुणवंत विद्यार्थी</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-rajmudra-charcoal font-devanagari">
            अलिकडच्या परीक्षांमधील अव्वल मानांकन विजेते
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {toppers.map((topper, idx) => (
            <Card key={idx} hoverEffect className="p-6 text-center space-y-4 border border-gray-200">
              <div className="relative inline-block">
                <img
                  src={topper.avatar}
                  alt={topper.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-rajmudra-orange shadow-md"
                />
                <div className="absolute -bottom-2 right-0 bg-rajmudra-orange text-white p-1.5 rounded-full shadow">
                  <Trophy className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-rajmudra-charcoal">{topper.name}</h3>
                <p className="text-xs font-bold text-rajmudra-orange mt-0.5">{topper.post}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">District: {topper.district} | {topper.exam}</p>
              </div>

              <div className="bg-orange-50 p-3 rounded-xl text-xs font-semibold text-gray-800 border border-orange-200">
                {topper.marks}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
