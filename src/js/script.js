const navLinks = document.querySelectorAll('.navbar__link')
const navDropdowns = document.querySelectorAll('.navbar__dropdown')

navLinks.forEach((link, idx) => {

    link.addEventListener('click', () => {
        navDropdowns[idx].classList.toggle('navbar__dropdown--show')
    })
})