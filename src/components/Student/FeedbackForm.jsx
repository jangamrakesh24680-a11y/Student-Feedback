import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, ClipboardList } from 'lucide-react';

const StudentFeedback = () => {
    const [forms, setForms] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null);
    const [responses, setResponses] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const savedForms = JSON.parse(localStorage.getItem('feedbackForms') || '[]');
        setForms(savedForms);
    }, []);

    const handleRating = (questionId, rating) => {
        setResponses({ ...responses, [questionId]: rating });
    };

    const handleSubmit = () => {
        if (Object.keys(responses).length === selectedForm.questions.length) {
            const allResponses = JSON.parse(localStorage.getItem('feedbackResponses') || '[]');
            const newResponse = {
                formId: selectedForm.id,
                timestamp: Date.now(),
                data: responses
            };

            localStorage.setItem('feedbackResponses', JSON.stringify([...allResponses, newResponse]));
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setSelectedForm(null);
                setResponses({});
            }, 3000);
        }
    };

    if (submitted) {
        return (
            <div className="glass-card flex-center text-center py-4">
                <CheckCircle size={64} className="text-success mb-2" />
                <h2 className="gradient-text">Thank You!</h2>
                <p>Your feedback helps us improve the educational experience.</p>
            </div>
        );
    }

    if (!selectedForm) {
        return (
            <div className="grid grid-cols-3 gap-1.5rem">
                {forms.length === 0 ? (
                    <div className="glass-card col-span-3 text-center py-4">
                        <ClipboardList size={48} className="text-muted mb-1" />
                        <p>No feedback forms available at this time.</p>
                    </div>
                ) : (
                    forms.map(form => (
                        <div key={form.id} className="glass-card hover-glow" onClick={() => setSelectedForm(form)}>
                            <h4>{form.title}</h4>
                            <p className="text-muted small">{form.questions.length} Questions</p>
                            <button className="btn btn-secondary w-full mt-1">Start Evaluation</button>
                        </div>
                    ))
                )}
            </div>
        );
    }

    return (
        <div className="glass-card max-w-700 mx-auto">
            <div className="flex justify-between items-center mb-2">
                <h3>{selectedForm.title}</h3>
                <button className="btn btn-secondary btn-sm" onClick={() => setSelectedForm(null)}>Back</button>
            </div>

            <div className="questions-container">
                {selectedForm.questions.map((q, idx) => (
                    <div key={q.id} className="question-block glass mb-1">
                        <p className="mb-1">{idx + 1}. {q.text}</p>
                        <div className="rating-options">
                            {[1, 2, 3, 4, 5].map(rating => (
                                <button
                                    key={rating}
                                    className={`rating-btn ${responses[q.id] === rating ? 'selected' : ''}`}
                                    onClick={() => handleRating(q.id, rating)}
                                >
                                    {rating}
                                </button>
                            ))}
                        </div>
                        <div className="rating-labels">
                            <span>Poor</span>
                            <span>Excellent</span>
                        </div>
                    </div>
                ))}
            </div>

            <button
                className="btn btn-primary w-full mt-2"
                onClick={handleSubmit}
                disabled={Object.keys(responses).length !== selectedForm.questions.length}
            >
                <Send size={18} className="mr-1" /> Submit Feedback
            </button>

            <style>{`
        .flex-center { display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .text-center { text-align: center; }
        .py-4 { padding: 4rem 0; }
        .mb-1 { margin-bottom: 1rem; }
        .mb-2 { margin-bottom: 2rem; }
        .mt-1 { margin-top: 1rem; }
        .mt-2 { margin-top: 2rem; }
        .mr-1 { margin-right: 0.5rem; }
        .max-w-700 { max-width: 700px; }
        .mx-auto { margin: 0 auto; }
        .text-success { color: #22c55e; }
        .small { font-size: 0.85rem; }
        .hover-glow:hover { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); cursor: pointer; }
        
        .question-block { padding: 1.5rem; }
        .rating-options { display: flex; justify-content: space-between; gap: 0.5rem; }
        .rating-btn {
          flex: 1;
          padding: 0.75rem;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.05);
          color: white;
          cursor: pointer;
          transition: var(--transition);
          font-weight: 600;
        }
        .rating-btn:hover { background: rgba(255, 255, 255, 0.1); }
        .rating-btn.selected { background: var(--primary); color: white; border-color: var(--primary); }
        .rating-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 0.5rem;
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .btn-sm { padding: 0.4rem 0.8rem; font-size: 0.85rem; }
      `}</style>
        </div>
    );
};

export default StudentFeedback;
