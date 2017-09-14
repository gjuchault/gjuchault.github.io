function testImage(src) {
  const img = new Image()

  return new Promise((resolve, reject) => {
    img.src = src

    img.onload = () => {
      if (img.width > 0 && img.height > 0) {
        resolve()
      } else {
        reject()
      }
    }

    img.onerror = reject
  })
}

export default () => {
    const tests = {
        lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
        lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA=="
    }

    return Promise.all([
      testImage(`data:image/webp;base64,${tests.lossy}`),
      testImage(`data:image/webp;base64,${tests.lossless}`)
    ]);
}
