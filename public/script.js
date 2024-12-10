fetch('/.netlify/functions/greet')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                document.getElementById('hello').innerText = JSON.stringify(data);
            })
            .catch(error => console.error('Error:', error));
