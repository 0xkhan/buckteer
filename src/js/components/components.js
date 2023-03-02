// Resizes textarea in modal - the story textarea
export const resizeTextarea = function() {
    const story = document.getElementById('story');
    story.addEventListener("input", function() {
        this.style.height = "2.5rem";
        this.style.height = `${this.scrollHeight}px`;
    });
};

// Moves the marker to the clicked item
export const navMarker = function(marker, navItems) {
    const indicator = function(event) {
        marker.style.left = `${event.offsetLeft}px`;
        marker.style.width = `${event.offsetWidth}px`;
    }

    indicator(navItems[0]);

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            indicator(e.target);
        });
    });
};
