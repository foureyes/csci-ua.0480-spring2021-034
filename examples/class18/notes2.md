1. review html / the dom api
2. look at properties a little more
3. continue modifying elements
4. basic css
5. final project stuff / homeworks / schedule
6. javascript timers


html document / page
=====

document = represents the entire page

* document.body
* document.head


DOM API
=====

some built in "classes"

* Node
* NodeList
* HTMLCollection
* HTMLElement
* DivElement

if we have an "instance" of Node
=====

* parentNode <--- gives back a node that's the parent
* childNodes <--- gives back NodeList
* nextSibling
* previousSibling
* nodeType .... 1 = ELEMENT_NODE 3 = TEXT_NODE, 8 = COMMENT_NODE
* nodeValue ... for text nodes, this is the text, for the others


other ways to select elements:
=====
document.getElementsByTagName <--- HTMLCollection
document.getElementsByClassName <--- HTMLCollection ... <a class='foo'>
document.getElementById <--- Node (HTMLElement) ... <a id='foo'>























