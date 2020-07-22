
setTimeout(() => {
    (function() {
        const anchor = document.createElement('a');
        anchor.textContent = 'Feedback';
        anchor.href = '#';
        document.body.appendChild(anchor);
        console.log(anchor)
    })();
}, 1000)