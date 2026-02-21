import { 
  calculateDiscreteChordLength, 
  calculatePiLessConstant,
  SIGMA_C_O, 
  discreteRound 
} from 'co-sphere'

export class FirmwareSimulator {
  private currentAngle: number = 0
  private readonly GROOVE_WIDTH = 16.3636 // Degrees per data groove

  public calculateSteps(angle: number): number {
    // Using a simple rounding for steps, but tracking state with discrete logic
    return discreteRound(angle / this.GROOVE_WIDTH)
  }

  public calculateStepsTo(targetAngle: number): number {
    const diff = targetAngle - this.currentAngle
    return this.calculateSteps(diff)
  }

  public moveTo(targetAngle: number): void {
    this.currentAngle = targetAngle
  }

  public getCurrentAngle(): number {
    return this.currentAngle
  }

  public calculateToothJump(count: 13 | 17): number {
    // Calibrated sigma to match the forensic 16.3636 deg groove width
    const L = calculateDiscreteChordLength(1, SIGMA_C_O) 
    // The Voynich machine has 22 physical sectors, so we calculate its specific Pi-less constant
    const VOYNICH_PI = calculatePiLessConstant(22, 1, SIGMA_C_O)
    const discreteAngle = L * (180 / VOYNICH_PI) // Resolves perfectly to 16.3636...
    return count * discreteAngle 
  }

  public reset(): void {
    this.currentAngle = 0
  }
}
