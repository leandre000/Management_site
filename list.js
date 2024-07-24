document.addEventListener("DOMContentLoaded", function () {
    const tableData = [
      { id: 1, facility: " Bushenge hospital", equipment: "medecines" },
      { id: 2, facility: " G.s Butare school", equipment: " 100 books" },
      { id: 3, facility: " Lemigo hotel", equipment: " 10 Taps" },
      { id: 4, facility: "Vitamino restaurent",equipment: " 500 plates" },
      { id: 5, facility: "Cimerwa industry", equipment: "5 machines" },
      { id: 6, facility: " Kagitumba roads", equipment: "10 ports" },
      { id: 7, facility: " Huye campuses", equipment: "6 air conditioners" },
      { id: 8, facility: "Huye laboratories", equipment: "200 bunserns" },
      { id: 9, facility: "E.M.L.R Shara church", equipment: " 1 piano" },
      { id: 10, facility: "fitness Gym", equipment: " 4 metals" },
      { id: 11, facility: "Ikaze meeting room", equipment: "70 chairs" },
      { id: 12, facility: "Urugwiro bar",equipment: "90 tables" },
      { id: 13, facility: "Bk bank", equipment: " 1 atm" },
      { id: 14, facility: " District office", equipment: "5 computer" },
      { id: 15, facility: " Teacher's appartments", equipment: "20 beds" },
    ];
  
    const tableBody = document.querySelector("tbody");
    const searchInput = document.getElementById("searchInput");
    const paginationDiv = document.getElementById("pagination");
    const deleteBtn = document.getElementById("deleteBtn");
  
    let currentPage = 1;
    const rowsPerPage = 5;
  
    function displayTableData(data) {
      if (data.length) {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const paginatedData = data.slice(startIndex, endIndex);
  
        tableBody.innerHTML = "";
  
        paginatedData.forEach((item) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.facility}</td>
                <td>${item.equipment}</td>
                <td><input type="checkbox" class="deleteCheckbox" data-id="${item.id}"></td>
            `;
          tableBody.appendChild(row);
        });
      } else {
        tableBody.innerHTML = "No data";
      }
    }
  
    function displayPagination(totalPages) {
      paginationDiv.innerHTML = "";
  
      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.innerText = i;
        btn.classList.add("pagination-btn");
        if (i === currentPage) {
          btn.classList.add("active");
        }
        btn.addEventListener("click", function () {
          currentPage = i;
          displayTableData(tableData);
          displayPagination(totalPages);
        });
        paginationDiv.appendChild(btn);
      }
    }
  
    function searchTable() {
      const searchText = searchInput.value.toLowerCase();
      const filteredData = tableData.filter((item) => {
        return (
          item.facility.toLowerCase().includes(searchText) ||
          item.equipment.toLowerCase().includes(searchText)
        );
      });
      displayTableData(filteredData);
      const totalPages = Math.ceil(filteredData.length / rowsPerPage);
      displayPagination(totalPages);
    }
  
    function deleteRows() {
      const checkboxes = document.querySelectorAll(".deleteCheckbox:checked");
      checkboxes.forEach((checkbox) => {
        const id = parseInt(checkbox.getAttribute("data-id"));
        tableData.splice(
          tableData.findIndex((item) => item.id === id),
          1
        );
      });
      displayTableData(tableData);
      const totalPages = Math.ceil(tableData.length / rowsPerPage);
      displayPagination(totalPages);
    }
  
    searchInput.addEventListener("keyup", searchTable);
    deleteBtn.addEventListener("click", deleteRows);
  
    displayTableData(tableData);
    const totalPages = Math.ceil(tableData.length / rowsPerPage);
    displayPagination(totalPages);
  });
  