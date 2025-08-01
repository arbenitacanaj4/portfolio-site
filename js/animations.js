// Animation-specific functionality
document.addEventListener("DOMContentLoaded", () => {
  initScrollAnimations()
  initFormAnimations()
  initHoverEffects()
})

// Scroll-triggered animations using Intersection Observer
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")

        // Special handling for staggered animations
        if (entry.target.classList.contains("stagger-animation")) {
          const siblings = entry.target.parentElement.querySelectorAll(".stagger-animation")
          siblings.forEach((sibling, index) => {
            setTimeout(() => {
              sibling.classList.add("animate")
            }, index * 200)
          })
        }
      }
    })
  }, observerOptions)

  // Observe all elements with animation classes
  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el)
  })
}

// Form input animations
function initFormAnimations() {
  const formControls = document.querySelectorAll(".form-control")

  formControls.forEach((input) => {
    // Focus animation
    input.addEventListener("focus", function () {
      this.style.transform = "scale(1.02)"
      this.style.transition = "all 0.3s ease"
    })

    // Blur animation
    input.addEventListener("blur", function () {
      this.style.transform = "scale(1)"
    })

    // Input validation visual feedback
    input.addEventListener("input", function () {
      if (this.value.length > 0) {
        this.classList.add("has-content")
      } else {
        this.classList.remove("has-content")
      }
    })
  })
}

// Hover effects for interactive elements
function initHoverEffects() {
  // Project cards hover effect
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })

  // Button hover effects
  const customButtons = document.querySelectorAll(".btn-primary-custom, .btn-outline-custom")
  customButtons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)"
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })
}

// Parallax effect for hero section (optional)
function initParallaxEffect() {
  const hero = document.querySelector(".hero")

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5

    if (hero) {
      hero.style.transform = `translateY(${rate}px)`
    }
  })
}

// Text typing animation (can be used for hero section)
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}
