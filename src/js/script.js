// Dropdown Menu
const navLinks = document.querySelectorAll('.navbar__link')
const navDropdowns = document.querySelectorAll('.navbar__dropdown')

navLinks.forEach((link, idx) => {

    link.addEventListener('click', () => {
        navDropdowns[idx].classList.toggle('navbar__dropdown--show')
    })
})

// Payment Pagination
let currentCardIdx = 0;
const cards = document.querySelectorAll('.card');
const dots = document.querySelectorAll('.payment__dot');

function updateCard() {
    // Selected card visible
    cards.forEach(card => card.classList.remove('card--active'))
    cards[currentCardIdx].classList.add('card--active')

    // Selected dot active
    dots.forEach(dot => dot.classList.remove('payment__dot--active'))
    dots[currentCardIdx].classList.add('payment__dot--active')
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentCardIdx = index;
        updateCard();
    })
})

// Initialize the first card
updateCard();

// Re-run updateReview on window resize to ensure proper layout on viewport change
window.addEventListener("resize", updateCard);