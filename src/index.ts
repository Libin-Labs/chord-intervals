function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
export type ChordQuality =
  'major' | 'minor' | 'diminished' | 'augmented' | 'dominant7' | 'major7' | 'minor7';
const chords: Readonly<Record<ChordQuality, readonly number[]>> = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  diminished: [0, 3, 6],
  augmented: [0, 4, 8],
  dominant7: [0, 4, 7, 10],
  major7: [0, 4, 7, 11],
  minor7: [0, 3, 7, 10],
};
export function chordNotes(
  rootMidi: number,
  quality: ChordQuality = 'major',
  inversion = 0,
): number[] {
  integer(rootMidi, 0, 127);
  if (!Object.hasOwn(chords, quality)) throw new RangeError('Unsupported quality');
  const pattern = chords[quality];
  integer(inversion, 0, pattern.length - 1);
  const notes = pattern.map((n) => rootMidi + n);
  for (let i = 0; i < inversion; i++) notes.push(notes.shift()! + 12);
  for (const n of notes) integer(n, 0, 127);
  return notes;
}
