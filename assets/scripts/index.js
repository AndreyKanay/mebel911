function init() {
  var categories = {
    "Шкафы": "skafi.svg",
    "Гардеробные": "gard.svg",
    "Тумбы, консоли": "tumbi.svg",
    "Детские": "dets.svg",
    "Прихожие": "prih.svg",
    "Бизнес мебель": "busines.svg",
    "Перегородки": "panaeli.svg",
    "Работа с камнем": "kamen.svg"
  };

  var points = [];

  // Генерация 300 случайных точек по Москве с категориями
  var bounds = {
    north: 55.85,
    south: 55.6,
    west: 37.4,
    east: 37.8
  };
  var categoryKeys = Object.keys(categories);

  for (var i = 0; i < 300; i++) {
    var lat = Math.random() * (bounds.north - bounds.south) + bounds.south;
    var lon = Math.random() * (bounds.east - bounds.west) + bounds.west;
    var category = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];

    points.push({
      coords: [lat, lon],
      category: category
    });
  }

  var myMap = new ymaps.Map("map", {
    center: [55.76, 37.64],
    zoom: 11
  });
  myMap.behaviors.disable("scrollZoom");

  var geoObjectsByCategory = {};
  var clusterer = new ymaps.Clusterer({
    clusterIcons: [{
      href: "https://andreykanay.github.io/mebel911/assets/images/placemark.svg",
      size: [36, 36],
      offset: [-18, -18]
    }],
    gridSize: 120
  });

  points.forEach(function (point) {
    var category = point.category;
    if (!geoObjectsByCategory[category]) geoObjectsByCategory[category] = [];

    var geoObject = new ymaps.GeoObject({
      geometry: {
        type: "Point",
        coordinates: point.coords
      },
      properties: {
        hintContent: category,
      }
    }, {
      iconLayout: "default#image",
      iconImageHref: `https://andreykanay.github.io/mebel911/assets/images/${categories[category]}`,
      iconImageSize: [36, 36],
      iconImageOffset: [-18, -18]
    });

    geoObjectsByCategory[category].push(geoObject);
    clusterer.add(geoObject);
  });

  myMap.geoObjects.add(clusterer);

  var filterButtonsContainer = document.getElementById("filters");
  Object.keys(categories).forEach(function (category) {
    var button = document.createElement("button");
    button.innerText = category;
    button.onclick = function () {
      clusterer.removeAll();
      clusterer.add(geoObjectsByCategory[category] || []);
    };
    filterButtonsContainer.appendChild(button);
  });

  var showAllButton = document.createElement("button");
  showAllButton.innerText = "Показать все";
  showAllButton.onclick = function () {
    clusterer.removeAll();
    Object.keys(geoObjectsByCategory).forEach(function (category) {
      clusterer.add(geoObjectsByCategory[category]);
    });
  };
  filterButtonsContainer.appendChild(showAllButton);
}

ymaps.ready(init);


document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navigation = document.querySelector(".navigation");

  hamburger.addEventListener("click", event => {
    hamburger.classList.toggle("hamburger_is_active");
    navigation.classList.toggle("topbar__navigation_is_active");
  })

  const activeElement = document.querySelector('.navigation__link_is_active');

  if (activeElement) {
      // Находим предыдущий элемент
      const prevElement = activeElement.previousElementSibling;

      if (prevElement) {
          // Добавляем класс '.navigation__link_is_prev' к предыдущему элементу
          prevElement.classList.add('navigation__link_is_prev');
      }
  }

  const partners = new Swiper(".partners", {
    slidesPerView: 4,
    loop: true,
    autoplay: {
      deley: 3000
    }
  })
})