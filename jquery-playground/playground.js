/* getting image in buf */
$(function() {
  $(":file").change(function() {
    if (this.files && this.files[0]) {
      var reader = new FileReader();
      reader.onload = imageIsLoaded;
      reader.readAsDataURL(this.files[0]);
    }
  });
});

/*getting img src */
function imageIsLoaded(e) {
  $('#myImg').attr("src",e.target.result);
}

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

/* form variabbles */
var newIndex = $('form[name = newTab] input[id = text]');
var newTitle = $('form[name = newTab] input[id = title]');
var newHtml = $('form[name = newTab] textarea[id = html]');
var newDate = $('form[name = newTab] input[id = datepicker]');
var addButton = $('form[name = newTab] button[id=add]');
var editButton = $('form[name = newTab] button[id=edit]');
var resetButton = $('form[name = newTab] button[id=res]');

/*seting current date to a Data placeholder */
var today = new Date();
var todayString = (today.getMonth() +1) + "\/" + (today.getDate()) + "\/" + (today.getYear() + 1900);
today = new Date(todayString);
newDate.attr('placeholder', todayString);

/* setting date */
function setDate(n){
  var tmp="";
	if (n==""){
    tmp='<span>Actual due date: No information</span>';
  }
  else{
    tmp='<span >Actual due date: '+n.toString()+'</span>';
  }
	$('.date').append(tmp);
  $('.date').removeClass('inactive');
}

/*setting id for all tabs and containers */
function setID(){
  $(".tabs li").each(function(n) {
    $(this).attr("tab-id", n);
  });
  $(".hidden-container div").each(function(n) {
      $(this).attr("data-id", n);
  });
  $(".img-container div").each(function(n) {
      $(this).attr("data-id", n);
  });
};

/* switching tabs */
$('.tabs').on('click', '.tab' ,function (){
  $('.tabs li').each(function(){
    $(this).addClass('hidden-tab').removeClass('current-tab');
  })
  var index=$(this).attr('tab-id');
  $(this).addClass('current-tab').removeClass('hidden-tab');
  var tmp;
  var tmpImg;
  $('.hidden-container div').each(function(){
    if ($(this).hasClass('active')){
      $(this).removeClass('active').addClass('inactive');
    }
    if($(this).attr('data-id')==index){
      tmp=$(this).html();
      $(this).removeClass('inactive').addClass('active');}
  });
  $('.img-container div').each(function(){
    if ($(this).hasClass('active')){
      $(this).removeClass('active').addClass('inactive');
    }
    if($(this).attr('data-id')==index){
      $(this).removeClass('inactive').addClass('active');}
  });

  /* setting tab values in form and setting date*/
  newIndex.val(index);
  newTitle.val($(this).text());
  newHtml.val(tmp);
  newDate.val($(this).attr('tab-date'));

  $(".date ").empty();
  setDate($(this).attr('tab-date'));

  }
);

/*switching tabs with arrows */
$('.left').on('click', function() {
  var index;
  var data;
  $('.img-container div').each(function() {
    if ($(this).hasClass('active')) {
      index = $(this).attr('data-id')
    }
  });
  if (index == 0) {
    alert('This is first tab!');
    return;
  }
  var next = index - 1;
  var title;
  $('.tabs li').each(function() {
      $(this).addClass('hidden-tab').removeClass('current-tab');
      if ($(this).attr('tab-id') == next) {
        title = $(this).text();
        data=$(this).attr('tab-date');
      $(this).addClass('current-tab').removeClass('hidden-tab');
    }
  });
  var tmp;
  $('.hidden-container div').each(function() {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active').addClass('inactive');
    }
    if ($(this).attr('data-id') == next) {
      tmp = $(this).html();
      $(this).removeClass('inactive').addClass('active');
    }
  });

  $('.img-container div').each(function() {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active').addClass('inactive');
    }
    if ($(this).attr('data-id') == next) {
      $(this).removeClass('inactive').addClass('active');
    }
  });
  /* setting tab values in form */
  newIndex.val(next);
  newTitle.val(title);
  newHtml.val(tmp);
  newDate.val(data);

  $(".date").empty();
  setDate(data);
});

$('.right').on('click', function() {
  var index;
  var length = $('.tabs li').length - 1;
  $('.img-container div').each(function() {
    if ($(this).hasClass('active')) {
      index = $(this).attr('data-id');
    }
  });
  if (index == length) {
    alert('This is last tab!');
    return;
  }
  var next = ++index;
  var title;

  $('.tabs li').each(function() {
    $(this).addClass('hidden-tab').removeClass('current-tab');
    if ($(this).attr('tab-id') == next) {
      title = $(this).text();
      data=$(this).attr('tab-date');
      $(this).addClass('current-tab').removeClass('hidden-tab');
    }
  });
  var tmp;
  $('.hidden-container div').each(function() {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active').addClass('inactive');
    }
    if ($(this).attr('data-id') == next) {
      tmp = $(this).html();
      $(this).removeClass('inactive').addClass('active');
    }
  });

  $('.img-container div').each(function() {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active').addClass('inactive');
    }
    if ($(this).attr('data-id') == next) {
      $(this).removeClass('inactive').addClass('active');
    }
  });
  /* setting tab values in form */
  newIndex.val(next);
  newTitle.val(title);
  newHtml.val(tmp);
  newDate.val(data);

  $(".date").empty();
  setDate(data);
});

/* adding tab with containers */
function toContainer(index,tab,elem,im){
  if(index === 0) {
    $('.tabs').prepend(tab);
    $('.hidden-container').prepend(elem);
    $('.img-container').prepend(im);
    }
  else if(index < $('.tabs li').length){
      $(".tabs > li:nth-child(" + (index) + ")").after(tab);
      $(".hidden-container > div:nth-child(" + (index) + ")").after(elem);
      $(".img-container > div:nth-child(" + (index) + ")").after(im);
    }
  else if(index >= $('.tabs li').length){
      $('.tabs').append(tab);
      $('.hidden-container').append(elem);
      $('.img-container').append(im);
    }
}

/* add button */
addButton.on('click', function (e){
  e.preventDefault();

  /* checking fields */
  if(newIndex.val() == "" || parseInt(newIndex.val()) < 0 || newTitle.val() == "" || newHtml.val() == ""  ){
    alert('Some fields are empty');
    return;
  }

  /* checking date */
  if(today > new Date(newDate.val())){
    alert('Invalid date!');
    return;
  }

  /* default data */
  if (newDate.val() == ""){
    newDate.val(todayString);
  }

  /*getting all variables from form*/
  var im='<div class="tab-image inactive" ><img src="'+$('#myImg').attr("src")+'"> </div>';
  if ($('#myImg').attr("src")=="" || $('#myImg').attr("src")==undefined){
    alert("Check image!");
    return;
  }
  var index = parseInt(newIndex.val());
  var tab = $('<li class = "tab">' + newTitle.val() + '</li>');
  var wrapper = $('<div class = "container inactive">' + newHtml.val() + '</div>');

  /* extra task: checking space for our tab */
  var containerLength=$('.hidden-container').outerWidth();
  var tabLength=$('.tab').outerWidth();
  var count=$('.tabs li').length;
  var space=containerLength-count*tabLength-5;
  if(space < tabLength){
    alert('No space to add tab!');
    return;
  }

  /* adding tab if there are enough space */
  toContainer(index,tab,wrapper,im);
  setID();

  /*setting date */
  $('.tabs li').each(function() {
    if ($(this).attr('tab-id') == index) {
      $(this).attr('tab-date',newDate.val());
    }
  });

  /*clearing form*/
  $('form[name=newTab]').trigger( 'reset');
  $('#myImg').attr("src","");
  $('.date').addClass('inactive');
});

/* edit button */
editButton.on('click', function (e){
  e.preventDefault();
  /* checking fields */
  if(newIndex.val() == "" || parseInt(newIndex.val()) < 0 || newTitle.val() == "" || newHtml.val() == ""){
    alert('Some fields are empty');
    return;
  }

  /* default data */
  if ( newDate.val() == ""){
    newDate.val(todayString);
  }

  /* checking date */
  if(today > new Date(newDate.val())){
    alert('Invalid date!');
    return;
  }
  /*getting all variables from form*/
  var index = parseInt(newIndex.val());
  var tab = $('<li class = "tab">' + newTitle.val() + '</li>');
  var wrapper = $('<div class = "container inactive">' + newHtml.val() + '</div>').data('date', newDate.val());
  var buf="";
  var im;

  /*saving last image or uploading new */
  $('.img-container div').each(function() {
    if ($(this).hasClass('active')) {
      buf=$(this).html();
    if ($('#myImg').attr("src")=="" || $('#myImg').attr("src")==undefined)
    {
      im='<div class="tab-image inactive" >'+buf+'</div>';
    }
    else {
      im='<div class="tab-image inactive" ><img src="'+$('#myImg').attr("src")+'"> </div>';
    }
  }
  });

  /*deleting tab*/
  $('.active').remove();
  $('.current-tab').remove();
  /*changing ID*/
  setID();
  /*adding changed tab*/
  toContainer(index,tab,wrapper,im);
  setID();
  $('.tabs li').each(function() {
    if ($(this).attr('tab-id') == index) {
      $(this).attr('tab-date',newDate.val());
    }
  });
  /*clearing form*/
  $('form[name=newTab]').trigger( 'reset');
  $('#myImg').attr("src","");
  $('.date').addClass('inactive');
});

/* reset button */
resetButton.on('click', function (e){
  e.preventDefault();
  /*clearing form*/
  $('form[name=newTab]').trigger('reset');

});
