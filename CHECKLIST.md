# Portfolio checklist (Miguelito)

Last updated: 2026-09-28. Use this as the living "what else" list.
Ecommerce `#` stays empty until you drop a live URL. Mini-game / inventory are **optional flavor**, not hire blockers.

---

## Hire blockers (do these first)

- [x] Mobile responsive pass (drawer nav, no fixed 280px sidebar on phone)
- [x] Resume PDF wired (`/images/resume.pdf` on About + mobile top bar)
- [x] Contact: phone, LinkedIn, Formspree, Messenger QR, faculty refs modal
- [x] About CTAs: Quest Board / Resume / Start a Quest
- [x] Same-page links smooth-slide (nav + About action links + landing CTA)
- [x] RenTruck brief, pin, sort, live Vercel link
- [x] Side Quests cert images (Cer1-12)
- [x] Auto level / XP from DOB
- [ ] **Phone walkthrough** of full site after latest pull (you)
- [ ] **Ecommerce live URL** (replace `liveLink: "#"` in `public/js/projects.js`) when ready
- [ ] Capstone defense prep (Oct 3) - portfolio is support, not the defense

---

## Content waiting on you

- [ ] Ecommerce deployed URL
- [ ] QuestLog A-rank card + live/demo link (separate repo; only link from portfolio when shipped)
- [ ] Optional: LinkedIn About rewrite (profile was low-effort)
- [ ] Optional: Fourthfolio move off github.io if Pages still warns
- [ ] Optional: compress knight `.glb` if landing feels heavy on mid phones

---

## RPG flavor (curiosity track - ship only if it feels worth it)

### Mini-games
- [x] **v1 Bug Bash** on Hobbies (tap bugs, timer, lives, best score in localStorage)
  - Opt-in start (no rAF until you press START)
  - Pauses if you scroll away or hide the tab
  - No particle spam, no load cost on Projects
- [ ] Your call after trying v1: keep / tweak / kill
- [ ] Optional later: second mini-game (only if v1 is a hit)
- [ ] Optional: soft click SFX (very quiet, muted by default)

### Inventory system
- [ ] **Not started** - next flavor item if Bug Bash is a yes
- [ ] Idea sketch (when we build it):
  - "Adventurer Pack" panel on Hobbies or About
  - Slots: languages, tools, cert badges, project relics
  - Click item = short tooltip lore (1-2 lines), not a novel
  - localStorage "collected" after visiting sections or finishing Bug Bash
  - Keep it static-first so recruiters who skip games still see skills

### Long dialogue trees
- [ ] **Skip for hire path** - too much text before Projects
- [ ] If ever: 3-choice tavern NPC max, skippable, never blocks nav

### Particles / heavy FX
- [ ] **Do not add** more particle spam
- [ ] Do not add anything that delays opening Projects

---

## Polish / regressions to watch

- [ ] Re-test mobile drawer on real Android + iOS Safari
- [ ] Confirm About "ENTER QUEST BOARD" and "START A QUEST" **slide**, not jump
- [ ] Confirm landing "BEGIN ADVENTURE" still slides to About
- [ ] Map location pins still smooth-scroll after modal close
- [ ] iOS inputs stay 16px (no zoom-on-focus)
- [ ] No horizontal overflow on 375px width
- [ ] Demo video modal still works on mobile (Android quests)
- [ ] Messenger + refs modals center on small screens

---

## Explicitly out of scope (for now)

- Nesting QuestLog inside this repo
- Publishing Metro / exp:// tunnel URLs
- Fake metrics or GPS claims on RenTruck
- Dumping all 12 certs onto the one-page resume
- Live Vercel for native Android (JPG + MP4 demo modal only)
- Service-role Supabase keys in any client

---

## Suggested order

1. Pull + phone test mobile + smooth links + Bug Bash  
2. Drop ecommerce URL when you have it  
3. Say keep/kill on Bug Bash → then inventory if keep  
4. QuestLog card when that app is demoable  
5. Defense week: resume PDF + RenTruck story only  

---

## Quick git (Windows CMD - no `#` comment lines)

```bat
cd C:\Users\Admin\portfolio-website
git checkout arena/01a09f58-portfolio-website
git pull origin arena/01a09f58-portfolio-website
```
