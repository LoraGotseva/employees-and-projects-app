function showTable() {
    var table = document.getElementById("data-table");
    table.style.display="block";
  }

  function showResult(dataLoaded) {
    var result = document.querySelector(".result");
    if (result && dataLoaded) {
      result.style.display = "block";
    } else {
      alert("Please, upload a csv file first!");
    }
  }

  export {showTable, showResult}