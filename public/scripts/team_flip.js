document.addEventListener('DOMContentLoaded', function () {
    const teamCards = document.querySelectorAll('.team-card');

    teamCards.forEach(card => {
        card.addEventListener('click', function () {
            // Check if the screen width is for mobile
            if (window.innerWidth <= 1000) {
                this.querySelector('.team-inner').classList.toggle('flipped');
            }
        });
    });
});
