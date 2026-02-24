// src/pages/settings/EmailSetting.tsx
import { useState } from 'react';
import { Send, Save, RotateCcw, AlertCircle, Check } from 'lucide-react';

export default function EmailSetting() {
  const [formData, setFormData] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    encryption: 'tls', // tls / ssl / none
    authRequired: true,
    username: '',
    password: '', // in real app → never store plain, use secure input
    fromName: 'Your App Name',
    fromEmail: 'no-reply@yourdomain.com',
    replyToEmail: 'support@yourdomain.com',
    sendTestTo: '',
    dailyLimit: '500',
    enableNotifications: true,
    bounceHandling: 'disable', // disable / forward / reject
  });

  const [testStatus, setTestStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.smtpHost) newErrors.smtpHost = 'SMTP Host is required';
    if (!formData.smtpPort) newErrors.smtpPort = 'Port is required';
    if (formData.authRequired && (!formData.username || !formData.password)) {
      if (!formData.username) newErrors.username = 'Username required for authentication';
      if (!formData.password) newErrors.password = 'Password required for authentication';
    }
    if (!formData.fromEmail || !/\S+@\S+\.\S+/.test(formData.fromEmail)) {
      newErrors.fromEmail = 'Valid From Email is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    // In real app → send to backend / save to config
    console.log('Saving email settings:', formData);
    alert('Email settings saved successfully!');
  };

  const handleTestEmail = async () => {
    if (!formData.sendTestTo || !/\S+@\S+\.\S+/.test(formData.sendTestTo)) {
      alert('Please enter a valid test email address');
      return;
    }

    if (!validateForm()) {
      alert('Please fix the errors in the form first');
      return;
    }

    setTestStatus('sending');

    // Simulate API call (replace with real test endpoint)
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success simulation
      setTestStatus(success ? 'success' : 'error');
      if (success) {
        alert(`Test email sent successfully to ${formData.sendTestTo}`);
      } else {
        alert('Failed to send test email. Check SMTP credentials or server.');
      }
    }, 1800);
  };

  const handleReset = () => {
    if (window.confirm('Reset all changes?')) {
      setFormData({
        smtpHost: 'smtp.gmail.com',
        smtpPort: '587',
        encryption: 'tls',
        authRequired: true,
        username: '',
        password: '',
        fromName: 'Your App Name',
        fromEmail: 'no-reply@yourdomain.com',
        replyToEmail: 'support@yourdomain.com',
        sendTestTo: '',
        dailyLimit: '500',
        enableNotifications: true,
        bounceHandling: 'disable',
      });
      setErrors({});
      setTestStatus('idle');
    }
  };

  return (
    <div className=" mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Email Settings
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Configure SMTP server, sender details, and notification preferences for system emails.
        </p>
      </div>

      {/* SMTP Configuration Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            SMTP Server Configuration
          </h2>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                SMTP Host <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="smtpHost"
                value={formData.smtpHost}
                onChange={handleChange}
                placeholder="smtp.example.com"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 outline-none"
              />
              {errors.smtpHost && <p className="mt-1 text-sm text-red-600">{errors.smtpHost}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Port <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="smtpPort"
                value={formData.smtpPort}
                onChange={handleChange}
                placeholder="587 or 465"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 outline-none"
              />
              {errors.smtpPort && <p className="mt-1 text-sm text-red-600">{errors.smtpPort}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Encryption
              </label>
              <select
                name="encryption"
                value={formData.encryption}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 outline-none"
              >
                <option value="tls">STARTTLS (recommended)</option>
                <option value="ssl">SSL/TLS</option>
                <option value="none">None (insecure)</option>
              </select>
            </div>

            <div className="flex items-center pt-8">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="authRequired"
                  checked={formData.authRequired}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Require Authentication
                </span>
              </label>
            </div>
          </div>

          {formData.authRequired && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="your.email@gmail.com"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 outline-none"
                />
                {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 outline-none"
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sender & General Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Sender & Delivery Settings
          </h2>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                From Name
              </label>
              <input
                type="text"
                name="fromName"
                value={formData.fromName}
                onChange={handleChange}
                placeholder="Your Company / App Name"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                From Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="fromEmail"
                value={formData.fromEmail}
                onChange={handleChange}
                placeholder="no-reply@yourdomain.com"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 outline-none"
              />
              {errors.fromEmail && <p className="mt-1 text-sm text-red-600">{errors.fromEmail}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Reply-To Email
            </label>
            <input
              type="email"
              name="replyToEmail"
              value={formData.replyToEmail}
              onChange={handleChange}
              placeholder="support@yourdomain.com"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Daily Send Limit
              </label>
              <input
                type="number"
                name="dailyLimit"
                value={formData.dailyLimit}
                onChange={handleChange}
                placeholder="500"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 outline-none"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                0 = unlimited (not recommended)
              </p>
            </div>

            <div className="flex items-center pt-8">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="enableNotifications"
                  checked={formData.enableNotifications}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Enable system notification emails
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Test & Bounce Handling */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Test & Advanced Options
          </h2>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Send Test Email To
              </label>
              <div className="flex gap-3">
                <input
                  type="email"
                  name="sendTestTo"
                  value={formData.sendTestTo}
                  onChange={handleChange}
                  placeholder="your.test@email.com"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 outline-none"
                />
                <button
                  type="button"
                  onClick={handleTestEmail}
                  disabled={testStatus === 'sending'}
                  className={`px-5 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                    testStatus === 'sending'
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {testStatus === 'sending' ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Test
                    </>
                  )}
                </button>
              </div>

              {testStatus === 'success' && (
                <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                  <Check size={16} /> Test email sent successfully!
                </p>
              )}
              {testStatus === 'error' && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={16} /> Failed to send test email
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Bounce Email Handling
              </label>
              <select
                name="bounceHandling"
                value={formData.bounceHandling}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 outline-none"
              >
                <option value="disable">Disable bounce processing</option>
                <option value="forward">Forward bounces to admin</option>
                <option value="reject">Reject on bounce</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
        <button
          type="button"
          onClick={handleReset}
          className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <RotateCcw size={16} />
          Reset Changes
        </button>

        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
        >
          <Save size={16} />
          Save Settings
        </button>
      </div>
    </div>
  );
}