import { useState, useEffect } from 'react';
import Head from 'next/head';
import { FaGithub, FaCode, FaCog, FaSun, FaMoon } from 'react-icons/fa';
import GitHubWidget from '../components/widgets/GitHubWidget';
import LeetCodeWidget from '../components/widgets/LeetCodeWidget';
import Card from '../components/ui/Card';

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [settings, setSettings] = useState({
    github: { username: '', token: '' },
    leetcode: { username: '' }
  });

  useEffect(() => {
    // Load dark mode preference
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('dashboardSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    // Apply dark mode
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const saveSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem('dashboardSettings', JSON.stringify(newSettings));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <Head>
        <title>Universal Developer Dashboard</title>
        <meta name="description" content="Comprehensive developer dashboard for GitHub, LeetCode, and more" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Universal Dev Dashboard
                </h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {darkMode ? (
                    <FaSun className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <FaMoon className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                
                <button
                  onClick={() => {/* TODO: Open settings modal */}}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  title="Settings"
                >
                  <FaCog className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <Card className="text-center py-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Welcome to Your Developer Dashboard
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Track your progress across GitHub, LeetCode, and other developer platforms
              </p>
              <div className="flex justify-center space-x-4">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <FaGithub className="w-5 h-5 mr-2" />
                  <span>GitHub</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <FaCode className="w-5 h-5 mr-2" />
                  <span>LeetCode</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Widgets Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* GitHub Widget */}
            <GitHubWidget 
              username={settings.github.username}
              token={settings.github.token}
            />
            
            {/* LeetCode Widget */}
            <LeetCodeWidget 
              username={settings.leetcode.username}
            />
          </div>

          {/* Settings Notice */}
          {(!settings.github.username || !settings.github.token || !settings.leetcode.username) && (
            <Card className="mt-8 text-center py-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Configure Your Services
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                To see your data, please configure your service credentials in the settings.
              </p>
              <button className="btn-primary">
                Open Settings
              </button>
            </Card>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-600 dark:text-gray-400">
              <p>&copy; 2024 Universal Developer Dashboard. Built with Next.js and Tailwind CSS.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
} 