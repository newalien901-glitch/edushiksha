// EduShiksha - Modern STEM Learning Platform
// Global variables
let currentUser = null;
let currentGrade = '';
let currentSubject = '';
let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let quizScore = 0;
let userPoints = {
    science: 0,
    technology: 0,
    engineering: 0,
    mathematics: 0,
    total: 0
};
let isLoginMode = true;
let progressChart = null;
let completedChallenges = new Set();

// STEM educational content organized by grade (6-12) with Odisha context
const stemContent = {
    science: {
        6: {
            title: "Science Grade 6 - Odisha Wonders",
            videos: [
                {
                    title: "Plants Around Bhubaneswar",
                    description: "Explore the diverse flora in Odisha's capital city",
                    videoId: "pKNjrqlpOsU"
                },
                {
                    title: "Weather Patterns in Odisha",
                    description: "Understanding monsoons and coastal weather",
                    videoId: "5AFzrWvjfqU"
                },
                {
                    title: "Chilika Lake Ecosystem",
                    description: "Asia's largest brackish water lagoon",
                    videoId: "rRoQJlKGOzw"
                }
            ],
            quiz: [
                {
                    question: "Which tree is sacred in many Odia villages?",
                    options: ["Banyan", "Mango", "Neem", "Coconut"],
                    correct: 0
                },
                {
                    question: "Chilika Lake is famous for which bird?",
                    options: ["Peacock", "Flamingo", "Parrot", "Eagle"],
                    correct: 1
                },
                {
                    question: "The monsoon in Odisha comes from which direction?",
                    options: ["North", "South-West", "East", "West"],
                    correct: 1
                },
                {
                    question: "Which mineral is abundantly found in Odisha?",
                    options: ["Gold", "Silver", "Iron ore", "Copper"],
                    correct: 2
                },
                {
                    question: "The soil in coastal Odisha is mostly:",
                    options: ["Sandy", "Clay", "Loamy", "Rocky"],
                    correct: 0
                }
            ]
        },
        7: {
            title: "Science Grade 7 - Odisha's Natural Resources",
            videos: [
                {
                    title: "Mining in Odisha",
                    description: "Understanding mineral extraction and its impact",
                    videoId: "mXMofxtDPUQ"
                },
                {
                    title: "Forests of Eastern Ghats",
                    description: "Biodiversity in Odisha's hill ranges",
                    videoId: "7kAhOw_p_lU"
                }
            ],
            quiz: [
                {
                    question: "Which national park in Odisha is famous for tigers?",
                    options: ["Kaziranga", "Simlipal", "Sundarbans", "Corbett"],
                    correct: 1
                },
                {
                    question: "The Hirakud Dam is built on which river?",
                    options: ["Ganga", "Mahanadi", "Godavari", "Narmada"],
                    correct: 1
                },
                {
                    question: "Which is the main cash crop of Odisha?",
                    options: ["Wheat", "Rice", "Cotton", "Sugarcane"],
                    correct: 1
                },
                {
                    question: "The pH of soil in Odisha's rice fields is generally:",
                    options: ["Acidic", "Neutral", "Basic", "Varies greatly"],
                    correct: 0
                },
                {
                    question: "Which cyclone commonly affects Odisha?",
                    options: ["Nor'easter", "Hurricane", "Tropical cyclone", "Tornado"],
                    correct: 2
                }
            ]
        }
    },
    technology: {
        6: {
            title: "Technology Grade 6 - Digital Odisha",
            videos: [
                {
                    title: "Introduction to Computers",
                    description: "Basic computer literacy for students",
                    videoId: "Tx_UAFF1eIg"
                },
                {
                    title: "Internet and Communication",
                    description: "How technology connects Odisha to the world",
                    videoId: "uCgYeXSoO-4"
                }
            ],
            quiz: [
                {
                    question: "Which is the input device?",
                    options: ["Monitor", "Keyboard", "Speaker", "Printer"],
                    correct: 1
                },
                {
                    question: "The brain of a computer is:",
                    options: ["RAM", "Hard disk", "CPU", "Monitor"],
                    correct: 2
                },
                {
                    question: "Which programming language is easiest for beginners?",
                    options: ["C++", "Python", "Assembly", "Machine code"],
                    correct: 1
                },
                {
                    question: "What does WWW stand for?",
                    options: ["World Wide Web", "World Wide Word", "Web World Wide", "Wide World Web"],
                    correct: 0
                },
                {
                    question: "Which is an example of system software?",
                    options: ["MS Word", "Operating System", "Calculator", "Games"],
                    correct: 1
                }
            ]
        },
        7: {
            title: "Technology Grade 7 - Programming Basics",
            videos: [
                {
                    title: "Introduction to Programming",
                    description: "Basic programming concepts and logic",
                    videoId: "D5NqA_HCGQ8"
                }
            ],
            quiz: [
                {
                    question: "In programming, what is a variable?",
                    options: ["A fixed value", "A storage location", "A function", "An error"],
                    correct: 1
                },
                {
                    question: "Which symbol is used for comments in Python?",
                    options: ["//", "#", "/* */", "--"],
                    correct: 1
                },
                {
                    question: "What does 'debugging' mean?",
                    options: ["Writing code", "Running code", "Finding errors", "Deleting code"],
                    correct: 2
                },
                {
                    question: "A loop in programming is used to:",
                    options: ["Store data", "Repeat instructions", "Display output", "Get input"],
                    correct: 1
                },
                {
                    question: "Which is a programming language?",
                    options: ["HTML", "Python", "CSS", "All of these"],
                    correct: 3
                }
            ]
        }
    },
    engineering: {
        6: {
            title: "Engineering Grade 6 - Building Odisha",
            videos: [
                {
                    title: "Bridges and Infrastructure",
                    description: "How engineers build structures in Odisha",
                    videoId: "rDbqXVWGsrc"
                }
            ],
            quiz: [
                {
                    question: "The Kalinga Stadium in Bhubaneswar is an example of:",
                    options: ["Civil engineering", "Mechanical engineering", "Electrical engineering", "Software engineering"],
                    correct: 0
                },
                {
                    question: "Which engineering principle helps build strong foundations?",
                    options: ["Gravity", "Distribution of load", "Color theory", "Sound waves"],
                    correct: 1
                },
                {
                    question: "The best shape for distributing weight is:",
                    options: ["Square", "Circle", "Triangle", "Rectangle"],
                    correct: 2
                },
                {
                    question: "Engineers use which process to solve problems?",
                    options: ["Guessing", "Design thinking", "Random testing", "Copying"],
                    correct: 1
                },
                {
                    question: "Which material is strongest in tension?",
                    options: ["Wood", "Steel", "Concrete", "Plastic"],
                    correct: 1
                }
            ]
        },
        7: {
            title: "Engineering Grade 7 - Sustainable Solutions",
            quiz: [
                {
                    question: "Solar panels work best when facing which direction?",
                    options: ["North", "South", "East", "West"],
                    correct: 1
                },
                {
                    question: "Which is a renewable energy source used in Odisha?",
                    options: ["Coal", "Solar", "Natural gas", "Petroleum"],
                    correct: 1
                },
                {
                    question: "The engineering design process starts with:",
                    options: ["Building", "Testing", "Identifying the problem", "Marketing"],
                    correct: 2
                },
                {
                    question: "Which engineering field deals with water management?",
                    options: ["Mechanical", "Civil", "Electrical", "Computer"],
                    correct: 1
                },
                {
                    question: "Recycling is an example of:",
                    options: ["Waste management", "Sustainable engineering", "Environmental care", "All of these"],
                    correct: 3
                }
            ]
        }
    },
    mathematics: {
        6: {
            title: "Mathematics Grade 6 - Numbers Around Odisha",
            videos: [
                {
                    title: "Fractions and Decimals",
                    description: "Understanding parts and wholes using local examples",
                    videoId: "LGqOH3sYmQI"
                }
            ],
            quiz: [
                {
                    question: "If a traditional Odia thali has 12 items and you eat 1/4 of them, how many items did you eat?",
                    options: ["2", "3", "4", "6"],
                    correct: 1
                },
                {
                    question: "The Jagannath Temple has 4 main gates. What fraction represents each gate?",
                    options: ["1/2", "1/3", "1/4", "1/5"],
                    correct: 2
                },
                {
                    question: "If 1 kg of rice costs ₹40, what will 2.5 kg cost?",
                    options: ["₹80", "₹100", "₹120", "₹140"],
                    correct: 1
                },
                {
                    question: "In a class of 30 students, 18 are from villages. What percentage is this?",
                    options: ["50%", "60%", "70%", "80%"],
                    correct: 1
                },
                {
                    question: "The perimeter of a square field is 200 meters. What is the length of each side?",
                    options: ["40m", "50m", "60m", "100m"],
                    correct: 1
                }
            ]
        },
        7: {
            title: "Mathematics Grade 7 - Algebra and Geometry",
            quiz: [
                {
                    question: "If x + 5 = 12, then x = ?",
                    options: ["5", "6", "7", "8"],
                    correct: 2
                },
                {
                    question: "The area of a rectangle with length 8m and width 6m is:",
                    options: ["14 sq m", "28 sq m", "48 sq m", "56 sq m"],
                    correct: 2
                },
                {
                    question: "Which of these is a prime number?",
                    options: ["15", "21", "23", "25"],
                    correct: 2
                },
                {
                    question: "(-5) + (+3) = ?",
                    options: ["-8", "-2", "2", "8"],
                    correct: 1
                },
                {
                    question: "The sum of angles in a triangle is:",
                    options: ["90°", "180°", "270°", "360°"],
                    correct: 1
                }
            ]
        }
    }
};

// Enhanced coding challenges with proper drag-drop simulation
const codingChallenges = {
    basic: {
        title: "Hello Odisha - Your First Program",
        description: "Create your first program to greet the beautiful state of Odisha! Programming is like writing a recipe that a computer can follow.",
        example: `print("Namaskar, Odisha!")`,
        solution: 'print("namaskar, odisha!")',
        hint: "Use the print() function to display a greeting to Odisha",
        points: 15,
        blocks: [
            'print(',
            '"Namaskar, Odisha!"',
            ')'
        ]
    },
    loops: {
        title: "Count the Jagannath Rath Wheels",
        description: "Use loops to count like we count the wheels of Lord Jagannath's chariot during Rath Yatra. Loops help us repeat actions efficiently.",
        example: `for wheel in range(1, 17):
    print("Wheel number:", wheel)`,
        solution: `for wheel in range(1, 17):
    print("wheel number:", wheel)`,
        hint: "Use a for loop with range(1, 17) to count the 16 wheels of the chariot",
        points: 25,
        blocks: [
            'for wheel in range(1, 17):',
            '    print("Wheel number:", wheel)'
        ]
    },
    functions: {
        title: "Calculate Rice Field Area",
        description: "Create a function to calculate the area of rice fields in Odisha. Functions help farmers and engineers solve problems efficiently.",
        example: `def calculate_field_area(length, width):
    area = length * width
    return area

rice_field = calculate_field_area(50, 30)
print("Rice field area:", rice_field, "sq meters")`,
        solution: `def calculate_field_area(length, width):
    area = length * width
    return area

rice_field = calculate_field_area(50, 30)
print("rice field area:", rice_field, "sq meters")`,
        hint: "Create a function that multiplies length and width to find the area of a field",
        points: 35,
        blocks: [
            'def calculate_field_area(length, width):',
            '    area = length * width',
            '    return area',
            '',
            'rice_field = calculate_field_area(50, 30)',
            'print("Rice field area:", rice_field, "sq meters")'
        ]
    }
};

// Initialize the application
function initializeApp() {
    console.log('🌟 EduShiksha - Initializing beautiful STEM learning platform...');
    
    // Show home section by default
    showSection('home');
    
    // Set up all event listeners
    setupNavigation();
    setupAuthentication();
    setupModalHandlers();
    
    // Load saved progress (simulated)
    loadUserProgress();
    
    console.log('✅ EduShiksha platform initialized successfully!');
}

// Navigation system with proper login flow
function setupNavigation() {
    console.log('🧭 Setting up navigation system...');
    
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            if (section) {
                console.log(`Navigation to: ${section}`);
                
                // Check if user is logged in for protected sections
                const protectedSections = ['dashboard', 'learn', 'quiz', 'code', 'progress'];
                if (protectedSections.includes(section) && !currentUser) {
                    showSection('login');
                    showSuccessModal('Please log in to access the learning platform and start earning points!');
                    return;
                }
                
                showSection(section);
            }
        });
    });
    
    console.log(`✅ Navigation system ready`);
}

// Authentication system with grade and role selection
function setupAuthentication() {
    console.log('🔐 Setting up authentication...');
    
    // Toggle between login and signup
    window.toggleAuthMode = function() {
        isLoginMode = !isLoginMode;
        updateAuthInterface();
    };
    
    // Role selection handlers
    const roleButtons = document.querySelectorAll('.role-btn');
    roleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all role buttons
            roleButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
        });
    });
    
    // Handle form submission
    window.handleAuth = function() {
        const email = document.getElementById('authEmail').value.trim();
        const password = document.getElementById('authPassword').value.trim();
        
        if (!email || !password) {
            showSuccessModal('Please fill in all required fields to continue your STEM learning journey!');
            return;
        }
        
        if (!isLoginMode) {
            // Signup mode - need grade and role
            const grade = document.getElementById('studentGrade').value;
            const selectedRole = document.querySelector('.role-btn.active');
            
            if (!grade) {
                showSuccessModal('Please select your grade level (6-12) to access appropriate STEM content!');
                return;
            }
            
            if (!selectedRole) {
                showSuccessModal('Please select whether you are a student or teacher!');
                return;
            }
            
            // Create user account
            currentUser = {
                email: email,
                grade: grade,
                role: selectedRole.dataset.role,
                name: email.split('@')[0]
            };
            
            currentGrade = grade;
        } else {
            // Login mode - simulate existing user
            currentUser = {
                email: email,
                grade: '7', // Default grade
                role: 'student',
                name: email.split('@')[0]
            };
            
            currentGrade = '7';
        }
        
        console.log('✅ User authenticated:', currentUser);
        
        // Update UI for logged in state
        updateUIForLoggedInUser();
        
        // Navigate to dashboard
        showSection('dashboard');
        
        // Show welcome message
        const welcomeText = isLoginMode ? 'Welcome back' : 'Account created successfully';
        showSuccessModal(`${welcomeText}! Start your STEM journey and earn points by taking quizzes and completing coding challenges. Each correct answer earns you 10 points!`);
        
        // Update points display
        updatePointsDisplay();
    };
    
    updateAuthInterface();
}

function updateAuthInterface() {
    const title = document.getElementById('authTitle');
    const subtitle = document.getElementById('authSubtitle');
    const submitBtn = document.getElementById('authSubmit');
    const switchText = document.getElementById('authSwitchText');
    const gradeGroup = document.getElementById('gradeGroup');
    const roleGroup = document.getElementById('roleGroup');
    
    if (isLoginMode) {
        title.textContent = 'Welcome Back';
        subtitle.textContent = 'Sign in to continue your STEM learning journey';
        submitBtn.textContent = 'Sign In';
        switchText.innerHTML = 'Don\'t have an account? <button type="button" class="link-btn" onclick="toggleAuthMode()">Sign up here</button>';
        gradeGroup.style.display = 'none';
        roleGroup.style.display = 'none';
    } else {
        title.textContent = 'Join EduShiksha';
        subtitle.textContent = 'Create your account to start learning STEM subjects';
        submitBtn.textContent = 'Create Account';
        switchText.innerHTML = 'Already have an account? <button type="button" class="link-btn" onclick="toggleAuthMode()">Sign in here</button>';
        gradeGroup.style.display = 'block';
        roleGroup.style.display = 'block';
    }
}

function updateUIForLoggedInUser() {
    // Show protected navigation items
    const protectedNavs = ['dashboard', 'learn', 'quiz', 'code', 'progress'];
    protectedNavs.forEach(nav => {
        const navBtn = document.querySelector(`[data-section="${nav}"]`);
        if (navBtn) {
            navBtn.classList.remove('hidden');
        }
    });
    
    // Hide login button, show user info if needed
    const loginBtn = document.querySelector('[data-section="login"]');
    if (loginBtn) {
        loginBtn.style.display = 'none';
    }
    
    // Update welcome message
    const welcomeMsg = document.getElementById('welcomeMessage');
    if (welcomeMsg && currentUser) {
        welcomeMsg.textContent = `Welcome back, ${currentUser.name}! Grade ${currentUser.grade}`;
    }
}

// Section navigation
function showSection(sectionName) {
    console.log(`📱 Showing section: ${sectionName}`);
    
    // Hide all sections
    const allSections = document.querySelectorAll('.section');
    allSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    } else {
        console.error(`❌ Section ${sectionName} not found`);
        return;
    }

    // Update navigation states
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-section') === sectionName) {
            btn.classList.add('active');
        }
    });

    // Initialize section-specific features
    if (sectionName === 'progress' && progressChart) {
        setTimeout(() => {
            if (progressChart.resize) progressChart.resize();
        }, 100);
    }
}

// Subject selection from dashboard
window.selectSubject = function(subject) {
    if (!currentUser) {
        showSuccessModal('Please log in first to access STEM subjects!');
        return;
    }
    
    console.log(`🎯 Selected subject: ${subject}`);
    currentSubject = subject;
    
    // Update learn section
    updateContentForSubject(subject);
    
    // Update quiz section
    updateQuizForSubject(subject);
    
    // Navigate to learn section
    showSection('learn');
    
    showSuccessModal(`Welcome to ${subject.charAt(0).toUpperCase() + subject.slice(1)}! Explore videos and take quizzes to earn points. Each correct answer gives you 10 points!`);
};

function updateContentForSubject(subject) {
    const learnTitle = document.getElementById('learnTitle');
    const videosContainer = document.getElementById('videosContainer');
    
    if (!learnTitle || !videosContainer) {
        console.error('❌ Learn section elements not found');
        return;
    }
    
    const subjectData = stemContent[subject] && stemContent[subject][currentGrade];
    
    if (!subjectData) {
        learnTitle.textContent = `${subject.charAt(0).toUpperCase() + subject.slice(1)} - Content Coming Soon`;
        videosContainer.innerHTML = `
            <div class="content-message">
                <h3>Content Under Development</h3>
                <p>We're preparing amazing ${subject} content for Grade ${currentGrade}. Check back soon!</p>
                <button class="btn btn--outline" onclick="showSection('dashboard')">Back to Dashboard</button>
            </div>
        `;
        return;
    }
    
    learnTitle.textContent = subjectData.title;
    
    // Clear and populate videos
    videosContainer.innerHTML = '';
    
    if (subjectData.videos && subjectData.videos.length > 0) {
        const videosGrid = document.createElement('div');
        videosGrid.className = 'videos-grid';
        
        subjectData.videos.forEach(video => {
            const videoCard = createVideoCard(video);
            videosGrid.appendChild(videoCard);
        });
        
        videosContainer.appendChild(videosGrid);
    } else {
        videosContainer.innerHTML = `
            <div class="content-message">
                <h3>Videos Coming Soon</h3>
                <p>Educational videos for ${subject} Grade ${currentGrade} will be available soon!</p>
                <button class="btn btn--outline" onclick="showSection('quiz')">Try Quiz Instead</button>
            </div>
        `;
    }
}

function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';
    
    card.innerHTML = `
        <iframe 
            src="https://www.youtube.com/embed/${video.videoId}" 
            frameborder="0" 
            allowfullscreen
            title="${video.title}"
            loading="lazy">
        </iframe>
        <div class="video-card-content">
            <h3>${video.title}</h3>
            <p>${video.description}</p>
        </div>
    `;
    
    return card;
}

function updateQuizForSubject(subject) {
    const subjectData = stemContent[subject] && stemContent[subject][currentGrade];
    
    if (!subjectData || !subjectData.quiz) {
        console.warn(`⚠️ No quiz found for ${subject} Grade ${currentGrade}`);
        return;
    }
    
    console.log(`🧩 Setting up quiz for ${subject} Grade ${currentGrade}`);
    
    currentQuiz = {
        title: `${subjectData.title} Assessment`,
        questions: subjectData.quiz,
        subject: subject
    };
    
    currentQuestionIndex = 0;
    userAnswers = [];
    quizScore = 0;
    
    const quizTitle = document.getElementById('quizTitle');
    const quizContent = document.getElementById('quizContent');
    const quizActions = document.getElementById('quizActions');
    const quizResults = document.getElementById('quizResults');
    
    if (quizTitle) {
        quizTitle.textContent = currentQuiz.title;
    }
    
    if (quizContent) {
        quizContent.innerHTML = '';
        quizContent.style.display = 'block';
        displayCurrentQuestion();
    }
    
    if (quizActions) {
        quizActions.style.display = 'flex';
        updateNavigationButtons();
    }
    
    if (quizResults) {
        quizResults.style.display = 'none';
    }
    
    updateProgressBar();
    updateQuestionCounter();
}

function displayCurrentQuestion() {
    if (!currentQuiz || !currentQuiz.questions) {
        console.error('❌ No quiz or questions available');
        return;
    }
    
    const question = currentQuiz.questions[currentQuestionIndex];
    const quizContent = document.getElementById('quizContent');
    
    if (!question || !quizContent) {
        console.error('❌ Question or quiz content not found');
        return;
    }
    
    const questionCard = document.createElement('div');
    questionCard.className = 'question-card';
    
    questionCard.innerHTML = `
        <div class="question-text">${question.question}</div>
        <div class="options-grid">
            ${question.options.map((option, index) => `
                <button class="option-btn" onclick="selectOption(${index})" data-option="${index}">
                    ${option}
                </button>
            `).join('')}
        </div>
    `;
    
    quizContent.innerHTML = '';
    quizContent.appendChild(questionCard);
    
    // Restore previous selection if exists
    if (userAnswers[currentQuestionIndex] !== undefined) {
        const selectedBtn = questionCard.querySelector(`[data-option="${userAnswers[currentQuestionIndex]}"]`);
        if (selectedBtn) {
            selectedBtn.classList.add('selected');
        }
    }
}

// Quiz interaction functions
window.selectOption = function(optionIndex) {
    console.log(`Option selected: ${optionIndex}`);
    
    // Remove previous selections
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Mark current selection
    const selectedBtn = document.querySelector(`[data-option="${optionIndex}"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('selected');
    }
    
    // Store answer
    userAnswers[currentQuestionIndex] = optionIndex;
    updateNavigationButtons();
};

window.nextQuestion = function() {
    if (!currentQuiz) return;
    
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuestionIndex++;
        displayCurrentQuestion();
        updateNavigationButtons();
        updateProgressBar();
        updateQuestionCounter();
    }
};

window.prevQuestion = function() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayCurrentQuestion();
        updateNavigationButtons();
        updateProgressBar();
        updateQuestionCounter();
    }
};

window.submitQuiz = function() {
    if (!currentQuiz) return;
    
    console.log('📝 Submitting quiz...');
    
    // Calculate score and points
    quizScore = 0;
    let pointsEarned = 0;
    
    userAnswers.forEach((answer, index) => {
        if (answer === currentQuiz.questions[index].correct) {
            quizScore++;
            pointsEarned += 10; // 10 points per correct answer
        }
    });
    
    console.log(`Quiz completed. Score: ${quizScore}/${currentQuiz.questions.length}, Points: ${pointsEarned}`);
    
    // Update user points
    if (currentQuiz.subject) {
        userPoints[currentQuiz.subject] += pointsEarned;
        userPoints.total += pointsEarned;
    }
    
    // Save progress and update displays
    saveUserProgress();
    updatePointsDisplay();
    updateProgressChart();
    
    // Add achievement
    addAchievement(`Completed ${currentQuiz.subject} quiz`, `Earned ${pointsEarned} points!`);
    
    showQuizResults();
};

window.restartQuiz = function() {
    console.log('🔄 Restarting quiz...');
    
    if (currentSubject && currentGrade) {
        updateQuizForSubject(currentSubject);
    }
};

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (!currentQuiz) return;
    
    // Previous button
    if (prevBtn) {
        prevBtn.style.display = currentQuestionIndex > 0 ? 'inline-flex' : 'none';
    }
    
    // Next/Submit button logic
    const isLastQuestion = currentQuestionIndex === currentQuiz.questions.length - 1;
    const hasAnswer = userAnswers[currentQuestionIndex] !== undefined;
    
    if (nextBtn && submitBtn) {
        if (isLastQuestion) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = hasAnswer ? 'inline-flex' : 'none';
        } else {
            nextBtn.style.display = hasAnswer ? 'inline-flex' : 'none';
            submitBtn.style.display = 'none';
        }
    }
}

function updateProgressBar() {
    const progressFill = document.getElementById('progressFill');
    if (progressFill && currentQuiz) {
        const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;
        progressFill.style.width = `${progress}%`;
    }
}

function updateQuestionCounter() {
    const questionCounter = document.getElementById('questionCounter');
    if (questionCounter && currentQuiz) {
        questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuiz.questions.length}`;
    }
}

function showQuizResults() {
    const quizContent = document.getElementById('quizContent');
    const quizActions = document.getElementById('quizActions');
    const quizResults = document.getElementById('quizResults');
    const scoreText = document.getElementById('scoreText');
    
    // Hide quiz interface
    if (quizContent) quizContent.style.display = 'none';
    if (quizActions) quizActions.style.display = 'none';
    
    // Show results
    if (quizResults && scoreText) {
        quizResults.style.display = 'block';
        
        const pointsEarned = quizScore * 10;
        const percentage = Math.round((quizScore / currentQuiz.questions.length) * 100);
        
        let message = `Outstanding! You scored ${quizScore} out of ${currentQuiz.questions.length} (${percentage}%)\n\n`;
        message += `Points Earned: ${pointsEarned} 🌟\n\n`;
        
        if (percentage >= 90) {
            message += "Excellent mastery of STEM concepts! You're ready for advanced challenges!";
        } else if (percentage >= 70) {
            message += "Great understanding! Keep exploring more STEM topics!";
        } else if (percentage >= 50) {
            message += "Good progress! Practice more to strengthen your knowledge!";
        } else {
            message += "Keep learning! STEM subjects become easier with practice!";
        }
        
        scoreText.textContent = message;
    }
}

// Coding challenge functions
window.loadChallenge = function(challengeType) {
    const challenge = codingChallenges[challengeType];
    if (!challenge) {
        console.error(`Challenge ${challengeType} not found`);
        return;
    }
    
    console.log(`💻 Loading challenge: ${challengeType}`);
    
    const workspace = document.getElementById('codingWorkspace');
    const challengeTitle = document.getElementById('challengeTitle');
    const challengeDescription = document.getElementById('challengeDescription');
    const challengeExample = document.getElementById('challengeExample');
    const codeInput = document.getElementById('codeInput');
    const codeOutput = document.getElementById('codeOutput');
    
    if (workspace) {
        workspace.style.display = 'block';
        workspace.dataset.challenge = challengeType;
    }
    
    if (challengeTitle) challengeTitle.textContent = challenge.title;
    if (challengeDescription) challengeDescription.textContent = challenge.description;
    if (challengeExample) challengeExample.textContent = challenge.example;
    if (codeInput) codeInput.value = '';
    if (codeOutput) codeOutput.textContent = 'Your output will appear here...';
    
    // Add drag-drop blocks interface (simplified)
    createDragDropInterface(challenge.blocks, challengeType);
};

function createDragDropInterface(blocks, challengeType) {
    // This simulates drag-drop by providing clickable code blocks
    const codeInput = document.getElementById('codeInput');
    if (!codeInput || !blocks) return;
    
    // Add helper text
    codeInput.placeholder = `Hint: Try typing or copy from the example above.\n\nAvailable blocks:\n${blocks.join('\n')}`;
}

window.runCode = function() {
    const codeInput = document.getElementById('codeInput');
    const codeOutput = document.getElementById('codeOutput');
    const workspace = document.getElementById('codingWorkspace');
    
    if (!codeInput || !codeOutput || !workspace) return;
    
    const code = codeInput.value.trim();
    const challengeType = workspace.dataset.challenge;
    
    if (!code) {
        codeOutput.textContent = 'Please write some code first!';
        return;
    }
    
    try {
        const output = simulateCodeExecution(code, challengeType);
        codeOutput.textContent = output;
        
        const challenge = codingChallenges[challengeType];
        if (checkSolution(code, challenge)) {
            const pointsEarned = challenge.points || 15;
            
            // Award points if not already completed
            if (!completedChallenges.has(challengeType)) {
                completedChallenges.add(challengeType);
                userPoints.technology += pointsEarned;
                userPoints.total += pointsEarned;
                
                updatePointsDisplay();
                saveUserProgress();
                addAchievement(`Completed ${challenge.title}`, `Earned ${pointsEarned} points!`);
                
                setTimeout(() => {
                    showSuccessModal(`🎉 Challenge Complete! You earned ${pointsEarned} points for solving "${challenge.title}". Your programming skills are growing stronger!`);
                }, 1000);
            } else {
                setTimeout(() => {
                    showSuccessModal(`✅ Perfect solution! You've already completed this challenge, but great work practicing!`);
                }, 1000);
            }
        }
    } catch (error) {
        codeOutput.textContent = `Error: ${error.message}`;
    }
};

window.resetCode = function() {
    const codeInput = document.getElementById('codeInput');
    const codeOutput = document.getElementById('codeOutput');
    
    if (codeInput) codeInput.value = '';
    if (codeOutput) codeOutput.textContent = 'Your output will appear here...';
};

function simulateCodeExecution(code, challengeType) {
    const normalizedCode = code.toLowerCase().trim();
    
    switch (challengeType) {
        case 'basic':
            if (normalizedCode.includes('print') && (normalizedCode.includes('namaskar') || normalizedCode.includes('odisha'))) {
                return 'Namaskar, Odisha!';
            } else if (normalizedCode.includes('print(')) {
                const match = code.match(/print\(['"](.*?)['"]\)/i);
                return match ? match[1] : 'Hello World!';
            }
            return 'Try using print() to greet Odisha!';
            
        case 'loops':
            if (normalizedCode.includes('for') && normalizedCode.includes('range') && normalizedCode.includes('wheel')) {
                return 'Wheel number: 1\nWheel number: 2\nWheel number: 3\n... (continuing to 16)\nWheel number: 16';
            }
            return 'Use a for loop to count the chariot wheels!';
            
        case 'functions':
            if (normalizedCode.includes('def') && normalizedCode.includes('calculate') && normalizedCode.includes('return')) {
                return 'Rice field area: 1500 sq meters';
            }
            return 'Create a function to calculate the field area!';
            
        default:
            return 'Code executed successfully!';
    }
}

function checkSolution(code, challenge) {
    if (!challenge || !challenge.solution) return false;
    
    const normalizedCode = code.toLowerCase().replace(/\s+/g, ' ').trim();
    const normalizedSolution = challenge.solution.toLowerCase().replace(/\s+/g, ' ').trim();
    
    // Check if the core solution pattern is present
    const solutionKey = normalizedSolution.split('\n')[0];
    return normalizedCode.includes(solutionKey.substring(0, Math.min(20, solutionKey.length)));
}

// Points and progress management
function updatePointsDisplay() {
    // Update main points display
    const totalPointsElements = ['totalPoints', 'progressTotalPoints'];
    totalPointsElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = userPoints.total.toString();
        }
    });
    
    // Update subject-specific points
    const subjects = ['science', 'technology', 'engineering', 'mathematics'];
    subjects.forEach(subject => {
        const elements = [
            document.getElementById(`${subject}Points`),
            document.getElementById(`progress${subject.charAt(0).toUpperCase() + subject.slice(1)}Points`)
        ];
        
        elements.forEach(element => {
            if (element) {
                const points = userPoints[subject] || 0;
                element.textContent = points > 0 ? `${points} points earned` : '0';
            }
        });
    });
}

function updateProgressChart() {
    if (!progressChart) {
        initializeChart();
        return;
    }
    
    // Update chart data
    progressChart.data.datasets[0].data = [
        userPoints.science || 0,
        userPoints.technology || 0,
        userPoints.engineering || 0,
        userPoints.mathematics || 0
    ];
    
    progressChart.update();
}

function addAchievement(title, description) {
    const achievementsList = document.getElementById('achievementsList');
    if (!achievementsList) return;
    
    const achievementItem = document.createElement('div');
    achievementItem.className = 'achievement-item';
    achievementItem.innerHTML = `
        <div class="achievement-icon">🏆</div>
        <div class="achievement-content">
            <h4>${title}</h4>
            <p>${description}</p>
            <span class="achievement-date">Just now</span>
        </div>
    `;
    
    // Add to top of list
    achievementsList.insertBefore(achievementItem, achievementsList.firstChild);
    
    // Keep only latest 5 achievements
    while (achievementsList.children.length > 5) {
        achievementsList.removeChild(achievementsList.lastChild);
    }
}

// Chart initialization
function initializeChart() {
    const ctx = document.getElementById('activityChart');
    if (!ctx) return;
    
    try {
        progressChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Science', 'Technology', 'Engineering', 'Mathematics'],
                datasets: [{
                    data: [
                        userPoints.science || 0,
                        userPoints.technology || 0,
                        userPoints.engineering || 0,
                        userPoints.mathematics || 0
                    ],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F'],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: { size: 12, weight: '500' }
                        }
                    }
                }
            }
        });
        
        console.log('📊 Progress chart initialized');
    } catch (error) {
        console.error('❌ Chart initialization failed:', error);
    }
}

// Data persistence simulation (without localStorage)
function saveUserProgress() {
    // Simulate saving to backend
    console.log('💾 Progress saved (simulated):', {
        user: currentUser,
        points: userPoints,
        completedChallenges: Array.from(completedChallenges),
        currentGrade,
        currentSubject
    });
}

function loadUserProgress() {
    // Simulate loading from backend
    console.log('📂 Progress loaded (simulated)');
    
    // Initialize default points
    userPoints = {
        science: 0,
        technology: 0,
        engineering: 0,
        mathematics: 0,
        total: 0
    };
    
    updatePointsDisplay();
}

// Modal functions
window.showSuccessModal = function(message) {
    const modal = document.getElementById('successModal');
    const messageElement = document.getElementById('successMessage');
    
    if (modal && messageElement) {
        messageElement.textContent = message;
        modal.classList.remove('hidden');
    }
};

window.closeModal = function() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('hidden');
    }
};

// Modal click outside to close
function setupModalHandlers() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Initialize chart after a brief delay to ensure DOM is ready
setTimeout(() => {
    initializeChart();
}, 500);

console.log('🚀 EduShiksha STEM Learning Platform script loaded successfully!');