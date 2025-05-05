"use strict";

let sections;

// Function to handle navigation bar resize
const handleNavbarResize = () => {
  const navbar = document.querySelector(".navbar");
  window.onscroll = () => {
    window.scrollY > 20
      ? navbar.classList.add("sticky")
      : navbar.classList.remove("sticky");
  };
};

// Function to add active link with section scroll
const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 60; // adjust for navbar
    const sectionId = current.getAttribute("id");

    const navLink = document.querySelector(`.links a[href*="${sectionId}"]`);

    if (navLink) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLink.classList.add("active");
      } else {
        navLink.classList.remove("active");
      }
    }
  });
};

// Function to handle navigation toggler
const handleNavToggler = () => {
  const navMenu = document.querySelector(".menu");
  const navToggler = document.querySelector(".menu-btn");

  if (navToggler) {
    navToggler.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }
};

// Function to close the menu when a link is clicked
const handleNavLinkClick = () => {
  const navMenu = document.querySelector(".menu");
  navMenu.classList.remove("active");
};

// Function for typing effect
const typingEffect = (target, text, speed, callback) => {
  let i = 0;
  target.innerHTML = ""; // Clear previous text
  const typeWriter = () => {
    if (i < text.length) {
      target.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    } else if (callback) {
      setTimeout(callback, 500); // small pause before switching
    }
  };
  typeWriter();
};

const startTypingLoop = () => {
  const typingTarget = document.querySelector("#typing-effect");
  const typingTexts = ["UX/UI Designer", "React Developer"];
  const typingSpeed = 150;
  const delayBetween = 2000;
  let index = 0;

  const loopTyping = () => {
    typingEffect(typingTarget, typingTexts[index], typingSpeed, () => {
      index = (index + 1) % typingTexts.length;
      setTimeout(loopTyping, delayBetween);
    });
  };

  loopTyping();
};
//Contact button attention grabber
const addPulsate = () => {
  const button = document.getElementById("contactButton");
  button.classList.add("pulsate");
  setTimeout(() => {
    button.classList.remove("pulsate");
  }, 500);
};

//skill Animation
const checkScroll = (element) => {
  let rect = element.getBoundingClientRect();
  return window.innerHeight >= rect.top + element.offsetHeight;
};
const skillEffect = () => {
  const skillWrap = document.querySelector(".about-skills");
  const skillBars = Array.from(document.querySelectorAll(".progress-line"));

  if (!checkScroll(skillWrap)) return;
  skillBars.forEach((skill) => (skill.style.width = skill.dataset.progress));
};

// Function to fetch and render projects from JSON
const fetchAndRenderProjects = () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "assets/project2.json");

  xhr.addEventListener("load", () => {
    if (xhr.status === 200) {
      let content = JSON.parse(xhr.responseText);
      //console.log(content);

      const displayProjectContainer =
        document.querySelector(".display-project");
      const filterButtons = document.querySelectorAll(".filter-btn");

      // filter projects based on the category
      const filterProjects = (categoryName) => {
        // Clear the displayProjectContainer
        displayProjectContainer.innerHTML = "";

        // unique image sources
        const uniqueImageSources = new Set();

        for (const project of content.projects) {
          if (
            project.categories.includes(categoryName) ||
            categoryName === "all"
          ) {
            for (const img of project.imgs) {
              uniqueImageSources.add(JSON.stringify(img)); // add whole object as string
            }
          }
        }

        for (const imgStr of uniqueImageSources) {
          const imgObj = JSON.parse(imgStr); // convert string back to object

          const projectContainer = document.createElement("div");
          projectContainer.classList.add("project-container");

          const projectLink = document.createElement("a");
          projectLink.href = imgObj.link;
          projectLink.target = "_blank";

          const projectImage = document.createElement("img");
          projectImage.src = imgObj.src;
          projectImage.alt = "";
          projectImage.style.width = "500px";
          projectImage.style.height = "300px";
          projectImage.style.border = "2px solid #ddd";
          projectImage.style.borderRadius = "5px";

          projectLink.appendChild(projectImage);
          projectContainer.appendChild(projectLink);
          displayProjectContainer.appendChild(projectContainer);
        }
      };

      for (const button of filterButtons) {
        button.addEventListener("click", () => {
          const selectedCategory = button.getAttribute("data-filter");
          filterProjects(selectedCategory);
        });
      }
      filterProjects("all");
    } else {
      // Handle other HTTP status codes (e.g., 404, 500, etc.)
      console.error(`Error loading projects. HTTP status: ${xhr.status}`);
    }
  });

  xhr.addEventListener("error", () => {
    // Handle network errors
    console.error("Network error occurred while loading projects.");
  });

  xhr.send();
};

//Form Validation
// const validateForm = (event) => {
//   event.preventDefault();

//   const nameError = document.querySelector("#nameError");
//   const emailError = document.querySelector("#emailError");
//   const subjectError = document.querySelector("#subjectError");
//   const messageError = document.querySelector("#messageError");

//   nameError.textContent = "";
//   emailError.textContent = "";
//   subjectError.textContent = "";
//   messageError.textContent = "";
//   const name = document.querySelector("#name").value;
//   const email = document.querySelector("#email").value;
//   const subject = document.querySelector("#subject").value;
//   const message = document.querySelector("#message").value;

//   if (!name.trim()) {
//     document.querySelector("#nameError").textContent = "Name is required";
//     return;
//   }

//   if (!email.trim()) {
//     document.querySelector("#emailError").textContent = "Email is required";
//     return;
//   } else if (!isValidEmail(email)) {
//     document.querySelector("#emailError").textContent = "Enter a valid Email";
//     return;
//   }
//   if (!subject.trim()) {
//     document.querySelector("#subjectError").textContent = "Subject is required";
//     return;
//   }
//   if (!message.trim()) {
//     document.querySelector("#messageError").textContent = "Message is required";
//     return;
//   }
//   const successMessage = document.querySelector("#successMessage");
//   successMessage.classList.add("success");
//   successMessage.textContent = "Message sent successfully!!!";
// };
// const isValidEmail = (email) => {
//   const emailRegex = /^\S+@\S+\.\S+$/;
//   return emailRegex.test(email);
// };
const validateForm = (event) => {
  event.preventDefault();

  const nameError = document.querySelector("#nameError");
  const emailError = document.querySelector("#emailError");
  const subjectError = document.querySelector("#subjectError");
  const messageError = document.querySelector("#messageError");
  const successMessage = document.querySelector("#successMessage");

  nameError.textContent = "";
  emailError.textContent = "";
  subjectError.textContent = "";
  messageError.textContent = "";
  successMessage.textContent = "";
  successMessage.classList.remove("success", "error");

  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const subject = document.querySelector("#subject").value.trim();
  const message = document.querySelector("#message").value.trim();

  let hasError = false;

  if (!name) {
    nameError.textContent = "Name is required";
    hasError = true;
  }

  if (!email) {
    emailError.textContent = "Email is required";
    hasError = true;
  } else if (!isValidEmail(email)) {
    emailError.textContent = "Enter a valid Email";
    hasError = true;
  }

  if (!subject) {
    subjectError.textContent = "Subject is required";
    hasError = true;
  }

  if (!message) {
    messageError.textContent = "Message is required";
    hasError = true;
  }

  if (hasError) return;

  const form = document.getElementById("contact-form");
  const formData = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  })
    .then(() => {
      form.reset();
      successMessage.classList.add("success");
      successMessage.textContent =
        "Your information has been received. We'll contact you shortly!";
    })
    .catch(() => {
      successMessage.classList.add("error");
      successMessage.textContent =
        "Oops! Something went wrong. Please try again.";
    });
};

const isValidEmail = (email) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
};

// INIT
const init = () => {
  handleNavbarResize();

  sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", scrollActive);

  handleNavToggler();

  // When the link is clicked from the menu, the menu will be closed
  const navLink = Array.from(document.querySelectorAll(".nav-link"));
  for (const n of navLink) {
    n.addEventListener("click", handleNavLinkClick);
  }
  startTypingLoop();

  //attention grabber
  setInterval(addPulsate, 5000);

  //skill animation
  window.addEventListener("scroll", skillEffect);

  // Fetch and render projects from JSON
  fetchAndRenderProjects();

  //form Validation
  const submitButton = document.querySelector("#submitButton");
  if (submitButton) {
    submitButton.addEventListener("click", validateForm);
  }
};

// INIT
document.addEventListener("DOMContentLoaded", init);
