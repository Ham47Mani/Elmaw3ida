//============================= Start Navbar ====================================
let navbar = document.querySelector("nav");
window.addEventListener("scroll", _ => {
  //- Add class active when scroll in page
  window.scrollY > 100 ? navbar.classList.add("active") : navbar.classList.remove("active");
});

const links = document.querySelectorAll("nav ul li");
links.forEach(link => {
  link.addEventListener("click", () => {
    document.querySelector("nav ul li.active").classList.remove("active");
    link.classList.add("active");
    document.querySelector(link.dataset.section.toString()).scrollIntoView({
      behavior: "smooth"
    });
  });
});

//- Logo click event
document.querySelector("nav .logo").addEventListener("click", _ => {
  document.querySelector("header").scrollIntoView({
    behavior: "smooth"
  });
});
//============================= End Navbar ====================================

//============================= Start Header ====================================
let exploreBtn = document.querySelector("header .title .btn");
//--- Scroll to next section to explore page
exploreBtn.addEventListener("click", function () {
  document.querySelector(".hadith").scrollIntoView({
    behavior: "smooth"
  });
});
//============================= End Header ====================================

//============================= Start Hadith ====================================
const hadithContainer = document.querySelector(".hadith .hadithContainer"),
      prevBtn = document.querySelector(".hadith .buttons .prev"),
      nextBtn = document.querySelector(".hadith .buttons .next"),
      numbers = document.querySelector(".hadith .buttons .numbers");

let hadithIndex = 0;
hadithChanger();

//--- hadithChanger Function
function hadithChanger () {
  fetch(`https://api.hadith.sutanlab.id/books/muslim?range=1-300`)
  .then(response => response.json())
  .then(response => {
    let hadith = response.data.hadiths;
    hadithWrite(hadith);

    //--- Prev button to show the previous hadith
    prevBtn.addEventListener("click", function () {
      hadithIndex == 0 ? hadithIndex = 299 : hadithIndex--;
      hadithWrite(hadith);
    });

    //--- Next button to show the next hadith
    nextBtn.addEventListener("click", function () {
      hadithIndex == 299 ? hadithIndex = 0 : hadithIndex++;
      hadithWrite(hadith);
    });
  });
}

//--- hadithWrite Function
function hadithWrite (hadith) {
  hadithContainer.innerText = hadith[hadithIndex].arab;
  numbers.innerText = `300 - ${hadithIndex + 1}`;
}
//============================= End Hadith ====================================

//============================= Start Quran ====================================
let surahsContainer = document.querySelector(".quran .surahs-container");
getSurahs();

///- getSurahs function
function getSurahs () {
  surahsContainer.innerHTML = ``;
  //- Fetch surahs meta data {Name of surahs}
  fetch("http://api.alquran.cloud/v1/meta")
  .then(response => response.json())
  .then(response => {
    let surahs = response.data.surahs.references;
    let numberOfSurahs = response.data.surahs.count;
    for (let i = 0; i < numberOfSurahs; i++) {
      surahsContainer.innerHTML += `
        <div class="surah">
          <p>${surahs[i].name}</p>
          <p>${surahs[i].englishName}</p>
        </div>
      `;
    }

    //-------------------- Ayat Surahs ----------------------------------------
    let surahsTitles = document.querySelectorAll(".quran .surah");
    const popup = document.querySelector(".surahs-popup"),
          popupClose = document.querySelector(".surahs-popup .close-popup"),
          popupAyats = document.querySelector(".surahs-popup .ayats");
    
    //- Fetch ayats of any surah titles & add an event listener
    surahsTitles.forEach((surahTitle, index) => {
      surahTitle.addEventListener("click", () => {
        fetch(`https://api.alquran.cloud/v1/surah/${index + 1}`)
        .then(response => response.json())
        .then(response => {
          popupAyats.innerHTML = ``;
          let ayahs = response.data.ayahs;

          ayahs.forEach(ayah => {
            popup.classList.add("active");
            popupAyats.innerHTML += `
              <p>${ayah.text} - {${ayah.numberInSurah}}</p>
            `;
          });
        });
      });
    });

    //- Close Popup
    popupClose.addEventListener("click", () => {
      popup.classList.remove("active");
    });
  });

}
//============================= End Quran ====================================

//============================= Start Pray Time ====================================
let cards = document.querySelector(".pray .cards");
getPrayTime();

//--- getPrayTime function
function getPrayTime () {
  fetch("https://api.aladhan.com/v1/timingsByCity?city=Ghardaia&country=Algeria&method=8")
  .then(response => response.json())
  .then(response => {
    let times = response.data.timings;
    cards.innerHTML = ``;
    for (let time in times) {
      cards.innerHTML += `
        <div class="card">
            <div class="circle"><svg>
                    <circle cx="100" cy="100" r="100"></circle>
                </svg>
                <div class="pray-time">${times[time]}</div>
            </div>
            <p>${time}</p>
        </div>
      `;
    }
  });
}
//============================= End Pray Time ====================================