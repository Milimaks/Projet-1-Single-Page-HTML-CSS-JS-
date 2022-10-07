class Carousel { // La class correspond à new Carousel en bas


/**
 * http://jsdoc.app (donne des infos aux autres dev)
 * @param {HTMLElement} element 
 * @param {Object} options 
 * @param {Object} options.slidesToScroll Nombre d'éléments à faire défiler
 * @param {Object} options.slidesToScroll Nombre d'éléments visibles dans un slide
 * @param {boolean} options.loop Doit on boucler en fin de carousel
 */


constructor (element, options  = {}) { //options = {} signifie que par défault si on ne précise rien, alors ce sera vide
    this.element = element
    this.options = Object.assign({}, { //Object.assign
        slidesToScroll: 1, //le premier objet qui , la seconde indique la valeur par défaut, et options indique que l'on pourra rajouter des options
        slidesVisible: 1,
        loop: false
    }, options) 
    let children = [].slice.call(element.children) // Permet de prendre les enfants de l'éléments au moment où la fonction est appelé et de ne pas s'occuper de ceux après.
    this.isMobile = false
    this.currentItem = 0
    this.moveCallbacks = []

    // Modification du DOM
    this.root = this.createDivWithClass('carousel')
    this.container = this.createDivWithClass('carousel-container')
    this.root.setAttribute('tabindex', '0')
    this.root.appendChild(this.container)
    this.element.appendChild(this.root)
    
    this.items = children.map((child) => {
       let item = this.createDivWithClass('carousel-item')
       
       item.appendChild(child)
       this.container.appendChild(item)
       return item
    })
    this.setStyle()
    this.createNavigation()
    
    // Evenements
    
    this.moveCallbacks.forEach(cb => cb(0))
    this.onWindowResize()
    window.addEventListener('resize', this.onWindowResize.bind(this))
    this.root.addEventListener('keyup', e => {
        if (e.key === 'ArrowRight') {
            this.next()
        } else if (e.key === 'ArrowLeft') {
            this.prev()
        }
    })
}

/**
 * Applique les bonnes dimensions aux éléments du carousel
 */

setStyle () {
    let ratio = this.items.length / this.slidesVisible
    this.container.style.width = (ratio * 100) + "%"
    this.items.forEach(item =>item.style.width = ((100 / this.slidesVisible) / ratio) + "%")
}

createNavigation () {
    let nextButton = this.createDivWithClass('carousel-next')
    let prevButton = this.createDivWithClass('carousel-prev')
    this.root.appendChild(nextButton)
    this.root.appendChild(prevButton)
    nextButton.addEventListener('click', this.next.bind(this))
    prevButton.addEventListener('click', this.prev.bind(this))
    if (this.options.loop === true) {
        return
    }
    this.onMove(index => {
        if (index === 0) {
            prevButton.classList.add('carousel-prev-hidden')
        } else {
            prevButton.classList.remove('carousel-prev-hidden')
        }
        if (this.items[this.currentItem + this.slidesVisible] === undefined) {
            nextButton.classList.add('carousel-next-hidden')
        } else {
            nextButton.classList.remove('carousel-next-hidden')
        }
    })
}

next () {
    this.gotoItem(this.currentItem + this.slidesToScroll)
}


prev () {
    this.gotoItem(this.currentItem - this.slidesToScroll)
}

/**
 * déplace le carousel vers l'élément cible
 * @param {number} index 
 */
gotoItem (index) {
    
    if (index < 0) {
        index = this.items.length - this.options.slidesVisible
    } else if (index >= this.items.length || this.items[this.currentItem + this.options.slidesVisible] === undefined && index > this.currentItem) {
        index = 0
    }
    let translateX = index * -100 / this.items.length
    this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)' 
    this.currentItem = index
    
}



/**
 * 
 * @param {CarouselmoveCallback} cb 
 */
onMove (cb) {
    this.moveCallbacks.push(cb)
    
}

onWindowResize () {
    let mobile = window.innerWidth < 800
    if (mobile !== this.isMobile) {
        this.isMobile = mobile
        this.setStyle
        this.moveCallbacks.forEach(cb => cb(this.currentItem))
    }
}

/**
 * 
 * @param {string} className 
 * @returns {HTMLElement}
 */

createDivWithClass (className) {
    let div = document.createElement('div')
    div.setAttribute('class', className)
    return div
}
/**
 * @returns{number}
 * 
 */

get slidesToScroll () {
    return this.isMobile ? 1 : this.options.slidesToScroll
}
get slidesVisible () {
    return this.isMobile ? 1 : this.options.slidesVisible
}

}


/* attendre le chargement de la page avant d'activer le code */
document.addEventListener('DOMContentLoaded', function () {

/* permet de créer un carousel en sélecton d'abord l'élément souhaité ("ici #carousel 1") et ce qu'on veut lui
appliquer comme action ("ici le nombre d'éléments à scroll et le nombre d'éléments visibles") */

new Carousel(document.querySelector('#carousel1'), { 
    slidesToScroll: 1,
    slidesVisible: 1,
    loop: true
    })

    
})




