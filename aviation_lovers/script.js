document.addEventListener('DOMContentLoaded', () => {
  // Page-specific logic
  if (document.getElementById('news-container')) {
    loadArticles();
  }

  if (document.getElementById('aircraftList')) {
    loadAircraft();
  }
});

function loadArticles() {
  fetch('articles.json')
    .then(response => response.json())
    .then(articles => {
      const container = document.getElementById('news-container');

      articles.forEach((article, index) => {
        const section = document.createElement('section');
        section.className = 'info-block';
        if ((index + 1) % 2 === 0) section.classList.add('reverse');

        section.innerHTML = `
          <div class="info-image">
            <img src="${article.image}" alt="${article.alt}" class="clickable-image">
          </div>
          <div class="info-text">
            <h2>${article.title}</h2>
            <p class="summary">${article.summary}</p>
            <div class="more-text" style="display: none;">${article.details}</div>
            <button class="toggle-text">See More</button>
          </div>
        `;

        container.appendChild(section);
      });

      setupToggleButtons();
      setupImageModal();
    });
}

function setupToggleButtons() {
  const toggleButtons = document.querySelectorAll(".toggle-text");
  toggleButtons.forEach(button => {
    button.addEventListener('click', function () {
      const moreText = this.previousElementSibling;
      const isVisible = moreText.style.display === "block";
      moreText.style.display = isVisible ? "none" : "block";
      this.textContent = isVisible ? "See More" : "See Less";
    });
  });
}

function setupImageModal() {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const captionText = document.getElementById("caption");
  const images = document.querySelectorAll(".clickable-image");

  images.forEach(img => {
    img.addEventListener('click', function () {
      modal.style.display = "flex";
      modalImg.src = this.src;
      captionText.innerText = this.alt;
    });
  });

  const closeBtn = document.querySelector(".modal .close");
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = "none";
    });
  }
}

function loadAircraft() {
  const list = document.getElementById('aircraftList');
  const form = document.getElementById('filterForm');

  let aircraftData = [];

  fetch('aircraft.json')
    .then(res => res.json())
    .then(data => {
      aircraftData = data;
      // Don't render anything initially
    });
    

  form.addEventListener('submit', e => {
    e.preventDefault();

    const selectedManufacturer = document.getElementById('manufacturer').value;
    const selectedType = document.getElementById('type').value;
    const selectedYear = document.getElementById('year').value;

    const filtered = aircraftData.filter(aircraft => {
      return (
        (selectedManufacturer === '' || aircraft.manufacturer === selectedManufacturer) &&
        (selectedType === '' || aircraft.type === selectedType) &&
        (selectedYear === '' || aircraft.year === Number(selectedYear))
      );
    });

    renderAircraft(filtered);
  });

  function renderAircraft(data) {
    list.innerHTML = '';

    if (data.length === 0) {
      list.innerHTML = '<p>No aircraft match your filters.</p>';
      return;
    }

    data.forEach(aircraft => {
      const card = document.createElement('div');
      card.className = 'aircraft-card';
      card.innerHTML = `
        <img src="${aircraft.image}" alt="${aircraft.name}" />
        <h3>${aircraft.name}</h3>
        <p>Manufacturer: ${aircraft.manufacturer}</p>
        <p>Type: ${aircraft.type}</p>
        <p>Year: ${aircraft.year}</p>
        <p class="summary">${aircraft.summary}</p>
        <div class="more-text" style="display: none;">${aircraft.details}</div>
        <button class="toggle-text">See More</button>
      `;
      list.appendChild(card);
    });

    setupToggleButtons();
  }
}
