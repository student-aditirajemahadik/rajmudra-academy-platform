import React, { useState } from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import { Plus, Trash2 } from 'lucide-react';
import { GalleryItem } from '../../types';

export const AdminGalleryPage: React.FC = () => {
  const { success } = useToast();

  const [gallery, setGallery] = useState(db.getGallery());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'GROUND_TRAINING' as GalleryItem['category'],
    imageUrl:
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800',
    description: '',
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title) return;

    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: formData.title,
      category: formData.category,
      categoryLabel: getCategoryLabel(formData.category),
      imageUrl: formData.imageUrl,
      description: formData.description,
      date: new Date().toISOString().split('T')[0],
    };

    db.saveGalleryItem(newItem);

    setGallery(db.getGallery());
    setIsAddModalOpen(false);

    success('Gallery photo added successfully!');

    setFormData({
      title: '',
      category: 'GROUND_TRAINING',
      imageUrl:
        'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800',
      description: '',
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this gallery photo?')) {
      db.deleteGalleryItem(id);
      setGallery(db.getGallery());
      success('Photo removed.');
    }
  };

  const getCategoryLabel = (
    category: GalleryItem['category']
  ): string => {
    switch (category) {
      case 'GROUND_TRAINING':
        return 'Ground & Physical Drill';

      case 'CLASSROOMS':
        return 'Classroom & Library';

      case 'ACHIEVEMENTS':
        return 'Success & Felicitation';

      case 'EVENTS':
        return 'Events & Seminars';

      case 'SEMINARS':
        return 'Seminars';

      default:
        return category;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
            फोटो गॅलरी व्यवस्थापन (Photo Gallery Manager)
          </h2>

          <p className="text-xs text-gray-500">
            Manage ground training drills, classroom lectures, and
            felicitation ceremony pictures.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setIsAddModalOpen(true)}
          className="shadow-glow-orange"
        >
          Add Gallery Photo
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((item) => (
          <Card
            key={item.id}
            hoverEffect
            className="overflow-hidden border border-gray-200 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                <span className="absolute top-2 left-2 bg-rajmudra-orange text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {item.categoryLabel}
                </span>
              </div>

              <div className="p-4 space-y-1">
                <h3 className="text-sm font-bold text-rajmudra-charcoal font-devanagari">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-500">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-gray-400">
                {item.date}
              </span>

              <button
                onClick={() => handleDelete(item.id)}
                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Delete Photo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Gallery Photo"
        subtitle="Upload picture for public gallery section"
      >
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Photo Title <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              required
              placeholder="e.g. 1600m Running Physical Training"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Category
              </label>

              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category:
                      e.target.value as GalleryItem['category'],
                  })
                }
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none bg-white"
              >
                <option value="GROUND_TRAINING">
                  Ground & Physical Drill
                </option>

                <option value="CLASSROOMS">
                  Classroom & Library
                </option>

                <option value="ACHIEVEMENTS">
                  Success & Felicitation
                </option>

                <option value="EVENTS">
                  Events & Seminars
                </option>

                <option value="SEMINARS">
                  Seminars
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Image URL
              </label>

              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    imageUrl: e.target.value,
                  })
                }
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Description
            </label>

            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full"
            >
              Add Photo
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};