import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Send, 
  LogOut, 
  Users, 
  CalendarDays,
  Folder,
  CheckSquare,
  Building2,
  MessageSquare
} from 'lucide-react';

export default function DashboardLayout() {
  const { userData, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  const employeeLinks = [
    { to: "/employee/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/employee/tasks", icon: CheckSquare, label: "Tasks" },
    { to: "/employee/projects", icon: Folder, label: "Projects" },
    { to: "/employee/reports", icon: FileText, label: "My Reports" },
    { to: "/employee/requests", icon: Send, label: "Requests (Leave/WFH)" },
    { to: "/employee/chat", icon: MessageSquare, label: "Team Chat" }
  ];

  const adminLinks = [
    { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/projects", icon: Folder, label: "Projects" },
    { to: "/admin/tasks", icon: CheckSquare, label: "Tasks" },
    { to: "/admin/reports", icon: FileText, label: "Today's Reports" },
    { to: "/admin/employees", icon: Users, label: "Employees" },
    { to: "/admin/clients", icon: Building2, label: "Clients" },
    { to: "/admin/leaves", icon: CalendarDays, label: "Leave & WFH" },
    { to: "/admin/chat", icon: MessageSquare, label: "Team Chat" }
  ];

  const links = userData?.role === 'Admin' ? adminLinks : employeeLinks;

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col transition-all duration-300">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">MAGDIO</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <h2 className="text-xl font-semibold text-gray-800">
            {userData?.role === 'Admin' ? 'Admin Portal' : 'Employee Portal'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{userData?.name}</p>
              <p className="text-xs text-gray-500">{userData?.role}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border-2 border-white shadow-sm">
              {userData?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
