import { Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";

// ────────────────────────────────────────────────
// Public Pages (no auth required)
// ────────────────────────────────────────────────

// ────────────────────────────────────────────────
// Protected Pages & Layouts
// ────────────────────────────────────────────────
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import TagsFields from "./pages/TagsFields";
import NotFound from "./pages/NotFound";

// Settings Module
import SettingsLayout from "./pages/settings/SettingsLayout";
import AddUser from "./pages/settings/AddUser";
import AssignRole from "./pages/settings/AssignRole";
import EmailSetting from "./pages/settings/EmailSetting";
import EmailTemplate from "./pages/settings/EmailTemplate";

// HRM Module
import HrmLayout from "./pages/hrm/HrmLayout";
import Employees from "./pages/hrm/Attendance";
import Attendance from "./pages/hrm/Attendance";
import LeaveManagement from "./pages/hrm/LeaveManagement";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProjectManagementLayout from "./pages/project/ProjectManagementLayout";
import AllProjects from "./pages/project/AllProjects";
import TaskManagement from "./pages/project/TaskManagement";
import Team from "./pages/project/Team";
import Timesheet from "./pages/project/Timesheet";
import Overview from "./pages/project/Overview";
import Reports from "./pages/project/Reports";
import ProductManagement from "./pages/product/ProductManagement";
import InventoryManagement from "./pages/inventory/InventoryManagement";
import ProductionManagement from "./pages/production/ProductionManagement";
import QualityManagement from "./pages/quality/QualityManagement";
import FixManagement from "./pages/fix/FixManagement";
import ReTestManagement from "./pages/re-test/ReTestManagement";
import DispatchManagement from "./pages/dispatch/DispatchManagement";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<RootLayout />}>
        {/* Default redirect */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        {/* Main Dashboard */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* Users */}
        <Route path="users" element={<Users />} />

        {/* Tags & Fields */}
        <Route path="tags-fields" element={<TagsFields />} />

        {/* Settings Module (with sub-sidebar) */}
        <Route path="settings" element={<SettingsLayout />}>
          <Route index element={<Navigate to="add-user" replace />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="assign-role" element={<AssignRole />} />
          <Route path="email-setting" element={<EmailSetting />} />
          <Route path="email-template" element={<EmailTemplate />} />
        </Route>

        {/* HRM Module (with sub-sidebar) */}
        <Route path="hrm" element={<HrmLayout />}>
          <Route index element={<Navigate to="employees" replace />} />
          <Route path="employees" element={<Employees />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="leave" element={<LeaveManagement />} />
        </Route>

        <Route path="projects" element={<ProjectManagementLayout />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="projects" element={<AllProjects />} />
          <Route path="tasks" element={<TaskManagement />} />
          <Route path="team" element={<Team />} />
          <Route path="timesheet" element={<Timesheet />} />
          <Route path="reports" element={<Reports />} />
          
        </Route>

        <Route path="/product" element={<ProductManagement />} />

        <Route path="/inventory" element={<InventoryManagement />} />

        <Route path="/production" element={<ProductionManagement />} />

        <Route path="/quality" element={<QualityManagement />} />

        <Route path="/fix" element={<FixManagement />} />

        <Route path="/re-test" element={<ReTestManagement />} />

        <Route path="/dispatch" element={<DispatchManagement />} />

        {/* Catch-all for 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Redirect unknown top-level paths to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
