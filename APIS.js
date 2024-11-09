
const headers = {
  'x-rapidapi-key': '46203ea7e5msh6d504e3f4121a44p19beabjsn6b394176b1fd',
  'x-rapidapi-host': 'booking-com.p.rapidapi.com'
};

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



// Function to fetch hotel data and display it
async function displayHotels() {
  const params = {
      childrenAges: '5,0',
      pageNumber: 0,
      adultsNumber: 2,
      childrenNumber: 2,
      roomNumber: 1,
      checkoutDate: '2025-01-19',
      checkinDate: '2025-01-18',
      destId: '-553173'
  };

  // Fetch hotel data using the API
  const hotelData = await searchHotels(params);

  // If data is available, render hotels on the grid
  if (hotelData && hotelData.result) {
      renderHotels(hotelData.result);
  } else {
      console.error('No hotel data found');
  }
}

// Function to render the list of hotels on the page
function renderHotels(hotels) {
  const hotelList = document.getElementById('hotel-list');
  hotelList.innerHTML = ''; // Clear any existing content

  // Loop through each hotel and create HTML elements
  hotels.forEach((hotel) => {
      const { hotel_name, price_breakdown, main_photo_url, address } = hotel;

      // Create a card for each hotel
      const hotelCard = document.createElement('div');
      hotelCard.classList.add('hotel-card', 'p-4', 'bg-white', 'shadow-md', 'rounded-lg');

      // Set the inner HTML for the card
      hotelCard.innerHTML = `
          <img src="${main_photo_url}" alt="${hotel_name}" class="w-full h-48 object-cover rounded-t-lg">
          <div class="p-2">
              <h2 class="text-xl font-bold">${hotel_name}</h2>
              <p class="text-gray-600">${address}</p>
              <p class="text-lg font-semibold">${price_breakdown?.gross_price?.formatted || 'N/A'}</p>
              <button class="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg">View Details</button>
          </div>
      `;

      // Append the hotel card to the hotel list
      hotelList.appendChild(hotelCard);
  });
}

// Call the function to display hotels when the page loads
displayHotels();


