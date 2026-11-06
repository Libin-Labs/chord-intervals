import { chordNotes } from '@lp-labs/chord-intervals';
if (chordNotes(60, 'major', 1).join() !== '64,67,72') throw new Error('Chord');
// @ts-expect-error invalid argument must be rejected by declarations
chordNotes(60, 'unknown');
