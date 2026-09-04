// =================================
// THEME
// =================================

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");

    if (themeIcon) {
        themeIcon.textContent = "🌙";
    }

    if (themeText) {
        themeText.textContent = "Dark";
    }
}


if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        const isDarkMode =
            document.body.classList.contains("dark-mode");

        if (isDarkMode) {

            if (themeIcon) {
                themeIcon.textContent = "🌙";
            }

            if (themeText) {
                themeText.textContent = "Dark";
            }

            localStorage.setItem("theme", "dark");

        } else {

            if (themeIcon) {
                themeIcon.textContent = "☀️";
            }

            if (themeText) {
                themeText.textContent = "Light";
            }

            localStorage.setItem("theme", "light");

        }

    });

}


// =================================
// LOGIN TYPE
// =================================

const studentBtn =
    document.getElementById("studentBtn");

const facultyBtn =
    document.getElementById("facultyBtn");

const adminBtn =
    document.getElementById("adminBtn");


const userIdLabel =
    document.getElementById("userIdLabel");

const userIdInput =
    document.getElementById("userId");


if (studentBtn && facultyBtn && adminBtn) {

    studentBtn.addEventListener(
        "click",
        function () {

            studentBtn.classList.add("active");

            facultyBtn.classList.remove("active");

            adminBtn.classList.remove("active");


            userIdLabel.textContent =
                "Student ID";


            userIdInput.placeholder =
                "Enter your student ID";

        }
    );


    facultyBtn.addEventListener(
        "click",
        function () {

            facultyBtn.classList.add("active");

            studentBtn.classList.remove("active");

            adminBtn.classList.remove("active");


            userIdLabel.textContent =
                "Faculty ID";


            userIdInput.placeholder =
                "Enter your faculty ID";

        }
    );


    adminBtn.addEventListener(
        "click",
        function () {

            adminBtn.classList.add("active");

            studentBtn.classList.remove("active");

            facultyBtn.classList.remove("active");


            userIdLabel.textContent =
                "Admin ID";


            userIdInput.placeholder =
                "Enter your admin ID";

        }
    );

}

// =================================
// LOGIN
// =================================

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const userId =
                userIdInput.value.trim();

            const password =
                document.getElementById("password").value;


            const xhr =
                new XMLHttpRequest();

            xhr.open(
                "POST",
                "login",
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

					    const role = xhr.responseText
					        .split("Role: ")[1]
					        .trim();

					    if (role === "ADMIN") {

					        window.location.href =
					            "admin-dashboard.html";

					    } else if (role === "STUDENT") {

					        window.location.href =
					            "student-dashboard.html";

					    } else if (role === "FACULTY") {

					        window.location.href =
					            "faculty-dashboard.html";

					    } else {

					        alert("Unknown user role.");

					    }

					} else {

                        alert(
                            "Invalid User ID or Password."
                        );

                    }

                };


            const data =
                "userId=" +
                encodeURIComponent(userId) +
                "&password=" +
                encodeURIComponent(password);


            xhr.send(data);

        }
    );

}

// =================================
// LOGOUT
// =================================

const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        window.location.href = "index.html";

    });

}


// =================================
// FACULTY BATCH DATA
// =================================

const batches = {

    morning: {

		name: "Java Morning Batch",

		    subject: "Java Programming",

		    schedule: "Monday to Friday",

		    startDate: "01 August 2026",
			
			endDate: "01 February 2027",
			
			monthlyFee: 1500,

        topics: [
            "Introduction to Java",
            "Variables & Data Types",
            "Operators",
            "Conditional Statements",
            "Loops",
            "Arrays",
            "Classes & Objects",
            "Constructors",
            "Inheritance",
            "Polymorphism",
            "Exception Handling"
        ],
		coveredTopics: {},                    // Adding Feature

        students: [

            {
                id: "STU001",
                name: "Rahul Das",
                active: true
            },

            {
                id: "STU002",
                name: "Amit Roy",
                active: true
            },

            {
                id: "STU003",
                name: "Sneha Paul",
                active: false
            },

            {
                id: "STU004",
                name: "Riya Sen",
                active: true
            },

            {
                id: "STU005",
                name: "Arjun Dutta",
                active: true
            }

        ]

    },


    evening: {

		name: "Java Evening Batch",

		    subject: "Java Programming",

		    schedule: "Weekends",

		    startDate: "15 August 2026",
			
			endDate: "15 August 2027",
			
			monthlyFee: 1200,

        topics: [
            "Java Basics",
            "Data Types",
            "Control Flow",
            "Methods",
            "Arrays",
            "OOP Concepts",
            "Inheritance",
            "Interfaces",
            "Collections",
            "Exception Handling"
        ],
		coveredTopics: {},

        students: [

            {
                id: "STU006",
                name: "Ananya Roy",
                active: true
            },

            {
                id: "STU007",
                name: "Sourav Das",
                active: true
            },

            {
                id: "STU008",
                name: "Priya Ghosh",
                active: false
            },

            {
                id: "STU009",
                name: "Kunal Sen",
                active: true
            }

        ]

    }

};


// Keep track of currently opened batch

let currentBatch = null;

let editingBatchId = null;

// =================================
//	 DISPLAY BATCHES
// =================================

function displayBatches() {

    const batchGrid = document.getElementById("batchGrid");
	
	// to count the no. of active batch
	const activeBatchCount =
	    document.getElementById("activeBatchCount");

	if (activeBatchCount) {

	    activeBatchCount.textContent =
	        `${Object.keys(batches).length} Active Batches`;

	}
	
    if (!batchGrid) {
        return;
    }

    batchGrid.innerHTML = "";

    Object.keys(batches).forEach(function (batchId) {

        const batch = batches[batchId];

        const studentCount = batch.students.length;

        const card = document.createElement("div");

        card.className = "course-card";

        card.innerHTML = `

            <div class="course-icon">
                ☕
            </div>

            <div class="course-content">

                <h3>
                    ${batch.name}
                </h3>

				<p>
				    ${batch.subject} ·
				    ${batch.schedule}
				</p>

                <div class="course-meta">

				<span>
				    ${studentCount} Students
				</span>

				<div class="batch-actions">

				    <button
				        class="view-batch-btn"
				        onclick="viewBatch('${batchId}')">

				        View Batch →

				    </button>

				    <button
				        class="edit-batch-btn"
				        onclick="openEditBatch('${batchId}')">

				        Edit

				    </button>

				    <button
				        class="remove-batch-btn"
				        onclick="removeBatch('${batchId}')">

				        Remove

				    </button>

				</div>

                </div>

            </div>
        `;

        batchGrid.appendChild(card);

    });

}

// =================================
// DISPLAY TOPICS
// =================================

function displayTopics() {

    if (!currentBatch) {
        return;
    }

    const topicsList =
        document.getElementById("topicsList");

    if (!topicsList) {
        return;
    }

    topicsList.innerHTML = "";

    const topics =
        batches[currentBatch].topics;
		
	if (!batches[currentBatch].coveredTopics) {
		batches[currentBatch].coveredTopics = {};
	}

    topics.forEach(function (topic, index) {

        const topicElement =
            document.createElement("div");

        topicElement.className = "topic-row";

        const isCovered =
            batches[currentBatch].coveredTopics[index] === true;

        topicElement.innerHTML = `
            <span class="topic-name ${isCovered ? "topic-covered" : ""}">
                ${topic}
            </span>

			<span class="topic-status">
			    <label class="topic-check">
			        <input
			            type="checkbox"
			            ${isCovered ? "checked" : ""}
			            onchange="toggleTopicCovered(${index})">
			        <span class="checkmark">✓</span>
			    </label>
			</span>

            <span class="topic-actions">
                <button
                    type="button"
                    class="edit-topic-btn"
                    onclick="editTopic(${index})">
                    Edit
                </button>

                <button
                    type="button"
                    class="remove-topic-btn"
                    onclick="removeTopic(${index})">
                    Remove
                </button>
            </span>
        `;

        topicsList.appendChild(topicElement);

    });
}

// =================================
// TOGGLE TOPIC COVERED
// =================================

function toggleTopicCovered(index) {

    if (!currentBatch) {
        return;
    }

    const batch =
        batches[currentBatch];

    if (!batch.coveredTopics) {
        batch.coveredTopics = {};
    }

    const isCovered =
        batch.coveredTopics[index] === true;

    batch.coveredTopics[index] =
        !isCovered;

    displayTopics();
}

// =================================
// VIEW BATCH
// =================================

function viewBatch(batchId) {

    const batch = batches[batchId];

    if (!batch) {
        return;
    }

    currentBatch = batchId;


    // Show batch section

    const batchDetails =
        document.getElementById("batchDetails");

    batchDetails.style.display = "block";


    // Batch information

    document.getElementById("batchTitle")
        .textContent = batch.name;

    document.getElementById("startDate")
        .textContent = batch.startDate;

    document.getElementById("endDate")
        .textContent = batch.endDate;
		
	document.getElementById("batchSubject")
		.textContent = batch.subject;

    // Load topics

	displayTopics();


    // Load students

    displayStudents();


    // Scroll to batch details

    batchDetails.scrollIntoView({
        behavior: "smooth"
    });

}


// =================================
// DISPLAY STUDENTS
// =================================

function displayStudents() {

    if (!currentBatch) {
        return;
    }


    const studentsList =
        document.getElementById("studentsList");

    studentsList.innerHTML = "";


    const students =
        batches[currentBatch].students;


    students.forEach(function (student, index) {

        const row =
            document.createElement("div");

        row.className =
            "student-table-row";


        const status =
            student.active
                ? "Active"
                : "Inactive";


        const statusClass =
            student.active
                ? "active"
                : "inactive";


        row.innerHTML = `

            <span>
                ${student.id}
            </span>

            <span>
                ${student.name}
            </span>

            <span>

                <span class="student-status ${statusClass}">
                    ${status}
                </span>

            </span>

            <span>

                <button
                    class="remove-student-btn"
                    onclick="removeStudent(${index})">

                    Remove

                </button>

            </span>

        `;


        studentsList.appendChild(row);

    });

}


// =================================
// CLOSE BATCH
// =================================

function closeBatch() {

    const batchDetails =
        document.getElementById("batchDetails");

    batchDetails.style.display = "none";

    currentBatch = null;

}


// =================================
// OPEN ADD STUDENT
// =================================

function openAddStudent() {

    const addStudentCard =
        document.getElementById("addStudentCard");

    addStudentCard.style.display =
        "block";


    document.getElementById("newStudentId")
        .focus();

}


// =================================
// ADD STUDENT
// =================================

function addStudent() {

    const id =
        document.getElementById("newStudentId")
            .value
            .trim()
            .toUpperCase();


    const name =
        document.getElementById("newStudentName")
            .value
            .trim();


    if (!id || !name) {

        alert(
            "Please enter Student ID and Student Name."
        );

        return;

    }


    if (!currentBatch) {
        return;
    }


    const students =
        batches[currentBatch].students;


    // Check duplicate ID

    const alreadyExists =
        students.some(function (student) {

            return student.id === id;

        });


    if (alreadyExists) {

        alert(
            "A student with this ID already exists."
        );

        return;

    }


    // Add student

    students.push({

        id: id,

        name: name,

        active: true

    });


    // Refresh table

	displayStudents();
	displayBatches();
	displayAllStudents();

    // Clear form

    document.getElementById("newStudentId")
        .value = "";

    document.getElementById("newStudentName")
        .value = "";


    document.getElementById("addStudentCard")
        .style.display = "none";


    alert(
        `${name} has been added to the batch.`
    );

}


// =================================
// REMOVE STUDENT
// =================================

function removeStudent(index) {

    if (!currentBatch) {
        return;
    }


    const students =
        batches[currentBatch].students;


    const student =
        students[index];


    const confirmRemove =
        confirm(
            `Remove ${student.name} from this batch?`
        );


    if (!confirmRemove) {
        return;
    }


    students.splice(index, 1);


	displayStudents();
	displayBatches();
	displayAllStudents();

}

// =================================
// FORMAT DATE FOR INPUT
// =================================

function formatDateForInput(dateValue) {

    if (!dateValue || dateValue === "Not specified") {
        return "";
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
        return dateValue;
    }

    const date = new Date(dateValue);

    if (isNaN(date.getTime())) {
        return "";
    }

    const year = date.getFullYear();

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

// =================================
// OPEN EDIT BATCH
// =================================

function openEditBatch(batchId) {

    const batch = batches[batchId];

    if (!batch) {
        return;
    }

    editingBatchId = batchId;

    const addBatchCard =
        document.getElementById("addBatchCard");

    addBatchCard.style.display = "block";

    document.getElementById("batchFormTitle")
        .textContent = "Edit Batch";

    document.getElementById("saveBatchBtn")
        .textContent = "Save Changes";

    document.getElementById("newBatchName").value =
        batch.name;

    document.getElementById("newBatchSubject").value =
        batch.subject || "";

    document.getElementById("newBatchSchedule").value =
        batch.schedule || "";

    document.getElementById("newBatchStartDate").value =
        formatDateForInput(batch.startDate);

    document.getElementById("newBatchEndDate").value =
        formatDateForInput(batch.endDate);

    document.getElementById("newBatchName").focus();

}

// =================================
// OPEN ADD BATCH
// =================================

function openAddBatch() {

    editingBatchId = null;

    const addBatchCard =
        document.getElementById("addBatchCard");

    addBatchCard.style.display = "block";

    document.getElementById("batchFormTitle")
        .textContent = "Create Batch";

    document.getElementById("saveBatchBtn")
        .textContent = "Create Batch";

    document.getElementById("newBatchName").value = "";
    document.getElementById("newBatchSubject").value = "";
    document.getElementById("newBatchSchedule").value = "";
    document.getElementById("newBatchStartDate").value = "";
    document.getElementById("newBatchEndDate").value = "";

    document.getElementById("newBatchName").focus();

}


// =================================
// CLOSE ADD BATCH
// =================================

function closeAddBatch() {

    const addBatchCard =
        document.getElementById("addBatchCard");

    addBatchCard.style.display = "none";

}

// =================================
// OPEN ADD TOPIC
// =================================

function openAddTopic() {

    const addTopicCard =
        document.getElementById("addTopicCard");

    addTopicCard.style.display = "block";

    document.getElementById("newTopicName").value = "";

    document.getElementById("newTopicName").focus();

}

// =================================
// CLOSE ADD TOPIC
// =================================

function closeAddTopic() {

    const addTopicCard =
        document.getElementById("addTopicCard");

    addTopicCard.style.display = "none";

}

// =================================
// ADD TOPIC
// =================================

function addTopic() {

    if (!currentBatch) {
        return;
    }

    const topicName =
        document.getElementById("newTopicName")
            .value
            .trim();


    if (!topicName) {

        alert("Please enter a topic name.");

        return;
    }


    const topics =
        batches[currentBatch].topics;


    // Check duplicate topic

    const alreadyExists =
        topics.some(function (topic) {

            return topic.toLowerCase() ===
                   topicName.toLowerCase();

        });


    if (alreadyExists) {

        alert(
            "This topic already exists in the batch."
        );

        return;
    }


    // Add topic

    topics.push(topicName);


    // Refresh topics

    displayTopics();


    closeAddTopic();


    document.getElementById("newTopicName").value = "";


    alert(
        `${topicName} has been added to the batch.`
    );

}

// =================================
// EDIT TOPIC
// =================================

function editTopic(index) {

    if (!currentBatch) {
        return;
    }

    const topics =
        batches[currentBatch].topics;

    const oldTopic =
        topics[index];

    const newTopic =
        prompt(
            "Edit topic name:",
            oldTopic
        );


    if (newTopic === null) {
        return;
    }


    const trimmedTopic =
        newTopic.trim();


    if (!trimmedTopic) {

        alert(
            "Topic name cannot be empty."
        );

        return;
    }


    const duplicate =
        topics.some(function (topic, topicIndex) {

            return topicIndex !== index &&
                topic.toLowerCase() ===
                trimmedTopic.toLowerCase();

        });


    if (duplicate) {

        alert(
            "This topic already exists."
        );

        return;
    }


    topics[index] =
        trimmedTopic;


    displayTopics();

}

// =================================
// REMOVE TOPIC
// =================================

function removeTopic(index) {

    if (!currentBatch) {
        return;
    }

    const topics =
        batches[currentBatch].topics;

    const topic =
        topics[index];


    const confirmRemove =
        confirm(
            `Remove "${topic}" from this batch?`
        );


    if (!confirmRemove) {
        return;
    }


    topics.splice(index, 1);


    displayTopics();

}

// =================================
// ADD BATCH
// =================================

function addBatch() {

    const name =
        document.getElementById("newBatchName")
            .value
            .trim();

    const subject =
        document.getElementById("newBatchSubject")
            .value
            .trim();

    const schedule =
        document.getElementById("newBatchSchedule")
            .value
            .trim();

    const startDate =
        document.getElementById("newBatchStartDate")
            .value;

    const endDate =
        document.getElementById("newBatchEndDate")
            .value;


    if (!name || !subject || !schedule) {

        alert(
            "Please enter Batch Name, Subject and Schedule."
        );

        return;
    }


	if (editingBatchId) {

	    // Update existing batch

	    const batch =
	        batches[editingBatchId];

	    batch.name = name;
	    batch.subject = subject;
	    batch.schedule = schedule;

	    batch.startDate =
	        startDate || "Not specified";

	    batch.endDate =
	        endDate || "Not specified";

	    alert(
	        `${name} has been updated successfully.`
	    );

	} else {

	    // Create new batch

	    const batchId =
	        "batch" + Date.now();

	    batches[batchId] = {

	        name: name,

	        subject: subject,

	        schedule: schedule,

	        startDate:
	            startDate || "Not specified",

	        endDate:
	            endDate || "Not specified",

	        topics: [],

	        students: []

	    };

	    alert(
	        `${name} has been created successfully.`
	    );

	}

    displayBatches();

    closeAddBatch();
	
	editingBatchId = null;


    document.getElementById("newBatchName").value = "";
    document.getElementById("newBatchSubject").value = "";
    document.getElementById("newBatchSchedule").value = "";
    document.getElementById("newBatchStartDate").value = "";
    document.getElementById("newBatchEndDate").value = "";

}

// =================================
// REMOVE BATCH
// =================================

function removeBatch(batchId) {

    const batch = batches[batchId];

    if (!batch) {
        return;
    }

    const confirmRemove = confirm(
        `Remove ${batch.name}?\n\nThis batch will be removed from My Batches.`
    );

    if (!confirmRemove) {
        return;
    }

    delete batches[batchId];

    // If this batch is currently open,
    // close its details section
    if (currentBatch === batchId) {
        closeBatch();
    }

    // Refresh batch cards
    displayBatches();

}

// Display batches when the faculty dashboard loads

displayBatches();

// =================================
// OPEN MY BATCHES
// =================================

function openMyBatches() {

    const myBatchesSection =
        document.getElementById("myBatchesSection");

    if (!myBatchesSection) {
        return;
    }

    myBatchesSection.scrollIntoView({
        behavior: "smooth"
    });
}

// =================================
// DISPLAY ALL STUDENTS
// =================================

function displayAllStudents() {

    const studentsList =
        document.getElementById("allStudentsList");

    if (!studentsList) {
        return;
    }

    studentsList.innerHTML = "";

    Object.keys(batches).forEach(function (batchId) {

        const batch = batches[batchId];

        batch.students.forEach(function (student) {

            const row =
                document.createElement("div");

            row.className =
                "student-table-row";

            const status =
                student.active
                    ? "Active"
                    : "Inactive";

            const statusClass =
                student.active
                    ? "active"
                    : "inactive";

            row.innerHTML = `
                <span>
                    ${student.id}
                </span>

                <span>
                    ${student.name}
                </span>

                <span>
                    ${batch.name}
                </span>

                <span>
                    <span class="student-status ${statusClass}">
                        ${status}
                    </span>
                </span>
            `;

            studentsList.appendChild(row);

        });

    });
}

// =================================
// OPEN STUDENTS
// =================================

function openStudents() {

    displayAllStudents();

    const studentsSection =
        document.getElementById("studentsSection");

    if (!studentsSection) {
        return;
    }
	studentsSection.style.display = "block";

    studentsSection.scrollIntoView({
        behavior: "smooth"
    });
}

// =================================
// CLOSE STUDENTS
// =================================

function closeStudents() {

    const studentsSection =
        document.getElementById("studentsSection");

    if (!studentsSection) {
        return;
    }

    studentsSection.style.display = "none";
}

// =================================
// DISPLAY AVAILABLE COURSES
// =================================

function displayAvailableCourses() {

    const coursesList =
        document.getElementById(
            "availableCoursesList"
        );

    if (!coursesList) {
        return;
    }

    coursesList.innerHTML = "";

    // First get the student's enrollments
    const enrollmentXhr =
        new XMLHttpRequest();

    enrollmentXhr.open(
        "GET",
        "student-enrollments",
        true
    );

    enrollmentXhr.onreadystatechange =
        function () {

            if (enrollmentXhr.readyState !== 4) {
                return;
            }

            if (enrollmentXhr.status !== 200) {
                return;
            }

            const enrollments =
                JSON.parse(
                    enrollmentXhr.responseText
                );

            const enrolledBatches =
                new Set();

            enrollments.forEach(
                function (enrollment) {

                    enrolledBatches.add(
                        enrollment.batchName
                    );
                }
            );

            // Now get all active batches from MySQL
            const batchXhr =
                new XMLHttpRequest();

            batchXhr.open(
                "GET",
                "batches",
                true
            );

            batchXhr.onreadystatechange =
                function () {

                    if (batchXhr.readyState !== 4) {
                        return;
                    }

                    if (batchXhr.status !== 200) {
                        return;
                    }

                    const availableBatches =
                        JSON.parse(
                            batchXhr.responseText
                        );

                    let availableCount = 0;

                    availableBatches.forEach(
                        function (batch) {

                            // Hide batches already enrolled
                            if (
                                enrolledBatches.has(
                                    batch.name
                                )
                            ) {
                                return;
                            }

                            availableCount++;

                            const card =
                                document.createElement(
                                    "div"
                                );

                            card.className =
                                "course-card";

                            card.innerHTML = `

                                <div class="course-icon">
                                    ☕
                                </div>

                                <div class="course-content">

                                    <h3>
                                        ${batch.name}
                                    </h3>

                                    <p>
                                        ${batch.subject} ·
                                        ${batch.schedule}
                                    </p>

                                    <div class="course-meta">

                                        <span>
                                            ₹${batch.monthlyFee} / month
                                        </span>

                                        <button
                                            type="button"
                                            class="view-batch-btn"
                                            onclick="enrollStudent('${batch.name}')">

                                            Enroll

                                        </button>

                                    </div>

                                </div>
                            `;

                            coursesList.appendChild(
                                card
                            );
                        }
                    );

                    if (availableCount === 0) {

                        coursesList.innerHTML = `

                            <div class="no-courses-message">

                                <div class="no-courses-icon">
                                    📚
                                </div>

                                <h3>
                                    No Courses Available
                                </h3>

                                <p>
                                    There are no courses available
                                    for enrollment at the moment.
                                    Please check back later.
                                </p>

                            </div>
                        `;
                    }
                };

            batchXhr.send();
        };

    enrollmentXhr.send();
}
displayBatches();
displayAvailableCourses();
displayMyBatches();

// =================================
// ENROLL STUDENT
// =================================

function enrollStudent(batchName) {

    if (!batchName) {
        return;
    }

    const xhr =
        new XMLHttpRequest();

    xhr.open(
        "POST",
        "enroll-student",
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

                displayAvailableCourses();

                displayMyBatches();

                alert(
                    `You have successfully enrolled in ${batchName}.`
                );

            } else if (xhr.status === 409) {

                alert(
                    `You are already enrolled in ${batchName}.`
                );

            } else {

                alert(
                    xhr.responseText ||
                    "Unable to enroll in this batch."
                );
            }
        };

    const data =
        "batchName=" +
        encodeURIComponent(batchName);

    xhr.send(data);
}
// =================================
// DISPLAY MY BATCHES
// =================================

function displayMyBatches() {

    const myBatchesList =
        document.getElementById("myBatchesList");

    if (!myBatchesList) {
        return;
    }

    myBatchesList.innerHTML = "";

    const xhr =
        new XMLHttpRequest();

    xhr.open(
        "GET",
        "student-enrollments",
        true
    );

    xhr.onreadystatechange = function () {

        if (xhr.readyState !== 4) {
            return;
        }

        if (xhr.status !== 200) {
            return;
        }

        const enrollments =
            JSON.parse(xhr.responseText);

        enrollments.forEach(
            function (enrollment) {

                const batchId =
                    enrollment.batchId;

                const batchXhr =
                    new XMLHttpRequest();

                batchXhr.open(
                    "GET",
                    "batch?id=" +
                    encodeURIComponent(batchId),
                    true
                );

                batchXhr.onreadystatechange =
                    function () {

                        if (
                            batchXhr.readyState !== 4
                        ) {
                            return;
                        }

                        if (
                            batchXhr.status !== 200
                        ) {
                            return;
                        }

                        const batch =
                            JSON.parse(
                                batchXhr.responseText
                            );

                        const card =
                            document.createElement(
                                "div"
                            );

                        card.className =
                            "course-card";

                        card.innerHTML = `
                            <div class="course-icon">
                                ☕
                            </div>

                            <div class="course-content">

                                <h3>
                                    ${batch.name}
                                </h3>

                                <p>
                                    ${batch.subject}
                                </p>

                                <div class="course-meta">

                                    <span>
                                        ${batch.schedule}
                                    </span>

                                    <button
                                        type="button"
                                        class="view-batch-btn"
                                        onclick="viewStudentBatch(${batch.id})">

                                        View Batch →

                                    </button>

                                </div>

                            </div>
                        `;

                        myBatchesList.appendChild(
                            card
                        );

                    };

                batchXhr.send();

            }
        );

    };

    xhr.send();
}

// =================================
// VIEW STUDENT BATCH
// =================================

function viewStudentBatch(batchId) {

    const batchDetails =
        document.getElementById("studentBatchDetails");

    if (!batchDetails) {
        return;
    }

    const xhr =
        new XMLHttpRequest();

    xhr.open(
        "GET",
        "batch?id=" +
        encodeURIComponent(batchId),
        true
    );

    xhr.onreadystatechange = function () {

        if (xhr.readyState !== 4) {
            return;
        }

        if (xhr.status !== 200) {

            alert(
                "Unable to load batch details."
            );

            return;
        }

        const batch =
            JSON.parse(
                xhr.responseText
            );


        // =================================
        // BATCH INFORMATION FROM DATABASE
        // =================================

        document.getElementById(
            "studentBatchTitle"
        ).textContent =
            batch.name;


        document.getElementById(
            "studentBatchTeacher"
        ).textContent =
            batch.teacher ||
            "Not specified";


        document.getElementById(
            "studentBatchStartDate"
        ).textContent =
            batch.startDate ||
            "Not specified";


        document.getElementById(
            "studentBatchEndDate"
        ).textContent =
            batch.endDate ||
            "Not specified";


        document.getElementById(
            "studentBatchFee"
        ).textContent =
            `₹${batch.monthlyFee || 0}`;


        // =================================
        // CONNECT DATABASE BATCH
        // TO OLD TOPICS / FEES DATA
        // =================================

        const frontendBatchId =
            Object.keys(batches).find(
                function (id) {

                    return (
                        batches[id].name ===
                        batch.name
                    );

                }
            );


        if (frontendBatchId) {

			displayStudentTopics(
			    batch.id
			);

			displayStudentFees(
			    batch.id
			);

        }


        // =================================
        // SHOW DETAILS
        // =================================

        batchDetails.style.display =
            "block";


        batchDetails.scrollIntoView({
            behavior: "smooth"
        });

    };

    xhr.send();
}
// =================================
// EDIT STUDENT PROFILE
// =================================

function toggleStudentProfileEdit() {

    const editForm =
        document.getElementById("studentProfileEdit");

    if (!editForm) {
        return;
    }

    const isHidden =
        editForm.style.display === "none";

    editForm.style.display =
        isHidden ? "grid" : "none";

}

// =================================
// SAVE STUDENT PROFILE
// =================================

function saveStudentProfile() {

    const name =
        document.getElementById(
            "editStudentName"
        ).value.trim();

    const phone =
        document.getElementById(
            "editStudentPhone"
        ).value.trim();

    const email =
        document.getElementById(
            "editStudentEmail"
        ).value.trim();

    const address =
        document.getElementById(
            "editStudentAddress"
        ).value.trim();


    if (!name || !phone || !email || !address) {

        alert(
            "Please fill in all profile fields."
        );

        return;
    }


    const xhr =
        new XMLHttpRequest();

    xhr.open(
        "POST",
        "update-student-profile",
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

                document.getElementById(
                    "studentProfileName"
                ).textContent = name;


                document.getElementById(
                    "profileStudentFullName"
                ).textContent = name;


                document.getElementById(
                    "profileStudentPhone"
                ).textContent = phone;


                document.getElementById(
                    "profileStudentEmail"
                ).textContent = email;


                document.getElementById(
                    "profileStudentAddress"
                ).textContent = address;


                const avatar =
                    document.querySelector(
                        ".student-avatar"
                    );

                if (avatar) {

                    avatar.textContent =
                        name
                            .charAt(0)
                            .toUpperCase();
                }


                document.getElementById(
                    "studentProfileEdit"
                ).style.display = "none";


                alert(
                    "Profile updated successfully."
                );

            } else {

                alert(
                    xhr.responseText ||
                    "Unable to update profile."
                );
            }
        };


    const data =
        "phone=" +
        encodeURIComponent(phone) +
        "&email=" +
        encodeURIComponent(email) +
        "&address=" +
        encodeURIComponent(address);


    xhr.send(data);
}

// =================================
// DISPLAY STUDENT TOPICS
// =================================

function displayStudentTopics(batchId) {

    const topicsList =
        document.getElementById("studentTopicsList");

    if (!topicsList) {
        return;
    }

    topicsList.innerHTML = "";

    const xhr =
        new XMLHttpRequest();

    xhr.open(
        "GET",
        "batch-topics?batchId=" +
        encodeURIComponent(batchId),
        true
    );

    xhr.onreadystatechange = function () {

        if (xhr.readyState !== 4) {
            return;
        }

        if (xhr.status !== 200) {
            topicsList.innerHTML =
                "<p>Unable to load course topics.</p>";
            return;
        }

        const topics =
            JSON.parse(xhr.responseText);

        if (topics.length === 0) {

            topicsList.innerHTML =
                "<p>No course topics available.</p>";

            return;
        }

		topics.forEach(function (topic) {

		    const topicElement =
		        document.createElement("div");

		    topicElement.className =
		        topic.covered
		            ? "student-topic-row covered"
		            : "student-topic-row not-covered";

		    topicElement.innerHTML = `
		        <div class="student-topic-left">

		            <span class="student-topic-icon">
		                ${topic.covered ? "✓" : "○"}
		            </span>

		            <span class="student-topic-name">
		                ${topic.topicName}
		            </span>

		        </div>

		        <span class="student-topic-status">
		            ${topic.covered
		                ? "✓ Covered"
		                : "○ Not Covered"}
		        </span>
		    `;

		    topicsList.appendChild(
		        topicElement
		    );

		});

    };

    xhr.send();
}

// =================================
// DISPLAY STUDENT FEES
// =================================

function displayStudentFees(batchId) {

    const feesContainer =
        document.getElementById("studentBatchFees");

    const monthlyFee =
        document.getElementById("studentMonthlyFee");

    if (!feesContainer) {
        return;
    }

    feesContainer.innerHTML = "";

    const xhr =
        new XMLHttpRequest();

    xhr.open(
        "GET",
        "student-fees?batchId=" +
        encodeURIComponent(batchId),
        true
    );

    xhr.onreadystatechange = function () {

        if (xhr.readyState !== 4) {
            return;
        }

        if (xhr.status !== 200) {

            feesContainer.innerHTML =
                "<p>Unable to load fee structure.</p>";

            return;
        }

        const fees =
            JSON.parse(
                xhr.responseText
            );


        // =================================
        // DISPLAY MONTHLY FEE
        // =================================

        if (
            monthlyFee &&
            fees.length > 0
        ) {

            monthlyFee.textContent =
                `₹${fees[0].amount} / month`;

        }


        // =================================
        // NO FEE RECORDS
        // =================================

        if (fees.length === 0) {

            feesContainer.innerHTML =
                "<p>No fee records available.</p>";

            return;
        }


        // =================================
        // DISPLAY FEE RECORDS
        // =================================

        fees.forEach(function (fee) {

            const row =
                document.createElement("div");

            row.className =
                "fee-row";


            // =================================
            // FORMAT MONTH
            // =================================

            const monthDate =
                new Date(fee.feeMonth);

            const monthName =
                monthDate.toLocaleDateString(
                    "en-IN",
                    {
                        month: "long",
                        year: "numeric"
                    }
                );


            // =================================
            // FEE ROW
            // =================================

            row.innerHTML = `

                <span>
                    ${monthName}
                </span>

                <span>
                    ₹${fee.amount}
                </span>

                <span class="fee-status-action">

                    <span class="status ${
                        fee.status === "PAID"
                            ? "paid"
                            : "pending"
                    }">

                        ${
                            fee.status === "PAID"
                                ? "Paid"
                                : "Pending"
                        }

                    </span>


                    ${
                        fee.status === "PAID"
                            ? ""
                            : `
                                <button
                                    type="button"
                                    class="pay-now-btn"
                                    onclick="startPayment(
                                        ${fee.batchId},
                                        '${fee.feeMonth}'
                                    )">

                                    Pay Now

                                </button>
                            `
                    }

                </span>

            `;


            feesContainer.appendChild(
                row
            );

        });

    };

    xhr.send();
}

// =================================
// START PAYMENT
// =================================

function startPayment(batchId, month) {

    const xhr =
        new XMLHttpRequest();

    xhr.open(
        "GET",
        "batch?id=" +
        encodeURIComponent(batchId),
        true
    );

    xhr.onreadystatechange =
        function () {

            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status !== 200) {

                alert(
                    "Unable to load payment details."
                );

                return;
            }

            const batch =
                JSON.parse(
                    xhr.responseText
                );

            alert(
                `Payment gateway will be connected here.\n\n` +
                `Batch: ${batch.name}\n` +
                `Month: ${month}\n` +
                `Amount: ₹${batch.monthlyFee}`
            );

        };

    xhr.send();
}
// =================================
// CLOSE STUDENT BATCH
// =================================

function closeStudentBatch() {

    const batchDetails =
        document.getElementById("studentBatchDetails");

    if (!batchDetails) {
        return;
    }

    batchDetails.style.display = "none";

}

// =================================
// LOAD STUDENT PROFILE
// =================================

function loadStudentProfile() {

    const xhr =
        new XMLHttpRequest();

    xhr.open(
        "GET",
        "student-profile",
        true
    );

    xhr.onreadystatechange =
        function () {

            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status !== 200) {
                return;
            }

            const student =
                JSON.parse(xhr.responseText);

            const profileName =
                document.getElementById(
                    "profileStudentFullName"
                );

            const profileId =
                document.getElementById(
                    "profileStudentId"
                );

            const studentBatch =
                document.getElementById(
                    "studentBatch"
                );

            const welcome =
                document.getElementById(
                    "studentWelcome"
                );


				if (profileName) {
				    profileName.textContent =
				        student.name;
				}

				const profileHeading =
				    document.getElementById(
				        "studentProfileName"
				    );

				if (profileHeading) {
				    profileHeading.textContent =
				        student.name;
				}


            if (profileId) {

                profileId.textContent =
                    student.id;

            }


            if (studentBatch) {

                studentBatch.textContent =
                    student.batch;

            }
			
			const profilePhone =
			    document.getElementById(
			        "profileStudentPhone"
			    );

			const profileEmail =
			    document.getElementById(
			        "profileStudentEmail"
			    );

			const profileAddress =
			    document.getElementById(
			        "profileStudentAddress"
			    );

			if (profilePhone) {
			    profilePhone.textContent =
			        student.phone || "";
			}

			if (profileEmail) {
			    profileEmail.textContent =
			        student.email || "";
			}

			if (profileAddress) {
			    profileAddress.textContent =
			        student.address || "";
			}


            if (welcome) {

                welcome.textContent =
                    "Welcome back, " +
                    student.name +
                    "!";

            }

        };

    xhr.send();
}

loadStudentProfile();