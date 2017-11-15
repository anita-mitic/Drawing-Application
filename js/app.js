//Problem: User interaction causes no change
//Solution: When user interacts cause changes appropriately

var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var lastEvent;
var mousedown = false;
var context = $canvas[0].getContext("2d");
//  document.getElementsByTagName("canvas")[0] = $"canvas")[0];

//1. When clicking on control list items
$(".controls").on("click", "li", function() {
  //1.1 Deselect sibling elements
  $(this).siblings().removeClass("selected");
  //1.2 Select clicked element
  $(this).addClass("selected");
  //1.3 Cache current color here
  color = $(this).css("background-color");
  });

//2. When 'new color' is pressed
$("#revealColorSelect").click(function() {
  //2.1 Show or hide the color select
  changeColor();
  $("#colorSelect").toggle();
 }); 
 
//3.1 Update the new color span
function changeColor() {
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  $("#newColor").css("background-color", "rgb("+ r +","+ g +","+ b +")" );
}

//3. When color sliders change
$("input[type=range]").on("input", changeColor);

//4. When 'add color' is pressed
$("#addNewColor").click(function() {
  //4.1 Append the color to the controls ul
  var $newColor = $("<li></li>");
  $newColor.css("background-color", $("#newColor").css("background-color"));
  $(".controls ul").append($newColor);
  //4.2 Select the new color
  $newColor.click();
  
 });

//5. On mouse events on the canvas
$canvas.mousedown(function(e) {
  lastEvent = e;
  mousedown = true;
}).mousemove(function(e) {
  //5.1 Draw lines
  if(mousedown) {
    context.beginPath();
    context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
    context.lineTo(e.offsetX, e.offsetY);
  //  context.lineTo(20, 20);
  //  context.lineTo(10, 20);
  //  context.closePath();
    context.strokeStyle = color;
    context.stroke();
    lastEvent = e;
  }
}).mouseup(function(){
  mousedown = false;
}).mouseleave(function() {
  $canvas.mouseup();
});

  










  