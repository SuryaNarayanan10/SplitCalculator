let expenses = [];

function addExpense() {
    const name = document.getElementById("name").value;
    const amountInput = document.getElementById("amount").value;

    if (!name || !amountInput) {
        alert("Please enter a valid name and amount.");
        return;
    }

    const amounts = amountInput.split('+').map(parseFloat);
    const totalAmount = amounts.reduce((total, amount) => total + amount, 0);

    if (isNaN(totalAmount) || totalAmount < 0) {
        alert("Please enter valid amounts.");
        return;
    }

    expenses.push({ name, totalAmount, amounts });
    updateResults();
    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";
}

function updateResults() {
    const totalExpense = expenses.reduce((total, expense) => total + expense.totalAmount, 0);
    const averageExpense = totalExpense / expenses.length;

    const results = document.getElementById("results");
    results.innerHTML = "";

    for (const expense of expenses) {
        const difference = Math.round(expense.totalAmount - averageExpense);
        results.innerHTML += `💲 ${expense.name} has spent: ₹${Math.round(expense.totalAmount)}, `;

        if (difference > 0) {
            results.innerHTML += `should receive ₹${Math.abs(difference)} from `;
            for (const otherExpense of expenses) {
                if (otherExpense !== expense && (otherExpense.totalAmount - averageExpense) < 0) {
                    results.innerHTML += `💰 ${otherExpense.name}, `;
                }
            }
            results.innerHTML = results.innerHTML.slice(0, -2); // Remove trailing comma
            results.innerHTML += "<br><br>";
        } else if (difference < 0) {
            results.innerHTML += `should send ₹${Math.abs(difference)} to `;
            for (const otherExpense of expenses) {
                if (otherExpense !== expense && (otherExpense.totalAmount - averageExpense) > 0) {
                    results.innerHTML += `💰 ${otherExpense.name}, `;
                }
            }
            results.innerHTML = results.innerHTML.slice(0, -2); // Remove trailing comma
            results.innerHTML += "<br><br>";
        } else {
            results.innerHTML += `is all settled. 😊<br><br>`;
        }
    }
}