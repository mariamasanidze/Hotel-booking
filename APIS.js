

// const cities_API = 'https://booking-com.p.rapidapi.com/v1/hotels/nearby-cities?latitude=65.9667&locale=en-gb&longitude=-18.5333';
// const hotels_API = 'https://booking-com.p.rapidapi.com/v1/hotels/search?children_ages=5%2C0&page_number=0&adults_number=2&children_number=2&room_number=1&include_adjacency=true&units=metric&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&checkout_date=2025-01-19&dest_id=-553173&filter_by_currency=AED&dest_type=city&checkin_date=2025-01-18&order_by=popularity&locale=en-gb';
// const photos_API = 'https://booking-com.p.rapidapi.com/v1/hotels/photos?hotel_id=1377073&locale=en-gb';

// // Set up headers
// const headers = {
//     'X-RapidAPI-Key': '46203ea7e5msh6d504e3f4121a44p19beabjsn6b394176b1fd',
//     'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
// };

// // Function to fetch data from a given API URL
// async function fetchData(apiUrl) {
//     try {
//         const response = await fetch(apiUrl, {
//             method: 'GET',
//             headers: headers
//         });

//         if (!response.ok) {
//             throw new Error(`Error: ${response.status} ${response.statusText}`);
//         }

//         const data = await response.json();
//         console.log(data);
//         return data;
//     } catch (error) {
//         console.error('Fetch error:', error);
//     }
// }

// // Fetch data from each API
// fetchData(cities_API); // Fetch nearby cities
// fetchData(hotels_API); // Fetch hotels
// fetchData(photos_API); // Fetch photos



// const cities_url = 'https://booking-com.p.rapidapi.com/v1/hotels/nearby-cities?latitude=65.9667&locale=en-gb&longitude=-18.5333';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': '46203ea7e5msh6d504e3f4121a44p19beabjsn6b394176b1fd',
// 		'x-rapidapi-host': 'booking-com.p.rapidapi.com'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }


// const hotels_API = 'https://booking-com.p.rapidapi.com/v1/hotels/search?children_ages=5%2C0&page_number=0&adults_number=2&children_number=2&room_number=1&include_adjacency=true&units=metric&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&checkout_date=2025-01-19&dest_id=-553173&filter_by_currency=AED&dest_type=city&checkin_date=2025-01-18&order_by=popularity&locale=en-gb';
// const optionss = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': '46203ea7e5msh6d504e3f4121a44p19beabjsn6b394176b1fd',
// 		'x-rapidapi-host': 'booking-com.p.rapidapi.com'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }


// const photos_API = 'https://booking-com.p.rapidapi.com/v1/hotels/photos?hotel_id=1377073&locale=en-gb';
// const optionsss = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': '46203ea7e5msh6d504e3f4121a44p19beabjsn6b394176b1fd',
// 		'x-rapidapi-host': 'booking-com.p.rapidapi.com'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }




const headers = {
    'x-rapidapi-key': '46203ea7e5msh6d504e3f4121a44p19beabjsn6b394176b1fd',
    'x-rapidapi-host': 'booking-com.p.rapidapi.com'
  };
  
  // Function to fetch hotel photos
  async function fetchHotelPhotos(hotelId) {
    const citiess_API = `https://booking-com.p.rapidapi.com/v1/hotels/photos?hotel_id=${hotelId}&locale=en-gb`;
    const options = { method: 'GET', headers };
  


    try {
      const response = await fetch(citiess_API, options);
      const result = await response.json(); // Parsing as JSON if response is JSON format
      console.log('Hotel Photos:', result);
      return result;
    } catch (error) {
      console.error('Error fetching hotel photos:', error);
    }
  }
  
  // Function to fetch nearby cities
  async function fetchNearbyCities(latitude, longitude) {
    const hotels_API = `https://booking-com.p.rapidapi.com/v1/hotels/nearby-cities?latitude=${latitude}&longitude=${longitude}&locale=en-gb`;
    const options = { method: 'GET', headers };
  
    try {
      const response = await fetch(hotels_API, options);
      const result = await response.json();
      console.log('Nearby Cities:', result);
      return result;
    } catch (error) {
      console.error('Error fetching nearby cities:', error);
    }
  }
  
  // Function to search for hotels
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
  
    const photos_API = `https://booking-com.p.rapidapi.com/v1/hotels/search?children_ages=${childrenAges}&page_number=${pageNumber}&adults_number=${adultsNumber}&children_number=${childrenNumber}&room_number=${roomNumber}&include_adjacency=true&units=metric&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&checkout_date=${checkoutDate}&dest_id=${destId}&filter_by_currency=${currency}&dest_type=${destType}&checkin_date=${checkinDate}&order_by=popularity&locale=en-gb`;
    const options = { method: 'GET', headers };
  
    try {
      const response = await fetch(photos_API, options);
      const result = await response.json();
      console.log('Hotel Search Results:', result);
      return result;
    } catch (error) {
      console.error('Error searching hotels:', error);
    }
  }
  
  // Example usage
  fetchHotelPhotos(1377073); // Fetch photos for a hotel by ID
  fetchNearbyCities(65.9667, -18.5333); // Fetch cities near given latitude and longitude
  searchHotels({
    childrenAges: '5,0',
    pageNumber: 0,
    adultsNumber: 2,
    childrenNumber: 2,
    roomNumber: 1,
    checkoutDate: '2025-01-19',
    checkinDate: '2025-01-18',
    destId: '-553173'
  }); // Search hotels with the provided parameters
  
const main = document.getElementById("main");



// const getCities = async (url) =>{
//     const result = await fetch (url);
//     console.log(result);
//     const data = await result.json();
//     console.log(data);
// }
// // getCities(cities_API);


// function showCities (cities) {
//     (main.innerHTML = " "),
//     cities.forEach ((city) => {
//        const {title, photo , description , rating } = city;
//        console.log(rating);
//     });
// }

const getCities = async (url) => {
    const cities_API = 'https://booking-com.p.rapidapi.com/v1/hotels/nearby-cities?latitude=65.9667&locale=en-gb&longitude=-18.5333';
    const result = await fetch(url);
    console.log(result);
    const data = await result.json();
    showCities(data.results);
};
getCities(cities_API);

function showCities(cities) {
    (main.innerHTML = " "),
    cities.forEach ((citie) => {
        const {descriptiontype_id, photo_id , tags } = city;
        const cityEl = document.createElement("div");
        cityEl.innerHTML =``;
    });
}