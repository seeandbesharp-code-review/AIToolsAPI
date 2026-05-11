// ============================================================
// CozyGen - MongoDB Seed Data
// Run in MongoDB Compass Playground or mongosh
// Fills all collections with realistic furniture store data
// All SQL-style IDs are preserved as _id values
// ============================================================

use("CozyGenDB");

// ── CLEAR EXISTING DATA ──────────────────────────────────────
db.users.deleteMany({});
db.categories.deleteMany({});
db.styles.deleteMany({});
db.products.deleteMany({});
db.orders.deleteMany({});
db.requestLogs.deleteMany({});

// ── 1. CATEGORIES ────────────────────────────────────────────
db.categories.insertMany([
  { _id: 1, name: "Living Room", description: "Sofas, armchairs and coffee tables for your living space", imageUrl: "/uploads/categories/living-room.jpg" },
  { _id: 2, name: "Bedroom",     description: "Beds, wardrobes and nightstands for a good night's sleep",  imageUrl: "/uploads/categories/bedroom.jpg" },
  { _id: 3, name: "Dining Room", description: "Dining tables and chairs for every occasion",              imageUrl: "/uploads/categories/dining-room.jpg" },
  { _id: 4, name: "Office",      description: "Desks and office chairs for productive workspaces",         imageUrl: "/uploads/categories/office.jpg" },
  { _id: 5, name: "Outdoor",     description: "Weather-resistant furniture for gardens and patios",        imageUrl: "/uploads/categories/outdoor.jpg" }
]);

// ── 2. STYLES ────────────────────────────────────────────────
db.styles.insertMany([
  { _id: 1, name: "Modern",        description: "Clean lines, neutral colours and functional forms",             imageUrl: "/uploads/styles/modern.jpg" },
  { _id: 2, name: "Scandinavian",  description: "Light woods, minimalism and cosy textures",                    imageUrl: "/uploads/styles/scandinavian.jpg" },
  { _id: 3, name: "Industrial",    description: "Exposed metal, raw wood and urban aesthetics",                  imageUrl: "/uploads/styles/industrial.jpg" },
  { _id: 4, name: "Classic",       description: "Timeless elegance with ornate details and rich fabrics",        imageUrl: "/uploads/styles/classic.jpg" },
  { _id: 5, name: "Bohemian",      description: "Eclectic mix of colours, patterns and natural materials",       imageUrl: "/uploads/styles/bohemian.jpg" }
]);

// ── 3. USERS ─────────────────────────────────────────────────
db.users.insertMany([
  { _id: 1, email: "admin@cozygen.com",   passwordHash: "hashed_admin_pass_1",  firstName: "Noa",     lastName: "Cohen",     phone: "050-1111111", address: "1 Rothschild Blvd, Tel Aviv",     role: "Admin",  isClubMember: true  },
  { _id: 2, email: "dana@gmail.com",      passwordHash: "hashed_pass_dana",     firstName: "Dana",    lastName: "Levi",      phone: "052-2222222", address: "14 Herzl St, Jerusalem",          role: "User",   isClubMember: true  },
  { _id: 3, email: "yossi@gmail.com",     passwordHash: "hashed_pass_yossi",    firstName: "Yossi",   lastName: "Mizrahi",   phone: "054-3333333", address: "7 Ben Gurion Ave, Haifa",         role: "User",   isClubMember: false },
  { _id: 4, email: "michal@outlook.com",  passwordHash: "hashed_pass_michal",   firstName: "Michal",  lastName: "Shapiro",   phone: "053-4444444", address: "22 Dizengoff St, Tel Aviv",       role: "User",   isClubMember: true  },
  { _id: 5, email: "avi@gmail.com",       passwordHash: "hashed_pass_avi",      firstName: "Avi",     lastName: "Ben David", phone: "058-5555555", address: "3 Weizmann St, Rehovot",          role: "User",   isClubMember: false },
  { _id: 6, email: "tamar@gmail.com",     passwordHash: "hashed_pass_tamar",    firstName: "Tamar",   lastName: "Katz",      phone: "050-6666666", address: "9 HaNassi Blvd, Beer Sheva",      role: "User",   isClubMember: true  },
  { _id: 7, email: "eitan@gmail.com",     passwordHash: "hashed_pass_eitan",    firstName: "Eitan",   lastName: "Peretz",    phone: "054-7777777", address: "5 Allenby St, Tel Aviv",          role: "User",   isClubMember: false }
]);

// ── 4. PRODUCTS ──────────────────────────────────────────────
// styleIds reference styles._id
db.products.insertMany([
  // Living Room (categoryId: 1)
  { _id: 1,  name: "Oslo 3-Seat Sofa",         description: "Spacious sofa with removable covers in premium fabric",      price: 3200.00, stock: 12, categoryId: 1, isActive: true, frontImageUrl: "/uploads/products/sofa-oslo-front.jpg",         backImageUrl: "/uploads/products/sofa-oslo-back.jpg",         styleIds: [1, 2] },
  { _id: 2,  name: "Brick Loft Sofa",          description: "Two-seat sofa with metal legs and distressed leather",        price: 2800.00, stock: 8,  categoryId: 1, isActive: true, frontImageUrl: "/uploads/products/sofa-brick-front.jpg",        backImageUrl: "/uploads/products/sofa-brick-back.jpg",        styleIds: [3] },
  { _id: 3,  name: "Versailles Armchair",      description: "Elegant wingback armchair in velvet upholstery",              price: 1600.00, stock: 15, categoryId: 1, isActive: true, frontImageUrl: "/uploads/products/chair-versailles-front.jpg",  backImageUrl: "/uploads/products/chair-versailles-back.jpg",  styleIds: [4] },
  { _id: 4,  name: "Pine Round Coffee Table",  description: "Solid pine coffee table with storage shelf",                 price: 680.00,  stock: 20, categoryId: 1, isActive: true, frontImageUrl: "/uploads/products/table-pine-front.jpg",        backImageUrl: "/uploads/products/table-pine-back.jpg",        styleIds: [2, 5] },
  { _id: 5,  name: "Metro TV Unit",            description: "Industrial steel and oak TV unit, 180 cm wide",              price: 1250.00, stock: 10, categoryId: 1, isActive: true, frontImageUrl: "/uploads/products/tvunit-metro-front.jpg",      backImageUrl: "/uploads/products/tvunit-metro-back.jpg",      styleIds: [3, 1] },

  // Bedroom (categoryId: 2)
  { _id: 6,  name: "Nordic Queen Bed",         description: "Upholstered queen bed in light grey, 160x200 cm",            price: 2400.00, stock: 9,  categoryId: 2, isActive: true, frontImageUrl: "/uploads/products/bed-nordic-front.jpg",        backImageUrl: "/uploads/products/bed-nordic-back.jpg",        styleIds: [2, 1] },
  { _id: 7,  name: "Royal King Bed",           description: "Carved wooden king bed with padded headboard, 180x200 cm",  price: 4500.00, stock: 5,  categoryId: 2, isActive: true, frontImageUrl: "/uploads/products/bed-royal-front.jpg",         backImageUrl: "/uploads/products/bed-royal-back.jpg",         styleIds: [4] },
  { _id: 8,  name: "Minimalist Wardrobe 3-D",  description: "3-door sliding wardrobe in white matte finish",              price: 3100.00, stock: 7,  categoryId: 2, isActive: true, frontImageUrl: "/uploads/products/wardrobe-min-front.jpg",      backImageUrl: "/uploads/products/wardrobe-min-back.jpg",      styleIds: [1] },
  { _id: 9,  name: "Oak Nightstand",           description: "Solid oak nightstand with single drawer and open shelf",     price: 450.00,  stock: 30, categoryId: 2, isActive: true, frontImageUrl: "/uploads/products/nightstand-oak-front.jpg",    backImageUrl: "/uploads/products/nightstand-oak-back.jpg",    styleIds: [2, 3] },

  // Dining Room (categoryId: 3)
  { _id: 10, name: "Palazzo Dining Table",     description: "Marble-top dining table with gold legs, seats 6",            price: 5200.00, stock: 4,  categoryId: 3, isActive: true, frontImageUrl: "/uploads/products/table-palazzo-front.jpg",     backImageUrl: "/uploads/products/table-palazzo-back.jpg",     styleIds: [4, 1] },
  { _id: 11, name: "Urban Dining Table",       description: "Reclaimed wood dining table with steel frame, seats 8",      price: 2900.00, stock: 6,  categoryId: 3, isActive: true, frontImageUrl: "/uploads/products/table-urban-front.jpg",       backImageUrl: "/uploads/products/table-urban-back.jpg",       styleIds: [3] },
  { _id: 12, name: "Tulum Dining Chair",       description: "Woven rattan seat on wooden legs, sold per chair",           price: 380.00,  stock: 50, categoryId: 3, isActive: true, frontImageUrl: "/uploads/products/chair-tulum-front.jpg",       backImageUrl: "/uploads/products/chair-tulum-back.jpg",       styleIds: [5, 2] },
  { _id: 13, name: "Classic Dining Chair",     description: "Padded dining chair in ivory fabric on carved legs",         price: 520.00,  stock: 40, categoryId: 3, isActive: true, frontImageUrl: "/uploads/products/chair-classic-front.jpg",     backImageUrl: "/uploads/products/chair-classic-back.jpg",     styleIds: [4] },

  // Office (categoryId: 4)
  { _id: 14, name: "Executive L-Desk",         description: "Corner desk in dark walnut with cable management",            price: 2200.00, stock: 8,  categoryId: 4, isActive: true, frontImageUrl: "/uploads/products/desk-exec-front.jpg",         backImageUrl: "/uploads/products/desk-exec-back.jpg",         styleIds: [1, 3] },
  { _id: 15, name: "Scandi Work Desk",         description: "Compact white desk with drawer, ideal for home offices",     price: 890.00,  stock: 18, categoryId: 4, isActive: true, frontImageUrl: "/uploads/products/desk-scandi-front.jpg",       backImageUrl: "/uploads/products/desk-scandi-back.jpg",       styleIds: [2] },
  { _id: 16, name: "Ergonomic Mesh Chair",     description: "Fully adjustable ergonomic office chair with lumbar support",price: 1100.00, stock: 22, categoryId: 4, isActive: true, frontImageUrl: "/uploads/products/chair-ergo-front.jpg",        backImageUrl: "/uploads/products/chair-ergo-back.jpg",        styleIds: [1] },

  // Outdoor (categoryId: 5)
  { _id: 17, name: "Garden Lounge Set",        description: "4-piece weather-resistant rattan lounge set with cushions",  price: 3600.00, stock: 6,  categoryId: 5, isActive: true, frontImageUrl: "/uploads/products/outdoor-lounge-front.jpg",    backImageUrl: "/uploads/products/outdoor-lounge-back.jpg",    styleIds: [5, 2] },
  { _id: 18, name: "Teak Bistro Table",        description: "Small round teak table for balcony or garden, 70 cm dia.",   price: 750.00,  stock: 14, categoryId: 5, isActive: true, frontImageUrl: "/uploads/products/outdoor-bistro-front.jpg",    backImageUrl: "/uploads/products/outdoor-bistro-back.jpg",    styleIds: [2] },
  { _id: 19, name: "Hammock Chair",            description: "Hanging hammock chair in bohemian macrame style",             price: 420.00,  stock: 25, categoryId: 5, isActive: true, frontImageUrl: "/uploads/products/outdoor-hammock-front.jpg",   backImageUrl: "/uploads/products/outdoor-hammock-back.jpg",   styleIds: [5] },
  { _id: 20, name: "Industrial Bar Stool",     description: "Adjustable metal bar stool with footrest, set of 2",         price: 640.00,  stock: 0,  categoryId: 1, isActive: false, frontImageUrl: "/uploads/products/stool-bar-front.jpg",         backImageUrl: "/uploads/products/stool-bar-back.jpg",         styleIds: [3] }
]);

// ── 5. ORDERS (with embedded items) ──────────────────────────
db.orders.insertMany([
  {
    _id: 1, userId: 2,
    orderDate: new Date("2025-12-01T10:30:00Z"),
    status: "Delivered", totalPrice: 4130.00,
    items: [
      { orderItemId: 1,  productId: 1,  quantity: 1, priceAtPurchase: 3200.00 },
      { orderItemId: 2,  productId: 4,  quantity: 1, priceAtPurchase:  680.00 },
      { orderItemId: 3,  productId: 9,  quantity: 1, priceAtPurchase:  450.00 }
    ]
  },
  {
    _id: 2, userId: 3,
    orderDate: new Date("2025-12-15T14:00:00Z"),
    status: "Delivered", totalPrice: 3480.00,
    items: [
      { orderItemId: 4,  productId: 6,  quantity: 1, priceAtPurchase: 2400.00 },
      { orderItemId: 5,  productId: 9,  quantity: 2, priceAtPurchase:  450.00 },
      { orderItemId: 6,  productId: 16, quantity: 1, priceAtPurchase: 1100.00 }
    ]
  },
  {
    _id: 3, userId: 4,
    orderDate: new Date("2026-01-05T09:15:00Z"),
    status: "Delivered", totalPrice: 6700.00,
    items: [
      { orderItemId: 7,  productId: 10, quantity: 1, priceAtPurchase: 5200.00 },
      { orderItemId: 8,  productId: 13, quantity: 4, priceAtPurchase:  520.00 }
    ]
  },
  {
    _id: 4, userId: 5,
    orderDate: new Date("2026-01-20T16:45:00Z"),
    status: "Shipped", totalPrice: 2200.00,
    items: [
      { orderItemId: 9,  productId: 14, quantity: 1, priceAtPurchase: 2200.00 }
    ]
  },
  {
    _id: 5, userId: 2,
    orderDate: new Date("2026-02-10T11:00:00Z"),
    status: "Delivered", totalPrice: 1270.00,
    items: [
      { orderItemId: 10, productId: 15, quantity: 1, priceAtPurchase: 890.00 },
      { orderItemId: 11, productId: 4,  quantity: 1, priceAtPurchase: 680.00 }
    ]
  },
  {
    _id: 6, userId: 6,
    orderDate: new Date("2026-03-01T08:30:00Z"),
    status: "Processing", totalPrice: 4350.00,
    items: [
      { orderItemId: 12, productId: 7,  quantity: 1, priceAtPurchase: 4500.00 }
    ]
  },
  {
    _id: 7, userId: 7,
    orderDate: new Date("2026-03-18T13:20:00Z"),
    status: "Delivered", totalPrice: 4970.00,
    items: [
      { orderItemId: 13, productId: 17, quantity: 1, priceAtPurchase: 3600.00 },
      { orderItemId: 14, productId: 18, quantity: 1, priceAtPurchase:  750.00 },
      { orderItemId: 15, productId: 19, quantity: 1, priceAtPurchase:  420.00 }
    ]
  },
  {
    _id: 8, userId: 3,
    orderDate: new Date("2026-04-02T15:00:00Z"),
    status: "Delivered", totalPrice: 2800.00,
    items: [
      { orderItemId: 16, productId: 2,  quantity: 1, priceAtPurchase: 2800.00 }
    ]
  },
  {
    _id: 9, userId: 4,
    orderDate: new Date("2026-04-25T10:10:00Z"),
    status: "Processing", totalPrice: 1820.00,
    items: [
      { orderItemId: 17, productId: 12, quantity: 2, priceAtPurchase: 380.00  },
      { orderItemId: 18, productId: 5,  quantity: 1, priceAtPurchase: 1250.00 }
    ]
  },
  {
    _id: 10, userId: 5,
    orderDate: new Date("2026-05-01T09:00:00Z"),
    status: "Pending", totalPrice: 3200.00,
    items: [
      { orderItemId: 19, productId: 1,  quantity: 1, priceAtPurchase: 3200.00 }
    ]
  }
]);

// ── 6. REQUEST LOGS ───────────────────────────────────────────
db.requestLogs.insertMany([
  { _id: 1,  host: "localhost:5000", method: "GET",    path: "/api/Product",           referer: null,                         userAgent: "Mozilla/5.0 (Windows NT 10.0)",    recordDate: new Date("2026-05-10T08:01:00Z") },
  { _id: 2,  host: "localhost:5000", method: "GET",    path: "/api/Product/1",         referer: "http://localhost:4200/shop",  userAgent: "Mozilla/5.0 (Windows NT 10.0)",    recordDate: new Date("2026-05-10T08:02:10Z") },
  { _id: 3,  host: "localhost:5000", method: "POST",   path: "/api/Users/login",       referer: "http://localhost:4200/login", userAgent: "Mozilla/5.0 (iPhone; CPU iPhone)", recordDate: new Date("2026-05-10T08:05:33Z") },
  { _id: 4,  host: "localhost:5000", method: "GET",    path: "/api/Category",          referer: null,                         userAgent: "Mozilla/5.0 (Macintosh)",          recordDate: new Date("2026-05-10T08:10:00Z") },
  { _id: 5,  host: "localhost:5000", method: "POST",   path: "/api/Order",             referer: "http://localhost:4200/cart",  userAgent: "Mozilla/5.0 (Windows NT 10.0)",    recordDate: new Date("2026-05-10T08:15:22Z") },
  { _id: 6,  host: "localhost:5000", method: "GET",    path: "/api/Product",           referer: null,                         userAgent: "Mozilla/5.0 (Linux; Android 12)",  recordDate: new Date("2026-05-10T09:00:01Z") },
  { _id: 7,  host: "localhost:5000", method: "GET",    path: "/api/Style",             referer: "http://localhost:4200/",     userAgent: "Mozilla/5.0 (Windows NT 10.0)",    recordDate: new Date("2026-05-10T09:05:44Z") },
  { _id: 8,  host: "localhost:5000", method: "PUT",    path: "/api/Product/3",         referer: "http://localhost:4200/admin",userAgent: "Mozilla/5.0 (Windows NT 10.0)",    recordDate: new Date("2026-05-10T09:30:00Z") },
  { _id: 9,  host: "localhost:5000", method: "DELETE", path: "/api/Product/20",        referer: "http://localhost:4200/admin",userAgent: "Mozilla/5.0 (Windows NT 10.0)",    recordDate: new Date("2026-05-10T09:31:05Z") },
  { _id: 10, host: "localhost:5000", method: "GET",    path: "/api/Order/user/2",      referer: "http://localhost:4200/orders",userAgent: "Mozilla/5.0 (Windows NT 10.0)",   recordDate: new Date("2026-05-10T10:00:00Z") },
  { _id: 11, host: "localhost:5000", method: "POST",   path: "/api/Users/register",    referer: "http://localhost:4200/register",userAgent: "Mozilla/5.0 (iPhone; CPU iPhone)",recordDate: new Date("2026-05-11T07:45:12Z") },
  { _id: 12, host: "localhost:5000", method: "GET",    path: "/api/Product",           referer: null,                         userAgent: "Mozilla/5.0 (Windows NT 10.0)",    recordDate: new Date("2026-05-11T08:20:00Z") },
  { _id: 13, host: "localhost:5000", method: "POST",   path: "/api/Ai/chat",           referer: "http://localhost:4200/chat", userAgent: "Mozilla/5.0 (Macintosh)",          recordDate: new Date("2026-05-11T09:10:55Z") },
  { _id: 14, host: "localhost:5000", method: "GET",    path: "/api/Category",          referer: null,                         userAgent: "Mozilla/5.0 (Linux; Android 12)",  recordDate: new Date("2026-05-11T09:55:00Z") },
  { _id: 15, host: "localhost:5000", method: "GET",    path: "/api/Product",           referer: "http://localhost:4200/shop", userAgent: "Mozilla/5.0 (Windows NT 10.0)",    recordDate: new Date("2026-05-11T10:30:00Z") }
]);

// ── SUMMARY ───────────────────────────────────────────────────
print("Seed complete!");
print("categories:  " + db.categories.countDocuments());
print("styles:      " + db.styles.countDocuments());
print("users:       " + db.users.countDocuments());
print("products:    " + db.products.countDocuments());
print("orders:      " + db.orders.countDocuments());
print("requestLogs: " + db.requestLogs.countDocuments());
