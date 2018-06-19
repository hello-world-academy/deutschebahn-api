function start() {
  var StationID = document.getElementById('stationID').value;
  var Date = document.getElementById('requestDate').value;
  if ((StationID != "") & (Date!="")) {
    showTimetable(StationID, Date);
  }
  else {
    alert("Unvollständige Eingabe");
  }
}

function showTimetable(StationID, Date) {  
  var dburl = "https://api.deutschebahn.com/freeplan/v1/departureBoard/" + StationID + "?date=" + Date;
  request = new XMLHttpRequest;
  request.open('GET', dburl, true);
  request.send();
  request.addEventListener("loadend", function() {
			answer = JSON.parse(request.responseText);
    // document.getElementById("output").innerHTML = request.responseText;
     showLines(answer);
    // 8011956
  });
  request.send();
};

// Zeilen anzeigen
function showLines(arr) {
    var out = "<table><tr><th>Spaltenkopf</th><th>Zeit</th></tr>";
    var i;
    for(i = 0; i < arr.length; i++) {
        out += "<tr>"
      out += "<td>" + arr[i].name + "</td>";
      out += "<td>" + arr[i].dateTime.substr(11,5) + "</td>";
      out += "</tr>";
    }
  out += "</table>";
		document.getElementById("output").innerHTML = out;
}

function clean() {
  document.getElementById("output").innerHTML = "leer";
} 
