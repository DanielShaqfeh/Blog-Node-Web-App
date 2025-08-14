document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const toggleBtn = document.querySelector(".toggle-button");
  const navLinks = document.querySelector(".nav-links");

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Clickable posts
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".post-card");
    if (card) {
      const postId = card.dataset.id;
      if (postId) {
        window.location.href = `/post/${postId}`;
      }
    }
  });

});
