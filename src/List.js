import invariant from 'invariant'
import createExtendable from './util/createExtendable'
import { List as ImmutableList } from 'immutable'

// NOTE: Copied constant from TrieUtils
const SHIFT = 5

// Copy all attributes from an Immutable.List to an Extendable.List
function copy(val, immutable) {
  val.size = immutable.size
  val._origin = immutable._origin
  val._capacity = immutable._capacity
  val._level = immutable._level
  val._root = immutable._root
  val._tail = immutable._tail
  val.__ownerID = immutable.__ownerID
  val.__hash = immutable.__hash
  val.__altered = immutable.__altered

  return val
}

function empty(val) {
  val.size = 0
  val._origin = 0
  val._capacity = 0
  val._level = SHIFT
  val._root = undefined
  val._tail = undefined
  val.__ownerID = undefined
  val.__hash = undefined
  val.__altered = false

  return val
}

function List(val) {
  return this.__wrapImmutable(new ImmutableList(val))
}

List.isList = function isList(obj) {
  return obj && obj instanceof List
}

// Inherit methods from Immutable.List
List.prototype = createExtendable(ImmutableList, copy, empty)
List.prototype.constructor = List

List.prototype.toString = function toString() {
  return this.__toString('Extendable.List [', ']')
}

export default List

