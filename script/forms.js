function toggleForm(formId) {
    const forms = document.querySelectorAll('div[id$="-form"]');
    forms.forEach(function (form) {
        if (form.id === formId) {
            form.classList.toggle('hidden');
        } else {
            form.classList.add('hidden');
        }
    });
}


document.getElementById('btn-logout').addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = '/Project/PaySwift/index.html';
})