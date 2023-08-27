async function postData(url, data) {
    const result = await fetch(url, {
        method: "POST",
        body: data,
        headers: {
            'Content-type' : 'application/json'
        }
    });

    return await result.json();
};

async function getData(url) {
    const result = await fetch(url);

    if (!result.ok) {
        throw new Error(`Coul\d not fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
};

export {postData};
export {getData};