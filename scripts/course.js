// Example course array - update completed:true for your courses
const courses = [
    { code: "WDD 130", name: "Web Fundamentals", credits: 2, completed: true, type: "WDD" },
    { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 2, completed: true, type: "WDD" },
    { code: "WDD 231", name: "Web Frontend Development I", credits: 2, completed: false, type: "WDD" },
    { code: "CSE 110", name: "Introduction to Programming", credits: 2, completed: true, type: "CSE" },
    { code: "CSE 111", name: "Programming with Functions", credits: 2, completed: false, type: "CSE" },
    // Add more as needed
];

function renderCourses(filterType = "ALL") {
    const courseContainer = document.getElementById('courses');
    courseContainer.innerHTML = '';
    let filtered = courses;
    if (filterType === "WDD") filtered = courses.filter(c => c.type === "WDD");
    if (filterType === "CSE") filtered = courses.filter(c => c.type === "CSE");
    filtered.forEach(course => {
        const div = document.createElement('div');
        div.className = 'course-card' + (course.completed ? ' completed' : '');
        div.innerHTML = `<strong>${course.code}</strong>: ${course.name}<br>Credits: ${course.credits} <span style="float:right">${course.completed ? '✅ Completed' : ''}</span>`;
        courseContainer.appendChild(div);
    });
    // Show credits
    const totalCredits = filtered.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('credits').textContent = `Total Credits: ${totalCredits}`;
}

document.addEventListener('DOMContentLoaded', () => {
    renderCourses();
    document.getElementById('all-courses-btn').addEventListener('click', () => {
        renderCourses();
    });
    document.getElementById('wdd-courses-btn').addEventListener('click', () => {
        renderCourses("WDD");
    });
    document.getElementById('cse-courses-btn').addEventListener('click', () => {
        renderCourses("CSE");
    });
});