import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
    const forms = document.querySelectorAll('form'),
            inputs =  document.querySelectorAll('input');
    
    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'loading',
        success: 'success',
        failure: 'failure',
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let result = await fetch(url, {
            method: 'POST',
            body: data,
        });

        return await result.text();
    };

    const clearInputs = () => {
        inputs.forEach(input => input.value = '');
    }
}

export default forms;
