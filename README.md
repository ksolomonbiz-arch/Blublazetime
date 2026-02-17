# BluBlazeTime — Deployment Guide

## What's In This Folder
Everything you need to put BluBlazeTime live on Vercel. The code is built and tested — it compiles clean with zero errors.

---

## How to Deploy on Vercel (Step by Step)

### Option A: The Easiest Way (drag and drop)
1. Go to **vercel.com** and sign up (free account works)
2. On your dashboard, click **"Add New → Project"**
3. Click **"Upload"** (at the bottom of the import page)
4. Drag this entire **blublazetime** folder into the upload area
5. Vercel auto-detects it's a Vite/React project — just click **"Deploy"**
6. In about 60 seconds you'll get a live URL like `blublazetime.vercel.app`

### Option B: Connect Through GitHub (better for updates)
1. Create a free **GitHub** account if you don't have one (github.com)
2. Create a new repository called `blublazetime`
3. Upload all the files from this folder into that repository
4. Go to **vercel.com**, click **"Add New → Project"**
5. Connect your GitHub account and select the `blublazetime` repo
6. Click **"Deploy"**
7. Now every time you update files on GitHub, Vercel automatically updates the live site

### Connecting Your Domain (blublazetime.com)
1. In Vercel, go to your project → **Settings → Domains**
2. Type in `blublazetime.com` and click **Add**
3. Vercel will give you DNS settings (nameservers or records)
4. Go to wherever you bought the domain (GoDaddy, Namecheap, etc.)
5. Update the DNS/nameservers to what Vercel tells you
6. Wait 10-30 minutes — your site will be live at blublazetime.com

---

## Project Structure (what each file does)
```
blublazetime/
├── index.html          ← The "front door" of the site
├── package.json        ← Lists what tools the project needs
├── vite.config.js      ← Build settings (don't need to touch this)
├── src/
│   ├── main.jsx        ← Startup file (don't need to touch this)
│   └── App.jsx         ← ALL of your site code lives here
└── public/             ← Put images/logos here later
```

## Need to Make Changes Later?
All the content — activities, events, sections — lives in **src/App.jsx**. 
But even easier: use the ⚙️ Admin Panel button (bottom-right corner on the live site) 
to add/edit/delete activities and events without touching any code.
