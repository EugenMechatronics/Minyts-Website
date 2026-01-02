class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: sticky;
                    top: 0;
                    z-index: 50;
                    background-color: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                }
                
                nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 0;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 1rem 2rem;
                }
                
                .logo {
                    display: flex;
                    align-items: center;
                    font-weight: 700;
                    font-size: 1.25rem;
                    color: #111827;
                    text-decoration: none;
                }
                
                .logo-icon {
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
                
                .nav-links {
                    display: flex;
                    gap: 1.5rem;
                    align-items: center;
                }

                .menu-button {
                    display: none;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: 8px;
                }

                .menu-button:focus {
                    outline: 2px solid rgba(59,130,246,0.5);
                }

                .nav-links.collapsed {
                    display: none;
                }
                
                .nav-link {
                    color: #4B5563;
                    font-weight: 500;
                    text-decoration: none;
                    transition: color 0.2s;
                    padding: 0.5rem 0;
                    position: relative;
                }
                
                .nav-link:hover {
                    color: #111827;
                }
                
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background-color: #3B82F6;
                    transition: width 0.3s;
                }
                
                .nav-link:hover::after {
                    width: 100%;
                }
                
                @media (max-width: 768px) {
                    nav {
                        flex-direction: row;
                        align-items: center;
                        padding: 0.5rem 1rem;
                    }

                    .menu-button {
                        display: inline-flex;
                    }

                    .nav-links {
                        position: absolute;
                        top: 64px;
                        left: 0;
                        right: 0;
                        background: rgba(255,255,255,0.98);
                        margin: 0.5rem 1rem;
                        padding: 1rem;
                        border-radius: 12px;
                        flex-direction: column;
                        gap: 0.75rem;
                        box-shadow: 0 6px 18px rgba(15,23,42,0.08);
                    }
                }
            </style>
            
            <nav role="navigation" aria-label="Main navigation">
                <a href="#top" class="logo">
                    <span class="logo-icon">M</span>
                    Minyts Holdings
                </a>

                <button class="menu-button" id="menuBtn" aria-expanded="false" aria-controls="navLinks" aria-label="Toggle menu">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M4 6h16M4 12h16M4 18h16" stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>

                <div class="nav-links collapsed" id="navLinks">
                    <a href="#about" class="nav-link">About</a>
                    <a href="#ecosystem" class="nav-link">Ecosystem</a>
                    <a href="#companies" class="nav-link">Companies</a>
                    <a href="#contact" class="nav-link">Contact</a>
                </div>
            </nav>
        `;
        const btn = this.shadowRoot.getElementById('menuBtn');
        const links = this.shadowRoot.getElementById('navLinks');
        if (btn && links) {
            btn.addEventListener('click', () => {
                const expanded = btn.getAttribute('aria-expanded') === 'true';
                btn.setAttribute('aria-expanded', String(!expanded));
                links.classList.toggle('collapsed');
            });
        }
    }
}

customElements.define('custom-navbar', CustomNavbar);