// truncateText('hotel-description', 100);
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
  
    const hotelData = await searchHotels(params);
  
    if (hotelData && hotelData.result) {
        const mostlyPickedHotels = hotelData.result.slice(0, 6);
        const nearbyHotels = hotelData.result.slice(6,18);
  
        renderMostlyPickedHotels(mostlyPickedHotels);
        renderNearbyHotels(nearbyHotels);
    } else {
        console.error('No hotel data found');
    }
  }
  
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
  
  async function fetchHotelDescription(hotelId) {
    const description_API = `https://booking-com.p.rapidapi.com/v1/hotels/description?hotel_id=${hotelId}&locale=en-gb`;
    const options = { method: 'GET', headers };
  
    try {
        const response = await fetch(description_API, options);
        const result = await response.text();
        console.log('Hotel Description:', result);
        return result;
    } catch (error) {
        console.error('Error fetching hotel description:', error);
        return 'No description available';
    }
  }
  
  function displayDescriptionModal(description) {
    const modal = document.getElementById('description-modal');
    const modalContent = modal.querySelector('.description-text');
    
    modalContent.innerText = description;
    modal.classList.remove('hidden');
  
    modal.querySelector('.close-btn').addEventListener('click', () => {
        modal.classList.add('hidden');
    });
  }
  
  async function renderMostlyPickedHotels(hotels) {
    const mostlyPickedList = document.getElementById('mostly-picked-list');
    mostlyPickedList.innerHTML = '';
  
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
           <a 
            href="descriprion.html?hotel_id=${hotel_id}" 
            class="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg text-center block">
            View Details
          </a>
        </div>
      `;
  
      mostlyPickedList.appendChild(hotelCard);
    }
  
  
  
    mostlyPickedList.querySelectorAll('.view-details-btn').forEach(button => {
        button.addEventListener('click', async (event) => {
            const hotelId = event.target.getAttribute('data-hotel-id');
            const description = await fetchHotelDescription(hotelId);
            displayDescriptionModal(description);
        });
    });
  }
  
  async function renderNearbyHotels(hotels) {
    const nearbyHotelList = document.getElementById('nearby-hotel-list');
    nearbyHotelList.innerHTML = '';
  
    for (const hotel of hotels) {
        const { hotel_name, price_breakdown, main_photo_url, address, hotel_id } = hotel;
  
        const photos = await fetchHotelPhotos(hotel_id);
        const highResPhoto = photos?.find(photo => photo.url_max || photo.url_1440);
        const photoUrl = highResPhoto?.url_1440 || highResPhoto?.url_max || main_photo_url;
  
        const hotelCard = document.createElement('div');
        hotelCard.classList.add('hotel-card', 'p-4', 'bg-white', 'shadow-md', 'rounded-lg');
  
        hotelCard.innerHTML = `
     <div class="hotel-card flex flex-col h-full">
    <img src="${photoUrl}" alt="${hotel_name}" class="w-full h-48 object-cover rounded-t-lg">
    <div class="flex-grow p-2">
      <h2 class="text-xl font-bold">${hotel_name}</h2>
      <p class="text-gray-600">${address}</p>
      <p class="text-lg font-semibold">${price_breakdown?.gross_price?.formatted || 'N/A'}</p>
    </div>
    <div class="p-2">
      <a 
        href="descriprion.html?hotel_id=${hotel_id}" 
        class="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg text-center block">
        View Details
      </a>
    </div>
  </div>
        `;
  
        nearbyHotelList.appendChild(hotelCard);
    }
  

    nearbyHotelList.querySelectorAll('.view-details-btn').forEach(button => {
        button.addEventListener('click', async (event) => {
            const hotelId = event.target.getAttribute('data-hotel-id');
            const description = await fetchHotelDescription(hotelId);
            displayDescriptionModal(description);
        });
    });
  }
  
  // Call the main function to display hotels when the page loads
  displayHotels();
  


  // Function to get query parameter from URL
//   function getQueryParam(param) {
//     const urlParams = new URLSearchParams(window.location.search);
//     return urlParams.get(param);
//   }
  
//   // Fetch hotel description and details
//   async function fetchHotelDetails(hotelId) {
//     const description_API = `https://booking-com.p.rapidapi.com/v1/hotels/description?hotel_id=${hotelId}&locale=en-gb`;
//     const photos_API = `https://booking-com.p.rapidapi.com/v1/hotels/photos?hotel_id=${hotelId}&locale=en-gb`;
  
//     try {
//       // Fetch description
//       const descriptionResponse = await fetch(description_API, { method: 'GET', headers });
//       const description = await descriptionResponse.text();

//       function formatDescription(description) {
//         const formattedDescription = description.replace(/\n/g, '<br>');
//         return `<p>${formattedDescription}</p>`;
//       }
//       // Fetch photos
//       const photosResponse = await fetch(photos_API, { method: 'GET', headers });
//       const photos = await photosResponse.json();
//       const photoUrl = photos?.[0]?.url_max || '';
  
//       // Display the data on the page
//       document.getElementById('hotel-description').innerText = description;
//       document.getElementById('hotel-image').src = photoUrl;
  
//       // Optionally add more details like name, price, etc., if needed.
//     } catch (error) {
//       console.error('Error fetching hotel details:', error);
//     }
//   }
  
//   // Get the hotel ID from the URL and fetch details
//   const hotelId = getQueryParam('hotel_id');
//   if (hotelId) {
//     fetchHotelDetails(hotelId);
//   } else {
//     document.getElementById('hotel-description').innerText = 'Invalid hotel ID.';
//   }
  

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  
  // Fetch hotel description and details
  async function fetchHotelDetails(hotelId) {
    const description_API = `https://booking-com.p.rapidapi.com/v1/hotels/description?hotel_id=${hotelId}&locale=en-gb`;
    const photos_API = `https://booking-com.p.rapidapi.com/v1/hotels/photos?hotel_id=${hotelId}&locale=en-gb`;
  
    try {
      // Fetch description
      const descriptionResponse = await fetch(description_API, { method: 'GET', headers });
      const descriptionData = await descriptionResponse.json();
  
      // Format the description for better readability
      function formatDescription(description) {
        return description.replace(/\n/g, '').replace(/\\n/g, '');
      }
  
      const formattedDescription = formatDescription(descriptionData.description || 'Description not available.');
  
      // Fetch photos
      const photosResponse = await fetch(photos_API, { method: 'GET', headers });
      const photos = await photosResponse.json();
      const photoUrl = photos?.[0]?.url_max || 'placeholder.jpg';
  
      // Display the formatted data on the page
      document.getElementById('hotel-description').innerHTML = formattedDescription;
      document.getElementById('hotel-image').src = photoUrl;
    //   document.getElementById('hotel-address').src = address;
  
    } catch (error) {
      console.error('Error fetching hotel details:', error);
      document.getElementById('hotel-description').innerText = 'Error fetching hotel details.';
    }
  }
  
  // Get the hotel ID from the URL and fetch details
  const hotelId = getQueryParam('hotel_id');
  if (hotelId) {
    fetchHotelDetails(hotelId);
  } else {
    document.getElementById('hotel-description').innerText = 'Invalid hotel ID.';
  }
  


//   here is the select button
 // Example API URL (replace with your actual API endpoint)
 const apiURL = "https://booking-com.p.rapidapi.com/v1/hotels/search?children_ages=${childrenAges}&page_number=${pageNumber}&adults_number=${adultsNumber}&children_number=${childrenNumber}&room_number=${roomNumber}&include_adjacency=true&units=metric&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&checkout_date=${checkoutDate}&dest_id=${destId}&filter_by_currency=${currency}&dest_type=${destType}&checkin_date=${checkinDate}&order_by=popularity&locale=en-gb";

 // Select elements
 const selectLocationButton = document.getElementById('select-location');
 const dropdown = document.getElementById('location-dropdown');
 const dropdownList = document.getElementById('dropdown-list');

 // Function to fetch and display locations
 async function fetchLocations() {
     try {
         // Fetch locations from the API
         const response = await fetch(apiURL);
         if (!response.ok) throw new Error('Failed to fetch data');
         const data = await response.json();

         // Assuming the API returns a list of locations under a 'locations' field
         const locations = data.locations;

         // Clear previous dropdown content
         dropdownList.innerHTML = '';

         // Populate dropdown with locations
         locations.forEach(location => {
             const li = document.createElement('li');
             li.textContent = location.name; // Adjust based on your API's location data format
             li.className = "px-4 py-2 hover:bg-gray-100 cursor-pointer";
             li.addEventListener('click', () => {
                 alert(`You selected: ${location.name}`);
                 dropdown.classList.add('hidden');
             });
             dropdownList.appendChild(li);
         });

         // Show dropdown
         dropdown.classList.remove('hidden');
     } catch (error) {
         console.error('Error fetching locations:', error);
     }
 }

 // Event listener to show dropdown on button click
 selectLocationButton.addEventListener('click', () => {
     // Toggle dropdown visibility
     if (dropdown.classList.contains('hidden')) {
         fetchLocations();
     } else {
         dropdown.classList.add('hidden');
     }
 });

 // Optional: Close the dropdown if clicked outside
 document.addEventListener('click', (event) => {
     if (!event.target.closest('#select-location') && !event.target.closest('#location-dropdown')) {
         dropdown.classList.add('hidden');
     }
 });