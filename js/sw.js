// sw.js
const cacheName = "RaphaelPWA-v1";
const filesToCache = [
	"./index.html",
	"./css/generic/base.css",
	"./css/generic/reset.min.css",
	"./css/components/footer.css",
	"./css/components/formulario.css",
	"./css/components/four.css",
	"./css/components/primary-max-320.css",
	"./css/components/primary-max-450.css",
	"./css/components/primary-max-600.css",
	"./css/components/primary-max-750.css",
	"./css/components/primary.css",
	"./css/components/second-max-320.css",
	"./css/components/second-max-450.css",
	"./css/components/second-max-600.css",
	"./css/components/second-max-750.css",
	"./css/components/second.css",
	"./css/components/third.css",
	"./img/anuncio-iqvia.png",
	"./img/computador.svg",
	"./img/favicon.png",
	"./img/foto-rodape-raphael-freire.png",
	"./img/icon-form-email.svg",
	"./img/icon-form-nome.svg",
	"./img/linhas-detalhe.svg",
	"./img/logos.png",
	"./img/revista-abradilan.png",
	"./img/revista-abradimex.png",
	"./img/revista-associadas.png",
	"./img/revista-extrafarma.png",
	"./js/app.js",
	"./js/lazysizes.min.js",
	"./js/sw.js"
];

self.addEventListener("install", function(event) {
	// Perform install steps
	console.log("[Servicework] Install");
	event.waitUntil(
		caches.open(cacheName).then(function(cache) {
			console.log("[ServiceWorker] Caching app shell");
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener("activate", function(event) {
	console.log("[Servicework] Activate");
	event.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(
				keyList.map(function(key) {
					if (key !== cacheName) {
						console.log(
							"[ServiceWorker] Removing old cache shell",
							key
						);
						return caches.delete(key);
					}
				})
			);
		})
	);
});

self.addEventListener("fetch", event => {
	console.log("[ServiceWorker] Fetch");
	event.respondWith(
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request);
		})
	);
});
