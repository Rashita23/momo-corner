# MOMO CORNER — Modern Restaurant Website 🥟🔥
### Academic Portfolio & College Internship Demonstration Project

A beautiful, modern, appetizing, and fully responsive website for **Momo Corner**, created as an academic/internship capstone showcase. It features a warm culinary aesthetic, mouth-watering food visuals, real-time menu search and filtering, interactive shopping cart, safe demo receipt preview, and a customizable configuration system.

---

## 🔒 Privacy & Demonstration Safety Architecture

To protect personal privacy when published on public platforms (such as GitHub Pages or Netlify):
* **No Personal Phone Numbers in Code**: All personal contact numbers have been removed from public-facing code and assets.
* **No Broken Links**: Contact and WhatsApp buttons do not link to dead or fake telephone numbers.
* **Safe Ordering Mode**: When no business phone number is configured in `js/data.js`, the website automatically runs in **Academic Project Demo Mode**. Clicking order buttons displays a helpful notice: *"Online ordering is currently unavailable for this student project demo."*
* **Full Cart & Bill Calculation Demo**: Customers can still add items to their cart, adjust quantities, calculate delivery and taxes, and click checkout to see a complete **Demo Receipt Preview Modal** with bill calculation, proving the full frontend functionality without sending unauthorized messages!
* **Easy Future Activation**: If you launch a real food business later, simply enter your verified number into `whatsappNumber` in `js/data.js` to enable live WhatsApp dispatch.

---

## 🌟 Key Features

1. **Brand Identity & Theme**:
   - Custom smiling momo dumpling logo with animated steaming puffs.
   - Warm restaurant palette: Momo Red (`#D9232D`), Saffron/Amber Orange (`#FF6B35`), and Warm Cream (`#FFF9F2`).
   - Official Pure Veg (green square/dot) and Non-Veg (red square/triangle) indicators on every dish.
   - Smooth entrance animations, hover states, and glassmorphic cards.

2. **Hero Banner**:
   - Full-width hero banner showcasing momos with steam and dipping sauces.
   - Heading: *"Welcome to Momo Corner"*
   - Tagline: *"Little Pockets of Happiness, Big Bursts of Flavour!"*
   - Highlights bar: 25+ Varieties, 100% Fresh Daily, 4.9★ Customer Love, Fast WhatsApp Orders.

3. **Complete Categorized Menu (26 Dishes & Beverages)**:
   - **Category A: Steamed Momos** (Classic Veg, Paneer, Mushroom, Chicken)
   - **Category B: Fried Momos** (Crispy Veg, Fried Paneer, Crispy Chicken)
   - **Category C: Tandoori Momos** (Tandoori Veg, Tandoori Paneer, Tandoori Chicken, Malai Paneer)
   - **Category D: Kurkure Momos** (Kurkure Veg, Kurkure Paneer, Kurkure Chicken)
   - **Category E: Gravy Momos** (Chilli Garlic Gravy, Afghani Gravy, Special Momo Corner Gravy)
   - **Category F: Special Momos** (Cheese Burst, Peri-Peri, Schezwan, Special Momo Corner Platter)
   - **Category G: Sides & Beverages** (Spicy Red Chutney, Mayo Dip, Cold Drinks, Lemon Soda, Packaged Water)

4. **Live Menu Filtering & Search**:
   - Real-time search bar that filters momos instantly as you type.
   - Diet filter buttons (**All**, **Pure Veg**, **Non-Veg**).
   - Category filter pills for 1-click browsing.

5. **Shopping Cart & Demo Receipt Calculation**:
   - Slide-in side drawer cart with badge counters in the navbar.
   - Add to Cart with real-time quantity controls (`-` / `+`).
   - Subtotal, packaging fees, delivery charges, and grand total calculation.
   - `localStorage` persistence (cart items stay even after page refresh).
   - **Interactive Order Preview**: In demo mode, clicking checkout calculates the complete bill and renders a clean receipt with copy-to-clipboard functionality.

6. **Must-Try Momo Specials**:
   - Signature spotlight cards with Chef's Special badges and pricing.

7. **Our Team (Sample Portfolio Profiles)**:
   - Profile cards for Operations Lead, Executive Head Chef (featuring real chef photograph `7.jpg`), Master Momo Artisan, Tandoor Specialist, and Guest Experience Lead.
   - Kitchen showcase showing fresh dough rolling and hand-pleating.

8. **Food Gallery with Lightbox**:
   - Responsive photo grid with category filters (Steamed, Fried, Tandoori, Kitchen Moments).
   - Fullscreen lightbox with zoom preview, Next/Previous controls, and Esc key support.

9. **Why Choose Us**:
   - 6 feature highlights detailing daily fresh preparation, secret chutney, quality ingredients, variety, and affordability.

10. **Location & Dynamic Hours**:
    - Embedded responsive Google Map.
    - One-click **Directions** link.
    - **Real-Time Open/Closed status badge** calculated dynamically from local system time.

11. **Contact Us**:
    - Professional placeholders for hotline status and project email.
    - Interactive contact form with client-side validation and transparent demo modal feedback.

---

## 📁 Project Structure

```
first website/
├── .gitignore             # Git ignore file for clean commits
├── .nojekyll              # Bypasses Jekyll on GitHub Pages for pure static hosting
├── assets/
│   └── images/
│       ├── 1.jpg          # Hero banner asset
│       ├── 2.jpg          # Chilli Garlic / Schezwan pan-fried momos
│       ├── 3.jpg          # UI reference inspiration
│       ├── 4.jpg          # Tandoori momos with char marks & dips
│       ├── 5.jpg          # Crispy fried momos platter
│       ├── 6.jpg          # UI reference inspiration
│       ├── 7.jpg          # Executive Head Chef portrait
│       ├── 8.jpg          # Hot & Special Momos wooden platter
│       ├── 9.jpg          # Steamed momos in bamboo basket
│       ├── 10.jpg         # Steamed dumplings in black dish
│       └── 11.jpg         # UI reference inspiration
├── css/
│   └── styles.css         # Custom typography, animations, glassmorphism, accessibility, and themes
├── js/
│   ├── data.js            # Central configuration (menu, prices, demo mode flags, location)
│   ├── cart.js            # Shopping cart logic, localStorage, receipt calculation & demo preview
│   └── app.js             # UI rendering, search, filters, lightbox, scrollspy, and modal handlers
├── index.html             # Main semantic HTML5 file (with SEO and ARIA accessibility)
└── README.md              # Project documentation & configuration guide
```

---

## 🚀 How to Run the Website in VS Code

You can run this website instantly without installing Node.js or any build tools!

### Method 1: Using VS Code Live Server (Recommended)
1. Open the folder `first website` in **VS Code** (`File` → `Open Folder...`).
2. If not already installed, install the **Live Server** extension by Ritwick Dey from the VS Code Extensions marketplace (`Ctrl + Shift + X` → search for `Live Server` → click `Install`).
3. Right-click `index.html` in the file explorer and select **"Open with Live Server"**.
4. The website will automatically open at `http://127.0.0.1:5500/index.html`.

### Method 2: Direct Browser Launch
1. Open the folder `first website` in Windows File Explorer.
2. Double-click `index.html` (it will open immediately in your default browser like Chrome, Edge, or Firefox).

---

## 🌐 Step-by-Step Guide: Publishing on GitHub Pages

Because this website uses 100% clean, standard HTML5, CSS3, and JavaScript with relative asset paths and no build step, it is **100% compatible with GitHub Pages**!

### Step 1: Create a New GitHub Repository
1. Log in to [GitHub](https://github.com/).
2. In the top-right corner, click **+** → **New repository**.
3. Name your repository (e.g., `momo-corner` or `momo-restaurant`).
4. Set visibility to **Public**.
5. Do **not** check "Add a README file" (we already have a complete one).
6. Click **Create repository**.

### Step 2: Upload or Push the Project
You can upload either using Git or directly via the GitHub website:

#### Via Git Command Line (if Git is installed on your computer):
```bash
git init
git add .
git commit -m "Initial commit: Momo Corner restaurant website"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
git push -u origin main
```

#### Via GitHub Web Interface (Easiest for beginners without Git installed):
1. On your newly created repository page on GitHub, click **"uploading an existing file"**.
2. Select or drag-and-drop all files and folders from `first website` into the browser upload box:
   - `index.html`
   - `.nojekyll`
   - `.gitignore`
   - `README.md`
   - `css/` folder
   - `js/` folder
   - `assets/` folder
3. At the bottom, type a commit message (e.g. `Deploy Momo Corner website`) and click **Commit changes**.

### Step 3: Enable GitHub Pages
1. In your GitHub repository, click on the **Settings** tab at the top.
2. In the left sidebar, scroll down to the **Code and automation** section and click on **Pages**.
3. Under **Build and deployment**:
   - Source: select **Deploy from a branch**.
   - Branch: select `main` (or `master`) and select folder `/ (root)`.
4. Click **Save**.
5. Wait about 1–2 minutes. Refresh the Settings → Pages page.
6. A banner will appear at the top saying:
   > **Your site is live at `https://<YOUR_USERNAME>.github.io/<YOUR_REPO_NAME>/`**
7. Click the link to view your live website!

---

## ⚙️ Configuration & Customization Guide

All restaurant information is centralized in **`js/data.js`**. You do **not** need to touch `index.html` to change prices, dishes, or contact numbers!

### 1. How to Enable Live WhatsApp Ordering Later
Open [`js/data.js`](file:///c:/Users/ishub/OneDrive/Desktop/first%20website/js/data.js) and update lines 18-24:
```javascript
// Change from "" to your verified business phone number when ready:
whatsappNumber: "919XXXXXXXXX", // Country code + 10 digits without + or spaces
phoneNumber: "+91 9XXXXXXXXX",
email: "contact@yourdomain.com",
```
As soon as you enter a number, the website automatically activates live WhatsApp order routing!

### 2. How to Edit Menu Items and Prices
Open [`js/data.js`](file:///c:/Users/ishub/OneDrive/Desktop/first%20website/js/data.js) and look for `MENU_ITEMS` (around line 75):
```javascript
{
  id: "momo-steam-01",
  name: "Classic Veg Steamed Momos",
  category: "steamed",
  price: 110,                // Change price here in ₹
  isVeg: true,               // true for Pure Veg, false for Non-Veg
  pieces: "6 Pcs",
  image: "assets/images/10.jpg",
  description: "Your custom description...",
  badge: "Classic Choice"
}
```

### 3. How to Add Real Food Photographs
1. Save your food images into the `assets/images/` folder (e.g., `assets/images/my_dish.jpg`).
2. In [`js/data.js`](file:///c:/Users/ishub/OneDrive/Desktop/first%20website/js/data.js), change the `image` field of that dish:
   ```javascript
   image: "assets/images/my_dish.jpg"
   ```

### 4. How to Update Team Profiles
Open [`js/data.js`](file:///c:/Users/ishub/OneDrive/Desktop/first%20website/js/data.js) and find `TEAM_MEMBERS` (around line 475):
```javascript
{
  name: "Chef Rajesh Rawat",
  role: "Executive Head Chef",
  image: "assets/images/7.jpg", // Replace with your team photo path
  bio: "Master of Himalayan recipes and clay oven smoking...",
  badge: "Head Chef"
}
```

---

## 🧪 Comprehensive Feature Testing Checklist

1. **Navigation & Scrollspy**: Click each nav link (About, Specials, Menu, Team, Gallery, Location, Contact) and observe smooth scrolling. Scroll down manually to confirm the active section lights up in amber.
2. **Menu Filter Tabs**: Click "Steamed", "Fried", "Tandoori", "Kurkure", "Gravy", "Specials", or "Sides" to verify instant categorization.
3. **Veg / Non-Veg Toggle**: Click "Pure Veg" or "Non-Veg" to filter by dietary preference.
4. **Live Search**: Type "chicken", "paneer", "kurkure", or "chutney" into the search bar. Dishes filter in real time.
5. **Cart System & LocalStorage**: Click "Add" on any dish. Notice the quantity counter appears (`- 1 in cart +`). Refresh the browser page and verify the cart items are preserved.
6. **Cart Drawer**: Click the Cart button in the navbar. Adjust item quantities or remove items.
7. **Safe Demo Order Calculation**: In the cart drawer, click "Proceed to Checkout", enter any sample name and test input, and click "Calculate & Preview Order (Demo Mode)". The **Demo Order Receipt Modal** opens with the complete calculated bill, no personal messages are sent, and you can test the "Copy Receipt Text" button!
8. **Demo Ordering Notice**: Click "WhatsApp Ordering (Demo)" in the promotional banner or location card. The polite notice modal opens explaining that online ordering is in demo mode.
9. **Gallery Lightbox**: Scroll to the food gallery and click any photo. Use the left/right arrows to browse or press `Esc` to close.
10. **Contact Form**: Scroll to Contact Us, fill out the form, and click "Submit Message" to test the input validation and confirmation feedback modal.
