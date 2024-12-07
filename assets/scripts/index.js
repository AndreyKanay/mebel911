function init(){
  // Создание карты.
  var myMap = new ymaps.Map("map", {
      center: [55.76, 37.64],
      zoom: 12
  });
  myMap.behaviors.disable('scrollZoom');

  var points = [
    [55.767166, 37.461331],
    [55.7946, 37.505534],
    [55.668262, 37.602487],
    [55.791828, 37.614746],
    [55.666913, 37.490191],
    [55.825643, 37.546136],
    [55.676423, 37.634268],
    [55.789368, 37.501975],
    [55.804987, 37.547401],
    [55.75345, 37.50718],
    [55.661122, 37.567166],
    [55.706998, 37.594733],
    [55.69566, 37.552467],
    [55.815641, 37.56992],
    [55.715649, 37.610192],
    [55.680068, 37.580084],
    [55.801416, 37.481377],
    [55.673137, 37.489198],
    [55.699874, 37.545049],
    [55.813644, 37.524688],
    [55.762234, 37.648185],
    [55.745181, 37.558378],
    [55.683695, 37.646218],
    [55.826394, 37.61378],
    [55.738821, 37.531304],
    [55.662515, 37.502412],
    [55.79072, 37.573843],
    [55.718274, 37.539654],
    [55.82074, 37.500725],
    [55.768806, 37.593936],
    [55.781197, 37.530961],
    [55.68287, 37.53394],
    [55.791977, 37.579523],
    [55.849397, 37.536758],
    [55.680653, 37.655837],
    [55.70517, 37.60778],
    [55.820401, 37.564376],
    [55.705624, 37.537609],
    [55.681205, 37.524927],
    [55.779739, 37.537548],
    [55.855398, 37.619878],
    [55.819288, 37.606642],
    [55.831556, 37.532351],
    [55.828452, 37.653287],
    [55.830044, 37.527912],
    [55.684033, 37.59974],
    [55.807052, 37.634604],
    [55.80834, 37.609406],
    [55.685511, 37.627595],
    [55.73264, 37.479057]
  ];

var geoObjects = points.map(function (coords) {
    var geoObject = new ymaps.GeoObject({
      geometry: {
          type: "Point",
          coordinates: coords
      },
      properties: {
        hintContent: '',
        hintData: {
            image: 'https://andreykanay.github.io/mebel911/assets/images/512_biznes_mebel.jpg',
            description: 'Описание вашей точки',
            address: 'Загрузка адреса...'
        }
    }
    }, {
      iconLayout: 'default#image',
      iconImageHref: 'https://andreykanay.github.io/mebel911/assets/images/placemark.svg', // ссылка на изображение иконки
      iconImageSize: [36, 36], // размер иконки
      iconImageOffset: [-18, -18],
      hintContentLayout: ymaps.templateLayoutFactory.createClass(`
        <div class="hint">
            <img class="hint__image" src="{{ properties.hintData.image }}" alt="Photo">
            <p class="hint__text">{{ properties.hintData.description }}</p>
            <p class="hint__address">{{ properties.hintData.address }}</p>
        </div>
    `)
    });

    ymaps.geocode(coords).then(function (res) {
      var firstGeoObject = res.geoObjects.get(0); // Первый объект геокодирования
      if (firstGeoObject) {
          var address = firstGeoObject.getAddressLine(); // Адрес в строковом формате
          geoObject.properties.set('hintData', {
              image: 'https://andreykanay.github.io/mebel911/assets/images/512_biznes_mebel.jpg',
              description: 'Описание вашей точки', // Ваше описание
              address: address // Устанавливаем адрес
          });
      }
  });

    geoObject.events.add('click', function (e) {
      var target = e.get('target'); // Текущий объект
      window.location.href = "https://andreykanay.github.io/mebel911/portfolio-item.html"
  });

  return geoObject;
});

// Создаем кластеризатор
var clusterer = new ymaps.Clusterer({
    // Настройки для кластера
    clusterIcons: [{
        href: 'https://andreykanay.github.io/mebel911/assets/images/placemark.svg', // Иконка кластера
        size: [36, 36], // Размер иконки
        offset: [-18, -18] // Смещение
    }],
    clusterIconContentLayout: ymaps.templateLayoutFactory.createClass(
        '<div style="color: #fff; font-weight: bold; font-size: 14px;">{{ properties.geoObjects.length }}</div>'
    ),
    clusterNumbers: [10, 20, 50],
    clusterBalloonContentLayout: "cluster#balloonAccordion", // Стиль балуна
    gridSize: 120 // Размер сетки для кластеризации
});

clusterer.events.add('click', function (e) {
  var cluster = e.get('target'); // Текущий кластер
  if (cluster.getGeoObjects) {
      var geoObjects = cluster.getGeoObjects();
      handleClusterClick(geoObjects);
  }
});

// Добавляем все точки в кластеризатор
clusterer.add(geoObjects);

function handleClusterClick(geoObjects) {
  geoObjects.forEach(function (geoObject) {
      console.log("Точка:", geoObject.geometry.getCoordinates());
  });
}

myMap.geoObjects.add(clusterer);

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