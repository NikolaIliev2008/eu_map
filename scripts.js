// Color each country based on the price index (if needed)
const countryIndexData = [
    { id: "US", index: 5 },
    { id: "FR", index: 15 },
    { id: "IT", index: 45 },
    { id: "AD", index: 3 },
    { id: "AE", index: 12 },
];

function getColorByPriceIndex(index) {
    if (index < 10) {
        return '#ff0088';
    } else if (index >= 10 && index < 20) {
        return '#aa12de';
    } else {
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
        country.addEventListener('mouseenter', async (e) => {
            const countryCode = e.target.id; // Get the country code from the SVG path's ID
            const countryName = e.target.getAttribute('title'); // Get the country name from the SVG title attribute

            try {
                // Fetch data from the backend
                const response = await fetch(`http://localhost:3006/user/${countryCode}`);
                const data = await response.json();

                // Prepare data for the chart
                const labels = data.map(entry => entry.Year_buying); // Years
                const price2Rooms = data.map(entry => entry.Price_2_rooms); // Prices for 2-room properties
                const price3Rooms = data.map(entry => entry.Price_3_rooms); // Prices for 3-room properties
                const priceHouse = data.map(entry => entry.Price_house); // Prices for houses

                // Create the chart dataset
                const priceData = {
                    labels: labels,
                    datasets: [
                        {
                            label: `${countryName} - 2 Rooms`,
                            data: price2Rooms,
                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                            borderColor: "rgba(255, 0, 0, 1)",
                            borderWidth: 1
                        },
                        {
                            label: `${countryName} - 3 Rooms`,
                            data: price3Rooms,
                            backgroundColor: "rgba(0, 255, 0, 0.2)",
                            borderColor: "rgba(0, 255, 0, 1)",
                            borderWidth: 1
                        },
                        {
                            label: `${countryName} - House`,
                            data: priceHouse,
                            backgroundColor: "rgba(0, 0, 255, 0.2)",
                            borderColor: "rgba(0, 0, 255, 1)",
                            borderWidth: 1
                        }
                    ]
                };

                // Display the tooltip with the chart
                tooltip.innerHTML = `${countryName}<canvas id="priceChart" width="400" height="200"></canvas>`;
                tooltip.style.display = 'block';
                isTooltipVisible = true;

                // Render the chart
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
            } catch (error) {
                console.error('Error fetching data:', error);
                tooltip.innerHTML = `Failed to load data for ${countryName}`;
                tooltip.style.display = 'block';
            }
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

        // Sidebar control
        const sideMenu = document.getElementById("side-menu");

        country.addEventListener("click", () => {
            if (sideMenu.style.left === "0px") {
                sideMenu.style.left = "-38%"; // Hide menu
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

    // SVG Zoom
    const viewBox = svg.viewBox.baseVal;

    function zoomIn() {
        viewBox.width *= 0.9;
        viewBox.height *= 0.9;
        viewBox.x += viewBox.width * 0.05;
        viewBox.y += viewBox.height * 0.05;
    }

    function zoomOut() {
        viewBox.width /= 0.9;
        viewBox.height /= 0.9;
        viewBox.x -= viewBox.width * 0.05;
        viewBox.y -= viewBox.height * 0.05;
    }

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

    // Sidebar open/close control
    const sideMenu = document.getElementById("side-menu");
    const closeSidebar = document.getElementById("close-sidebar");
    const menuToggle = document.getElementById("menu-toggle");

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            if (sideMenu.style.left === "0px") {
                sideMenu.style.left = "-38%"; // Hide menu
            } else {
                sideMenu.style.left = "0px"; // Show menu
            }
        });
    }

    if (closeSidebar) {
        closeSidebar.addEventListener("click", () => {
            sideMenu.style.left = "-38%"; // Hide menu
        });
    }
};