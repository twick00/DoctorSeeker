import $ from 'jquery';
import "./../css/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { searchDoctor } from "./docSearch";
import _ from 'lodash';

let errorTemplate = function(string){
  return `Error: ${string}`;
};

$(document).ready(function() {
  $("#searchField").submit(function(event) {
    event.preventDefault();
    $("#results").empty();
    let result;
    let data = searchDoctor($("#page-limit").val(), $("#searchName").val(),$("location").val(),$("#searchSymptom").val());
    data.then(function(response) {
      let parsedData = cardTemplate(response);
      parsedData.forEach(function(card) {
        $("#results").append(card);
      });
    });
    // let parsedData = cardTemplate(data);
    // parsedData.forEach(function(card) {
    //   $("#results").append(card);
    // });
  });
});

function cardTemplate(data)
{
  data = JSON.parse(data);
  let array = [];
  for(let i = 0; i < _.size(data.data); i++)
  {
    let shortBio = data.data[i].profile.bio.split(" ").slice(0, 25).join(" ").concat("...");
    let card = `
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="${data.data[i].profile.image_url}" alt="${data.data[i].profile.first_name} ${data.data[i].profile.last_name}">
      <div class="card-body">
        <h5 class="card-title">${data.data[i].profile.first_name} ${data.data[i].profile.last_name}</h5>
        <p class="card-text">${shortBio}</p>
      </div>
    </div>
    `;
    array.push(card);
  }
  return array;
}