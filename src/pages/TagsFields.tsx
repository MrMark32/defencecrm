// src/pages/TagsFields.tsx
export default function TagsFields() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Tags & Custom Fields
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage all tags, categories, and custom fields for your CRM entities (contacts, deals, etc.).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tags Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Tags Management</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create, edit, and delete tags used for labeling records.
          </p>
          {/* Future: tag list, create form, etc. */}
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Create New Tag
          </button>
        </div>

        {/* Custom Fields Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Custom Fields</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Add custom fields to entities like contacts, companies, opportunities...
          </p>
          {/* Future: field builder, list, etc. */}
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Add New Field
          </button>
        </div>
      </div>

      {/* You can later add tables, modals, drag-drop field builder, etc. */}
    </div>
  );
}