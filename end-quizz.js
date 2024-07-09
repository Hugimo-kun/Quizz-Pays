document.addEventListener("DOMContentLoaded", function () {
  const SCORE_FINISHED_PARAGRAPH = document.getElementById("scoreFinished");
  let finishedScore = localStorage.getItem("score");
  SCORE_FINISHED_PARAGRAPH.innerText = finishedScore;
  localStorage.setItem("score", 0);
});
