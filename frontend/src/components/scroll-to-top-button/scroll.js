// src/utils/scroll.js

// --- Các hàm Easing ---

// Bỏ hoặc giữ lại hàm cũ nếu muốn
// function easeInOutQuad(t, b, c, d) { ... }

// HÀM MỚI: EaseOutQuad - Bắt đầu nhanh, kết thúc chậm
export function easeOutQuad(t, b, c, d) {
    t /= d;
    return -c * t * (t - 2) + b;
}

// --- Hàm cuộn mượt ---
export function smoothScrollTo(targetY, duration) {
    const scrollContainer = window;
    const startY = scrollContainer.scrollY ?? scrollContainer.pageYOffset;
    const changeY = targetY - startY;
    let startTime = null;

    if (changeY === 0) return;

    function animationStep(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;

        // *** THAY ĐỔI CHÍNH Ở ĐÂY ***
        // Gọi hàm easing mới: easeOutQuad thay vì easeInOutQuad
        const nextY = easeOutQuad(timeElapsed, startY, changeY, duration);

        scrollContainer.scrollTo(0, nextY);

        if (timeElapsed < duration) {
            requestAnimationFrame(animationStep);
        } else {
            scrollContainer.scrollTo(0, targetY);
        }
    }
    requestAnimationFrame(animationStep);
}