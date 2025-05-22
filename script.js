function showModal(modalId) {
  document.getElementById(`${modalId}-modal`).style.display = 'flex';
}

function closeModal(modalId) {
  document.getElementById(`${modalId}-modal`).style.display = 'none';
}

function handleLogin(event) {
  event.preventDefault();
  const form = document.getElementById('login-form');
  const email = form.querySelector('input[type="email"]').value;
  const password = form.querySelector('input[type="password"]').value;
  console.log('Login:', { email, password });
  closeModal('login');
}

function handleCreateAccount(event) {
  event.preventDefault();
  const form = document.getElementById('create-account-form');
  const username = form.querySelector('input[type="text"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const password = form.querySelector('input[type="password"]').value;
  console.log('Create Account:', { username, email, password });
  closeModal('create-account');
}

// Mock data for cars
const carListings = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Corolla',
    style: 'Sedan',
    kilometers: 50000,
    fuelType: 'Petrol',
    location: 'Auckland',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1494976383938-8d3b6fada33e?q=80&w=2070&auto=format&fit=crop',
    description: 'Reliable sedan for daily commutes.'
  },
  {
    id: 2,
    make: 'Honda',
    model: 'CR-V',
    style: 'SUV',
    kilometers: 80000,
    fuelType: 'Petrol',
    location: 'Wellington',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop',
    description: 'Spacious SUV for family trips.'
  },
  {
    id: 3,
    make: 'Ford',
    model: 'Mustang',
    style: 'Sports',
    kilometers: 30000,
    fuelType: 'Petrol',
    location: 'Christchurch',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2070&auto=format&fit=crop',
    description: 'Iconic sports car for enthusiasts.'
  },
  {
    id: 4,
    make: 'Tesla',
    model: 'Model 3',
    style: 'Electric',
    kilometers: 20000,
    fuelType: 'Electric',
    location: 'Auckland',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1580273916550-ebd7c15a6a75?q=80&w=2070&auto=format&fit=crop',
    description: 'Electric sedan with cutting-edge tech.'
  }
];

// Mock data for other categories (example for Bikes)
const bikeListings = [
  {
    id: 1,
    title: 'Harley-Davidson',
    location: 'Auckland',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop',
    description: 'Classic motorcycle for cruising.'
  },
  {
    id: 2,
    title: 'Trek Road Bike',
    location: 'Wellington',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1567164220428-0e684ad4b6b8?q=80&w=2070&auto=format&fit=crop',
    description: 'Lightweight bike for speed and fitness.'
  },
  {
    id: 3,
    title: 'E-Bike',
    location: 'Christchurch',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=2070&auto=format&fit=crop',
    description: 'Electric bike for easy commuting.'
  },
  {
    id: 4,
    title: 'Mountain Bike',
    location: 'Auckland',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=2070&auto=format&fit=crop',
    description: 'Rugged bike for off-road adventures.'
  }
];

// Add similar mock data for Electronics, Housing, Trade as needed

function renderListings(listings, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  listings.forEach(listing => {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.onclick = () => showDetail(listing, containerId.replace('-listings', '-detail'), containerId);
    tile.innerHTML = `
      <img src="${listing.image}" alt="${listing.title || `${listing.make} ${listing.model}`}">
      <div class="tile-content">
        <h3>${listing.title || `${listing.make} ${listing.model}`}</h3>
        <p>${listing.description}</p>
        <p>Price: $${listing.price}</p>
        <p>Location: ${listing.location}</p>
      </div>
    `;
    container.appendChild(tile);
  });
}

function showDetail(listing, detailContainerId, listingsContainerId) {
  const detailContainer = document.getElementById(detailContainerId);
  const listingsContainer = document.getElementById(listingsContainerId);
  listingsContainer.style.display = 'none';
  detailContainer.style.display = 'block';
  detailContainer.querySelector('#' + detailContainerId + '-content').innerHTML = `
    <img src="${listing.image}" alt="${listing.title || `${listing.make} ${listing.model}`}">
    <h2>${listing.title || `${listing.make} ${listing.model}`}</h2>
    <p>${listing.description}</p>
    <p>Price: $${listing.price}</p>
    <p>Location: ${listing.location}</p>
    ${listing.make ? `<p>Make: ${listing.make}</p>` : ''}
    ${listing.model ? `<p>Model: ${listing.model}</p>` : ''}
    ${listing.style ? `<p>Style: ${listing.style}</p>` : ''}
    ${listing.kilometers ? `<p>Kilometers: ${listing.kilometers} km</p>` : ''}
    ${listing.fuelType ? `<p>Fuel Type: ${listing.fuelType}</p>` : ''}
  `;
}

function filterCars() {
  const form = document.getElementById('car-filter-form');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const filters = {
      make: form.querySelector('#make').value,
      model: form.querySelector('#model').value,
      style: form.querySelector('#style').value,
      kilometers: form.querySelector('#kilometers').value,
      fuelType: form.querySelector('#fuel-type').value,
      location: form.querySelector('#location').value,
      priceMax: form.querySelector('#price-max').value
    };
    const filtered = carListings.filter(listing => {
      return (!filters.make || listing.make === filters.make) &&
             (!filters.model || listing.model === filters.model) &&
             (!filters.style || listing.style === filters.style) &&
             (!filters.kilometers || listing.kilometers <= parseInt(filters.kilometers)) &&
             (!filters.fuelType || listing.fuelType === filters.fuelType) &&
             (!filters.location || listing.location === filters.location) &&
             (!filters.priceMax || listing.price <= parseInt(filters.priceMax));
    });
    renderListings(filtered, 'car-listings');
  });
}

function filterCategory(categoryListings, formId, listingsContainerId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const filters = {
      location: form.querySelector('#location').value,
      priceMax: form.querySelector('#price-max').value
    };
    const filtered = categoryListings.filter(listing => {
      return (!filters.location || listing.location === filters.location) &&
             (!filters.priceMax || listing.price <= parseInt(filters.priceMax));
    });
    renderListings(filtered, listingsContainerId);
  });
}

// Initialize page based on URL
document.addEventListener('DOMContentLoaded', () => {
  const url = window.location.pathname;
  const params = new URLSearchParams(window.location.search);
  const listingId = params.get('listing');
  if (url.includes('cars.html')) {
    if (listingId) {
      const listing = carListings.find(l => l.id == listingId);
      if (listing) showDetail(listing, 'car-detail', 'car-listings');
    } else {
      renderListings(carListings, 'car-listings');
    }
    filterCars();
  } else if (url.includes('bikes.html')) {
    if (listingId) {
      const listing = bikeListings.find(l => l.id == listingId);
      if (listing) showDetail(listing, 'category-detail', 'category-listings');
    } else {
      renderListings(bikeListings, 'category-listings');
    }
    filterCategory(bikeListings, 'category-filter-form', 'category-listings');
  }
  // Add similar conditions for electronics.html, housing.html, trade.html
});
