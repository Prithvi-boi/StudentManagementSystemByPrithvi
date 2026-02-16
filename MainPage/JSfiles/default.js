// Sample courses data
const defaultCourses = [
    {
        "id": 1771260582205,
        "name": "Bachelor of Computer Application (BCA)",
        "duration": "3",
        "stream": "commerce"
    },
    {
        "id": 1771260587541,
        "name": "Bachelor of Commerce (B.Com)",
        "duration": "3",
        "stream": "commerce"
    },
    {
        "id": 1771260590123,
        "name": "Bachelor of Science (B.Sc) - Physics",
        "duration": "3",
        "stream": "science"
    },
    {
        "id": 1771260592456,
        "name": "Bachelor of Technology (B.Tech) - Computer Science",
        "duration": "4",
        "stream": "science"
    },
    {
        "id": 1771260594789,
        "name": "Bachelor of Arts (B.A) - English",
        "duration": "3",
        "stream": "arts"
    },
    {
        "id": 1771260597012,
        "name": "Master of Business Administration (MBA)",
        "duration": "2",
        "stream": "commerce"
    },
    {
        "id": 1771260599345,
        "name": "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
        "duration": "5",
        "stream": "science"
    }
];

// Sample students data
const defaultStudents = [
    {
        "id": 1771267159711,
        "name": "Prithvi Beldar",
        "course": "Bachelor of Computer Application (BCA)",
        "gender": "male",
        "state": "active"
    },
    {
        "id": 1771267164862,
        "name": "Aarav Sharma",
        "course": "Bachelor of Technology (B.Tech) - Computer Science",
        "gender": "male",
        "state": "active"
    },
    {
        "id": 1771268310080,
        "name": "Priya Patel",
        "course": "Bachelor of Commerce (B.Com)",
        "gender": "female",
        "state": "active"
    },
    {
        "id": 1771268323215,
        "name": "Arjun Reddy",
        "course": "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
        "gender": "male",
        "state": "inactive"
    },
    {
        "id": 1771268330456,
        "name": "Ananya Iyer",
        "course": "Bachelor of Arts (B.A) - English",
        "gender": "female",
        "state": "active"
    },
    {
        "id": 1771268335678,
        "name": "Rohan Deshmukh",
        "course": "Master of Business Administration (MBA)",
        "gender": "male",
        "state": "active"
    },
    {
        "id": 1771268340890,
        "name": "Ishita Kulkarni",
        "course": "Bachelor of Science (B.Sc) - Physics",
        "gender": "female",
        "state": "active"
    },
    {
        "id": 1771268346012,
        "name": "Kabir Singh",
        "course": "Bachelor of Technology (B.Tech) - Computer Science",
        "gender": "male",
        "state": "inactive"
    },
    {
        "id": 1771268351234,
        "name": "Diya Nair",
        "course": "Bachelor of Commerce (B.Com)",
        "gender": "female",
        "state": "active"
    },
    {
        "id": 1771268356456,
        "name": "Aditya Joshi",
        "course": "Bachelor of Computer Application (BCA)",
        "gender": "male",
        "state": "active"
    }
];

// Initialize localStorage with default data if empty
if (!localStorage.getItem('courses')) {
    localStorage.setItem('courses', JSON.stringify(defaultCourses));
}

if (!localStorage.getItem('students')) {
    localStorage.setItem('students', JSON.stringify(defaultStudents));
}

// Load data from localStorage
let defaultcoursesdata = JSON.parse(localStorage.getItem('courses'));
let defaultstudentsdata = JSON.parse(localStorage.getItem('students'));

