export const seedData = () => {
    // Clear existing if needed or just append
    // localStorage.clear();

    // 1. Users (Admins, Instructors, Students)
    const users = [
        { username: 'admin', password: 'password123', role: 'admin', fullName: 'System Admin' },
        { username: 'instructor1', password: 'password123', role: 'instructor', fullName: 'Dr. Sarah Smith' },
        { username: 'instructor2', password: 'password123', role: 'instructor', fullName: 'Prof. Alan Turing' },
        { username: 'student1', password: 'password123', role: 'student', fullName: 'John Doe' },
        { username: 'student2', password: 'password123', role: 'student', fullName: 'Jane Roe' },
    ];
    localStorage.setItem('feedbackUsers', JSON.stringify(users));

    // 2. Courses & Instructors Mapping
    const courses = [
        { id: 'cs101', title: 'Introduction to Computer Science', instructor: 'Dr. Sarah Smith' },
        { id: 'math202', title: 'Advanced Calculus', instructor: 'Prof. Alan Turing' },
        { id: 'eng303', title: 'Literature in the Digital Age', instructor: 'Dr. Sarah Smith' },
    ];
    localStorage.setItem('feedbackCourses', JSON.stringify(courses));

    // 3. Feedback Forms
    const forms = [
        {
            id: 1,
            title: 'Course Evaluation: CS101',
            active: true,
            questions: [
                { id: 101, text: 'How clear were the course objectives?' },
                { id: 102, text: 'Was the instructor approachable and helpful?' },
                { id: 103, text: 'Rate the quality of course materials.' },
                { id: 104, text: 'Overall satisfaction with the course.' },
            ]
        },
        {
            id: 2,
            title: 'Instructor Feedback: Math 202',
            active: true,
            questions: [
                { id: 201, text: 'Pace of the lectures.' },
                { id: 202, text: 'Clarity of complex concepts.' },
                { id: 203, text: 'Effectiveness of problem sets.' },
            ]
        }
    ];
    localStorage.setItem('feedbackForms', JSON.stringify(forms));

    // 4. Sample Responses
    const responses = [
        { formId: 1, timestamp: Date.now() - 86400000, data: { 101: 5, 102: 4, 103: 5, 104: 5 } },
        { formId: 1, timestamp: Date.now() - 43200000, data: { 101: 4, 102: 5, 103: 4, 104: 4 } },
        { formId: 2, timestamp: Date.now() - 21600000, data: { 201: 3, 202: 4, 203: 5 } },
    ];
    localStorage.setItem('feedbackResponses', JSON.stringify(responses));

    console.log('Dummy data seeded to localStorage!');
};
