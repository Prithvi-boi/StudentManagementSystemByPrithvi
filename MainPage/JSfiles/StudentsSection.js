let searchstudent = document.getElementById("searchstudent")
let radiobtn = document.getElementsByClassName("radiobtn")
let studentslist = document.getElementById("studentslist")
let addStudentblock = document.getElementById("addStudentblock")

addStudentblock.style.display = "none"

let totalstudents = document.getElementById("totalstudent")
let studentCount = 0
totalstudents.innerText = studentCount

function showAddStudentBlock(btnbg, btntext, setdisplay1, setdisplay2, flag) {
    addStudenttoggle.style.backgroundColor = btnbg
    addStudenttoggle.innerText = btntext
    studentslist.style.display = setdisplay1
    addStudentblock.style.display = setdisplay2
    addStudentflag = flag
}

// --------------------------------- add student section toggle
let addStudentflag = true
let addStudenttoggle = document.getElementById("addStudent")

addStudenttoggle.addEventListener("click", function () {
    if (addStudentflag) {
        showAddStudentBlock("rgb(206, 0, 0)", "cancel", "none", "grid", false)
        searchstudent.setAttribute("disabled", true)
        for (const r of radiobtn) {
            r.setAttribute("disabled", true)
        }
    }
    else {
        showAddStudentBlock("rgb(0, 140, 255)", "Add Student", "grid", "none", true)
        searchstudent.removeAttribute("disabled")
        for (const r of radiobtn) {
            r.removeAttribute("disabled")
        }
    }
}, false)

let courseSelection = document.getElementById("student_course_input")
for (let i = 0; i < courselist.children.length; i++) {
    let coursename = courselist.children.item(i).children.item(1).children.item(0).innerText
    courseSelection.innerHTML += `<option>${coursename}</option>`
}

// ------------------------------------------

function addStudent(name, course) {
    const studentslistdata = document.getElementById('studentslist');

    studentslistdata.innerHTML +=
        `
        <div class="listcard" style="width: 95%;">
            <span class="studentcardlogo">${name.charAt(0).toUpperCase()}</span>
                <div class="studentdetails">
                    <span class="studentname">${name}</span>
                    <span class="studentcourse">${course}</span>
                </div>
            <span class="studentstate">Active</span>
        </div>
    `;
};

// --------------------------------------------

document.getElementById("addStudentform").addEventListener("submit", function (e) {
    e.preventDefault()
    let student_name_input = document.getElementById("student_name_input").value
    let gender_input = document.getElementsByName('gender_input')
    let student_course_input = document.getElementById('student_course_input').value
    let selectedgender;


    for (let i = 0; i < gender_input.length; i++) {
        if (gender_input[i].checked) {
            selectedgender = gender_input[i].value;
            break;
        }
    }

    addStudent(student_name_input, student_course_input)

    showAddStudentBlock("rgb(0, 140, 255)", "Add Student", "grid", "none", true)
    searchstudent.removeAttribute("disabled")
    for (const r of radiobtn) {
        r.removeAttribute("disabled")
    }

    // -----------------save data
    const newStudent = {
        id: Date.now(),  // Unique ID
        name: student_name_input,
        course: student_course_input,
        gender: selectedgender,
        state: "active"
    };

    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(newStudent);

    localStorage.setItem('students', JSON.stringify(students));

    this.reset();
}, false)


//--------------------- load saved data

const students = JSON.parse(localStorage.getItem('students')) || [];
students.forEach(student => {
    addStudent(student.name, student.course)
});


// ---------------------- state changer

for (let i = 0; i < studentslist.children.length; i++) {
    const index = i;
    let studentstate = studentslist.children.item(i).children.item(2)

    const studentName = studentslist.children.item(index).children.item(1).children.item(0).innerText;
    const currentStudent = students.find(student => student.name == studentName);

    console.log(`Student: ${studentName}, State: ${currentStudent?.state}`); // Check each student

    if (currentStudent && currentStudent.state == "inactive") {
        studentstate.color = "red"
        studentstate.innerText = "Inactive"
        studentstate.style.backgroundColor = "rgb(255, 81, 0)"
    } else {
        studentstate.innerText = "Active"
        studentstate.color = "green"
        studentstate.style.backgroundColor = "rgb(0, 232, 0)"
    }

    studentstate.addEventListener("click", function () {
        let students = JSON.parse(localStorage.getItem('students')) || [];

        const studentName = studentslist.children.item(index).children.item(1).children.item(0).innerText;
        const currentStudent = students.find(student => student.name == studentName);

        if (currentStudent.state == "active") {
            this.color = "red"
            this.innerText = "Inactive"
            this.style.backgroundColor = "rgb(255, 81, 0)"
            currentStudent.state = "inactive"
        } else {
            this.innerText = "Active"
            this.color = "green"
            this.style.backgroundColor = "rgb(0, 232, 0)"
            currentStudent.state = "active"
        }

        localStorage.setItem('students', JSON.stringify(students));
    })
}



const activeFilter = document.querySelector('#active');
const inactiveFilter = document.querySelector('#inactive');

function filterStudents() {
    for (let i = 0; i < studentslist.children.length; i++) {
        const studentName = studentslist.children.item(i).querySelector('.studentname').innerText;
        const currentStudent = students.find(student => student.name == studentName);

        if (activeFilter.checked) {
            if (currentStudent && currentStudent.state == "active") {
                studentslist.children.item(i).style.display = "grid";
            } else {
                studentslist.children.item(i).style.display = "none";
            }
        } else if (inactiveFilter.checked) {
            if (currentStudent && currentStudent.state == "inactive") {
                studentslist.children.item(i).style.display = "grid";
            } else {
                studentslist.children.item(i).style.display = "none";
            }
        }
    }
}

activeFilter.addEventListener('change', filterStudents);
inactiveFilter.addEventListener('change', filterStudents);

filterStudents();


// -------------------- search box filter

function searchStudentFilter(elmnt) {
    const activeFilter = document.querySelector('#active');
    const inactiveFilter = document.querySelector('#inactive');

    for (let i = 0; i < studentslist.children.length; i++) {
        let listcard = studentslist.children.item(i)
        let studentname = studentslist.children.item(i).querySelector('.studentname').innerText
        let students = JSON.parse(localStorage.getItem('students')) || [];
        let currentStudent = students.find(student => student.name == studentname);

        let matchesSearch = false;
        let matchesFilter = false;

        // Check search match
        if (elmnt == '' || studentname.toLowerCase().includes(elmnt.toLowerCase())) {
            matchesSearch = true;
        }

        // Check active/inactive filter match
        if (activeFilter.checked && currentStudent && currentStudent.state == "active") {
            matchesFilter = true;
        } else if (inactiveFilter.checked && currentStudent && currentStudent.state == "inactive") {
            matchesFilter = true;
        }

        // Show only if both conditions match
        if (matchesSearch && matchesFilter) {
            listcard.style.display = "grid";
        } else {
            listcard.style.display = "none";
        }
    }
}

searchstudent.addEventListener("input", function () {
    searchStudentFilter(this.value)
})

// Also call search filter when radio buttons change
activeFilter.addEventListener('change', function () {
    searchStudentFilter(searchstudent.value)
});

inactiveFilter.addEventListener('change', function () {
    searchStudentFilter(searchstudent.value)
});

// ----

students.forEach(student => {
    document.getElementById("recentStudent").innerHTML +=
        `<div class="listcard">
                <span class="studentcardlogo">${student.name.charAt(0).toUpperCase()}</span>
                <div class="studentdetails">
                    <span class="studentname">${student.name}</span>
                    <span class="studentcourse">${student.course}</span>
                </div>
        </div>`
    studentCount += 1
    totalstudents.innerText = studentCount
});

courses.forEach(course => {
    document.getElementById("recentCourse").innerHTML +=
        `<div class="listcard">
            <span class="studentcardlogo" style="background-color: rgb(255, 162, 0);">${course.name.charAt(0).toUpperCase()}</span>
            <div class="studentdetails">
                <span class="studentname">${course.name}</span>
                <span class="studentcourse">${course.stream} | ${course.duration} years</span>
            </div>
        </div>`
    
    courseCount += 1
    totalcourses.innerText = courseCount
});


