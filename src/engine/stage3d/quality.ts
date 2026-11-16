/** Chỉ đo chuỗi frame đang tương tác; khoảng nghỉ của frameloop demand không phải FPS thấp. */
export class InteractionQuality {
  private last: number | null = null;
  private intervals: number[] = [];
  private degraded = false;
  sample(nowMs: number, active: boolean): boolean {
    if (!active) {
      this.last = null;
      return false;
    }
    const delta = this.last === null ? 0 : nowMs - this.last;
    this.last = nowMs;
    if (delta <= 0 || delta > 250) {
      this.intervals = [];
      return false;
    }
    this.intervals.push(delta);
    if (this.intervals.length > 20) this.intervals.shift();
    if (
      !this.degraded &&
      this.intervals.length === 20 &&
      this.intervals.reduce((a, b) => a + b, 0) / 20 > 1000 / 30
    ) {
      this.degraded = true;
      return true;
    }
    return false;
  }
}
