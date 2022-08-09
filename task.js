window.onload = function () {
    const getFraseButton = document.getElementsByName("getFraseButton")[0];

    getFraseButton.addEventListener("click", async function () {
        fetch('https://fe.it-academy.by/Examples/words_tree/root.txt').then(function (response) {
            if (response.ok) {
                recursiveGetData1(response, []);
            } else {
               console.log(`Ошибочный запрос: ${response.status} : ${response.statusText}`);
            }
        });
        /*
        const response = await fetch('https://fe.it-academy.by/Examples/words_tree/root.txt');

        if (response.ok) {
            recursiveGetData1(response, []);
        } else {
            console.log(`Ошибочный запрос: ${response.status} : ${response.statusText}`);
        }
        */
    });
}

function outputResult (frases) {
    const textWindow = document.getElementsByName("textWindow")[0];
    textWindow.textContent = frases;
}

async function recursiveGetData1 (response, frases) { 
    if (Array.isArray(response)) {
        const fileList = response;
        
        const requests = fileList.map(file => fetch(`https://fe.it-academy.by/Examples/words_tree/${file}`).then(result => result.ok ? result.text() : null).catch(error => console.log(error)));

        for (const response of await Promise.allSettled(requests)) {
            if (response.status == "fulfilled") {
                const data = response.value;
                        
                try {
                    const newFileList = JSON.parse(data);
                              
                    await recursiveGetData2(newFileList, frases);
                } catch (error) { 
                    if (data !== undefined) frases.push(data);
                }
            }
        }
                
        outputResult(frases.join(" "));
    } else {
        const data = await response.text();
        try {
            const fileList = JSON.parse(data);

            recursiveGetData2(fileList, frases);
        } catch (error) { outputResult(data); }
    }
} 
