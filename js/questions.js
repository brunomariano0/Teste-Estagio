document.addEventListener('DOMContentLoaded', function () {
                const buttons = document.querySelectorAll('.faq-question');

                function closePanel(btn) {
                    btn.setAttribute('aria-expanded', 'false');
                    const panel = document.getElementById(btn.getAttribute('aria-controls'));
                    if (!panel) return;
                    panel.style.maxHeight = null;
                    panel.setAttribute('hidden', '');
                    panel.setAttribute('aria-hidden', 'true');
                }

                function openPanel(btn) {
                    btn.setAttribute('aria-expanded', 'true');
                    const panel = document.getElementById(btn.getAttribute('aria-controls'));
                    if (!panel) return;
                    panel.removeAttribute('hidden');
                    panel.setAttribute('aria-hidden', 'false');
                    panel.style.maxHeight = panel.scrollHeight + 'px';
                }

                buttons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        const isOpen = btn.getAttribute('aria-expanded') === 'true';                        
                        buttons.forEach(b => closePanel(b));                       
                        if (!isOpen) openPanel(btn);
                    });

                   
                    const panel = document.getElementById(btn.getAttribute('aria-controls'));
                    if (panel) {
                        panel.addEventListener('transitionend', () => {
                            if (panel.style.maxHeight === '' || panel.style.maxHeight === '0px') {
                                panel.setAttribute('hidden', '');
                                panel.setAttribute('aria-hidden', 'true');
                            }
                        });
                    }
                });
            });