import React, { useState } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';

function App() {
  const [student, setStudent] = useState<{ id: string; name: string } | null>(null);

  const handleLogin = (studentId: string, name: string) => {
    setStudent({ id: studentId, name });
  };

  const handleLogout = () => {
    setStudent(null);
  };

  return (
    <div>
      {!student ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard 
          studentId={student.id} 
          name={student.name} 
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;