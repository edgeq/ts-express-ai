const form = document.getElementById('prompt-form');
const promptResult = document.getElementById('prompt-result');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const urlParams = new URLSearchParams(formData);
    const promptURL = `/make-prompt?${urlParams.toString()}`;
    const eventSource = new EventSource(promptURL);

    eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);

        if (data.promptResponse) {
            promptResult.innerHTML += data.promptResponse;
        }
    };

    eventSource.onerror = (error) => {
        console.error('EventSource error:', error);
      };

});