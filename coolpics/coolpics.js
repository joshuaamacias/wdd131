document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu");
    const navLinks = document.querySelector(".nav-links");

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", () => {
            navLinks.classList.toggle("show");
        });

        // Ensure menu is always visible on large screens
        window.addEventListener("resize", () => {
            if (window.innerWidth >= 700) {
                navLinks.classList.remove("hide", "show");
            } else {
                navLinks.classList.add("hide");
            }
        });
    }

    // ✅ Ensure the event listener for images is working
    const gallery = document.querySelector(".gallery");
    if (gallery) {
        gallery.addEventListener("click", viewHandler);
    }
});

/**
 * Generates the modal (viewer) for the full-size image.
 */
function viewerTemplate(pic, alt) {
    return `<div class="viewer show">
        <button class="close-viewer">X</button>
        <div class="viewer-content">
            <img src="${pic}" alt="${alt}">
        </div>
    </div>`;
}

/**
 * Handles clicks on gallery images to open the modal.
 */
function viewHandler(event) {
    const clickedElement = event.target;

    if (clickedElement.tagName === "IMG") {
        const imgSrc = clickedElement.src;
        const imgAlt = clickedElement.alt;

        // ✅ Fixing the image path issue
        const imgBaseName = imgSrc.replace("-sm.jpeg", ""); 
        const fullImg = imgBaseName + "-full.jpeg";

        // ✅ Ensure modal is inserted into the DOM
        document.body.insertAdjacentHTML("afterbegin", viewerTemplate(fullImg, imgAlt));

        // ✅ Close modal when clicking "X" or outside
        document.querySelector(".close-viewer").addEventListener("click", closeViewer);
        document.querySelector(".viewer").addEventListener("click", (e) => {
            if (e.target === document.querySelector(".viewer")) {
                closeViewer();
            }
        });
    }
}

/**
 * Removes the modal from the DOM when closing.
 */
function closeViewer() {
    const viewer = document.querySelector(".viewer");
    if (viewer) {
        viewer.remove();
    }
}
