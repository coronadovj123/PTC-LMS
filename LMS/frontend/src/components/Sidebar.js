import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, BookOpen, Calendar, ClipboardList, Settings, 
  MessageSquare, Users, FileText, Award, Zap
} from 'lucide-react';

const navigationItems = [
  { id: 'Home', name: 'Dashboard', icon: Home },
  { id: 'Courses', name: 'Courses', icon: BookOpen },
  { id: 'Calendar', name: 'Calendar', icon: Calendar },
  { id: 'Assignments', name: 'Assignments', icon: ClipboardList },
  { id: 'Messages', name: 'Messages', icon: MessageSquare },
  { id: 'Grades', name: 'Grades', icon: Award },
  { id: 'Students', name: 'Students', icon: Users },
  { id: 'Resources', name: 'Resources', icon: FileText },
  { id: 'AI Assistant', name: 'AI Assistant', icon: Zap },
  { id: 'Settings', name: 'Settings', icon: Settings },
];

const Sidebar = ({ activeNav, setActiveNav, isSidebarOpen, setSidebarOpen }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isSidebarOpen ? 0 : -280 }}
        className="fixed left-0 top-0 h-full w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 lg:translate-x-0 lg:static lg:z-auto"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">PT</span>
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 dark:text-white">PTC LMS</h2>
                  <p className="text-xs text-gray-500">Learning Platform</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                ×
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="ml-auto w-1 h-6 bg-blue-600 rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 text-white">
              <h3 className="font-bold text-sm mb-1">Upgrade to Pro</h3>
              <p className="text-xs opacity-90 mb-3">Get unlimited access to all features</p>
              <button className="w-full bg-white text-blue-600 rounded-lg py-2 text-xs font-bold hover:bg-gray-50 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
