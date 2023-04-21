let po = []
let key = '2ya2HNTK0KE0TBawbsbGYqRRrAzQl6du'

let distance = document.getElementById('Dist')
let travelTime = document.getElementById('tD')

function loading(display) {
    let load = document.getElementById('load')
    load.style.display = `${display}`
    setTimeout(() => load.style.display = 'none', 1400)
}
document.getElementById('cd1Name').addEventListener('focusout', function (e) {
    let Name = e.target.value;
    let regex = /^[a-zA-Z]+$/;
    console.log(regex.test(Name))
    if (Name.length > 3 && regex.test(Name))
        fetch(`https://api.parser.name/?api_key=8d4d0f39cd2027723a4eeb0ff3b3d0ce&endpoint=parse&name=${Name}`)
            .then(res => res.json())
            .then(dat =>
                document.getElementById('gender').value = dat.data[0].name.firstname.gender_formatted
            )
    else
        alert('Name is not Valid')
})

function getCityData() {
    distance.innerText = 'NONE'
    travelTime.innerText = 'NONE'
    let city1 = document.getElementById('place1').value;
    let city2 = document.getElementById('place2').value;
    cd3Email.value
    document.getElementById('cusDF').innerText = city1
    document.getElementById('cusDT').innerText = city2
    document.getElementById('dF').innerText = city1;
    document.getElementById('to').innerText = city2;
    Promise.all([
        fetch(`https://api.tomtom.com/search/2/geocode/${city1}.json?key=${key}`),
        fetch(`https://api.tomtom.com/search/2/geocode/${city2}.json?key=${key}`)
    ])
        .then(Response => Promise.all(Response.map(rsp => rsp.json())))
        .then(dat => {
            if (dat[0].results[0].address.countryCode == 'IN' && dat[1].results[1].address.countryCode == 'IN') {
                var { lat, lon } = dat[0].results[0].position
                po.push(lat, lon)
                var { lat, lon } = dat[1].results[1].position
                po.push(lat, lon)
                myFun()
            }
        }
        ).catch(er => alert(er))
}

let traveldist;

function myFun() {
    fetch(`https://api.tomtom.com/routing/matrix/2?key=${key}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify
            ({
                "origins": [{ "point": { "latitude": po[0], "longitude": po[1] } }],
                "destinations": [{ "point": { "latitude": po[2], "longitude": po[3] } }]
            })
    })
        .then(res => res.json())
        .then(dat => {
            let travelhr = (dat.data[0].routeSummary.travelTimeInSeconds / 3600).toFixed(2)
            traveldist = Math.floor(dat.data[0].routeSummary.lengthInMeters / 1000)
            console.log(traveldist)
            travelTime.innerText = travelhr + " Hour";
            distance.innerText = traveldist + " Km"
            loading('none')
        }
        )
    po = []  //to emp ty the po array
}

const apiKey = '68db8c3d4dfd41c081db37d6da7e031e';

function attachAutoComplete(id1, id2) {
    let itemElement = document.getElementById(id2);
    let input = document.getElementById(id1);

    input.addEventListener('keydown', function () {
        const inputText = `${input.value}`
        fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${inputText}&type=city&apiKey=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                itemElement.innerHTML = ''
                itemElement.style.display = "block"
                data.features.forEach(feat => {
                    itemElement.innerHTML += `<p>${feat.properties.formatted}</p>`;
                })
            })
    })

    itemElement.addEventListener('click', function (e) {
        input.value = e.target.innerHTML;
        itemElement.style.display = "none"
    })
}

export { getCityData, attachAutoComplete, traveldist, distance, loading }