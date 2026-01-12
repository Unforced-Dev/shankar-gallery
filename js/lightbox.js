// Simple lightbox for gallery images
(function() {
    // Create lightbox elements
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
        <button class="lightbox-close" aria-label="Close">&times;</button>
        <button class="lightbox-prev" aria-label="Previous">&larr;</button>
        <button class="lightbox-next" aria-label="Next">&rarr;</button>
        <img class="lightbox-image" src="" alt="">
        <div class="lightbox-caption"></div>
    `;
    document.body.appendChild(overlay);

    const lightboxImage = overlay.querySelector('.lightbox-image');
    const lightboxCaption = overlay.querySelector('.lightbox-caption');
    const closeBtn = overlay.querySelector('.lightbox-close');
    const prevBtn = overlay.querySelector('.lightbox-prev');
    const nextBtn = overlay.querySelector('.lightbox-next');

    let currentImages = [];
    let currentIndex = 0;

    // Get all gallery images
    function getGalleryImages() {
        return Array.from(document.querySelectorAll('.gallery-item img'));
    }

    // Open lightbox
    function openLightbox(index) {
        currentImages = getGalleryImages();
        currentIndex = index;
        showImage();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    function closeLightbox() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Show current image
    function showImage() {
        const img = currentImages[currentIndex];
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxCaption.textContent = img.alt || img.closest('.gallery-item').querySelector('.caption')?.textContent || '';

        // Show/hide nav buttons
        prevBtn.style.display = currentImages.length > 1 ? 'block' : 'none';
        nextBtn.style.display = currentImages.length > 1 ? 'block' : 'none';
    }

    // Navigate
    function showPrev() {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        showImage();
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % currentImages.length;
        showImage();
    }

    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!overlay.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });

    // Attach click handlers to gallery images
    document.addEventListener('click', function(e) {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            const img = galleryItem.querySelector('img');
            if (img) {
                e.preventDefault();
                const images = getGalleryImages();
                const index = images.indexOf(img);
                if (index !== -1) {
                    openLightbox(index);
                }
            }
        }
    });
})();
