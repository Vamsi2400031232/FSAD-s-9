import React from 'react';
import { GraduationCap, Briefcase, BookOpen, User, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
    const { login, signup } = useAuth();
    const [isLogin, setIsLogin] = React.useState(true);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [role, setRole] = React.useState('student');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            login(email, password);
        } else {
            signup(name, email, password, role);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <BookOpen className="login-logo" size={48} />
                    <h1></h1>
                    <p>Online Assignment & Grading System</p>
                </div>

                <div className="auth-toggle">
                    <button
                        className={isLogin ? 'active' : ''}
                        onClick={() => setIsLogin(true)}
                    >
                        Sign In
                    </button>
                    <button
                        className={!isLogin ? 'active' : ''}
                        onClick={() => setIsLogin(false)}
                    >
                        Sign Up
                    </button>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label>Full Name</label>
                            <div className="input-wrapper">
                                <User size={18} />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-wrapper">
                            <User size={18} />
                            <input
                                type="email"
                                placeholder="name@gmail.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <Lock size={18} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {!isLogin && (
                        <div className="form-group">
                            <label>I am a...</label>
                            <div className="role-selection">
                                <button
                                    type="button"
                                    className={role === 'student' ? 'selected' : ''}
                                    onClick={() => setRole('student')}
                                >
                                    <GraduationCap size={18} /> Student
                                </button>
                                <button
                                    type="button"
                                    className={role === 'teacher' ? 'selected' : ''}
                                    onClick={() => setRole('teacher')}
                                >
                                    <Briefcase size={18} /> Teacher
                                </button>
                            </div>
                        </div>
                    )}

                    <button type="submit" className="btn-primary login-submit">
                        {isLogin ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <div className="login-footer">
                    <p>Demo Login Hints:</p>
                    <small>User 'teacher@gmail.com' for Teacher portal</small>
                    <br />
                    <small>User 'student@gmail.com' for Student portal</small>
                </div>
            </div>
        </div>
    );
};

export default Login;
