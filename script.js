document.addEventListener("DOMContentLoaded", () => {
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
});