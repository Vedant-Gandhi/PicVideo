const CACHE_NAME='PicVideoPWATrial'
const urlsToCache=[
    '/'
]

self.addEventListener('install',event=>{
    event.waitUntil(caches.open(CACHE_NAME).then(cache=>{
        console.log("Cache Created.");
        return cache.addAll(urlsToCache)
    }))
})

self.addEventListener('fetch',event=>{
    event.respondWith(caches.match(event.request).then(res=>{
        if (res) return res;
        return fetch(event.request)
    }))
});

self.addEventListener('activate',event=>{
    var cacheWhiteList=[CACHE_NAME]
    caches.keys().then(cacheList=>{
        return Promise.all(cacheList.map(cName=>{
            if(cacheWhiteList.indexOf(cName) === -1)
            {
                return caches.delete(cName)
            }
        }))
    })
})