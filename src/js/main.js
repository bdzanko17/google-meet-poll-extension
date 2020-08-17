(function () {

  var googleMeetCall=0;

  var y =setInterval(() => {
    if(document.querySelector('#ow3 > div.T4LgNb > div > div:nth-child(4) > div.crqnQb > div.pHsCke > div.Jrb8ue > div')!=null)
    googleMeetCall=1;
  }, 1000);


  //Prikaz samo kada je u call-u, provjera da li je u callu, ako jeste prikazi dugme :) 
  var x =setInterval(() => {

    if(googleMeetCall){
      clearInterval(y)
 
      //OTVARAM SOCKET ZA REAL TIME PROMJENE
      var socket = io.connect("http://localhost:3000");
      var organizator=0;
      socket.on("active_poll", (data) => {
        //OSLUŠKIVANJE DA LI IMA AKTIVNE ANKETE, AKO DODJE PORUKA AKTIVNA ANKETA POJAVI SE ONO DA SE ODGOVARA
        $(".odgovor").addClass("active");
        $(".question").html("Question: " + data);
      });
    
      socket.on("results", (data) => {
        console.log(data);
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
    
    
    
    
    
    
      $(".benga").append(`<div class='popup-overlay'> <div class='popup-content'>
        <div class="chat-popup" id="myForm">
          <textarea class="question" placeholder="Type your question.." name="msg" required></textarea>
          <button class="sendbtn">Send</button>
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
      <button class="answer">Send</button>
    
      </div>
      `);
    
      $(".answers").on("change", function () {
        $(".answers").not(this).prop("checked", false);
      });
    
      $(".open").on("click", function () {
        $(
          "#ow3 > div.T4LgNb > div > div:nth-child(4) > div.crqnQb > div.pHsCke > div.Jrb8ue > div > div.NzPR9b > div.uArJ5e.UQuaGc.kCyAyd.kW31ib.foXzLb.IeuGXd > div.e19J0b.CeoRYc"
        ).click();
        //console.log($("#ow3 > div.T4LgNb > div > div:nth-child(4) > div.crqnQb > div.mKBhCf.qwU8Me.RlceJe.kjZr4 > div > div.Bx7THd.PBWx0c.Uy7Qke.XN1AMe > div.ZHdB2e.iy732 > div.fe4pJf.Pdo15c > span.HALYaf.tmIkuc.s2gQvd.KKjvXb > div.TnISae.CnDs7d.hPqowe.crOkHf.B9WI2"));
    
        setTimeout(() => {
          $(
            "#ow3 > div.T4LgNb > div > div:nth-child(4) > div.crqnQb > div.mKBhCf.qwU8Me.RlceJe.kjZr4 > div > div.Bx7THd.PBWx0c.Uy7Qke.XN1AMe > div.ZHdB2e.iy732 > div.fe4pJf.Pdo15c > span.HALYaf.tmIkuc.s2gQvd.KKjvXb > div.TnISae.CnDs7d.hPqowe.crOkHf > div:nth-child(2) > div > div > div.cSO8I.N4cbF > div.KvRaG.BvT0le > div > div.Fvio9d.MbhUzd"
          ).click();
        }, 300);
        
        setTimeout(() => {
          if(        document.querySelector(
            "#ow3 > div.T4LgNb > div > div:nth-child(4) > div.crqnQb > div.mKBhCf.qwU8Me.RlceJe.kjZr4 > div > div.Bx7THd.PBWx0c.Uy7Qke.XN1AMe > div.ZHdB2e.iy732 > div.fe4pJf.Pdo15c > span.HALYaf.tmIkuc.s2gQvd.KKjvXb > div.TnISae.CnDs7d.hPqowe.crOkHf.B9WI2 > div:nth-child(2) > div > div.fSW6Ze.r14hdb > div:nth-child(3) > div"
          )!=null){
           if( document.querySelector(
            "#ow3 > div.T4LgNb > div > div:nth-child(4) > div.crqnQb > div.mKBhCf.qwU8Me.RlceJe.kjZr4 > div > div.Bx7THd.PBWx0c.Uy7Qke.XN1AMe > div.ZHdB2e.iy732 > div.fe4pJf.Pdo15c > span.HALYaf.tmIkuc.s2gQvd.KKjvXb > div.TnISae.CnDs7d.hPqowe.crOkHf.B9WI2 > div:nth-child(2) > div > div.fSW6Ze.r14hdb > div:nth-child(3) > div").getAttribute("aria-label").includes("Ukloni"))
            organizator=1;
          }
          
        }, 800);
        $(".popup-overlay, .popup-content").addClass("active");
      });
    
      //removes the "active" class to .popup and .popup-content when the "Close" button is clicked
      $(".closebtn").on("click", function () {
        $(".popup-overlay, .popup-content").removeClass("active");
      });
    
      //SLANJE POLL-a
      $(".sendbtn").on("click", function () {
        var question = $(".question").val(); //UZIMANJE PITANJA IZ TEXTBOXA I SLANJE SERVERU DA IMA AKTIVNA ANKETA, NAKON TOGA SERVER ODGOVARA SVIMA DA IMA AKTIVNA ANKETA
        if(organizator)
        socket.emit("vote", question);
        else alert("YOU ARE NOT A ORGANIZATOR");
        $(".popup-overlay, .popup-content").removeClass("active");
    
      });
    
      //SLANJE ODGOVORA
      $(".answer").on("click", function () {
        $('input[name="ans"]:checked').each(function () {
          socket.emit("votes", this.value); //SLANJE ODGOVORA NA SERVER, SVAKO MOZE SAMO JEDNOM POSLAT ODGOVOR
        });
        $(".odgovor").removeClass("active"); //SKRIVANJE ODGOVORA
      });

    }
    
  }, 1000);

  setInterval(() => {
    if(googleMeetCall){
      clearInterval(x);
    }
  }, 1000);
  
 
})();
