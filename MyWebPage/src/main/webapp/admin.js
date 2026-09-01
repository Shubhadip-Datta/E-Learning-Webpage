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
		           id: "BAT001",
		           name: "Java Morning Batch",
		           subject: "Java",
		           faculty: "Ankit Sharma",
		           monthlyFee: 1500,
		           active: true
		       },

		       {
		           id: "BAT002",
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

		      ],
			  payments: [

			      {
			          studentId: "STU001",
			          batchId: "BAT001",
			          month: "2026-08",
			          //amount: 1500,
			          status: "paid"
			      },

			      {
			          studentId: "STU002",
			          batchId: "BAT001",
			          month: "2026-08",
			          //amount: 1500,
			          status: "pending"
			      },

			      {
			          studentId: "STU003",
			          batchId: "BAT001",
			          month: "2026-08",
			          //amount: 1500,
			          status: "pending"
			      },

			      {
			          studentId: "STU004",
			          batchId: "BAT001",
			          month: "2026-08",
			          //amount: 1500,
			          status: "paid"
			      }

			  ]

};


// =================================
// DISPLAY ADMIN OVERVIEW
// =================================

function displayAdminOverview() {

    const totalStudents =
        document.getElementById("totalStudents");

    const totalFaculty =
        document.getElementById("totalFaculty");

    const activeBatches =
        document.getElementById("activeBatches");

    const totalCourses =
        document.getElementById("totalCourses");


    if (totalStudents) {

        totalStudents.textContent =
            adminData.students.length;

    }


	if (totalFaculty) {

	    totalFaculty.textContent =
	        adminData.faculty.length;

	}


	if (activeBatches) {

	    activeBatches.textContent =
	        adminData.batches.filter(
	            function (batch) {
	                return batch.active;
	            }
	        ).length;

	}


	if (totalCourses) {

	    totalCourses.textContent =
	        adminData.courses.length;

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
                adminData.students.indexOf(student);


            const row =
                document.createElement("div");


            row.className =
                "admin-student-row";


            const status =
                student.active
                    ? "Active"
                    : "Inactive";


            const statusClass =
                student.active
                    ? "active"
                    : "inactive";


            const actionText =
                student.active
                    ? "Deactivate"
                    : "Activate";


            const actionClass =
                student.active
                    ? "deactivate"
                    : "activate";


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
                        class="admin-student-status ${statusClass}">

                        ${status}

                    </span>

                </span>


                <span class="admin-student-actions">

                    <button
                        type="button"
                        class="admin-status-btn ${actionClass}"
                        onclick="toggleStudentStatus(${index})">

                        ${actionText}

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


    if (!id || !name || !batch) {

        alert(
            "Please enter Student ID, Student Name and Batch."
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


    adminData.students.push({

        id: id,

        name: name,

        batch: batch,

        active: true

    });


    displayAdminStudents();

    displayAdminOverview();

    closeAddStudent();


    alert(
        `${name} has been added successfully.`
    );

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
        document.getElementById("adminFacultyList");

    const countElement =
        document.getElementById("facultyListCount");

    const summaryElement =
        document.getElementById("facultyListSummary");


    if (!facultyList) {
        return;
    }


    const term =
        searchTerm.trim().toLowerCase();


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
                adminData.faculty.indexOf(faculty);


            const row =
                document.createElement("div");


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


                <span class="admin-faculty-actions">

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

    const id =
        document.getElementById(
            "adminNewFacultyId"
        )
        .value
        .trim()
        .toUpperCase();


    const name =
        document.getElementById(
            "adminNewFacultyName"
        )
        .value
        .trim();


    const subject =
        document.getElementById(
            "adminNewFacultySubject"
        )
        .value
        .trim();


    if (!id || !name || !subject) {

        alert(
            "Please enter Faculty ID, Faculty Name and Subject."
        );

        return;

    }


    const alreadyExists =
        adminData.faculty.some(
            function (faculty) {

                return faculty.id === id;

            }
        );


    if (alreadyExists) {

        alert(
            "A faculty member with this ID already exists."
        );

        return;

    }


    adminData.faculty.push({

        id: id,

        name: name,

        subject: subject,

        active: true

    });


    displayAdminFaculty();

    displayAdminOverview();

    closeAddFaculty();


    alert(
        `${name} has been added successfully.`
    );

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


    const action =
        faculty.active
            ? "deactivate"
            : "activate";


    const confirmed =
        confirm(
            `Are you sure you want to ${action} ${faculty.name}?`
        );


    if (!confirmed) {

        return;

    }


    faculty.active =
        !faculty.active;


    displayAdminFaculty();


    alert(
        `${faculty.name} is now ${
            faculty.active
                ? "Active"
                : "Inactive"
        }.`
    );

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
            `Remove ${faculty.name} (${faculty.id})?`
        );


    if (!confirmed) {

        return;

    }


    adminData.faculty.splice(
        index,
        1
    );


    displayAdminFaculty();

    displayAdminOverview();


    alert(
        `${faculty.name} has been removed.`
    );

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


    const term =
        searchTerm.trim().toLowerCase();


    const filteredBatches =
        adminData.batches.filter(
            function (batch) {

                return (

                    batch.id
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
                adminData.batches.indexOf(batch);


            const row =
                document.createElement("div");


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
                    ${batch.monthlyFee}
                </span>


                <span>

                    <span
                        class="admin-batch-status ${statusClass}">

                        ${status}

                    </span>

                </span>


                <span class="admin-batch-actions">

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


    if (countElement) {

        countElement.textContent =
            filteredBatches.length;

    }


    if (summaryElement) {

        if (filteredBatches.length === 0) {

            summaryElement.textContent =
                "No batches found";

        } else {

            summaryElement.textContent =
                `Showing ${filteredBatches.length} of ${adminData.batches.length} batches`;

        }

    }

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


    card.style.display =
        "none";


    document.getElementById(
        "adminNewBatchId"
    ).value = "";


    document.getElementById(
        "adminNewBatchName"
    ).value = "";


    document.getElementById(
        "adminNewBatchSubject"
    ).value = "";


    document.getElementById(
        "adminNewBatchFaculty"
    ).value = "";


    document.getElementById(
        "adminNewBatchFee"
    ).value = "";

}


// =================================
// ADD BATCH
// =================================

function addBatch() {

    const id =
        document.getElementById(
            "adminNewBatchId"
        )
        .value
        .trim()
        .toUpperCase();


    const name =
        document.getElementById(
            "adminNewBatchName"
        )
        .value
        .trim();


    const subject =
        document.getElementById(
            "adminNewBatchSubject"
        )
        .value
        .trim();


    const faculty =
        document.getElementById(
            "adminNewBatchFaculty"
        )
        .value
        .trim();


    const monthlyFee =
        Number(
            document.getElementById(
                "adminNewBatchFee"
            ).value
        );


    if (
        !id ||
        !name ||
        !subject ||
        !faculty ||
        !monthlyFee
    ) {

        alert(
            "Please enter all batch details and monthly fee."
        );

        return;

    }


    const alreadyExists =
        adminData.batches.some(
            function (batch) {

                return batch.id === id;

            }
        );


    if (alreadyExists) {

        alert(
            "A batch with this ID already exists."
        );

        return;

    }


    adminData.batches.push({

        id: id,

        name: name,

        subject: subject,

        faculty: faculty,

        monthlyFee: monthlyFee,

        active: true

    });


    displayAdminBatches();

    displayAdminOverview();

    closeAddBatch();


    alert(
        `${name} has been added successfully.`
    );

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


    if (!fee || fee < 0) {

        alert(
            "Please enter a valid monthly fee."
        );

        return;

    }


    batch.monthlyFee =
        fee;


    displayAdminBatches();

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


    const action =
        batch.active
            ? "deactivate"
            : "activate";


    const confirmed =
        confirm(
            `Are you sure you want to ${action} ${batch.name}?`
        );


    if (!confirmed) {

        return;

    }


    batch.active =
        !batch.active;


    displayAdminBatches();


    displayAdminOverview();


    alert(
        `${batch.name} is now ${
            batch.active
                ? "Active"
                : "Inactive"
        }.`
    );

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
            `Remove ${batch.name} (${batch.id})?`
        );


    if (!confirmed) {

        return;

    }


    adminData.batches.splice(
        index,
        1
    );


    displayAdminBatches();

    displayAdminOverview();


    alert(
        `${batch.name} has been removed.`
    );

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
        document.getElementById("adminCoursesList");

    const countElement =
        document.getElementById("courseListCount");

    const summaryElement =
        document.getElementById("courseListSummary");


    if (!coursesList) {
        return;
    }


    const term =
        searchTerm.trim().toLowerCase();


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

                    ||

                    course.description
                        .toLowerCase()
                        .includes(term)

                );

            }
        );


    coursesList.innerHTML = "";


    filteredCourses.forEach(
        function (course) {

            const index =
                adminData.courses.indexOf(course);


            const row =
                document.createElement("div");


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

                <span class="admin-course-description">
                    ${course.description}
                </span>

                <span>

                    <span
                        class="admin-course-status ${statusClass}">

                        ${status}

                    </span>

                </span>

                <span class="admin-course-actions">

                    <button
                        type="button"
                        class="admin-course-edit-btn"
                        onclick="editCourse(${index})">

                        Edit

                    </button>

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


    const alreadyExists =
        adminData.courses.some(
            function (course) {

                return course.id === id;

            }
        );


    if (alreadyExists) {

        alert(
            "A course with this ID already exists."
        );

        return;

    }


    adminData.courses.push({

        id: id,

        name: name,

        description: description,

        active: true

    });


    displayAdminCourses();

    displayAdminOverview();

    closeAddCourse();


    alert(
        `${name} has been added successfully.`
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


    const action =
        course.active
            ? "deactivate"
            : "activate";


    const confirmed =
        confirm(
            `Are you sure you want to ${action} ${course.name}?`
        );


    if (!confirmed) {
        return;
    }


    course.active =
        !course.active;


    displayAdminCourses();

    displayAdminOverview();


    alert(
        `${course.name} is now ${
            course.active
                ? "Active"
                : "Inactive"
        }.`
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
            `Remove ${course.name} (${course.id})?`
        );


    if (!confirmed) {
        return;
    }


    adminData.courses.splice(
        index,
        1
    );


    displayAdminCourses();

    displayAdminOverview();


    alert(
        `${course.name} has been removed.`
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
// DISPLAY PAYMENTS
// =================================

function displayAdminPayments() {

    const paymentsList =
        document.getElementById(
            "adminPaymentsList"
        );

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


    if (!paymentsList) {
        return;
    }


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


    const filteredPayments =
        adminData.payments.filter(
            function (payment) {

                const matchesMonth =
                    selectedMonth === "all"
                    ||
                    payment.month === selectedMonth;


                const matchesStatus =
                    selectedStatus === "all"
                    ||
                    payment.status === selectedStatus;


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

					const studentName =
					    student
					        ? student.name
					        : "";


					const batchName =
					    batch
					        ? batch.name
					        : "";


					const matchesSearch =
					    studentName
					        .toLowerCase()
					        .includes(searchTerm)

					    ||

					    payment.studentId
					        .toLowerCase()
					        .includes(searchTerm)

					    ||

					    batchName
					        .toLowerCase()
					        .includes(searchTerm);


                return (
                    matchesMonth &&
                    matchesStatus &&
                    matchesSearch
                );

            }
        );


    paymentsList.innerHTML = "";


    filteredPayments.forEach(
        function (payment) {

            const index =
                adminData.payments.indexOf(
                    payment
                );
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
				


            const row =
                document.createElement("div");


            row.className =
                "admin-payment-row";


            const statusText =
                payment.status === "paid"
                    ? "Paid"
                    : "Pending";


            const statusClass =
                payment.status === "paid"
                    ? "paid"
                    : "pending";


            row.innerHTML = `

			<span>
			    ${student ? student.name : "Unknown Student"}
			</span>

			<span>
			    ${batch ? batch.name : "Unknown Batch"}
			</span>

                <span>
                    ${formatPaymentMonth(
                        payment.month
                    )}
                </span>

                <span
                    class="admin-payment-amount">

                     ₹${paymentAmount}

                </span>

                <span>

                    <span
                        class="admin-payment-status ${statusClass}">

                        ${statusText}

                    </span>

                </span>

                <span
                    class="admin-payment-actions">

                    <button
                        type="button"
                        class="admin-payment-view-btn"
                        onclick="viewPayment(${index})">

                        View

                    </button>

                    ${
                        payment.status === "pending"
                            ? `
                                <button
                                    type="button"
                                    class="admin-payment-verify-btn"
                                    onclick="verifyPayment(${index})">

                                    Verify

                                </button>
                            `
                            : ""
                    }

                </span>

            `;


            paymentsList.appendChild(row);

        }
    );


    updatePaymentSummary(
        filteredPayments
    );


    const summary =
        document.getElementById(
            "paymentListSummary"
        );


    if (summary) {

        summary.textContent =
            `Showing ${filteredPayments.length} of ${adminData.payments.length} payment records`;

    }

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

function verifyPayment(index) {

    const payment =
        adminData.payments[index];


    if (!payment) {

        return;

    }


    if (payment.status === "paid") {

        return;

    }


    const student =
        adminData.students.find(
            function (student) {

                return student.id ===
                    payment.studentId;

            }
        );


    const studentName =
        student
            ? student.name
            : "Unknown Student";


    const confirmed =
        confirm(
            `Verify payment for ${studentName} for ${formatPaymentMonth(payment.month)}?`
        );


    if (!confirmed) {

        return;

    }


    payment.status =
        "paid";


    displayAdminPayments();


    alert(
        `Payment verified for ${studentName}.`
    );

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