
let section3 = document.getElementById('secThree')

let forms = document.querySelectorAll('form')
forms.forEach(form => form.addEventListener('submit', function (e) {
    e.preventDefault()
}))



function swapReg(a, b) {
    gsap.to(`#${a}`, { y: 50, opacity: 0, display: 'none', duration: 0.3, ease: 'back' })
    gsap.to(`#${b}`, { y: 0, opacity: 1, display: 'block', delay: 0.2, duration: 0.8, ease: 'back' })
    document.querySelector('.secOne').style.filter = 'blur(2)'
}
gsap.from('.Bus', { x: 500, display: 'none', opacity: 0, duration: 1 })
gsap.from('.bgdesign', { x: -500, rotate: -90, opacity: 0, duration: 1 })

let registerForm = document.getElementById('regform')
let loginForm = document.getElementById('log')

document.querySelector('.secOne').addEventListener('click', function (e) {
    if (!loginForm.contains(e.target)) {
        loginForm.style.display = 'none'
    }
    if (!registerForm.contains(e.target)) {
        registerForm.style.display = 'none'
    }
})

let firstName = document.querySelector('.Fname');
let lastName = document.querySelector('.Lname');
//==========Name Validation================

function validateName(name) {
    if (name.value.length >= 3) {
        let regex = /^[a-zA-Z]+$/;
        return regex.test(name.value);
    }
    else
        console.log(name)
    alert(`Name must more than Three character`)
}

let regEmail = document.getElementById('regEmail');
let regForm = document.getElementById('regform');

//===========Email Validation================

function validateEmail() {
    let mailValue = regEmail.value;
    let getEmail = localStorage.getItem(mailValue);

    if (!getEmail) {

        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        if (validRegex.test(mailValue)) {
            return true
        }
        regEmail.setCustomValidity('Invalid Email Address!')
        return false
    }
    else {
        regEmail.setCustomValidity('This Email is already Registered! please Login')
        return false
    }
}


let password = document.getElementById('regPass')
let rePassword = document.getElementById('rePass')

//Password Validation=============
function Passvalidate() {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?])/;
    if (regex.test(password.value)) {
        return true
    }
    else
        password.setCustomValidity('Password must contain a Uppercase,one lowercase,one Symbol and a number')
    // setTimeout(() => password.setCustomValidity(''), 1500)
    return false
}

//Confirm Password=================

function confirmPass() {
    if (rePassword.value === password.value) {
        return true
    }
    else {
        rePassword.setCustomValidity('Password is not match')
        return false
    }
}



function validate() {

    let userData = {
        Name: firstName.value,
        Email: regEmail.value,
        pass: rePassword.value
    }

    if (validateName(firstName) && validateName(lastName) && validateEmail() && Passvalidate() && confirmPass()) {
        localStorage.setItem(regEmail.value, JSON.stringify(userData))
        alert('Resgister Sucessfull')
        registerForm.style.display = 'none'
    }
    else {
        alert('Given information is not correct')
    }
}



let loginEmail = document.getElementById('logEmail');
let logPassword = document.getElementById('logPass');
let welcomeMsg = document.querySelector('.heading')
let logout = document.querySelector('.logBtn')
let cd3Email = document.getElementById('cusEmail')
function loginSubmit() {
    let userItem = localStorage.getItem(loginEmail.value);
    console.log(userItem);
    let getUserItem = JSON.parse(userItem)
    console.log(getUserItem.pass);
    if (getUserItem.pass != logPassword.value) {
        alert('Incorrect Credentials!! Try again.')
        password.setCustomValidity('Password is incorect! please try again.')
        setTimeout(() => password.setCustomValidity(''), 1500)
    }
    else {
        alert('login Succesfull')
        section3.style.display = 'flex'
        logout.innerHTML = `<a class='form' href="index.html">Logout</a>`
        welcomeMsg.innerHTML = `Hi <span class="username">${getUserItem.Name}</span> Welcome-Back!! book tickets here`
        loginForm.style.display = 'none'
        cd1Name
        cd3Email.innerText = getUserItem.Email
        document.getElementById('cd1Name').value = getUserItem.Name

    }
}

