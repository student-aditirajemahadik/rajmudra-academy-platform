import React, { useState } from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import {
  Save,
  Building,
  Shield,
  RotateCcw,
} from 'lucide-react';
import { AcademySettings } from '../../types';

/**
 * Extra fields used by the admin settings page.
 * These are kept locally so we don't have to modify
 * the existing AcademySettings type.
 */
type AdminSettingsForm = AcademySettings & {
  marathiTitle: string;
  sloganMarathi: string;
  contactEmail: string;
  contactPhone: string;
  demoPaymentEnabled: boolean;
};

export const AdminSettingsPage: React.FC = () => {
  const { success } = useToast();

  const currentSettings = db.getSettings();

  /**
   * AcademySettings already contains address as an object,
   * so we preserve that structure.
   */
  const [settings, setSettings] = useState<AdminSettingsForm>({
    ...currentSettings,

    // Extra admin fields
    marathiTitle:
      (currentSettings as Partial<AdminSettingsForm>).marathiTitle || '',

    sloganMarathi:
      (currentSettings as Partial<AdminSettingsForm>).sloganMarathi || '',

    contactEmail:
      (currentSettings as Partial<AdminSettingsForm>).contactEmail || '',

    contactPhone:
      (currentSettings as Partial<AdminSettingsForm>).contactPhone || '',

    demoPaymentEnabled:
      (currentSettings as Partial<AdminSettingsForm>).demoPaymentEnabled ?? true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    /**
     * Save only the fields that belong to AcademySettings.
     * Extra UI-only fields are not passed to db.saveSettings().
     */
    const {
      marathiTitle,
      sloganMarathi,
      contactEmail,
      contactPhone,
      demoPaymentEnabled,
      ...academySettings
    } = settings;

    db.saveSettings(academySettings);

    success('Academy settings updated successfully!');
  };

  const handleResetDemoData = () => {
    if (
      window.confirm(
        'Reset all demo data back to factory defaults? Any new test records will be refreshed.'
      )
    ) {
      db.resetToDefaults();

      const resetSettings = db.getSettings();

      setSettings({
        ...resetSettings,

        marathiTitle:
          (resetSettings as Partial<AdminSettingsForm>).marathiTitle || '',

        sloganMarathi:
          (resetSettings as Partial<AdminSettingsForm>).sloganMarathi || '',

        contactEmail:
          (resetSettings as Partial<AdminSettingsForm>).contactEmail || '',

        contactPhone:
          (resetSettings as Partial<AdminSettingsForm>).contactPhone || '',

        demoPaymentEnabled:
          (resetSettings as Partial<AdminSettingsForm>).demoPaymentEnabled ??
          true,
      });

      success('Database successfully reset to initial demo seeds!');

      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
            संस्था व प्रणाली सेटिंग्ज (Academy Master Settings)
          </h2>

          <p className="text-xs text-gray-500">
            Configure academy profile, admission controls, contact details,
            and database maintenance.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          leftIcon={<RotateCcw className="w-4 h-4" />}
          onClick={handleResetDemoData}
          className="text-red-600 hover:bg-red-50 hover:border-red-300 text-xs"
        >
          Reset Demo Data to Defaults
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* =========================================================
            PROFILE CARD
        ========================================================== */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-rajmudra-charcoal border-b pb-2">
            <Building className="w-4 h-4 text-rajmudra-orange" />

            <span>Academy Profile & Branding</span>
          </div>

          {/* Academy Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* English Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Academy Name (English)
              </label>

              <input
                type="text"
                value={settings.academyName}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    academyName: e.target.value,
                  })
                }
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
              />
            </div>

            {/* Marathi Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Academy Name (Marathi)
              </label>

              <input
                type="text"
                value={settings.marathiTitle}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    marathiTitle: e.target.value,
                  })
                }
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none font-devanagari"
              />
            </div>
          </div>

          {/* Sanskrit Slogan */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Heritage Sanskrit Slogan (Shivaji Maharaj Rajmudra)
            </label>

            <input
              type="text"
              value={settings.sloganMarathi}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  sloganMarathi: e.target.value,
                })
              }
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none font-devanagari text-rajmudra-orange font-bold"
            />
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Contact Email
              </label>

              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    contactEmail: e.target.value,
                  })
                }
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Helpline Phone
              </label>

              <input
                type="text"
                value={settings.contactPhone}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    contactPhone: e.target.value,
                  })
                }
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
              />
            </div>
          </div>

          {/* =====================================================
              ADDRESS
          ====================================================== */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              Campus Physical Address
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Line 1 */}
              <input
                type="text"
                placeholder="Address Line 1"
                value={settings.address.line1}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    address: {
                      ...settings.address,
                      line1: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
              />

              {/* Line 2 */}
              <input
                type="text"
                placeholder="Address Line 2"
                value={settings.address.line2}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    address: {
                      ...settings.address,
                      line2: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
              />

              {/* City */}
              <input
                type="text"
                placeholder="City"
                value={settings.address.city}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    address: {
                      ...settings.address,
                      city: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
              />

              {/* District */}
              <input
                type="text"
                placeholder="District"
                value={settings.address.district}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    address: {
                      ...settings.address,
                      district: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
              />

              {/* State */}
              <input
                type="text"
                placeholder="State"
                value={settings.address.state}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    address: {
                      ...settings.address,
                      state: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
              />

              {/* Pincode */}
              <input
                type="text"
                placeholder="Pincode"
                value={settings.address.pincode}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    address: {
                      ...settings.address,
                      pincode: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
              />
            </div>
          </div>
        </Card>

        {/* =========================================================
            ADMISSION CONTROLS
        ========================================================== */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-rajmudra-charcoal border-b pb-2">
            <Shield className="w-4 h-4 text-rajmudra-orange" />

            <span>Admission Controls & Demo Gateway</span>
          </div>

          <div className="space-y-3">
            {/* Admissions */}
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 border border-gray-200 cursor-pointer">
              <div>
                <div className="text-xs font-bold text-rajmudra-charcoal">
                  Public Online Admissions Enabled
                </div>

                <div className="text-[10px] text-gray-500">
                  Allow candidates to submit applications through the website
                </div>
              </div>

              <input
                type="checkbox"
                checked={settings.admissionsOpen}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    admissionsOpen: e.target.checked,
                  })
                }
                className="w-4 h-4 text-rajmudra-orange rounded"
              />
            </label>

            {/* Demo Payment */}
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 border border-gray-200 cursor-pointer">
              <div>
                <div className="text-xs font-bold text-rajmudra-charcoal">
                  Demo Payment Sandbox Active
                </div>

                <div className="text-[10px] text-gray-500">
                  Allow instant simulated receipts without real monetary
                  transactions
                </div>
              </div>

              <input
                type="checkbox"
                checked={settings.demoPaymentEnabled}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    demoPaymentEnabled: e.target.checked,
                  })
                }
                className="w-4 h-4 text-rajmudra-orange rounded"
              />
            </label>
          </div>
        </Card>

        {/* =========================================================
            SAVE BUTTON
        ========================================================== */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            leftIcon={<Save className="w-4 h-4" />}
            className="shadow-glow-orange"
          >
            Save All Academy Settings
          </Button>
        </div>
      </form>
    </div>
  );
};
