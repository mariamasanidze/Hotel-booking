console.log("APIS.js loaded successfully");

const headers = {
  'x-rapidapi-key': 'de148a4c9cmsh62e9c162f1225bdp175ee8jsn5b84fc138145',
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

// Main function to fetch hotel data and split it into two sections
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

  if (hotelData && hotelData.result) {
      const mostlyPickedHotels = hotelData.result.slice(0, 6); // Top 6 hotels
      const nearbyHotels = hotelData.result.slice(6);          // Remaining hotels

      renderMostlyPickedHotels(mostlyPickedHotels); // Display "Mostly Picked" section
      renderNearbyHotels(nearbyHotels);             // Display "Nearby Hotels" section
  } else {
      console.error('No hotel data found');
  }
}

// Function to fetch hotel photos
async function fetchHotelPhotos(hotelId) {
    const photos_API = `https://booking-com.p.rapidapi.com/v1/hotels/photos?hotel_id=${hotelId}&locale=en-gb`;
    const options = { method: 'GET', headers };

    try {
        const response = await fetch(photos_API, options);
        const result = await response.json();
        console.log('Hotel Photos:', result);
        return result;
    } catch (error) {
        console.error('Error fetching hotel photos:', error);
        return [];
    }
}

// Function to render the "Mostly Picked" hotels section
async function renderMostlyPickedHotels(hotels) {
  const mostlyPickedList = document.getElementById('mostly-picked-list');
  mostlyPickedList.innerHTML = ''; // Clear any existing content

  for (const hotel of hotels) {
      const { hotel_name, price_breakdown, main_photo_url, address, hotel_id } = hotel;

      const photos = await fetchHotelPhotos(hotel_id);
      const highResPhoto = photos?.find(photo => photo.url_max || photo.url_1440);
      const photoUrl = highResPhoto?.url_1440 || highResPhoto?.url_max || main_photo_url;

      const hotelCard = document.createElement('div');
      hotelCard.classList.add('hotel-card', 'p-4', 'bg-white', 'shadow-md', 'rounded-lg');

      hotelCard.innerHTML = `
          <img src="${photoUrl}" alt="${hotel_name}" class="w-full h-48 object-cover rounded-t-lg">
          <div class="p-2">
              <h2 class="text-xl font-bold">${hotel_name}</h2>
              <p class="text-gray-600">${address}</p>
              <p class="text-lg font-semibold">${price_breakdown?.gross_price?.formatted || 'N/A'}</p>
              <button class="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg">View Details</button>
          </div>
      `;

      mostlyPickedList.appendChild(hotelCard);
  }
}

// Function to render the "Nearby Hotels" section
async function renderNearbyHotels(hotels) {
  const nearbyHotelList = document.getElementById('nearby-hotel-list');
  nearbyHotelList.innerHTML = ''; // Clear any existing content

  for (const hotel of hotels) {
      const { hotel_name, price_breakdown, main_photo_url, address, hotel_id } = hotel;

      const photos = await fetchHotelPhotos(hotel_id);
      const highResPhoto = photos?.find(photo => photo.url_max || photo.url_1440);
      const photoUrl = highResPhoto?.url_1440 || highResPhoto?.url_max || main_photo_url;

      const hotelCard = document.createElement('div');
      hotelCard.classList.add('hotel-card', 'p-4', 'bg-white', 'shadow-md', 'rounded-lg');

      hotelCard.innerHTML = `
          <img src="${photoUrl}" alt="${hotel_name}" class="w-full h-48 object-cover rounded-t-lg">
          <div class="p-2">
              <h2 class="text-xl font-bold">${hotel_name}</h2>
              <p class="text-gray-600">${address}</p>
              <p class="text-lg font-semibold">${price_breakdown?.gross_price?.formatted || 'N/A'}</p>
              <button class="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg">View Details</button>
          </div>
      `;

      nearbyHotelList.appendChild(hotelCard);
  }
}

// Call the main function to display hotels when the page loads
displayHotels();
