import { discreteCos, discreteSin } from 'co-sphere'

export function generateStatorAGCode(): string {
  const header = [
    '(Syntaxis Volvella V6 - Stator A Window Generator)',
    'G21 (Metric)',
    'G90 (Absolute Positioning)',
    'G0 Z5.0 (Clearance)',
    'M3 (Spindle On)',
    ''
  ]

  const footer = [
    '',
    'M5 (Spindle Off)',
    'G0 Z5.0',
    'G0 X0 Y0',
    'M30 (End of Program)'
  ]

  const windows = [
    { id: 1, angle: 0, width: 16.36 },
    { id: 2, angle: 90, width: 32.72 },
    { id: 3, angle: 180, width: 16.36 },
    { id: 4, angle: 270, width: 49.09 },
  ]

  const windowGCode = windows.map(w => {
    return [
      `(Window ${w.id} - Start at ${w.angle} deg)`,
      `G0 X${(discreteCos(w.angle) * 50).toFixed(2)} Y${(discreteSin(w.angle) * 50).toFixed(2)}`,
      `G1 Z-1.0 F100 (Engage)`,
      `(Milling ${w.width} deg arc...)`,
      `G1 Z5.0 (Retract)`,
      ''
    ].join('\n')
  }).join('\n')

  return [...header, windowGCode, ...footer].join('\n')
}
