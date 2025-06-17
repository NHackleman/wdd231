// form.js
function getQueryParams() {
    const params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
        params[key] = decodeURIComponent(value.replace(/\+/g, ' '));
    });
    return params;
}
document.addEventListener('DOMContentLoaded', () => {
    const params = getQueryParams();
    const formDataDiv = document.getElementById('form-data');
    if (formDataDiv) {
        if (params.name && params.email && params.message) {
            formDataDiv.innerHTML = `
          <p><strong>Name:</strong> ${params.name}</p>
          <p><strong>Email:</strong> ${params.email}</p>
          <p><strong>Message:</strong> ${params.message}</p>
          <p>Thank you for reaching out! We'll get back to you soon.</p>
        `;
        } else {
            formDataDiv.innerHTML = "<p>No form data found.</p>";
        }
    }
});