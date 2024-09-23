function toggleForm(formId) {
    const forms = document.querySelectorAll('div[id$="-form"]');
    forms.forEach(function (form) {
        if (form.id === formId) {
            form.classList.toggle('hidden');
        } else {
            form.classList.add('hidden');
        }
    });
}

// Log-out button functionality
document.getElementById('btn-logout').addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = '';
})

class counter{
    static ser = 0;
    static getCounter() {
        return ++this.ser;
    }
}


function generateID() {
    let ID = '';
    for (let i = 0; i < 10; i++) {
        ID += Math.floor(Math.random() * 10);
    }
    return '#' + ID;
}

function dateTime() {
    const now = new Date();
    const date = now.toISOString().slice(0, 10).replace(/-/g, '-');
    const time = now.toTimeString().split(' ')[0]; 
    return `${date} ${time}`;
}

function htmlContent() {
    const content = `
                    <div class="history w-full mx-auto flex justify-between items-start">
                    <div class="transaction-info flex flex-col gap-2">
                        <p class="history-id font-medium"></p>
                        <p class="transaction-time"></p>
                        <p class="transaction-type"></p>
                    </div>
                    <div class="transaction-amount">
                        <h2></h2>
                    </div>
                    </div>
                `
    return content;
}

// Storing history :

function makeHistory(operation, account, amount) {

    const historyBook = document.getElementById('transaction-form');
    const newHistory = document.createElement('div');

    const serial = counter.getCounter();
    if (serial == 1) {
        document.getElementById('no-transaction-history').classList.add('hidden');
    }

    const content = `
    <div class="history bg-white rounded-lg p-2 mb-2 w-full mx-auto flex justify-between items-start">
        <div class="transaction-info flex flex-col gap-1">
            <p class="transaction-id font-medium"></p>
            <p class="transaction-time"></p>
            <p class="transaction-type"></p>
        </div>
        <div class="transaction-amount font-bold">
            <h2></h2>
        </div>
    </div>
    `;
    newHistory.innerHTML = content;

    const history = newHistory.querySelector('.history');
    history.setAttribute('id', `history-${serial}`);
    history.classList.remove('history');
    console.log(newHistory.querySelector(`#history-${serial}`).innerHTML);

    const transactionID = newHistory.querySelector('.transaction-id');
    transactionID.setAttribute('id', `transaction-id-${serial}`);
    transactionID.classList.remove('transaction-id');
    newHistory.querySelector(`#transaction-id-${serial}`).innerText = generateID();

    const transactionInfo = newHistory.querySelector('.transaction-info');
    transactionInfo.setAttribute('id', `transaction-info-${serial}`);
    transactionInfo.classList.remove('transaction-info');
    console.log(newHistory.querySelector(`#transaction-info-${serial}`));

    const transactionTime = newHistory.querySelector('.transaction-time');
    console.log(transactionTime);
    transactionTime.setAttribute('id', `time-${serial}`);
    transactionTime.classList.remove('transaction-time');
    newHistory.querySelector(`#time-${serial}`).innerText = dateTime();

    const transactionType = newHistory.querySelector('.transaction-type');
    transactionType.setAttribute('id', `type-${serial}`);
    transactionType.classList.remove('transaction-type');
    newHistory.querySelector(`#type-${serial}`).innerText = `${operation}(${account})`;

    const transactionAmount = newHistory.querySelector('.transaction-amount h2');
    transactionAmount.setAttribute('id', `amount-${serial}`);
    let text = '';
    if (operation == 'cash-in') {
        text = `+${amount}`;
    }
    else {
        text = `-${amount}`;
    }
    newHistory.querySelector(`#amount-${serial}`).innerText = text;
    if (operation == 'cash-in') {
        transactionAmount.classList.add('text-green-500');
    }
    else {
        transactionAmount.classList.add('text-red-500');
    }

    historyBook.appendChild(newHistory);
}

// cash in, cash-out,transfer-money,recharge, pay-bill button functionality

function operationPerformer (event, accountID, amountID, passwordID) {
    event.preventDefault();
    
    let accountBalance = document.getElementById('account-balance');

    let accountNumber = document.getElementById(accountID).value;
    let amount = document.getElementById(amountID).value;
    let password = document.getElementById(passwordID).value;
    const selectedBank = document.getElementById('select-bank').value;

    if(accountNumber === '' || password === '' || amount === ''){
        alert('Please fill in all the fields');
        return;
    }
    if (accountID.includes('cash-in')) {
        if (selectedBank == '') {
            alert('Please fill in all the fields');
            return;
        }
    }

    if(isNaN(accountNumber) && isNaN(password) && isNaN(amount)){
        alert('Please enter valid values');
        return;
    }
    if(accountNumber.length !== 11 || password !== '1234' || amount < 0){
        alert('Failed to cash out. Please check your details');
        return;
    }

    if(parseFloat(accountBalance.textContent) < parseFloat(amount)){
        alert('Insufficient funds');
        return;
    }
    
    let newBalance = 0;
    if (accountID.includes('cash-in')) {
        newBalance = parseFloat(accountBalance.innerText) + parseFloat(amount);
    }
    else {
        newBalance = parseFloat(accountBalance.innerText) - parseFloat(amount);
    }

    accountBalance.innerText = newBalance;

    let operation = '';
    if (accountID.includes('cash-in')) {
        operation = 'cash-in';
    }
    else if (accountID.includes('cashout')) {
        operation = 'cash-out';
    }
    else if (accountID.includes('transfer')) {
        operation = 'transfer';
    }
    else if (accountID.includes('recharge')) {
        operation = 'recharge';
    }
    else {
        operation = 'bill-pay';
    }
    makeHistory(operation, accountNumber, amount);
    document.getElementById(accountID).value = '';
    document.getElementById(amountID).value = '';
    document.getElementById(passwordID).value = '';
    document.getElementById('select-bank').value = '';
}