/**
 * 实现LUR缓存算法，淘汰最久没被使用的数据；核心是hash链表
 * 1. 利用map保存链表中的节点数据，映射关系为key -> node，这样就可以利用map找到node，node可以拿到val返回
 * 2. 链表维护节点的先后顺序，每个节点的信息包括key，val，并用双向链表，方便删除，其中初始化默认的头尾节点，分别是head，tail
 * 3. 取值操作通过key从哈希map中找到node，返回该node,并且需要更新节点位置，通过从链表中删除该node节点，接着再添加到队尾；
 * 4. 添加操作，先判断是否有历史值，如果有的话，返回历史值，并提高历史值到队尾；没有历史值则判断链表长度是否溢出，有溢出则溢出头节点
 * 
 * 扩展：
 * LFU -> 每次淘汰哪些使用次数最少的数据，难度>LUR；
 * 在LFU的实现中，要按照数据访问频次进行排序，如果拥有相同访问频次的数据，优先删除最早插入的那份数据
 * 
 * @param {number} capacity
 */

class Node {
    constructor(k, v) {
        this.key = k
        this.val = v
        this.next = null
        this.prev = null
    }
}

// 构建双向链表
class DoubleList {
    constructor() {
        this.head = new Node(0, 0)
        this.tail = new Node(0, 0)
        // head <-> tail
        this.head.next = this.tail
        this.tail.prev = this.head
        this.size = 0
    }
    /** 向链表尾部追加节点,所以靠尾部的数据是最近使用的，靠头部的数据是最久未使用的 */
    addLast(n) {
        // head <-> ... <-> n <-> tail
        n.prev = this.tail.prev
        n.next = this.tail
        this.tail.prev.next = n
        this.tail.prev = n
        this.size++
    }
    /** 删除链表的节点 */
    delNode(n) {
        n.prev.next = n.next
        n.next.prev = n.prev
        this.size--
    }
    /** 删除头节点,并返回该节点 */
    delHead() {
        if (this.head.next === this.tail) return
        let first = this.head.next
        this.delNode(first)
        return first
    }
    size() {
        return this.size
    }
}

var LRUCache = function (capacity) {
    /** 内部需要同时维护一个双链表和哈希表map */
    this.maxSize = capacity
    this.cacheMap = new Map()
    this.cache = new DoubleList()
}

/** 添加最近使用的key */
LRUCache.prototype.addRecently = function (key, val) {
    const node = new Node(key, val)
    this.cache.addLast(node)
    this.cacheMap.set(key, node)
}

/** 将某个key提升为最近使用的 */
LRUCache.prototype.makeRecently = function (key) {
    const node = this.cacheMap.get(key)
    this.cache.delNode(node)
    this.cache.addLast(node)
}

/** 删除某个Key */
LRUCache.prototype.deleteKey = function (key) {
    const node = this.cacheMap.get(key)
    this.cache.delNode(node)
    this.cacheMap.delete(key)
}

/** 删除最久未使用的元素-即删除head */
LRUCache.prototype.delteRecently = function () {
    const deleteNode = this.cache.delHead()
    let key = deleteNode.key
    this.cacheMap.delete(key)
}

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    if (!this.cacheMap.has(key)) return -1
    this.makeRecently(key)
    // 从链表里面取val
    return this.cacheMap.get(key).val
}

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    if (this.cacheMap.has(key)) {
        this.deleteKey(key)
        this.addRecently(key, value)
        return
    }
    if (this.maxSize === this.cache.size) {
        // 溢出
        this.delteRecently()
    }
    this.addRecently(key, value)
}

const lRUCache = new LRUCache(2)
lRUCache.put(1, 1) // 缓存是 {1=1}
lRUCache.put(2, 2) // 缓存是 {1=1, 2=2}
let val = lRUCache.get(1) // 返回 1
lRUCache.put(3, 3) // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.get(2) // 返回 -1 (未找到)
lRUCache.put(4, 4) // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
lRUCache.get(1) // 返回 -1 (未找到)
let val2 = lRUCache.get(3) // 返回 3
console.log(lRUCache.cache, '---', val2)
// lRUCache.get(4) // 返回 4
