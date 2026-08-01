AOS.init({
    once: true
});

const words = ["ui/ux designer", "frontend developer", "it support", "database developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const erasingSpeed = 50;
const delayBetweenWords = 1500;
const typingTextElement = document.querySelector(".typing-text");

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => isDeleting = true, delayBetweenWords);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, isDeleting ? erasingSpeed : typingSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeEffect, 500);
});