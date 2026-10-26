/**
 * MOMO CORNER - Shopping Cart & WhatsApp Ordering System
 * ======================================================
 * Manages shopping cart state, local storage persistence, item counters,
 * subtotal/total calculations, and WhatsApp order dispatching.
 */

class CartManager {
  constructor() {
    this.storageKey = "momocorner_cart";
    this.items = this.loadCart();
    this.initEvents();
    this.renderBadge();
  }

  // Load cart items from localStorage
  loadCart() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load cart from storage", e);
      return [];
    }
  }

  // Save cart items to localStorage
  saveCart() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
      this.renderBadge();
      this.renderDrawer();
      this.updateMenuButtons();
    } catch (e) {
      console.error("Failed to save cart to storage", e);
    }
  }

  // Add item or increment its quantity
  addItem(itemId, customQty = 1) {
    const menuItem = MENU_ITEMS.find((m) => m.id === itemId);
    if (!menuItem) {
      console.warn("Item not found:", itemId);
      return;
    }

    const existing = this.items.find((item) => item.id === itemId);
    if (existing) {
      existing.quantity += customQty;
    } else {
      this.items.push({
        id: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        image: menuItem.image,
        isVeg: menuItem.isVeg,
        pieces: menuItem.pieces,
        category: menuItem.category,
        quantity: customQty
      });
    }

    this.saveCart();
    this.showToast(`Added "${menuItem.name}" to cart! 🥟`, "success");
  }

  // Decrement quantity or remove if reaches 0
  decreaseItem(itemId) {
    const existingIndex = this.items.findIndex((item) => item.id === itemId);
    if (existingIndex > -1) {
      if (this.items[existingIndex].quantity > 1) {
        this.items[existingIndex].quantity -= 1;
      } else {
        const removedName = this.items[existingIndex].name;
        this.items.splice(existingIndex, 1);
        this.showToast(`Removed "${removedName}" from cart`, "info");
      }
      this.saveCart();
    }
  }

  // Remove item completely
  removeItem(itemId) {
    const existingIndex = this.items.findIndex((item) => item.id === itemId);
    if (existingIndex > -1) {
      const removedName = this.items[existingIndex].name;
      this.items.splice(existingIndex, 1);
      this.saveCart();
      this.showToast(`Removed "${removedName}"`, "info");
    }
  }

  // Clear entire cart
  clearCart() {
    this.items = [];
    this.saveCart();
    this.showToast("Your cart has been cleared", "info");
  }

  // Get total quantity of items
  getTotalQuantity() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Get subtotal price
  getSubtotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // Get packaging fee
  getPackagingFee() {
    return this.items.length > 0 ? RESTAURANT_CONFIG.packagingFee : 0;
  }

  // Get delivery fee
  getDeliveryFee(orderType = "delivery") {
    if (orderType !== "delivery" || this.items.length === 0) return 0;
    const subtotal = this.getSubtotal();
    return subtotal >= 399 ? 0 : RESTAURANT_CONFIG.deliveryFee;
  }

  // Get grand total
  getGrandTotal(orderType = "delivery") {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;
    return subtotal + this.getPackagingFee() + this.getDeliveryFee(orderType);
  }

  // Update badge counters across the page
  renderBadge() {
    const count = this.getTotalQuantity();
    const badges = document.querySelectorAll(".cart-count-badge");
    badges.forEach((b) => {
      b.textContent = count;
      if (count > 0) {
        b.classList.remove("hidden");
      } else {
        b.classList.add("hidden");
      }
    });

    const totalDisplays = document.querySelectorAll(".cart-total-badge");
    totalDisplays.forEach((td) => {
      td.textContent = `${RESTAURANT_CONFIG.currency.symbol}${this.getSubtotal()}`;
    });
  }

  // Update Add to Cart / Quantity controls on menu cards
  updateMenuButtons() {
    MENU_ITEMS.forEach((item) => {
      const cartItem = this.items.find((i) => i.id === item.id);
      const btnContainers = document.querySelectorAll(`[data-card-id="${item.id}"]`);
      btnContainers.forEach((container) => {
        if (cartItem && cartItem.quantity > 0) {
          container.innerHTML = `
            <div class="inline-flex items-center justify-between bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-bold px-2 py-1 shadow-md w-full max-w-[135px]">
              <button onclick="window.cart.decreaseItem('${item.id}')" class="w-6 h-6 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition active:scale-90 text-sm leading-none" title="Decrease">−</button>
              <span class="px-1.5 text-xs font-bold tracking-tight">${cartItem.quantity} in cart</span>
              <button onclick="window.cart.addItem('${item.id}')" class="w-6 h-6 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition active:scale-90 text-sm leading-none" title="Increase">+</button>
            </div>
          `;
        } else {
          container.innerHTML = `
            <button onclick="window.cart.addItem('${item.id}')" class="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold py-1.5 px-3 rounded-full shadow hover:shadow-md transition flex items-center justify-center gap-1.5 group active:scale-95 text-xs sm:text-sm">
              <span>Add</span>
              <svg class="w-3.5 h-3.5 transition-transform group-hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
          `;
        }
      });
    });
  }

  // Render the sliding cart drawer
  renderDrawer() {
    const listEl = document.getElementById("cart-items-list");
    const emptyEl = document.getElementById("cart-empty-state");
    const footerEl = document.getElementById("cart-footer");
    const subtotalEl = document.getElementById("cart-subtotal");
    const packagingEl = document.getElementById("cart-packaging");
    const deliveryEl = document.getElementById("cart-delivery");
    const totalEl = document.getElementById("cart-total");

    if (!listEl) return;

    if (this.items.length === 0) {
      if (emptyEl) emptyEl.classList.remove("hidden");
      if (footerEl) footerEl.classList.add("hidden");
      listEl.innerHTML = "";
      return;
    }

    if (emptyEl) emptyEl.classList.add("hidden");
    if (footerEl) footerEl.classList.remove("hidden");

    listEl.innerHTML = this.items
      .map(
        (item) => `
        <div class="flex items-center gap-3 p-3 bg-white rounded-xl border border-orange-100 shadow-sm hover:border-orange-300 transition">
          <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-lg object-cover flex-shrink-0" onerror="this.src='assets/images/10.jpg'">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-1.5 mb-0.5">
              <span class="inline-block w-3 h-3 flex-shrink-0 rounded-sm border ${
                item.isVeg ? "border-green-600" : "border-red-600"
              } flex items-center justify-center p-0.5">
                <span class="w-1.5 h-1.5 rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-600"}"></span>
              </span>
              <h4 class="font-bold text-stone-900 text-sm truncate">${item.name}</h4>
            </div>
            <p class="text-xs text-stone-500">${item.pieces || "Regular"} · ${RESTAURANT_CONFIG.currency.symbol}${item.price} each</p>
            <div class="text-sm font-bold text-red-600 mt-1">
              ${RESTAURANT_CONFIG.currency.symbol}${item.price * item.quantity}
            </div>
          </div>
          <div class="flex flex-col items-end gap-2 flex-shrink-0">
            <button onclick="window.cart.removeItem('${item.id}')" class="text-stone-400 hover:text-red-500 text-xs transition p-1" title="Remove Item">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
            <div class="flex items-center bg-stone-100 rounded-lg border border-stone-200">
              <button onclick="window.cart.decreaseItem('${item.id}')" class="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-stone-200 rounded-l transition font-bold text-sm">−</button>
              <span class="w-7 text-center text-xs font-bold text-stone-800">${item.quantity}</span>
              <button onclick="window.cart.addItem('${item.id}')" class="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-stone-200 rounded-r transition font-bold text-sm">+</button>
            </div>
          </div>
        </div>
      `
      )
      .join("");

    const subtotal = this.getSubtotal();
    const packaging = this.getPackagingFee();
    const delivery = this.getDeliveryFee();
    const grandTotal = this.getGrandTotal();

    if (subtotalEl) subtotalEl.textContent = `${RESTAURANT_CONFIG.currency.symbol}${subtotal}`;
    if (packagingEl) packagingEl.textContent = `${RESTAURANT_CONFIG.currency.symbol}${packaging}`;
    if (deliveryEl) {
      deliveryEl.textContent = delivery === 0 ? "FREE" : `${RESTAURANT_CONFIG.currency.symbol}${delivery}`;
      if (delivery === 0) deliveryEl.classList.add("text-green-600", "font-bold");
      else deliveryEl.classList.remove("text-green-600", "font-bold");
    }
    if (totalEl) totalEl.textContent = `${RESTAURANT_CONFIG.currency.symbol}${grandTotal}`;
  }

  // Toast notification message
  showToast(message, type = "success") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className = "fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 max-w-sm pointer-events-none";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `pointer-events-auto flex items-center gap-2 px-4 py-3 rounded-xl shadow-xl text-white text-sm font-medium transition-all duration-300 transform translate-y-3 opacity-0 ${
      type === "success"
        ? "bg-gradient-to-r from-stone-900 to-stone-800 border-l-4 border-amber-500"
        : type === "error"
        ? "bg-red-700"
        : "bg-stone-800"
    }`;

    toast.innerHTML = `
      <span class="text-base">${type === "success" ? "🥟" : "ℹ️"}</span>
      <span class="flex-1">${message}</span>
    `;

    container.appendChild(toast);

    // Trigger enter animation
    requestAnimationFrame(() => {
      toast.classList.remove("translate-y-3", "opacity-0");
    });

    // Fade out and remove
    setTimeout(() => {
      toast.classList.add("translate-y-3", "opacity-0");
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  // Open Checkout Modal
  openCheckoutModal() {
    if (this.items.length === 0) {
      this.showToast("Your cart is empty! Add some delicious momos first.", "error");
      return;
    }

    const modal = document.getElementById("checkout-modal");
    if (modal) {
      modal.classList.remove("hidden");
      document.body.classList.add("overflow-hidden");
      this.updateCheckoutSummary();
    }
  }

  // Close Checkout Modal
  closeCheckoutModal() {
    const modal = document.getElementById("checkout-modal");
    if (modal) {
      modal.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    }
  }

  // Update the mini-summary inside Checkout Modal
  updateCheckoutSummary() {
    const summaryList = document.getElementById("checkout-summary-list");
    const grandTotalEl = document.getElementById("checkout-grand-total");
    const orderTypeSelect = document.querySelector('input[name="orderType"]:checked');
    const orderType = orderTypeSelect ? orderTypeSelect.value : "delivery";

    if (summaryList) {
      summaryList.innerHTML = this.items
        .map(
          (item) => `
          <div class="flex justify-between items-center text-xs py-1 border-b border-stone-100 last:border-none">
            <span class="text-stone-700 font-medium">${item.quantity}x ${item.name}</span>
            <span class="font-bold text-stone-900">${RESTAURANT_CONFIG.currency.symbol}${item.price * item.quantity}</span>
          </div>
        `
        )
        .join("");
    }

    if (grandTotalEl) {
      grandTotalEl.textContent = `${RESTAURANT_CONFIG.currency.symbol}${this.getGrandTotal(orderType)}`;
    }
  }

  // Dispatch WhatsApp Order
  submitWhatsAppOrder(formData) {
    const { name, phone, orderType, tableOrAddress, instructions } = formData;

    if (!name || !name.trim()) {
      this.showToast("Please enter your name", "error");
      return;
    }

    if (!phone || !phone.trim() || phone.trim().length < 10) {
      this.showToast("Please enter a valid 10-digit phone number", "error");
      return;
    }

    if (this.items.length === 0) {
      this.showToast("Cart is empty", "error");
      return;
    }

    const subtotal = this.getSubtotal();
    const packaging = this.getPackagingFee();
    const delivery = this.getDeliveryFee(orderType);
    const grandTotal = this.getGrandTotal(orderType);

    // Build the formatted WhatsApp message text
    let message = `*🥟 NEW ORDER - MOMO CORNER 🥟*\n`;
    message += `----------------------------------------\n`;
    message += `*Customer:* ${name.trim()}\n`;
    message += `*Phone:* ${phone.trim()}\n`;
    message += `*Order Type:* ${orderType.toUpperCase()}\n`;

    if (orderType === "dine-in") {
      message += `*Table No:* ${tableOrAddress || "Counter / Next Available"}\n`;
    } else if (orderType === "delivery") {
      message += `*Delivery Address:* ${tableOrAddress || "Standard Address"}\n`;
    } else {
      message += `*Pickup Time:* Ready in ~20 mins\n`;
    }

    if (instructions && instructions.trim()) {
      message += `*Special Notes:* ${instructions.trim()}\n`;
    }

    message += `----------------------------------------\n`;
    message += `*ORDER DETAILS:*\n`;

    this.items.forEach((item, index) => {
      const vegTag = item.isVeg ? "[VEG]" : "[NON-VEG]";
      message += `${index + 1}. ${item.name} (${item.pieces || "6 Pcs"}) ${vegTag}\n`;
      message += `   Qty: ${item.quantity} x ₹${item.price} = ₹${item.price * item.quantity}\n`;
    });

    message += `----------------------------------------\n`;
    message += `*Subtotal:* ₹${subtotal}\n`;
    message += `*Packaging:* ₹${packaging}\n`;
    if (orderType === "delivery") {
      message += `*Delivery Charges:* ${delivery === 0 ? "FREE" : `₹${delivery}`}\n`;
    }
    message += `*GRAND TOTAL:* ₹${grandTotal}\n`;
    message += `----------------------------------------\n`;
    message += `*Order Placed via Momo Corner Website*\n`;
    message += `_Please confirm my order and share estimated preparation time. Thank you!_`;

    // Check if live ordering is configured
    if (!RESTAURANT_CONFIG.whatsappNumber || RESTAURANT_CONFIG.whatsappNumber.trim() === "") {
      // Academic / Portfolio Demo Mode: Do not dispatch to any number
      this.closeCheckoutModal();
      this.showDemoReceiptModal(message, formData, grandTotal);
      this.clearCart();
      this.showToast("Order calculated in Demo Mode!", "info");
      return;
    }

    const encodedMessage = encodeURIComponent(message);
    const targetWhatsApp = RESTAURANT_CONFIG.whatsappNumber.replace(/[^0-9]/g, "");
    const whatsappUrl = `https://wa.me/${targetWhatsApp}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Clear cart and show notification
    this.closeCheckoutModal();
    this.clearCart();
    this.showToast("Order initiated! Redirecting to WhatsApp...", "success");
  }

  // Display receipt calculation modal in academic demo mode
  showDemoReceiptModal(formattedText, formData, grandTotal) {
    const modal = document.getElementById("demo-receipt-modal");
    const container = document.getElementById("demo-receipt-content");
    if (!modal || !container) {
      alert(`[MOMO CORNER - DEMO ORDER PREVIEW]\nOnline ordering is currently unavailable for this student project demo.\n\nGrand Total: ₹${grandTotal}`);
      return;
    }

    // Convert formatted markdown text into clean HTML lines
    const htmlLines = formattedText
      .split("\n")
      .map((line) => {
        const clean = line
          .replace(/\*(.*?)\*/g, "<strong>$1</strong>")
          .replace(/_(.*?)_/g, "<em>$1</em>");
        return `<div class="py-0.5">${clean || "&nbsp;"}</div>`;
      })
      .join("");

    container.innerHTML = htmlLines;
    window._lastDemoReceiptText = formattedText;

    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  }

  // Open & Close Side Drawer
  toggleDrawer(forceOpen = null) {
    const drawer = document.getElementById("cart-drawer");
    const backdrop = document.getElementById("cart-backdrop");
    if (!drawer) return;

    const isOpen = !drawer.classList.contains("translate-x-full");
    const shouldOpen = forceOpen !== null ? forceOpen : !isOpen;

    if (shouldOpen) {
      drawer.classList.remove("translate-x-full");
      if (backdrop) backdrop.classList.remove("hidden", "opacity-0");
      document.body.classList.add("overflow-hidden");
      this.renderDrawer();
    } else {
      drawer.classList.add("translate-x-full");
      if (backdrop) backdrop.classList.add("opacity-0");
      setTimeout(() => {
        if (backdrop && drawer.classList.contains("translate-x-full")) {
          backdrop.classList.add("hidden");
        }
      }, 300);
      document.body.classList.remove("overflow-hidden");
    }
  }

  initEvents() {
    // Listen for cart toggle buttons
    document.addEventListener("DOMContentLoaded", () => {
      this.renderBadge();
      this.renderDrawer();
      this.updateMenuButtons();

      const openTriggers = document.querySelectorAll(".open-cart-btn");
      openTriggers.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          this.toggleDrawer(true);
        });
      });

      const closeTriggers = document.querySelectorAll(".close-cart-btn");
      closeTriggers.forEach((btn) => {
        btn.addEventListener("click", () => this.toggleDrawer(false));
      });

      const backdrop = document.getElementById("cart-backdrop");
      if (backdrop) {
        backdrop.addEventListener("click", () => this.toggleDrawer(false));
      }

      // Checkout form submit listener
      const checkoutForm = document.getElementById("checkout-form");
      if (checkoutForm) {
        checkoutForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const orderTypeInput = checkoutForm.querySelector('input[name="orderType"]:checked');
          const formData = {
            name: checkoutForm.querySelector("#cust-name")?.value,
            phone: checkoutForm.querySelector("#cust-phone")?.value,
            orderType: orderTypeInput ? orderTypeInput.value : "delivery",
            tableOrAddress: checkoutForm.querySelector("#cust-address")?.value,
            instructions: checkoutForm.querySelector("#cust-notes")?.value
          };
          this.submitWhatsAppOrder(formData);
        });
      }

      // Order type radio changes in checkout
      const orderTypeRadios = document.querySelectorAll('input[name="orderType"]');
      orderTypeRadios.forEach((radio) => {
        radio.addEventListener("change", (e) => {
          const addressLabel = document.getElementById("checkout-address-label");
          const addressInput = document.getElementById("cust-address");
          if (e.target.value === "dine-in") {
            if (addressLabel) addressLabel.textContent = "Table Number (Optional)";
            if (addressInput) addressInput.placeholder = "e.g., Table 4 or Counter";
          } else if (e.target.value === "delivery") {
            if (addressLabel) addressLabel.textContent = "Delivery Address";
            if (addressInput) addressInput.placeholder = "House/Flat No, Landmark, Street";
          } else {
            if (addressLabel) addressLabel.textContent = "Pickup Note (Optional)";
            if (addressInput) addressInput.placeholder = "e.g., Arriving in 15 mins";
          }
          this.updateCheckoutSummary();
        });
      });
    });
  }
}

// Global cart instance
window.cart = new CartManager();
