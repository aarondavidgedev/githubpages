
function rowClickFunction() {
    alert("More information on user XYZ");
}

async function loadDataTable(url, table) {

    const tableHead = table.querySelector("thead");

    const response = await fetch(url);

    const data = await response.json();

    const headerArray = ["id", "name", "username", "email", "address", "lat", "lng", "phone", "website", "company name", "catch phrase", "bs"];

    const cols = headerArray;

    tableHead.innerHTML = "<tr></tr>";

    for (const index in headerArray) {

        const headerElement = document.createElement("th");

        headerElement.textContent = headerArray[index];
        tableHead.querySelector("tr").appendChild(headerElement);

    }

    for (var i = 0; i < data.length; i++) {

        const street = data[i].address.street;
        const suite = data[i].address.suite;
        const city = data[i].address.city;
        const zipcode = data[i].address.zipcode;

        const lat = data[i].address.geo.lat;
        const lng = data[i].address.geo.lng;

        const companyName = data[i].company.name;
        
        const catchPhrase = data[i].company.catchPhrase;

        const bs = data[i].company.bs;

        const addressString = street + " " + suite + " " + city + " " + zipcode;

        var row = $('<tr onclick="rowClickFunction()"/>');

        
        for (var colIndex = 0; colIndex < cols.length; colIndex++) {

            var val = data[i][cols[colIndex]];

            if(cols[colIndex] == "address"){
                row.append($('<td/>').html(addressString));
            }else if(cols[colIndex] == "lat"){
                row.append($('<td/>').html(lat));
            }else if(cols[colIndex] == "lng"){
                row.append($('<td/>').html(lng));
            }else if(cols[colIndex] == "company name"){
                row.append($('<td/>').html(companyName));
            }else if(cols[colIndex] == "catch phrase"){
                row.append($('<td/>').html(catchPhrase));
            }else if(cols[colIndex] == "bs"){
                row.append($('<td/>').html(bs));
            }

            if (val == null) val = "";
            row.append($('<td/>').html(val));
            
        }
        $('table').append(row);
    }
}
loadDataTable('https://jsonplaceholder.typicode.com/users', document.querySelector("table"));

