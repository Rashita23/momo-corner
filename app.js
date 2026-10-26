/**
 * MOMO CORNER - Main Application Logic & UI Handlers
 * ==================================================
 * Renders UI components from RESTAURANT_CONFIG and MENU_ITEMS,
 * manages filtering, search, gallery lightbox, contact form,
 * scrollspy, and interactive behaviors.
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  renderHeroData();
  renderSpecials();
  renderMenuCategories();
  renderMenuItems();
  renderTeam();
  renderGallery();
  renderReviews();
  renderWhyChooseUs();
  renderLocationAndHours();
  initMenuFiltersAndSearch();
  initGalleryLightbox();
  initContactForm();
  initScrollEffects();

  if (window.lucide) {
    window.lucide.createIcons();
  }
});

/**
 * 1. NAVBAR & MOBILE DRAWER
 */
function initNavbar() {
  const navbar = document.getElementById("main-navbar");
  const mobileToggle = document.getElementById("mobile-menu-btn");
  const mobileDrawer = document.getElementById("mobile-menu-drawer");
  const mobileClose = document.getElementById("mobile-menu-close");
  const navLinks = document.querySelectorAll(".nav-link");

  // Sticky navbar shadow on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar.classList.add("bg-stone-900/95", "backdrop-blur-md", "shadow-xl", "py-3");
      navbar.classList.remove("py-5", "bg-stone-900/80");
    } else {
      navbar.classList.remove("bg-stone-900/95", "backdrop-blur-md", "shadow-xl", "py-3");
      navbar.classList.add("py-5", "bg-stone-900/80");
    }
  });

  // Mobile menu drawer
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener("click", () => {
      mobileDrawer.classList.remove("-translate-x-full");
      document.body.classList.add("overflow-hidden");
    });
  }

  const closeMobile = () => {
    if (mobileDrawer) {
      mobileDrawer.classList.add("-translate-x-full");
      document.body.classList.remove("overflow-hidden");
    }
  };

  if (mobileClose) mobileClose.addEventListener("click", closeMobile);

  // Close mobile drawer when clicking any link
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobile);
  });

  // ScrollSpy: highlight active link as user scrolls
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("text-amber-500", "font-bold");
            link.classList.remove("text-stone-300");
          } else {
            link.classList.remove("text-amber-500", "font-bold");
            link.classList.add("text-stone-300");
          }
        });
      }
    });
  });
}

/**
 * 2. HERO DATA & CONTACT STATUS
 */
function renderHeroData() {
  const phoneLinks = document.querySelectorAll(".contact-phone-link");
  phoneLinks.forEach((el) => {
    if (RESTAURANT_CONFIG.phoneNumber && RESTAURANT_CONFIG.phoneNumber.trim()) {
      el.href = `tel:${RESTAURANT_CONFIG.phoneNumber.replace(/\s+/g, "")}`;
      el.textContent = RESTAURANT_CONFIG.phoneNumber;
      el.classList.remove("cursor-default");
    } else {
      el.removeAttribute("href");
      el.textContent = RESTAURANT_CONFIG.contactStatusMessage || "Contact information will be available soon.";
      el.classList.add("cursor-default");
    }
  });

  const whatsappLinks = document.querySelectorAll(".contact-wa-link");
  whatsappLinks.forEach((el) => {
    if (RESTAURANT_CONFIG.whatsappNumber && RESTAURANT_CONFIG.whatsappNumber.trim()) {
      el.href = `https://wa.me/${RESTAURANT_CONFIG.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hello Momo Corner! I would like to enquire about your menu.")}`;
      el.target = "_blank";
      el.onclick = null;
    } else {
      el.href = "#";
      el.removeAttribute("target");
      el.onclick = function (e) {
        e.preventDefault();
        showDemoOrderingNotice(e);
      };
    }
  });
}

/**
 * 3. FEATURED SPECIALS SECTION
 */
function renderSpecials() {
  const container = document.getElementById("specials-grid");
  if (!container) return;

  container.innerHTML = FEATURED_SPECIALS.map((dish) => {
    return `
      <div class="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-orange-100 flex flex-col transform hover:-translate-y-1.5">
        <div class="relative overflow-hidden aspect-[4/3]">
          <img src="${dish.image}" alt="${dish.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" onerror="this.src='assets/images/10.jpg'">
          <div class="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent"></div>
          
          <div class="absolute top-4 left-4 flex gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-md ${
              dish.badge.includes("Chef") ? "bg-red-600 text-white" : "bg-amber-500 text-stone-950"
            }">
              ${dish.badge}
            </span>
          </div>

          <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow">
            <span class="inline-block w-3.5 h-3.5 rounded-sm border ${dish.isVeg ? "border-green-600" : "border-red-600"} flex items-center justify-center">
              <span class="w-2 h-2 rounded-full ${dish.isVeg ? "bg-green-600" : "bg-red-600"}"></span>
            </span>
          </div>

          <div class="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <span class="text-xs text-orange-200 font-medium">${dish.tagline}</span>
            <span class="text-2xl font-black text-white drop-shadow">${RESTAURANT_CONFIG.currency.symbol}${dish.price}</span>
          </div>
        </div>

        <div class="p-6 flex-1 flex flex-col justify-between bg-white">
          <div>
            <h3 class="text-xl font-bold text-stone-900 group-hover:text-red-600 transition mb-2">${dish.name}</h3>
            <p class="text-stone-600 text-sm leading-relaxed mb-4">${dish.description}</p>
          </div>

          <div class="pt-2 flex justify-center" data-card-id="${dish.menuId}">
            <button onclick="window.cart.addItem('${dish.menuId}')" class="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-2.5 px-4 rounded-full shadow hover:shadow-lg transition flex items-center justify-center gap-2 group/btn active:scale-95 text-sm">
              <span>Add to Cart</span>
              <svg class="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

/**
 * 4. MENU CATEGORY TABS
 */
function renderMenuCategories() {
  const container = document.getElementById("category-tabs-container");
  if (!container) return;

  container.innerHTML = MENU_CATEGORIES.map((cat, idx) => `
    <button data-category="${cat.id}" class="category-filter-btn flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 whitespace-nowrap shadow-sm border ${
      idx === 0
        ? "bg-red-600 text-white border-red-600 shadow-md scale-105"
        : "bg-white text-stone-700 border-stone-200 hover:border-amber-400 hover:text-red-600"
    }">
      <span>${cat.icon}</span>
      <span>${cat.name}</span>
    </button>
  `).join("");
}

/**
 * 5. MENU CARDS RENDERING
 */
let currentCategory = "all";
let currentDiet = "all"; // 'all', 'veg', 'nonveg'
let searchQuery = "";

function renderMenuItems() {
  const container = document.getElementById("menu-grid");
  const countEl = document.getElementById("menu-results-count");
  if (!container) return;

  const filtered = MENU_ITEMS.filter((item) => {
    const matchesCat = currentCategory === "all" || item.category === currentCategory;
    const matchesDiet =
      currentDiet === "all" ||
      (currentDiet === "veg" && item.isVeg) ||
      (currentDiet === "nonveg" && !item.isVeg);
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesDiet && matchesSearch;
  });

  if (countEl) {
    countEl.textContent = `Showing ${filtered.length} of ${MENU_ITEMS.length} items`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center bg-white rounded-3xl border border-dashed border-stone-300 p-8">
        <div class="text-5xl mb-4">🔍</div>
        <h3 class="text-xl font-bold text-stone-800 mb-2">No Momos Found</h3>
        <p class="text-stone-500 max-w-md mx-auto mb-6 text-sm">We couldn't find any dishes matching "${searchQuery}". Try selecting another category or resetting the search filter.</p>
        <button id="reset-filters-btn" class="bg-red-600 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow hover:bg-red-700 transition">
          Reset All Filters
        </button>
      </div>
    `;
    const resetBtn = document.getElementById("reset-filters-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        currentCategory = "all";
        currentDiet = "all";
        searchQuery = "";
        const searchInput = document.getElementById("menu-search-input");
        if (searchInput) searchInput.value = "";
        renderMenuCategories();
        renderMenuItems();
        initCategoryEvents();
      });
    }
    return;
  }

  container.innerHTML = filtered.map((item) => {
    return `
      <div class="group bg-white rounded-2xl overflow-hidden border border-orange-100 hover:border-amber-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1">
        <div>
          <div class="relative overflow-hidden aspect-[16/10]">
            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" onerror="this.src='assets/images/10.jpg'">
            <div class="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent"></div>
            
            <div class="absolute top-3 left-3">
              <span class="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md shadow-sm border border-stone-200">
                <span class="inline-block w-3 h-3 rounded-sm border ${item.isVeg ? "border-green-600" : "border-red-600"} flex items-center justify-center">
                  <span class="w-1.5 h-1.5 rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-600"}"></span>
                </span>
                <span class="text-[11px] font-bold tracking-wider ${item.isVeg ? "text-green-800" : "text-red-800"}">
                  ${item.isVeg ? "VEG" : "NON-VEG"}
                </span>
              </span>
            </div>

            ${
              item.badge
                ? `<div class="absolute top-3 right-3">
                    <span class="px-2.5 py-1 bg-amber-500/95 text-stone-950 font-bold text-[11px] rounded-full shadow-sm">
                      ${item.badge}
                    </span>
                  </div>`
                : ""
            }

            <div class="absolute bottom-2.5 left-3 text-xs text-orange-200 font-medium">
              ${item.pieces || "6 Pcs"}
            </div>
          </div>

          <div class="p-4">
            <div class="flex items-start justify-between gap-2 mb-1.5">
              <h3 class="font-bold text-stone-900 text-base group-hover:text-red-600 transition leading-snug">
                ${item.name}
              </h3>
            </div>
            <p class="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
              ${item.description}
            </p>
          </div>
        </div>

        <div class="p-4 pt-0">
          <div class="flex items-center justify-between pt-3 border-t border-stone-100">
            <div>
              <span class="text-xs text-stone-600 block">Price</span>
              <span class="text-lg font-black text-stone-900">${RESTAURANT_CONFIG.currency.symbol}${item.price}</span>
            </div>
            <div class="w-auto flex justify-end flex-1 max-w-[145px]" data-card-id="${item.id}">
              <!-- Cart quantity button populated by window.cart.updateMenuButtons() -->
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");

  if (window.cart) {
    window.cart.updateMenuButtons();
  }
}

/**
 * 6. MENU FILTERS & SEARCH EVENTS
 */
function initMenuFiltersAndSearch() {
  initCategoryEvents();

  // Search input
  const searchInput = document.getElementById("menu-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      renderMenuItems();
    });
  }

  // Diet filter buttons (All, Pure Veg, Non-Veg)
  const dietButtons = document.querySelectorAll(".diet-filter-btn");
  dietButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      dietButtons.forEach((b) => {
        b.classList.remove("bg-stone-900", "text-white");
        b.classList.add("bg-white", "text-stone-700");
      });
      btn.classList.add("bg-stone-900", "text-white");
      btn.classList.remove("bg-white", "text-stone-700");
      currentDiet = btn.getAttribute("data-diet");
      renderMenuItems();
    });
  });
}

function initCategoryEvents() {
  const catButtons = document.querySelectorAll(".category-filter-btn");
  catButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      catButtons.forEach((b) => {
        b.classList.remove("bg-red-600", "text-white", "border-red-600", "scale-105");
        b.classList.add("bg-white", "text-stone-700", "border-stone-200");
      });
      btn.classList.add("bg-red-600", "text-white", "border-red-600", "scale-105");
      btn.classList.remove("bg-white", "text-stone-700", "border-stone-200");

      currentCategory = btn.getAttribute("data-category");
      renderMenuItems();
    });
  });
}

/**
 * 7. OUR TEAM
 */
function renderTeam() {
  const container = document.getElementById("team-grid");
  if (!container) return;

  container.innerHTML = TEAM_MEMBERS.map((member) => `
    <div class="group bg-white rounded-3xl p-6 text-center border border-orange-100 hover:border-amber-300 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div class="relative w-36 h-36 mx-auto mb-4 rounded-full p-1.5 bg-gradient-to-tr from-red-600 via-amber-400 to-orange-500 shadow-md group-hover:scale-105 transition-transform duration-300">
        <img src="${member.image}" alt="${member.name}" class="w-full h-full object-cover rounded-full" loading="lazy" onerror="this.src='assets/images/7.jpg'">
        <span class="absolute bottom-1 right-2 bg-stone-900 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border border-white">
          ${member.badge}
        </span>
      </div>
      <h3 class="text-lg font-bold text-stone-900 mb-1">${member.name}</h3>
      <p class="text-xs font-semibold text-red-600 uppercase tracking-wider mb-3">${member.role}</p>
      <p class="text-xs text-stone-600 leading-relaxed">${member.bio}</p>
    </div>
  `).join("");
}

/**
 * 8. FOOD GALLERY & LIGHTBOX
 */
let currentGalleryFilter = "all";
let activeLightboxIndex = 0;

function renderGallery() {
  const container = document.getElementById("gallery-grid");
  if (!container) return;

  const filtered = GALLERY_ITEMS.filter((item) => {
    return currentGalleryFilter === "all" || item.category === currentGalleryFilter;
  });

  container.innerHTML = filtered.map((item, index) => `
    <div class="gallery-item group relative overflow-hidden rounded-2xl cursor-pointer aspect-square shadow-md border border-orange-100" data-index="${index}">
      <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" onerror="this.src='assets/images/10.jpg'">
      <div class="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <span class="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">${item.category}</span>
        <h4 class="text-white font-bold text-sm mb-1">${item.title}</h4>
        <p class="text-stone-300 text-xs line-clamp-1">${item.caption}</p>
        <div class="mt-2 text-white/80 flex items-center gap-1 text-[11px]">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
          <span>Click to enlarge</span>
        </div>
      </div>
    </div>
  `).join("");

  // Attach click listener for lightbox
  const items = container.querySelectorAll(".gallery-item");
  items.forEach((el) => {
    el.addEventListener("click", () => {
      const idx = parseInt(el.getAttribute("data-index"), 10);
      openLightbox(idx, filtered);
    });
  });
}

function initGalleryLightbox() {
  // Gallery filter tabs
  const filterBtns = document.querySelectorAll(".gallery-filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => {
        b.classList.remove("bg-red-600", "text-white");
        b.classList.add("bg-white", "text-stone-700");
      });
      btn.classList.add("bg-red-600", "text-white");
      btn.classList.remove("bg-white", "text-stone-700");
      currentGalleryFilter = btn.getAttribute("data-filter");
      renderGallery();
    });
  });

  const lightbox = document.getElementById("gallery-lightbox");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!lightbox || lightbox.classList.contains("hidden")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft" && prevBtn) prevBtn.click();
    if (e.key === "ArrowRight" && nextBtn) nextBtn.click();
  });
}

function openLightbox(index, list) {
  const lightbox = document.getElementById("gallery-lightbox");
  const img = document.getElementById("lightbox-image");
  const title = document.getElementById("lightbox-title");
  const caption = document.getElementById("lightbox-caption");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  if (!lightbox || !img) return;

  activeLightboxIndex = index;

  const updateContent = (i) => {
    const item = list[i];
    if (!item) return;
    img.src = item.image;
    if (title) title.textContent = item.title;
    if (caption) caption.textContent = item.caption;
  };

  updateContent(activeLightboxIndex);

  if (prevBtn) {
    prevBtn.onclick = (e) => {
      e.stopPropagation();
      activeLightboxIndex = (activeLightboxIndex - 1 + list.length) % list.length;
      updateContent(activeLightboxIndex);
    };
  }

  if (nextBtn) {
    nextBtn.onclick = (e) => {
      e.stopPropagation();
      activeLightboxIndex = (activeLightboxIndex + 1) % list.length;
      updateContent(activeLightboxIndex);
    };
  }

  lightbox.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
}

function closeLightbox() {
  const lightbox = document.getElementById("gallery-lightbox");
  if (lightbox) {
    lightbox.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }
}

/**
 * 9. WHY CHOOSE US
 */
function renderWhyChooseUs() {
  const container = document.getElementById("why-choose-grid");
  if (!container) return;

  container.innerHTML = WHY_CHOOSE_US.map((item) => `
    <div class="bg-white rounded-2xl p-6 border border-orange-100 hover:border-amber-300 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-3xl mb-4 shadow-inner">
        ${item.icon}
      </div>
      <h3 class="text-lg font-bold text-stone-900 mb-2">${item.title}</h3>
      <p class="text-stone-600 text-xs sm:text-sm leading-relaxed">${item.description}</p>
    </div>
  `).join("");
}

/**
 * 10. CUSTOMER REVIEWS
 */
function renderReviews() {
  const container = document.getElementById("reviews-grid");
  if (!container) return;

  container.innerHTML = CUSTOMER_REVIEWS.map((rev) => {
    const stars = "★".repeat(rev.rating) + "☆".repeat(5 - rev.rating);
    return `
      <div class="bg-white rounded-3xl p-6 border border-orange-100 shadow-md hover:shadow-xl transition flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <div class="text-amber-500 text-lg tracking-widest font-black">${stars}</div>
            <span class="text-[11px] font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full">${rev.date}</span>
          </div>
          <p class="text-stone-700 text-sm leading-relaxed italic mb-6">"${rev.review}"</p>
        </div>

        <div class="flex items-center gap-3 pt-4 border-t border-stone-100">
          <img src="${rev.avatar}" alt="${rev.name}" class="w-11 h-11 rounded-full object-cover border-2 border-amber-400" loading="lazy">
          <div>
            <h4 class="font-bold text-stone-900 text-sm">${rev.name}</h4>
            <p class="text-xs text-stone-600">${rev.location}</p>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

/**
 * 11. LOCATION & REAL-TIME OPENING HOURS
 */
function renderLocationAndHours() {
  const addressEl = document.getElementById("location-address-text");
  const directionsBtn = document.getElementById("location-directions-btn");
  const hoursWeekdaysEl = document.getElementById("hours-weekdays");
  const hoursWeekendsEl = document.getElementById("hours-weekends");
  const openBadge = document.getElementById("live-open-badge");

  if (addressEl) addressEl.textContent = RESTAURANT_CONFIG.address.full;
  if (directionsBtn) directionsBtn.href = RESTAURANT_CONFIG.googleMapsDirectionsUrl;
  if (hoursWeekdaysEl) hoursWeekdaysEl.textContent = RESTAURANT_CONFIG.openingHours.weekdays;
  if (hoursWeekendsEl) hoursWeekendsEl.textContent = RESTAURANT_CONFIG.openingHours.weekends;

  // Real-time restaurant open/closed check
  if (openBadge) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();
    const currentTotalMin = currentHour * 60 + currentMin;

    const openTotalMin = RESTAURANT_CONFIG.openingHours.openHour * 60;
    const closeTotalMin = RESTAURANT_CONFIG.openingHours.closeHour * 60 + RESTAURANT_CONFIG.openingHours.closeMinutes;

    const isOpen = currentTotalMin >= openTotalMin && currentTotalMin < closeTotalMin;

    if (isOpen) {
      openBadge.innerHTML = `
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
          <span class="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
          Open Now · Serving Hot Momos!
        </span>
      `;
    } else {
      openBadge.innerHTML = `
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-stone-200 text-stone-700 border border-stone-300">
          <span class="w-2 h-2 rounded-full bg-stone-500"></span>
          Closed for Now · Opens 11:00 AM
        </span>
      `;
    }
  }
}

/**
 * 12. CONTACT FORM VALIDATION & DEMO SUBMISSION
 */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const successModal = document.getElementById("contact-success-modal");
  const modalClose = document.getElementById("contact-modal-close");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("#contact-name").value.trim();
    const emailOrPhone = form.querySelector("#contact-email-phone").value.trim();
    const subject = form.querySelector("#contact-subject").value.trim();
    const message = form.querySelector("#contact-message").value.trim();

    if (!name || !emailOrPhone || !subject || !message) {
      if (window.cart) {
        window.cart.showToast("Please fill in all contact form fields.", "error");
      }
      return;
    }

    // Show simulated success modal with transparent academic notice
    if (successModal) {
      const summary = document.getElementById("contact-feedback-summary");
      if (summary) {
        summary.textContent = `Thank you, ${name}! Your inquiry regarding "${subject}" was validated successfully. (Academic Project Demo: In production, this connects to a backend form handler like Netlify Forms or Formspree).`;
      }
      successModal.classList.remove("hidden");
      document.body.classList.add("overflow-hidden");
    }

    form.reset();
  });

  if (modalClose && successModal) {
    modalClose.addEventListener("click", () => {
      successModal.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    });
  }
}

/**
 * 13. DEMO NOTICE & RECEIPT MODAL CONTROLS
 */
function showDemoOrderingNotice(e) {
  if (e && e.preventDefault) e.preventDefault();
  const modal = document.getElementById("demo-notice-modal");
  if (modal) {
    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  }
}

function closeDemoOrderingNotice() {
  const modal = document.getElementById("demo-notice-modal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }
}

function closeDemoReceiptModal() {
  const modal = document.getElementById("demo-receipt-modal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }
}

function copyDemoReceipt() {
  const text = window._lastDemoReceiptText || "";
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    if (window.cart) {
      window.cart.showToast("Receipt text copied to clipboard! 📋", "success");
    }
  }).catch(() => {
    if (window.cart) {
      window.cart.showToast("Could not copy automatically. You can manually copy the text.", "info");
    }
  });
}

// Global modal triggers for HTML onclick bindings
window.showDemoOrderingNotice = showDemoOrderingNotice;
window.closeDemoOrderingNotice = closeDemoOrderingNotice;
window.closeDemoReceiptModal = closeDemoReceiptModal;
window.copyDemoReceipt = copyDemoReceipt;

/**
 * 13. SMOOTH SCROLLING & BACK TO TOP BUTTON
 */
function initScrollEffects() {
  const backToTopBtn = document.getElementById("back-to-top-btn");

  window.addEventListener("scroll", () => {
    if (!backToTopBtn) return;
    if (window.scrollY > 400) {
      backToTopBtn.classList.remove("opacity-0", "pointer-events-none", "translate-y-4");
      backToTopBtn.classList.add("opacity-100", "translate-y-0");
    } else {
      backToTopBtn.classList.add("opacity-0", "pointer-events-none", "translate-y-4");
      backToTopBtn.classList.remove("opacity-100", "translate-y-0");
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Smooth scroll for all internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}
