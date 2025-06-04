document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const details = `
        <ul>
            <li><strong>First Name:</strong> ${params.get('firstName') || ''}</li>
            <li><strong>Last Name:</strong> ${params.get('lastName') || ''}</li>
            <li><strong>Email:</strong> ${params.get('email') || ''}</li>
            <li><strong>Mobile Phone:</strong> ${params.get('phone') || ''}</li>
            <li><strong>Business Name:</strong> ${params.get('organization') || ''}</li>
            <li><strong>Submitted At:</strong> ${params.get('timestamp') || ''}</li>
        </ul>
    `;
    document.getElementById('confirmation-details').innerHTML = details;
});