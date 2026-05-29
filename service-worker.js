const CACHE_NAME = "quiz-cache-v2";

const urlsToCache = [

  "/",
  "index.html",
  "manifest.json",

  // sub_index
  ".Subject/mm_index.html",
  ".Subject/eng_index.html",
  ".Subject/math_index.html",
  ".Subject/chem_index.html",
  ".Subject/phy_index.html",
  ".Subject/bio_index.html",

  // Subject pages
  ".Subject/English.html",
  ".Subject/Myanmar.html",
  ".Subject/Mathematics.html",
  ".Subject/Chemistry.html",
  ".Subject/Biology.html",
  ".Subject/Physics.html",

  // KaTeX
  ".Subject/katex.min.js",
  ".Subject/katex.min.css",

  // Myanmar
  ".Subject/1.1.html",
  ".Subject/1.2.html",
  ".Subject/1.3.html",
  ".Subject/1.4.html",
  ".Subject/1.5.html",
  ".Subject/1.6.html",

  ".Subject/2.1.1.html",
  ".Subject/2.1.2.html",
  ".Subject/2.1.3.html",
  ".Subject/2.1.4.html",
  ".Subject/2.1.5.html",
  ".Subject/2.1.6a.html",
  ".Subject/2.1.6b.html",

  ".Subject/2.2.1.html",
  ".Subject/2.2.2.html",
  ".Subject/2.2.3.html",
  ".Subject/2.2.4.html",
  ".Subject/2.2.5.html",
  ".Subject/2.2.6.html",
  ".Subject/2.2.7.html",

  ".Subject/2.3.html",

  ".Subject/3.1.html",
  ".Subject/3.2.html",
  ".Subject/3.3.html",
  ".Subject/3.4.html",
  ".Subject/3.5.html",
  ".Subject/3.6.html",

  // English
  ".Subject/u1.html",
  ".Subject/u2.html",
  ".Subject/u3.html",
  ".Subject/u4.html",
  ".Subject/u5.html",
  ".Subject/u6.html",
  ".Subject/u7.html",
  ".Subject/u8.html",
  ".Subject/u9.html",
  ".Subject/u10.html",
  ".Subject/u11.html",
  ".Subject/u12.html",

  // Audio
  ".Subject/Unit_1_A.mp3",
  ".Subject/Unit_1_B.mp3",
  ".Subject/Unit_1_C.mp3",

  ".Subject/Unit_2_A.mp3",
  ".Subject/Unit_2_B.mp3",
  ".Subject/Unit_2_C.mp3",

  ".Subject/Unit_3_A.mp3",
  ".Subject/Unit_3_B.mp3",
  ".Subject/Unit_3_C.mp3",

  ".Subject/Unit_4_A.mp3",
  ".Subject/Unit_4_B.mp3",
  ".Subject/Unit_4_C.mp3",

  ".Subject/Unit_5_A.mp3",
  ".Subject/Unit_5_B.mp3",
  ".Subject/Unit_5_C.mp3",

  ".Subject/Unit_6_A.mp3",
  ".Subject/Unit_6_B.mp3",
  ".Subject/Unit_6_C.mp3",

  ".Subject/Unit_7_A.mp3",
  ".Subject/Unit_7_B.mp3",
  ".Subject/Unit_7_C.mp3",

  ".Subject/Unit_8_A.mp3",
  ".Subject/Unit_8_B.mp3",
  ".Subject/Unit_8_C.mp3",

  ".Subject/Unit_9_A.mp3",
  ".Subject/Unit_9_B.mp3",
  ".Subject/Unit_9_C.mp3",

  ".Subject/Unit_10_A.mp3",
  ".Subject/Unit_10_B.mp3",
  ".Subject/Unit_10_C.mp3",

  ".Subject/Unit_11_A.mp3",
  ".Subject/Unit_11_B.mp3",
  ".Subject/Unit_11_C.mp3",

  ".Subject/Unit_12_A.mp3",
  ".Subject/Unit_12_B.mp3",
  ".Subject/Unit_12_C.mp3",

  // Mathematics
  ".Subject/m1.html",
  ".Subject/m2.html",
  ".Subject/m3.html",
  ".Subject/m4.html",
  ".Subject/m5.html",
  ".Subject/m6.html",
  ".Subject/m7.html",
  ".Subject/m8.html",
  ".Subject/m9.html",
  ".Subject/m10.html",
  ".Subject/m11.html",

  // Chemistry
  ".Subject/c1.html",
  ".Subject/c2.html",
  ".Subject/c3.html",
  ".Subject/c4.html",
  ".Subject/c5.html",
  ".Subject/c6.html",
  ".Subject/c7.html",
  ".Subject/c8.html",

  // Physics
  ".Subject/p1.html",
  ".Subject/p2.html",
  ".Subject/p3.html",
  ".Subject/p4.html",
  ".Subject/p5.html",
  ".Subject/p6.html",
  ".Subject/p7.html",
  ".Subject/p8.html",
  ".Subject/p9.html",
  ".Subject/p10.html",
  ".Subject/p11.html",
  ".Subject/p12.html",

  // Biology
  ".Subject/b1.html",
  ".Subject/b2.html",
  ".Subject/b3.html",
  ".Subject/b4.html",
  ".Subject/b5.html",
  ".Subject/b6.html",

  // Images
  ".Logo/eng.jpg",
  ".Logo/myan.jpg",
  ".Logo/math.jpg",
  ".Logo/chem.jpg",
  ".Logo/phys.jpg",
  ".Logo/bio.jpg",

  ".Logo/logo.png",
  ".Logo/icon-192.png",
  ".Logo/icon-512.png"
];


// INSTALL
self.addEventListener("install", (event) => {

  event.waitUntil(

    caches.open(CACHE_NAME).then(async (cache) => {

      console.log("[SW] Caching files...");

      for (const url of urlsToCache) {

        try {

          await cache.add(url);
          console.log("[SW] Cached:", url);

        } catch (err) {

          console.log("[SW] Failed:", url);

        }

      }

    })

  );

  self.skipWaiting();

});


// ACTIVATE
self.addEventListener("activate", (event) => {

  event.waitUntil(

    caches.keys().then((keys) => {

      return Promise.all(

        keys.map((key) => {

          if (key !== CACHE_NAME) {

            console.log("[SW] Deleting old cache:", key);

            return caches.delete(key);

          }

        })

      );

    })

  );

  self.clients.claim();

});


// FETCH
self.addEventListener("fetch", (event) => {

  event.respondWith(

    caches.match(event.request).then((cached) => {

      // Return cached file if exists
      if (cached) {

        return cached;

      }

      // Otherwise fetch from network
      return fetch(event.request)

        .then((response) => {

          // Save newly fetched files automatically
          return caches.open(CACHE_NAME).then((cache) => {

            cache.put(event.request, response.clone());

            return response;

          });

        })

        .catch(() => {

          // Offline fallback
          if (event.request.mode === "navigate") {

            return caches.match("index.html");

          }

        });

    })

  );

});