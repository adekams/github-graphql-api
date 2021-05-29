const bar = document.querySelector("#bar")

const navItem1 = document.querySelector(".center-nav")
const navItem2 = document.querySelector(".left-nav")


const toggleNavItem=()=> {
    navItem1.classList.toggle('block-display')
    navItem2.classList.toggle('block-display')
}

bar.addEventListener('click', toggleNavItem)