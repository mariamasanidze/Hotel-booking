document.addEventListener('DOMContentLoaded', function() {
    flatpickr("#date-range", {
      mode: "range",           
      dateFormat: "Y-m-d",     
      minDate: "today",       
      allowInput: true,        
    });
  });



  const apiData = {
    property: {
        name: "Blue Origin Farms",
        location: "Galle, Sri Lanka",
        image: "", 
        pricePerDay: 200,
    },
};


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("property-name").textContent = apiData.property.name;
    document.getElementById("property-location").textContent = apiData.property.location;
    document.getElementById("property-image").src = apiData.property.image;
    document.getElementById("total-cost").textContent = `$${apiData.property.pricePerDay * 2} USD`;
});

function navigateToPayment() {
    window.location.href = "payment.html";
}
function navigateToHome() {
    window.location.href = "main.html";
}