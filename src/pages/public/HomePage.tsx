import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../services/db';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import {
  GraduationCap,
  Award,
  Users,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  MapPin,
  TrendingUp,
  Star,
  ChevronRight,
  Flame,
  Target,
  Trophy,
  Dumbbell,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const courses = db.getCourses().filter(c => c.isActive);
  const featuredCourses = courses.filter(c => c.isFeatured).slice(0, 3);
  const batches = db.getBatches().filter(b => b.status === 'ONGOING' || b.status === 'UPCOMING').slice(0, 4);
  const teachers = db.getTeachers().slice(0, 4);
  const testimonials = db.getTestimonials().filter(t => t.isPublished).slice(0, 3);
  const notices = db.getNotices().slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Hero Section */}
      <section className="relative bg-rajmudra-black text-white pt-12 pb-20 sm:pt-16 sm:pb-28 overflow-hidden border-b-4 border-rajmudra-orange">
        {/* Glowing Orange Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-hero-pattern pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-rajmudra-orange/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-rajmudra-orange/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rajmudra-charcoal border border-orange-500/30 text-orange-400 text-xs font-semibold shadow-glow-orange">
                <Sparkles className="w-3.5 h-3.5 text-rajmudra-orange" />
                <span>विश्वास, शिस्त आणि गुणवत्तेचे प्रतीक • SINCE 2017</span>
              </div>

              {/* Major Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight font-devanagari tracking-tight">
                घडवा आपले उज्ज्वल भविष्य{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rajmudra-orange via-amber-400 to-orange-500 underline decoration-rajmudra-orange/50">
                  राजमुद्रेच्या
                </span>{' '}
                साथीने!
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                महाराष्ट्र पोलीस भरती, MPSC राज्यसेवा, कम्बाइन गट-ब/क (PSI/STI/ASO), आणि तलाठी भरतीसाठी महाराष्ट्रातील अग्रगण्य करिअर अकॅडमी. दर्जेदार लेखी तयारी आणि सैन्य दर्जाचे मैदानी प्रशिक्षण एकाच छताखाली!
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<GraduationCap className="w-5 h-5" />}
                  onClick={() => navigate('/apply')}
                  className="w-full sm:w-auto shadow-glow-orange text-base px-8"
                >
                  Apply for Admission 2026
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  leftIcon={<BookOpen className="w-5 h-5" />}
                  onClick={() => navigate('/courses')}
                  className="w-full sm:w-auto text-white border-gray-600 hover:border-rajmudra-orange hover:bg-rajmudra-orange text-base"
                >
                  Explore All Courses
                </Button>
              </div>

              {/* Quick Features List */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rajmudra-orange" />
                  <span>दैनिक 2 तास मैदानी सराव</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rajmudra-orange" />
                  <span>साप्ताहिक 100 गुणांची OMR टेस्ट</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rajmudra-orange" />
                  <span>24x7 वातानुकूलित अभ्यासिका</span>
                </div>
              </div>
            </div>

            {/* Right Col: Hero Visual Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-rajmudra-orange to-amber-500 rounded-3xl blur-2xl opacity-30 transform -rotate-3" />

                <div className="relative bg-rajmudra-charcoal border-2 border-rajmudra-border-gray rounded-3xl p-6 sm:p-8 shadow-premium-dark text-center space-y-6">
                  {/* Central Logo */}
                  <div className="inline-block relative">
                    <img
                      src="/assets/rajmudra-logo.png"
                      alt="Rajmudra Academy"
                      className="w-32 h-32 sm:w-36 sm:h-36 rounded-full mx-auto border-4 border-rajmudra-orange shadow-glow-orange object-cover"
                    />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-rajmudra-orange text-white text-[11px] font-black uppercase px-3 py-0.5 rounded-full whitespace-nowrap shadow">
                      ESTD. 2017
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white font-devanagari">
                      ॥ राजमुद्रा करिअर अकॅडमी ॥
                    </h3>
                    <p className="text-xs text-gray-400 font-devanagari">
                      "प्रतिपच्चंद्रलेखेव वर्धिष्णुर्विश्ववंदिता"
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-rajmudra-black/60 p-3 rounded-xl border border-rajmudra-border-gray text-left">
                      <div className="text-xl sm:text-2xl font-extrabold text-rajmudra-orange">12,500+</div>
                      <div className="text-[11px] text-gray-300 font-medium">यशस्वी विद्यार्थी</div>
                    </div>
                    <div className="bg-rajmudra-black/60 p-3 rounded-xl border border-rajmudra-border-gray text-left">
                      <div className="text-xl sm:text-2xl font-extrabold text-amber-400">94.8%</div>
                      <div className="text-[11px] text-gray-300 font-medium">निवड प्रमाण</div>
                    </div>
                    <div className="bg-rajmudra-black/60 p-3 rounded-xl border border-rajmudra-border-gray text-left">
                      <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">1,200+</div>
                      <div className="text-[11px] text-gray-300 font-medium">पोलीस शिपाई निवड</div>
                    </div>
                    <div className="bg-rajmudra-black/60 p-3 rounded-xl border border-rajmudra-border-gray text-left">
                      <div className="text-xl sm:text-2xl font-extrabold text-blue-400">45+</div>
                      <div className="text-[11px] text-gray-300 font-medium">तज्ज्ञ प्राध्यापक</div>
                    </div>
                  </div>

                  <Link
                    to="/results"
                    className="inline-flex items-center gap-1.5 text-xs text-rajmudra-orange hover:text-white font-bold transition-colors"
                  >
                    <span>View Toppers & Success Gallery</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Academy Key Statistics Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: 'Years of Excellence', value: '8+ Years', sub: 'Since 2017 in Maharashtra', icon: Trophy, color: 'text-rajmudra-orange' },
            { label: 'Mentored Students', value: '12,500+', sub: 'Across 36 Districts', icon: Users, color: 'text-amber-500' },
            { label: 'Selections in Govt Jobs', value: '3,800+', sub: 'Police, MPSC, Saral Seva', icon: Award, color: 'text-emerald-500' },
            { label: 'Daily Physical Ground Drill', value: '100% Track', sub: 'NIS Certified Coaches', icon: Dumbbell, color: 'text-blue-500' },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="p-5 border-l-4 border-l-rajmudra-orange hover:shadow-xl transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-orange-50 text-rajmudra-orange">
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-rajmudra-charcoal">{stat.value}</div>
                    <div className="text-xs font-bold text-gray-800">{stat.label}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">{stat.sub}</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 3. Why Choose Rajmudra Academy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <Badge variant="orange">राजमुद्रा का निवडावी?</Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-rajmudra-charcoal font-devanagari">
            विद्यार्थ्यांच्या यशाचा भक्कम आधारवड
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            केवळ शिकवणे नव्हे तर विद्यार्थ्यांमध्ये शासकीय सेवेसाठी लागणारी शारीरिक व मानसिक कणखरता निर्माण करणे हेच आमचे उद्दिष्ट.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              title: 'तज्ज्ञ व अनुभवी प्राध्यापक वर्ग',
              desc: 'MPSC रँकर्स, माजी शासकीय अधिकारी आणि नेट/सेट पात्र शिक्षकांचे प्रत्यक्ष मार्गदर्शन व शंका निरसन सत्रे.',
              icon: GraduationCap,
            },
            {
              title: 'सैन्य दर्जाचे मैदानी प्रशिक्षण (Ground)',
              desc: 'NIS प्रमाणित प्रशिक्षकांच्या मार्गदर्शनाखाली 1600m/800m धावणे, गोळाफेक आणि 100m स्प्रिंटचे बायोमेट्रिक टायमिंगसह प्रशिक्षण.',
              icon: Dumbbell,
            },
            {
              title: 'साप्ताहिक 100 गुणांची OMR व CBT टेस्ट सिरीज',
              desc: 'TCS/IBPS आणि MPSC पॅटर्ननुसार नियमित मॉक टेस्ट्स, निगेटिव्ह मार्किंग, आणि महाराष्ट्रव्यापी गुणवत्ता यादी.',
              icon: Target,
            },
            {
              title: '24 तास वातानुकूलित अभ्यासिका (Library)',
              desc: 'शांत वातावरण, वैयक्तिक केबिन, हाय-स्पीड वायफाय आणि 5,000 पेक्षा जास्त संदर्भ पुस्तकांचा अमूल्य संग्रह.',
              icon: BookOpen,
            },
            {
              title: 'अद्ययावत डिजिटल स्टुडंट पोर्टल',
              desc: 'ऑनलाइन परीक्षा देणे, नोट्स डाऊनलोड करणे, उपस्थिती पाहणे आणि फी पावत्या मिळवण्यासाठी आधुनिक डिजिटल सुविधा.',
              icon: Sparkles,
            },
            {
              title: 'मुले व मुलींसाठी स्वतंत्र वसतिगृह (Hostel)',
              desc: 'कॅम्पस लगत सुरक्षित हॉस्टेल, शुद्ध शाकाहारी मेस, आणि 24x7 सुरक्षेची चोख व्यवस्था.',
              icon: ShieldCheck,
            },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card key={idx} hoverEffect className="p-6 border border-gray-100 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-rajmudra-orange-light text-rajmudra-orange flex items-center justify-center shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-rajmudra-charcoal font-devanagari">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 4. Featured Courses */}
      <section className="bg-rajmudra-charcoal text-white py-16 sm:py-20 border-y border-rajmudra-border-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <Badge variant="orange">प्रमुख अभ्यासक्रम</Badge>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-devanagari">
                राजमुद्राचे लोकप्रिय कोर्सेस
              </h2>
              <p className="text-sm text-gray-300 max-w-xl">
                तुमच्या क्षमतेनुसार योग्य कोर्स निवडा आणि आपल्या शासकीय सेवेच्या स्वप्नाला द्या यशाची भरारी.
              </p>
            </div>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-sm font-bold text-rajmudra-orange hover:text-white transition-colors"
            >
              <span>सर्व कोर्सेस पहा (View All)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map(course => (
              <div
                key={course.id}
                className="bg-rajmudra-charcoal-dark rounded-2xl border border-rajmudra-border-gray overflow-hidden flex flex-col justify-between hover:border-rajmudra-orange transition-all duration-300 hover:-translate-y-1 shadow-premium-dark group"
              >
                <div>
                  {/* Thumbnail with category badge */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-rajmudra-orange text-white text-[11px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow">
                        {course.categoryLabel}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 text-xs text-gray-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-rajmudra-orange" />
                      <span>{course.durationText}</span>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-white font-devanagari group-hover:text-rajmudra-orange transition-colors">
                      {course.name}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                      {course.shortDescription}
                    </p>

                    <div className="pt-2 border-t border-rajmudra-charcoal-light flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-gray-400">Total Course Fee</div>
                        <div className="text-lg font-black text-white">
                          ₹{course.discountedFees ? course.discountedFees.toLocaleString('en-IN') : course.fees.toLocaleString('en-IN')}
                          {course.discountedFees && (
                            <span className="text-xs text-gray-500 line-through ml-2 font-normal">
                              ₹{course.fees.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-[11px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                        Admissions Open
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/courses/${course.slug}`)}
                    className="w-full text-xs border-gray-600 text-gray-200 hover:border-rajmudra-orange hover:bg-rajmudra-orange hover:text-white"
                  >
                    View Details
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/apply?courseId=${course.id}`)}
                    className="w-full text-xs shadow-glow-orange"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Upcoming Batches Schedule */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-2">
            <Badge variant="orange">नवीन बॅचेस वेळापत्रक</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-rajmudra-charcoal font-devanagari">
              आगामी व सुरू असलेल्या बॅचेस
            </h2>
            <p className="text-sm text-gray-600">
              वेळ आणि विषयानुसार आपल्या सोयीची बॅच निवडा व आजच जागा निश्चित करा.
            </p>
          </div>
          <Link
            to="/batches"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-rajmudra-orange hover:underline"
          >
            <span>सर्व बॅचेस वेळापत्रक पहा &rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {batches.map(batch => {
            const seatsLeft = Math.max(0, batch.capacity - batch.enrolledCount);
            return (
              <Card key={batch.id} className="p-6 border border-gray-200 flex flex-col justify-between hover:border-rajmudra-orange transition-all">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold text-rajmudra-orange bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-200">
                        {batch.batchCode}
                      </span>
                      <h3 className="text-base font-bold text-rajmudra-charcoal mt-1.5 font-devanagari">
                        {batch.name}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium">{batch.courseName}</p>
                    </div>
                    <Badge variant={batch.status === 'ONGOING' ? 'green' : 'orange'}>
                      {batch.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs text-gray-700 bg-gray-50 p-3.5 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-rajmudra-orange" />
                      <span>{batch.startTime} - {batch.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-rajmudra-orange" />
                      <span>{batch.days}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-rajmudra-orange" />
                      <span>{batch.teacherName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-rajmudra-orange" />
                      <span className="truncate">{batch.room}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-gray-500">Available Seats: </span>
                    <span className="font-extrabold text-rajmudra-orange">{seatsLeft}</span>
                    <span className="text-gray-400"> / {batch.capacity}</span>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/apply?courseId=${batch.courseId}&batchId=${batch.id}`)}
                  >
                    Enroll in Batch
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 6. Results & Achievements Showcase */}
      <section className="bg-gradient-to-b from-orange-50/50 to-white py-16 sm:py-20 border-y border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <Badge variant="orange">यशाची गौरवशाली परंपरा</Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-rajmudra-charcoal font-devanagari">
              राजमुद्रेचे झळाळते यश व मानकरी
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              प्रत्येक भरतीत आणि राज्यसेवेच्या निकालात अव्वल क्रमांकावर राजमुद्राचे विद्यार्थी!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: 'Swapnil Patil',
                post: 'Maharashtra Police Constable (Pune City - Merit 04)',
                year: '2024 Exam',
                marks: 'Ground: 48/50 | Written: 92/100',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
              },
              {
                name: 'Pooja Ghorpade',
                post: 'Police Sub-Inspector (PSI - Open Women Rank 09)',
                year: 'MPSC Combined 2024',
                marks: 'Prelims: 68 | Mains: 142',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
              },
              {
                name: 'Vaibhav Deshmukh',
                post: 'Talathi (Satara District Merit Rank 02)',
                year: 'TCS Pattern 2023',
                marks: 'Total Score: 184 / 200',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
              },
            ].map((topper, idx) => (
              <Card key={idx} hoverEffect className="p-6 text-center space-y-4 border-2 border-orange-100">
                <div className="relative inline-block">
                  <img
                    src={topper.image}
                    alt={topper.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-rajmudra-orange shadow-md"
                  />
                  <div className="absolute -bottom-2 right-0 bg-rajmudra-orange text-white p-1.5 rounded-full shadow">
                    <Trophy className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-rajmudra-charcoal">{topper.name}</h3>
                  <p className="text-xs font-bold text-rajmudra-orange">{topper.post}</p>
                  <p className="text-[11px] text-gray-500">{topper.year}</p>
                </div>

                <div className="bg-orange-50/80 p-2.5 rounded-xl text-xs font-semibold text-gray-800 border border-orange-200">
                  {topper.marks}
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/results')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Complete Hall of Fame & Toppers List
            </Button>
          </div>
        </div>
      </section>

      {/* 7. Faculty Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <Badge variant="orange">तज्ज्ञ प्राध्यापक मंडळ</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-rajmudra-charcoal font-devanagari">
              महाराष्ट्रातील नामवंत मार्गदर्शक
            </h2>
            <p className="text-sm text-gray-600">
              वर्षानुवर्षांचा अनुभव असलेले तज्ज्ञ प्राध्यापक जे विद्यार्थ्यांना घडवतात अधिकारी.
            </p>
          </div>
          <Link to="/faculty" className="text-sm font-bold text-rajmudra-orange hover:underline">
            सर्व मार्गदर्शक पहा &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachers.map(teacher => (
            <Card key={teacher.id} hoverEffect className="p-5 text-center space-y-3">
              <img
                src={teacher.avatar}
                alt={teacher.fullName}
                className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-rajmudra-orange shadow-sm"
              />
              <div>
                <h3 className="text-base font-bold text-rajmudra-charcoal">{teacher.fullName}</h3>
                <p className="text-xs font-semibold text-rajmudra-orange truncate">{teacher.subject}</p>
                <p className="text-[11px] text-gray-500 mt-1">{teacher.experienceYears}+ Years Experience</p>
              </div>
              <p className="text-xs text-gray-600 line-clamp-2 italic">
                "{teacher.bio}"
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* 8. Student Testimonials */}
      <section className="bg-rajmudra-black text-white py-16 sm:py-20 border-y border-rajmudra-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <Badge variant="orange">विद्यार्थ्यांचे मनोगत</Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-devanagari">
              यशस्वी विद्यार्थ्यांचे अनुभव
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(item => (
              <div
                key={item.id}
                className="bg-rajmudra-charcoal p-6 rounded-2xl border border-rajmudra-border-gray flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-300 italic leading-relaxed">
                    "{item.review}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-rajmudra-charcoal-light">
                  <img
                    src={item.photoUrl}
                    alt={item.studentName}
                    className="w-11 h-11 rounded-full object-cover border-2 border-rajmudra-orange"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.studentName}</h4>
                    <p className="text-xs text-rajmudra-orange font-medium">{item.rankOrPost}</p>
                    <p className="text-[10px] text-gray-400">{item.examCleared}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Latest Notices Ticker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="orange">सूचना फलक (Notices)</Badge>
            <h2 className="text-2xl font-bold text-rajmudra-charcoal mt-1 font-devanagari">
              नवीनतम परीक्षा सूचना व अकॅडमी परिपत्रके
            </h2>
          </div>
          <Link to="/notices" className="text-xs font-bold text-rajmudra-orange hover:underline">
            सर्व सूचना पहा &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {notices.map(notice => (
            <Card key={notice.id} className="p-5 border-l-4 border-l-rajmudra-orange flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-gray-500">
                  <span>{notice.publishDate}</span>
                  <span className="font-semibold text-rajmudra-orange">{notice.category}</span>
                </div>
                <h3 className="text-sm font-bold text-rajmudra-charcoal font-devanagari line-clamp-2">
                  {notice.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                  {notice.description}
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] text-gray-400">By {notice.authorName}</span>
                <Link to="/notices" className="text-xs font-bold text-rajmudra-orange hover:underline">
                  Read Full Notice &rarr;
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 10. Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-rajmudra-black via-rajmudra-charcoal to-rajmudra-black rounded-3xl p-8 sm:p-14 border-2 border-rajmudra-orange text-white text-center space-y-6 shadow-glow-orange relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black font-devanagari leading-tight">
              शासकीय अधिकारी होण्याचे स्वप्न प्रत्यक्षात आणा!
            </h2>
            <p className="text-sm sm:text-base text-gray-300">
              आजच राजमुद्रा करिअर अकॅडमीमध्ये ऑनलाइन प्रवेश नोंदणी करा किंवा आमच्या तज्ज्ञ काउन्सलरशी मोफत चर्चा करा.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<GraduationCap className="w-5 h-5" />}
              onClick={() => navigate('/apply')}
              className="w-full sm:w-auto shadow-glow-orange"
            >
              Start Online Admission Form
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto text-white border-gray-500 hover:border-rajmudra-orange hover:bg-rajmudra-orange"
            >
              Contact Pune Campus
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

