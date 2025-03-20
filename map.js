// Tooltip functionality on hover
const tooltip = document.getElementById('tooltip');
const countries = document.querySelectorAll('#eu-map path');

countries.forEach(country => {
    country.addEventListener('mouseenter', (e) => {
        const countryName = e.target.getAttribute('title');
        tooltip.innerHTML = countryName;
        tooltip.style.display = 'block';
    });

    country.addEventListener('mousemove', (e) => {
        tooltip.style.left = e.pageX + 10 + 'px';
        tooltip.style.top = e.pageY + 10 + 'px';
    });

    country.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
});