
let searchcourse = document.getElementById("searchcourse")
let courseStream = document.getElementById("courseStream")
let courselist = document.getElementById("courselist")
let addCourseblock = document.getElementById("addCourseblock")
addCourseblock.style.display = "none"

let totalcourses = document.getElementById("totalcourses")
let courseCount = 0
totalcourses.innerText = courseCount


function showAddCourseBlock(btnbg, btntext, setdisplay1, setdisplay2, flag) {
    addCoursetoggle.style.backgroundColor = btnbg
    addCoursetoggle.innerText = btntext
    courselist.style.display = setdisplay1
    addCourseblock.style.display = setdisplay2
    addCourseflag = flag
}

// --------------------------------- add course section toggle
let addCourseflag = true
let addCoursetoggle = document.getElementById("addCourse")
addCoursetoggle.addEventListener("click", function () {
    if (addCourseflag) {
        showAddCourseBlock("rgb(206, 0, 0)", "cancel", "none", "grid", false)
        searchcourse.setAttribute("disabled", true)
        courseStream.setAttribute("disabled", true)
    } else {
        showAddCourseBlock("rgb(0, 140, 255)", "Add Course", "grid", "none", true)
        searchcourse.removeAttribute("disabled")
        courseStream.removeAttribute("disabled")
    }
}, false)

// --------------------------------- add course btn

function addCourse(name, stream, duration) {
    const courselistdata = document.getElementById('courselist');

    courselistdata.innerHTML += `
        <div class="listcard" style="width: 95%;grid-template-columns: 20% 100%;">
            <span class="coursecardlogo">${name.charAt(0).toUpperCase()}</span>
            <div class="coursedetails">
                <span class="coursename">${name}</span>
                <div>
                    <span class="coursestream">${stream}</span>
                    <span class="coursestream"> | ${duration} years</span>
                </div>
            </div>
        </div>
    `;
};


document.getElementById("addCourseform").addEventListener("submit", function (e) {
    e.preventDefault()
    let course_name_input = document.getElementById("course_name_input").value
    let course_duration_input = document.getElementById("course_duration_input").value
    let course_stream_input = document.getElementsByName('course_stream_input')
    let selectedstream;

    for (let i = 0; i < course_stream_input.length; i++) {
        if (course_stream_input[i].checked) {
            selectedstream = course_stream_input[i].value;
            break;
        }
    }

    addCourse(course_name_input, selectedstream, course_duration_input)

    showAddCourseBlock("rgb(0, 140, 255)", "Add Course", "grid", "none", true)
    searchcourse.removeAttribute("disabled")
    courseStream.removeAttribute("disabled")

    // -----------------save data
    const newCourse = {
        id: Date.now(),  // Unique ID
        name: course_name_input,
        duration: course_duration_input,
        stream: selectedstream
    };

    let courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses.push(newCourse);

    localStorage.setItem('courses', JSON.stringify(courses));

    this.reset();
}, false)

//--------------------- load saved data

const courses = JSON.parse(localStorage.getItem('courses')) || [];
courses.forEach(course => {
    addCourse(course.name, course.stream, course.duration)
});


// -------------------- select box filter

function courseFilter(elmnt) {
    for (let i = 0; i < courselist.children.length; i++) {
        let listcard = courselist.children.item(i)
        let streamname = courselist.children.item(i).children.item(1).children.item(1).children.item(0).innerText

        if (elmnt == 'Allcourses') {
            for (let j = 0; j < courselist.children.length; j++) {
                listcard.style.display = "grid"
            }
        }
        else {
            for (let j = 0; j < courselist.children.length; j++) {
                listcard.style.display = "none"
            }

            if (elmnt == streamname) {
                listcard.style.display = "grid"
            }
            else if (elmnt == streamname) {
                listcard.style.display = "grid"
            }
            else if (elmnt == streamname) {
                listcard.style.display = "grid"
            }
        }
    }
}

let select = document.getElementById('courseStream')
select.addEventListener("change", function () {
    let i = select.selectedIndex
    courseFilter(select[i].value)
})


// -------------------- search box filter

function searchFilter(elmnt) {
    for (let i = 0; i < courselist.children.length; i++) {
        let listcard = courselist.children.item(i)
        let coursename = courselist.children.item(i).children.item(1).children.item(0).innerText

        if (elmnt == '') {
            for (let j = 0; j < courselist.children.length; j++) {
                listcard.style.display = "grid"
            }
        }
        else {
            for (let j = 0; j < courselist.children.length; j++) {
                listcard.style.display = "none"
            }

            if (elmnt == coursename) {
                listcard.style.display = "grid"
            }
            else if (elmnt == coursename) {
                listcard.style.display = "grid"
            }
            else if (elmnt == coursename) {
                listcard.style.display = "grid"
            }
        }
    }
}


searchcourse.addEventListener("change", function () {
    searchFilter(this.value)
})

