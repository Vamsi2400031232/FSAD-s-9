import React from 'react';
import { User, Mail, Shield, Calendar, MapPin, Phone, GraduationCap, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div className="profile-container">
            <header className="page-header">
                <h1>Profile Details</h1>
                <p>Manage your account settings and personal information.</p>
            </header>

            <div className="profile-grid">
                <div className="profile-card card">
                    <div className="profile-hero">
                        <div className="profile-avatar">
                            <User size={64} />
                        </div>
                        <div className="profile-main-info">
                            <h2>{user.name}</h2>
                            <span className="profile-role-badge">
                                {user.role === 'teacher' ? <Briefcase size={16} /> : <GraduationCap size={16} />}
                                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </span>
                        </div>
                    </div>

                    <div className="profile-details-list">
                        <div className="detail-item">
                            <Mail size={18} className="detail-icon" />
                            <div className="detail-content">
                                <label>Email Address</label>
                                <p>{user.email}</p>
                            </div>
                        </div>

                        <div className="detail-item">
                            <Shield size={18} className="detail-icon" />
                            <div className="detail-content">
                                <label>User ID</label>
                                <p>{user.id}</p>
                            </div>
                        </div>

                        <div className="detail-item">
                            <Calendar size={18} className="detail-icon" />
                            <div className="detail-content">
                                <label>Joined Date</label>
                                <p>February 2026</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="profile-actions-column">
                    <div className="card settings-card">
                        <h3>Account Settings</h3>
                        <div className="settings-list">
                            <button className="settings-btn">Change Password</button>
                            <button className="settings-btn">Notification Preferences</button>
                            <button className="settings-btn">Privacy Settings</button>
                            <button className="settings-btn danger">Deactivate Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
