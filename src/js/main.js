(function () {
  var x = document.createElement("P"); // Create a <p> node
  x.className = "benga"; //Dodavanje klase na element radi selekcuje u css-u

  var t = document.createTextNode("Ask a question.");
  var button = document.createElement("BUTTON"); // Create a text node
  button.className = "open";
  button.innerHTML = "ASK";

  x.appendChild(t);
  // Append the text to <p>
  x.appendChild(button);
  document.body.appendChild(x); // Append <p> to <body>

  $(".benga")
    .append(`<div class='popup-overlay'> <div class='popup-content'>
    <div class="chat-popup" id="myForm">
      <textarea placeholder="Type your question.." name="msg" required></textarea>
      <button class="sendbtn">Send</button>
      <button class="closebtn">Close</button>
  </div> 
   </div></div>`);

   
  $(".benga")
  .append(`
  <div class='odgovor'>
  <label for="msg"><b>Your answer</b></label>
  <br>
  <label>
    <input type="checkbox" name="sameadr"> For
  </label> <br>
  <label>
    <input type="checkbox" name="sameadr"> Against
  </label> <br>
    <label>
    <input type="checkbox" name="sameadr"> Abstain
  </label> <br>
  <input type="submit" value="Submit" class="answer">
  </div>
  `);

 





  $(".open").on("click", function () {
    $(".popup-overlay, .popup-content").addClass("active");
  });

  $(".sendbtn").on("click", function () {
    $(".odgovor").addClass("active");
  });

  $(".answer").on("click", function () {
    $(".odgovor").removeClass("active");
  });




  //removes the "active" class to .popup and .popup-content when the "Close" button is clicked
  $(".closebtn").on("click", function () {
    $(".popup-overlay, .popup-content").removeClass("active");
  });


})();
