export const getTreeIndexesFromIds = (tree, parentIds, depth = 0) => {
  if (tree.length == 0 || parentIds == undefined)
    return ''

  let idList = parentIds.split(',')

  for (let i = 0; i < tree.length; i++) {
    let v = tree[i]
    if (depth >= idList.length) {
      return ''
    }

    if (v.id == idList[depth]) {
      if (v.children && v.children.length > 0) {
        depth++
        let c_idx = getTreeIndexesFromIds(v.children, parentIds, depth)
        return `${i}-${c_idx}`
      }
      else {
        return `${i}`
      }
    }
  }

  return ''
}

export const getSpreadListFromTreeIndexes = (treeData, indexes, depth) => {
  const indexList = indexes.split('-')
  if (depth > indexList.length - 1)
    return []

  const item = treeData[indexList[depth]]
  const { children, ...data } = item
  let list = getSpreadListFromTreeIndexes(children, indexes, ++depth)

  return [ data, ...list ]
}

export const getTreeIndexesFromId = (tree, primaryKey, findId) => {

  for (let i = 0;  i < tree.length; i++) {
    const one = tree[i]
    if (one[primaryKey] == findId)
      return `${i}`

    if (one.children && one.children.length > 0) {
      let res = getTreeIndexesFromId(one.children, primaryKey, findId)
      if (res.length > 0) {
        res = `${i}-` + res
        return res
      }
    }
  }

  return ''
}