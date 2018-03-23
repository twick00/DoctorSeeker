const Promise = require('es6-promise-polyfill').Promise;
let api = process.env.exports.apiKey;

export function searchDoctor(pageLimit = 10, docName = "", location = "wa-seattle", symptom = "") {
  return new Promise(function(resolve, reject) {
    const request = new XMLHttpRequest();
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${docName}&query=${symptom}&location=${location}&limit=${pageLimit}&user_key=${api}`;

    request.onload = function() {
      if(this.statusText === 'OK') {
        resolve(this.response);
      } else {
        reject(console.error(this.statusText));
      }
    };
    request.open("GET", url, true);
    request.send();
  });
}
export function getPhone(data) {

}
export function getSite(data) {

}
export function getBoolNewPatients(data) {
  let acceptingPatientsObj = [];
  for(let i = 0; i < data.data.practices.length; i++)
  {
    if (data.data.practices[i].accepts_new_patients === true) 
    {
      acceptingPatientsObj[i] = {name:data.data.practices.name, accepting:true};
    }
    else {
      acceptingPatientsObj[i] = {name:data.data.practices.name, accepting:false};
    }
  }
}

//https://api.betterdoctor.com/2016-03-01/doctors?query=${symptom}&location=${location}&limit=${pageLimit}&user_key=${api}

//location = 'wa-seattle'