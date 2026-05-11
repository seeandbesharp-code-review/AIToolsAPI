// Run in mongosh or MongoDB Compass Playground
// Creates CozyGenDB schema (collections + indexes)

use("CozyGenDB");

// Create collections
if (!db.getCollectionNames().includes("users")) db.createCollection("users");
if (!db.getCollectionNames().includes("categories")) db.createCollection("categories");
if (!db.getCollectionNames().includes("styles")) db.createCollection("styles");
if (!db.getCollectionNames().includes("products")) db.createCollection("products");
if (!db.getCollectionNames().includes("orders")) db.createCollection("orders");
if (!db.getCollectionNames().includes("requestLogs")) db.createCollection("requestLogs");

// Indexes equivalent to SQL unique/lookup behavior
// Users
try { db.users.createIndex({ _id: 1 }, { unique: true, name: "pk_userid" }); } catch (e) {}
try { db.users.createIndex({ email: 1 }, { unique: true, name: "uq_users_email" }); } catch (e) {}

// Categories
try { db.categories.createIndex({ _id: 1 }, { unique: true, name: "pk_categoryid" }); } catch (e) {}
try { db.categories.createIndex({ name: 1 }, { unique: true, name: "uq_categories_name" }); } catch (e) {}

// Styles
try { db.styles.createIndex({ _id: 1 }, { unique: true, name: "pk_styleid" }); } catch (e) {}
try { db.styles.createIndex({ name: 1 }, { unique: true, name: "uq_styles_name" }); } catch (e) {}

// Products
try { db.products.createIndex({ _id: 1 }, { unique: true, name: "pk_productid" }); } catch (e) {}
try { db.products.createIndex({ categoryId: 1 }, { name: "ix_products_categoryid" }); } catch (e) {}
try { db.products.createIndex({ styleIds: 1 }, { name: "ix_products_styleids" }); } catch (e) {}
try { db.products.createIndex({ price: 1 }, { name: "ix_products_price" }); } catch (e) {}
try { db.products.createIndex({ isActive: 1 }, { name: "ix_products_isactive" }); } catch (e) {}

// Orders (with embedded items)
try { db.orders.createIndex({ _id: 1 }, { unique: true, name: "pk_orderid" }); } catch (e) {}
try { db.orders.createIndex({ userId: 1, orderDate: -1 }, { name: "ix_orders_user_date" }); } catch (e) {}
try { db.orders.createIndex({ "items.productId": 1 }, { name: "ix_orders_items_productid" }); } catch (e) {}

// Request logs
try { db.requestLogs.createIndex({ _id: 1 }, { unique: true, name: "pk_ratingid" }); } catch (e) {}
try { db.requestLogs.createIndex({ recordDate: -1 }, { name: "ix_requestlogs_recorddate" }); } catch (e) {}
try { db.requestLogs.createIndex({ method: 1, path: 1 }, { name: "ix_requestlogs_method_path" }); } catch (e) {}

print("CozyGenDB schema creation finished.");
print("Collections:", db.getCollectionNames().join(", "));
