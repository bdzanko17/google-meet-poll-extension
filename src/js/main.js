(function () {
  var googleMeetCall = 0;
  var questionActive;
  var room;

  var y = setInterval(() => {
    if (
      document.querySelector(
        "#ow3 > div.T4LgNb > div > div:nth-child(5) > div.crqnQb > div.rG0ybd.LCXT6 > div.f0WtFf > div.M5zXed > div > span > span > span"
      ) != null
    ) {
      googleMeetCall = 1;
      room = window.location.href;
      var x = 0;
      for (var i = 0; i < room.length; i++) {
        if (room.charAt(i) === "?") 
          break;
        
        x++;
      }
      console.log(x);

      if (room.includes("?")) {
        console.log("sadrzi");
        room = room.slice(0, x);
        console.log(room);
      }
    }
  }, 1000);

  //Prikaz samo kada je u call-u, provjera da li je u callu, ako jeste prikazi dugme :)
  var x = setInterval(() => {
    if (googleMeetCall) {
      clearInterval(y);

      //OTVARAM SOCKET ZA REAL TIME PROMJENE
      var socket = io.connect("http://localhost:3000/");
      socket.emit("join", room);

      var organizator = 0;
      socket.on("active_poll", (data) => {
        questionActive = data;
        //OSLUŠKIVANJE DA LI IMA AKTIVNE ANKETE, AKO DODJE PORUKA AKTIVNA ANKETA POJAVI SE ONO DA SE ODGOVARA
        $(".odgovor").addClass("active");
        $(".question").html("Question: " + data);
      });

      socket.on("organizator", () => {
        console.log("organizator");
        organizator = 1;
        alert("You are now organizatorr");
      });

      socket.on("results", (data) => {
        $("#question").text(questionActive);
        $("#ans1").text(data[1]);
        $("#ans2").text(data[2]);
        $("#ans3").text(data[3]);
        $(".rezultati").addClass("active");
      });

      var x = document.createElement("P"); // Create a <p> node
      x.className = "benga"; //Dodavanje klase na element radi selekcuje u css-u

      //var t = document.createTextNode("Ask a question!");
      var button = document.createElement("BUTTON"); // Create a text node
      button.className = "open";
      button.innerHTML = "ASK A QUESTION";
      //x.appendChild(t);
      // Append the text to <p>
      x.appendChild(button);
      document.body.appendChild(x); // Append <p> to <body>

      $(".benga")
        .append(`<div class='popup-overlay'> <div class='popup-content'>
        <div class="chat-popup" id="myForm">
          <textarea class="question" placeholder="Type your question.." name="msg" required></textarea>
          <textarea class="code" placeholder="Code" name="msg" required></textarea>
          <button class="sendbtn">Send Question</button>
          <button class="sendbtncode">Send Code</button>
          <button class="closebtn">Close</button>
      </div> 
       </div></div>`);

      $(".benga").append(`
      <div class='odgovor'>
    
      <div class="question"></div>
      <br>
      <input type="checkbox" class="answers" name="ans" id="checkbox-1" value="1" class="custom"  />
      <label for="checkbox-1">For</label>
        <br>
      <input type="checkbox"  class="answers" name="ans" id="checkbox-2" value="2" class="custom" />
      <label for="checkbox-2">Against</label>
      <br>
      <input type="checkbox"  class="answers" name="ans" id="checkbox-3" value="3" class="custom"  />
      <label for="checkbox-3">Abstain</label>
      <br>
      <button class="answer">Send</button>
    
      </div>
      `);

      $(".benga").append(`
      <div class='rezultati'>
      <h4>Question: <span id="question"></span> </h4>
      <table style="width:100%">
      <table>
      <tr>
        <th>Answer</th>
        <th>Votes</th>
      </tr>
      <tr>
        <td>For</td>
        <td><center><span id="ans1">0</span></center></td>
      </tr>
      <tr>
        <td>Against</td>
        <td><center><span id="ans2">0</span></center></td>
      </tr>
      <tr>
      <td>Abstain</td>
      <td><center><span id="ans3">0</span></center></td>
    </tr>
    </table>  
    <br>
    <button id="CloseRes">Close</button>

    </div>

      `);

      $(".answers").on("change", function () {
        $(".answers").not(this).prop("checked", false);
      });

      $(".open").on("click", function () {
        $(".popup-overlay, .popup-content").addClass("active");
      });

      //removes the "active" class to .popup and .popup-content when the "Close" button is clicked
      $(".closebtn").on("click", function () {
        $(".popup-overlay, .popup-content").removeClass("active");
      });

      //SLANJE POLL-a
      $(".sendbtn").on("click", function () {
        var data = $(".question").val(); //UZIMANJE PITANJA IZ TEXTBOXA I SLANJE SERVERU DA IMA AKTIVNA ANKETA, NAKON TOGA SERVER ODGOVARA SVIMA DA IMA AKTIVNA ANKETA
        var code = $(".code").val();

        if (organizator) socket.emit("vote", { room, data, code });
        else alert("You are not an organizer");
        $(".popup-overlay, .popup-content").removeClass("active");
      });

      $(".sendbtncode").on("click", function () {
        var codee = $(".code").val();
        socket.emit("code", codee);
      });

      //SLANJE ODGOVORA
      $(".answer").on("click", function () {
        $('input[name="ans"]:checked').each(function () {
          var answer = this.value;
          socket.emit("votes", { answer, room }); //SLANJE ODGOVORA NA SERVER, SVAKO MOZE SAMO JEDNOM POSLAT ODGOVOR
        });
        $(".odgovor").removeClass("active"); //SKRIVANJE ODGOVORA
      });

      $("#CloseRes").on("click", function () {
        $(".rezultati").removeClass("active");
      });
    }
  }, 1000);

  setInterval(() => {
    if (googleMeetCall) {
      clearInterval(x);
    }
  }, 1000);
})();
