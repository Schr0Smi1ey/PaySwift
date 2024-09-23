document.getElementById('btn-login').addEventListener('click', function (event) {
    event.preventDefault(); //prevent default bahaivor (loading the page)
    const phoneNumber = document.getElementById('phone-number').value;
    const password = document.getElementById('password').value;
    
    // Temporary validation
    if (phoneNumber == '1234' && password == '1234') {
        window.location.href = 'home.html';
    }
    else {
        alert('Please use phone = (1234) and pin = (1234)');
        return;
    }
})

