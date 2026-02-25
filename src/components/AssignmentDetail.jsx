import React, { useState } from 'react';
import { X, FileUp, Info, CheckCircle, ArrowLeft } from 'lucide-react';
import './AssignmentDetail.css';

const AssignmentDetail = ({ assignment, onBack }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [comments, setComments] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmissionSuccess(true);
        }, 1500);
    };

    if (submissionSuccess) {
        return (
            <div className="success-view card">
                <CheckCircle size={64} className="success-icon" />
                <h2>Assignment Submitted!</h2>
                <p>Your work for "{assignment.title}" has been successfully uploaded.</p>
                <button onClick={onBack} className="btn-primary">Back to Dashboard</button>
            </div>
        );
    }

    return (
        <div className="detail-container">
            <button className="back-btn" onClick={onBack}>
                <ArrowLeft size={18} />
                <span>Back to List</span>
            </button>

            <div className="detail-grid">
                <div className="assignment-info card">
                    <div className="info-header">
                        <span className="course-tag">{assignment.course}</span>
                        <span className={`badge ${assignment.status === 'graded' ? 'badge-success' : 'badge-warning'}`}>
                            {assignment.status}
                        </span>
                    </div>
                    <h1>{assignment.title}</h1>
                    <p className="description">{assignment.description}</p>

                    <div className="meta-info">
                        <div className="meta-item">
                            <span className="meta-label">Due Date</span>
                            <span className="meta-value">{new Date(assignment.dueDate).toLocaleString()}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Total Points</span>
                            <span className="meta-value">{assignment.points}</span>
                        </div>
                    </div>

                    {assignment.status === 'graded' && (
                        <div className="grade-box">
                            <h3>Grade Received</h3>
                            <div className="grade-display">
                                <span className="grade-score">{assignment.grade}</span>
                                <span className="grade-total">/ {assignment.points}</span>
                            </div>
                            <div className="feedback-section">
                                <h4>Teacher's Feedback:</h4>
                                <p>{assignment.feedback}</p>
                            </div>
                        </div>
                    )}
                </div>

                {assignment.status === 'pending' && (
                    <div className="submission-section card">
                        <h2>Submit Assignment</h2>
                        <form onSubmit={handleSubmit} className="submission-form">
                            <div className="file-upload-area">
                                <FileUp size={32} />
                                <p>Click to upload or drag and drop</p>
                                <span className="file-hint">PDF, DOCX or ZIP (max. 10MB)</span>
                                <input type="file" className="file-input" required />
                            </div>

                            <div className="form-group">
                                <label>Comments for Teacher</label>
                                <textarea
                                    placeholder="Add any notes about your submission..."
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                ></textarea>
                            </div>

                            <button type="submit" className="btn-primary submit-btn" disabled={isSubmitting}>
                                {isSubmitting ? 'Uploading...' : 'Submit Work'}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssignmentDetail;
