const form = document.getElementById('prompt-form');
const promptResult = document.getElementById('prompt-result');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    promptResult.innerHTML = '';
    const formData = new FormData(form);
    const urlParams = new URLSearchParams(formData);
    const promptURL = `/make-prompt?${urlParams.toString()}`;
    const eventSource = new EventSource(promptURL);

    eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);

        if (data.promptResponse) {
            form.querySelector('button').disabled = true;
            promptResult.innerHTML += data.promptResponse;
        } else {
            form.querySelector('button').disabled = false;
        }
    };

    // TODO: Trigger loading states while we wait for prompt response to clear out

    eventSource.onerror = (error) => {
        console.error('EventSource error:', error);
      };

});
