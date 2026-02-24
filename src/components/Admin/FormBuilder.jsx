import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

const FormBuilder = () => {
    const [forms, setForms] = useState([]);
    const [newForm, setNewForm] = useState({ title: '', questions: [] });
    const [currentQuestion, setCurrentQuestion] = useState('');

    useEffect(() => {
        const savedForms = JSON.parse(localStorage.getItem('feedbackForms') || '[]');
        setForms(savedForms);
    }, []);

    const saveForms = (updatedForms) => {
        setForms(updatedForms);
        localStorage.setItem('feedbackForms', JSON.stringify(updatedForms));
    };

    const addQuestion = () => {
        if (currentQuestion.trim()) {
            setNewForm({
                ...newForm,
                questions: [...newForm.questions, { id: Date.now(), text: currentQuestion }]
            });
            setCurrentQuestion('');
        }
    };

    const removeQuestion = (id) => {
        setNewForm({
            ...newForm,
            questions: newForm.questions.filter(q => q.id !== id)
        });
    };

    const createForm = () => {
        if (newForm.title.trim() && newForm.questions.length > 0) {
            const updatedForms = [...forms, { ...newForm, id: Date.now(), active: true }];
            saveForms(updatedForms);
            setNewForm({ title: '', questions: [] });
        }
    };

    const deleteForm = (id) => {
        const updatedForms = forms.filter(f => f.id !== id);
        saveForms(updatedForms);
    };

    return (
        <div className="grid grid-cols-2 gap-2rem">
            <div className="glass-card">
                <h3>Create New Form</h3>
                <div className="input-group">
                    <label>Form Title</label>
                    <input
                        type="text"
                        placeholder="e.g., Computer Science 101 Feedback"
                        value={newForm.title}
                        onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
                        className="modern-input"
                    />
                </div>

                <div className="input-group">
                    <label>Add Question</label>
                    <div className="flex gap-1">
                        <input
                            type="text"
                            placeholder="Enter question text..."
                            value={currentQuestion}
                            onChange={(e) => setCurrentQuestion(e.target.value)}
                            className="modern-input"
                        />
                        <button className="btn btn-primary" onClick={addQuestion}><Plus size={20} /></button>
                    </div>
                </div>

                <div className="questions-list">
                    {newForm.questions.map((q, idx) => (
                        <div key={q.id} className="question-item glass">
                            <span>{idx + 1}. {q.text}</span>
                            <Trash2 size={16} className="text-error cursor-pointer" onClick={() => removeQuestion(q.id)} />
                        </div>
                    ))}
                </div>

                <button
                    className="btn btn-primary w-full mt-2rem"
                    onClick={createForm}
                    disabled={!newForm.title || newForm.questions.length === 0}
                >
                    Publish Form
                </button>
            </div>

            <div className="glass-card">
                <h3>Existing Forms</h3>
                <div className="forms-list">
                    {forms.length === 0 ? (
                        <div className="empty-state">
                            <AlertCircle size={40} className="text-muted" />
                            <p>No forms created yet.</p>
                        </div>
                    ) : (
                        forms.map(form => (
                            <div key={form.id} className="form-card glass">
                                <div className="form-info">
                                    <h4>{form.title}</h4>
                                    <p>{form.questions.length} Questions</p>
                                </div>
                                <div className="form-actions">
                                    <span className="badge-success"><CheckCircle2 size={14} /> Active</span>
                                    <Trash2 size={18} className="text-error cursor-pointer" onClick={() => deleteForm(form.id)} />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <style>{`
        .input-group { margin-bottom: 1.5rem; }
        .modern-input {
          width: 100%;
          padding: 0.85rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border);
          border-radius: 12px;
          color: white;
          outline: none;
          transition: var(--transition);
        }
        .modern-input:focus { border-color: var(--primary); background: rgba(255, 255, 255, 0.1); }
        .flex { display: flex; align-items: center; gap: 0.5rem; }
        .w-full { width: 100%; }
        .mt-2rem { margin-top: 2rem; }
        .question-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          margin-bottom: 0.5rem;
          border-radius: 8px;
        }
        .text-error { color: #ef4444; }
        .cursor-pointer { cursor: pointer; }
        .forms-list { display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem; }
        .form-card {
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .form-actions { display: flex; align-items: center; gap: 1rem; }
        .badge-success {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.6rem;
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 600;
        }
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          padding: 3rem;
          color: var(--text-muted);
        }
      `}</style>
        </div>
    );
};

export default FormBuilder;
