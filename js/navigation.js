// Navigation-specific functionality
document.addEventListener("DOMContentLoaded", () => {
  initActiveNavigation()
})

// Throttle function declaration
function throttle(func, limit) {
  let lastFunc
  let lastRan
  return function () {
    
    const args = arguments
    if (!lastRan) {
      func.apply(this, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(
        () => {
          if (Date.now() - lastRan >= limit) {
            func.apply(this, args)
            lastRan = Date.now()
          }
        },
        limit - (Date.now() - lastRan),
      )
    }
  }
}

// Bootstrap object declaration
const bootstrap = {
  Collapse: function (element) {
    this.element = element
    this.hide = () => {
      element.classList.remove("show")
    }
  },
}

// Active navigation highlighting based on scroll position
function initActiveNavigation() {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")
  const sections = document.querySelectorAll("section[id]")

  // Throttled scroll handler for better performance
  const handleScroll = throttle(() => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100 // Offset for navbar
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    // Update active nav link
    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  }, 100)

  window.addEventListener("scroll", handleScroll)

  // Set initial active state
  handleScroll()
}

// Mobile menu close on link click
document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const navbarCollapse = document.querySelector(".navbar-collapse")
    if (navbarCollapse.classList.contains("show")) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse)
      bsCollapse.hide()
    }
  })
})

// Navbar brand smooth scroll to top
document.querySelector(".navbar-brand").addEventListener("click", (e) => {
  e.preventDefault()
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})
