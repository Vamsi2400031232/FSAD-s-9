import React, { useState } from 'react';
import { Search, Calendar, BookOpen, Clock, AlertCircle } from 'lucide-react';
import './AssignmentList.css';

const AssignmentList = ({ onSelect, assignments, initialFilter = 'all' }) => {
    const [filter, setFilter] = useState(initialFilter);
    const [search, setSearch] = useState('');

    const filteredAssignments = (assignments || []).filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.course.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'all' || item.status === filter;
        return matchesSearch && matchesFilter;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending': return <span className="badge badge-warning">Pending</span>;
            case 'graded': return <span className="badge badge-success">Graded</span>;
            case 'submitted': return <span className="badge badge-primary">Submitted</span>;
            default: return null;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const isOverdue = (dueDate, status) => {
        return status === 'pending' && new Date(dueDate) < new Date();
    };

    return (
        <div className="assignment-list-container">
            <div className="list-controls">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search assignments or courses..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="filter-tabs">
                    <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
                    <button className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>Pending</button>
                    <button className={filter === 'graded' ? 'active' : ''} onClick={() => setFilter('graded')}>Graded</button>
                </div>
            </div>

            <div className="assignments-grid">
                {filteredAssignments.map(assignment => (
                    <div key={assignment.id} className="assignment-card" onClick={() => onSelect(assignment)}>
                        <div className="card-header">
                            <div className="course-tag">{assignment.course}</div>
                            {getStatusBadge(assignment.status)}
                        </div>
                        <h3 className="assignment-title">{assignment.title}</h3>
                        <div className="card-footer">
                            <div className={`due-date ${isOverdue(assignment.dueDate, assignment.status) ? 'overdue' : ''}`}>
                                <Clock size={14} />
                                <span>Due: {formatDate(assignment.dueDate)}</span>
                                {isOverdue(assignment.dueDate, assignment.status) && <AlertCircle size={14} className="late-icon" />}
                            </div>
                            <div className="points-tag">{assignment.points} pts</div>
                        </div>
                    </div>
                ))}
                {filteredAssignments.length === 0 && (
                    <div className="no-results">No assignments found matching your criteria.</div>
                )}
            </div>
        </div>
    );
};

export default AssignmentList;
