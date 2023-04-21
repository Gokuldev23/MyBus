import { loading, getCityData, attachAutoComplete, traveldist, distance } from "./CityData.js"

//======Seat Rendering==========
let a = document.getElementById('cont-one')
let b = document.getElementById('cont-two')
let totalTickets = document.getElementById('totTicket');
let ticketPrice = document.getElementById('ticPrice');
let amountPayable = document.getElementById('discount')

function demo(c, n) {
    for (let i = n; i <= n + 6; i++) {
        let randomSeat = Math.round(Math.random() * 2)

        c.innerHTML += `<img id="seat${i}" class="seat" src="assets/seat.png"/>`

        if (!randomSeat) { document.getElementById(`seat${i}`).style.background = "red" }
        else if (randomSeat == 2) {
            document.getElementById(`seat${i}`).style.background = "gray"
        }
    }
}
demo(a, 1);
demo(b, 12);

//========seat selection==========
let count = 0

document.getElementById('seatContainer').addEventListener('click', function (e) {
    const seat = e.target.closest('.seat')
    count += 1

    if (!seat)
        return
    if (distance.innerText == 'NONE') {
        alert('WE CURRENTLY NOT SERVE OUTSIDE OF INDIA')
        myfun('cardTwo', 'cardOne')
        return
    }
    seat.classList.toggle('seatSelected')
    //===============
    totalTickets.innerText = count;
    ticketPrice.innerText = count * traveldist;
    amountPayable.innerText = (ticketPrice.innerText) - (ticketPrice.innerText) * 5 / 100;
})

let cd1Name = document.getElementById('cd1Name')
let cd3name = document.getElementById('cusName')
//==========Card Toggle===========

window.myfun = function myfun(c, d) {
    loading('block')
    c == 'cardOne' ? getCityData() : '';
    if (d == 'cardThree') {
        cd3name.innerText = cd1Name.value;
        if (count == 0) {
            return alert("YOU MUST SELECT ATLEAST ONE SEAT")
        }
    }
    gsap.to(`.${c}`, { x: 100, opacity: 0, display: 'none', duration: 0.3 })
    gsap.to(`.${d}`, { x: 0, opacity: 1, display: 'flex', delay: 1.5, duration: 0.8, ease: 'back' })
}
//========City Auto Complete=======

attachAutoComplete('place1', 'item1');
attachAutoComplete('place2', 'item2');

//=================================
let dateInput = document.getElementById('dat')
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today)

//=================================
document.querySelector('.cd3Img').addEventListener('click', function (e) {
    const payment = e.target.closest('i')
    if (!payment)
        return

    document.getElementById('pay-method').innerText = payment.id
})






document.getElementById('final').addEventListener('submit', function () {


    let params = {
        to_name: cd1Name.value,
        to_email: document.getElementById('cusEmail').innerText,
        cusName: cd1Name.value,
        Dd: document.getElementById('dat').value,
        Df: document.getElementById('dF').innerText,
        Dt: document.getElementById('to').innerText,
        Tt: document.getElementById('totTicket').innerText,
        Ap: document.getElementById('discount').innerText
    };

    const serviceID = "service_zhht0fp";
    const templateID = "template_progpc9";

    emailjs.send(serviceID, templateID, params)
        .then(res => {
            console.log(res);
            alert("Ticket has been booking...Check your Email!!")

        })
        .catch(err => console.log(err));



})





let allinput = document.querySelectorAll('input')
allinput.forEach(input => input.setAttribute('required', ''))


