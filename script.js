$(function(){
  // do not allow user to pick out text from page
  $.fn.disableSelection = function() {
    return this
              .attr('unselectable', 'on')
              .css('user-select', 'none')
              .on('selectstart', false);
  };
});

$(document).ready( function() {
	
  var numCards = _.range(30),
    cards   = [],
    images  = ["barselona.jpg", "bran.jpg", "chichen_itza.jpg", "christ.jpg", 
               "colizey.jpg", "elf_tower.jpg", "great_wall.jpg", "himedzi.jpg",
               "liberty.jpg", "mahal.jpg", "moai.jpg", "palace.jpg", "piramid.jpg",
               "sobor.jpg", "stonehandge.jpg"],
    matched = [],
    showing = [], // elements that show their real image now 
    attempts = 0; // number of trials

  $('body').disableSelection();
	
  init();
	
  function init() {
	images = images.concat(images); //double images
		
	_.each(numCards, function(i) {
	  // create 30 objects in 'cards' with properties img, id and class
  	  cards.push(new Card(i));
	});
		
	_.each(_.shuffle(images), function(img, i) {
	  cards[i].img = img; // mix images and set mixed values to 'img' properties
	});
		
    makeCards();
		
  }
	
  function Card(id) {
    this.img;
    this.id = id;
    this.class = 'card';
  }

  /*
  create 30 <img> elements in card_container <div>
  */	
  function makeCards() {
    _.each(cards, function(card) { 
  	  $('<img>', {
	    class: card.class,
	    src: 'images/back.jpg',
	    id: card.id
	  }).on('click', function() {
	  	    // turn out on click and add to showing array;
		    showing.push(cards[card.id]);
		    flipCard(this);
	    }).appendTo("#card_container");
    });
  }
  
  function flipCard(card) {
    // change src of picked up image to real one
    $('#' + card.id).attr('src', 'images/' + cards[card.id].img);
    // we no more need user to click on this image until the second image do not selected
    $(card).off('click');
		
    if (showing.length == 2) {
	  checkCards();
	}
  }
	
  function checkCards() {
    attempts++;
		
    if (showing[0].img == showing[1].img) {
	  _.each(showing, function(card) { 
	    matched.push(card);
	  });
    // if selected images are the same, show the information about picture from the description file
	  $('#wonder_photo').attr("src", 'images/' + showing[0].img);
	  $('#description h1').text(description[showing[0].img][0]);
	  $('#description p').text(description[showing[0].img][1]);
	  $('.modal').fadeIn(400);
	  showing = [];
    // if image pair is last one - show information and when show the results block		
      if (matched.length == images.length) {
        $('.close').off();
        $('.close').on("click", function () {
    	  $('#description').hide();
		  showResults();
		  });
	  }
	} else {
        // if images are not the same - turn them and set initial onclick function
	    setTimeout(function() {
		  _.each(showing, function(card) {
		    $('#' + card.id).on('click', function() {
			  showing.push(cards[card.id]);
			  flipCard(this);
			  }).attr('src', 'images/back.jpg')
		  });
		  showing = [];
	    }, 700);
    }
		
    updateStats();
		
    function showResults() {
	  var accurasy = Math.round((matched.length/2 ) / attempts * 100);
	  $('#end h2:nth-child(2)').text("Совпадений: " + matched.length/2);
	  $('#end h2:nth-child(3)').text("Попыток: " + attempts);
	  $('#end h2:nth-child(4)').text("Точность: " + accurasy + "%");
			
	  if (accurasy >= 50) {
	    $('#end h1').text("Отличный результат!");
	  } else {
		$('#end h1').text("Тебе нужно больше тренироваться!");
	  }
	  $('#try_again').text("Сыграть еще раз?");
	  $('#end').show();
	  $('.close').on("click", function () {
	    $('#end').fadeOut(400);
      });
    }
  }
	
  function updateStats() {
  	// change values on statistic block
    $('#attempts').text('Попыток: ' + attempts);
    $('#matches').text('Отгадано: ' + matched.length/2);
  }

  $('.close').on("click", function () {
    $('.modal').fadeOut(400); //close the div, when user push X
  });
	
});