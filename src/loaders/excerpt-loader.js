module.exports = function (src) {
  if (src.includes('<!--more-->')) {
    const [excerpt] = src.split('<!--more-->')
    return this.callback(null, excerpt)
  }

  const [preview] = src.split('<!--/excerpt-->')
  return this.callback(null, preview.replace('<!--excerpt-->', ''))
}
