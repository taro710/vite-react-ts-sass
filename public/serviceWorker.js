const cacheName = "cache:v1";

self.addEventListener("install", (event) => {
  console.log("ServiceWorker install:", event);
});

self.addEventListener("activate", (event) => {
  console.log("ServiceWorker activate:", event);
});

// self.addEventListener("fetch", (event) => {
//   event.respondWith(networkFallingBackToCache(event.request));
// });

// const networkFallingBackToCache = async (request) => {
//   const cache = await caches.open(cacheName);
//   try {
//     if (["GET", "HEAD"].includes(request.method)) {
//       const response = await fetch(request);
//       await cache.put(request, response.clone());
//       return response;
//     }
//   } catch (err) {
//     console.error(err);
//     return cache.match(request);
//   }
// };

let client;
self.addEventListener("fetch", (event) => {
  event.waitUntil(
    (async () => {
      // クライアントにアクセスできない場合は、早期に終了します。
      // 例えば、クロスオリジンの場合。
      if (!event.clientId) return;

      // クライアントを取得します。
      client = await clients.get(event.clientId);

      // クライアントを取得できない場合は、早期に終了します。
      // 例えば、閉じている場合。
      if (!client) return;

      // クライアントにメッセージを送信します。

      // client.postMessage({
      //   msg: "私はあなたからフェッチされましたよ！",
      //   url: event.request.url,
      // });
    })()
  );
});

const port = 1234;
const ws = new WebSocket(`ws://localhost:${port}`);
console.log("ws", ws);

ws.onopen = () => {
  console.log("connected!");
  ws.send("hello! 👋");
};

ws.onmessage = (event) => {
  console.log("message", event);
  client.postMessage({
    msg: event.data,
  });
};
