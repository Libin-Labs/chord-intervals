import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('C major', () => {
  assert.deepEqual(api.chordNotes(60), [60, 64, 67]);
});
test('minor seventh', () => {
  assert.deepEqual(api.chordNotes(60, 'minor7'), [60, 63, 67, 70]);
});
test('first inversion', () => {
  assert.deepEqual(api.chordNotes(60, 'major', 1), [64, 67, 72]);
});
test('second inversion', () => {
  assert.deepEqual(api.chordNotes(60, 'major', 2), [67, 72, 76]);
});
test('quality and range', () => {
  assert.throws(() => api.chordNotes(60, '__proto__'));
  assert.throws(() => api.chordNotes(125));
  assert.throws(() => api.chordNotes(60, 'major', 3));
});
test('transposition oracle', () => {
  for (let root = 0; root <= 100; root++) {
    const a = api.chordNotes(root, 'dominant7');
    assert.deepEqual(
      a.map((n) => n - root),
      [0, 4, 7, 10],
    );
  }
});
