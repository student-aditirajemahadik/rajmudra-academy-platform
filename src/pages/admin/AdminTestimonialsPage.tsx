import React, { useState } from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { Star, Trash2 } from 'lucide-react';
import { Testimonial } from '../../types';

export const AdminTestimonialsPage: React.FC = () => {
  const { success } = useToast();

  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    db.getTestimonials()
  );

  const togglePublished = (testimonial: Testimonial) => {
    const updated: Testimonial = {
      ...testimonial,
      isPublished: !testimonial.isPublished,
    };

    db.saveTestimonial(updated);
    setTestimonials(db.getTestimonials());

    success(
      `Testimonial by ${testimonial.studentName} is now ${
        updated.isPublished ? 'PUBLISHED' : 'HIDDEN'
      }`
    );
  };

  /**
   * Your current db.ts does not provide deleteTestimonial().
   *
   * Therefore we remove the testimonial from the current admin view
   * without calling a non-existent database function.
   */
  const handleDelete = (id: string) => {
    if (window.confirm('Delete this testimonial?')) {
      setTestimonials((current) =>
        current.filter((testimonial) => testimonial.id !== id)
      );

      success('Testimonial removed from the current view.');
    }
  };

  /**
   * Creates a simple initials avatar instead of using the missing
   * `avatar` property.
   */
  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);

    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }

    return (
      parts[0].charAt(0) +
      parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
          यशस्वी विद्यार्थ्यांचे अभिप्राय (Student Testimonials Manager)
        </h2>

        <p className="text-xs text-gray-500">
          Manage student reviews and public display toggles.
        </p>
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.length === 0 ? (
          <Card className="p-8 col-span-full text-center">
            <p className="text-sm text-gray-500">
              No testimonials available.
            </p>
          </Card>
        ) : (
          testimonials.map((item) => (
            <Card
              key={item.id}
              hoverEffect
              className="p-6 border border-gray-200 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">

                {/* Student Information */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">

                    {/* Initial Avatar */}
                    <div
                      className="w-11 h-11 rounded-full border border-rajmudra-orange bg-orange-50 text-rajmudra-orange flex items-center justify-center font-bold text-sm"
                      aria-label={`${item.studentName} avatar`}
                    >
                      {getInitials(item.studentName)}
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-rajmudra-charcoal">
                        {item.studentName}
                      </h3>

                      <p className="text-xs text-gray-500">
                        Student
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(item.rating)].map((_, index) => (
                    <Star
                      key={index}
                      className="w-3.5 h-3.5 fill-amber-500"
                    />
                  ))}
                </div>

                {/* Testimonial */}
                <p className="text-xs text-gray-600 italic leading-relaxed font-devanagari">
                  Student testimonial
                </p>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">

                {/* Publish / Hide */}
                <button
                  type="button"
                  onClick={() => togglePublished(item)}
                  className={`text-xs font-bold px-2 py-1 rounded transition-colors ${
                    item.isPublished
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {item.isPublished
                    ? '✓ Published'
                    : 'Hidden'}
                </button>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Remove testimonial"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
