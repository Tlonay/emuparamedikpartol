import React, { useState } from 'react';
import { Book, FileText, Brain, Settings as SettingsIcon } from 'lucide-react';
import { Quiz } from './Quiz';
import { Chat } from './Chat';
import { Settings } from './Settings';

interface DashboardProps {
  studentId: string;
  name: string;
  onLogout: () => void;
}

const COURSES = [
  "ENGL162 - Basic English - II",
  "HIST280 - Atatürk's Principles and History of Turkish",
  "ITEC115 - Bilgisayara Giriş",
  "IYAB102 - Acil Hasta Bakımı - II",
  "IYAB108 - İlk ve Acil Yardım Özel Farmokoloji",
  "IYAB110 - Travma",
  "IYAB112 - Acil Sağlık Hizmetleri - II",
  "SPRB116 - Physical Education and Body Building - II"
];

export function Dashboard({ studentId, name, onLogout }: DashboardProps) {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'slides' | 'notes' | 'quiz' | 'settings'>('slides');

  const handleLMSRedirect = () => {
    window.open('https://lms.emu.edu.tr/my/courses.php', '_blank');
  };

  const getCourseCode = (courseName: string) => {
    return courseName.split(' - ')[0];
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src="/emu (1).png" alt="EMU Paramedics Logo" className="h-16 w-16" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">EMU Paramedik Portalı</h1>
                <p className="text-gray-600">Hoş geldiniz, {name}</p>
                <p className="text-sm text-gray-500">Öğrenci No: {studentId}</p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('settings')}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <SettingsIcon size={24} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4">
        {activeTab === 'settings' ? (
          <Settings onLogout={onLogout} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.map((course) => (
              <div key={course} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">{course}</h2>
                  
                  <div className="space-y-4">
                    <button 
                      onClick={handleLMSRedirect}
                      className="w-full flex items-center gap-2 bg-blue-100 text-blue-700 p-3 rounded-md hover:bg-blue-200 transition-colors"
                    >
                      <Book size={20} />
                      Ders Slaytları
                    </button>

                    <button 
                      onClick={() => {
                        setSelectedCourse(course);
                        setActiveTab('notes');
                      }}
                      className="w-full flex items-center gap-2 bg-green-100 text-green-700 p-3 rounded-md hover:bg-green-200 transition-colors"
                    >
                      <FileText size={20} />
                      Öğrenci Notları
                    </button>

                    <button 
                      onClick={() => {
                        setSelectedCourse(course);
                        setActiveTab('quiz');
                      }}
                      className="w-full flex items-center gap-2 bg-purple-100 text-purple-700 p-3 rounded-md hover:bg-purple-200 transition-colors"
                    >
                      <Brain size={20} />
                      Çalışma Testleri
                    </button>
                  </div>
                </div>

                {selectedCourse === course && activeTab === 'quiz' && (
                  <div className="p-6 border-t border-gray-200">
                    <Quiz courseCode={getCourseCode(course)} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <Chat studentId={studentId} name={name} />
    </div>
  );
}