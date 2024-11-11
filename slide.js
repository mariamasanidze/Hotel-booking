// Headers for the API request (no need for 'require' in the browser)
const headers = {
    'x-rapidapi-key': 'de148a4c9cmsh62e9c162f1225bdp175ee8jsn5b84fc138145',
    'x-rapidapi-host': 'booking-com.p.rapidapi.com'
  };
  
  // Fetch hotel data from the API
  async function searchHotels(params) {
    const {
      childrenAges,
      pageNumber,
      adultsNumber,
      childrenNumber,
      roomNumber,
      checkoutDate,
      checkinDate,
      destId,
      currency = 'AED',
      destType = 'city'
    } = params;
  
    const hotels_API = `https://booking-com.p.rapidapi.com/v1/hotels/search?children_ages=${childrenAges}&page_number=${pageNumber}&adults_number=${adultsNumber}&children_number=${childrenNumber}&room_number=${roomNumber}&include_adjacency=true&units=metric&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&checkout_date=${checkoutDate}&dest_id=${destId}&filter_by_currency=${currency}&dest_type=${destType}&checkin_date=${checkinDate}&order_by=popularity&locale=en-gb`;
  
    const options = { method: 'GET', headers };
  
    try {
      const response = await fetch(hotels_API, options);
      const result = await response.json();
      console.log('Hotel Search Results:', result);
      return result;
    } catch (error) {
      console.error('Error searching hotels:', error);
    }
  }
  
  // Function to display hotel data in the slider
  function displayHotels(hotels) {
    const slider = document.querySelector('.hotel-slider');
  
    // Dynamically create hotel items
    hotels.forEach(hotel => {
      const hotelItem = document.createElement('div');
      hotelItem.classList.add('hotel-item', 'p-4', 'bg-white', 'rounded-lg', 'shadow-lg', 'mb-6');
  
      hotelItem.innerHTML = `
        <img src="${hotel.image}" alt="${hotel.name}" class="rounded-lg mb-4">
        <h3 class="text-xl font-semibold mb-2">${hotel.name}</h3>
        <p class="text-gray-700 mb-2">${hotel.description}</p>
        <p class="text-green-600 font-bold">Price: $${hotel.price}</p>
      `;
  
      slider.appendChild(hotelItem);
    });
  
    let currentIndex = 0;
    const items = document.querySelectorAll('.hotel-item');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
  
    function showSlide(index) {
      // Loop back to the first slide when reaching the end
      if (index >= items.length) currentIndex = 0;
      if (index < 0) currentIndex = items.length - 1;
  
      // Hide all items and show the current one
      items.forEach(item => item.style.display = 'none');
      items[currentIndex].style.display = 'block';
    }
  
    // Initial slide
    showSlide(currentIndex);
  
    // Next and previous buttons
    prevButton.addEventListener('click', () => {
      currentIndex--;
      showSlide(currentIndex);
    });
  
    nextButton.addEventListener('click', () => {
      currentIndex++;
      showSlide(currentIndex);
    });
  }
  
  // Example call to searchHotels
  const params = {
    childrenAges: '5,7', // Example age for children
    pageNumber: 1,
    adultsNumber: 2,
    childrenNumber: 2,
    roomNumber: 1,
    checkoutDate: '2024-12-10',
    checkinDate: '2024-12-01',
    destId: '12345', // Example destination ID
  };
  
  searchHotels(params).then(result => {
    // Display the first 5 hotels
    if (result && result.hotels) {
      displayHotels(result.hotels.slice(0, 5));  // Adjust number of hotels to display as needed
    }
  });
  