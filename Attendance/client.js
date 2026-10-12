(function() {
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
        tbody.innerHTML = s.map((st, i) => `
            <tr>
                <td><strong>${st.studentId.toUpperCase()}</strong></td>
                <td>${st.fullName.toUpperCase()}</td>
                <td>
                    <span class="user-role-badge">
                        COURSE: ${st.course.toUpperCase()} | SECTION: ${st.year}${st.section.toUpperCase()}
                    </span>
                </td>
                <td><i class="fa-solid fa-address-book text-muted"></i> ${st.email.toUpperCase()}</td>
                <td>
                    <button class="action-btn edit-st" data-index="${i}"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="action-btn delete delete-st" data-index="${i}"><i class="fa-solid fa-trash-can"></i></button>
                </td>
            </tr>
        `).join('');

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
        tbody.innerHTML = t.map((th, i) => `
            <tr>
                <td>${th.fullName.toUpperCase()}</td>
                <td>${th.email.toUpperCase()}</td>
                <td><span class="user-role-badge">${th.username.toUpperCase()}</span></td>
                <td>
                    <button class="action-btn edit-th" data-index="${i}"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="action-btn delete delete-th" data-index="${i}"><i class="fa-solid fa-trash-can"></i></button>
                </td>
            </tr>
        `).join('');

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
        
        tbody.innerHTML = s.map((st) => `
            <tr data-id="${st.studentId}" data-name="${st.fullName}" data-parent="${st.email}">
                <td><strong>${st.studentId.toUpperCase()}</strong></td>
                <td>${st.fullName.toUpperCase()}</td>
                <td>
                    <div class="status-btn-group">
                        <button class="status-btn active" data-status="present"><i class="fa-solid fa-circle-check"></i> PRESENT</button>
                        <button class="status-btn" data-status="absent"><i class="fa-solid fa-circle-xmark"></i> ABSENT</button>
                        <button class="status-btn" data-status="late"><i class="fa-solid fa-clock"></i> LATE</button>
                    </div>
                </td>
            </tr>
        `).join('');

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
                bubble.innerHTML = `
                    <strong>TO: ${parentContact.toUpperCase()}</strong><br>
                    <span style="color:#4ade80;">[PTC ALERT]</span> YOUR CHILD <strong>${fullName.toUpperCase()}</strong> WAS MARKED <span style="color:${status==='absent'?'#ef4444':'#f59e0b'}; font-weight:bold;">${status.toUpperCase()}</span> FOR CLASS ON ${date}.
                `;
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

        tbody.innerHTML = filtered.map(x => `
            <tr>
                <td><strong>${x.studentId.toUpperCase()}</strong></td>
                <td>${x.fullName.toUpperCase()}</td>
                <td>${x.date}</td>
                <td><span class="badge badge-${x.status}">${x.status.toUpperCase()}</span></td>
            </tr>
        `).join('');
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
})();