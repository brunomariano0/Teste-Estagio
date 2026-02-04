document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('subscribe-form');
    if (!form) return;

    const btn = form.querySelector('button[type="submit"]');
    const msgEl = document.getElementById('form-message');

    function setMessage(text, type = 'success') {
        if (!msgEl) return;
        msgEl.textContent = text;
        msgEl.className = 'form-message ' + (type === 'success' ? 'success' : 'error');
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!btn) return;

        const formData = new FormData(form);

        btn.disabled = true;
        const originalText = btn.textContent;
        btn.textContent = 'Enviando...';

        try {
            const res = await fetch(form.action, {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setMessage(data.message || 'Inscrição recebida. Obrigado!', 'success');
                form.reset();
            } else {
                setMessage(data.message || 'Ocorreu um erro. Tente novamente.', 'error');
            }
        } catch (err) {
            setMessage('Erro de conexão. Tente novamente mais tarde.', 'error');
        } finally {
            btn.disabled = false;
            btn.textContent = originalText;
        }
    });
});