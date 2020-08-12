(function () {
  var x = document.createElement("P"); // Create a <p> node
  x.className = "benga"; //Dodavanje klase na element radi selekcuje u css-u

  var t = document.createTextNode("This is a paragraph.");
  var button = document.createElement("BUTTON"); // Create a text node

  button.innerHTML = "CLICK ME";

  button.addEventListener("click", () => {
    button.style.display = "none";
  });
  
  x.appendChild(t);
  // Append the text to <p>
  x.appendChild(button);
  document.body.appendChild(x); // Append <p> to <body>
})();
