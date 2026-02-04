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

/* Mobile nav toggle */
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('primary-navigation');

    if (navToggle && navMenu) {
        function openMenu() {
            navToggle.setAttribute('aria-expanded', 'true');
            navMenu.classList.add('open');
            navMenu.setAttribute('aria-hidden', 'false');
            const icon = navToggle.querySelector('i');
            if (icon) { icon.classList.remove('bi-list'); icon.classList.add('bi-x'); }
        }

        function closeMenu() {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('open');
            navMenu.setAttribute('aria-hidden', 'true');
            const icon = navToggle.querySelector('i');
            if (icon) { icon.classList.remove('bi-x'); icon.classList.add('bi-list'); }
            navToggle.focus();
        }

        navToggle.addEventListener('click', function () {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            if (expanded) closeMenu();
            else openMenu();
        });

        // Close when pressing Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navMenu.classList.contains('open')) {
                closeMenu();
            }
        });

        // Close when clicking outside
        document.addEventListener('click', function (e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('open')) {
                closeMenu();
            }
        });

        // Move focus to first link when opening
        navToggle.addEventListener('click', function () {
            if (navMenu.classList.contains('open')) {
                const firstLink = navMenu.querySelector('a');
                if (firstLink) firstLink.focus();
            }
        });
    }
});

window.addEventListener("scroll", function() {
  const header = document.querySelector("header");
  // Adiciona a classe 'rolagem' se o scroll passar de 50px
  header.classList.toggle("rolagem", window.scrollY > 50);
});