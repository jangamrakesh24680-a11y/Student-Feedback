import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Info } from 'lucide-react';

const StudentResults = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const forms = JSON.parse(localStorage.getItem('feedbackForms') || '[]');
        const responses = JSON.parse(localStorage.getItem('feedbackResponses') || '[]');

        const aggregated = forms.map(f => {
            const formResponses = responses.filter(r => r.formId === f.id);
            const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

            formResponses.forEach(r => {
                Object.values(r.data).forEach(v => {
                    ratingCounts[v]++;
                });
            });

            const pieData = Object.entries(ratingCounts).map(([rating, count]) => ({
                name: `Rating ${rating}`,
                value: count
            })).filter(d => d.value > 0);

            return {
                id: f.id,
                title: f.title,
                totalResponses: formResponses.length,
                pieData
            };
        }).filter(f => f.totalResponses > 0);

        setResults(aggregated);
    }, []);

    const COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#22c55e'];

    return (
        <div className="results-container">
            <div className="glass-card mb-2">
                <div className="flex items-center gap-1">
                    <Info size={20} className="text-primary" />
                    <p>These results represent the aggregated feedback from your fellow students to help you make informed decisions about your courses.</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2rem">
                {results.length === 0 ? (
                    <div className="glass-card col-span-2 text-center py-4">
                        <p className="text-muted">No aggregated results available yet. Be the first to provide feedback!</p>
                    </div>
                ) : (
                    results.map(res => (
                        <div key={res.id} className="glass-card">
                            <h4>{res.title}</h4>
                            <p className="text-muted small mb-1">{res.totalResponses} Students Participated</p>

                            <div style={{ height: '250px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={res.pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {res.pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                        />
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default StudentResults;
