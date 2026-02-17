// let emergencyRecords = [];
let emergencyRecords = localStorage["emergencyRecords"]
    ? JSON.parse(localStorage.getItem("emergencyRecords"))
    : [];

const ringTone = new Audio("music/ringtone.mp3");
function requestEmergency() {
    ringTone.play();
    document.getElementById("mainContent").style.display = "none";
    document.getElementById("emergencyAlert").style.display = "block";
    document.getElementById("displayCallerDetails").style.display = "none";
    document.getElementById("firstEmergencyDisplay").style.display = "block";
    document.getElementById("initialControlRoom").style.display = "none";
    document.getElementById("formStatus").innerHTML = "";

    document.getElementById("userWaitingForResponse").innerHTML = `
        <h3 class="mt-5 pt-5">Phone Ringing...</h3>
        <p class="mx-4 my-4">Waiting for response from the emergency center</p>
        <p class="alert alert-success mx-4">You would receive a form if the emergency center accept your call</p>
        <button onclick="cancelEmergencyRequest()" class="w-75 my-4 mx-4 btn btn-secondary">Cancel Request</button>
    `;
}

function cancelEmergencyRequest() {
    ringTone.pause();
    ringTone.currentTime = 0;
    document.getElementById("mainContent").style.display = "block";
    document.getElementById("emergencyAlert").style.display = "none";
    document.getElementById("initialControlRoom").style.display = "block";
    document.getElementById("afterFormSubmission").style.display = "none";
    document.getElementById("submissionResponse").innerHTML = "";
    window.location.reload()
}

function sendForm() {
    ringTone.pause();
    ringTone.currentTime = 0;
    document.getElementById("mainContent").style.display = "none";
    document.getElementById("emergencyForm").style.display = "block";
    document.getElementById("waitForUser").style.display = "block";
    document.getElementById("firstEmergencyDisplay").style.display = "none";
    document.getElementById("userWaitingForResponse").innerHTML = "";
}

function rejectEmergency() {
    ringTone.pause();
    ringTone.currentTime = 0;
    document.getElementById("initialControlRoom").style.display = "block";
    document.getElementById("emergencyAlert").style.display = "none";
    // alert('You rejected the call')

    document.getElementById("userWaitingForResponse").innerHTML = `
        <h3 style='margin-top:100px;'>Call Ended</h3>
        <p class='alert alert-primary mx-5 my-4'>It seems there's issue with the network</p>
        <p>Would you like to try again?</p>
        <div class='d-flex mt-4 align-items-center flex-column gap-3'>
            <button onclick='requestEmergency()' class='btn btn-primary w-75 py-2'>Yes</button>
            <button onclick='cancelEmergencyRequest()' class='btn btn-secondary w-75 py-2'>No</button>
        </div>
    `;
}

let emergStatus = "";
function check(val) {
    if (val === 1) {
        emergStatus = `<p class=' m-0 alert alert-success rounded-4 px-2 py-1'>Approved</p>`;
        document.getElementById("submissionResponse").innerHTML = `
        <h5 class="pt-5 mx-3">Your Emergency Request Approved ✅</h5>
                    <p class="alert alert-primary mx-4 my-5">Rescue team are on the way</p>
                    <p class="mx-4 my-5">We'll get to your location in the next 20mins</p>
                    <button onclick="cancelEmergencyRequest()" class="btn btn-dark py-2 w-75">Reset</button>
    `;

        document.getElementById("formStatus").innerHTML = `
            <div class='alert alert-success m-5 mx-auto px-3 py-2'>Emergency Request Approved</div>
        `;
        // window.location.reload()
    } else if (val === 2) {
        emergStatus = `<p class=' m-0 alert alert-secondary rounded-4 px-2 py-1'>Pending</p>`;
        document.getElementById("submissionResponse").innerHTML = `
        <h5 class="pt-5 mx-3">Your Emergency Request Is Pending</h5>
                    <p class="alert alert-primary mx-4 my-5">We'll review it and get back to you</p>
                    <p class="mx-4 my-5">In the mean while, stay safe while we review your request</p>
                    <button onclick="cancelEmergencyRequest()" class="btn btn-dark py-2 w-75">Reset</button>
    `;

        document.getElementById("formStatus").innerHTML = `
            <div class='alert alert-warning m-5 mx-auto px-3 py-2'>Emergency Request Pending</div>
        `;
        // window.location.reload()
    } else {
        emergStatus = `<p class=' m-0 alert alert-danger rounded-4 px-2 py-1'>Rejected</p>`;
        document.getElementById("submissionResponse").innerHTML = `
        <h5 class="pt-5 mx-3">Your Emergency Request Was Rejected</h5>
                    <p class="alert alert-primary mx-4 my-5">If you're not satisfied, kindly restart the emergency request process</p>
                    // <p class="mx-4 my-5">In the mean while, stay safe while we review your request</p>
                    <button onclick="cancelEmergencyRequest()" class="btn btn-dark py-2 w-75">Reset</button>
    `;

        document.getElementById("formStatus").innerHTML = `
            <div class='alert alert-danger m-5 mx-auto px-3 py-2'>Emergency Request Rejected</div>
        `;
        // window.location.reload()
    }

    document.getElementById("afterFormSubmission").style.display = "none";
    document.getElementById("displayCallerDetails").style.display = "none";
    // document.getElementById("userWaitingForResponse").innerHTML = "";
    callersDetails.status = emergStatus;

    localStorage.setItem("emergencyRecords", JSON.stringify(emergencyRecords));
    displayRecord();
}

const id =
    emergencyRecords.length > 0
        ? emergencyRecords[emergencyRecords.length - 1].id
        : 0;
function submitForm() {
    // const id = 0;
    const fullname = document.getElementById("fullname").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const emergencyType = document.getElementById("emergencyType").value;
    const description = document.getElementById("description").value;
    const numOfVictims = document.getElementById("numOfVictims").value;
    const location = document.getElementById("location").value;

    if (
        fullname != "" ||
        phoneNumber != "" ||
        emergencyType != "0" ||
        description != "" ||
        location != ""
    ) {
        document.getElementById("errorMsg").style.display = "none";

        document.getElementById("waitForUser").style.display = "none";
        document.getElementById("displayCallerDetails").style.display = "flex";
        document.getElementById("name").innerHTML = fullname;
        document.getElementById("number").innerHTML = phoneNumber;
        document.getElementById("emerType").innerHTML = emergencyType;
        document.getElementById("descript").innerHTML = description;
        document.getElementById("victNum").innerHTML = numOfVictims;
        document.getElementById("loct").innerHTML = location;

        document.getElementById("afterFormSubmission").style.display = "block";
        document.getElementById("mainContent").style.display = "none";
        document.getElementById("emergencyForm").style.display = "none";

        callersDetails = {
            id: id + 1,
            fullname,
            phoneNumber,
            emergencyType,
            description,
            numOfVictims,
            location,
            status: emergStatus,
            emergDate,
            emergTime
        };

        emergencyRecords.push(callersDetails);
        console.log(emergencyRecords);
        displayRecord();
    } else {
        document.getElementById("errorMsg").style.display = "block";
    }
}

const now = new Date();
const hours = now.getHours().toString().padStart(2, '0');
const mins = now.getMinutes().toString().padStart(2, '0');
const emergTime = `${hours}:${mins}`; 

const dd = now.getDate().toString().padStart(2, '0');
const mm = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
const yyyy = now.getFullYear();

const emergDate = `${dd}-${mm}-${yyyy}`;

function displayRecord() {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    for (let i = 0; i < emergencyRecords.length; i++) {
        tbody.innerHTML += `<tr class='py-5'>
            <td>${emergencyRecords[i].id}</td>
            <td>${emergencyRecords[i].fullname}</td>
            <td>${emergencyRecords[i].phoneNumber}</td>
            <td>${emergencyRecords[i].emergencyType}</td>
            <td>${emergencyRecords[i].description}</td>
            <td>${emergencyRecords[i].numOfVictims}</td>
            <td>${emergencyRecords[i].location}</td>
            <td>${emergDate}</td>
            <td>${emergTime}</td>
            <td>${emergencyRecords[i].status}</td>
            <td><i style='cursor:pointer;' onclick='deleteRecord(${i})' class="text-danger fs-5 bi bi-trash"></i></td>
    </tr>`;
    }
}
displayRecord()

function showTable() {
    // document.getElementById('table').style.display = 'flex'
}

function deleteRecord(del) {
    emergencyRecords.splice(del, 1)
    document.getElementById("tbody").innerHTML = ''
    localStorage.setItem('emergencyRecords', JSON.stringify(emergencyRecords))
    displayRecord()
}