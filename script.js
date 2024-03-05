//CAROUSEL
function showImage(index) {
    document.querySelectorAll('#carousel img').forEach(img => {
      img.classList.add('hidden');
    });
    document.querySelector(`#carousel img:nth-child(${index})`).classList.remove('hidden');
  }
function autoPlay() {
    let currentIndex = 1; 
    function showNextImage() {
        showImage(currentIndex);
        currentIndex = (currentIndex % document.querySelectorAll('#carousel img').length) + 1;
    }

    setInterval(showNextImage, 2000);
}
autoPlay();

// Hamburger menu
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('open').classList.remove('hidden');
    document.getElementById('menuToggleBtn').addEventListener('click', function() {
        var menu = document.getElementById('menu');
        menu.classList.toggle('hidden');
        var open = document.getElementById('open');
        var close = document.getElementById('close');
        if (open.classList.contains('hidden')) {
            open.classList.remove('hidden');
            close.classList.add('hidden');
        } else {
            open.classList.add('hidden');
            close.classList.remove('hidden');
        }
    });
});

// SCROLL TO TOP BUTTON
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const sectionToReach = document.getElementById('services');

    // Add event listener for scroll events
    window.addEventListener('scroll', function() {
        // Determine the scroll position
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        // Determine when to display the button
        if (scrollPosition >= sectionToReach.offsetTop) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Add event listener to scroll to top when the button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

//  FOOTER & NAV LINKS 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// MODAL WINDOW
document.addEventListener('DOMContentLoaded', function() {
    const seeMoreLinks = document.querySelectorAll('.see-more');
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('close-btn');
    const modalContent = document.getElementById('modal-content');

    seeMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            // event listener to close modal when clicking outside of it
            window.addEventListener('click', closeModalOutside);
            // Prevent scrolling on the main page when modal is open
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal();
    });

    function closeModal() {
        modal.style.display = 'none';
        // Remove event listener for closing modal when clicking outside of it
        window.removeEventListener('click', closeModalOutside);
        // Restore scrolling on the main page when modal is closed
        document.body.style.overflow = 'auto';
    }

    function closeModalOutside(event) {
        if (event.target === modal) {
            closeModal();
        }
    }

    // Allow scrolling inside the modal while preventing scrolling on the main page
    modalContent.addEventListener('scroll', function(e) {
        e.stopPropagation();
    });
});

// Form
const scriptURL = 'https://script.google.com/macros/s/AKfycbxUwWIRgLrsn9bVJCdTdBIuzs7GlNxpIc2wb8NaP05TRZnggZcW925KdMg6ELlPLx4Wbg/exec' //your script link

const form = document.forms['contact-form'] //form name

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! your details are submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})
