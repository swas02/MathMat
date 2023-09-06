const matx = {
  new: function (name, data) { sessionStorage.setItem(name, JSON.stringify(data)); return name + ' = ' + JSON.stringify(data) },
  get: function (name) { return JSON.parse(sessionStorage.getItem(name)) }
};

function createMatrixTable(tableData) {
  console.log(tableData)
  var table = document.createElement('table');
  table.classList.add('pseudo-partial-border')

  tableData.forEach(function (rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function (cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    table.appendChild(row);
  });
  console.log(table)
  return table;
}
