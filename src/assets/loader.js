var loader = document.querySelector('.loader');
var loaderBgContainer = loader.querySelector('.bg');
var progressContainer = loader.querySelector('.progress-container');
var progressBar = document.createElement("div");
progressBar.classList.add('progress-bar');
progressContainer.appendChild(progressBar);
var img = document.createElement('img');
img.src = "/assets/bb-bg.jpg";
loaderBgContainer.appendChild(img);

function calculateLoadPercentage(){
  var width = 100, // width of a progress bar in percentage
    perfData = window.performance.timing, // The PerformanceTiming interface
    EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart), // Calculated Estimated Time of Page Load which returns negative value.
    time = parseInt((EstimatedTime/1000)%60)*100; //Converting EstimatedTime from miliseconds to seconds.

  return time / width;
}
function showBgImg(){
  img.classList.add('loaded');
}
img.addEventListener('load', showBgImg);

function hideLoader(){
  loader.classList.add('loaded');
}

var checkProgess = function(){
  var perc = calculateLoadPercentage();
  progressBar.style.width = ( (perc != -1) ? perc : 100 ) +"%";

  if(perc == -1){
    window.clearInterval(progressInterval);
  }
}

var progressInterval = window.setInterval(function(){
  checkProgess();
},200);
window.addEventListener('DOMContentLoaded',function(){
  window.setTimeout(function(){
    hideLoader();
  },2000);
},false);
