function init() {
  var categories = {
    Шкафы: { icon: "skafi.svg", color: "#B642CE" },
    Гардеробные: { icon: "gard.svg", color: "#ADDB07" },
    "Тумбы, консоли": { icon: "tumbi.svg", color: "#FF8281" },
    Детские: { icon: "dets.svg", color: "#01F1D7" },
    Прихожие: { icon: "prih.svg", color: "#F8A31D" },
    "Бизнес мебель": { icon: "busines.svg", color: "#9E75F6" },
    Перегородки: { icon: "panaeli.svg", color: "#9F6646" },
    "Работа с камнем": { icon: "kamen.svg", color: "#FA9302" },
  };
  () => { }
  var points = [];

  // Генерация 300 случайных точек по Москве с категориями
  var bounds = {
    north: 55.85,
    south: 55.6,
    west: 37.4,
    east: 37.8,
  };
  var categoryKeys = Object.keys(categories);

  for (var i = 0; i < 300; i++) {
    var lat = Math.random() * (bounds.north - bounds.south) + bounds.south;
    var lon = Math.random() * (bounds.east - bounds.west) + bounds.west;
    var category =
      categoryKeys[Math.floor(Math.random() * categoryKeys.length)];

    points.push({
      coords: [lat, lon],
      category: category,
    });
  }

  var myMap = new ymaps.Map("map", {
    center: [55.76, 37.64],
    zoom: 11,
  });
<!--
  myMap.behaviors.disable("scrollZoom");

  var geoObjectsByCategory = {};

  points.forEach(function (point) {
    var category = point.category;
    if (!geoObjectsByCategory[category]) geoObjectsByCategory[category] = [];

    var geoObject = new ymaps.GeoObject(
      {
        geometry: {
          type: "Point",
          coordinates: point.coords,
        },
        properties: {
          hintContent: category,
        },
      },
      {
        iconLayout: "default#image",
        iconImageHref: `https://andreykanay.github.io/mebel911/assets/images/${categories[category].icon}`,
        iconImageSize: [36, 36],
        iconImageOffset: [-18, -18],
        hintContentLayout: ymaps.templateLayoutFactory.createClass(`
        <div class="hint">
            <img class="hint__image" src="{{ properties.hintData.image }}" alt="Photo">
            <p class="hint__text">{{ properties.hintData.description }}</p>
            <p class="hint__address">{{ properties.hintData.address }}</p>
        </div>
      `),
      }
    );

    ymaps.geocode(point.coords).then(function (res) {
      var firstGeoObject = res.geoObjects.get(0); // Первый объект геокодирования
      if (firstGeoObject) {
        var address = firstGeoObject.getAddressLine(); // Адрес в строковом формате
        geoObject.properties.set("hintData", {
          image:
            "https://andreykanay.github.io/mebel911/assets/images/512_biznes_mebel.jpg",
          description: "Описание вашей точки", // Ваше описание
          address: address, // Устанавливаем адрес
        });
      }
    });

    geoObject.events.add("click", function (e) {
      var target = e.get("target"); // Текущий объект
      window.location.href =
        "https://andreykanay.github.io/mebel911/portfolio-item.html";
    });

    geoObjectsByCategory[category].push(geoObject);

    myMap.geoObjects.add(geoObject);
  });

  var filterButtonsContainer = document.getElementById("filters");
  Object.keys(categories).forEach(function (category) {
    var button = document.createElement("button");
    button.classList.add("filter");
    button.innerHTML = `
      <span class="filter__color" style="--filter-color: ${categories[category].color}"></span>
      <span class="filter__text">${category}</span>
    `;
    button.onclick = function () {
      myMap.geoObjects.removeAll();
      (geoObjectsByCategory[category] || []).forEach(function (geoObject) {
        myMap.geoObjects.add(geoObject);
      });
    };
    filterButtonsContainer.appendChild(button);
  });

  var showAllButton = document.createElement("button");
  showAllButton.classList.add("filter");
  showAllButton.innerHTML = `
      <span class="filter__text">Показать все</span>
    `;
  showAllButton.onclick = function () {
    myMap.geoObjects.removeAll();
    Object.keys(geoObjectsByCategory).forEach(function (category) {
      (geoObjectsByCategory[category] || []).forEach(function (geoObject) {
        myMap.geoObjects.add(geoObject);
      });
    });
  };
  filterButtonsContainer.appendChild(showAllButton);
}

ymaps.ready(init);

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navigation = document.querySelector(".navigation");

  hamburger.addEventListener("click", (event) => {
    hamburger.classList.toggle("hamburger_is_active");
    navigation.classList.toggle("topbar__navigation_is_active");
  });

  const activeElement = document.querySelector(".navigation__link_is_active");

  if (activeElement) {
    // Находим предыдущий элемент
    const prevElement = activeElement.previousElementSibling;

    if (prevElement) {
      // Добавляем класс '.navigation__link_is_prev' к предыдущему элементу
      prevElement.classList.add("navigation__link_is_prev");
    }
  }

  const partners = new Swiper(".partners", {
    slidesPerView: 4,
    loop: true,
    autoplay: {
      deley: 3000,
    },
  });
});
