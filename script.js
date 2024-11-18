let button = document.getElementById("button");
let DATE = document.getElementById("Dateinput");
let AMOUNT = document.getElementById("amountInput");
let DESCRIPTION = document.getElementById("decriptionInput"); // Fix this variable name
let TYPE = document.getElementById("type");
let TABLE = document.getElementById("table");
let class_name;
let expense_records = [];

// Check if there are any records stored in local storage
if(localStorage.getItem("expense_records")){
    expense_records = JSON.parse(localStorage.getItem("expense_records"));
    renderTable();
}

let inputs = [DATE, AMOUNT, DESCRIPTION];

function add_expense(date = "N/A", type = "N/A", amount = "N/A", description = "N/A") { // Fix this parameter name
    let DATE_OBJECT = new Date(DATE.value); // Corrected constructor
    let FORMATTED_DATE = DATE_OBJECT.toLocaleDateString("en-US", {month: "2-digit", day: "2-digit", year: "numeric"}); // Corrected method name
    date = FORMATTED_DATE;
    type = TYPE.value;
    amount = AMOUNT.value;
    description = DESCRIPTION.value; // Fix this variable name

    switch(TYPE.value) {
        case "Food":
            class_name = "food";
            break;
        case "Transportation":
            class_name = "transportation";
            break;
        case "Clothing":
            class_name = "clothing";
            break;
        case "Dept":
            class_name = "dept";
            break;
        case "Education":
            class_name = "education";
            break;
        case "Sports":
            class_name = "sports";
            break;
    }

    expense_records.push({date, type, amount, description, class_name}); // Fix this variable name
    updateLocalStorage();
    renderTable();
}

function delete_expense(index) {
    expense_records.splice(index, 1);
    updateLocalStorage();
    renderTable();
}

function renderTable() {
    TABLE.innerHTML = `<tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>`;

    expense_records.forEach((expense, index) => {
        let color_code = expense.class_name;
        TABLE.innerHTML += `<tr>
                              <td class="${color_code}">${expense.date}</td>
                              <td class="${color_code}">${expense.type}</td>
                              <td class="${color_code}">$${expense.amount}</td>
                              <td class="${color_code}">${expense.description}</td> <!-- Fix this variable name -->
                              <td class="${color_code}"><button onclick="delete_expense(${index})" class="btn btn-primary btn-sm">Delete</button></td>
                            </tr>`;
    });
}

function updateLocalStorage() {
    localStorage.setItem("expense_records", JSON.stringify(expense_records));
}

button.addEventListener("click", add_expense);

