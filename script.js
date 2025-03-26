document.addEventListener('DOMContentLoaded', () => {
    const rollButton = document.getElementById('roll-button');
    const resetButton = document.getElementById('reset-button');
    const numberDisplay = document.getElementById('number-display');
    const numberList = document.getElementById('number-list');
    const numbers = Array.from({ length: 90 }, (_, i) => i + 1);
    let rolledNumbers = [];

    rollButton.addEventListener('click', () => {
        if (numbers.length === 0) {
            alert('All numbers have been rolled!');
            return;
        }

        let animationInterval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * numbers.length);
            numberDisplay.textContent = numbers[randomIndex];
        }, 50);

        setTimeout(() => {
            clearInterval(animationInterval);

            const randomIndex = Math.floor(Math.random() * numbers.length);
            const rolledNumber = numbers.splice(randomIndex, 1)[0];
            rolledNumbers.push(rolledNumber);

            numberDisplay.textContent = rolledNumber;
            const cell = document.getElementById(`num-${rolledNumber}`);
            if (cell) {
                cell.classList.add('marked');
                cell.innerHTML = `<span>${rolledNumber}</span>`;
            }
        }, 500);
    });

    resetButton.addEventListener('click', () => {
        rolledNumbers = [];
        numberDisplay.textContent = '0';
        numbers.splice(0, numbers.length, ...Array.from({ length: 90 }, (_, i) => i + 1));
        document.querySelectorAll('.marked').forEach(cell => {
            cell.classList.remove('marked');
            cell.innerHTML = cell.id.split('-')[1];
        });
    });
});
