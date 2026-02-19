const typedTextSpan = document.querySelector(".typed-text");

// Array of words to type out
const textArray = ["Developer.", "Designer.", "Problem Solver.", "Coffee Addict."];

// Typing speeds (in milliseconds)
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; // Delay before starting to delete

let textArrayIndex = 0; // Current word index
let charIndex = 0;      // Current character index
let isDeleting = false; // State flag

function typeEffect() {
    // 1. Get the current word
    const currentWord = textArray[textArrayIndex];
    
    // 2. Determine what text to show based on state
    if (isDeleting) {
        // Remove a character
        typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Add a character
        typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    // 3. Determine the speed for the next frame
    let typeSpeed = isDeleting ? erasingDelay : typingDelay;

    // 4. Handle State Changes (End of word vs. Start of word)
    if (!isDeleting && charIndex === currentWord.length) {
        // Finished typing the word, pause, then start deleting
        typeSpeed = newTextDelay;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting, move to the next word
        isDeleting = false;
        textArrayIndex++;
        
        // Loop back to the first word if we reach the end
        if (textArrayIndex >= textArray.length) {
            textArrayIndex = 0;
        }
        
        // Brief pause before typing the new word
        typeSpeed = 500;
    }

    // 5. Call the function again (Recursion)
    setTimeout(typeEffect, typeSpeed);
}

// Start the loop when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Slight initial delay before the typing starts
    setTimeout(typeEffect, 1000);
});
