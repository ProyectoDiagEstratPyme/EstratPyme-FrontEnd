let user = document.getElementById('user');
let password = document.getElementById('password');
let enviar = document.getElementById('enviar');
let message = document.getElementById('message'); 
let btnRegister = document.getElementById('btnRegister');

enviar.addEventListener('click', login);

function login(event) {
    event.preventDefault(); 
    fetch('http://localhost:5155/api/Users/Login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: user.value, password: password.value })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("Login successful");
            localStorage.setItem("admin", user.value);
            localStorage.setItem("user", data.id);
            console.log(data);
            location.href = "../templates/Header.html";
        } else {
            console.log("Login failed");
            if (message) {
                message.textContent = data.message || "Username or password is incorrect";
                message.style = "color: red; font-weight: bold;";
            }
            user.classList.add("is-invalid");
            password.classList.add("is-invalid");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        if (message) {
            message.textContent = "An error occurred during login";
            message.style = "color: red; font-weight: bold;";
        }
    });
}

btnRegister.addEventListener('click', () => {
    location.href = "./register.html";
});
