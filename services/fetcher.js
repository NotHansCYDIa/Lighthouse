const frontEndData = Object.freeze({
    featured: "fed/featured"
})

const backEndData = Object.freeze({
    sample: "bed/sample"
})

function fetchBackEnd(BED) {
    switch (BED) {
        case backEndData.sample:
            return fetch('https://github.com/NotHansCYDIa/Lighthouse/raw/refs/heads/main/bed/sample.json')
                .then(response => response.json())
                .then(data => {
                    return frontBackEndCable(JSON.stringify(data));
                })
                .catch(error => console.error('Error:', error));
        default:
            console.log('Invalid BED');
            return null;
    }
}

function fetchFrontEnd(FED) {
    switch (FED) {
        case frontEndData.featured:
            return fetch('https://github.com/NotHansCYDIa/Lighthouse/raw/refs/heads/main/fed/featured.json')
                .then(response => response.json())
                .then(data => {
                    return frontBackEndCable(JSON.stringify(data));
                })
                .catch(error => console.error('Error:', error));
        default:
            console.log('Invalid FED');
            return null;
    }
}
async function frontBackEndCable(input) {
    const variablePattern = /!([^!]+)!/g;
    let match;
    const results = {};

    while ((match = variablePattern.exec(input)) !== null) {
        const variable = match[1]; 
        const parts = variable.split("/"); 
        const [backendKey, ...keys] = parts;

        const backendPath = backEndData[backendKey];
        if (!backendPath) {
            console.error(`BED Key does not exist: "${backendKey}" `);
            continue;
        }

        try {
            const jsonData = await fetchBackEnd(backendPath);
            if (!jsonData) continue;

            let value = jsonData;
            for (const key of keys) {
                value = value[key];
                if (value === undefined) {
                    throw new Error(`Key from BED was not found: "${key}" `);
                }
            }

            results[variable] = value;
        } catch (error) {
            console.error(`BED Variable Timeout: "${variable}":`, error);
        }
    }

    const output = input.replace(/!([^!]+)!/g, (_, variable) => results[variable] || `!${variable}!`);
    console.log("Output:", output);

    return output; 
}

    
export { fetchFrontEnd, frontEndData, frontBackEndCable }
