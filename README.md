# Ophelia Eligibility Widget

LIVE HERE - https://shriyansh-20.github.io/Ophelia/

<img width="1224" height="772" alt="Screenshot 2026-04-24 at 3 36 33 AM" src="https://github.com/user-attachments/assets/954fecd7-3107-413e-bceb-b163ccdd186a" />



I built this as part of my application for the Software Engineer I role at Ophelia.

Instead of just describing ideas, I wanted to ship something real that could improve the onboarding experience.

---

## What this is

A simple 3-step eligibility checker:
- opioid type  
- usage frequency  
- state  

→ gives instant feedback (no login, no PII)

The goal is to reduce friction before asking users to commit.

---

## Why I built it

While going through the Ophelia flow, one thing stood out:

Users are asked for commitment (phone number, login) before getting any value.

For someone unsure or concerned about privacy, that’s a big ask upfront.

This widget flips that:
→ give value first, ask later

---

## Tech

- React + TypeScript  
- Vite  
- CSS Modules  
- Firebase Remote Config (simulated)  
- basic analytics hooks (steps, completion, drop-off)

---

## How it would fit into the product

This is designed as a **self-contained component** that can be embedded anywhere:

- landing pages  
- onboarding flows  
- partner sites  

Example:

```html
<script src="ophelia-widget.js"></script>
<div id="ophelia-widget"></div>
