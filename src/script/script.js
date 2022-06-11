//============================= Start Navbar ====================================
let navbar = document.querySelector("nav");
window.addEventListener("scroll", _ => {
  //- Add class active when scroll in page
  window.scrollY > 100 ? navbar.classList.add("active") : navbar.classList.remove("active");
});
//============================= End Navbar ====================================