



1. modifying elements
2. layout 
3. timers
4. remaining milestones
5. midterm grades, milestone for wed


the object that gives you access to the html page:

document

attributes:

* document.body
* document.head

Nodes
====

* there are a bunch node elements in the tree rep of dom
* childNodes <--- NodeList ( _Array_ like, no slice push, etc.)
* parentNode
* nextSibling
* previousSibling
* nodeType: ELEMENT_NODE, TEXT_NODE, COMMENT_NODE
* nodeValue: this is only relevant for TEXT_NODE... allows reading and writing
* ⚠️ warning: white space (even new lines) count as a text node

^^^^ this is a bit verbose and clumsy for locating elements

* class and id
* document.getElementsByTagName <-- HTMLCollection (Array like... no slice, push, etc.)
* document.getElementsByClassName
* document.getElementById































