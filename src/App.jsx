import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import AssignmentList from './components/AssignmentList';
import AssignmentDetail from './components/AssignmentDetail';
import AssignmentCreator from './components/AssignmentCreator';
import GradingPortal from './components/GradingPortal';
import Profile from './pages/Profile';
import { assignments as initialAssignments } from './services/mockData';
import './App.css';

const AppContent = () => {
    const { user, loading } = useAuth();
    const [assignments, setAssignments] = useState(initialAssignments);
    const [view, setView] = useState('dashboard'); // dashboard, detail, create, grade
    const [selectedAssignment, setSelectedAssignment] = useState(null);

    if (loading) {
        return <div className="loading-screen">Loading EduLink...</div>;
    }

    if (!user) {
        return <Login />;
    }

    const handleSelectAssignment = (assignment) => {
        setSelectedAssignment(assignment);
        setView(user.role === 'teacher' ? 'grade' : 'detail');
    };

    const handleCreateAssignment = (newAssignment) => {
        setAssignments([newAssignment, ...assignments]);
        setView('dashboard');
    };

    return (
        <div className="layout">
            <Navbar />
            <div className="main-content container">
                <Sidebar onNavigate={(v) => setView(v)} currentView={view} />
                <main className="content-area">
                    {view === 'profile' ? (
                        <Profile />
                    ) : user.role === 'student' ? (
                        <StudentPortal
                            view={view}
                            setView={setView}
                            assignments={assignments}
                            selectedAssignment={selectedAssignment}
                            onSelect={handleSelectAssignment}
                        />
                    ) : (
                        <TeacherPortal
                            view={view}
                            setView={setView}
                            assignments={assignments}
                            selectedAssignment={selectedAssignment}
                            onSelect={handleSelectAssignment}
                            onSave={handleCreateAssignment}
                        />
                    )}
                </main>
            </div>
        </div>
    );
};

const StudentPortal = ({ view, setView, assignments, selectedAssignment, onSelect }) => {
    if (view === 'detail') {
        return <AssignmentDetail assignment={selectedAssignment} onBack={() => setView('dashboard')} />;
    }

    return (
        <div className="dashboard-view">
            <header className="page-header">
                <h1>{view === 'grades' ? 'Grades & Feedback' : 'Student Dashboard'}</h1>
                <p>{view === 'grades' ? 'Review your scores and teacher comments.' : 'Manage your assignments and track your performance.'}</p>
            </header>
            <AssignmentList
                assignments={assignments}
                onSelect={onSelect}
                initialFilter={view === 'grades' ? 'graded' : 'all'}
            />
        </div>
    );
};

const TeacherPortal = ({ view, setView, assignments, selectedAssignment, onSelect, onSave }) => {
    if (view === 'create') {
        return <AssignmentCreator onCancel={() => setView('dashboard')} onSave={onSave} />;
    }

    if (view === 'grade') {
        return <GradingPortal assignment={selectedAssignment} onBack={() => setView('dashboard')} />;
    }

    return (
        <div className="dashboard-view">
            <header className="page-header">
                <div className="header-with-action">
                    <div>
                        <h1>Teacher Dashboard</h1>
                        <p>Monitor submissions and publish new assignments.</p>
                    </div>
                    <button className="btn-primary" onClick={() => setView('create')}>+ Create Assignment</button>
                </div>
            </header>
            <AssignmentList
                assignments={assignments}
                onSelect={onSelect}
            />
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
