var dataSet = [
    ["Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000"],
    ["Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500"],
    ["Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900"],
    ["Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500"],
    ["Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600"],
    ["Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560"],
    ["Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000"],
    ["Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800"],
    ["Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750"],
    ["Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000"],
    ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060"],
    ["Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700"],
    ["Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600"],
    ["Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500"],
    ["Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750"],
    ["Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500"],
    ["Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000"],
    ["Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500"],
    ["Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000"],
    ["Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500"],
    ["Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000"],
    ["Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000"],
    ["Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450"],
    ["Doris Wilder", "Sales Assistant", "Sidney", "3023", "2010/09/20", "$85,600"],
    ["Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000"],
    ["Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575"],
    ["Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650"],
    ["Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850"],
    ["Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000"],
    ["Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000"],
    ["Michelle House", "Integration Specialist", "Sidney", "2769", "2011/06/02", "$95,400"],
    ["Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500"],
    ["Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000"],
    ["Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500"],
    ["Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050"],
    ["Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675"],
];


// ─────────────────────────────────────────────
// Run all setup once the DOM is fully parsed.
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

    // ── Shared: footer date ───────────────────
    const dateEl = document.getElementById('setDate');
    if (dateEl) dateEl.innerText = new Date().toLocaleDateString();

    // ── Shared: mobile hamburger nav ─────────
    initMobileNav();

    // ── Route to the correct page module ─────
    const page = document.body.dataset.page;

    if (page === 'profile') initProfilePage();
    else if (page === 'markGrade') initGradePage();
    else if (page === 'staffPage') initStaffPage();
    else if (page === 'tempPage') initTempPage();
});


// ═══════════════════════════════════════════════════════
//  FOR ALL PAGES
// ═══════════════════════════════════════════════════════

/**
 * initMobileNav — handle navigation bar
 * in/out on small screens.
 */
function initMobileNav() {
    const menuBtn = document.getElementById('menu-btn');
    const navBar = document.getElementById('nav-bar');
    if (!menuBtn || !navBar) return;

    const icon = menuBtn.querySelector('.icon-menu');

    menuBtn.addEventListener('click', () => {
        navBar.classList.toggle('active');
        if (icon) icon.classList.toggle('open');
    });
}

/**
 * isNullOrWhitespace — throws an error if the string is
 * empty, null, undefined, or pure whitespace.**/
function isNullOrWhitespace(str) {
    if (str === null || str === undefined || str.trim() === '') {
        throw new Error('Please enter a score — the field cannot be empty.');
    }
    return str.trim();
}


// ═══════════════════════════════════════════════════════
//  PAGE: PROFILE
// ═══════════════════════════════════════════════════════

/**
 * initProfilePage — triggers the delayed profile image reveal.
 */
function initProfilePage() {
    const img = document.getElementById('profile-image');
    if (!img) return;
 
    // Wait 10 seconds, then add .visible to trigger the CSS fade-in transition.
    // The delay lives here in JS; the CSS only handles the opacity animation itself.
    setTimeout(() => {
        img.classList.add('visible');
    }, 10000);
}


// ═══════════════════════════════════════════════════════
//  PAGE: MARK GRADE
// ═══════════════════════════════════════════════════════

/**
 * initGradePage — sets up the calculate button and result display.
 */
function initGradePage() {
    const calcBtn = document.getElementById('calculate-btn');
    const inputEl = document.getElementById('grade-input');
    const errorEl = document.getElementById('validation-message');

    if (!calcBtn) return;

    calcBtn.addEventListener('click', () => {
        // Reset previous state
        errorEl.innerText = '';
        inputEl.classList.remove('error');
        resetGradeDisplay();

        processGrade(inputEl.value, errorEl, inputEl);
    });

    // Also allow Enter key in the input field
    inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') calcBtn.click();
    });
}

/**
 * processGrade — validates the raw input and updates the UI with
 * the computed letter grade and gauge animation.
 *
 */
function processGrade(rawValue, errorEl, inputEl) {
    try {
        const cleaned = isNullOrWhitespace(rawValue);
        const score = parseFloat(cleaned);

        // parseFloat returns NaN for non-numeric strings
        if (Number.isNaN(score)) {
            throw new Error('That doesn\'t look like a number. Please enter digits only (e.g. 75).');
        }

        // Reject fractional input that is otherwise numeric
        if (!isFinite(score)) {
            throw new Error('Please enter a finite numeric value.');
        }

        if (score < 0) {
            throw new Error('Score cannot be negative. Enter a value between 0 and 100.');
        }

        if (score > 100) {
            throw new Error('Score cannot exceed 100. Enter a value between 0 and 100.');
        }

        // All checks passed — compute and display
        const letter = calcGrade(score);
        updateGradeDisplay(score, letter);

    } catch (err) {
        inputEl.classList.add('error');
        errorEl.innerText = err.message;
    }
}

/**
 * calcGrade — maps a numeric score to a letter grade.
 *
 */
function calcGrade(score) {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    if (score >= 50) return 'E';
    return 'F';
}

/** Grade metadata for display (colour + description) */
const GRADE_META = {
    A: { color: '#22c55e', desc: 'Excellent — outstanding work' },
    B: { color: '#3b82f6', desc: 'Good — above average performance' },
    C: { color: '#eab308', desc: 'Satisfactory — meets expectations' },
    D: { color: '#f97316', desc: 'Below average — needs improvement' },
    E: { color: '#ef4444', desc: 'Poor — significant effort required' },
    F: { color: '#b91c1c', desc: 'Fail — did not meet minimum standard' },
};

/*
 * updateGradeDisplay
 *
 */
function updateGradeDisplay(score, letter) {
    // Gauge arc: circumference ≈ 2π × 58 ≈ 364.4 (we use 364 for the SVG)
    const circumference = 2 * Math.PI * 58; // ≈ 364.4
    const arc = document.getElementById('gauge-arc');
    const offset = circumference - (score / 100) * circumference;

    arc.style.strokeDasharray = circumference;
    arc.style.strokeDashoffset = offset;
    arc.style.stroke = GRADE_META[letter].color;

    // Score counter
    document.getElementById('currentScore').innerText = score;

    // Letter grade + descriptor
    const gradeEl = document.getElementById('grade');
    gradeEl.innerText = letter;
    gradeEl.style.color = GRADE_META[letter].color;

    document.getElementById('grade-descriptor').innerText = GRADE_META[letter].desc;

    // Highlight the matching scale tile
    document.querySelectorAll('.scale-item').forEach(el => {
        el.classList.toggle('active', el.dataset.grade === letter);
    });
}

/**
 * resetGradeDisplay — clears result elements back to their initial
 * "awaiting input" state before each new calculation.
 */
function resetGradeDisplay() {
    const circumference = 2 * Math.PI * 58;
    const arc = document.getElementById('gauge-arc');
    arc.style.strokeDashoffset = circumference;
    arc.style.stroke = 'var(--accent)';

    document.getElementById('currentScore').innerText = '0';
    document.getElementById('grade').innerText = '—';
    document.getElementById('grade').style.color = '';
    document.getElementById('grade-descriptor').innerText = 'Awaiting input';

    document.querySelectorAll('.scale-item').forEach(el => el.classList.remove('active'));
}


// ═══════════════════════════════════════════════════════
//  PAGE: STAFF
// ═══════════════════════════════════════════════════════

/**
 * initStaffPage — renders staff cards on load and wires up
 * the name / salary sort dropdowns.
 */
function initStaffPage() {
    const grid = document.getElementById('staff-organize');
    const countEl = document.getElementById('staff-count');
    const nameBtn = document.getElementById('name');
    const salaryBtn = document.getElementById('salary');
    const ddName = document.getElementById('dd-name');
    const ddSalary = document.getElementById('dd-salary');

    if (!grid) return;

    // Initial render
    renderStaffCards(dataSet, grid);
    if (countEl) countEl.innerText = `${dataSet.length} employees`;

    // ── Name dropdown toggle ──────────────────
    nameBtn.addEventListener('click', () => {
        ddName.classList.toggle('active');
        nameBtn.classList.toggle('open');
        ddSalary.classList.remove('active');
        salaryBtn.classList.remove('open');
    });

    ddName.querySelector('.asc').addEventListener('click', (e) => {
        e.stopPropagation();
        sortByName('asc');
        ddName.classList.remove('active');
        nameBtn.classList.remove('open');
    });

    ddName.querySelector('.desc').addEventListener('click', (e) => {
        e.stopPropagation();
        sortByName('desc');
        ddName.classList.remove('active');
        nameBtn.classList.remove('open');
    });

    // ── Salary dropdown toggle ────────────────
    salaryBtn.addEventListener('click', () => {
        ddSalary.classList.toggle('active');
        salaryBtn.classList.toggle('open');
        ddName.classList.remove('active');
        nameBtn.classList.remove('open');
    });

    ddSalary.querySelector('.asc').addEventListener('click', (e) => {
        e.stopPropagation();
        sortBySalary('asc');
        ddSalary.classList.remove('active');
        salaryBtn.classList.remove('open');
    });

    ddSalary.querySelector('.desc').addEventListener('click', (e) => {
        e.stopPropagation();
        sortBySalary('desc');
        ddSalary.classList.remove('active');
        salaryBtn.classList.remove('open');
    });

    // ── Close dropdowns on outside click ─────
    document.addEventListener('click', (e) => {
        if (!nameBtn.contains(e.target)) { ddName.classList.remove('active'); nameBtn.classList.remove('open'); }
        if (!salaryBtn.contains(e.target)) { ddSalary.classList.remove('active'); salaryBtn.classList.remove('open'); }
    });

    /**
     * sortByName — sorts dataSet alphabetically by employee name
     * and re-renders the grid.
     *
     * @param {'asc'|'desc'} direction
     */
    function sortByName(direction) {
        dataSet.sort((a, b) => {
            const x = a[0].toLowerCase();
            const y = b[0].toLowerCase();
            if (x < y) return direction === 'asc' ? -1 : 1;
            if (x > y) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        grid.innerHTML = '';
        renderStaffCards(dataSet, grid);
    }

    /**
     * sortBySalary — strips the "$" and commas from the salary string,
     * converts to a float, then sorts numerically.
     *
     * @param {'asc'|'desc'} direction
     */
    function sortBySalary(direction) {
        dataSet.sort((a, b) => {
            const x = parseSalary(a[5]);
            const y = parseSalary(b[5]);
            return direction === 'asc' ? x - y : y - x;
        });
        grid.innerHTML = '';
        renderStaffCards(dataSet, grid);
    }
}

/**
 * parseSalary — converts a formatted salary string like "$372,000"
 * into a plain number (372000) for numeric comparison.
 *
 * @param {string} str — salary string with "$" and commas
 * @returns {number}
 */
function parseSalary(str) {
    return parseFloat(str.replace(/[$,]/g, ''));
}

/**
 * getInitials — extracts up to two initials from a full name string
 * for use in the avatar circle.
 *
 * @param {string} fullName
 * @returns {string} e.g. "BW" for "Brielle Williamson"
 */
function getInitials(fullName) {
    return fullName
        .split(' ')
        .slice(0, 2)
        .map(word => word[0].toUpperCase())
        .join('');
}

/**
 * renderStaffCards — creates and appends a card element for each
 * entry in the data array.
 *
 * @param {Array} data   — the staff dataset (or a sorted copy)
 * @param {HTMLElement} parent — the grid container element
 */
function renderStaffCards(data, parent) {
    data.forEach((employee) => {
        const [name, job, city, id, hireDate, salary] = employee;

        const card = document.createElement('div');
        card.classList.add('staff-card');
        card.innerHTML = `
            <div class="card-header">
                <div class="avatar">${getInitials(name)}</div>
                <div>
                    <p class="card-name">${name}</p>
                    <p class="card-job">${job}</p>
                </div>
            </div>
            <div class="card-meta">
                <div class="meta-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span>${city}</span>
                </div>
                <div class="meta-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 2v4"/><path d="M16 2v4"/>
                    </svg>
                    <span>Joined ${hireDate}</span>
                </div>
                <div class="meta-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/>
                        <line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/>
                    </svg>
                    <span>ID ${id}</span>
                </div>
                <div class="meta-salary">
                    <span class="salary-label">Annual salary</span>
                    <span class="salary-value">${salary}</span>
                </div>
            </div>
        `;

        parent.appendChild(card);
    });
}


// ═══════════════════════════════════════════════════════
//  PAGE: TEMPERATURE CONVERTER
// ═══════════════════════════════════════════════════════

/**
 * initTempPage — wires up unit buttons and the text input.
 * Converts on button click; also converts live as the user types.
 */
function initTempPage() {
    const input = document.getElementById('temp-input');
    const errorEl = document.getElementById('temp-error');
    const unitLabel = document.getElementById('current-unit-label');
    const celBtn = document.querySelector('.unit-btn.celsius');
    const farBtn = document.querySelector('.unit-btn.fahrenheight');
    const kelBtn = document.querySelector('.unit-btn.kelvin');

    /** Currently selected unit — defaults to Celsius */
    let activeUnit = 'c';

    // Set initial selected state
    celBtn.classList.add('selected');
    updateUnitLabel('c');

    // ── Unit selection buttons ────────────────
    celBtn.addEventListener('click', () => selectUnit('c', activeUnit));
    farBtn.addEventListener('click', () => selectUnit('f', activeUnit));
    kelBtn.addEventListener('click', () => selectUnit('k', activeUnit));

    /**
     * selectUnit — updates the active unit, button styling,
     * and label, then recalculates if there's a current value.
     *
     * @param {'c'|'f'|'k'} unit
     */
    function selectUnit(unit, prevUnit) {
        activeUnit = unit;
        const btnMap = { c: celBtn, f: farBtn, k: kelBtn };
        btnMap[unit].classList.add('selected');
        btnMap[prevUnit].classList.remove('selected')
        updateUnitLabel(unit);

        // Recalculate with the new unit immediately
        if (input.value.trim()) attemptConversion();
    }

    /**
     * updateUnitLabel — shows the full unit name next to the input.
     * @param {'c'|'f'|'k'} unit
     */
    function updateUnitLabel(unit) {
        const labels = { c: '°C', f: '°F', k: 'K' };
        if (unitLabel) unitLabel.innerText = labels[unit] || '';
    }

    // Live conversion as user types
    input.addEventListener('input', () => {
        input.classList.remove('error');
        errorEl.innerText = '';
        if (input.value.trim()) attemptConversion();
        else clearResults();
    });

    /**
     * attemptConversion — validates the input value and updates
     * the result display. Shows an error message on bad input.
     */
    function attemptConversion() {
        try {
            const cleaned = isNullOrWhitespace(input.value);
            const value = parseFloat(cleaned);

            if (Number.isNaN(value)) {
                throw new Error('Please enter a valid numeric temperature.');
            }

            const results = convertTemp(activeUnit, value);
            displayResults(results);

        } catch (err) {
            input.classList.add('error');
            errorEl.innerText = err.message;
            clearResults();
        }
    }
}

/**
 * convertTemp — converts a temperature from the given unit to the
 * other two units, returning them as labelled result objects.
 *
 * @param {'c'|'f'|'k'} fromUnit — input unit
 * @param {number} value          — the temperature value to convert
 * @returns {Array} two objects { unit, value } for the target units
 */
function convertTemp(fromUnit, value) {
    const UNIT_NAMES = { c: 'Celsius (°C)', f: 'Fahrenheit (°F)', k: 'Kelvin (K)' };

    if (fromUnit === 'c') {
        return [
            { unit: UNIT_NAMES.f, value: ((value * 9 / 5) + 32).toFixed(2) },
            { unit: UNIT_NAMES.k, value: (value + 273.15).toFixed(2) },
        ];
    }
    if (fromUnit === 'f') {
        return [
            { unit: UNIT_NAMES.c, value: ((value - 32) * 5 / 9).toFixed(2) },
            { unit: UNIT_NAMES.k, value: ((value - 32) * 5 / 9 + 273.15).toFixed(2) },
        ];
    }
    if (fromUnit === 'k') {
        return [
            { unit: UNIT_NAMES.c, value: (value - 273.15).toFixed(2) },
            { unit: UNIT_NAMES.f, value: ((value - 273.15) * 9 / 5 + 32).toFixed(2) },
        ];
    }
}

/**
 * displayResults — writes the two converted values into the result
 * rows and briefly flashes the colour to signal an update.
 *
 * @param {Array} results — array of two { unit, value } objects
 */
function displayResults(results) {
    const rows = [
        {
            unitEl: document.querySelector('.first-unit'),
            valueEl: document.querySelector('.first-value'),
        },
        {
            unitEl: document.querySelector('.second-unit'),
            valueEl: document.querySelector('.second-value'),
        },
    ];

    results.forEach((result, i) => {
        rows[i].unitEl.innerText = result.unit;
        rows[i].valueEl.innerText = result.value;

        // Brief colour flash so the user notices the update
        rows[i].valueEl.classList.remove('updated');
        void rows[i].valueEl.offsetWidth; // force reflow to restart animation
        rows[i].valueEl.classList.add('updated');
    });
}

/**
 * clearResults — resets both result rows to empty dashes when
 * there is no valid input to display.
 */
function clearResults() {
    document.querySelectorAll('.result-unit-label, .result-value').forEach(el => {
        el.innerText = '—';
    });
}
