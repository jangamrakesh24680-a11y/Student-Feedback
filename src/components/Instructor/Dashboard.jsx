import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BookOpen, Users, Star, MessageSquare } from 'lucide-react';

const InstructorDashboard = ({ user }) => {
    const [myCourses, setMyCourses] = useState([]);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const courses = JSON.parse(localStorage.getItem('feedbackCourses') || '[]');
        const forms = JSON.parse(localStorage.getItem('feedbackForms') || '[]');
        const responses = JSON.parse(localStorage.getItem('feedbackResponses') || '[]');

        // Filter courses for this instructor
        const filteredCourses = courses.filter(c => c.instructor === user.fullName);
        setMyCourses(filteredCourses);

        // Map feedback to courses
        const data = filteredCourses.map(course => {
            const courseForm = forms.find(f => f.title.includes(course.id.toUpperCase()) || f.title.includes(course.title));
            if (!courseForm) return { name: course.title, rating: 0 };

            const courseResponses = responses.filter(r => r.formId === courseForm.id);
            let sum = 0;
            let count = 0;
            courseResponses.forEach(r => {
                Object.values(r.data).forEach(v => {
                    sum += v;
                    count++;
                });
            });

            return {
                name: course.id.toUpperCase(),
                rating: count > 0 ? parseFloat((sum / count).toFixed(1)) : 0,
                responses: courseResponses.length
            };
        });
        setChartData(data);
    }, [user]);

    const COLORS = ['#6366f1', '#ec4899', '#8b5cf6', '#3b82f6'];

    return (
        <div className="instructor-dashboard">
            <div className="welcome-section mb-2">
                <h2 className="gradient-text">Welcome, {user.fullName}</h2>
                <p className="text-muted">Here is the feedback summary for your courses.</p>
            </div>

            <div className="stats-grid">
                <div className="glass-card stat-item">
                    <div className="stat-icon primary"><BookOpen /></div>
                    <div className="stat-info">
                        <p className="text-muted">My Courses</p>
                        <h2>{myCourses.length}</h2>
                    </div>
                </div>
                <div className="glass-card stat-item">
                    <div className="stat-icon secondary"><Users /></div>
                    <div className="stat-info">
                        <p className="text-muted">Total Responses</p>
                        <h2>{chartData.reduce((acc, curr) => acc + (curr.responses || 0), 0)}</h2>
                    </div>
                </div>
                <div className="glass-card stat-item">
                    <div className="stat-icon accent"><Star /></div>
                    <div className="stat-info">
                        <p className="text-muted">Avg. Rating</p>
                        <h2>
                            {(chartData.reduce((acc, curr) => acc + curr.rating, 0) / (chartData.length || 1)).toFixed(1)}/5.0
                        </h2>
                    </div>
                </div>
            </div>

            <div className="glass-card chart-section mt-2rem">
                <h3>Course Performance Overview</h3>
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                            <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 5]} />
                            <Tooltip
                                contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Bar dataKey="rating" radius={[4, 4, 0, 0]}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="courses-list mt-2rem">
                <h3>My Course List</h3>
                <div className="grid grid-cols-2 gap-1.5rem mt-1">
                    {myCourses.map(course => (
                        <div key={course.id} className="glass-card p-1.5">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="badge-sm mb-0.5">{course.id.toUpperCase()}</span>
                                    <h4>{course.title}</h4>
                                </div>
                                <MessageSquare className="text-primary" size={20} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .p-1.5 { padding: 1.5rem; }
                .badge-sm {
                    display: inline-block;
                    padding: 0.2rem 0.5rem;
                    background: rgba(99, 102, 241, 0.1);
                    color: var(--primary);
                    border-radius: 6px;
                    font-size: 0.7rem;
                    font-weight: 700;
                }
                .mb-0.5 { margin-bottom: 0.5rem; }
            `}</style>
        </div>
    );
};

export default InstructorDashboard;
