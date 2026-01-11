class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background-color: #111827;
                    color: #F3F4F6;
                    padding: 2rem 0;
                }
                
                .footer-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 2rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }
                
                .footer-logo {
                    display: flex;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }
                
                .footer-logo-icon {
                    width: 32px;
                    height: 32px;
                    background: linear-gradient(135deg, #3B82F6 0%, #10B981 100%);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 800;
                    margin-right: 0.75rem;
                }
                
                .footer-logo-text {
                    font-weight: 700;
                    font-size: 1.25rem;
                }
                
                .footer-links {
                    display: flex;
                    gap: 1.5rem;
                    margin-bottom: 1.5rem;
                }
                
                .footer-link {
                    color: #9CA3AF;
                    text-decoration: none;
                    transition: color 0.2s;
                }
                
                .footer-link:hover {
                    color: #F3F4F6;
                }
                
                .footer-copyright {
                    color: #9CA3AF;
                    font-size: 0.875rem;
                }
                
                @media (max-width: 768px) {
                    .footer-links {
                        flex-direction: column;
                        gap: 0.75rem;
                    }
                }
            </style>
            
            <div class="footer-container">
                <div class="footer-logo">
                    <span class="footer-logo-icon">M</span>
                    <span class="footer-logo-text">Minyts Holdings</span>
                </div>
                
                <div class="footer-links" role="navigation" aria-label="Footer">
                    <a href="#about" class="footer-link">About</a>
                    <a href="#ecosystem" class="footer-link">Ecosystem</a>
                    <a href="#companies" class="footer-link">Companies</a>
                    <a href="#contact" class="footer-link">Contact</a>
                </div>

                <div style="display:flex;gap:12px;margin-bottom:12px;">
                    <a class="footer-link" href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>
                    <a class="footer-link" href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">Twitter</a>
                </div>

                <div class="footer-copyright">
                    © <span id="year"></span> Minyts Holdings LLC. All rights reserved.
                </div>
            </div>
        `;
        const yearEl = this.shadowRoot.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    }
}

customElements.define('custom-footer', CustomFooter);