# Backend Setup Guide

This project currently runs as a frontend-only demo with LocalStorage.

If you want real admin protection, real payments, and safe downloads, the next step is to connect a backend.

## Best backend options

1. Supabase
   Good for fast setup, admin login, database, storage, and row-level security.

2. Firebase
   Good if you want Google-based auth, Firestore, and file storage quickly.

3. Node.js + Express
   Best if you want full control over payments, admin roles, and product delivery.

## Features the backend should handle

- Admin authentication
- Product CRUD APIs
- Community post CRUD APIs
- Purchase records in database
- Payment submission upload storage
- Protected download links
- Buyer accounts and order history

## Suggested API routes

- `POST /api/admin/login`
- `GET /api/products`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `GET /api/posts`
- `POST /api/posts`
- `PUT /api/posts/:id`
- `DELETE /api/posts/:id`
- `POST /api/payments`
- `GET /api/purchases`
- `POST /api/purchases/unlock`

## Recommended upgrade order

1. Add real admin login
2. Move products and posts from LocalStorage into database
3. Upload payment screenshots to storage
4. Save purchases in database
5. Protect download URLs

## Tell me which backend you want

Reply with one of these:

- `Use Supabase`
- `Use Firebase`
- `Use Node/Express`

Then I can wire the next version for you.
