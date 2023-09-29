/** parameter: [reasons]: {id, title, description }
 * result: string
 */
export const mergeReasons = (reasons) => {
  if (typeof reasons === 'string') return reasons
  if (typeof reasons === 'undefined') return ''
  if (!reasons.length) return ''
  return reasons.reduce((acc, cur, index) => {
    return acc + `${index + 1}. ${cur?.description}\n`
  }, '')
}