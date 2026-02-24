// src/pages/settings/EmailTemplate.tsx
import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Save, X, AlertCircle } from 'lucide-react';

// Mock data – in real app fetch from backend
const initialTemplates = [
  {
    id: 1,
    name: 'Welcome Email',
    subject: 'Welcome to Our Platform, {{name}}!',
    category: 'Onboarding',
    html: '<h1 style="color: #0ea5e9;">Hello {{name}},</h1><p>Welcome! Your account is ready.</p>',
    updatedAt: '2026-02-05',
  },
  {
    id: 2,
    name: 'Password Reset',
    subject: 'Reset Your Password',
    category: 'Auth',
    html: '<h2>Reset Password</h2><p>Click <a href="{{resetLink}}">here</a> to reset.</p>',
    updatedAt: '2026-02-08',
  },
];

export default function EmailTemplate() {
  const [templates, setTemplates] = useState(initialTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState({
    name: '',
    subject: '',
    category: '',
    html: '',
  });
  const [previewMode, setPreviewMode] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Template name is required';
    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (!form.category) newErrors.category = 'Category is required';
    if (!form.html.trim()) newErrors.html = 'HTML content is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const newTemplate = {
      id: Date.now(),
      name: form.name,
      subject: form.subject,
      category: form.category,
      html: form.html,
      updatedAt: new Date().toISOString().split('T')[0],
    };

    if (selectedTemplate) {
      // Update existing
      setTemplates((prev) =>
        prev.map((t) => (t.id === selectedTemplate.id ? { ...t, ...newTemplate } : t))
      );
    } else {
      // Create new
      setTemplates((prev) => [...prev, newTemplate]);
    }

    handleCancel();
    alert('Template saved successfully!');
  };

  const handleEdit = (template: any) => {
    setSelectedTemplate(template);
    setForm({
      name: template.name,
      subject: template.subject,
      category: template.category,
      html: template.html,
    });
    setIsCreating(true);
    setPreviewMode(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Delete this template?')) {
      setTemplates((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setSelectedTemplate(null);
    setForm({ name: '', subject: '', category: '', html: '' });
    setErrors({});
    setPreviewMode(false);
  };

  const handleNew = () => {
    handleCancel();
    setIsCreating(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Email Templates
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Create, edit and manage reusable email templates with variables support.
          </p>
        </div>

        {!isCreating && (
          <button
            onClick={handleNew}
            className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors shadow-sm"
          >
            <Plus size={18} className="mr-2" />
            Create New Template
          </button>
        )}
      </div>

      {/* Template List */}
      {!isCreating && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {templates.map((template) => (
                  <tr key={template.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {template.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {template.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200">
                        {template.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {template.updatedAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleEdit(template)}
                          className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(template.id)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create/Edit Form */}
      {isCreating && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {selectedTemplate ? 'Edit Template' : 'Create New Template'}
            </h2>
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {previewMode ? <X size={18} className="mr-2" /> : <Eye size={18} className="mr-2" />}
              {previewMode ? 'Edit Mode' : 'Preview'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Template Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleInputChange}
                placeholder="Welcome Email"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 outline-none"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleInputChange}
                placeholder="Welcome to {{appName}}!"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 outline-none"
              />
              {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 outline-none"
              >
                <option value="">Select category</option>
                <option value="Onboarding">Onboarding</option>
                <option value="Auth">Authentication</option>
                <option value="Notification">Notification</option>
                <option value="Marketing">Marketing</option>
                <option value="Transactional">Transactional</option>
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              HTML Content <span className="text-red-500">*</span>
            </label>
            {previewMode ? (
              <div
                className="border border-gray-300 dark:border-gray-600 rounded-lg p-6 bg-white min-h-[400px] overflow-auto"
                dangerouslySetInnerHTML={{ __html: form.html || '<p>No content yet</p>' }}
              />
            ) : (
              <textarea
                name="html"
                value={form.html}
                onChange={handleInputChange}
                rows={15}
                placeholder={`<div style="font-family: Arial, sans-serif;">
  <h1>Hello {{name}},</h1>
  <p>Welcome to our platform!</p>
  <a href="{{link}}" style="background:#0ea5e9; color:white; padding:12px 24px; text-decoration:none; border-radius:6px;">Get Started</a>
</div>`}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-y min-h-[400px]"
              />
            )}
            {errors.html && <p className="mt-1 text-sm text-red-600">{errors.html}</p>}
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Use variables like <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{{name}}</code>, <code>{{link}}</code>, etc.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleCancel}
              className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
            >
              <Save size={18} />
              Save Template
            </button>
          </div>
        </div>
      )}
    </div>
  );
}