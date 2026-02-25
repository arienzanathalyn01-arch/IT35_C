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
            }
        });
    });
});
