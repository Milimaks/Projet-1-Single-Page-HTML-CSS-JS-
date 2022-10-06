const menuPokeball = document.querySelector(".menu-poke")
    const navLinks = document.querySelector(".nav-links")

    menuPokeball.addEventListener('click',()=>{
    navLinks.classList.toggle('mobile-menu')
    })




const button = document.querySelector('.button');

   console.log(button);

button.addEventListener('click',() =>{
    console.log("test");
    const preloader = document.querySelector('.preloader')
    preloader.style.display = 'none';
})

  