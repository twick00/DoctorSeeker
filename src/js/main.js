import $ from 'jquery';
import "./../css/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { searchDoctor } from "./docSearch";

let errorTemplate = function(string){
  return `Error: ${string}`;
};

$(document).ready(function() {
  $("#searchField").submit(function(event) {
    event.preventDefault();
    $("#results").empty();
    if($("#searchField").val() == "")
    {
      $("results").append(errorTemplate("Please enter a value."));
      return;
    }
    let data = searchDoctor($("#page-limit").val(), $("#searchName").val(),$("location").val(),$("#searchSymptom").val());
    let parsedData = cardTemplate(data);
    parsedData.forEach(function(card) {
      $("#results").append(card);
    });
  });
});

let cardTemplate = function(data)
{
  data = JSON.parse(data);
  const array = [];
  data.forEach(function(profile) {
    let shortBio = profile.bio.split(" ").slice(0, 25).join(" ").concat("...");
    let card = `
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="${profile.image_url}" alt="${profile.first_name} ${profile.last_name}">
      <div class="card-body">
        <h5 class="card-title">${profile.first_name} ${profile.last_name}</h5>
        <p class="card-text">${shortBio}</p>
      </div>
    </div>
    `;
    array.push(card);
  });
  return array;
};