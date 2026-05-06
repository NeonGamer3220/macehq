function showToast(message) {
    const toast = document.getElementById('toast');
    const toastText = toast.querySelector('span');

    if (message === 'Server address copied to clipboard!') {
        toastText.textContent = 'A szerver cím másolva a vágólapra!';
    } else if (message === 'Failed to copy address. Please copy manually.') {
        toastText.textContent = 'Nem sikerült másolni. Másold be kézzel!';
    } else {
        toastText.textContent = message;
    }
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Copy server IP to clipboard
function copyIP() {
    const serverIP = 'chaosffa.kinetic.host';
    
    navigator.clipboard.writeText(serverIP).then(() => {
        showToast('Server address copied to clipboard!');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = serverIP;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showToast('Server address copied to clipboard!');
        } catch (err) {
            showToast('Failed to copy address. Please copy manually.');
        }
        document.body.removeChild(textArea);
    });
}

// Scroll to server info section
function scrollToInfo() {
    const infoSection = document.getElementById('info');
    if (infoSection) {
        const offsetTop = infoSection.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}
