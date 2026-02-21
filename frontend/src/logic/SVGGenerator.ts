import { discretePolarToCartesian } from 'co-sphere'

export function generateStatorASVG(): string {
  const size = 100
  const center = size / 2
  const radius = 40

  const windows = [
    { id: 1, angle: 0, width: 16.36 },
    { id: 2, angle: 90, width: 32.72 },
    { id: 3, angle: 180, width: 16.36 },
    { id: 4, angle: 270, width: 49.09 },
  ]

  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = discretePolarToCartesian(x, y, radius, endAngle)
    const end = discretePolarToCartesian(x, y, radius, startAngle)
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
    const d = [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ')
    return d
  }

  const paths = windows.map(w => {
    const d = describeArc(center, center, radius, w.angle, w.angle + w.width)
    return `<path d="${d}" fill="none" stroke="#00ff41" stroke-width="2" />`
  }).join('\n')

  return `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <circle cx="${center}" cy="${center}" r="${radius + 5}" fill="none" stroke="#333" stroke-width="0.5" />
  ${paths}
</svg>`.trim()
}
