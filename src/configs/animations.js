import { gsap } from 'gsap'

const showContainer = (element) => {
  gsap.to(element.current, {duration: .25, autoAlpha: 1, delay: .25})
}

export { showContainer }