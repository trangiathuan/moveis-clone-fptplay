// src/utils/scroll.js

// Hàm EaseOutCubic - Nhanh mạnh lúc đầu, chậm dần về cuối
export function easeOutCubic(t, b, c, d) {
    t /= d;
    t--;
    return c * (t * t * t + 1) + b;
}

export function smoothScrollTo(targetY, duration) {
    const scrollContainer = window;
    const startY = scrollContainer.scrollY ?? scrollContainer.pageYOffset;
    const changeY = targetY - startY;
    let startTime = null;

    if (changeY === 0) return;

    function animationStep(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;

        const nextY = easeOutCubic(timeElapsed, startY, changeY, duration);

        scrollContainer.scrollTo(0, nextY);

        if (timeElapsed < duration) {
            requestAnimationFrame(animationStep);
        } else {
            scrollContainer.scrollTo(0, targetY);
        }
    }

    requestAnimationFrame(animationStep);
}
