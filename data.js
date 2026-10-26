/**
 * MOMO CORNER - Central Configuration & Restaurant Data
 * ======================================================
 * Restaurant owners and managers can update menu items, prices,
 * contact details, WhatsApp number, opening hours, and team members
 * directly in this file without editing any HTML code.
 */

const RESTAURANT_CONFIG = {
  // --- Basic Restaurant Information ---
  name: "Momo Corner",
  tagline: "Little Pockets of Happiness, Big Bursts of Flavour!",
  shortDescription:
    "Discover delicious steamed, fried, tandoori, and flavour-packed momos, freshly prepared with love and served with our signature spicy chutney.",
  
  // --- Contact & Order Information ---
  // ACADEMIC PORTFOLIO DEMO MODE:
  // Personal phone numbers are removed to protect your privacy.
  // Leave whatsappNumber as "" to keep the website in safe demo mode.
  // When deploying for a real business in the future, set your verified 10-digit number
  // with country code (e.g., "919XXXXXXXXX") to enable live WhatsApp order routing.
  whatsappNumber: "", 
  phoneNumber: "",
  secondaryPhone: "",
  email: "contact@momocorner.example.com",
  contactStatusMessage: "Contact information will be available soon.",
  orderingStatusMessage: "Online ordering is currently unavailable for this student project demo.",
  
  // --- Location & Google Maps ---
  // Demo placeholder address for academic portfolio
  address: {
    street: "Shop No. 14, Food Street (Academic Demo)",
    area: "Sector 18, Commercial Hub",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110001",
    full: "Demo Location · Shop No. 14, Food Street, Sector 18 (Academic Portfolio Demo)"
  },
  // Google Maps Embed URL for responsive iframe
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114827187217!2d77.216721!3d28.632832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b0450875%3A0xce42d0a0d47371b5!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  // Google Maps Get Directions link
  googleMapsDirectionsUrl: "https://maps.google.com/?q=Connaught+Place+New+Delhi",

  // --- Operating Hours ---
  openingHours: {
    weekdays: "11:00 AM - 11:00 PM",
    weekends: "11:00 AM - 11:30 PM",
    // Numeric 24-hr values used to calculate dynamic "Open Now / Closed Now" badge
    openHour: 11,
    closeHour: 23,
    closeMinutes: 30
  },

  // --- Currency & Pricing Settings ---
  currency: {
    symbol: "₹",
    code: "INR"
  },
  // Minimum delivery order amount in INR
  minDeliveryOrder: 199,
  packagingFee: 15,
  deliveryFee: 30, // Free if order > ₹399

  // --- Social Media Links ---
  socialLinks: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    whatsapp: "#",
    youtube: "https://youtube.com"
  }
};

/**
 * Menu Categories
 */
const MENU_CATEGORIES = [
  { id: "all", name: "All Varieties", icon: "🥢" },
  { id: "steamed", name: "Steamed Momos", icon: "🥟" },
  { id: "fried", name: "Fried Momos", icon: "🔥" },
  { id: "tandoori", name: "Tandoori Momos", icon: "🍢" },
  { id: "kurkure", name: "Kurkure Momos", icon: "✨" },
  { id: "gravy", name: "Gravy Momos", icon: "🍲" },
  { id: "specials", name: "Special Momos", icon: "⭐" },
  { id: "sides", name: "Sides & Beverages", icon: "🥤" }
];

/**
 * Complete Momo Menu Items
 * All prices are editable sample prices in Indian Rupees (₹).
 */
const MENU_ITEMS = [
  // --- CATEGORY A: STEAMED MOMOS ---
  {
    id: "momo-steam-01",
    name: "Classic Veg Steamed Momos",
    category: "steamed",
    price: 110,
    isVeg: true,
    pieces: "6 Pcs",
    image: "assets/images/10.jpg",
    description: "Finely chopped fresh cabbage, carrots, onions, and Himalayan spices steamed to delicate perfection. Served with red chili dip.",
    badge: "Classic Choice",
    spiceLevel: "Medium"
  },
  {
    id: "momo-steam-02",
    name: "Paneer Steamed Momos",
    category: "steamed",
    price: 140,
    isVeg: true,
    pieces: "6 Pcs",
    image: "assets/images/9.jpg",
    description: "Soft cottage cheese filling seasoned with aromatic herbs, black pepper, and fresh coriander, wrapped in a paper-thin dough.",
    badge: "Customer Favorite",
    spiceLevel: "Mild"
  },
  {
    id: "momo-steam-03",
    name: "Mushroom Momos",
    category: "steamed",
    price: 150,
    isVeg: true,
    pieces: "6 Pcs",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=700&q=80",
    description: "Button mushrooms sautéed with garlic, scallions, and white pepper, steamed juicy and served hot with spicy tomato chutney.",
    badge: "Chef Pick",
    spiceLevel: "Medium"
  },
  {
    id: "momo-steam-04",
    name: "Chicken Steamed Momos",
    category: "steamed",
    price: 160,
    isVeg: false,
    pieces: "6 Pcs",
    image: "assets/images/2.jpg",
    description: "Minced tender chicken infused with ginger, garlic, cilantro, and authentic Tibetan spices, bursting with rich savory juices.",
    badge: "Bestseller",
    spiceLevel: "Medium"
  },

  // --- CATEGORY B: FRIED MOMOS ---
  {
    id: "momo-fried-01",
    name: "Crispy Fried Veg Momos",
    category: "fried",
    price: 120,
    isVeg: true,
    pieces: "6 Pcs",
    image: "assets/images/5.jpg",
    description: "Golden, deep-fried momos with a crunchy exterior and a juicy, seasoned vegetable center. Crispiness in every bite!",
    badge: "Super Crunchy",
    spiceLevel: "Medium"
  },
  {
    id: "momo-fried-02",
    name: "Fried Paneer Momos",
    category: "fried",
    price: 150,
    isVeg: true,
    pieces: "6 Pcs",
    image: "assets/images/5.jpg",
    description: "Crisp golden fried momos packed with tender spiced paneer and herbs, served with garlic mayo and fiery schezwan dip.",
    badge: "Popular",
    spiceLevel: "Medium"
  },
  {
    id: "momo-fried-03",
    name: "Crispy Chicken Momos",
    category: "fried",
    price: 170,
    isVeg: false,
    pieces: "6 Pcs",
    image: "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=700&q=80",
    description: "Succulent minced chicken dumplings fried to a golden crunch. Juicy on the inside, extra crispy on the outside.",
    badge: "Non-Veg Hit",
    spiceLevel: "Hot"
  },

  // --- CATEGORY C: TANDOORI MOMOS ---
  {
    id: "momo-tandoor-01",
    name: "Tandoori Veg Momos",
    category: "tandoori",
    price: 160,
    isVeg: true,
    pieces: "6 Pcs",
    image: "assets/images/4.jpg",
    description: "Marinated in yogurt, roasted tandoori spices, and fenugreek, then char-grilled over glowing coals with smoky flavours.",
    badge: "Smoky Aroma",
    spiceLevel: "Hot"
  },
  {
    id: "momo-tandoor-02",
    name: "Tandoori Paneer Momos",
    category: "tandoori",
    price: 190,
    isVeg: true,
    pieces: "6 Pcs",
    image: "assets/images/4.jpg",
    description: "Rich paneer dumplings drenched in a spiced tikka marinade, roasted until charred, topped with chaat masala & mint dip.",
    badge: "Must Try",
    spiceLevel: "Hot"
  },
  {
    id: "momo-tandoor-03",
    name: "Tandoori Chicken Momos",
    category: "tandoori",
    price: 210,
    isVeg: false,
    pieces: "6 Pcs",
    image: "assets/images/4.jpg",
    description: "Juicy chicken momos bathed in authentic tandoori tikka masala, slow-roasted in our tandoor with onions and lemon wedge.",
    badge: "Signature Hit",
    spiceLevel: "Very Hot"
  },
  {
    id: "momo-tandoor-04",
    name: "Malai Paneer Momos",
    category: "tandoori",
    price: 200,
    isVeg: true,
    pieces: "6 Pcs",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=700&q=80",
    description: "Mouth-melting paneer dumplings coated in rich cashew cream, cheese, fresh cardamom, and mild aromatic spices.",
    badge: "Melt In Mouth",
    spiceLevel: "Mild"
  },

  // --- CATEGORY D: KURKURE MOMOS ---
  {
    id: "momo-kurkure-01",
    name: "Kurkure Veg Momos",
    category: "kurkure",
    price: 150,
    isVeg: true,
    pieces: "6 Pcs",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80",
    description: "Dipped in spiced batter and coated with crushed cornflakes for an unbeatable crunchy texture. An absolute street food sensation!",
    badge: "Extra Crunchy",
    spiceLevel: "Medium"
  },
  {
    id: "momo-kurkure-02",
    name: "Kurkure Paneer Momos",
    category: "kurkure",
    price: 180,
    isVeg: true,
    pieces: "6 Pcs",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=700&q=80",
    description: "Stuffed with flavorful cottage cheese, double-coated in crunchy crust and golden fried. Served with spicy dips.",
    badge: "Party Favorite",
    spiceLevel: "Medium"
  },
  {
    id: "momo-kurkure-03",
    name: "Kurkure Chicken Momos",
    category: "kurkure",
    price: 200,
    isVeg: false,
    pieces: "6 Pcs",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=700&q=80",
    description: "Juicy chicken momos in an ultra-crispy seasoned shell. Crunchy outside, intensely tender and savory inside.",
    badge: "Top Seller",
    spiceLevel: "Hot"
  },

  // --- CATEGORY E: GRAVY MOMOS ---
  {
    id: "momo-gravy-01",
    name: "Chilli Garlic Gravy Momos",
    category: "gravy",
    price: 170,
    isVeg: true,
    pieces: "6 Pcs",
    image: "assets/images/2.jpg",
    description: "Fried dumplings tossed in a sizzling wok with fiery red chilies, burnt garlic, soy, and spring onions in thick savory sauce.",
    badge: "Spicy & Tangy",
    spiceLevel: "Very Hot"
  },
  {
    id: "momo-gravy-02",
    name: "Afghani Gravy Momos",
    category: "gravy",
    price: 190,
    isVeg: true,
    pieces: "6 Pcs",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=700&q=80",
    description: "Tossed in a rich, velvety white gravy of cream, melted butter, crushed black pepper, and roasted garlic. Pure indulgence.",
    badge: "Rich & Creamy",
    spiceLevel: "Mild"
  },
  {
    id: "momo-gravy-03",
    name: "Special Momo Corner Gravy Momos",
    category: "gravy",
    price: 220,
    isVeg: true,
    pieces: "6 Pcs",
    image: "assets/images/2.jpg",
    description: "Our house secret gravy combining smoky tandoor spices, cashew paste, tangy tomato reduction, and fresh herbs.",
    badge: "Chef's Secret",
    spiceLevel: "Hot"
  },

  // --- CATEGORY F: SPECIAL MOMOS ---
  {
    id: "momo-special-01",
    name: "Cheese Burst Momos",
    category: "specials",
    price: 210,
    isVeg: true,
    pieces: "6 Pcs",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80",
    description: "Loaded with gooey melted mozzarella and cheddar cheese that pulls apart with every heavenly bite. An ultimate treat!",
    badge: "Cheese Pull",
    spiceLevel: "Mild"
  },
  {
    id: "momo-special-02",
    name: "Peri-Peri Momos",
    category: "specials",
    price: 170,
    isVeg: true,
    pieces: "6 Pcs",
    image: "assets/images/9.jpg",
    description: "Tossed in our bold African Bird's Eye peri-peri seasoning with a hint of tangy citrus and smoked paprika.",
    badge: "Zesty & Spicy",
    spiceLevel: "Hot"
  },
  {
    id: "momo-special-03",
    name: "Schezwan Momos",
    category: "specials",
    price: 180,
    isVeg: true,
    pieces: "6 Pcs",
    image: "assets/images/2.jpg",
    description: "Glazed in authentic Sichuan pepper oil, crushed garlic, and red chili paste for that signature tingly spice sensation.",
    badge: "Flavour Bomb",
    spiceLevel: "Very Hot"
  },
  {
    id: "momo-special-04",
    name: "Special Momo Corner Momos",
    category: "specials",
    price: 230,
    isVeg: true,
    pieces: "8 Pcs",
    image: "assets/images/8.jpg",
    description: "The grand master platter: a chef's combination of steamed, fried, and tandoori dumplings served with three artisan dips.",
    badge: "Grand Signature",
    spiceLevel: "Medium"
  },

  // --- CATEGORY G: SIDES AND BEVERAGES ---
  {
    id: "side-01",
    name: "Spicy Red Chutney (Extra Tub)",
    category: "sides",
    price: 30,
    isVeg: true,
    pieces: "50 ml",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80",
    description: "Our legendary freshly ground red chili, garlic, and tomato chutney with a dash of Himalayan salt and vinegar.",
    badge: "Signature Dip",
    spiceLevel: "Hot"
  },
  {
    id: "side-02",
    name: "Mayonnaise Dip (Extra Tub)",
    category: "sides",
    price: 30,
    isVeg: true,
    pieces: "50 ml",
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=700&q=80",
    description: "Ultra-creamy, smooth eggless garlic mayonnaise dip that perfectly cools down the momo heat.",
    badge: "Cooling Dip",
    spiceLevel: "None"
  },
  {
    id: "side-03",
    name: "Cold Drinks (Assorted)",
    category: "sides",
    price: 50,
    isVeg: true,
    pieces: "250 ml Can",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=700&q=80",
    description: "Chilled Thums Up, Coca Cola, Sprite, or Limca to pair with your hot momos.",
    badge: "Chilled",
    spiceLevel: "None"
  },
  {
    id: "side-04",
    name: "Fresh Lemon Soda",
    category: "sides",
    price: 60,
    isVeg: true,
    pieces: "300 ml",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80",
    description: "Refreshing fizzy soda infused with freshly squeezed lemons, black salt, cumin, and mint leaves (Sweet / Salted / Mixed).",
    badge: "Refreshing",
    spiceLevel: "None"
  },
  {
    id: "side-05",
    name: "Packaged Water Bottles",
    category: "sides",
    price: 20,
    isVeg: true,
    pieces: "500 ml",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=700&q=80",
    description: "Sealed, purified, and chilled mineral drinking water bottle.",
    badge: "Chilled",
    spiceLevel: "None"
  }
];

/**
 * Featured Signature Specials (Must-Try Momos)
 */
const FEATURED_SPECIALS = [
  {
    id: "spec-01",
    name: "Tandoori Chicken Momos",
    tagline: "Slow-roasted over real charcoal",
    price: 210,
    badge: "Chef's Special",
    image: "assets/images/4.jpg",
    description: "Our signature tender chicken dumplings marinated in authentic Punjabi tandoori spices and char-grilled with smoked butter glaze.",
    menuId: "momo-tandoor-03",
    isVeg: false
  },
  {
    id: "spec-02",
    name: "Crispy Fried Momos Platter",
    tagline: "Crunchy outside, juicy inside",
    price: 150,
    badge: "Bestseller",
    image: "assets/images/5.jpg",
    description: "Deep fried to a glorious golden crisp and served in a ring with our fiery red chutney and refreshing green mint dip.",
    menuId: "momo-fried-02",
    isVeg: true
  },
  {
    id: "spec-03",
    name: "Chilli Garlic Gravy Momos",
    tagline: "Sizzling wok-tossed explosion",
    price: 170,
    badge: "Trending Choice",
    image: "assets/images/2.jpg",
    description: "Tossed vigorously in hot woks with crushed burnt garlic, red hot chilies, spring scallions, and dark savory glaze.",
    menuId: "momo-gravy-01",
    isVeg: true
  },
  {
    id: "spec-04",
    name: "Authentic Steamed Dumplings",
    tagline: "Traditional Himalayan recipe",
    price: 140,
    badge: "All-Time Favorite",
    image: "assets/images/9.jpg",
    description: "Crafted in bamboo steamers lined with fresh banana leaves, locking in gentle heat and aromatic herb flavors.",
    menuId: "momo-steam-02",
    isVeg: true
  }
];

/**
 * Team Members
 * Sample profile cards for academic portfolio demonstration.
 */
const TEAM_MEMBERS = [
  {
    name: "Ramesh Sharma",
    role: "Founder & Operations Lead (Sample)",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    bio: "Culinary enthusiast guiding operations and ensuring authentic Himalayan flavor profiles across our concept menu.",
    badge: "Operations"
  },
  {
    name: "Chef Rajesh Rawat",
    role: "Executive Head Chef",
    image: "assets/images/7.jpg", // Chef photo provided in project
    bio: "Master of traditional recipes and clay oven smoking, perfecting the balance of tender crust and dipping sauces.",
    badge: "Head Chef"
  },
  {
    name: "Sunita Thapa",
    role: "Master Momo Artisan (Sample)",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    bio: "Specializing in traditional 24-pleat hand-folding techniques, ensuring every dumpling is a tender work of culinary art.",
    badge: "Dumpling Master"
  },
  {
    name: "Vikram Gurung",
    role: "Tandoor & Fry Specialist (Sample)",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80",
    bio: "The heat maestro behind our crunchy Kurkure momos and flame-kissed tandoori platters with balanced char.",
    badge: "Wok & Grill"
  },
  {
    name: "Priya Verma",
    role: "Guest Experience Lead (Sample)",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    bio: "Ensures every visitor receives quick, warm, and delightful hospitality from the moment they step into Momo Corner.",
    badge: "Hospitality"
  }
];

/**
 * Food Gallery Items
 */
const GALLERY_ITEMS = [
  {
    id: "gal-01",
    category: "tandoori",
    title: "Fiery Tandoori Momos",
    caption: "Charred over clay oven and garnished with cilantro",
    image: "assets/images/4.jpg"
  },
  {
    id: "gal-02",
    category: "fried",
    title: "Golden Crispy Fried Momos",
    caption: "Served with hot red chili sauce and mint chutney",
    image: "assets/images/5.jpg"
  },
  {
    id: "gal-03",
    category: "steamed",
    title: "Himalayan Bamboo Steamer",
    caption: "Freshly steamed dumplings served on banana leaf",
    image: "assets/images/9.jpg"
  },
  {
    id: "gal-04",
    category: "gravy",
    title: "Wok-Tossed Schezwan Momos",
    caption: "Glazed in aromatic garlic oil and spicy chili gravy",
    image: "assets/images/2.jpg"
  },
  {
    id: "gal-05",
    category: "steamed",
    title: "Steamy Bite Bliss Platter",
    caption: "Hand-folded dumplings ready to dip in mustard mayo",
    image: "assets/images/10.jpg"
  },
  {
    id: "gal-06",
    category: "specials",
    title: "Grand Special Momo Platter",
    caption: "A feast of flavors with three homemade dipping sauces",
    image: "assets/images/8.jpg"
  },
  {
    id: "gal-07",
    category: "kitchen",
    title: "Hand-Pleating in Our Kitchen",
    caption: "Our chefs hand-crafting fresh momos every morning",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-08",
    category: "kitchen",
    title: "Artisan Chili Sauce Preparation",
    caption: "Slow-simmered whole red chilies, garlic cloves, and vine tomatoes",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80"
  }
];

/**
 * Customer Reviews (Demonstration Testimonials)
 */
const CUSTOMER_REVIEWS = [
  {
    id: "rev-01",
    name: "Aakash Malhotra",
    location: "Food Blogger & Critic",
    rating: 5,
    date: "2 days ago",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    review: "Hands down the crispiest Kurkure momos in town! The spicy chutney has that authentic fiery kick that clears your senses. Clean restaurant and super polite staff.",
    badge: "Verified Foodie"
  },
  {
    id: "rev-02",
    name: "Sneha Kapur",
    location: "Local Guide",
    rating: 5,
    date: "1 week ago",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    review: "The Tandoori Paneer Momos are next-level smoky! The char on the dough combined with the soft, spiced filling inside is absolute heaven. We ordered twice in one evening!",
    badge: "Regular Guest"
  },
  {
    id: "rev-03",
    name: "Rohan Sengupta",
    location: "Verified Dine-In Guest",
    rating: 5,
    date: "2 weeks ago",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
    review: "As someone who grew up in the hills, finding authentic steamed momos with real juicy broth is rare. Momo Corner nails it! You can taste the quality and freshness.",
    badge: "Authenticity Lover"
  },
  {
    id: "rev-04",
    name: "Ananya Deshmukh",
    location: "Online Order Customer",
    rating: 5,
    date: "3 weeks ago",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    review: "Fast WhatsApp ordering experience! The food arrived piping hot in sturdy, leakproof packaging. The Chilli Garlic gravy momos were sensational.",
    badge: "Delivery Order"
  }
];

/**
 * Why Choose Us Features
 */
const WHY_CHOOSE_US = [
  {
    icon: "🥟",
    title: "100% Freshly Prepared Daily",
    description: "Never frozen or pre-packaged. Our momos are rolled, stuffed, and pleated fresh each morning using wholesome recipes."
  },
  {
    icon: "🌶️",
    title: "Authentic Fiery Chutneys",
    description: "Our secret family chili-garlic chutney and cooling mayo dip are prepared from scratch every single day without artificial colors."
  },
  {
    icon: "🌿",
    title: "Premium Quality Ingredients",
    description: "We source farm-fresh vegetables, dairy-rich fresh paneer, and certified fresh cuts to guarantee pure flavor and safety."
  },
  {
    icon: "🥢",
    title: "25+ Exciting Varieties",
    description: "From classic Himalayan steamed to crunch-loaded Kurkure, char-grilled tandoori, and rich gravies, there's a favorite for everyone."
  },
  {
    icon: "✨",
    title: "Spotless Hygienic Kitchen",
    description: "Strict sanitation protocols, temperature-controlled storage, and open-kitchen cleanliness that you can always trust."
  },
  {
    icon: "💰",
    title: "Honest & Affordable Prices",
    description: "Delicious gourmet cafe taste at pocket-friendly prices, making every meal a celebration of flavor without breaking the bank."
  }
];
