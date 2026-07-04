# Deployed Version Updates — PrimalPrep

Updates implemented in the deployed version of PrimalPrep:

1. **Niche Identity & Design**: Rebranded the app to **PrimalPrep** with a clean, rustic, and minimalist theme. Implemented a deep dark cyberpunk-kitchen visual style with responsive CSS grids, radial glows, and custom checklist styles.
2. **INR Budget Logic**: Shifted the entire pricing system to INR (₹). Configured the budget slider between ₹100-₹2500 (default ₹500), mapping estimates to real-world Indian grocery parameters (₹240/serving base). Updated feasibility tips to suggest affordable local options (paneer, lentils).
3. **Interactive Tracking**: Created dynamic checkbox task-lists for cooking workflows and shopping trips. Built a pantry manager to flag existing items as free in the grocery list, alongside dynamic vegan/gluten-free swaps.
4. **GitHub Pages Pipeline**: Configured Vite sub-pathing base routing and set up `.github/workflows/deploy.yml` to trigger automatic builds on branch pushes.
