// src/pages/settings/AddUser.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, Upload } from 'lucide-react';

// Zod schema (basic validation)
const userSchema = z.object({
  employeeId: z.string().min(1, 'Employee ID is required'),
  salutation: z.string().optional(),
  employeeName: z.string().min(2, 'Name is required'),
  employeeEmail: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  designation: z.string().min(1, 'Designation is required'),
  department: z.string().min(1, 'Department is required'),
  country: z.string().min(1, 'Country is required'),
  mobile: z.string().min(10, 'Mobile number is required'),
  gender: z.enum(['Male', 'Female', 'Other', 'Prefer not to say']).optional(),
  joiningDate: z.string().min(1, 'Joining date is required'),
  birthDate: z.string().optional(),
  reportingTo: z.string().optional(),
  language: z.string().optional(),
  userRole: z.string().min(1, 'User role is required'),
  address: z.string().optional(),

  // Other Details
  loginAllow: z.enum(['yes', 'no']),
  receiveEmailNotification: z.enum(['yes', 'no']),
  hourlyRate: z.string().optional(),
  slackMemberId: z.string().optional(),
  skills: z.string().optional(),
  probationEndDate: z.string().optional(),
  noticePeriodStartDate: z.string().optional(),
  noticePeriodEndDate: z.string().optional(),
  employeeType: z.string().optional(),
  maritalStatus: z.string().optional(),
  businessAddress: z.string().optional(),
});

type UserFormData = z.infer<typeof userSchema>;

export default function AddUser() {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      loginAllow: 'yes',
      receiveEmailNotification: 'yes',
    },
  });

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: UserFormData) => {
    setIsSubmitting(true);
    console.log('Form submitted:', data);
    // → replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 1200)); // simulate delay
    setIsSubmitting(false);
    alert('User created successfully!');
  };

  const onSaveAndAddMore = handleSubmit(async (data) => {
    await onSubmit(data);
    reset();
  });

  const onCancel = () => {
    if (window.confirm('Discard changes?')) {
      reset();
      // or navigate back: navigate('/settings/add-user');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-sm border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Account Details
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Fields marked with * are required.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-10">
          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Profile Picture
            </label>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-600 overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                {profilePic ? (
                  <img src={profilePic} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <User size={40} className="text-gray-400" />
                )}
              </div>
              <div>
                <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  <Upload size={16} className="mr-2" />
                  Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePicChange}
                  />
                </label>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  JPG, PNG or GIF (max 2MB recommended)
                </p>
              </div>
            </div>
          </div>

          {/* ────────────────────────────────────────────────
              PERSONAL INFORMATION
          ──────────────────────────────────────────────── */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-gray-900 dark:text-gray-100">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Employee ID */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Employee ID <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('employeeId')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                {errors.employeeId && (
                  <p className="mt-1 text-sm text-red-600">{errors.employeeId.message}</p>
                )}
              </div>

              {/* Salutation */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Salutation</label>
                <select
                  {...register('salutation')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select</option>
                  <option value="Mr">Mr</option>
                  <option value="Ms">Ms</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Dr">Dr</option>
                </select>
              </div>

              {/* Employee Name */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Employee Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('employeeName')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                {errors.employeeName && (
                  <p className="mt-1 text-sm text-red-600">{errors.employeeName.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Employee Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  {...register('employeeEmail')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                {errors.employeeEmail && (
                  <p className="mt-1 text-sm text-red-600">{errors.employeeEmail.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  {...register('password')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Designation <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('designation')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Department <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('department')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('country')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Mobile <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('mobile')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Gender</label>
                <select
                  {...register('gender')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              {/* Joining Date */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Joining Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  {...register('joiningDate')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Date of Birth</label>
                <input
                  type="date"
                  {...register('birthDate')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Reporting To */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Reporting To</label>
                <input
                  {...register('reportingTo')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Preferred Language</label>
                <input
                  {...register('language')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* User Role */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  User Role <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('userRole')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Employee">Employee</option>
                  <option value="HR">HR</option>
                </select>
              </div>

              {/* Address - full width */}
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium mb-1.5">Address</label>
                <textarea
                  {...register('address')}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* ────────────────────────────────────────────────
              OTHER DETAILS
          ──────────────────────────────────────────────── */}
          <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-5 text-gray-900 dark:text-gray-100">
              Other Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Login Allow */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Login Allow
                </label>
                <div className="flex gap-8">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="yes"
                      {...register('loginAllow')}
                      className="accent-blue-600"
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="no"
                      {...register('loginAllow')}
                      className="accent-blue-600"
                    />
                    No
                  </label>
                </div>
              </div>

              {/* Receive Email Notification */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Receive Email Notification
                </label>
                <div className="flex gap-8">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="yes"
                      {...register('receiveEmailNotification')}
                      className="accent-blue-600"
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="no"
                      {...register('receiveEmailNotification')}
                      className="accent-blue-600"
                    />
                    No
                  </label>
                </div>
              </div>

              {/* Hourly Rate */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Hourly Rate</label>
                <input
                  {...register('hourlyRate')}
                  placeholder="$ / hour"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Slack Member ID */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Slack Member ID</label>
                <input
                  {...register('slackMemberId')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Skills (comma separated)
                </label>
                <input
                  {...register('skills')}
                  placeholder="React, Node.js, Leadership, ..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Probation End Date */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Probation End Date</label>
                <input
                  type="date"
                  {...register('probationEndDate')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Notice Period Start */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Notice Period Start Date
                </label>
                <input
                  type="date"
                  {...register('noticePeriodStartDate')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Notice Period End */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Notice Period End Date
                </label>
                <input
                  type="date"
                  {...register('noticePeriodEndDate')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Employee Type */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Employee Type</label>
                <select
                  {...register('employeeType')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Intern">Intern</option>
                </select>
              </div>

              {/* Marital Status */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Marital Status</label>
                <select
                  {...register('maritalStatus')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>

              {/* Business Address - full width */}
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium mb-1.5">Business Address</label>
                <textarea
                  {...register('businessAddress')}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors order-2 sm:order-1"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors order-1 sm:order-2"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>

            <button
              type="button"
              onClick={onSaveAndAddMore}
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-blue-700 text-white rounded-lg hover:bg-blue-800 disabled:opacity-60 transition-colors order-3"
            >
              Save and Add More
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}