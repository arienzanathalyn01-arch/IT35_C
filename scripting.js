document.addEventListener('DOMContentLoaded', function() {
    function showSection(sectionId) {
        document.querySelectorAll('section').forEach(sec => {
            sec.style.display = 'none';
        });
        const section = document.getElementById(sectionId);
        if (section) section.style.display = 'block';
    }
    showSection('home');
    document.querySelectorAll('.side-menu a, .home-btn').forEach(link => {
        link.addEventListener('click', function(e) {
            const id = this.getAttribute('href').replace('#', '');
            if (document.getElementById(id)) {
                e.preventDefault();
                showSection(id);
                document.getElementById('sideMenu').classList.remove('open');
                document.body.classList.remove('menu-open');
            }
        });
    });
    const openMenu = document.getElementById('openMenu');
    const closeMenu = document.getElementById('closeMenu');
    const sideMenu = document.getElementById('sideMenu');
    openMenu.onclick = function() {
        sideMenu.classList.add('open');
        document.body.classList.add('menu-open');
    };
    closeMenu.onclick = function() {
        sideMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
    };
    document.addEventListener('click', function(e) {
        if (sideMenu.classList.contains('open') && !sideMenu.contains(e.target) && e.target !== openMenu) {
            sideMenu.classList.remove('open');
            document.body.classList.remove('menu-open');
        }
    });
});
