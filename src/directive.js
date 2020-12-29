import getImageSrc from './provider-config'
import ua from './ua'

function getSrc(config) {
  // TODO only simply check in sync way
  const isSupportWebp =
    ua.isSupportWebp(navigator.userAgent) ||
    JSON.parse(localStorage.getItem('isSupportWebp')) ||
    false
  const {
    provider = 'alibaba',
    extraQuery,
    src,
    width,
    height,
    autocrop = true
  } = config
  if (!src) {
    return
  }

  return getImageSrc({
    autocrop,
    provider,
    src,
    isSupportWebp,
    extraQuery,
    width,
    height
  }).$src
}

export default {
  init(el, {value = {}}) {
    const size = {
      width: el.offsetWidth,
      height: el.offsetHeight
    }
    const src = getSrc({...size, ...value})
    el.classList.add('lazyload')
    el.setAttribute('data-bgset', src)
  },

  update(el, {value = {}}) {
    const src = getSrc(value)
    el.style.backgroundImage = `url(${src})`
  }
}
