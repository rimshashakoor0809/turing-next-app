export function convertSecondsToMinutesAndSeconds(seconds : number) :string {
  if (seconds < 0) {
    return 'Invalid input';
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes} minutes and ${remainingSeconds} seconds`;
}
