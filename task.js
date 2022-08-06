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
            recursiveGetData2(response, []);
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
        
        const requests = fileList.map(function (file) {
            return fetch(`https://fe.it-academy.by/Examples/words_tree/${file}`).then(function (result) {
                if (result.ok) return result.text();
            }).catch(function (error) {
                console.log(error);
            });
        });
            
        Promise.allSettled(requests).then(function (results) { 
            results.forEach(function (response2) { 
                if (response2.status == "fulfilled") {
                    const data = response2.value;
                        
                    try {
                        const newFileList = JSON.parse(data);
                              
                        recursiveGetData1(newFileList, frases);
                    } catch (error) { 
                        frases.push(data);
                    }
                }
            }); 
                
            outputResult(frases);
        }).catch(function (error) {
            console.log(error);
        });
    } else {
        response.text().then(function (data) {
            try {
                const fileList = JSON.parse(data);

                recursiveGetData1(fileList, frases);
            } catch (error) { outputResult(data); }
        });
    }
} 

async function recursiveGetData2 (response, frases) { 
    if (Array.isArray(response)) {
        const fileList = response;
        
        const requests = fileList.map(file => fetch(`https://fe.it-academy.by/Examples/words_tree/${file}`).then(result => result.ok ? result.text() : null).catch(error => console.log(error)));

        const results = await Promise.allSettled(requests);

        results.forEach(response2 => { 
            if (response2.status == "fulfilled") {
                const data = response2.value;
                        
                try {
                    const newFileList = JSON.parse(data);
                              
                    recursiveGetData2(newFileList, frases);
                } catch (error) { frases.push(data); }
            }
        }); 
                
        outputResult(frases);
    } else {
        const data = await response.text();
        try {
            const fileList = JSON.parse(data);

            recursiveGetData2(fileList, frases);
        } catch (error) { outputResult(data); }
    }
} 
