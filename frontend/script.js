document.addEventListener("DOMContentLoaded", () => {
  // Set hero background image
  const image =
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80";
  const heroSection = document.querySelector(".hero");
  heroSection.style.backgroundImage = `url('${image}')`;

  // Reservation form handling
  const form = document.getElementById("reservation-form");
  const confirmation = document.getElementById("confirmation");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form input elements
    const [name, email, phone, people, date, time, message] = form.querySelectorAll("input, textarea");

    // Prepare data to send
    const data = {
      name: name.value.trim(),
      email: email.value.trim(),
      date: date.value,
      time: time.value,
      people: Number(people.value),
      message: message.value.trim(),
    };

    // Basic validation (optional)
    if (!data.name || !data.email || !data.date || !data.time) {
      confirmation.textContent = "Please fill in all fields.";
      return;
    }

    try {
      const response = await fetch("https://restaurant-backend-z059.onrender.com/api/reservations", {
      method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        confirmation.textContent = "Reservation received!";
        confirmation.style.color = "green";
        form.reset();
      } else {
        confirmation.textContent = "Failed to make reservation.";
        confirmation.style.color = "red";
      }
    } catch (error) {
      confirmation.textContent = "Error: Could not connect to server.";
      confirmation.style.color = "red";
      console.error("Reservation error:", error);
    }
  });
});
