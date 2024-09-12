const cities = [
    {
      name: "Київ",
      image: "https://faktypro.com.ua/uploads/img/23-cikavih-faktu-pro-kiyiv.jpg"
    },
    {
      name: "Львів",
      image:
        "https://aws-travel-guide.s3.eu-west-1.amazonaws.com/default_image_size/603fc39c503d9_03%20%D0%9B%D1%8C%D0%B2%D1%96%D0%B2.jpg"
    },
    {
      name: "Одеса",
      image:
        "https://uamedtours.com.ua/storage/images/0b72f48967d33b504c7b742bba050f4d.jpg"
    },
    {
      name: "Харків",
      image:
        "https://blog.pokupon.ua/wp-content/uploads/2021/02/hosprom-panorama-1024x689.jpg"
    },
    {
      name: "Дніпро",
      image:
        "https://gdb.rferl.org/04f677e6-4c9a-47fb-9e97-1999a935917b_w1200_r1.jpg"
    },
    {
      name: "Чернівці",
      image:
        "https://karpatium.com.ua/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaThQIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3fa8a30cadffff526427027e737b01a9a1f0c049/%D0%BC%D1%96%D1%81%D1%82%D0%BE%20%D1%87%D0%B5%D1%80%D0%BD%D1%96%D0%B2%D1%86%D1%96%20%D0%B2%D1%96%D0%B4%D0%BF%D0%BE%D1%87%D0%B8%D0%BD%D0%BE%D0%BA%20%D1%82%D0%B0%20%D0%BF%D1%80%D0%BE%D0%B6%D0%B8%D0%B2%D0%B0%D0%BD%D0%BD%D1%8F.jpeg"
    },
    {
      name: "Запоріжжя",
      image: "https://www.zoda.gov.ua/images/article/1/000065/65354/foto.jpg"
    },
    {
      name: "Миколаїв",
      image: "https://nikvesti.com/images/imageeditor/2023/3/28//267138_3.jpg"
    },
    {
      name: "Полтава",
      image: "https://vorskla.com.ua/images/articles/poltava/poltava_010921.jpg"
    }
  ];
  
  let remainingCities = [...cities]; // Міста, що ще треба вгадати
  let errors = 0;
  let attempts = 3;
  let guessedCities = []; // Вгадані міста
  
  function getRandomCity() {
    const randomIndex = Math.floor(Math.random() * remainingCities.length);
    return remainingCities[randomIndex];
  }
  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function generateCards() {
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = "";
  
    // Перемішуємо всі міста: і ті, що залишились, і ті, що вгадані
    const allCities = [...remainingCities, ...guessedCities];
    shuffle(allCities); // Перемішуємо картки
  
    allCities.forEach((city) => {
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.city = city.name;
  
      const img = document.createElement("img");
      img.src = city.image;
      img.alt = city.name;
      img.style.display = "block"; // Забезпечуємо, що зображення відображається
      card.appendChild(img);
  
      // Якщо місто вже вгадане, робимо картку неактивною
      if (guessedCities.includes(city)) {
        card.style.pointerEvents = "none"; // Вимикаємо кліки для вгаданих міст
        card.style.opacity = "1"; // Повертаємо повну прозорість
      } else {
        card.addEventListener("click", () => handleCardClick(card));
      }
  
      cardsContainer.appendChild(card);
    });
  }
  
  function handleCardClick(card) {
    const currentCity = document.getElementById("city-name").textContent;
    const city = card.dataset.city;
  
    if (currentCity === city) {
      // Видаляємо місто з залишених і додаємо до вгаданих
      remainingCities = remainingCities.filter((c) => c.name !== city);
      guessedCities.push(cities.find((c) => c.name === city));
  
      if (remainingCities.length === 0) {
        document.getElementById("message").textContent = "Вітаємо, ви виграли!";
        return;
      } else {
        setRandomCity();
      }
    } else {
      errors++;
      attempts--;
      document.getElementById("errors").textContent = errors;
      document.getElementById("attempts").textContent = attempts;
  
      if (attempts <= 0) {
        document.getElementById("message").textContent =
          "Гра закінчена. Ви програли!";
        document
          .querySelectorAll(".card")
          .forEach((card) => card.removeEventListener("click", handleCardClick));
        return;
      }
    }
  
    generateCards(); // Перемішуємо картки після кожного кліку
  }
  function setRandomCity() {
    const city = getRandomCity();
    document.getElementById("city-name").textContent = city.name;
    generateCards();
  }
  
  function initializeGame() {
    setRandomCity();
    updateScoreboard();
  }
  
  function updateScoreboard() {
    document.getElementById("errors").textContent = errors;
    document.getElementById("attempts").textContent = attempts;
  }
  
  initializeGame();
  