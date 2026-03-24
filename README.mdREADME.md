# MicMag — Official Landing Page

> The magnetic AirPods shirt clip for content creators.

![MicMag](assets/product-concept.png)

## 🚀 Live Site

Deploy to GitHub Pages in 2 minutes — see setup below.

---

## 📁 Project Structure

```
micmag/
├── index.html          # Main landing page
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # Interactivity + form logic
├── assets/
│   ├── product-3d.png      # 3D model render
│   └── product-concept.png # Design concept image
└── README.md
```

---

## ✉️ Setting Up the Waitlist Form

The mailing list uses **Formspree** (free tier: 50 submissions/month).

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form — copy your **Form ID** (looks like `xrgvkpqb`)
3. Open `js/main.js` and replace:
   ```js
   const FORMSPREE_ID = 'YOUR_FORM_ID';
   ```
   With:
   ```js
   const FORMSPREE_ID = 'xrgvkpqb'; // ← your actual ID
   ```
4. Done — form submissions will be emailed to your Formspree account email

> **Need higher volume?** Upgrade to Formspree paid, or swap the endpoint for Mailchimp, ConvertKit, or your own backend.

---

## 🌐 Deploy to GitHub Pages

### Step 1 — Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** → **Pages**
3. Under *Source*, select **Deploy from a branch)**
4. Choose **main** branch, **/ (root)** folder
5. Click **Save**

Your site will be live at:
```
https://micmagltd.github.io/micmag-website/
```
(Usually takes 1–2 minutes to go live)

### Custom Domain (optional)

1. Buy a domain (e.g., `micmag.co`)
2. In GitHub Pages settings, add your custom domain
3. Add a `CNAME` record in your DNS pointing to `micmagltd.github.io`

---

## 🎨 Customising

| What | Where |
|------|-------|
| Brand colours | `css/style.css` → `:root` variables |
| Hero headline | `index.html` → `.hero__title` |
| Pricing / launch date | Update copy in `index.html` |
| Product images | Replace files in `assets/` |
| Form fields | `index.html`  → `#waitlistForm` |

---

## 📦 Tech Stack

- Pure HTML / CSS / JavaScript — zero dependencies
- Google Fonts (Syne + DM Sans)
- Formspree for form handling
- GitHub Pages for hosting

---

## 📄 Licence

© 2025 MicMag. All rights reserved.
