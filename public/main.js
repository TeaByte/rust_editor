async function init() {
    let rustApp = null;
    try{ 
        rustApp = await import('../pkg');
    } catch(e) {
        console.error(e);
        return;
    }

    console.log(rustApp);
    const input = document.getElementById('upload');
    const button = document.getElementById('submit');
    const fileReader = new FileReader();

    button.addEventListener('click', () => {
        if (input.files.length > 0) {
            fileReader.readAsDataURL(input.files[0]);
        }
    });

    fileReader.onload = () => {
        const base64 = fileReader.result.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        const e = document.getElementById("select");
        const filter = e.options[e.selectedIndex].value;
        const range = document.getElementById("range").value;

        console.log(filter, parseInt(range), parseFloat(range));

        let result = rustApp.grapscale(base64, filter, parseInt(range), parseFloat(range));
        document.getElementById('image').setAttribute('src', result);

        const prevButton = document.getElementById('download-button');
        if (prevButton) {
            prevButton.remove();
        }

        const downloadButton = document.createElement('button');
        downloadButton.setAttribute('id', 'download-button');
        downloadButton.innerText = 'Download Image';
        downloadButton.addEventListener('click', () => {
            const link = document.createElement('a');
            link.download = 'image.png';
            link.href = result;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });

        const testDiv = document.createElement('div');
        testDiv.setAttribute('class', 'test');
        testDiv.appendChild(downloadButton);
        document.querySelector('.result').appendChild(testDiv);
        
    };
}

init();