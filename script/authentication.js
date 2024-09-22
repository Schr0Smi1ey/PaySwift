function togglePassword(event, id_pass, id_icon) {
    event.preventDefault();
    const passwordField = document.getElementById(id_pass);
    const toggleIcon = document.getElementById(id_icon);

    if (passwordField.type == 'password') {
        passwordField.type = 'text';
        toggleIcon.src = '/Project/PaySwift/images/hide.png';
        // toggleIcon.src = '../images/hide.png';
        toggleIcon.alt = 'Hide';
        toggleIcon.style.height = '20px';
        toggleIcon.style.width = '20px';
    }
    else {
        passwordField.type = 'password';
        toggleIcon.src = '/Project/PaySwift/images/show.png';
        // toggleIcon.src = '../images/show.png';
        toggleIcon.alt = 'Show';
        toggleIcon.style.height = '20px';
        toggleIcon.style.width = '20px';
    }
}
