const toggleButton = document.getElementById("menuToggle");
const navMenu = document.getElementById("mobileMenu");
const closeButton = document.getElementById("close_menu");
const menuItems = navMenu.querySelectorAll("ul li");

const openTl = gsap.timeline({ paused: true });

openTl
    .to(navMenu, {
        duration: 0.3,
        x: "0%",
        ease: "power3.out",
    })
    .to(
        menuItems,
        {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
        },
        "-=0.2"
    );

toggleButton.addEventListener("click", () => {
    navMenu.style.display = "flex";
    openTl.restart();
});

closeButton.addEventListener("click", () => {
    gsap.to(navMenu, {
        duration: 0.1,
        x: "100%",
        ease: "power3.in",
        onComplete: () => {
            navMenu.style.display = "none";
            gsap.set(menuItems, { opacity: 0, y: 20 });
        },
    });
});

// format address
const addressTextEl = document.querySelectorAll(".address_value");
const copyButtons = document.querySelectorAll(".copy_btn");

addressTextEl.forEach((el) => {
    const fullAddress = el.textContent.trim();
    el.dataset.full = fullAddress; // <== Lưu giá trị gốc vào dataset
    el.textContent = formatAddress(fullAddress);
});

function formatAddress(address, start = 14, end = 14) {
    if (!address || address.length <= start + end) return address;
    return `${address.slice(0, start)}...${address.slice(-end)}`;
}

copyButtons.forEach((item) => {
    item.addEventListener("click", () => {
        const addressEl = item
            .closest(".home_address_value")
            .querySelector(".address_value");
        const fullAddress = addressEl.dataset.full; // <== Lấy giá trị gốc từ dataset
        console.log(fullAddress);
        navigator.clipboard
            .writeText(fullAddress)
            .then(() => {
                const originalText = item.textContent;
                item.textContent = "Copied!";
                setTimeout(() => {
                    item.textContent = originalText;
                }, 2000);
            })
            .catch(() => {
                alert("Copy failed. Please try again.");
            });
    });
});

// Smooth scroll to sections
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll("nav ul li a");
const dots = document.querySelectorAll(".dot");
const leftArrow = document.querySelector(".arr_left");
const rightArrow = document.querySelector(".arr_right");

let currentIndex = 0;

function showSection(index) {
    // Hiển thị đúng section
    sections.forEach((sec, i) => {
        sec.style.display = i === index ? "block" : "none";
    });

    // Active dot
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });

    // Active menu
    navLinks.forEach((link, i) => {
        link.classList.toggle("active", i === index);
    });

    // Ẩn/hiện mũi tên
    leftArrow.style.display = index === 0 ? "none" : "block";
    rightArrow.style.display = index === sections.length - 1 ? "none" : "block";

    currentIndex = index;
}

showSection(0); // khởi tạo

// Nav click
navLinks.forEach((link, i) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        showSection(i);

        if (window.innerWidth <= 768) {
            gsap.to(navMenu, {
                duration: 0.1,
                x: "100%",
                ease: "power3.in",
                onComplete: () => {
                    navMenu.style.display = "none";
                    gsap.set(menuItems, { opacity: 0, y: 20 });
                },
            });
        }
    });
});

// Dots click
dots.forEach((dot, i) => {
    dot.addEventListener("click", () => showSection(i));
});

// Mũi tên trái
leftArrow.addEventListener("click", () => {
    if (currentIndex > 0) showSection(currentIndex - 1);
});

// Mũi tên phải
rightArrow.addEventListener("click", () => {
    if (currentIndex < sections.length - 1) showSection(currentIndex + 1);
});
