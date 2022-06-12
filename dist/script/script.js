//============================= Start Navbar ====================================
let navbar = document.querySelector("nav");
window.addEventListener("scroll", _ => {
  //- Add class active when scroll in page
  window.scrollY > 100 ? navbar.classList.add("active") : navbar.classList.remove("active");
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