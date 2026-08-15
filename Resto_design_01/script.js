// Toggle Mobile Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinksBehaviour = document.querySelectorAll('.nav-links li a');
const sections = document.querySelectorAll('section, header');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});
navLinksBehaviour.forEach(link => {
    link.addEventListener('click', function () {
        // Remove 'active' class from all links
        navLinksBehaviour.forEach(item => item.classList.remove('active'));

        // Add 'active' class to the clicked link
        this.classList.add('active');
    });
});

//  ACTIVE LINK ON SCROLL
window.addEventListener('scroll', () => {
    let current = "";
    
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Detect if the scroll position is within the section (minus a small offset for the navbar)
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navLinksBehaviour.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});


// Modal Control
const modal = document.getElementById('modalOverlay');
const openBtn = document.querySelectorAll('.modalButton'); // Targets the Book a Table button
const closeBtn = document.getElementById('closeModal');

openBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
    });
});

function closeModal() {
    document.getElementById('reservationForm').reset();
    modal.classList.remove('active');
}


// Close modal if clicking outside the card
// window.addEventListener('click', (e) => {
//     if (e.target === modal) modal.classList.remove('active');
// });

// Helper to show error
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorDiv = document.getElementById(inputId + 'Error');

    // Add red border
    input.classList.add('error-border');
    
    // Show error message
    if (errorDiv) {
        errorDiv.innerText = message;
    }

    // Remove error logic
    const clearError = () => {
        input.classList.remove('error-border');
        if (errorDiv) errorDiv.innerText = "";
        input.removeEventListener('input', clearError);
        input.removeEventListener('change', clearError);
    };

    input.addEventListener('input', clearError);
    input.addEventListener('change', clearError); // Useful for <select> and <date>
}

function sendMail() {
    // 1. Get the values from the form
    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const date = document.getElementById('resDate');
    const time = document.getElementById('resTime');
    const guests = document.getElementById('guests');
    const location = document.getElementById('location');
    const note = document.getElementById('specialRequest').value;
    const now = new Date();
    let hasError = false;

    const fields = [name, phone, date, time, guests, location];
    fields.forEach(field => {
        if (!field.value || field.value === "") {
            showError(field.id, "This field is required");
            hasError = true;
        }
    });

    // 2. Check Past Date/Time
    if (date.value && time.value) {
        const now = new Date();
        const selectedDateTime = new Date(`${date.value}T${time.value}`);
        if (selectedDateTime < now) {
            showError('resTime', "Time cannot be in the past");
            hasError = true;
        }
    }

    if (hasError) return;


    // 3. Construct the Email Content
    const subject = encodeURIComponent("Table Reservation - " + name.value);

    // %0D%0A creates a new line in the email body
    const body = encodeURIComponent(
        "New Reservation Details:\n" +
        "--------------------------\n" +
        "Name: " + name.value + "\n" +
        "Phone: " + phone.value + "\n" +
        "Date: " + date.value + "\n" +
        "Time: " + time.value + "\n" +
        "Guests: " + guests.value + "\n" +
        "Location: " + location.value + "\n" +
        "Special Requests: " + note
    );

    // 4. THE MAILTO ACTION
    window.location.href = `mailto:varadivineethofficial@gmail.com?subject=${subject}&body=${body}`;

    closeModal()
}

const dateInput = document.getElementById('resDate');

// 1. Get Today's date
const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
const yyyy = today.getFullYear();
const minDate = `${yyyy}-${mm}-${dd}`;

// 2. Get the date 7 days from now
const nextWeek = new Date();
nextWeek.setDate(today.getDate() + 7);
const dd7 = String(nextWeek.getDate()).padStart(2, '0');
const mm7 = String(nextWeek.getMonth() + 1).padStart(2, '0');
const yyyy7 = nextWeek.getFullYear();
const maxDate = `${yyyy7}-${mm7}-${dd7}`;

// 3. Apply to the input
dateInput.min = minDate;
dateInput.max = maxDate;



let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlides(n) {
    // Reset index if out of bounds
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;

    // Remove active classes
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    // Set new active slide
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

// Manual control (dots)
function currentSlide(n) {
    slideIndex = n;
    showSlides(slideIndex);
}

// Auto-play (every 5 seconds)
setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
}, 5000);

window.onload = function() {
    filterMenu('mains');
};

function filterMenu(category) {
    const rows = document.querySelectorAll('.menu-row');
    const buttons = document.querySelectorAll('.tab-btn');

    // Toggle Button UI
    buttons.forEach(btn => {
        btn.classList.remove('active');
        // Match button text to the category passed
        if(btn.innerText.toLowerCase() === category.toLowerCase()) {
            btn.classList.add('active');
        }
    });

    // Filter Items
    rows.forEach(row => {
        if (row.classList.contains(category)) {
            row.style.display = 'block';
        } else {
            row.style.display = 'none';
        }
    });
}

function filterMenu(category) {
    const rows = document.querySelectorAll('.menu-row');
    const buttons = document.querySelectorAll('.tab-btn');

    // 1. Update Button UI
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase() === category.toLowerCase()) {
            btn.classList.add('active');
        }
    });

    // 2. Filter and Animate Items
    rows.forEach((row, index) => {
        // Remove animation class first to reset it
        row.classList.remove('animate-item');
        row.style.display = 'none';

        if (row.classList.contains(category)) {
            row.style.display = 'block';
            
            // Use a tiny timeout to trigger the animation browser-side
            setTimeout(() => {
                row.classList.add('animate-item');
                // Optional: Add a staggered delay so items slide in one by one
                row.style.animationDelay = `${index * 0.1}s`;
            }, 10);
        }
    });
}

// Initial call
window.onload = () => filterMenu('mains');


function moveCarousel(direction) {
    const carousel = document.getElementById('carousel');
    
    // Get the width of ONE item (since they are 100% width)
    const itemWidth = carousel.offsetWidth;
    
    // Total width of all items
    const totalWidth = carousel.scrollWidth;
    
    // Current scroll position
    const currentScroll = carousel.scrollLeft;

    if (direction === 1) {
        // NEXT: Check if we are on the last item
        if (currentScroll + itemWidth >= totalWidth - 10) {
            // Loop back to start
            carousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            // Move one item right
            carousel.scrollBy({ left: itemWidth, behavior: 'smooth' });
        }
    } else {
        // PREV: Check if we are on the first item
        if (currentScroll <= 10) {
            // Loop to the end
            carousel.scrollTo({ left: totalWidth, behavior: 'smooth' });
        } else {
            // Move one item left
            carousel.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        }
    }
}

// Optional: Auto-play every 5 seconds
setInterval(() => {
    moveCarousel(1);
}, 5000);


function moveReviews(direction) {
    const track = document.getElementById('review-track');
    const scrollAmount = track.offsetWidth; // Width of visible area (3 items)

    if (direction === 1) {
        // If at the end, loop to start
        if (track.scrollLeft + track.offsetWidth >= track.scrollWidth - 10) {
            track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    } else {
        // If at the start, loop to end
        if (track.scrollLeft <= 0) {
            track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
        } else {
            track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    }
}

// Auto-loop every 8 seconds
setInterval(() => {
    moveReviews(1);
}, 8000);

