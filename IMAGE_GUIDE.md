# Image & hero-video checklist — Airlyf

**Rules for every image**
- ❌ No company names or logos (caps, shirts, vans, toolboxes). Plain charcoal/red uniforms.
- Use the **exact filename** below. PNG or JPG is fine.
- Put files in `public\images\photos\` — Claude converts + optimizes them.
- Keep the main subject in the **centre** (phones crop the sides).

## Priority 1 — Homepage
| # | Filename | Size | Used in | Content |
|---|---|---|---|---|
| 1 | `home-banner` | 3840×2160 | Hero slide 1 | Technicians working on HVAC units — **remove "PURE AIR"** |
| 2 | `tech-duct-system` | 3840×2160 | Hero slide 2 · Ontario & Maritime pages | Technician cleaning a large duct |
| 3 | `tech-attic` | 3840×2160 | Hero slide 3 · stats band | Duct cleaning in an attic/basement |
| 4 | `tech-room` | 3840×2160 | About · reviews background · Manitoba | Ceiling-vent cleaning in a living room — **remove "COMFORT SOLUTIONS"** |
| 5 | `duct-hose` | 3840×2160 | About small photo · Alberta | Cleaning hose/brush inside a duct |
| 6 | `ac-unit` | 3840×2160 | "Not sure what you need?" tile | Outdoor AC unit beside a house |
| 7 | `vent-dusty` | 3200×2400 | Services photo row | Dusty vent grille close-up |
| 8 | `tech-ceiling-vent` | 3200×2400 | Services photo row · Quebec | Technician vacuuming a ceiling vent |

## Priority 2 — Province pages (portrait 2400×3000)
`ontario` · `gta` · `alberta` · `quebec` · `british-columbia` · `manitoba` · `saskatchewan` · `maritime`

Lower priority: `duct-inside` (3200×2400, BC) · `tech-ladder` (3840×2160, Saskatchewan). `vent-grille` is unused — skip.

## Hero videos (optional, recommended)
- Make from images 1–3 (image-to-video). Movement: slow push-in / brush spinning / dust in light beams.
- **6–8 s**, seamless **loop**, **1920×1080** (not 4K — keeps the site fast), **MP4**, **no sound**, no company names.
- Names: `hero-1.mp4`, `hero-2.mp4`, `hero-3.mp4` → put in `public\videos\`.

---

# Prompts

## A. Image prompts
**Add to EVERY image prompt:**
> Photorealistic professional photography, natural lighting, sharp focus, high detail, 16:9, 3840×2160. Plain navy blue uniforms with no text, no logos, no brand names, no writing anywhere on clothing, caps, vans, tools or equipment.

1. **home-banner** — Three HVAC technicians in plain navy blue work overalls over orange t-shirts and plain navy caps, wearing blue nitrile gloves, servicing large modern furnace and air-handler units in a clean mechanical room in a Canadian home basement, flexible silver ducts overhead, copper pipes on the wall, cool grey tones with warm accent light from the left, technicians focused on their work, composition with open space on the left side for text.
2. **tech-duct-system** — A duct cleaning technician in plain navy work pants and a plain orange high-visibility jacket and white hard hat, holding a long rotary brush hose up into a large galvanized steel air duct elbow, a powerful duct-cleaning vacuum machine on the polished concrete floor with blue and orange hoses, industrial mechanical room, subject on the right side of the frame, dramatic soft lighting.
3. **tech-attic** — Two duct cleaning technicians in plain navy coveralls and dust masks cleaning air ducts in a wooden attic of a Canadian house, a warm beam of sunlight from a small window with visible dust particles floating in the air, flexible insulated ducts and a cleaning hose, cinematic warm lighting, subjects on the right, empty space on the left for text.
4. **tech-room** — Two friendly duct cleaning technicians in plain navy polo shirts with no logos, one standing on an orange ladder cleaning a white ceiling air vent with a brush, the other kneeling and inspecting with a flashlight, a bright modern Canadian living room with large windows and warm golden sunlight, an orange shop vacuum and a plain black toolbox on the hardwood floor, clean and professional.
5. **duct-hose** — Close-up of a rotary cleaning brush and vacuum hose inside a dusty metal air duct, dust being pulled away, a technician's gloved hand visible, dramatic side light, shallow depth of field.
6. **ac-unit** — A clean modern outdoor central air conditioner condenser unit beside a beige suburban Canadian house, green lawn and shrubs, bright sunny day, blue sky.
7. **vent-dusty** (4:3, 3200×2400) — Extreme close-up of a dirty white air vent grille covered in thick grey dust and lint, a gloved hand starting to clean it with a brush, macro photography, soft light.
8. **tech-ceiling-vent** (4:3, 3200×2400) — A technician in a plain navy t-shirt vacuuming a ceiling air vent with a long hose in a bright modern home hallway, cool natural light, clean and professional.

**Province photos (portrait 2400×3000) — pattern:**
> Vertical portrait photo, a duct cleaning technician in plain navy uniform [scene], [Canadian city feel], photorealistic, no logos or text.

## B. Google Flow video prompts (Frames to Video, image = first frame, 8 s, 1080p)
**Add to EVERY video prompt:**
> Smooth, slow, cinematic camera movement. Realistic motion. Keep the people's faces and uniforms consistent. No text, no logos, no captions. The last frame should look similar to the first frame so it loops smoothly.

- **hero-1.mp4** (from home-banner) — Slow, steady camera push-in toward the three technicians as they work on the HVAC units, their hands moving naturally as they adjust panels and controls, subtle movement in the background lights.
- **hero-2.mp4** (from tech-duct-system) — The rotary brush spins inside the large metal duct and the hose moves gently as the technician guides it, small puffs of dust drift out of the duct, the camera slowly pans right toward the technician.
- **hero-3.mp4** (from tech-attic) — Dust particles float and swirl slowly through the warm beam of sunlight, the technicians work with the cleaning hose in the attic, very slow camera zoom-in, calm cinematic atmosphere.

Tips: sound is fine (Claude removes it) · regenerate if hands/faces warp · download 1080p.

## C. Hero slide 4 — 3D map of Canada (2 steps)
Will become a 4th hero slide: headline "Serving 8 regions across Canada" + "See service areas" button. Output: `hero-4.mp4` (1080p) in `public\videos\`.

**Step 1 — image (start frame)**
> Ultra-realistic 3D model of the map of Canada, accurate geographic shape, displayed as a premium miniature relief map on a dark navy-blue background, seen from a three-quarter aerial camera angle. The map is positioned on the RIGHT two-thirds of the frame; the LEFT third is empty, dark navy negative space.
> Eight service regions are softly illuminated with thin glowing white and ice-blue borders: British Columbia, Alberta, Saskatchewan, Manitoba, Ontario, the Greater Toronto Area, Quebec, and the Maritime provinces (Nova Scotia, New Brunswick, Prince Edward Island, Newfoundland and Labrador).
> Small, detailed, realistic miniature landmarks stand on the map in their correct locations: Canada Place sails and coastal mountains in British Columbia, the Calgary Tower with the Rocky Mountains in Alberta, the Saskatchewan Legislative Building in Regina, the Canadian Museum for Human Rights in Winnipeg, Manitoba, the CN Tower and Toronto skyline in the Greater Toronto Area, Ontario, the Château Frontenac in Quebec City, and the Peggy's Cove lighthouse in Nova Scotia.
> Thin, subtle glowing white lines connect the regions like a network. Small four-point white sparkle stars twinkle softly above the map. Matte navy and brushed-silver map surface, cinematic soft lighting, gentle depth of field, premium corporate advertising style, photorealistic miniature architecture, 16:9.
> No text, no labels, no city names, no logos, no orange, no cartoon style, no excessive glow, no distorted geography.

Check before step 2: correct Canada shape · landmarks look right · no text · left side empty.

**Step 2 — Google Flow (Frames to Video, image = first frame, 8 s, 1080p)**
> Slow, smooth cinematic camera glide from left to right across the 3D map of Canada, with a very gentle push-in. The glowing borders of the service regions softly pulse, brightening one after another from west to east: British Columbia, Alberta, Saskatchewan, Manitoba, Ontario and the Greater Toronto Area, Quebec, then the Maritime provinces. The thin network lines between regions shimmer with light flowing along them. Small white sparkle stars twinkle gently above the map.
> Keep the map's geographic shape and all landmarks stable and unchanged. The left third of the frame stays dark navy and empty. Calm, premium, slow motion. No text, no logos, no new objects appearing, no distortion. The last frame should look very similar to the first frame so the video loops smoothly.

## D. Service-area landmark photos ("Air duct cleaning across Canada" cards)
Size **1600×1200 (4:3)** · JPG/PNG · put in `public\images\areas\` with these exact names.
Real photos from unsplash.com (free for commercial use) are a great alternative if AI gets a landmark wrong.

**Add to EVERY prompt:**
> Photorealistic professional travel photography, 4:3 landscape, 1600×1200, sharp detail, natural colours, cinematic lighting. The landmark is in the upper two-thirds of the frame; the bottom third is calm and simple (water, grass, sky or road). No text, no signs, no logos, no watermarks, no people's faces.

| Filename | Area | Prompt |
|---|---|---|
| `area-gta` | Greater Toronto Area | The Toronto skyline with the CN Tower at golden hour, seen from across calm Lake Ontario at Toronto Island, warm sunset reflections on the water. |
| `area-ontario` | Ontario | Niagara Falls Horseshoe Falls on a bright summer day, mist rising, a rainbow over the falls, lush green banks. |
| `area-alberta` | Alberta | Moraine Lake in Banff National Park, turquoise water surrounded by the Valley of the Ten Peaks, early morning light, Rocky Mountains. |
| `area-quebec` | Quebec | Château Frontenac in Old Quebec City at blue hour, warm lights glowing, the St. Lawrence River below. |
| `area-british-columbia` | British Columbia | The Vancouver skyline and Canada Place white sails at sunset, the North Shore mountains behind, calm harbour water in front. |
| `area-manitoba` | Manitoba | The Canadian Museum for Human Rights in Winnipeg at The Forks at twilight, its glass tower glowing, the river in front. |
| `area-saskatchewan` | Saskatchewan | The Saskatchewan Legislative Building in Regina reflected in calm Wascana Lake, golden autumn trees, clear blue sky. |
| `area-maritime` | Maritime Provinces | Peggy's Cove lighthouse in Nova Scotia on granite rocks at sunset, Atlantic Ocean waves, dramatic sky. |
