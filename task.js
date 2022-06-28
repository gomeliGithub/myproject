/*window.onload = () => {
    const getFraseButton = document.getElementsByName("getFraseButton")[0];
    const textWindow = document.getElementsByName("textWindow")[0];

    getFraseButton.addEventListener("click", async () => {
            const response = await fetch('https://fe.it-academy.by/Examples/words_tree/root.txt');
            let frases = "";

            if (response.ok) {
                if (!response.json) {
                    frases = await response.text(); 

                    textWindow.textContent = frases;
                } else {
                    frases = await response.json();

                    textWindow.innerText = frases.join("\n");
                }
            } else {
                alert('Ошибочный запрос: ' + response.status + ': ' + response.statusText);
            }
    });
}*/

window.onload = function () {
    const getFraseButton = document.getElementsByName("getFraseButton")[0];
    const textWindow = document.getElementsByName("textWindow")[0];

    getFraseButton.addEventListener("click", async function () {
        fetch('https://fe.it-academy.by/Examples/words_tree/root.txt').then(function (response) {
            if (response.ok) {
                if (!response.json) {
                    response.text().then(function (frases) {
                        textWindow.textContent = frases;
                    }); 
                } else {
                    response.json().then(function (frases) {
                        textWindow.innerText = frases.join("\n");
                    });
                }
            } else {
                alert('Ошибочный запрос: ' + response.status + ': ' + response.statusText);
            }
        });
    });
}