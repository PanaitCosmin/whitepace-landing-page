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
const dots = document.querySelectorAll('.payment-dot');

function updateCard() {
    // Selected card visible
    cards.forEach(card => card.classList.remove('card--active'))
    cards[currentCardIdx].classList.add('card--active')

    // Selected dot active
    dots.forEach(dot => dot.classList.remove('payment-dot--active'))
    dots[currentCardIdx].classList.add('payment-dot--active')
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


// Review Navigation
let currentReviewIdx = 0
const reviewCards = document.querySelectorAll('.review__card');
const reviewDots = document.querySelectorAll('.review-dot');

function updateCardReview() {

    // Update Review Card
    reviewCards.forEach(card => card.classList.remove('review__card--active'))
    reviewCards[currentReviewIdx].classList.add('review__card--active')

    // Update Dots Review
    reviewDots.forEach(dot => dot.classList.remove('review-dot--active'))
    reviewDots[currentReviewIdx].classList.add('review-dot--active')
}

reviewDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentReviewIdx = index;
        updateCardReview();
    })
})

// Initialize the first card
updateCardReview();

// Re-run updateReview on window resize to ensure proper layout on viewport change
window.addEventListener("resize", updateCardReview);

