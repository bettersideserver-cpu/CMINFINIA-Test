const scriptURL = "https://script.google.com/macros/s/AKfycbzRyDjY-aD9RX6MckBK74qnMHR4p3pdM15FAfw-snKlVKSX-MlGNIEOHp5iASczmbf8/exec";

const form = document.getElementById("contactForm");
const submitBtn = form.querySelector(".submit-btn");

// overlay elements
const overlay = document.getElementById("thankYouOverlay");
const closeBtn = document.getElementById("closeThankYou");

function setLoading(isLoading) {
  submitBtn.disabled = isLoading;
  submitBtn.innerHTML = isLoading ? "Sending..." : "Send Message ✈";
}

function showThankYou() {
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function hideThankYou() {
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

closeBtn.addEventListener("click", hideThankYou);

// click outside box closes overlay
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) hideThankYou();
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fd = new FormData(form);

  setLoading(true);

  try {
    const res = await fetch(scriptURL, { method: "POST", body: fd });
    if (!res.ok) throw new Error("Network error");

    form.reset();
    showThankYou();

  } catch (err) {
    console.error(err);
    alert("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
});