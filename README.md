# Health and Awareness Centre — website

A single, continuous one-page website built with **HTML, CSS and vanilla JavaScript only** (no frameworks, no build step).

## Sections (scroll continuously)
1. **Home** — hero with a product & customer-transformation slideshow (refreshes every 2 seconds), stats and a floating WhatsApp button.
2. **Products** — 2 per row on phones; search, category filters, sorting, *Order on WhatsApp* and *Add to cart* on every product.
3. **About Us** — short description of what we do, the three services and the vision.
4. **Reviews** — 3 reviews at a time, refreshing every 5 seconds.
5. **Contact** — call/WhatsApp details, delivery to all 47 counties, and a form that opens WhatsApp with the message pre-filled.

## Run it
Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080   # then visit http://localhost:8080
```

## Files
| Path | Purpose |
| --- | --- |
| `index.html` | Page structure and all sections |
| `assets/css/styles.css` | Styling, animations, responsive layout |
| `assets/js/data.js` | **All editable content**: products, prices, reviews, transformations, counties |
| `assets/js/app.js` | Behaviour: slideshow, filters, cart, reviews rotation, form, effects |
| `assets/img/` | Images (AI-generated illustrative portraits and scene) |

## Before going live — please check
- **Prices** in `assets/js/data.js` are placeholders (KES). Replace them with real prices.
- **Reviews** in `data.js` are placeholders. Replace them with real customer reviews from your Google Business Profile. Only publish reviews you can verify.
- **Transformation photos** are AI-generated illustrative portraits and are labelled "Illustrative photo" on the site. Replace them with real, consented customer photos before using them as testimonials.
- **Prescription items** (e.g. weight-management capsules) are flagged "Consult first". Check the regulatory requirements with the Pharmacy and Poisons Board of Kenya before selling them online.
- The phone number is `0768 897 642` (WhatsApp: `https://wa.me/254768897642`). Change both in `index.html` and `data.js` if it changes.

## Notes
- The cart is saved in the browser (`localStorage`), so it survives page reloads.
- Animations respect the *reduce motion* accessibility setting.
