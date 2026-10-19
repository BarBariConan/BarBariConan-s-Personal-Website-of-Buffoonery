document.addEventListener("DOMContentLoaded", () => {

    // drag code
    const windowEl = document.getElementById("draggableWindow");
    
    // Safety check: only run the code if the window exists on this page
    if (!windowEl) return;

    const headerEl = windowEl.querySelector(".window-header");
    if (!headerEl) return;

    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    headerEl.addEventListener("mousedown", (e) => {
        isDragging = true;
        
        // Track where the mouse cursor is clicked
        startX = e.clientX;
        startY = e.clientY;
        
        // Track the current top/left position of the window frame
        initialLeft = windowEl.offsetLeft;
        initialTop = windowEl.offsetTop;

        // Stop text highlighting artifacts while dragging
        e.preventDefault(); 
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        // Calculate how many pixels the cursor has traveled
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        // Adjust the absolute positioning coordinates dynamically
        windowEl.style.left = `${initialLeft + deltaX}px`;
        windowEl.style.top = `${initialTop + deltaY}px`;
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });


    //taskbar clock
    function updateTaskbarClock() {
    const clockElement = document.getElementById('taskbar-clock');
    if (!clockElement) return;
    
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // Formats '0' to '12'
    
    clockElement.innerText = `${hours}:${minutes} ${ampm}`;
    }

    // Run immediately and set update cycle for every single second
    updateTaskbarClock();
    setInterval(updateTaskbarClock, 1000);


    //start menu
    const startOrb = document.getElementById('start-orb-btn');
    const startMenu = document.getElementById('start-menu');

    // Open or close the start menu panel on click
    startOrb.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents the desktop click listener from firing instantly
        startMenu.classList.toggle('open');
    });

    // Auto-close the menu if a click happens anywhere else on the page background
    document.addEventListener('click', (e) => {
        if (!startMenu.contains(e.target) && e.target !== startOrb) {
        startMenu.classList.remove('open');
        }
    });
});