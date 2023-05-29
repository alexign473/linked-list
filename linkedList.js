class Node {
  constructor(value = null) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // adds a new node containing value to the end of the list
  append(value) {
    // Create a new node
    const node = new Node(value);

    // If there is no head or tail, make the new node head and tail
    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;

      return this;
    }

    // Attach a new node to the end of the linked list
    // Take the last node and specify that its next will be the new node
    this.tail.next = node;
    // Reassign tail to a new node
    this.tail = node;

    return this;
  }

  // adds a new node containing value to the start of the list
  prepend(value) {
    // Create a new node, which will be the new head
    const node = new Node(value);
    node.next = this.head;
    // Reassign head to a new node
    this.head = node;

    // If there is no tail yet, make a new tail node
    if (!this.tail) {
      this.tail = node;
    }

    return this;
  }

  // removes the last element from the list
  pop() {
    // If there is no tail, then the list is empty
    if (!this.tail) {
      return null;
    }

    // Store the value of the last node
    const deleted = this.tail;

    // If head and tail are equal, then there is only one node in the list
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deleted;
    }

    // If there are many nodes in the list.
    let current = this.head;

    // Iterate over all nodes and find the node before last
    while (current.next) {
      if (current.next === this.tail) {
        // remove the "next" link to the last node.
        current.next = null;
      } else {
        // Iterate one node forward
        current = current.next;
      }
    }

    // current is node before last, which becomes the last node
    this.tail = current;

    return deleted;
  }

  // removes the first element from the list
  shift() {
    if (!this.head) {
      return null;
    }

    const deleted = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deleted;
  }

  // returns the total number of nodes in the list
  size() {
    let count = 0;
    let current = this.head;

    while (current) {
      current = current.next;
      count++;
    }

    return count;
  }

  // returns the node at the given index
  at(index) {
    // corner cases
    if (index < 0 || index > this.size()) {
      return null;
    }

    let node = this.head;
    for (let i = 0; i < index; i++) {
      node = node.next;
    }

    return node;
  }

  // returns true if the passed in value is in the list and otherwise returns false
  contains(value) {
    let current = this.head;

    while (current) {
      if (current.value === value) {
        return true;
      }
      current = current.next;
    }

    return false;
  }

  // returns the index of the node containing value, or null if not found.
  find(value) {
    let current = this.head;
    let i = 0;

    while (current) {
      if (current.value === value) {
        return i;
      }
      current = current.next;
      i++;
    }

    return null;
  }

  toString() {
    let current = this.head;
    let str = '';

    while (current) {
      str += `(${current.value}) -> `;
      current = current.next;
    }

    str += 'null';

    return str;
  }

  // inserts a new node with the provided value at the given index
  insertAt(value, index) {
    if (index < 0 || index > this.size()) {
      return false;
    }

    if (index === 0) {
      this.prepend(value);
      return true;
    }

    const node = new Node(value);
    const prev = this.at(index - 1);
    const curr = prev.next;
    prev.next = node;
    node.next = curr;

    return true;
  }

  // removes the node at the given index
  removeAt(index) {
    if (index < 0 || index >= this.size()) {
      return false;
    }

    if (index === 0) {
      this.shift();
      return true;
    }

    const prev = this.at(index - 1);
    prev.next = prev.next.next;

    return true;
  }
}

const list = new LinkedList();

list.prepend(3).append(1).append(2).prepend(4);

console.log(list, list.size());
console.log(list.toString());
