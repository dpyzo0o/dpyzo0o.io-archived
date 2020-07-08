/**
 * @reference https://github.com/euank/node-parse-numeric-range
 * @param string
 */
export default function parsePart(string: string): number[] {
  let res: number[] = []
  let m

  for (let str of string.split(',').map(str => str.trim())) {
    // just a number
    if (/^-?\d+$/.test(str)) {
      res.push(parseInt(str, 10))
    } else if (
      (m = str.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/))
    ) {
      // 1-5 or 1..5 (equivalent) or 1...5 (doesn't include 5)
      let [_, lhs, sep, rhs] = m

      if (lhs && rhs) {
        let lhsN = parseInt(lhs)
        let rhsN = parseInt(rhs)
        const incr = lhsN < rhsN ? 1 : -1

        // Make it inclusive by moving the right 'stop-point' away by one.
        if (sep === '-' || sep === '..' || sep === '\u2025') {
          rhsN += incr
        }

        for (let i = lhsN; i !== rhsN; i += incr) {
          res.push(i)
        }
      }
    }
  }

  return res
}
