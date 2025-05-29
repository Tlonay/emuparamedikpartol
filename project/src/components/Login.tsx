import React, { useState } from 'react';
import { LogIn } from 'lucide-react';

interface LoginProps {
  onLogin: (studentId: string, name: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (studentId.length !== 8) {
      setError('Öğrenci numarası 8 karakter olmalıdır.');
      return;
    }

    if (!name.trim()) {
      setError('Ad ve soyad girilmesi zorunludur.');
      return;
    }

    onLogin(studentId, name);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/emu (1).png" alt="EMU Paramedics Logo" className="mx-auto h-24 w-24 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">EMU Paramedik Portalı</h1>
          <p className="text-gray-600">Sağlık Bilimleri Fakültesi</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Öğrenci Numarası</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="8 haneli öğrenci numaranız"
              maxLength={8}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Ad Soyad</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Adınızı ve soyadınızı giriniz"
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}
          
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            <LogIn size={20} />
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}