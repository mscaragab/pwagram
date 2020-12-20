self.addEventListener("activate", (event) => {
  console.log("Activated...........");
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      } else {
        return fetch(event.request).then((res) => {
          return caches.open("dynamic-cache").then((cache) => {
            cache.put(event.request, res.clone());
            return res;
          });
        });
      }
    })
  );
});
