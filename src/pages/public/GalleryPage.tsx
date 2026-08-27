import React, { useState } from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Image, Calendar, ZoomIn, X } from 'lucide-react';
import { GalleryItem } from '../../types';

export const GalleryPage: React.FC = () => {
  const allGallery = db.getGallery();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const categories = [
    { key: 'ALL', label: 'All Photos' },
    { key: 'GROUND_TRAINING', label: 'Physical Ground Training' },
    { key: 'CLASSROOMS', label: 'Smart Classrooms & Library' },
    { key: 'ACHIEVEMENTS', label: 'Felicitation & Ranks' },
    { key: 'SEMINARS', label: 'Seminars & Workshops' },
  ];

  const filteredItems = allGallery.filter(item => {
    return selectedCategory === 'ALL' || item.category === selectedCategory;
  });

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="bg-rajmudra-black text-white py-14 sm:py-16 border-b-2 border-rajmudra-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <Badge variant="orange">छायाचित्रे • PHOTO & EVENT GALLERY</Badge>
          <h1 className="text-3xl sm:text-5xl font-black font-devanagari">
            राजमुद्रा अकॅडमी जीवन व उपक्रम
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            मैदानी सराव, स्मार्ट वर्गखोल्या, अधिकारी सत्कार समारंभ आणि अभ्यासिकांची झलक.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.key
                  ? 'bg-rajmudra-orange text-white shadow-glow-orange'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <Card
              key={item.id}
              hoverEffect
              className="overflow-hidden border border-gray-200 cursor-pointer group"
              onClick={() => setActiveImage(item)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-3 rounded-full bg-rajmudra-orange text-white shadow-glow-orange">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="bg-rajmudra-black/80 backdrop-blur-sm text-rajmudra-orange text-[10px] font-bold px-2.5 py-1 rounded-md border border-orange-500/30 uppercase">
                    {item.categoryLabel}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-1.5 bg-white">
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                  <Calendar className="w-3.5 h-3.5 text-rajmudra-orange" />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-sm font-bold text-rajmudra-charcoal truncate">{item.title}</h3>
                <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-rajmudra-charcoal rounded-2xl overflow-hidden border border-rajmudra-border-gray shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-rajmudra-orange transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activeImage.imageUrl}
              alt={activeImage.title}
              className="w-full max-h-[70vh] object-contain bg-black"
            />
            <div className="p-6 text-white space-y-2">
              <span className="text-xs font-bold text-rajmudra-orange uppercase tracking-wider">
                {activeImage.categoryLabel} • {activeImage.date}
              </span>
              <h3 className="text-xl font-bold font-devanagari">{activeImage.title}</h3>
              <p className="text-xs sm:text-sm text-gray-300">{activeImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

