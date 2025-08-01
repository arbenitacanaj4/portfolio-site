// More About Me Page JavaScript
document.addEventListener("DOMContentLoaded", () => {
  initScrollAnimations()
  initInteractiveBubbles()
  initBookHovers()
})

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")
      }
    })
  }, observerOptions)

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el)
  })
}

// Interactive interest bubbles
function initInteractiveBubbles() {
  const bubbles = document.querySelectorAll(".interest-bubble")

  bubbles.forEach((bubble) => {
    bubble.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1) rotate(5deg)"
    })

    bubble.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)"
    })
  })
}

// Book card interactions
function initBookHovers() {
  const bookCards = document.querySelectorAll(".book-card")

  bookCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const cover = this.querySelector(".book-cover")
      cover.style.transform = "rotateY(-5deg) rotateX(5deg)"
    })

    card.addEventListener("mouseleave", function () {
      const cover = this.querySelector(".book-cover")
      cover.style.transform = "rotateY(0deg) rotateX(0deg)"
    })
  })
}

// Language item animations
document.querySelectorAll(".language-item").forEach((item, index) => {
  item.style.animationDelay = `${index * 0.1}s`
})

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})
