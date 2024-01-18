import { FormatDurationPipe } from './format-duration.pipe';

describe('FormatDurationPipe', () => {
  it('create an instance', () => {
    const pipe = new FormatDurationPipe();
    expect(pipe).toBeTruthy();
  });

  it('should turn 3.2 into 3 hours 12 min', () => {
    const pipe = new FormatDurationPipe();
    expect(pipe.transform(3.2)).toEqual('3 hrs 12 min');
  });

  it('should turn 3 into 3 hours', () => {
    const pipe = new FormatDurationPipe();
    expect(pipe.transform(3)).toEqual('3 hrs ');
  });

  it('should turn 0.2 into 12 minutes', () => {
    const pipe = new FormatDurationPipe();
    expect(pipe.transform(0.2)).toEqual('12 min');
  });
});
