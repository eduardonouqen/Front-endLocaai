function autoResize(textarea) {

    textarea.style.height = '1.5em';

    if (textarea.scrollHeight > textarea.clientHeight) {
        textarea.style.height = `${textarea.scrollHeight - 25}px`;
    }
}