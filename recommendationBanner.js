/**
 * Recommendation Banner
 * Cycles through city recommendations every 20 seconds with fade transitions.
 * Injects live weather-based recommendations when weather data is available.
 */

import { CITY_RECOMMENDATIONS } from "./cityRecommendations.js"

// Weather-based recommendation templates
// icon: nerd font icon character, condition: label match (partial), templates per city or generic
const WEATHER_RECOMMENDATIONS = [
  {
    match: (label) => /clear|sunny/i.test(label),
    generic: (city) => `The skies over <strong>${city}</strong> are clear right now — perfect conditions for exploring outdoor landmarks and soaking up the local atmosphere.`,
    city: {
      "barcelona": `Clear skies in <strong>Barcelona</strong> today — head straight for Park Güell or walk the Barceloneta promenade for golden-hour views over the Mediterranean.`,
      "tokyo":     `Sunny in <strong>Tokyo</strong>! It's the ideal day to wander Shinjuku Gyoen park or catch a panoramic view from the Tokyo Skytree.`,
      "paris":     `Paris is bright and clear right now — the perfect excuse to climb the Eiffel Tower or picnic in the Jardin des Plantes.`,
      "london":    `Rare sunshine in <strong>London</strong>! Make the most of it with a walk across Tower Bridge and a stroll through Hyde Park.`,
      "new-york":  `Clear skies over <strong>New York</strong> — grab a coffee and walk the High Line, or head to Central Park for the afternoon.`,
      "amsterdam": `Beautiful clear weather in <strong>Amsterdam</strong> — rent a bike, follow the canals, and don't miss the Vondelpark in this light.`,
    }
  },
  {
    match: (label) => /cloud|overcast/i.test(label),
    generic: (city) => `Overcast skies in <strong>${city}</strong> are no reason to stay home — they make for great museum weather and moody street photography.`,
    city: {
      "barcelona": `Cloudy in <strong>Barcelona</strong>? Perfect weather to explore the indoor halls of the Picasso Museum or browse the Boqueria market.`,
      "tokyo":     `Cloudy skies over <strong>Tokyo</strong> — a great excuse to spend the day in the teamLab digital art museums or explore Akihabara.`,
      "london":    `Classic London overcast today. Embrace it — head to the British Museum or the Tate Modern for a world-class afternoon indoors.`,
      "amsterdam": `Grey skies in <strong>Amsterdam</strong> set the perfect mood for the Rijksmuseum and a slow canal boat tour.`,
    }
  },
  {
    match: (label) => /rain|drizzle|shower/i.test(label),
    generic: (city) => `It's raining in <strong>${city}</strong> today, but that just means the cafés, galleries, and covered markets are all the more inviting.`,
    city: {
      "paris":    `Rainy in <strong>Paris</strong>? Très bien. Settle into a corner brasserie, order a croque-monsieur, and watch the city shimmer in the wet cobblestones.`,
      "london":   `Rain in <strong>London</strong>? Perfectly at home here. Duck into Borough Market, the National Gallery, or a cosy pub near the Thames.`,
      "tokyo":    `Rainy day in <strong>Tokyo</strong> — the underground malls of Shinjuku and the covered shotengai shopping arcades are your best friends right now.`,
      "amsterdam":`A rainy afternoon in <strong>Amsterdam</strong> is an invitation to slow down in the Anne Frank House or discover a hidden brown café (bruine kroeg).`,
    }
  },
  {
    match: (label) => /snow/i.test(label),
    generic: (city) => `Snow in <strong>${city}</strong> transforms the city into something magical — wrap up warm and see the landmarks in a completely new light.`,
  },
  {
    match: (label) => /thunder|storm/i.test(label),
    generic: (city) => `There's a storm rolling through <strong>${city}</strong> — a great excuse to stay cosy indoors with local cuisine and a glass of whatever the region does best.`,
  },
  {
    match: (label) => /fog/i.test(label),
    generic: (city) => `Misty skies over <strong>${city}</strong> lend the city a mysterious, cinematic atmosphere — perfect for slow walks and moody street photography.`,
  },
];

// Fallback recommendations shown before any city is selected
const DEFAULT_RECOMMENDATIONS = [
  "Not sure where to go? <strong>Barcelona</strong> mixes Gaudí's surreal architecture with Mediterranean beaches — a city that never stops surprising you.",
  "If you haven't been to <strong>Tokyo</strong>, you're missing the extraordinary collision of ancient temples and neon-lit streets that defines modern Japan.",
  "<strong>Paris</strong> is more than the Eiffel Tower — it's croissants before 8am, bookshops along the Seine, and neighbourhoods that each feel like a world of their own.",
  "<strong>Amsterdam</strong>'s canals, world-class museums, and legendary open spirit make it one of Europe's most rewarding — and most walkable — cities.",
  "The city that never sleeps: <strong>New York</strong> offers an endless loop of culture, food, and neighbourhoods that beg to be explored on foot.",
  "<strong>London</strong> wears 800 years of history lightly — Roman walls sit beside glass towers, and there's always a new corner to discover.",
];

// --- State ---
let bannerRecommendations = [...DEFAULT_RECOMMENDATIONS];
let currentIndex = 0;
let rotationTimer = null;

// --- DOM setup (runs once) ---
function createBanner() {
  const banner = document.createElement("div");
  banner.id = "recommendation-banner";
  banner.innerHTML = `
    <div id="rec-inner">
      <span id="rec-icon" aria-hidden="true"></span>
      <div id="rec-body">
        <span id="rec-label">✦ recommended destination</span>
        <p id="rec-text"></p>
      </div>
      <div id="rec-dots" aria-hidden="true"></div>
    </div>
  `;
  document.body.appendChild(banner);
}

function buildDots(count, active) {
  const dotsEl = document.getElementById("rec-dots");
  dotsEl.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const d = document.createElement("span");
    d.className = "rec-dot" + (i === active ? " rec-dot--active" : "");
    dotsEl.appendChild(d);
  }
}

function showRecommendation(index, animate = true) {
  const textEl = document.getElementById("rec-text");
  const iconEl = document.getElementById("rec-icon");

  if (!textEl || !iconEl) return;

  const doFade = animate;

  if (doFade) {
    textEl.classList.add("rec-fade-out");
    iconEl.classList.add("rec-fade-out");
  }

  const swap = () => {
    textEl.innerHTML = bannerRecommendations[index];
    // Pick a generic travel icon that cycles nicely
    const icons = ["✈", "🌍", "🗺", "🧳", "🌐", "🏙"];
    iconEl.textContent = icons[index % icons.length];
    buildDots(bannerRecommendations.length, index);

    if (doFade) {
      textEl.classList.remove("rec-fade-out");
      iconEl.classList.remove("rec-fade-out");
      textEl.classList.add("rec-fade-in");
      iconEl.classList.add("rec-fade-in");

      const cleanup = () => {
        textEl.classList.remove("rec-fade-in");
        iconEl.classList.remove("rec-fade-in");
      };
      textEl.addEventListener("animationend", cleanup, { once: true });
    }
  };

  if (doFade) {
    setTimeout(swap, 400); // wait for fade-out
  } else {
    swap();
  }
}

function startRotation() {
  if (rotationTimer) clearInterval(rotationTimer);
  rotationTimer = setInterval(() => {
    currentIndex = (currentIndex + 1) % bannerRecommendations.length;
    showRecommendation(currentIndex, true);
  }, 20000);
}

/**
 * Called from main.js after weather is fetched for a city.
 * Rebuilds the recommendation list with a weather-aware entry first.
 * @param {string} cityId   - normalised city id, e.g. "tokyo"
 * @param {string} cityName - display name, e.g. "Tokyo"
 * @param {string} weatherLabel - label from WMO_CODES, e.g. "Clear sky"
 */
export function updateBannerForCity(cityId, cityName, weatherLabel) {
  const staticRecs = CITY_RECOMMENDATIONS[cityId] ?? [
    `<strong>${cityName}</strong> is waiting to be discovered — book your trip and see what makes it unforgettable.`
  ];

  // Find a matching weather recommendation
  let weatherRec = null;
  for (const wr of WEATHER_RECOMMENDATIONS) {
    if (wr.match(weatherLabel)) {
      weatherRec = (wr.city && wr.city[cityId]) ? wr.city[cityId] : wr.generic(cityName);
      break;
    }
  }

  // Compose: weather-based first (if found), then static city recs
  bannerRecommendations = weatherRec
    ? [weatherRec, ...staticRecs]
    : [...staticRecs];

  currentIndex = 0;
  showRecommendation(0, true);
  startRotation(); // restart the timer from 0 on city change
}

// --- Init ---
export function initRecommendationBanner() {
  createBanner();
  bannerRecommendations = [...DEFAULT_RECOMMENDATIONS];
  currentIndex = 0;
  showRecommendation(0, false);
  startRotation();
}