import React, { useState } from 'react';
import { Check, ClipboardList, User, Calendar, FileText, Send } from 'lucide-react';
import { submissions } from '../services/mockData';
import './GradingPortal.css';

const GradingPortal = ({ assignment, onBack }) => {
    const [selectedSubmission, setSelectedSubmission] = useState(submissions[0]);
    const [gradingData, setGradingData] = useState({ score: '', feedback: '' });
    const [isSaved, setIsSaved] = useState(false);

    const handleGrade = (e) => {
        e.preventDefault();
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className="grading-portal">
            <div className="portal-header">
                <button className="back-btn" onClick={onBack}>← Back to Dashboard</button>
                <h1>Grading: {assignment.title}</h1>
            </div>

            <div className="portal-grid">
                <aside className="submission-list">
                    <h3>Submissions (1)</h3>
                    <div className={`submission-item active`}>
                        <div className="stu-avatar"><User size={18} /></div>
                        <div className="stu-info">
                            <span className="stu-name">{selectedSubmission.studentName}</span>
                            <span className="stu-date">Submitted: {new Date(selectedSubmission.submittedAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </aside>

                <section className="review-area">
                    <div className="file-preview-card card">
                        <div className="file-header">
                            <FileText size={24} className="file-icon" />
                            <div className="file-info">
                                <h4>{selectedSubmission.file}</h4>
                                <span>PDF Document - 1.2 MB</span>
                            </div>
                            <button className="btn-secondary">Download</button>
                        </div>
                        <div className="mock-file-content">
                            [PDF Preview Mock - Content of the student's submission would appear here]
                        </div>
                    </div>

                    <div className="grading-form-card card">
                        <h3>Grade & Feedback</h3>
                        <form onSubmit={handleGrade}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Score (max {assignment.points})</label>
                                    <input
                                        type="number"
                                        placeholder="Enter score"
                                        max={assignment.points}
                                        value={gradingData.score}
                                        onChange={(e) => setGradingData({ ...gradingData, score: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Feedback for Student</label>
                                <textarea
                                    placeholder="Share your thoughts on the submission..."
                                    value={gradingData.feedback}
                                    onChange={(e) => setGradingData({ ...gradingData, feedback: e.target.value })}
                                ></textarea>
                            </div>
                            <button type="submit" className="btn-primary submit-grade">
                                {isSaved ? <><Check size={18} /> Saved</> : <><Send size={18} /> Submit Grade</>}
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default GradingPortal;
