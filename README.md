# @lp-labs/chord-intervals

Named chord interval expansion and bounded inversion.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/chord-intervals
```

## Working example

```js
import { chordNotes } from '@lp-labs/chord-intervals';
if (chordNotes(60, 'major', 1).join() !== '64,67,72') throw new Error('Chord');
```

CommonJS: `const api = require('@lp-labs/chord-intervals')`.

## Behavior, customization and limits

chordNotes(rootMidi,quality="major",inversion=0) supports major[0,4,7],minor[0,3,7],diminished[0,3,6],augmented[0,4,8],dominant7[0,4,7,10],major7[0,4,7,11],minor7[0,3,7,10]. Inversion rotates first notes up octave,0..noteCount-1; every MIDI note0..127. O(4), no chord recognition, voice leading or rendering.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export type ChordQuality =
  'major' | 'minor' | 'diminished' | 'augmented' | 'dominant7' | 'major7' | 'minor7';
export declare function chordNotes(
  rootMidi: number,
  quality?: ChordQuality,
  inversion?: number,
): number[];
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
