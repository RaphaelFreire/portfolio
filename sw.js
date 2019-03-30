//sw.js
const staticCacheName = "raphael-freire-29/03/2019";

let filesToCache = [
	"index.html",
	"/css/generic/base.css",
	"/css/generic/reset.min.css",
	"/css/components/footer.css",
	"/css/components/formulario.css",
	"/css/components/four.css",
	"/css/components/primary-max-320.css",
	"/css/components/primary-max-450.css",
	"/css/components/primary-max-600.css",
	"/css/components/primary-max-750.css",
	"/css/components/primary.css",
	"/css/components/second-max-320.css",
	"/css/components/second-max-450.css",
	"/css/components/second-max-600.css",
	"/css/components/second-max-750.css",
	"/css/components/second.css",
	"/css/components/third.css",
	"/img/anuncio-iqvia.png",
	"/img/computador.svg",
	"/img/favicon.png",
	"/img/foto-rodape-raphael-freire.png",
	"/img/icon-form-email.svg",
	"/img/icon-form-nome.svg",
	"/img/linhas-detalhe.svg",
	"/img/logos.svg",
	"/img/revista-abradilan.png",
	"/img/revista-abradimex.png",
	"/img/revista-associadas.png",
	"/img/revista-extrafarma.png",
	"/js/lazysizes.min.js",
	"sw.js",
	"app.js"
];

// Cache on install
this.addEventListener("install", event => {
	this.skipWaiting();

	event.waitUntil(
		caches.open(staticCacheName).then(cache => {
			return cache.addAll(filesToCache);
		})
	);
});

// Clear cache on activate
this.addEventListener("activate", event => {
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames
					.filter(cacheName =>
						cacheName.startsWith("raphael-freire-")
					)
					.filter(cacheName => cacheName !== staticCacheName)
					.map(cacheName => caches.delete(cacheName))
			);
		})
	);
});

// Serve from Cache
this.addEventListener("fetch", event => {
	event.respondWith(
		caches
			.match(event.request)
			.then(response => {
				return response || fetch(event.request);
			})
			.catch(() => {
				return caches.match("index.html");
			})
	);
});
