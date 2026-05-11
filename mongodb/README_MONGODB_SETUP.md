# MongoDB setup for CozyGen assignment

This folder gives you ready scripts to create and populate MongoDB from SQL exports.

## Files
- `01_create_schema.js`: creates database collections and indexes.
- `02_transform_staging_to_final.js`: transforms imported raw SQL JSON data into final MongoDB collections.

## Where to run
You can run both scripts in either:
1) MongoDB Compass Playground
2) mongosh terminal

## Fast run in Compass
1. Open Compass and connect.
2. Click `+` next to tabs and open `MongoDB Playground`.
3. Copy/paste `01_create_schema.js` and click Run.
4. Create/import raw collections (`users_raw`, `categories_raw`, `styles_raw`, `products_raw`, `productStyles_raw`, `orders_raw`, `orderItems_raw`, `ratings_raw`).
5. Run `02_transform_staging_to_final.js` in a new Playground tab.

## Expected final collections
- users
- categories
- styles
- products
- orders
- requestLogs

## Notes
- SQL numeric IDs are preserved as Mongo `_id` values.
- Product styles are represented as `products.styleIds` array.
- Order items are embedded under `orders.items`.
- Final DB name in scripts is `CozyGenDB`.
