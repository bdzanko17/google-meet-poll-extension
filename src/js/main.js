(function () {
  var x = document.createElement("P"); // Create a <p> node
  x.className = "benga"; //Dodavanje klase na element radi selekcuje u css-u

  var t = document.createTextNode("This is a paragraph.");
  var button = document.createElement("BUTTON"); // Create a text node
  button.className="open"
  button.innerHTML = "CLICK ME";


  x.appendChild(t);
  // Append the text to <p>
  x.appendChild(button);
  document.body.appendChild(x); // Append <p> to <body>
  
  $(".benga").append( "<div class='popup-overlay'> <div class='popup-content'><h2>Pop-Up</h2><p> This is an example pop-up that you can make using jQuery.</p><button class='close'>Close</button>    </div></div>" );

   
  $(".open").on("click", function() {
    $(".popup-overlay, .popup-content").addClass("active");
  });
  
  //removes the "active" class to .popup and .popup-content when the "Close" button is clicked 
  $(".close, .popup-overlay").on("click", function() {
    $(".popup-overlay, .popup-content").removeClass("active");
  });

})();
