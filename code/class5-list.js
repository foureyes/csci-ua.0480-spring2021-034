function prepend(list, element) {
  console.log("prepending stuff here");
  console.log("called from prepend");
  console.log(this);
}

console.log("called from class 5 list");
prepend();
exports.prepend = prepend;
