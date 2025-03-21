
//Color each country based on the price index Take this from database
const countryIndexData = [
    { id: "US", index: 5 },
    { id: "FR", index: 15 },
    { id: "IT", index: 45 },
    { id: "AD", index: 3 },
    { id: "AE", index: 12 },
];

function getColorByPriceIndex(index) {
    if (index < 10) {
        return ' #ff0088';
    }
    else if (index >= 10 && index < 20) {
        return ' #aa12de';
    }

    else {
        return 'white';
    }
}



window.onload = function () {

    const tooltip = document.getElementById('tooltip');
    const countries = document.querySelectorAll('#eu-map path');
    let chartInstance = null;
    let lastMouseX = 0, lastMouseY = 0;
    let isTooltipVisible = false;

    countries.forEach(country => {
        country.addEventListener('mouseenter', (e) => {
            const countryName = e.target.getAttribute('title');
            const priceData = {
                labels: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
                datasets: [{
                    label: countryName,
                    data: [120, 150, 170, 130, 180, 160, 200, 210, 250],
                    backgroundColor: "rgba(255, 0, 0, 0.2)",
                    borderColor: "rgba(255, 0, 0, 1)",
                    borderWidth: 1
                },
                {
                    label: countryName + ' Nab',
                    data: [120, 156, 173, 130, 190, 160, 210, 210, 240],
                    backgroundColor: "rgba(0, 255, 0, 0.2)",
                    borderColor: "rgba(0, 255, 0, 1)",
                    borderWidth: 1
                }]
            };

            tooltip.innerHTML = `${countryName}<canvas id="priceChart" width="400" height="200"></canvas>`;
            tooltip.style.display = 'block';
            isTooltipVisible = true;

            setTimeout(() => {
                const ctx = document.getElementById("priceChart").getContext("2d");
                if (chartInstance) chartInstance.destroy();
                chartInstance = new Chart(ctx, {
                    type: "line",
                    data: priceData,
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { labels: { color: 'white' } }
                        },
                        scales: {
                            x: { ticks: { color: 'white' } },
                            y: {
                                ticks: { color: 'white' },
                                beginAtZero: true,
                                title: { display: true, text: "Price (in Euro)", color: 'white' }
                            }
                        }
                    }
                });
            }, 50);
        });

        country.addEventListener('mousemove', (e) => {
            const deltaX = Math.abs(e.pageX - lastMouseX);
            const deltaY = Math.abs(e.pageY - lastMouseY);
            if (deltaX > 5 || deltaY > 5) {
                tooltip.style.left = e.pageX + 10 + 'px';
                tooltip.style.top = e.pageY + 10 + 'px';
                lastMouseX = e.pageX;
                lastMouseY = e.pageY;
            }
        });

        country.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
            isTooltipVisible = false;
            if (chartInstance) chartInstance.destroy();
        });

        //Color each country based on the price index 
        //const index = countryIndexData.find(x=>x.id === country.id)?.index;
        //country.setAttribute("fill", getColorByPriceIndex(index));

        //Side bar control
        const sideMenu = document.getElementById("side-menu");

        country.addEventListener("click", () => {
            if (sideMenu.style.left === "0px") {
                sideMenu.style.left = "-250px"; // Hide menu
            } else {
                sideMenu.style.left = "0px"; // Show menu
            }
        });
        

    });

    // SVG Dragging Functionality
    const svg = document.getElementById('eu-map');
    let isDragging = false;
    let startX, startY, initialViewBox;

    svg.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialViewBox = svg.getAttribute('viewBox').split(' ').map(parseFloat);
        svg.style.cursor = 'grabbing';
    });

    svg.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const dx = (e.clientX - startX) * 1.5;
            const dy = (e.clientY - startY) * 1.5;
            svg.setAttribute('viewBox', `${initialViewBox[0] - dx} ${initialViewBox[1] - dy} ${initialViewBox[2]} ${initialViewBox[3]}`);
        }
    });

    svg.addEventListener('mouseup', () => {
        isDragging = false;
        svg.style.cursor = 'grab';
    });

    svg.addEventListener('mouseleave', () => {
        isDragging = false;
        svg.style.cursor = 'grab';
    });


    //SVG Zoom 

    const viewBox = svg.viewBox.baseVal;

    function zoomIn() {
        viewBox.width *= 0.9;
        viewBox.height *= 0.9;
        viewBox.x += viewBox.width * 0.05;
        viewBox.y += viewBox.height * 0.05;
    };

    function zoomOut() {
        viewBox.width /= 0.9;
        viewBox.height /= 0.9;
        viewBox.x -= viewBox.width * 0.05;
        viewBox.y -= viewBox.height * 0.05;
    };

    svg.addEventListener("wheel", (e) => {
        e.preventDefault();

        if (e.deltaY < 0) {
            zoomIn();
        } else {
            zoomOut();
        }
    });

    document.getElementById('zoom-in-btn').addEventListener("click", (e) => {
        e.preventDefault();
        zoomIn();
    });

    document.getElementById('zoom-out-btn').addEventListener("click", (e) => {
        e.preventDefault();
        zoomOut();
    });

    document.getElementById('zoom-reset-btn').addEventListener("click", (e) => {
        e.preventDefault();
        svg.setAttribute("viewBox", "0 0 1000 800");
    });

    //Side bar open close control
    const menuToggle = document.getElementById("menu-toggle");
    const sideMenu = document.getElementById("side-menu");

    // menuToggle.addEventListener("click", () => {
    //     if (sideMenu.style.left === "0px") {
    //         sideMenu.style.left = "-250px"; // Hide menu
    //     } else {
    //         sideMenu.style.left = "0px"; // Show menu
    //     }
    // });

};