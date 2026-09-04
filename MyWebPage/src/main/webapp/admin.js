// =================================
// E-LEARN - ADMIN DASHBOARD
// =================================


// =================================
// ADMIN DATA
// =================================

const adminData = {

    students: [

        {
            id: "STU001",
            name: "Rahul Das",
            batch: "Java Morning Batch",
            active: true
        },

        {
            id: "STU002",
            name: "Amit Roy",
            batch: "Java Morning Batch",
            active: true
        },

        {
            id: "STU003",
            name: "Sneha Paul",
            batch: "Java Morning Batch",
            active: false
        },

        {
            id: "STU004",
            name: "Riya Sen",
            batch: "Java Morning Batch",
            active: true
        },

        {
            id: "STU005",
            name: "Arjun Dutta",
            batch: "Java Morning Batch",
            active: true
        },

        {
            id: "STU006",
            name: "Ananya Roy",
            batch: "Java Evening Batch",
            active: true
        },

        {
            id: "STU007",
            name: "Sourav Das",
            batch: "Java Evening Batch",
            active: true
        },

        {
            id: "STU008",
            name: "Priya Ghosh",
            batch: "Java Evening Batch",
            active: false
        },

        {
            id: "STU009",
            name: "Kunal Sen",
            batch: "Java Evening Batch",
            active: true
        }

    ],

	faculty: [

	        {
	            id: "FAC001",
	            name: "Ankit Sharma",
	            subject: "Java",
	            active: true
	        },

	        {
	            id: "FAC002",
	            name: "Priya Sen",
	            subject: "Web Development",
	            active: true
	        },

	        {
	            id: "FAC003",
	            name: "Rahul Ghosh",
	            subject: "Database",
	            active: false
	        }

	    ],


		batches: [

		       {
		           id: 1,
		           name: "Java Morning Batch",
		           subject: "Java",
		           faculty: "Ankit Sharma",
		           monthlyFee: 1500,
		           active: true
		       },

		       {
		           id: 2,
		           name: "Java Evening Batch",
		           subject: "Java",
		           faculty: "Ankit Sharma",
		           monthlyFee: 1500,
		           active: true
		       }

		   ],

		   courses: [

		          {
		              id: "CRS001",
		              name: "Java Programming",
		              description:
		                  "Core Java and object-oriented programming",
		              active: true
		          },

		          {
		              id: "CRS002",
		              name: "Web Development",
		              description:
		                  "HTML, CSS, JavaScript and frontend development",
		              active: true
		          }

		      ]
			  
};

// =================================
// DISPLAY ADMIN OVERVIEW
// =================================

function displayAdminOverview() {

    const totalStudents =
        document.getElementById(
            "totalStudents"
        );

    const totalFaculty =
        document.getElementById(
            "totalFaculty"
        );

    const activeBatches =
        document.getElementById(
            "activeBatches"
        );

    const totalCourses =
        document.getElementById(
            "totalCourses"
        );


		// Students

		if (totalStudents) {

		    fetch("students")

		        .then(function (response) {

		            if (!response.ok) {

		                throw new Error(
		                    "Failed to load students"
		                );

		            }

		            return response.json();

		        })

		        .then(function (students) {

		            totalStudents.textContent =
		                students.length;

		        })

		        .catch(function (error) {

		            console.error(
		                "Error loading student count:",
		                error
		            );

		            totalStudents.textContent =
		                "0";

		        });

		}


		// Faculty

		if (totalFaculty) {

		    fetch("admin-faculty")

		        .then(function (response) {

		            if (!response.ok) {

		                throw new Error(
		                    "Failed to load faculty"
		                );

		            }

		            return response.json();

		        })

		        .then(function (facultyList) {

		            totalFaculty.textContent =
		                facultyList.length;

		        })

		        .catch(function (error) {

		            console.error(
		                "Error loading faculty count:",
		                error
		            );

		            totalFaculty.textContent =
		                "0";

		        });

		}


    // Courses

	if (totalCourses) {

	    fetch("admin-courses")
	        .then(function (response) {

	            return response.json();

	        })
	        .then(function (courses) {

	            totalCourses.textContent =
	                courses.length;

	        })
	        .catch(function (error) {

	            console.error(
	                "Error loading course count:",
	                error
	            );

	        });

	}


    // Batches come from database

    if (activeBatches) {

        fetch("admin-batches")

            .then(function (response) {

                if (!response.ok) {

                    throw new Error(
                        "Failed to load batches"
                    );

                }

                return response.json();

            })

            .then(function (batches) {

                adminData.batches =
                    batches.map(
                        function (batch) {

                            return {

                                id: batch.id,

                                name: batch.name,

                                subject: batch.subject,

                                faculty:
                                    batch.teacher,

                                schedule:
                                    batch.schedule,

                                startDate:
                                    batch.startDate,

                                endDate:
                                    batch.endDate,

                                monthlyFee:
                                    batch.monthlyFee,

                                active:
                                    batch.active

                            };

                        }
                    );


                const activeCount =
                    adminData.batches.filter(
                        function (batch) {

                            return batch.active;

                        }
                    ).length;


                activeBatches.textContent =
                    activeCount;

            })

            .catch(function (error) {

                console.error(
                    "Error loading batch count:",
                    error
                );

                activeBatches.textContent =
                    "0";

            });

    }

}
// =================================
// DISPLAY STUDENTS
// =================================

function displayAdminStudents(searchTerm = "") {

    const studentsList =
        document.getElementById("adminStudentsList");

    const countElement =
        document.getElementById("studentListCount");

    const summaryElement =
        document.getElementById("studentListSummary");


    if (!studentsList) {
        return;
    }


    const xhr =
        new XMLHttpRequest();

    xhr.open(
        "GET",
        "students",
        true
    );


    xhr.onreadystatechange =
        function () {

            if (xhr.readyState !== 4) {
                return;
            }


            if (xhr.status !== 200) {

                alert(
                    "Could not load students."
                );

                return;
            }


            const students =
                JSON.parse(xhr.responseText);


            adminData.students =
                students.map(
                    function (student) {

                        return {
                            id: student.id,
                            name: student.name,
                            batch: student.batch,
                            active: true
                        };

                    }
                );


            const term =
                searchTerm.trim().toLowerCase();


            const filteredStudents =
                adminData.students.filter(
                    function (student) {

                        return (
                            student.id
                                .toLowerCase()
                                .includes(term)

                            ||

                            student.name
                                .toLowerCase()
                                .includes(term)

                            ||

                            student.batch
                                .toLowerCase()
                                .includes(term)
                        );

                    }
                );


            studentsList.innerHTML = "";


            filteredStudents.forEach(
                function (student) {

                    const index =
                        adminData.students.indexOf(
                            student
                        );


                    const row =
                        document.createElement("div");


                    row.className =
                        "admin-student-row";


                    row.innerHTML = `

                        <span>
                            ${student.id}
                        </span>

                        <span>
                            ${student.name}
                        </span>

                        <span>
                            ${student.batch}
                        </span>

                        <span>

                            <span
                                class="admin-student-status active">

                                Active

                            </span>

                        </span>

                        <span
                            class="admin-student-actions">

                            <button
                                type="button"
                                class="admin-status-btn deactivate"
                                onclick="toggleStudentStatus(${index})">

                                Deactivate

                            </button>

                            <button
                                type="button"
                                class="admin-remove-btn"
                                onclick="removeStudent(${index})">

                                Remove

                            </button>

                        </span>

                    `;


                    studentsList.appendChild(row);

                }
            );


            if (countElement) {

                countElement.textContent =
                    filteredStudents.length;

            }


            if (summaryElement) {

                if (filteredStudents.length === 0) {

                    summaryElement.textContent =
                        "No students found";

                } else {

                    summaryElement.textContent =
                        `Showing ${filteredStudents.length} of ${adminData.students.length} students`;

                }

            }

        };


    xhr.send();

}

// =================================
// OPEN STUDENTS
// =================================

function openStudents() {

    const overview =
        document.getElementById("adminOverviewSection");

    const students =
        document.getElementById("adminStudentsSection");

    const faculty =
        document.getElementById("adminFacultySection");

    const batches =
        document.getElementById("adminBatchesSection");

    const courses =
        document.getElementById("adminCoursesSection");

    const pageTitle =
        document.getElementById("adminPageTitle");
		
		const payments =
		    document.getElementById(
		        "adminPaymentsSection"
		    );


    // Hide everything else

    if (overview) {
        overview.style.display = "none";
    }

    if (faculty) {
        faculty.style.display = "none";
    }

    if (batches) {
        batches.style.display = "none";
    }

    if (courses) {
        courses.style.display = "none";
    }
	
	if (payments) {
	    payments.style.display = "none";
	}


    // Show Students

    if (students) {
        students.style.display = "block";
    }


    if (pageTitle) {
        pageTitle.textContent = "Students";
    }


    setActiveNav("studentsNav");

    displayAdminStudents();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// =================================
// OPEN FACULTY
// =================================

function openFaculty() {

    const overview =
        document.getElementById("adminOverviewSection");

    const students =
        document.getElementById("adminStudentsSection");

    const faculty =
        document.getElementById("adminFacultySection");

    const batches =
        document.getElementById("adminBatchesSection");

    const courses =
        document.getElementById("adminCoursesSection");

    const pageTitle =
        document.getElementById("adminPageTitle");
		
		const payments =
		    document.getElementById(
		        "adminPaymentsSection"
		    );


    // Hide everything else

    if (overview) {
        overview.style.display = "none";
    }

    if (students) {
        students.style.display = "none";
    }

    if (batches) {
        batches.style.display = "none";
    }

    if (courses) {
        courses.style.display = "none";
    }
	
	if (payments) {
	    payments.style.display = "none";
	}


    // Show Faculty

    if (faculty) {
        faculty.style.display = "block";
    }


    if (pageTitle) {
        pageTitle.textContent = "Faculty";
    }


    setActiveNav("facultyNav");

    displayAdminFaculty();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

// =================================
// SHOW OVERVIEW
// =================================

function showOverview() {

    const overview =
        document.getElementById("adminOverviewSection");

    const students =
        document.getElementById("adminStudentsSection");

    const faculty =
        document.getElementById("adminFacultySection");

    const batches =
        document.getElementById("adminBatchesSection");

    const courses =
        document.getElementById("adminCoursesSection");

    const pageTitle =
        document.getElementById("adminPageTitle");
		
		const payments =
		    document.getElementById(
		        "adminPaymentsSection"
		    );


    // Hide Students

    if (students) {
        students.style.display = "none";
    }


    // Hide Faculty

    if (faculty) {
        faculty.style.display = "none";
    }


    // Hide Batches

    if (batches) {
        batches.style.display = "none";
    }


    // Hide Courses

    if (courses) {
        courses.style.display = "none";
    }

	if (payments) {
	    payments.style.display = "none";
	}

    // Show Overview

    if (overview) {
        overview.style.display = "block";
    }


    if (pageTitle) {
        pageTitle.textContent =
            "E-Learn Overview";
    }


    setActiveNav(null);


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// =================================
// CLOSE STUDENTS
// =================================

function closeStudents() {

    showOverview();

}


// =================================
// CLOSE FACULTY
// =================================

function closeFaculty() {

    showOverview();

}


// =================================
// SIDEBAR ACTIVE STATE
// =================================

function setActiveNav(activeId) {

    const navItems =
        document.querySelectorAll(
            ".admin-nav-item"
        );


    navItems.forEach(
        function (item) {

            item.classList.remove(
                "active"
            );

        }
    );


    if (activeId) {

        const activeItem =
            document.getElementById(
                activeId
            );


        if (activeItem) {

            activeItem.classList.add(
                "active"
            );

        }

    } else {

        const overviewItem =
            document.querySelector(
                '.admin-nav-item[onclick*="showOverview"]'
            );


        if (overviewItem) {

            overviewItem.classList.add(
                "active"
            );

        }

    }

}


// =================================
// OPEN ADD STUDENT
// =================================

function openAddStudent() {

    const addStudentCard =
        document.getElementById(
            "adminAddStudentCard"
        );


    if (!addStudentCard) {

        return;

    }


    addStudentCard.style.display =
        "block";


    const idInput =
        document.getElementById(
            "adminNewStudentId"
        );


    if (idInput) {

        idInput.focus();

    }

}


// =================================
// CLOSE ADD STUDENT
// =================================

function closeAddStudent() {

    const addStudentCard =
        document.getElementById(
            "adminAddStudentCard"
        );


    if (!addStudentCard) {

        return;

    }


    addStudentCard.style.display =
        "none";


    document.getElementById(
        "adminNewStudentId"
    ).value = "";


    document.getElementById(
        "adminNewStudentName"
    ).value = "";


    document.getElementById(
        "adminNewStudentBatch"
    ).value = "";
	
	document.getElementById(
	    "studentPassword"
	).value = "";

}


// =================================
// ADD STUDENT
// =================================

function addStudent() {

    const id =
        document.getElementById(
            "adminNewStudentId"
        )
        .value
        .trim()
        .toUpperCase();


    const name =
        document.getElementById(
            "adminNewStudentName"
        )
        .value
        .trim();


    const batch =
        document.getElementById(
            "adminNewStudentBatch"
        )
        .value
        .trim();
		
		const password =
		    document.getElementById(
		        "studentPassword"
		    )
		    .value;


			if (!id || !name || !batch || !password) {
			    alert(
			        "Please enter Student ID, Student Name, Batch and Password."
			    );
			    return;
			}


    const alreadyExists =
        adminData.students.some(
            function (student) {

                return student.id === id;

            }
        );


    if (alreadyExists) {

        alert(
            "A student with this ID already exists."
        );

        return;

    }


	const xhr =
	    new XMLHttpRequest();

	xhr.open(
	    "POST",
	    "create-student",
	    true
	);

	xhr.setRequestHeader(
	    "Content-Type",
	    "application/x-www-form-urlencoded"
	);

	xhr.onreadystatechange =
	    function () {

	        if (xhr.readyState !== 4) {
	            return;
	        }

	        if (xhr.status === 200) {

	            displayAdminStudents();
	            displayAdminOverview();
	            closeAddStudent();

	            alert(
	                `${name} has been added successfully.`
	            );

	        } else {

	            alert(
	                xhr.responseText ||
	                "Could not create student."
	            );
	        }
	    };

	const data =
	    "userId=" +
	    encodeURIComponent(id) +
	    "&password=" +
	    encodeURIComponent(password) +
	    "&name=" +
	    encodeURIComponent(name) +
	    "&batch=" +
	    encodeURIComponent(batch);

	xhr.send(data);

}


// =================================
// TOGGLE STUDENT STATUS
// =================================

function toggleStudentStatus(index) {

    const student =
        adminData.students[index];


    if (!student) {

        return;

    }


    const action =
        student.active
            ? "deactivate"
            : "activate";


    const confirmed =
        confirm(
            `Are you sure you want to ${action} ${student.name}?`
        );


    if (!confirmed) {

        return;

    }


    student.active =
        !student.active;


    displayAdminStudents();


    alert(
        `${student.name} is now ${
            student.active
                ? "Active"
                : "Inactive"
        }.`
    );

}


// =================================
// REMOVE STUDENT
// =================================

function removeStudent(index) {

    const student =
        adminData.students[index];


    if (!student) {

        return;

    }


    const confirmed =
        confirm(
            `Remove ${student.name} (${student.id})?`
        );


    if (!confirmed) {

        return;

    }


    adminData.students.splice(
        index,
        1
    );


    displayAdminStudents();

    displayAdminOverview();


    alert(
        `${student.name} has been removed.`
    );

}


// =================================
// SEARCH STUDENTS
// =================================

const studentSearch =
    document.getElementById(
        "studentSearch"
    );


if (studentSearch) {

    studentSearch.addEventListener(
        "input",
        function () {

            displayAdminStudents(
                studentSearch.value
            );

        }
    );

}


// =================================
// LOGOUT
// =================================

const adminLogoutBtn =
    document.getElementById(
        "adminLogoutBtn"
    );


if (adminLogoutBtn) {

    adminLogoutBtn.addEventListener(
        "click",
        function () {

            window.location.href =
                "index.html";

        }
    );

}


// =================================
// INITIAL LOAD
// =================================

displayAdminOverview();

displayAdminStudents();



// =================================
// DISPLAY FACULTY
// =================================

function displayAdminFaculty(searchTerm = "") {

    const facultyList =
        document.getElementById(
            "adminFacultyList"
        );

    const countElement =
        document.getElementById(
            "facultyListCount"
        );

    const summaryElement =
        document.getElementById(
            "facultyListSummary"
        );


    if (!facultyList) {

        return;

    }


    fetch("admin-faculty")

        .then(function (response) {

            if (!response.ok) {

                throw new Error(
                    "Failed to load faculty"
                );

            }

            return response.json();

        })

        .then(function (facultyListData) {

            // Convert database data
            // to the format used by admin.js

            adminData.faculty =
                facultyListData.map(
                    function (faculty) {

                        return {

                            id: faculty.userId,

                            name: faculty.name,

                            subject: faculty.subject,

                            active: faculty.active

                        };

                    }
                );


            const term =
                searchTerm
                    .trim()
                    .toLowerCase();


            const filteredFaculty =
                adminData.faculty.filter(
                    function (faculty) {

                        return (

                            faculty.id
                                .toLowerCase()
                                .includes(term)

                            ||

                            faculty.name
                                .toLowerCase()
                                .includes(term)

                            ||

                            faculty.subject
                                .toLowerCase()
                                .includes(term)

                        );

                    }
                );


            facultyList.innerHTML = "";


            filteredFaculty.forEach(
                function (faculty) {

                    const index =
                        adminData.faculty
                            .indexOf(faculty);


                    const row =
                        document.createElement(
                            "div"
                        );


                    row.className =
                        "admin-faculty-row";


                    const status =
                        faculty.active
                            ? "Active"
                            : "Inactive";


                    const statusClass =
                        faculty.active
                            ? "active"
                            : "inactive";


                    const actionText =
                        faculty.active
                            ? "Deactivate"
                            : "Activate";


                    const actionClass =
                        faculty.active
                            ? "deactivate"
                            : "activate";


                    row.innerHTML = `

                        <span>
                            ${faculty.id}
                        </span>

                        <span>
                            ${faculty.name}
                        </span>

                        <span>
                            ${faculty.subject}
                        </span>

                        <span>

                            <span
                                class="admin-faculty-status ${statusClass}">

                                ${status}

                            </span>

                        </span>

                        <span
                            class="admin-faculty-actions">

                            <button
                                type="button"
                                class="admin-faculty-status-btn ${actionClass}"
                                onclick="toggleFacultyStatus(${index})">

                                ${actionText}

                            </button>

                            <button
                                type="button"
                                class="admin-faculty-remove-btn"
                                onclick="removeFaculty(${index})">

                                Remove

                            </button>

                        </span>

                    `;


                    facultyList.appendChild(row);

                }
            );


            if (countElement) {

                countElement.textContent =
                    filteredFaculty.length;

            }


            if (summaryElement) {

                if (filteredFaculty.length === 0) {

                    summaryElement.textContent =
                        "No faculty found";

                } else {

                    summaryElement.textContent =
                        `Showing ${filteredFaculty.length} of ${adminData.faculty.length} faculty`;

                }

            }

        })

        .catch(function (error) {

            console.error(
                "Error loading faculty:",
                error
            );

            facultyList.innerHTML = "";

            if (countElement) {

                countElement.textContent =
                    "0";

            }

            if (summaryElement) {

                summaryElement.textContent =
                    "Unable to load faculty";

            }

        });

}

// =================================
// OPEN ADD FACULTY
// =================================

function openAddFaculty() {

    const card =
        document.getElementById(
            "adminAddFacultyCard"
        );


    if (!card) {

        return;

    }


    card.style.display =
        "block";


    const idInput =
        document.getElementById(
            "adminNewFacultyId"
        );


    if (idInput) {

        idInput.focus();

    }

}


// =================================
// CLOSE ADD FACULTY
// =================================

function closeAddFaculty() {

    const card =
        document.getElementById(
            "adminAddFacultyCard"
        );


    if (!card) {

        return;

    }


    card.style.display =
        "none";


    document.getElementById(
        "adminNewFacultyId"
    ).value = "";


    document.getElementById(
        "adminNewFacultyName"
    ).value = "";


    document.getElementById(
        "adminNewFacultySubject"
    ).value = "";

}


// =================================
// ADD FACULTY
// =================================

function addFaculty() {

    const userId =
        document.getElementById(
            "adminNewFacultyId"
        ).value.trim();

    const name =
        document.getElementById(
            "adminNewFacultyName"
        ).value.trim();

    const subject =
        document.getElementById(
            "adminNewFacultySubject"
        ).value.trim();

    const password =
        document.getElementById(
            "adminNewFacultyPassword"
        ).value.trim();


    if (!userId ||
        !name ||
        !subject ||
        !password) {

        alert(
            "Please fill in all fields."
        );

        return;
    }


    const xhr =
        new XMLHttpRequest();


    xhr.open(
        "POST",
        "admin-add-faculty",
        true
    );


    xhr.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
    );


    xhr.onreadystatechange =
        function () {

            if (xhr.readyState !== 4) {

                return;

            }


            if (xhr.status === 200) {

                alert(
                    "Faculty added successfully."
                );


                closeAddFaculty();


                displayAdminFaculty();


                displayAdminOverview();


            } else {

                console.error(
                    "Add faculty error:",
                    xhr.responseText
                );


                alert(
                    "Unable to add faculty."
                );

            }

        };


    const data =
        "userId=" +
        encodeURIComponent(userId) +

        "&password=" +
        encodeURIComponent(password) +

        "&name=" +
        encodeURIComponent(name) +

        "&subject=" +
        encodeURIComponent(subject);


    xhr.send(data);
}

// =================================
// TOGGLE FACULTY STATUS
// =================================

function toggleFacultyStatus(index) {

    const faculty =
        adminData.faculty[index];


    if (!faculty) {

        return;

    }


    const newStatus =
        !faculty.active;


    const xhr =
        new XMLHttpRequest();


    xhr.open(
        "POST",
        "admin-update-faculty-status",
        true
    );


    xhr.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
    );


    xhr.onreadystatechange =
        function () {

            if (xhr.readyState !== 4) {

                return;

            }


            if (xhr.status === 200) {

                faculty.active =
                    newStatus;


                displayAdminFaculty();

                displayAdminOverview();


                alert(
                    newStatus
                        ? "Faculty activated successfully."
                        : "Faculty deactivated successfully."
                );


            } else {

                console.error(
                    "Faculty status update error:",
                    xhr.responseText
                );


                alert(
                    "Unable to update faculty status."
                );

            }

        };


    const data =
        "userId=" +
        encodeURIComponent(
            faculty.id
        ) +

        "&active=" +
        encodeURIComponent(
            newStatus
        );


    xhr.send(data);
}

// =================================
// REMOVE FACULTY
// =================================

function removeFaculty(index) {

    const faculty =
        adminData.faculty[index];

    if (!faculty) {
        return;
    }

    const confirmed =
        confirm(
            `Are you sure you want to remove ${faculty.name}?`
        );

    if (!confirmed) {
        return;
    }

    const xhr =
        new XMLHttpRequest();

    xhr.open(
        "POST",
        "admin-remove-faculty",
        true
    );

    xhr.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
    );

    xhr.onreadystatechange =
        function () {

            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status === 200) {

                alert(
                    "Faculty removed successfully."
                );

                displayAdminFaculty();

                displayAdminOverview();

            } else {

                console.error(
                    "Remove faculty error:",
                    xhr.responseText
                );

                alert(
                    "Unable to remove faculty."
                );
            }
        };

    const data =
        "userId=" +
        encodeURIComponent(
            faculty.id
        );

    xhr.send(data);
}

// =================================
// SEARCH FACULTY
// =================================

const facultySearch =
    document.getElementById(
        "facultySearch"
    );


if (facultySearch) {

    facultySearch.addEventListener(
        "input",
        function () {

            displayAdminFaculty(
                facultySearch.value
            );

        }
    );

}

// =================================
// DISPLAY BATCHES
// =================================

function displayAdminBatches(searchTerm = "") {

    const batchesList =
        document.getElementById(
            "adminBatchesList"
        );

    const countElement =
        document.getElementById(
            "batchListCount"
        );

    const summaryElement =
        document.getElementById(
            "batchListSummary"
        );


    if (!batchesList) {
        return;
    }


    fetch("admin-batches")
        .then(function (response) {

            if (!response.ok) {
                throw new Error(
                    "Failed to load batches"
                );
            }

            return response.json();

        })
        .then(function (batches) {

            // Store database data
            adminData.batches =
                batches.map(function (batch) {

                    return {

                        id: batch.id,

                        name: batch.name,

                        subject: batch.subject,

                        faculty: batch.teacher,

                        schedule: batch.schedule,

                        startDate: batch.startDate,

                        endDate: batch.endDate,

                        monthlyFee: batch.monthlyFee,

                        active: batch.active

                    };

                });


            const term =
                searchTerm
                    .trim()
                    .toLowerCase();


            const filteredBatches =
                adminData.batches.filter(
                    function (batch) {

                        return (

                            String(batch.id)
                                .toLowerCase()
                                .includes(term)

                            ||

                            batch.name
                                .toLowerCase()
                                .includes(term)

                            ||

                            batch.subject
                                .toLowerCase()
                                .includes(term)

                            ||

                            batch.faculty
                                .toLowerCase()
                                .includes(term)

                        );

                    }
                );


            batchesList.innerHTML = "";


            filteredBatches.forEach(
                function (batch) {

                    const index =
                        adminData.batches
                            .indexOf(batch);


                    const row =
                        document.createElement(
                            "div"
                        );


                    row.className =
                        "admin-batch-row";


                    const status =
                        batch.active
                            ? "Active"
                            : "Inactive";


                    const statusClass =
                        batch.active
                            ? "active"
                            : "inactive";


                    const actionText =
                        batch.active
                            ? "Deactivate"
                            : "Activate";


                    const actionClass =
                        batch.active
                            ? "deactivate"
                            : "activate";


                    row.innerHTML = `

                        <span>
                            ${batch.id}
                        </span>

                        <span>
                            ${batch.name}
                        </span>

                        <span>
                            ${batch.subject}
                        </span>

                        <span>
                            ${batch.faculty}
                        </span>

                        <span class="admin-batch-fee">
                            ₹${batch.monthlyFee}
                        </span>

                        <span>

                            <span
                                class="admin-batch-status ${statusClass}">

                                ${status}

                            </span>

                        </span>

                        <span
                            class="admin-batch-actions">

                            <button
                                type="button"
                                class="admin-batch-action-btn"
                                onclick="editBatch(${index})">

                                Edit

                            </button>

                            <button
                                type="button"
                                class="admin-batch-status-btn ${actionClass}"
                                onclick="toggleBatchStatus(${index})">

                                ${actionText}

                            </button>

                            <button
                                type="button"
                                class="admin-batch-remove-btn"
                                onclick="removeBatch(${index})">

                                Remove

                            </button>

                        </span>

                    `;


                    batchesList.appendChild(row);

                }
            );


            // Update total count
            if (countElement) {

                countElement.textContent =
                    filteredBatches.length;

            }


            // Update footer
            if (summaryElement) {

                if (
                    filteredBatches.length === 0
                ) {

                    summaryElement.textContent =
                        "No batches found";

                } else {

                    summaryElement.textContent =
                        `Showing ${filteredBatches.length} of ${adminData.batches.length} batches`;

                }

            }

        })
        .catch(function (error) {

            console.error(
                "Error loading batches:",
                error
            );

            batchesList.innerHTML =
                "<p>Unable to load batches.</p>";

            if (countElement) {
                countElement.textContent = "0";
            }

            if (summaryElement) {
                summaryElement.textContent =
                    "Unable to load batches";
            }

        });

}

// =================================
// OPEN BATCHES
// =================================

function openBatches() {

    const overview =
        document.getElementById(
            "adminOverviewSection"
        );

    const students =
        document.getElementById(
            "adminStudentsSection"
        );

    const faculty =
        document.getElementById(
            "adminFacultySection"
        );

    const batches =
        document.getElementById(
            "adminBatchesSection"
        );

    const courses =
        document.getElementById(
            "adminCoursesSection"
        );

    const pageTitle =
        document.getElementById(
            "adminPageTitle"
        );
		
		const payments =
		    document.getElementById(
		        "adminPaymentsSection"
		    );


    // Hide other sections

    if (overview) {
        overview.style.display = "none";
    }

    if (students) {
        students.style.display = "none";
    }

    if (faculty) {
        faculty.style.display = "none";
    }

    if (courses) {
        courses.style.display = "none";
    }

	if (payments) {
	    payments.style.display = "none";
	}

    // Show Batches

    if (batches) {
        batches.style.display = "block";
    }


    if (pageTitle) {
        pageTitle.textContent = "Batches";
    }


    setActiveNav("batchesNav");

    displayAdminBatches();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// =================================
// CLOSE BATCHES
// =================================

function closeBatches() {

    showOverview();

}


// =================================
// OPEN ADD BATCH
// =================================

function openAddBatch() {

    const card =
        document.getElementById(
            "adminAddBatchCard"
        );


    if (!card) {

        return;

    }


    card.style.display =
        "block";


    const idInput =
        document.getElementById(
            "adminNewBatchId"
        );


    if (idInput) {

        idInput.focus();

    }

}


// =================================
// CLOSE ADD BATCH
// =================================

function closeAddBatch() {

    const card =
        document.getElementById(
            "adminAddBatchCard"
        );

    if (!card) {
        return;
    }

    card.style.display = "none";

    const fields = [
        "adminNewBatchName",
        "adminNewBatchSubject",
        "adminNewBatchFaculty",
        "adminNewBatchSchedule",
        "adminNewBatchStartDate",
        "adminNewBatchEndDate",
        "adminNewBatchFee"
    ];

    fields.forEach(function (id) {

        const input =
            document.getElementById(id);

        if (input) {
            input.value = "";
        }

    });
}

// =================================
// ADD BATCH
// =================================

function addBatch() {

    const name =
        document.getElementById(
            "adminNewBatchName"
        ).value.trim();

    const subject =
        document.getElementById(
            "adminNewBatchSubject"
        ).value.trim();

    const teacher =
        document.getElementById(
            "adminNewBatchFaculty"
        ).value.trim();

    const schedule =
        document.getElementById(
            "adminNewBatchSchedule"
        ).value.trim();

    const startDate =
        document.getElementById(
            "adminNewBatchStartDate"
        ).value;

    const endDate =
        document.getElementById(
            "adminNewBatchEndDate"
        ).value;

    const monthlyFee =
        document.getElementById(
            "adminNewBatchFee"
        ).value;


    if (
        !name ||
        !subject ||
        !teacher ||
        !schedule ||
        !startDate ||
        !endDate ||
        !monthlyFee
    ) {

        alert(
            "Please fill in all batch details."
        );

        return;
    }


    if (endDate < startDate) {

        alert(
            "End date cannot be before start date."
        );

        return;
    }


    const formData =
        new URLSearchParams();

    formData.append("name", name);
    formData.append("subject", subject);
    formData.append("teacher", teacher);
    formData.append("schedule", schedule);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("monthlyFee", monthlyFee);


    fetch("admin-add-batch", {

        method: "POST",

        headers: {
            "Content-Type":
                "application/x-www-form-urlencoded"
        },

        body: formData.toString()

    })
    .then(function (response) {

        return response.text()
            .then(function (text) {

                return {
                    status: response.status,
                    text: text
                };

            });

    })
    .then(function (result) {

        console.log(
            "admin-add-batch status:",
            result.status
        );

        console.log(
            "admin-add-batch response:",
            result.text
        );


        if (result.status === 200) {

            alert(
                "Batch added successfully!"
            );

            closeAddBatch();

            displayAdminBatches();

            return;
        }


        if (result.status === 401) {

            alert(
                "Your session has expired. Please log in again."
            );

            return;
        }


        if (result.status === 403) {

            alert(
                "You are not authorized to add batches."
            );

            return;
        }


        // Show the actual backend response
        alert(
            "Server error (" +
            result.status +
            "):\n\n" +
            result.text
        );

    })
    .catch(function (error) {

        console.error(
            "Network error:",
            error
        );

        alert(
            "Network error while connecting to the server.\n\n" +
            error.message
        );

    });

}
// =================================
// EDIT BATCH
// =================================

function editBatch(index) {

    const batch =
        adminData.batches[index];


    if (!batch) {

        return;

    }


    const newFee =
        prompt(
            `Enter new monthly fee for ${batch.name}:`,
            batch.monthlyFee
        );


    if (newFee === null) {

        return;

    }


    const fee =
        Number(newFee);


    if (isNaN(fee) || fee < 0) {

        alert(
            "Please enter a valid monthly fee."
        );

        return;

    }


    const xhr =
        new XMLHttpRequest();


    xhr.open(
        "POST",
        "admin-update-batch",
        true
    );


    xhr.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
    );


    xhr.onreadystatechange =
        function () {

            if (xhr.readyState !== 4) {

                return;

            }


            if (xhr.status === 200) {

                batch.monthlyFee =
                    fee;


                displayAdminBatches();


                alert(
                    "Monthly fee updated successfully."
                );


            } else {

                alert(
                    xhr.responseText ||
                    "Unable to update monthly fee."
                );

            }

        };


    const data =
        "id=" +
        encodeURIComponent(batch.id) +

        "&name=" +
        encodeURIComponent(batch.name) +

        "&subject=" +
        encodeURIComponent(batch.subject) +

        "&teacher=" +
        encodeURIComponent(batch.teacher || batch.faculty) +

        "&schedule=" +
        encodeURIComponent(batch.schedule || "") +

        "&startDate=" +
        encodeURIComponent(batch.startDate) +

        "&endDate=" +
        encodeURIComponent(batch.endDate) +

        "&monthlyFee=" +
        encodeURIComponent(fee);


    xhr.send(data);

}

// =================================
// TOGGLE BATCH STATUS
// =================================

function toggleBatchStatus(index) {

    const batch =
        adminData.batches[index];

    if (!batch) {
        return;
    }


    const newStatus =
        !batch.active;


    fetch("admin-update-batch-status", {

        method: "POST",

        headers: {
            "Content-Type":
                "application/x-www-form-urlencoded"
        },

        body:
            "id=" +
            encodeURIComponent(batch.id) +
            "&active=" +
            encodeURIComponent(newStatus)

    })
    .then(function (response) {

        return response.text()
            .then(function (text) {

                return {
                    ok: response.ok,
                    status: response.status,
                    text: text
                };

            });

    })
    .then(function (result) {

        console.log(
            "Batch status response:",
            result.status,
            result.text
        );


        if (!result.ok) {

            alert(
                "Failed to update batch status.\n\n" +
                result.text
            );

            return;
        }


        let data;

        try {

            data =
                JSON.parse(result.text);

        } catch (error) {

            alert(
                "Invalid server response."
            );

            return;
        }


        if (data.success) {

            alert(
                newStatus
                    ? "Batch activated successfully!"
                    : "Batch deactivated successfully!"
            );


            // Reload batches from database

            displayAdminBatches();

        } else {

            alert(
                data.message ||
                "Failed to update batch status."
            );

        }

    })
    .catch(function (error) {

        console.error(
            "Error updating batch status:",
            error
        );

        alert(
            "Network error while updating batch status."
        );

    });

}

// =================================
// REMOVE BATCH
// =================================

function removeBatch(index) {

    const batch =
        adminData.batches[index];

    if (!batch) {
        return;
    }


    const confirmed =
        confirm(
            "Are you sure you want to remove \"" +
            batch.name +
            "\"?"
        );


    if (!confirmed) {
        return;
    }


    fetch("admin-remove-batch", {

        method: "POST",

        headers: {
            "Content-Type":
                "application/x-www-form-urlencoded"
        },

        body:
            "id=" +
            encodeURIComponent(batch.id)

    })
    .then(function (response) {

        return response.text()
            .then(function (text) {

                return {
                    ok: response.ok,
                    status: response.status,
                    text: text
                };

            });

    })
    .then(function (result) {

        console.log(
            "Remove batch response:",
            result.status,
            result.text
        );


        let data;

        try {

            data =
                JSON.parse(result.text);

        } catch (error) {

            alert(
                "Server returned an invalid response."
            );

            return;
        }


        if (!result.ok) {

            alert(
                data.message ||
                "Unable to remove this batch."
            );

            return;
        }


        if (data.success) {

            alert(
                "Batch removed successfully!"
            );


            // Reload from database

            displayAdminBatches();

        } else {

            alert(
                data.message ||
                "Failed to remove batch."
            );

        }

    })
    .catch(function (error) {

        console.error(
            "Error removing batch:",
            error
        );

        alert(
            "Network error while removing batch."
        );

    });

}

// =================================
// SEARCH BATCHES
// =================================

const batchSearch =
    document.getElementById(
        "batchSearch"
    );


if (batchSearch) {

    batchSearch.addEventListener(
        "input",
        function () {

            displayAdminBatches(
                batchSearch.value
            );

        }
    );

}

// =================================
// DISPLAY COURSES
// =================================

function displayAdminCourses(searchTerm = "") {

    const coursesList =
        document.getElementById(
            "adminCoursesList"
        );

    const countElement =
        document.getElementById(
            "courseListCount"
        );

    const summaryElement =
        document.getElementById(
            "courseListSummary"
        );


    if (!coursesList) {

        return;

    }


    fetch("admin-courses")

        .then(function (response) {

            if (!response.ok) {

                throw new Error(
                    "Failed to load courses"
                );

            }

            return response.json();

        })

        .then(function (coursesData) {

            // Load database courses
            // into adminData

            adminData.courses =
                coursesData.map(
                    function (course) {

                        return {

                            id: course.courseId,

                            name: course.name,

                            description:
                                course.description,

                            active:
                                course.active

                        };

                    }
                );


            const term =
                searchTerm
                    .trim()
                    .toLowerCase();


            const filteredCourses =
                adminData.courses.filter(
                    function (course) {

                        return (

                            course.id
                                .toLowerCase()
                                .includes(term)

                            ||

                            course.name
                                .toLowerCase()
                                .includes(term)

                        );

                    }
                );


            coursesList.innerHTML = "";


            filteredCourses.forEach(
                function (course) {

                    const index =
                        adminData.courses
                            .indexOf(course);


                    const row =
                        document.createElement(
                            "div"
                        );


                    row.className =
                        "admin-course-row";


                    const status =
                        course.active
                            ? "Active"
                            : "Inactive";


                    const statusClass =
                        course.active
                            ? "active"
                            : "inactive";


                    const actionText =
                        course.active
                            ? "Deactivate"
                            : "Activate";


                    const actionClass =
                        course.active
                            ? "deactivate"
                            : "activate";


                    row.innerHTML = `

                        <span>
                            ${course.id}
                        </span>

                        <span>
                            ${course.name}
                        </span>

                        <span>
                            ${course.description || ""}
                        </span>

                        <span>

                            <span
                                class="admin-course-status ${statusClass}">

                                ${status}

                            </span>

                        </span>

                        <span
                            class="admin-course-actions">

                            <button
                                type="button"
                                class="admin-course-status-btn ${actionClass}"
                                onclick="toggleCourseStatus(${index})">

                                ${actionText}

                            </button>

                            <button
                                type="button"
                                class="admin-course-remove-btn"
                                onclick="removeCourse(${index})">

                                Remove

                            </button>

                        </span>

                    `;


                    coursesList.appendChild(row);

                }
            );


            if (countElement) {

                countElement.textContent =
                    filteredCourses.length;

            }


            if (summaryElement) {

                if (filteredCourses.length === 0) {

                    summaryElement.textContent =
                        "No courses found";

                } else {

                    summaryElement.textContent =
                        `Showing ${filteredCourses.length} of ${adminData.courses.length} courses`;

                }

            }

        })

        .catch(function (error) {

            console.error(
                "Error loading courses:",
                error
            );

            coursesList.innerHTML = "";

            if (countElement) {

                countElement.textContent =
                    "0";

            }

            if (summaryElement) {

                summaryElement.textContent =
                    "Unable to load courses";

            }

        });

}


// =================================
// OPEN COURSES
// =================================

function openCourses() {

    const overview =
        document.getElementById(
            "adminOverviewSection"
        );

    const students =
        document.getElementById(
            "adminStudentsSection"
        );

    const faculty =
        document.getElementById(
            "adminFacultySection"
        );

    const batches =
        document.getElementById(
            "adminBatchesSection"
        );

    const courses =
        document.getElementById(
            "adminCoursesSection"
        );

    const pageTitle =
        document.getElementById(
            "adminPageTitle"
        );
		
		const payments =
		    document.getElementById(
		        "adminPaymentsSection"
		    );


    if (overview) {
        overview.style.display = "none";
    }

    if (students) {
        students.style.display = "none";
    }

    if (faculty) {
        faculty.style.display = "none";
    }

    if (batches) {
        batches.style.display = "none";
    }


    if (courses) {
        courses.style.display = "block";
    }


    if (pageTitle) {

        pageTitle.textContent =
            "Courses";

    }
	
	if (payments) {
	    payments.style.display = "none";
	}


    setActiveNav("coursesNav");


    displayAdminCourses();


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// =================================
// CLOSE COURSES
// =================================

function closeCourses() {

    showOverview();

}


// =================================
// OPEN ADD COURSE
// =================================

function openAddCourse() {

    const card =
        document.getElementById(
            "adminAddCourseCard"
        );


    if (!card) {
        return;
    }


    card.style.display = "block";


    const idInput =
        document.getElementById(
            "adminNewCourseId"
        );


    if (idInput) {
        idInput.focus();
    }

}


// =================================
// CLOSE ADD COURSE
// =================================

function closeAddCourse() {

    const card =
        document.getElementById(
            "adminAddCourseCard"
        );


    if (!card) {
        return;
    }


    card.style.display = "none";


    document.getElementById(
        "adminNewCourseId"
    ).value = "";


    document.getElementById(
        "adminNewCourseName"
    ).value = "";


    document.getElementById(
        "adminNewCourseDescription"
    ).value = "";

}


// =================================
// ADD COURSE
// =================================

function addCourse() {

    const id =
        document.getElementById(
            "adminNewCourseId"
        )
        .value
        .trim()
        .toUpperCase();


    const name =
        document.getElementById(
            "adminNewCourseName"
        )
        .value
        .trim();


    const description =
        document.getElementById(
            "adminNewCourseDescription"
        )
        .value
        .trim();


    if (!id || !name || !description) {

        alert(
            "Please enter Course ID, Course Name and Description."
        );

        return;

    }


    const formData =
        new URLSearchParams();

    formData.append(
        "courseId",
        id
    );

    formData.append(
        "name",
        name
    );

    formData.append(
        "description",
        description
    );


    fetch("admin-add-course", {

        method: "POST",

        headers: {
            "Content-Type":
                "application/x-www-form-urlencoded"
        },

        body: formData.toString()

    })
    .then(
        function (response) {

            return response.json()
                .then(
                    function (data) {

                        return {
                            status: response.status,
                            data: data
                        };

                    }
                );

        }
    )
    .then(
        function (result) {

            if (result.status === 200 &&
                result.data.success) {

                closeAddCourse();

                displayAdminCourses();

                displayAdminOverview();

                alert(
                    name +
                    " has been added successfully."
                );

            }

            else if (result.status === 409) {

                alert(
                    "A course with this ID already exists."
                );

            }

            else {

                alert(
                    result.data.message ||
                    "Failed to add course."
                );

            }

        }
    )
    .catch(
        function (error) {

            console.error(
                "Error adding course:",
                error
            );

            alert(
                "Server error while adding course."
            );

        }
    );

}

// =================================
// EDIT COURSE
// =================================

function editCourse(index) {

    const course =
        adminData.courses[index];


    if (!course) {
        return;
    }


    const newName =
        prompt(
            "Enter course name:",
            course.name
        );


    if (newName === null) {
        return;
    }


    const newDescription =
        prompt(
            "Enter course description:",
            course.description
        );


    if (newDescription === null) {
        return;
    }


    if (
        !newName.trim() ||
        !newDescription.trim()
    ) {

        alert(
            "Course name and description cannot be empty."
        );

        return;

    }


    course.name =
        newName.trim();


    course.description =
        newDescription.trim();


    displayAdminCourses();

}


// =================================
// TOGGLE COURSE STATUS
// =================================

function toggleCourseStatus(index) {

    const course =
        adminData.courses[index];


    if (!course) {
        return;
    }


    const newStatus =
        !course.active;


    const action =
        newStatus
            ? "activate"
            : "deactivate";


    const confirmed =
        confirm(
            `Are you sure you want to ${action} ${course.name}?`
        );


    if (!confirmed) {
        return;
    }


    const formData =
        new URLSearchParams();

    formData.append(
        "courseId",
        course.id
    );

    formData.append(
        "active",
        newStatus
    );


    fetch("admin-update-course-status", {

        method: "POST",

        headers: {
            "Content-Type":
                "application/x-www-form-urlencoded"
        },

        body: formData.toString()

    })
    .then(
        function (response) {

            return response.json()
                .then(
                    function (data) {

                        return {
                            status: response.status,
                            data: data
                        };

                    }
                );

        }
    )
    .then(
        function (result) {

            if (
                result.status === 200 &&
                result.data.success
            ) {

                course.active =
                    newStatus;


                displayAdminCourses();

                displayAdminOverview();


                alert(
                    `${course.name} is now ${
                        course.active
                            ? "Active"
                            : "Inactive"
                    }.`
                );

            } else {

                alert(
                    result.data.message ||
                    "Failed to update course status."
                );

            }

        }
    )
    .catch(
        function (error) {

            console.error(
                "Error updating course status:",
                error
            );

            alert(
                "Server error while updating course status."
            );

        }
    );

}

// =================================
// REMOVE COURSE
// =================================

function removeCourse(index) {

    const course =
        adminData.courses[index];

    if (!course) {
        return;
    }

    const confirmed =
        confirm(
            `Are you sure you want to remove ${course.name}?`
        );

    if (!confirmed) {
        return;
    }

    const formData =
        new URLSearchParams();

    formData.append(
        "courseId",
        course.id
    );

    fetch("admin-remove-course", {

        method: "POST",

        headers: {
            "Content-Type":
                "application/x-www-form-urlencoded"
        },

        body: formData.toString()

    })
    .then(
        function (response) {

            return response.json()
                .then(
                    function (data) {

                        return {
                            status: response.status,
                            data: data
                        };

                    }
                );

        }
    )
    .then(
        function (result) {

            if (
                result.status === 200 &&
                result.data.success
            ) {

                displayAdminCourses();

                displayAdminOverview();

                alert(
                    `${course.name} has been removed successfully.`
                );

            } else {

                alert(
                    result.data.message ||
                    "Failed to remove course."
                );

            }

        }
    )
    .catch(
        function (error) {

            console.error(
                "Error removing course:",
                error
            );

            alert(
                "Server error while removing course."
            );

        }
    );

}

// =================================
// SEARCH COURSES
// =================================

const courseSearch =
    document.getElementById(
        "courseSearch"
    );


if (courseSearch) {

    courseSearch.addEventListener(
        "input",
        function () {

            displayAdminCourses(
                courseSearch.value
            );

        }
    );

}

// =================================
// DISPLAY ADMIN PAYMENTS
// =================================

function displayAdminPayments() {

    const paymentsList =
        document.getElementById(
            "adminPaymentsList"
        );

    if (!paymentsList) {
        return;
    }

    paymentsList.innerHTML = "";

    const xhr =
        new XMLHttpRequest();

    xhr.open(
        "GET",
        "admin-payments",
        true
    );

    xhr.onreadystatechange =
        function () {

            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status !== 200) {

                paymentsList.innerHTML = `
                    <div class="admin-payment-row">
                        <span>
                            Unable to load payments.
                        </span>
                    </div>
                `;

                return;
            }

            const payments =
                JSON.parse(
                    xhr.responseText
                );


            // =================================
            // PAYMENT FILTER ELEMENTS
            // =================================

            const monthFilter =
                document.getElementById(
                    "adminPaymentMonth"
                );

            const statusFilter =
                document.getElementById(
                    "adminPaymentStatus"
                );

            const searchInput =
                document.getElementById(
                    "paymentSearch"
                );


            // =================================
            // SAVE CURRENT MONTH VALUE
            // =================================

            const currentMonthValue =
                monthFilter
                    ? monthFilter.value
                    : "all";


            // =================================
            // BUILD MONTH FILTER FROM DATABASE
            // =================================

            if (monthFilter) {

                const uniqueMonths =
                    [
                        ...new Set(
                            payments.map(
                                function (payment) {

                                    return payment.feeMonth
                                        .substring(0, 7);

                                }
                            )
                        )
                    ];

                uniqueMonths.sort();


                monthFilter.innerHTML =
                    '<option value="all">All Months</option>';


                uniqueMonths.forEach(
                    function (month) {

                        const monthDate =
                            new Date(
                                month + "-01"
                            );


                        const monthName =
                            monthDate.toLocaleDateString(
                                "en-IN",
                                {
                                    month: "long",
                                    year: "numeric"
                                }
                            );


                        const option =
                            document.createElement(
                                "option"
                            );


                        option.value =
                            month;

                        option.textContent =
                            monthName;


                        monthFilter.appendChild(
                            option
                        );

                    }
                );


                if (
                    currentMonthValue === "all" ||
                    uniqueMonths.includes(
                        currentMonthValue
                    )
                ) {

                    monthFilter.value =
                        currentMonthValue;

                } else {

                    monthFilter.value =
                        "all";

                }

            }


            // =================================
            // GET CURRENT FILTER VALUES
            // =================================

            const selectedMonth =
                monthFilter
                    ? monthFilter.value
                    : "all";


            const selectedStatus =
                statusFilter
                    ? statusFilter.value
                    : "all";


            const searchTerm =
                searchInput
                    ? searchInput.value
                        .trim()
                        .toLowerCase()
                    : "";


            // =================================
            // FILTER PAYMENTS
            // =================================

            const filteredPayments =
                payments.filter(
                    function (payment) {


                        // -------------------------
                        // MONTH FILTER
                        // -------------------------

                        const matchesMonth =
                            selectedMonth === "all"
                            ||
                            payment.feeMonth.startsWith(
                                selectedMonth
                            );


                        // -------------------------
                        // STATUS FILTER
                        // -------------------------

                        const matchesStatus =
                            selectedStatus === "all"
                            ||
                            payment.status
                                .toLowerCase() ===
                            selectedStatus;


                        // -------------------------
                        // FIND STUDENT
                        // -------------------------

                        const student =
                            adminData.students.find(
                                function (student) {

                                    return student.id ===
                                        payment.studentUserId;

                                }
                            );


                        // -------------------------
                        // FIND BATCH
                        // -------------------------

                        const batch =
                            adminData.batches.find(
                                function (batch) {

                                    return Number(
                                        batch.id
                                    ) === Number(
                                        payment.batchId
                                    );

                                }
                            );


                        const studentName =
                            student
                                ? student.name
                                    .toLowerCase()
                                : "";


                        const batchName =
                            batch
                                ? batch.name
                                    .toLowerCase()
                                : "";


                        // -------------------------
                        // SEARCH FILTER
                        // -------------------------

                        const matchesSearch =
                            studentName.includes(
                                searchTerm
                            )
                            ||
                            payment.studentUserId
                                .toLowerCase()
                                .includes(
                                    searchTerm
                                )
                            ||
                            batchName.includes(
                                searchTerm
                            );


                        return (
                            matchesMonth &&
                            matchesStatus &&
                            matchesSearch
                        );

                    }
                );


            // =================================
            // PAYMENT SUMMARY
            // =================================

            let totalExpected = 0;

            let totalCollected = 0;

            let totalPending = 0;


            filteredPayments.forEach(
                function (payment) {

                    const amount =
                        Number(
                            payment.amount
                        ) || 0;


                    totalExpected +=
                        amount;


                    if (
                        payment.status ===
                        "PAID"
                    ) {

                        totalCollected +=
                            amount;

                    } else {

                        totalPending +=
                            amount;

                    }

                }
            );


            // =================================
            // UPDATE SUMMARY CARDS
            // =================================

            const totalExpectedElement =
                document.getElementById(
                    "adminTotalExpected"
                );


            const totalCollectedElement =
                document.getElementById(
                    "adminTotalCollected"
                );


            const totalPendingElement =
                document.getElementById(
                    "adminTotalPending"
                );


            const recordsElement =
                document.getElementById(
                    "adminPaymentRecords"
                );


            if (totalExpectedElement) {

                totalExpectedElement.textContent =
                    `₹${totalExpected}`;

            }


            if (totalCollectedElement) {

                totalCollectedElement.textContent =
                    `₹${totalCollected}`;

            }


            if (totalPendingElement) {

                totalPendingElement.textContent =
                    `₹${totalPending}`;

            }


            if (recordsElement) {

                recordsElement.textContent =
                    filteredPayments.length;

            }


            // =================================
            // NO PAYMENT RECORDS
            // =================================

            if (
                filteredPayments.length === 0
            ) {

                paymentsList.innerHTML = `
                    <div class="admin-payment-row">
                        <span>
                            No payment records found.
                        </span>
                    </div>
                `;

                return;
            }


            // =================================
            // DISPLAY PAYMENT RECORDS
            // =================================

            filteredPayments.forEach(
                function (payment) {


                    const row =
                        document.createElement(
                            "div"
                        );


                    row.className =
                        "admin-payment-row";


                    // -------------------------
                    // FORMAT MONTH
                    // -------------------------

                    const monthDate =
                        new Date(
                            payment.feeMonth
                        );


                    const monthName =
                        monthDate.toLocaleDateString(
                            "en-IN",
                            {
                                month: "long",
                                year: "numeric"
                            }
                        );


                    // -------------------------
                    // FIND STUDENT
                    // -------------------------

                    const student =
                        adminData.students.find(
                            function (student) {

                                return student.id ===
                                    payment.studentUserId;

                            }
                        );


                    // -------------------------
                    // FIND BATCH
                    // -------------------------

                    const batch =
                        adminData.batches.find(
                            function (batch) {

                                return Number(
                                    batch.id
                                ) === Number(
                                    payment.batchId
                                );

                            }
                        );


                    const studentName =
                        student
                            ? student.name
                            : "Unknown Student";


                    const batchName =
                        batch
                            ? batch.name
                            : "Unknown Batch";


                    // -------------------------
                    // CREATE PAYMENT ROW
                    // -------------------------

                    row.innerHTML = `

                        <span>
                            ${studentName}
                        </span>


                        <span>
                            ${batchName}
                        </span>


                        <span>
                            ${monthName}
                        </span>


                        <span>
                            ₹${payment.amount}
                        </span>


                        <span>

                            ${
                                payment.status ===
                                "PAID"

                                    ? `
                                        <span
                                            class="admin-status-paid"
                                        >
                                            Paid
                                        </span>
                                      `

                                    : `
                                        <span
                                            class="admin-status-pending"
                                        >
                                            Pending
                                        </span>
                                      `
                            }

                        </span>


                        <span>

                            ${
                                payment.status ===
                                "PAID"

                                    ? `
                                        <span>
                                            Verified
                                        </span>
                                      `

                                    : `
                                        <button
                                            type="button"
                                            class="admin-payment-verify-btn"
                                            onclick="verifyPayment(
                                                ${payment.id}
                                            )"
                                        >
                                            Verify
                                        </button>
                                      `
                            }

                        </span>

                    `;


                    paymentsList.appendChild(
                        row
                    );

                }
            );

        };


    xhr.send();

}
// =================================
// FORMAT MONTH
// =================================

function formatPaymentMonth(month) {

    const parts =
        month.split("-");


    if (parts.length !== 2) {

        return month;

    }


    const date =
        new Date(
            Number(parts[0]),
            Number(parts[1]) - 1
        );


    return date.toLocaleString(
        "en-US",
        {
            month: "long",
            year: "numeric"
        }
    );

}


// =================================
// UPDATE PAYMENT SUMMARY
// =================================

function updatePaymentSummary(
    payments
) {

    let totalExpected = 0;

    let totalCollected = 0;

    let totalPending = 0;


	payments.forEach(
	    function (payment) {

	        const batch =
	            adminData.batches.find(
	                function (batch) {

	                    return batch.id ===
	                        payment.batchId;

	                }
	            );


	        const paymentAmount =
	            batch
	                ? Number(batch.monthlyFee)
	                : 0;


	        totalExpected +=
	            paymentAmount;


	        if (payment.status === "paid") {

	            totalCollected +=
	                paymentAmount;

	        } else {

	            totalPending +=
	                paymentAmount;

	        }

	    }
	);


    const totalExpectedElement =
        document.getElementById(
            "adminTotalExpected"
        );


    const totalCollectedElement =
        document.getElementById(
            "adminTotalCollected"
        );


    const totalPendingElement =
        document.getElementById(
            "adminTotalPending"
        );


    const recordsElement =
        document.getElementById(
            "adminPaymentRecords"
        );


    if (totalExpectedElement) {

        totalExpectedElement.textContent =
            `₹${totalExpected}`;

    }


    if (totalCollectedElement) {

        totalCollectedElement.textContent =
            `₹${totalCollected}`;

    }


    if (totalPendingElement) {

        totalPendingElement.textContent =
            `₹${totalPending}`;

    }


    if (recordsElement) {

        recordsElement.textContent =
            payments.length;

    }

}


// =================================
// OPEN PAYMENTS
// =================================

function openPayments() {

    const overview =
        document.getElementById(
            "adminOverviewSection"
        );

    const students =
        document.getElementById(
            "adminStudentsSection"
        );

    const faculty =
        document.getElementById(
            "adminFacultySection"
        );

    const batches =
        document.getElementById(
            "adminBatchesSection"
        );

    const courses =
        document.getElementById(
            "adminCoursesSection"
        );

    const payments =
        document.getElementById(
            "adminPaymentsSection"
        );

    const pageTitle =
        document.getElementById(
            "adminPageTitle"
        );


    if (overview) {

        overview.style.display =
            "none";

    }


    if (students) {

        students.style.display =
            "none";

    }


    if (faculty) {

        faculty.style.display =
            "none";

    }


    if (batches) {

        batches.style.display =
            "none";

    }


    if (courses) {

        courses.style.display =
            "none";

    }


    if (payments) {

        payments.style.display =
            "block";

    }


    if (pageTitle) {

        pageTitle.textContent =
            "Payments";

    }


    setActiveNav("paymentsNav");


    displayAdminPayments();


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// =================================
// CLOSE PAYMENTS
// =================================

function closePayments() {

    showOverview();

}


// =================================
// VERIFY PAYMENT
// =================================

function verifyPayment(feeRecordId) {

    const xhr =
        new XMLHttpRequest();

    xhr.open(
        "POST",
        "verify-payment",
        true
    );

    xhr.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
    );

    xhr.onreadystatechange =
        function () {

            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status === 200) {

                alert(
                    "Payment verified successfully."
                );

                // Reload payment records
                displayAdminPayments();

                return;
            }

            if (xhr.status === 404) {

                alert(
                    "Payment record not found."
                );

                return;
            }

            if (xhr.status === 403) {

                alert(
                    "You are not authorized to verify payments."
                );

                return;
            }

            alert(
                "Unable to verify payment."
            );
        };

    const data =
        "feeRecordId=" +
        encodeURIComponent(
            feeRecordId
        );

    xhr.send(data);
}
// =================================
// VIEW PAYMENT
// =================================

function viewPayment(index) {

    const payment =
        adminData.payments[index];


    if (!payment) {

        return;

    }


    const student =
        adminData.students.find(
            function (student) {

                return student.id ===
                    payment.studentId;

            }
        );


    const batch =
        adminData.batches.find(
            function (batch) {

                return batch.id ===
                    payment.batchId;

            }
        );


    const paymentAmount =
        batch
            ? Number(batch.monthlyFee)
            : 0;


    alert(

        `Student: ${
            student
                ? student.name
                : "Unknown Student"
        }\n` +

        `Student ID: ${
            payment.studentId
        }\n` +

        `Batch: ${
            batch
                ? batch.name
                : "Unknown Batch"
        }\n` +

        `Month: ${
            formatPaymentMonth(
                payment.month
            )
        }\n` +

        `Amount: ₹${paymentAmount}\n` +

        `Status: ${
            payment.status === "paid"
                ? "Paid"
                : "Pending"
        }`

    );

}

// =================================
// PAYMENT FILTERS
// =================================

const paymentSearch =
    document.getElementById(
        "paymentSearch"
    );


if (paymentSearch) {

    paymentSearch.addEventListener(
        "input",
        function () {

            displayAdminPayments();

        }
    );

}


const paymentMonth =
    document.getElementById(
        "adminPaymentMonth"
    );


if (paymentMonth) {

    paymentMonth.addEventListener(
        "change",
        function () {

            displayAdminPayments();

        }
    );

}


const paymentStatus =
    document.getElementById(
        "adminPaymentStatus"
    );


if (paymentStatus) {

    paymentStatus.addEventListener(
        "change",
        function () {

            displayAdminPayments();

        }
    );

}