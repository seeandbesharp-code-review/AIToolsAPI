// Run in mongosh or MongoDB Compass Playground
// Purpose:
// 1) Expects raw imported collections from SQL export (users_raw, products_raw, etc.)
// 2) Builds final MongoDB collections while preserving SQL ids as _id

use("CozyGenDB");

function toDateSafe(value) {
  if (!value) return null;
  try {
    return new Date(value);
  } catch (e) {
    return null;
  }
}

// 1) users
if (db.getCollectionNames().includes("users_raw")) {
  db.users.deleteMany({});
  const users = db.users_raw.find().toArray().map(u => ({
    _id: Number(u.UserId),
    email: u.Email,
    passwordHash: u.PasswordHash,
    firstName: u.FirstName,
    lastName: u.LastName,
    phone: u.Phone || null,
    address: u.Address || null,
    role: u.Role,
    isClubMember: Boolean(u.IsClubMember)
  }));
  if (users.length) db.users.insertMany(users, { ordered: false });
}

// 2) categories
if (db.getCollectionNames().includes("categories_raw")) {
  db.categories.deleteMany({});
  const categories = db.categories_raw.find().toArray().map(c => ({
    _id: Number(c.CategoryId),
    name: c.Name,
    description: c.Description || null,
    imageUrl: c.ImageUrl || null
  }));
  if (categories.length) db.categories.insertMany(categories, { ordered: false });
}

// 3) styles
if (db.getCollectionNames().includes("styles_raw")) {
  db.styles.deleteMany({});
  const styles = db.styles_raw.find().toArray().map(s => ({
    _id: Number(s.StyleId),
    name: s.Name,
    description: s.Description || null,
    imageUrl: s.ImageUrl || null
  }));
  if (styles.length) db.styles.insertMany(styles, { ordered: false });
}

// 4) products + styleIds from productStyles_raw
if (db.getCollectionNames().includes("products_raw")) {
  db.products.deleteMany({});

  const styleMap = {};
  if (db.getCollectionNames().includes("productStyles_raw")) {
    db.productStyles_raw.find().forEach(ps => {
      const productId = Number(ps.ProductId);
      const styleId = Number(ps.StyleId);
      if (!styleMap[productId]) styleMap[productId] = [];
      if (!styleMap[productId].includes(styleId)) styleMap[productId].push(styleId);
    });
  }

  const products = db.products_raw.find().toArray().map(p => ({
    _id: Number(p.ProductId),
    name: p.Name,
    description: p.Description || null,
    price: Number(p.Price),
    stock: Number(p.Stock),
    categoryId: Number(p.CategoryId),
    isActive: Boolean(p.IsActive),
    frontImageUrl: p.FrontImageUrl || null,
    backImageUrl: p.BackImageUrl || null,
    styleIds: styleMap[Number(p.ProductId)] || []
  }));

  if (products.length) db.products.insertMany(products, { ordered: false });
}

// 5) orders + embedded items from orderItems_raw
if (db.getCollectionNames().includes("orders_raw")) {
  db.orders.deleteMany({});

  const itemsMap = {};
  if (db.getCollectionNames().includes("orderItems_raw")) {
    db.orderItems_raw.find().forEach(oi => {
      const orderId = Number(oi.OrderId);
      if (!itemsMap[orderId]) itemsMap[orderId] = [];
      itemsMap[orderId].push({
        orderItemId: Number(oi.OrderItemId),
        productId: Number(oi.ProductId),
        quantity: Number(oi.Quantity),
        priceAtPurchase: Number(oi.PriceAtPurchase)
      });
    });
  }

  const orders = db.orders_raw.find().toArray().map(o => ({
    _id: Number(o.OrderId),
    userId: Number(o.UserId),
    orderDate: toDateSafe(o.OrderDate),
    status: o.Status,
    totalPrice: Number(o.TotalPrice),
    items: itemsMap[Number(o.OrderId)] || []
  }));

  if (orders.length) db.orders.insertMany(orders, { ordered: false });
}

// 6) request logs (Rating)
if (db.getCollectionNames().includes("ratings_raw")) {
  db.requestLogs.deleteMany({});
  const logs = db.ratings_raw.find().toArray().map(r => ({
    _id: Number(r.RatingId),
    host: r.Host || null,
    method: r.Method || null,
    path: r.Path || null,
    referer: r.Referer || null,
    userAgent: r.UserAgent || null,
    recordDate: toDateSafe(r.RecordDate)
  }));
  if (logs.length) db.requestLogs.insertMany(logs, { ordered: false });
}

print("Transformation from *_raw collections finished.");
print("users:", db.users.countDocuments());
print("categories:", db.categories.countDocuments());
print("styles:", db.styles.countDocuments());
print("products:", db.products.countDocuments());
print("orders:", db.orders.countDocuments());
print("requestLogs:", db.requestLogs.countDocuments());
