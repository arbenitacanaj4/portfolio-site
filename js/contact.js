// Contact form functionality
document.addEventListener("DOMContentLoaded", () => {
  initContactForm()
})

function initContactForm() {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit)
  }

  // Add real-time validation
  const inputs = contactForm.querySelectorAll("input, textarea")
  inputs.forEach((input) => {
    input.addEventListener("blur", validateField)
    input.addEventListener("input", clearValidation)
  })
}

function handleFormSubmit(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const submitButton = e.target.querySelector('button[type="submit"]')

  // Show loading state
  const originalText = submitButton.innerHTML
  submitButton.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...'
  submitButton.disabled = true

  // Simulate form submission (replace with actual form handling)
  setTimeout(() => {
    // Show success message
    showNotification("Message sent successfully!", "success")

    // Reset form
    e.target.reset()

    // Reset button
    submitButton.innerHTML = originalText
    submitButton.disabled = false
  }, 2000)
}

function validateField(e) {
  const field = e.target
  const value = field.value.trim()

  // Remove existing validation classes
  field.classList.remove("is-valid", "is-invalid")

  // Basic validation
  if (field.hasAttribute("required") && !value) {
    field.classList.add("is-invalid")
    return false
  }

  // Email validation
  if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      field.classList.add("is-invalid")
      return false
    }
  }

  field.classList.add("is-valid")
  return true
}

function clearValidation(e) {
  const field = e.target
  field.classList.remove("is-valid", "is-invalid")
}

function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`
  notification.style.cssText = "top: 100px; right: 20px; z-index: 9999; min-width: 300px;"
  notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `

  // Add to page
  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove()
    }
  }, 5000)
}

// Contact info animations
function initContactInfoAnimations() {
  const contactItems = document.querySelectorAll(".contact-item")

  contactItems.forEach((item, index) => {
    item.style.opacity = "0"
    item.style.transform = "translateX(-20px)"
    item.style.transition = "all 0.6s ease-out"

    setTimeout(() => {
      item.style.opacity = "1"
      item.style.transform = "translateX(0)"
    }, index * 200)
  })
}

// Initialize contact info animations when section is visible
const contactSection = document.getElementById("contact")
if (contactSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        initContactInfoAnimations()
        observer.unobserve(entry.target)
      }
    })
  })

  observer.observe(contactSection)
}
