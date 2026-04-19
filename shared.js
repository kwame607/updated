/* WiseWave shared JS */
(function(){
  // Theme
  const saved = localStorage.getItem('ww-theme') || 'light';
  document.documentElement.dataset.theme = saved;

  window.toggleTheme = function(){
    const h = document.documentElement;
    const next = h.dataset.theme === 'light' ? 'dark' : 'light';
    h.dataset.theme = next;
    localStorage.setItem('ww-theme', next);
  };

  // Mobile menu
  window.toggleMobile = function(){
    const m = document.getElementById('mobileMenu');
    if(m) m.classList.toggle('open');
  };

  // Scroll fade-in
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
  },{threshold:.08});
  document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('.fade-in').forEach(el=>obs.observe(el));
    // active nav link
    const path = location.pathname.split('/').pop() || 'home.html';
    document.querySelectorAll('.ww-nav-links a, .mobile-menu a').forEach(a=>{
      const href = a.getAttribute('href');
      if(href === path || (path==='' && href==='home.html')) a.classList.add('active');
    });
  });

  // Auth state (localStorage mock — replace with real backend later)
  window.getUser = ()=>{ try{ return JSON.parse(localStorage.getItem('ww-user')); }catch(e){ return null; } };
  window.setUser = (u)=>localStorage.setItem('ww-user', JSON.stringify(u));
  window.logout  = ()=>{ localStorage.removeItem('ww-user'); location.href='home.html'; };

  // Update nav auth buttons based on login state
  document.addEventListener('DOMContentLoaded',()=>{
    const user = getUser();
    const loginLink  = document.getElementById('navLogin');
    const signupLink = document.getElementById('navSignup');
    const userChip   = document.getElementById('navUser');
    if(user){
      if(loginLink)  loginLink.style.display='none';
      if(signupLink) signupLink.style.display='none';
      if(userChip){
        userChip.style.display='flex';
        userChip.querySelector('.user-name').textContent = user.name.split(' ')[0];
      }
    } else {
      if(userChip) userChip.style.display='none';
    }
  });
})();
