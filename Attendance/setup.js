
const fs = require('fs');
const path = require('path');

const folders = ['public', 'public/js', 'views', 'views/partials'];

const files = {
    'package.json': `{
  "name": "ptc-attendance-system-pro",
  "version": "2.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^4.19.2",
    "ejs": "^3.1.10"
  }
}`,

    'app.js': `const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.redirect('/login'));
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));
app.get('/dashboard', (req, res) => res.render('dashboard'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('📡 [PTC-SERVER-PRO] RUNNING AT: HTTP://LOCALHOST:' + PORT);
});`,

    'views/partials/header.ejs': `<!DOCTYPE html>
<html lang="EN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PTC ATTENDANCE SYSTEM PRO</title>
    <!-- PREMIUM UI TYPOGRAPHY CORE -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>`,

    'views/partials/footer.ejs': `    <script src="/js/client.js"></script>
</body>
</html>`,

    'views/login.ejs': `<%- include('partials/header') %>
<div id="loginPage" class="page-section login-page animate-fade-in">
    <div class="login-container">
        <div class="login-box">
            <div class="login-header">
                <img src="/PTCLOGO.webp" class="login-logo-image" alt="PTC LOGO">
                <h1>PTC ATTENDANCE SYSTEM</h1>
                <p>PATEROS TECHNOLOGICAL COLLEGE</p>
            </div>
            <form id="loginForm" class="login-form">
                <div class="form-group">
                    <label for="username"><i class="fa-solid fa-user"></i> USERNAME</label>
                    <input type="text" id="username" required placeholder="ENTER YOUR USERNAME">
                </div>
                <div class="form-group">
                    <label for="password"><i class="fa-solid fa-lock"></i> PASSWORD</label>
                    <input type="password" id="password" required placeholder="ENTER YOUR PASSWORD">
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary btn-block btn-glow">SIGN IN <i class="fa-solid fa-right-to-bracket"></i></button>
                </div>
                <div class="form-footer">
                    <p>DON'T HAVE AN ACCOUNT? <a href="/register" class="link">REGISTER HERE</a></p>
                </div>
            </form>
            <div id="loginError" class="error-message hidden animate-shake"></div>
        </div>
    </div>
</div>
<%- include('partials/footer') %>`,

    'views/register.ejs': `<%- include('partials/header') %>
<div id="registerPage" class="page-section login-page animate-fade-in">
    <div class="login-container">
        <div class="login-box">
            <div class="login-header">
                <div class="logo-icon"><i class="fa-solid fa-user-plus"></i></div>
                <h1>CREATE AN ACCOUNT</h1>
                <p>PTC ATTENDANCE TRACKING</p>
            </div>
            <form id="registerForm" class="login-form">
                <div class="form-group"><label><i class="fa-solid fa-signature"></i> FULL NAME</label><input type="text" id="regFullName" required placeholder="JOHN DOE"></div>
                <div class="form-group"><label><i class="fa-solid fa-envelope"></i> EMAIL ADDRESS</label><input type="email" id="regEmail" required placeholder="JOHNDOE@PTC.EDU.PH"></div>
                <div class="form-group"><label><i class="fa-solid fa-user"></i> USERNAME</label><input type="text" id="regUsername" required placeholder="CHOOSE A USERNAME"></div>
                <div class="form-group"><label><i class="fa-solid fa-lock"></i> PASSWORD</label><input type="password" id="regPassword" required placeholder="CREATE A STRONG PASSWORD"></div>
                <div class="form-group">
                    <label><i class="fa-solid fa-user-shield"></i> SYSTEM ROLE</label>
                    <select id="regRole" class="filter-select" style="width: 100%; margin-top: 5px;">
                        <option value="teacher">👨‍🏫 FACULTY TEACHER</option>
                        <option value="admin">⚙️ SYSTEM ADMINISTRATOR</option>
                    </select>
                </div>
                <div class="form-actions"><button type="submit" class="btn btn-primary btn-block btn-glow">REGISTER ACCOUNT <i class="fa-solid fa-circle-check"></i></button></div>
                <div class="form-footer"><p>ALREADY HAVE AN ACCOUNT? <a href="/login" class="link">BACK TO LOGIN</a></p></div>
            </form>
            <div id="registerSuccess" class="success-message hidden"></div>
            <div id="registerError" class="error-message hidden animate-shake"></div>
        </div>
    </div>
</div>
<%- include('partials/footer') %>`,

    'views/dashboard.ejs': `<%- include('partials/header') %>
<div id="dashboardPage" class="page-section dashboard-page animate-fade-in">
    <div class="dashboard-container">
        <aside class="sidebar">
            <div class="sidebar-header">
                <img src="/PTCLOGO.webp" class="sidebar-logo-image" alt="PTC LOGO">
                <div class="sidebar-logo"><i class="fa-solid fa-shield-halved"></i> <span id="sidebarSystemName">PTC GREEN PRO</span></div>
                <p><i class="fa-solid fa-circle text-success font-xs"></i> SERVER CONNECTED</p>
            </div>
            <nav class="sidebar-nav">
                <ul class="nav-menu">
                    <li><a href="#" class="nav-link active" data-target="dashboardSection"><i class="fa-solid fa-chart-pie"></i> DASHBOARD HUB</a></li>
                    <li><a href="#" class="nav-link" data-target="teachersSection" id="navTeachersLink"><i class="fa-solid fa-chalkboard-user"></i> FACULTY MEMBERS</a></li>
                    <li><a href="#" class="nav-link" data-target="studentsSection"><i class="fa-solid fa-user-graduate"></i> STUDENT ROSTER</a></li>
                    <li><a href="#" class="nav-link" data-target="attendanceSection"><i class="fa-solid fa-clipboard-user"></i> ROLL CALL WORKSPACE</a></li>
                    <li><a href="#" class="nav-link" data-target="reportSection"><i class="fa-solid fa-square-poll-vertical"></i> ADVANCED REPORTS</a></li>
                    <li><a href="#" class="nav-link" data-target="settingsSection"><i class="fa-solid fa-sliders"></i> CONTROL SETTINGS</a></li>
                    <li><a href="#" class="nav-link text-danger-important" id="logoutLink"><i class="fa-solid fa-door-open"></i> SIGN OUT</a></li>
                </ul>
            </nav>
        </aside>

        <main class="main-content">
            <header class="top-bar">
                <div class="section-title-container">
                    <img src="/PTCLOGO.webp" class="header-logo-image" alt="PTC LOGO">
                    <h1 id="currentSectionTitle">DASHBOARD HUB</h1>
                </div>
                <div class="user-profile">
                    <div class="user-avatar" id="userAvatarInitials">--</div>
                    <div class="user-info">
                        <span class="user-name" id="currentUserName">LOADING...</span>
                        <span class="user-role-badge" id="currentUserRole">USER</span>
                    </div>
                </div>
            </header>

            <!-- 1. HUB OVERVIEW -->
            <section id="dashboardSection" class="content-section active">
                <div class="welcome-banner">
                    <h2 id="dynamicGreeting">GOOD DAY! 👋</h2>
                    <p>HERE IS THE REAL-TIME SUMMARY OF THE SCHOOL ATTENDANCE TRACKER SYSTEM FOR TODAY.</p>
                </div>
                <div class="stats-cards">
                    <div class="stat-card border-left-success">
                        <div class="stat-icon-wrapper text-success"><i class="fa-solid fa-users-line"></i></div>
                        <div class="stat-details"><h3>TOTAL STUDENTS</h3><p class="stat-number" id="dashTotalStudents">0</p></div>
                    </div>
                    <div class="stat-card border-left-info">
                        <div class="stat-icon-wrapper text-info"><i class="fa-solid fa-user-tie"></i></div>
                        <div class="stat-details"><h3>ACTIVE INSTRUCTORS</h3><p class="stat-number" id="dashTotalTeachers">0</p></div>
                    </div>
                    <div class="stat-card border-left-warning">
                        <div class="stat-icon-wrapper text-warning"><i class="fa-solid fa-calendar-check"></i></div>
                        <div class="stat-details"><h3>DAYS WITH ACTIVE LOGS</h3><p class="stat-number" id="dashTotalClasses">0</p></div>
                    </div>
                </div>
            </section>

            <!-- 2. TEACHERS SECTION -->
            <section id="teachersSection" class="content-section">
                <div class="section-actions-bar">
                    <button class="btn btn-primary btn-glow" id="addTeacherBtn"><i class="fa-solid fa-user-plus"></i> ADD NEW INSTRUCTOR</button>
                </div>
                <div class="table-container">
                    <table class="data-table">
                        <thead><tr><th>NAME</th><th>EMAIL ADDRESS</th><th>USERNAME</th><th>ACTION</th></tr></thead>
                        <tbody id="teachersTableBody"></tbody>
                    </table>
                </div>
            </section>

            <!-- 3. STUDENTS SECTION -->
            <section id="studentsSection" class="content-section">
                <div class="section-actions-bar">
                    <button class="btn btn-primary btn-glow" id="addStudentBtn"><i class="fa-solid fa-plus"></i> REGISTER STUDENT</button>
                </div>
                <div class="table-container">
                    <table class="data-table">
                        <thead><tr><th>STUDENT ID</th><th>FULL NAME</th><th>COURSE / YEAR & SECTION</th><th>PARENT CONTACT</th><th>ACTION</th></tr></thead>
                        <tbody id="studentsTableBody"></tbody>
                    </table>
                </div>
            </section>

            <!-- 4. WORKSPACE ATTENDANCE -->
            <section id="attendanceSection" class="content-section">
                <div class="section-actions-bar row-layout">
                    <div class="flex-item">
                        <label class="input-label">ROLL CALL DATE:</label>
                        <input type="date" id="attendanceDate" class="date-input">
                    </div>
                    <button class="btn btn-success btn-glow" id="saveAttendanceBtn"><i class="fa-solid fa-cloud-arrow-up"></i> SAVE & DISPATCH NOTIFICATIONS <i class="fa-solid fa-paper-plane"></i></button>
                </div>
                
                <!-- LIVE COUNTER BARS -->
                <div class="live-counter-strip">
                    <div class="counter-pill bg-success-dim">PRESENT: <span id="livePresentCount">0</span></div>
                    <div class="counter-pill bg-danger-dim">ABSENT: <span id="liveAbsentCount">0</span></div>
                    <div class="counter-pill bg-warning-dim">LATE: <span id="liveLateCount">0</span></div>
                </div>

                <div class="table-container">
                    <table class="data-table">
                        <thead><tr><th>STUDENT ID</th><th>STUDENT NAME</th><th>MARK STATUS (ROLL CALL)</th></tr></thead>
                        <tbody id="attendanceTableBody"></tbody>
                    </table>
                </div>
            </section>

            <!-- 5. ADVANCED REPORT -->
            <section id="reportSection" class="content-section">
                <div class="section-actions-bar">
                    <input type="date" id="reportDate" class="date-input">
                    <button class="btn btn-secondary" id="printReportBtn"><i class="fa-solid fa-print"></i> PRINT SHEET REPORT</button>
                </div>
                <div class="table-container">
                    <table class="data-table">
                        <thead><tr><th>ID</th><th>STUDENT NAME</th><th>DATE</th><th>ATTENDANCE STATUS</th></tr></thead>
                        <tbody id="reportTableBody"></tbody>
                    </table>
                </div>
            </section>

            <!-- 6. CONTROL SETTINGS -->
            <section id="settingsSection" class="content-section">
                <div class="card-box">
                    <h3><i class="fa-solid fa-sliders text-primary"></i> SYSTEM CONFIGURATION</h3>
                    <div class="setting-row">
                        <label>SYSTEM BRANDING INTERFACE NAME</label>
                        <div class="input-group">
                            <input type="text" id="systemNameInput" class="custom-input">
                            <button class="btn btn-primary" id="saveSystemNameBtn">UPDATE TITLE</button>
                        </div>
                    </div>
                    <div class="setting-row toggle-layout">
                        <div>
                            <strong>DARK MODE INTEGRATION</strong>
                            <p class="text-muted font-xs">INVERT SYSTEM DASHBOARD AESTHETICS FOR LOW-LIGHT ENVIRONMENTS.</p>
                        </div>
                        <label class="switch">
                            <input type="checkbox" id="darkModeToggle">
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>
            </section>
        </main>
    </div>
</div>

<!-- NOTIFICATION DRAWER -->
<div id="smsNotificationDrawer" class="notification-drawer">
    <div class="drawer-header"><h3><i class="fa-solid fa-comment-sms"></i> PARENT SMS DISPATCH LOG</h3><button id="closeDrawerBtn">&times;</button></div>
    <div id="drawerLogsBody" class="drawer-body">
        <p class="text-muted text-center font-xs">NO NOTIFICATIONS DISPATCHED IN THIS SESSION.</p>
    </div>
</div>

<!-- MODALS -->
<div id="studentModal" class="modal"><div class="modal-content animate-zoom"><span class="modal-close" id="closeStudentModal">&times;</span><h2 id="studentModalTitle">REGISTER STUDENT</h2><form id="studentForm"><input type="hidden" id="studentIdIndex"><div class="form-group"><label>STUDENT ID</label><input type="text" id="studentId" required placeholder="E.G. 2026-0091"></div><div class="form-group"><label>FULL NAME</label><input type="text" id="studentName" required placeholder="JOHN DOE"></div><div class="form-group"><label>COURSE</label><input type="text" id="studentCourse" required placeholder="E.G. BSIT"></div><div class="form-group"><label>YEAR (E.G. 3)</label><input type="text" id="studentYear" required placeholder="E.G. 3"></div><div class="form-group"><label>SECTION (E.G. J)</label><input type="text" id="studentSection" required placeholder="E.G. J"></div><div class="form-group"><label>PARENT EMAIL / CONTACT (FOR ALERTS)</label><input type="email" id="studentEmail" required placeholder="PARENT@EMAIL.COM"></div><button type="submit" class="btn btn-primary btn-block">SAVE STUDENT INFORMATION</button></form></div></div>
<div id="teacherModal" class="modal"><div class="modal-content animate-zoom"><span class="modal-close" id="closeTeacherModal">&times;</span><h2 id="teacherModalTitle">INSTRUCTOR INFORMATION</h2><form id="teacherForm"><input type="hidden" id="teacherIdIndex"><div class="form-group"><label>FULL NAME</label><input type="text" id="teacherName" required placeholder="PROF. JANE DOE"></div><div class="form-group"><label>EMAIL ADDRESS</label><input type="email" id="teacherEmail" required placeholder="JANEDOE@PTC.EDU.PH"></div><div class="form-group"><label>USERNAME</label><input type="text" id="teacherUsername" required placeholder="JANEDOE123"></div><button type="submit" class="btn btn-primary btn-block">SAVE INSTRUCTOR DETAILS</button></form></div></div>
<%- include('partials/footer') %>`,

    'public/styles.css': `:root {
    /* PTC PREMIUM EMERALD & MINT DESIGN ENGINE */
    --bg-color: #f2f7f4;
    --card-bg: #ffffff;
    --text-color: #0b251a;
    --text-muted: #4a5d55;
    --border-color: #cbdad2;
    
    /* INSTITUTIONAL GREENS THEME SPECS */
    --primary-color: #15803d; /* RICH PTC SCHOOL GREEN */
    --primary-hover: #166534;
    --sidebar-bg: linear-gradient(185deg, #062f17 0%, #0f172a 100%);
    --sidebar-text: #a3b899;
    --sidebar-active-bg: rgba(21, 128, 61, 0.25);
    
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --danger-color: #ef4444;
    --shadow-md: 0 10px 25px -5px rgba(21, 128, 61, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
}

body.dark-mode {
    /* DARK-MINT CYBER GRID LAYOUT */
    --bg-color: #020604;
    --card-bg: #07120c;
    --text-color: #f0fdf4;
    --text-muted: #879b90;
    --border-color: #14281d;
    --primary-color: #4ade80; /* RADIANT GLOWING MINT ACCENT */
    --primary-hover: #22c55e;
    --shadow-md: 0 10px 30px rgba(74, 222, 128, 0.06);
}

* { 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0; 
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif; 
    letter-spacing: -0.01em;
}

body { 
    background-color: var(--bg-color); 
    color: var(--text-color); 
    transition: all 0.3s ease; 
    min-height: 100vh; 
    overflow-x: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
}

body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/PTCLOGO.webp');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 400px auto;
    opacity: 0.04;
    pointer-events: none;
    z-index: 0;
}

.system-global-watermark {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-image: url('/PTCLOGO.webp');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 40%;
    opacity: 0.03;
    pointer-events: none;
    z-index: 1;
}

.sidebar {
    width: 280px;
    min-width: 280px;
    height: 100vh;
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: var(--sidebar-bg);
    color: white;
    z-index: 99;
    box-shadow: 5px 0 25px rgba(0,0,0,0.15);
}
.sidebar-logo { 
    font-size: 22px; 
    font-weight: 800; 
    color: var(--primary-color); 
    text-shadow: 0 0 15px rgba(74, 222, 128, 0.4);
    display: flex; 
    align-items: center; 
    gap: 10px; 
    white-space: nowrap;
}

.sidebar-header {
    padding: 30px 24px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.sidebar-logo-image {
    height: 40px;
    width: auto;
    object-fit: contain;
    margin: 0 auto 10px;
    display: block;
    border-radius: 8px;
    flex-shrink: 0;
}

.sidebar-nav { padding-top: 20px; }
.nav-menu { list-style: none; }

.nav-link { 
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 24px; 
    color: var(--sidebar-text); 
    font-weight: 600; 
    text-decoration: none;
    border-radius: 0 12px 12px 0;
    margin-right: 14px;
    margin-bottom: 4px;
    transition: all 0.25s ease;
    cursor: pointer;
}

.nav-link i { width: 20px; text-align: center; }

.nav-link:hover, .nav-link.active { 
    color: #ffffff; 
    background: var(--sidebar-active-bg); 
    border-left: 5px solid var(--primary-color); 
    padding-left: 28px;
}

.dashboard-container {
    display: flex;
    flex-direction: row;
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
}

.main-content { 
    flex-grow: 1;
    min-width: 0;
    padding: 40px; 
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 30px;
    overflow-y: auto;
    background-color: transparent;
}

.top-bar { 
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 35px; 
    border-bottom: 2px dashed var(--border-color); 
    padding-bottom: 20px; 
}

.top-bar h1 { font-weight: 800; font-size: 28px; color: var(--text-color); }
.user-profile { display: flex; align-items: center; gap: 12px; }
.user-info { display: flex; flex-direction: column; }
.user-name { font-weight: 700; font-size: 15px; }

.user-avatar { 
    width: 44px; height: 44px; border-radius: 50%; color: white; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #16a34a 0%, #10b981 100%); 
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4); 
}

.content-section { display: none; }
.content-section.active { display: block; }

.stats-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    width: 100%;
}

.stat-card {
    background: var(--card-bg);
    border-radius: 16px;
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    box-sizing: border-box;
    box-shadow: var(--shadow-md);
    border-left: 5px solid var(--primary-color);
}

.stat-icon-wrapper {
    width: 60px;
    height: 60px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    flex-shrink: 0;
}

.stat-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.stat-details h3 {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--text-muted);
    margin: 0;
}

.stat-number {
    font-size: 32px;
    font-weight: 800;
    color: var(--text-color);
    margin: 0;
}

.border-left-success { border-left-color: var(--success-color) !important; }
.border-left-info { border-left-color: #3b82f6 !important; }
.border-left-warning { border-left-color: var(--warning-color) !important; }

.text-success { color: var(--success-color) !important; }
.text-info { color: #3b82f6 !important; }
.text-warning { color: var(--warning-color) !important; }
.text-primary { color: var(--primary-color) !important; }
.text-muted { color: var(--text-muted) !important; }
.text-danger { color: var(--danger-color) !important; }
.text-danger-important { color: var(--danger-color) !important; }

.font-xs { font-size: 12px; }

/* AUTH VIEWS DESIGN */
.login-page { 
    background: radial-gradient(circle at top right, rgba(74, 222, 128, 0.15), transparent), radial-gradient(circle at bottom left, rgba(22, 163, 74, 0.1), transparent);
    display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; 
}
body.dark-mode .login-page { background: radial-gradient(circle at top right, rgba(74, 222, 128, 0.1), transparent), #020604; }

.login-box { 
    background: var(--card-bg); padding: 45px 40px; border-radius: 24px; 
    border: 2px solid var(--primary-color); box-shadow: var(--shadow-md); width: 100%; max-width: 460px; 
}

.login-header {
    text-align: center;
    margin-bottom: 30px;
}

.login-header h1 {
    font-size: 28px;
    font-weight: 800;
    color: var(--text-color);
    margin-bottom: 8px;
    text-transform: uppercase;
}

.login-header p {
    color: var(--text-muted);
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
}

.logo-icon {
    width: 68px; height: 68px; border-radius: 18px;
    background: linear-gradient(135deg, #15803d 0%, #4ade80 100%);
    color: white; display: flex; align-items: center; justify-content: center; font-size: 30px; margin: 0 auto 20px;
    box-shadow: 0 8px 20px rgba(21, 128, 61, 0.3);
}

.login-logo-image {
    height: 40px;
    width: auto;
    object-fit: contain;
    margin: 0 auto 20px;
    display: block;
    border-radius: 12px;
}

.header-logo-image {
    height: 40px;
    width: auto;
    object-fit: contain;
    margin-right: 15px;
    vertical-align: middle;
    border-radius: 8px;
    flex-shrink: 0;
}

.section-title-container {
    display: flex;
    align-items: center;
    gap: 15px;
}
body.dark-mode .status-btn-group { background: rgba(255,255,255,0.06); }
.status-btn { background: transparent; border: none; color: var(--text-color); cursor: pointer; padding: 8px 18px; font-weight: 700; border-radius: 8px; text-transform: uppercase; z-index: 50; position: relative; }

.status-btn-group {
    display: flex;
    gap: 8px;
    background: var(--bg-color);
    padding: 4px;
    border-radius: 10px;
    border: 1px solid var(--border-color);
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 700;
    font-size: 13px;
    text-transform: uppercase;
    color: var(--text-color);
}

.form-group label i {
    margin-right: 8px;
    color: var(--primary-color);
}

.form-actions {
    margin-top: 30px;
}

.form-footer {
    margin-top: 20px;
    text-align: center;
    font-size: 13px;
    font-weight: 600;
}

.login-form {
    display: flex;
    flex-direction: column;
    z-index: 10;
    position: relative;
}

.form-footer a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 700;
}

.form-footer a:hover {
    text-decoration: underline;
}

.link {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 700;
    cursor: pointer;
    z-index: 100;
    position: relative;
}

.link:hover {
    text-decoration: underline;
}

.status-btn.active[data-status="present"] { background: var(--success-color); color: white; }
.status-btn.active[data-status="absent"] { background: var(--danger-color); color: white; }
.status-btn.active[data-status="late"] { background: var(--warning-color); color: white; }

.user-role-badge { background: rgba(21, 128, 61, 0.15); color: var(--primary-color); font-weight: 700; padding: 4px 10px; border-radius: 8px; border: 1px solid rgba(21, 128, 61, 0.3); font-size: 12px; text-transform: uppercase; }
.badge { font-weight: 700; padding: 6px 14px; border-radius: 8px; text-transform: uppercase; font-size: 12px; }
.badge-present { background-color: rgba(16, 185, 129, 0.2); color: var(--success-color); }
.badge-absent { background-color: rgba(239, 68, 68, 0.2); color: var(--danger-color); }
.badge-late { background-color: rgba(245, 158, 11, 0.2); color: var(--warning-color); }

.form-group input, .custom-input, .date-input, .filter-select { width: 100%; padding: 12px 16px; background: var(--card-bg); color: var(--text-color); border: 2px solid var(--border-color); border-radius: 12px; font-weight: 600; text-transform: uppercase; }
.form-group input:focus, .custom-input:focus { border-color: var(--primary-color); box-shadow: 0 0 0 4px rgba(74, 222, 128, 0.25); outline: none; }

.btn { border: none; cursor: pointer; border-radius: 12px; font-weight: 700; padding: 12px 24px; color: white; transition: all 0.25s; text-transform: uppercase; z-index: 100; position: relative; }
.btn-primary { background: linear-gradient(135deg, #15803d 0%, #16a34a 100%); box-shadow: 0 4px 15px rgba(21, 128, 61, 0.3); }
.btn-primary:hover { transform: translateY(-2px); }

.btn-secondary { background: linear-gradient(135deg, #4b5563 0%, #6b7280 100%); box-shadow: 0 4px 15px rgba(107, 114, 128, 0.3); }
.btn-secondary:hover { transform: translateY(-2px); }

.btn-success { background: linear-gradient(135deg, #059669 0%, #10b981 100%); box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3); }
.btn-success:hover { transform: translateY(-2px); }

.btn-block { width: 100%; display: block; }
.btn-glow { animation: glow 2s ease-in-out infinite alternate; }

@keyframes glow {
    from { box-shadow: 0 4px 15px rgba(21, 128, 61, 0.3); }
    to { box-shadow: 0 4px 25px rgba(74, 222, 128, 0.5); }
}

.live-counter-strip { display: flex; margin: 20px 0; gap: 16px; }
.counter-pill { padding: 10px 24px; border-radius: 14px; font-weight: 700; font-size: 14px; text-transform: uppercase; }
.bg-success-dim { background: rgba(16, 185, 129, 0.15); color: var(--success-color); }
.bg-danger-dim { background: rgba(239, 68, 68, 0.15); color: var(--danger-color); }
.bg-warning-dim { background: rgba(245, 158, 11, 0.15); color: var(--warning-color); }

/* SYSTEM DRAWER & MODAL BOXES */
.modal {
    display: none;
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.6);
    align-items: center;
    justify-content: center;
}

.modal.open { display: flex; }

.modal-content {
    border-radius: 28px;
    border: 3px solid var(--primary-color);
    padding: 40px;
    background: var(--card-bg);
    text-transform: uppercase;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
}

.modal-close {
    position: absolute;
    top: 20px;
    right: 25px;
    font-size: 32px;
    font-weight: 700;
    color: var(--text-muted);
    cursor: pointer;
    transition: color 0.25s;
}

.modal-close:hover { color: var(--danger-color); }

.notification-drawer {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    width: 380px;
    height: 100%;
    background: #03140a;
    border: 2px solid #4ade80;
    color: white;
    text-transform: uppercase;
    z-index: 999;
    flex-direction: column;
}

.notification-drawer.open {
    display: flex;
}

.drawer-header {
    padding: 20px;
    border-bottom: 1px solid rgba(74, 222, 128, 0.3);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.drawer-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
}

.drawer-header button {
    background: none;
    border: none;
    color: white;
    font-size: 32px;
    cursor: pointer;
    font-weight: 700;
}

.drawer-body {
    padding: 20px;
    overflow-y: auto;
    flex-grow: 1;
}

.sms-bubble {
    background: #081f11;
    border-left: 4px solid #4ade80;
    margin-bottom: 10px;
    padding: 12px;
    border-radius: 4px;
}

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-in { animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1); }

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}
.animate-shake { animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97); }

@keyframes zoom {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}
.animate-zoom { animation: zoom 0.3s cubic-bezier(0.16, 1, 0.3, 1); }

.hidden { display: none !important; }

.error-message {
    background: rgba(239, 68, 68, 0.15);
    color: var(--danger-color);
    padding: 12px 16px;
    border-radius: 8px;
    margin-top: 15px;
    font-weight: 700;
    font-size: 13px;
    text-transform: uppercase;
    border: 1px solid rgba(239, 68, 68, 0.3);
}

.success-message {
    background: rgba(16, 185, 129, 0.15);
    color: var(--success-color);
    padding: 12px 16px;
    border-radius: 8px;
    margin-top: 15px;
    font-weight: 700;
    font-size: 13px;
    text-transform: uppercase;
    border: 1px solid rgba(16, 185, 129, 0.3);
}

.welcome-banner {
    background: linear-gradient(135deg, rgba(21, 128, 61, 0.1) 0%, rgba(74, 222, 128, 0.05) 100%);
    border-radius: 16px;
    padding: 30px;
    margin-bottom: 30px;
    border: 2px solid rgba(21, 128, 61, 0.2);
}

.welcome-banner h2 {
    font-size: 32px;
    font-weight: 800;
    margin-bottom: 8px;
    color: var(--text-color);
}

.welcome-banner p {
    color: var(--text-muted);
    font-size: 15px;
    font-weight: 600;
}

.section-actions-bar {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    flex-wrap: wrap;
    align-items: center;
}

.row-layout {
    display: flex;
    gap: 16px;
    align-items: flex-end;
    flex-wrap: wrap;
}

.flex-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.input-label {
    font-weight: 700;
    font-size: 13px;
    text-transform: uppercase;
    color: var(--text-color);
}

.table-container {
    background: var(--card-bg);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: var(--shadow-md);
    border: 1px solid var(--border-color);
}

.data-table {
    width: 100%;
    border-collapse: collapse;
}

.data-table thead {
    background: linear-gradient(135deg, rgba(21, 128, 61, 0.1) 0%, rgba(74, 222, 128, 0.05) 100%);
}

.data-table th {
    padding: 16px;
    text-align: left;
    font-weight: 700;
    font-size: 13px;
    text-transform: uppercase;
    color: var(--text-color);
    border-bottom: 2px solid var(--border-color);
}

.data-table td {
    padding: 16px;
    border-bottom: 1px solid var(--border-color);
    font-weight: 600;
    font-size: 14px;
}

.data-table tbody tr:hover {
    background: rgba(21, 128, 61, 0.05);
}

.data-table tbody tr:last-child td {
    border-bottom: none;
}

.action-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 8px;
    font-weight: 700;
    transition: all 0.25s;
    margin-right: 4px;
}

.action-btn.edit-st, .action-btn.edit-th {
    color: var(--primary-color);
    background: rgba(21, 128, 61, 0.1);
}

.action-btn.edit-st:hover, .action-btn.edit-th:hover {
    background: rgba(21, 128, 61, 0.2);
    transform: translateY(-2px);
}

.action-btn.delete {
    color: var(--danger-color);
    background: rgba(239, 68, 68, 0.1);
}

.action-btn.delete:hover {
    background: rgba(239, 68, 68, 0.2);
    transform: translateY(-2px);
}

.card-box {
    background: var(--card-bg);
    border-radius: 16px;
    padding: 30px;
    box-shadow: var(--shadow-md);
    border: 1px solid var(--border-color);
}

.card-box h3 {
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 24px;
    color: var(--text-color);
    text-transform: uppercase;
}

.setting-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid var(--border-color);
}

.setting-row:last-child {
    border-bottom: none;
}

.setting-row label {
    font-weight: 700;
    font-size: 14px;
    color: var(--text-color);
    text-transform: uppercase;
}

.input-group {
    display: flex;
    gap: 12px;
    align-items: center;
}

.toggle-layout {
    flex-direction: row;
}

.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--border-color);
    transition: 0.4s;
    border-radius: 34px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
}

input:checked + .slider {
    background-color: var(--primary-color);
}

input:checked + .slider:before {
    transform: translateX(26px);
}
`,

    'public/js/client.js': `(function() {
    let mockStudents = [
        { id: 1, studentId: '2026-0001', fullName: 'MARIA SANTOS', course: 'BSIT', year: '3', section: 'J', email: 'SANTOS.PARENT@GMAIL.COM' },
        { id: 2, studentId: '2026-0002', fullName: 'JOSE REYES', course: 'BSOA', year: '3', section: 'K', email: 'REYES.FAMILY@YAHOO.COM' },
        { id: 3, studentId: '2026-0003', fullName: 'ANA GARCIA', course: 'BSIT', year: '4', section: 'A', email: 'GARCIA.PARENTS@GMAIL.COM' }
    ];
    let mockTeachers = [
        { id: 1, fullName: 'DR. ROBERTO TAN', email: 'ROBERTO.TAN@PTC.EDU.PH', username: 'rtan' }
    ];

    if(!localStorage.getItem('ptc_students')) localStorage.setItem('ptc_students', JSON.stringify(mockStudents));
    if(!localStorage.getItem('ptc_teachers')) localStorage.setItem('ptc_teachers', JSON.stringify(mockTeachers));
    if(!localStorage.getItem('ptc_attendance')) localStorage.setItem('ptc_attendance', JSON.stringify([]));
    if(!localStorage.getItem('ptc_users')) {
        localStorage.setItem('ptc_users', JSON.stringify([
            { fullName: 'ADMINISTRATOR', username: 'admin', email: 'ADMIN@PTC.EDU.PH', password: 'admin', role: 'admin' }
        ]));
    }

    function initAuth() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const u = document.getElementById('username').value.toLowerCase();
                const p = document.getElementById('password').value;
                const users = JSON.parse(localStorage.getItem('ptc_users') || '[]');
                const found = users.find(x => x.username.toLowerCase() === u && x.password === p);
                if (found) {
                    localStorage.setItem('ptc_current_user', JSON.stringify(found));
                    window.location.href = '/dashboard';
                } else {
                    const err = document.getElementById('loginError');
                    err.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> INVALID CREDENTIALS. PLEASE TRY AGAIN.';
                    err.classList.remove('hidden');
                }
            });
        }

        const regForm = document.getElementById('registerForm');
        if (regForm) {
            regForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const fullName = document.getElementById('regFullName').value.toUpperCase();
                const email = document.getElementById('regEmail').value.toUpperCase();
                const username = document.getElementById('regUsername').value.toLowerCase();
                const password = document.getElementById('regPassword').value;
                const role = document.getElementById('regRole').value;

                const users = JSON.parse(localStorage.getItem('ptc_users') || '[]');
                if (users.some(x => x.username.toLowerCase() === username)) {
                    const err = document.getElementById('registerError');
                    err.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> USERNAME IS ALREADY TAKEN.';
                    err.classList.remove('hidden');
                    return;
                }

                users.push({ fullName, email, username, password, role });
                localStorage.setItem('ptc_users', JSON.stringify(users));
                
                const s = document.getElementById('registerSuccess');
                s.innerHTML = '<i class="fa-solid fa-circle-check"></i> REGISTRATION SUCCESSFUL! REDIRECTING TO LOGIN...';
                s.classList.remove('hidden');
                setTimeout(() => window.location.href = '/login', 1500);
            });
        }
    }

    function initDashboard() {
        const dashboardPage = document.getElementById('dashboardPage');
        if (!dashboardPage) return;

        const user = JSON.parse(localStorage.getItem('ptc_current_user') || 'null');
        if (!user) { window.location.href = '/login'; return; }

        document.getElementById('currentUserName').textContent = user.fullName.toUpperCase();
        document.getElementById('currentUserRole').textContent = user.role.toUpperCase();
        document.getElementById('userAvatarInitials').textContent = user.fullName.charAt(0).toUpperCase();

        const hr = new Date().getHours();
        let greetText = "GOOD EVENING! 🌙";
        if(hr < 12) greetText = "GOOD MORNING! 🌅";
        else if(hr < 18) greetText = "GOOD AFTERNOON! ☀️";
        document.getElementById('dynamicGreeting').textContent = greetText;

        if (user.role !== 'admin') {
            const navT = document.getElementById('navTeachersLink');
            if (navT) navT.parentElement.remove();
        }

        const navLinks = document.querySelectorAll('.nav-link[data-target]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                const target = this.getAttribute('data-target');
                document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
                document.getElementById(target).classList.add('active');
                document.getElementById('currentSectionTitle').textContent = this.textContent.trim().toUpperCase();
                
                if(target === 'dashboardSection') renderCounters();
                if(target === 'studentsSection') renderStudents();
                if(target === 'teachersSection') renderTeachers();
                if(target === 'attendanceSection') renderAttendanceWorkspace();
                if(target === 'reportSection') renderReports();
            });
        });

        document.getElementById('logoutLink').addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('ptc_current_user');
            window.location.href = '/login';
        });

        document.getElementById('closeDrawerBtn').addEventListener('click', () => {
            document.getElementById('smsNotificationDrawer').classList.remove('open');
        });

        const sysTitle = (localStorage.getItem('ptc_sys_title') || 'PTC GREEN PRO').toUpperCase();
        document.getElementById('sidebarSystemName').textContent = sysTitle;
        document.getElementById('systemNameInput').value = sysTitle;
        
        const isDark = localStorage.getItem('ptc_dark') === 'true';
        if(isDark) document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').checked = isDark;

        document.getElementById('darkModeToggle').addEventListener('change', function() {
            document.body.classList.toggle('dark-mode', this.checked);
            localStorage.setItem('ptc_dark', this.checked);
        });

        document.getElementById('saveSystemNameBtn').addEventListener('click', function() {
            const val = document.getElementById('systemNameInput').value.toUpperCase();
            localStorage.setItem('ptc_sys_title', val);
            document.getElementById('sidebarSystemName').textContent = val;
            alert('SYSTEM TITLE HAS BEEN SUCCESSFULLY UPDATED.');
        });

        setupCrudModals();
        renderCounters();
    }

    function renderCounters() {
        const s = JSON.parse(localStorage.getItem('ptc_students') || '[]');
        const t = JSON.parse(localStorage.getItem('ptc_teachers') || '[]');
        const a = JSON.parse(localStorage.getItem('ptc_attendance') || '[]');
        
        document.getElementById('dashTotalStudents').textContent = s.length;
        document.getElementById('dashTotalTeachers').textContent = t.length;
        
        const uniqueDates = [...new Set(a.map(item => item.date))];
        document.getElementById('dashTotalClasses').textContent = uniqueDates.length;
    }

    function calculateLiveAttendanceCounters() {
        const rows = document.querySelectorAll('#attendanceTableBody tr');
        let pres = 0, abs = 0, lat = 0;
        rows.forEach(r => {
            const activeStatus = r.querySelector('.status-btn.active').getAttribute('data-status');
            if(activeStatus === 'present') pres++;
            if(activeStatus === 'absent') abs++;
            if(activeStatus === 'late') lat++;
        });
        document.getElementById('livePresentCount').textContent = pres;
        document.getElementById('liveAbsentCount').textContent = abs;
        document.getElementById('liveLateCount').textContent = lat;
    }

    function renderStudents() {
        const s = JSON.parse(localStorage.getItem('ptc_students') || '[]');
        const tbody = document.getElementById('studentsTableBody');
        
        // CORRECTION MATRIX: Fixed the visual string bug from image_0d9b30.png using clear ECMAScript template formatting
        tbody.innerHTML = s.map((st, i) => \`
            <tr>
                <td><strong>\${st.studentId.toUpperCase()}</strong></td>
                <td>\${st.fullName.toUpperCase()}</td>
                <td>
                    <span class="user-role-badge">
                        COURSE: \${st.course.toUpperCase()} | SECTION: \${st.year}\${st.section.toUpperCase()}
                    </span>
                </td>
                <td><i class="fa-solid fa-address-book text-muted"></i> \${st.email.toUpperCase()}</td>
                <td>
                    <button class="action-btn edit-st" data-index="\${i}"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="action-btn delete delete-st" data-index="\${i}"><i class="fa-solid fa-trash-can"></i></button>
                </td>
            </tr>
        \`).join('');

        tbody.querySelectorAll('.delete-st').forEach(b => {
            b.addEventListener('click', function() {
                if(confirm('ARE YOU SURE YOU WANT TO REMOVE THIS RECORD?')) {
                    let list = JSON.parse(localStorage.getItem('ptc_students'));
                    list.splice(this.getAttribute('data-index'), 1);
                    localStorage.setItem('ptc_students', JSON.stringify(list));
                    renderStudents();
                }
            });
        });

        tbody.querySelectorAll('.edit-st').forEach(b => {
            b.addEventListener('click', function() {
                let list = JSON.parse(localStorage.getItem('ptc_students'));
                let item = list[this.getAttribute('data-index')];
                document.getElementById('studentIdIndex').value = this.getAttribute('data-index');
                document.getElementById('studentId').value = item.studentId.toUpperCase();
                document.getElementById('studentName').value = item.fullName.toUpperCase();
                document.getElementById('studentCourse').value = item.course.toUpperCase();
                document.getElementById('studentYear').value = item.year;
                document.getElementById('studentSection').value = item.section.toUpperCase();
                document.getElementById('studentEmail').value = item.email.toUpperCase();
                document.getElementById('studentModalTitle').textContent = 'MODIFY STUDENT DATA';
                document.getElementById('studentModal').classList.add('open');
            });
        });
    }

    function renderTeachers() {
        const t = JSON.parse(localStorage.getItem('ptc_teachers') || '[]');
        const tbody = document.getElementById('teachersTableBody');
        tbody.innerHTML = t.map((th, i) => \`
            <tr>
                <td>\${th.fullName.toUpperCase()}</td>
                <td>\${th.email.toUpperCase()}</td>
                <td><span class="user-role-badge">\${th.username.toUpperCase()}</span></td>
                <td>
                    <button class="action-btn edit-th" data-index="\${i}"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="action-btn delete delete-th" data-index="\${i}"><i class="fa-solid fa-trash-can"></i></button>
                </td>
            </tr>
        \`).join('');

        tbody.querySelectorAll('.delete-th').forEach(b => {
            b.addEventListener('click', function() {
                if(confirm('DELETE THIS FACULTY INSTRUCTOR ACCOUNT?')) {
                    let list = JSON.parse(localStorage.getItem('ptc_teachers'));
                    list.splice(this.getAttribute('data-index'), 1);
                    localStorage.setItem('ptc_teachers', JSON.stringify(list));
                    renderTeachers();
                }
            });
        });

        tbody.querySelectorAll('.edit-th').forEach(b => {
            b.addEventListener('click', function() {
                let list = JSON.parse(localStorage.getItem('ptc_teachers'));
                let item = list[this.getAttribute('data-index')];
                document.getElementById('teacherIdIndex').value = this.getAttribute('data-index');
                document.getElementById('teacherName').value = item.fullName.toUpperCase();
                document.getElementById('teacherEmail').value = item.email.toUpperCase();
                document.getElementById('teacherUsername').value = item.username;
                document.getElementById('teacherModalTitle').textContent = 'MODIFY INSTRUCTOR INFO';
                document.getElementById('teacherModal').classList.add('open');
            });
        });
    }

    function renderAttendanceWorkspace() {
        const today = new Date().toISOString().split('T')[0];
        const dateInput = document.getElementById('attendanceDate');
        if(!dateInput.value) dateInput.value = today;

        const s = JSON.parse(localStorage.getItem('ptc_students') || '[]');
        const tbody = document.getElementById('attendanceTableBody');
        
        tbody.innerHTML = s.map((st) => \`
            <tr data-id="\${st.studentId}" data-name="\${st.fullName}" data-parent="\${st.email}">
                <td><strong>\${st.studentId.toUpperCase()}</strong></td>
                <td>\${st.fullName.toUpperCase()}</td>
                <td>
                    <div class="status-btn-group">
                        <button class="status-btn active" data-status="present"><i class="fa-solid fa-circle-check"></i> PRESENT</button>
                        <button class="status-btn" data-status="absent"><i class="fa-solid fa-circle-xmark"></i> ABSENT</button>
                        <button class="status-btn" data-status="late"><i class="fa-solid fa-clock"></i> LATE</button>
                    </div>
                </td>
            </tr>
        \`).join('');

        calculateLiveAttendanceCounters();

        tbody.querySelectorAll('.status-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const group = this.parentElement;
                group.querySelectorAll('.status-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                calculateLiveAttendanceCounters();
            });
        });
    }

    document.getElementById('saveAttendanceBtn')?.addEventListener('click', function() {
        const date = document.getElementById('attendanceDate').value;
        if(!date) { alert('PLEASE SELECT A REFERENCE DATE.'); return; }

        let attendanceList = JSON.parse(localStorage.getItem('ptc_attendance') || '[]');
        attendanceList = attendanceList.filter(x => x.date !== date);

        const rows = document.querySelectorAll('#attendanceTableBody tr');
        const logsContainer = document.getElementById('drawerLogsBody');
        logsContainer.innerHTML = ''; 
        let smsCount = 0;

        rows.forEach(row => {
            const studentId = row.getAttribute('data-id');
            const fullName = row.getAttribute('data-name');
            const parentContact = row.getAttribute('data-parent');
            const status = row.querySelector('.status-btn.active').getAttribute('data-status');
            
            attendanceList.push({ studentId, fullName, date, status });

            if (status === 'absent' || status === 'late') {
                smsCount++;
                const bubble = document.createElement('div');
                bubble.className = 'sms-bubble';
                bubble.innerHTML = \`
                    <strong>TO: \${parentContact.toUpperCase()}</strong><br>
                    <span style="color:#4ade80;">[PTC ALERT]</span> YOUR CHILD <strong>\${fullName.toUpperCase()}</strong> WAS MARKED <span style="color:\${status==='absent'?'#ef4444':'#f59e0b'}; font-weight:bold;">\${status.toUpperCase()}</span> FOR CLASS ON \${date}.
                \`;
                logsContainer.appendChild(bubble);
            }
        });

        localStorage.setItem('ptc_attendance', JSON.stringify(attendanceList));
        
        const drawer = document.getElementById('smsNotificationDrawer');
        if (smsCount > 0) {
            drawer.classList.add('open');
            alert('ATTENDANCE METRICS SAVED SUCCESSFULLY! DISPATCHED (' + smsCount + ') PARENT SMS LOG ALERTS.');
        } else {
            alert('ATTENDANCE RECORDS SUCCESSFULLY STORED FOR ' + date);
        }
    });

    function renderReports() {
        const rDate = document.getElementById('reportDate');
        if(!rDate.value) rDate.value = new Date().toISOString().split('T')[0];

        const filterDate = rDate.value;
        const a = JSON.parse(localStorage.getItem('ptc_attendance') || '[]');
        const filtered = a.filter(x => x.date === filterDate);

        const tbody = document.getElementById('reportTableBody');
        if(filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:var(--text-muted);">NO ATTENDANCE METRICS REGISTERED FOR THIS DAY.</td></tr>';
            return;
        }

        tbody.innerHTML = filtered.map(x => \`
            <tr>
                <td><strong>\${x.studentId.toUpperCase()}</strong></td>
                <td>\${x.fullName.toUpperCase()}</td>
                <td>\${x.date}</td>
                <td><span class="badge badge-\${x.status}">\${x.status.toUpperCase()}</span></td>
            </tr>
        \`).join('');
    }

    document.getElementById('reportDate')?.addEventListener('change', renderReports);
    document.getElementById('printReportBtn')?.addEventListener('click', () => window.print());

    function setupCrudModals() {
        document.getElementById('addStudentBtn').addEventListener('click', () => {
            document.getElementById('studentForm').reset();
            document.getElementById('studentIdIndex').value = '';
            document.getElementById('studentModalTitle').textContent = 'REGISTER STUDENT';
            document.getElementById('studentModal').classList.add('open');
        });
        document.getElementById('closeStudentModal').addEventListener('click', () => {
            document.getElementById('studentModal').classList.remove('open');
        });

        document.getElementById('studentForm').addEventListener('submit', function(e) {
            e.preventDefault();
            let list = JSON.parse(localStorage.getItem('ptc_students') || '[]');
            const idx = document.getElementById('studentIdIndex').value;
            
            const data = {
                studentId: document.getElementById('studentId').value.toUpperCase(),
                fullName: document.getElementById('studentName').value.toUpperCase(),
                course: document.getElementById('studentCourse').value.toUpperCase(),
                year: document.getElementById('studentYear').value,
                section: document.getElementById('studentSection').value.toUpperCase(),
                email: document.getElementById('studentEmail').value.toUpperCase()
            };

            if(idx === '') list.push(data);
            else list[idx] = data;

            localStorage.setItem('ptc_students', JSON.stringify(list));
            document.getElementById('studentModal').classList.remove('open');
            renderStudents();
        });

        document.getElementById('addTeacherBtn').addEventListener('click', () => {
            document.getElementById('teacherForm').reset();
            document.getElementById('teacherIdIndex').value = '';
            document.getElementById('teacherModalTitle').textContent = 'NEW INSTRUCTOR';
            document.getElementById('teacherModal').classList.add('open');
        });
        document.getElementById('closeTeacherModal').addEventListener('click', () => {
            document.getElementById('teacherModal').classList.remove('open');
        });

        document.getElementById('teacherForm').addEventListener('submit', function(e) {
            e.preventDefault();
            let list = JSON.parse(localStorage.getItem('ptc_teachers') || '[]');
            const idx = document.getElementById('teacherIdIndex').value;

            const data = {
                fullName: document.getElementById('teacherName').value.toUpperCase(),
                email: document.getElementById('teacherEmail').value.toUpperCase(),
                username: document.getElementById('teacherUsername').value
            };

            if(idx === '') list.push(data);
            else list[idx] = data;

            localStorage.setItem('ptc_teachers', JSON.stringify(list));
            document.getElementById('teacherModal').classList.remove('open');
            renderTeachers();
        });
    }

    initAuth();
    initDashboard();
})();`
};

console.log('🏗️ RESTRUCTURING ARCHITECTURE WITH CORRECT COMPILER STRING INJECTION FORMAT...');

folders.forEach(f => {
    if (!fs.existsSync(f)) fs.mkdirSync(f, { recursive: true });
});

Object.entries(files).forEach(([name, content]) => {
    fs.writeFileSync(name, content, 'utf8');
    console.log('👉 REFRESHED FILE: ' + name);
});

console.log('\n🌟 SUCCESS: STRING BUGS FROM image_0d9b30.png ARE FIXED AND ALIGNED TO SPECIFICATIONS!');
console.log('EXECUTE THIS TO REBOOT YOUR SYSTEM:');
console.log('\x1b[32m%s\x1b[0m', 'node app.js');

