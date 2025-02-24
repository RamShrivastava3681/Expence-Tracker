document.addEventListener("DOMContentLoaded", () => {
    const expenseName = document.getElementById("expenseName");
    const expenseAmount = document.getElementById("expenseAmount");
    const addExpenseBtn = document.getElementById("addExpense");
    const expenseList = document.getElementById("expenseList");
    const totalAmount = document.getElementById("totalAmount");
  
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  
    function updateTotal() {
      const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
      totalAmount.innerText = total;
    }
  
    function saveExpenses() {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  
    function renderExpenses() {
      expenseList.innerHTML = "";
      expenses.forEach((expense, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${expense.name}: ₹${expense.amount} 
                        <button class="delete-btn" onclick="deleteExpense(${index})">X</button>`;
        expenseList.appendChild(li);
      });
      updateTotal();
    }
  
    function addExpense() {
      const name = expenseName.value.trim();
      const amount = parseFloat(expenseAmount.value);
  
      if (name === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid expense name and amount.");
        return;
      }
  
      expenses.push({ name, amount });
      saveExpenses();
      renderExpenses();
  
      expenseName.value = "";
      expenseAmount.value = "";
    }
  
    window.deleteExpense = function(index) {
      expenses.splice(index, 1);
      saveExpenses();
      renderExpenses();
    };
  
    addExpenseBtn.addEventListener("click", addExpense);
  
    renderExpenses();
  });
  