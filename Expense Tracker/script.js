// we will read the inputs and update the things accordingly 
const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionFormEl.addEventListener('submit',addTransaction);
function addTransaction(e){
    // it must have the data 
    e.preventDefault() ;
    // need to get the values
    const description = descriptionEl.value.trim() ;
    const amount = parseFloat(amountEl.value);
    transactions.push({
        id : Date.now(),
        description,
        amount,
    });
    localStorage.setItem("transactions",JSON.stringify(transactions));
    updateTransactionList();
    updateSummary();
    transactionFormEl.reset ();

}   
function updateTransactionList(){
    transactionListEl.innerHTML="";
    const sortedTransactions = [...transactions].reverse();
    sortedTransactions.forEach((e)=>{
        const transaction_ele = createTransactionElement(e);
        // append li in ul 
        transactionListEl.appendChild(transaction_ele);
    });
}

function createTransactionElement(e){
    // e is json .. it has id , description and amount
    const li = document.createElement("li");
    li.classList.add("transaction");
    li.classList.add(e.amount > 0 ? "income" : "expense");
    li.innerHTML = `
        <span>${e.description}</span>
        <span>
        ${formatCurrency(e.amount)} 
        <button class="delete-btn" onclick="removeTransaction(${e.id})">x</button>
        </span>
    `;
    return li;
}
function formatCurrency(number){
    // return a string 
    let result = new Intl.NumberFormat("en-US",{
        style:"currency",
        currency:"USD",
    }).format(number);
    return result;
}

function removeTransaction(id){
    // remove it from json object
    transactions = transactions.filter((e)=> e.id !== id);
    localStorage.setItem("transactions",JSON.stringify(transactions));
    updateTransactionList() ;
    updateSummary();

}

function updateSummary(){
    let inc = 0 ;
    let exp = 0;
    transactions.forEach((e)=>{
        if(e.amount >= 0){
            inc += e.amount;
        }
        else{
            exp += Math.abs(e.amount);
        }
    });
    balanceEl.innerHTML = formatCurrency(inc-exp);
    incomeAmountEl.innerHTML = formatCurrency(inc);
    expenseAmountEl.innerHTML = formatCurrency(exp);
}
updateTransactionList();
updateSummary();