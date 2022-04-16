export function getRandomHeight() {
  return 40 + Math.ceil(Math.random() * 40)
}

export function getFontStyle(element: HTMLElement) {
  const computedStyle = window.getComputedStyle(element)

  const fontSize = computedStyle.getPropertyValue('font-size')
  const fontColor = computedStyle.getPropertyValue('color')

  return {
    size: fontSize ? Number(fontSize.replace(/([^\d]+)$/, '')) : undefined,
    color: fontColor || undefined,
  }
}
