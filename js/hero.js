// Hero Section Functionality
document.addEventListener("DOMContentLoaded", () => {
  // Start typewriter after its container is visible (0.9s delay + animation time)
  setTimeout(() => {
    initTypewriter()
  }, 1200)

  initScrollIndicator()
  initHeroAnimations()
})

// Typewriter Effect - Normal Speed
function initTypewriter() {
  const typewriterElement = document.getElementById("typewriter")
  const texts = [
    "Aspiring Software Engineer",
    "AI Enthusiast",
    "Tech Explorer",
    "Problem Solver",
    "Stipendium Hungaricum Scholar",
    "Future Innovator",
    "Kosovar in Tech",
    "Passionate Learner",
  ]

  let textIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typeSpeed = 80

  function type() {
    const currentText = texts[textIndex]

    if (isDeleting) {
      typewriterElement.textContent = currentText.substring(0, charIndex - 1)
      charIndex--
      typeSpeed = 40
    } else {
      typewriterElement.textContent = currentText.substring(0, charIndex + 1)
      charIndex++
      typeSpeed = 80
    }

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length
      typeSpeed = 500
    }

    setTimeout(type, typeSpeed)
  }

  type()
}

// Scroll Indicator Click Handler
function initScrollIndicator() {
  const scrollIndicator = document.querySelector(".scroll-indicator")

  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      document.getElementById("about").scrollIntoView({
        behavior: "smooth",
      })
    })
  }
}

// Hero Animations on Load
function initHeroAnimations() {
  const shapes = document.querySelectorAll(".shape")
  shapes.forEach((shape, index) => {
    shape.style.animationDelay = `${index * 0.3}s`
  })

  // Parallax effect for hero background
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const hero = document.querySelector(".hero")
    const rate = scrolled * -0.3

    if (hero && scrolled < hero.offsetHeight) {
      hero.style.transform = `translateY(${rate}px)`
    }
  })
}

// Hero Button Interactions
document.querySelectorAll(".btn-hero-primary, .btn-hero-secondary").forEach((button) => {
  button.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px) scale(1.05)"
  })

  button.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})
