document.addEventListener('DOMContentLoaded', function() {
    flatpickr("#date-range", {
      mode: "range",           // Enable date range mode
      dateFormat: "Y-m-d",     // Format the selected dates
      minDate: "today",        // Optional: Prevent selection of past dates
      allowInput: true,        // Allow users to type dates directly (optional)
    });
  });



  const apiData = {
    property: {
        name: "Blue Origin Farms",
        location: "Galle, Sri Lanka",
        image: "https://example.com/image.jpg", // Replace with the actual image URL
        pricePerDay: 200,
    },
};

// Dynamically populate page
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("property-name").textContent = apiData.property.name;
    document.getElementById("property-location").textContent = apiData.property.location;
    document.getElementById("property-image").src = apiData.property.image;
    document.getElementById("total-cost").textContent = `$${apiData.property.pricePerDay * 2} USD`;
});

function navigateToPayment() {
    // Pass data to next page or save to session storage
    window.location.href = "payment.html";
}
function navigateToHome() {
    // Pass data to next page or save to session storage
    window.location.href = "main.html";
}