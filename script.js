

// LANDINGPAGE
//SLIDER

  $(document).ready(function() {
    $("#lightSlider").lightSlider();
  });

  $(document).ready(function() { var slider =
 $("#content-slider").lightSlider({
           keyPress:true,
           speed: 1000,
           auto: true,
           loop: true,
           thumbItem: 6,
           pause: 5000,
           item: 3,
           centerSlide:true,
           enableDrag:true,

       });
});

//Forside

$(document).ready(function() {
  var myDate = new Date(); /*Overkskrift til forsiden*/
  var hrs = myDate.getHours();

  var greet;

  if (hrs < 12)
    greet = 'God morgen <br> og velkommen til biblioteket';
  else if (hrs >= 12 && hrs <= 17)
    greet = 'God eftermiddag <br> og velkommen til biblioteket';
  else if (hrs >= 17 && hrs <= 24)
    greet = 'God aften <br> og velkommen til biblioteket';

  document.getElementById('lblGreetings').innerHTML =
    '<b>' + greet + '</b>';
});


/* slut Overkskrift til forsiden*/

//menu START

$(window).scroll(function() {
   if ($(this).scrollTop() > 100){
      $('#nav1').attr("id", "flyt1");
   }
});

$(window).scroll(function() {
   if ($(this).scrollTop() > 100){
      $('#nav2').attr("id", "flyt2");
   }
});

$(window).scroll(function() {
   if ($(this).scrollTop() > 100){
      $('#nav3').attr("id", "flyt3");
   }
});

$(window).scroll(function() {
   if ($(this).scrollTop() > 100){
      $('#nav4').attr("id", "flyt4");
   }
});

$(window).scroll(function() {
   if ($(this).scrollTop() > 100){
      $('#nav5').attr("id", "flyt5");
   }
});

$(window).scroll(function() {
   if ($(this).scrollTop() > 100){
      $('#nav6').attr("id", "flyt6");
   }
});

$(window).scroll(function() {
   if ($(this).scrollTop() > 100){
      $('#nav7').attr("id", "flyt7");
   }
});


//menu SLUT

//Søgebar

$(window).scroll(function() {
   if ($(this).scrollTop() > 250){
      $('.soge').addClass("fixed");
   } else {
      $('.soge').removeClass("fixed");
   }
});

$(window).scroll(function() {
   if ($(this).scrollTop() > 250){
      $('.soge2').addClass("fixed2");
   } else {
      $('.soge2').removeClass("fixed2");
   }
});




//DIALOGBOX
function popOp(e) {
// $("#dialog").innerHTML = "<h3>Sucess!</h3><p>Du har reserveret</p>" + document.getElementById(e.id).value;
document.getElementById("dialog").innerHTML ='<h3>Sucess!</h3><p>Du har reserveret:</p><p>'+document.getElementById(e.id).value+'</p><p>Du kan hente den mandag d. 15. oktober i receptionen</p>';
document.getElementById("dialog").classList.add("show");
} //popOp slut


//SØGESIDE FUNKTIONER
/**
 * file: xml-seek-word.html
 * formål: henter data om bøger fra EAAA Bibliotekets API
 **/

$(document).ready(function() {

  // get user input
  $("#myTextBox").on("change paste keyup", function() {

    // query:
    wrd = 'https://eaaa.reindex.net/EAAA/main/Api.php?Focus=rsshitlist&qe='
    wrd += encodeURIComponent($(this).val()) // uri encoder søgestrengen
    wrd += '&pagesize=500&page=1&format=rss';


    //let link = $('#test'); // viser uri til APIen som link i browseren
    //link.html('<a href="' + wrd + '">' + wrd + '</a>');

    $('#test').show();

  });




  $('#submit').click(function() {

    // "renser" #indhold ...
    $('#indhold').html('');

      $(".fokus" ).addClass( "show" );

    //$('#test').hide();

    // henter data via AJAX
    $.ajax({
      type: "GET",
      url: wrd,
      cache: false,
      dataType: "xml",
      success: function(xml) {

        //console.log(xml); // viser XML-strukturen i console-inspect-tool

        $(xml).find('item').each(function() { // ved hver <item> gøres følgende ...

          // vælger data med .find() og gemmer dem i variabler
          let titel = $(this).find('title').text();
          let forfatter = $(this).find('author').text();
          let beskrivelse = $(this).find('description').text();
          let billede = $(this).find('enclosure').attr("url"); // src til billedet
          let permalink = $(this).find('link').text();
          let pubdate = $(this).find('pubDate').text();

          // er der et billede? J/N?
          function visBillede(img){
            if (img !== undefined){ // hvis img ikke er undefined
              return '<img class="center" src="' + img + '" alt="billede af bogen">';
            }
            if (img == undefined){ // hvis billede er undefined
              return '<!-- billede af forsiden mangler -->';
            }
          }


          // tilføjer (append) markup til #indhold
          $('#indhold').append('<div class="bog">' + // .bog en bogkasse begynder
            '<a href="' + permalink + '" target="_blank">'+ visBillede( billede ) + '</a>' + // billede (måske)
            '<div class="tit"><h3><i class="fas fa-book"></i> ' + titel + '</h3></div>' + // titel
            '<div class="forfat"><h4><i class="fas fa-user-circle"></i> By: ' + forfatter + '</h4></div>' + // forfatter
            // visBillede( billede ) + // skriver kun billedtag, hvis der er et billede
            '<div class="beskriv"><p>' + beskrivelse + '</p></div>' +
            '<div class="knap mere"><button id="'+ forfatter +'" class="ora" onclick="popOp(this)" value="' + titel + '">Bestil</button> </div>' +
            '<div class="knap reserver"><button id="blaa" onclick="myFunction()">Læs mere</button> </div>' + '<div class="fyld"></div>' + // beskrivelse
            '</div>' // bogkasse slut
          );
        })
      }
    }); // ajax slut
  }); // #submit klik slut

  $('#myTextBox').keypress(function(e){
      if(e.which == 13){//Enter key pressed
        // "renser" #indhold ...
        $('#indhold').html('');

        $(".fokus" ).addClass( "show" );
        //$('#test').hide();


        // henter data via AJAX
        $.ajax({
          type: "GET",
          url: wrd,
          cache: false,
          dataType: "xml",
          success: function(xml) {

            //console.log(xml); // viser XML-strukturen i console-inspect-tool

            $(xml).find('item').each(function() { // ved hver <item> gøres følgende ...

              // vælger data med .find() og gemmer dem i variabler
              let titel = $(this).find('title').text();
              let forfatter = $(this).find('author').text();
              let beskrivelse = $(this).find('description').text();
              let billede = $(this).find('enclosure').attr("url"); // src til billedet
              let permalink = $(this).find('link').text();
              let pubdate = $(this).find('pubDate').text();

              // er der et billede? J/N?
              function visBillede(img){
                if (img !== undefined){ // hvis img ikke er undefined
                  return '<img class="center" src="' + img + '" alt="billede af bogen">';
                }
                if (img == undefined){ // hvis billede er undefined
                  return '<!-- billede af forsiden mangler -->';
                }
              }

              // tilføjer (append) markup til #indhold
              $('#indhold').append('<div class="bog">' + // .bog en bogkasse begynder
                '<a href="' + permalink + '" target="_blank">'+ visBillede( billede ) + '</a>' + // billede (måske)
                '<div class="tit"><h3><i class="fas fa-book"></i> ' + titel + '</h3></div>' + // titel
                '<div class="forfat"><h4><i class="fas fa-user-circle"></i> By: ' + forfatter + '</h4></div>' + // forfatter
                // visBillede( billede ) + // skriver kun billedtag, hvis der er et billede
                '<div class="beskriv"><p>' + beskrivelse + '</p></div>' +
                '<div class="knap mere"><button id="'+ forfatter +'" class="ora" onclick="popOp(this)" value="' + titel + '">Bestil</button> </div>' +
                '<div class="knap reserver"><button id="blaa" onclick="myFunction()">Læs mere</button> </div>' + '<div class="fyld"></div>' + // beskrivelse
                '</div>' // bogkasse slut
              );
            })
          }
        }); // ajax slut

      }
  });


}); // document ready slut
