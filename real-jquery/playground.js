/* hidden menu */
  $('.collapse').on('click', function(){
    if($('body').hasClass('hidden')){
      $('body').css('margin-left', 0).removeClass('hidden');
      $('.collapse').html("&#8656;");
    }
    else{
      $('body').css('margin-left', -455).addClass('hidden');
      $('.collapse').html("&#8658;");
    }
});

var newIndex = $('form[name = newTab] input[id = text]');
var newTitle = $('form[name = newTab] input[id = title]');
var newHtml = $('form[name = newTab] textarea[id = html]');
var addButton = $('form[name = newTab] button[id=add]');

$('.tabs li').on('click',function (){
  alert('mur');
 var toShow= $(this).attr('rel');
 alert(toShow);
 $('#'+toShow).removeClass('inactive');
 newTitle=$(this).unwrap();
 newHtml=$('#'+toShow).unwrap();
});


addButton.on('click', function (e){
		e.preventDefault();

		if(newIndex.val() == "" || parseInt(newIndex.val()) < 0 || newTitle.val() == "" || newHtml.val() == ""){
			alert('Some fields are empty');
			return;
		}

		$('form[name=newTab]').trigger('reset');

});
