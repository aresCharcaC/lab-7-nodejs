// Este archivo opcional se puede usar para registrar un service worker.
// register() no está llamado por defecto.

// Esto permite que la app se cargue más rápido en visitas posteriores y
// proporciona capacidades offline limitadas. Sin embargo, también significa que los desarrolladores
// necesitan cargar manualmente los recursos actualizados.
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] es la dirección IPv6 localhost.
      window.location.hostname === '[::1]' ||
      // 127.0.0.0/8 se considera localhost para IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );
  
  export function register(config) {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      // La URL constructor está disponible en todos los browsers que soportan SW.
      const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
      if (publicUrl.origin !== window.location.origin) {
        // Nuestro service worker no funcionará si PUBLIC_URL está en un origen diferente
        // desde donde se sirve nuestra página. Esto puede suceder si se usa un CDN.
        return;
      }
  
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        if (isLocalhost) {
          // Esto está ejecutándose en localhost. Verifiquemos si un service worker existe o no.
          checkValidServiceWorker(swUrl, config);
  
          // Agrega logging adicional en localhost, señalando a los desarrolladores
          // si el service worker/PWA está disponible o no.
          navigator.serviceWorker.ready.then(() => {
            console.log(
              'This web app is being served cache-first by a service ' +
                'worker. To learn more, visit https://bit.ly/CRA-PWA'
            );
          });
        } else {
          // No es localhost. Registra service worker
          registerValidSW(swUrl, config);
        }
      });
    }
  }
  
  function registerValidSW(swUrl, config) {
    navigator.serviceWorker
      .register(swUrl)
      .then(registration => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) {
            return;
          }
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // En este punto, el contenido actualizado ha sido traído,
                // pero el service worker anterior todavía servirá el contenido
                // anterior hasta que se cierren todas las pestañas.
                console.log(
                  'New content is available and will be used when all ' +
                    'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
                );
  
                // Ejecutar callback
                if (config && config.onUpdate) {
                  config.onUpdate(registration);
                }
              } else {
                // En este punto, todo ha sido almacenado en caché.
                // Es el momento perfecto para mostrar un
                // "El contenido está almacenado en caché para uso sin conexión." mensaje.
                console.log('Content is cached for offline use.');
  
                // Ejecutar callback
                if (config && config.onSuccess) {
                  config.onSuccess(registration);
                }
              }
            }
          };
        };
      })
      .catch(error => {
        console.error('Error during service worker registration:', error);
      });
  }
  
  function checkValidServiceWorker(swUrl, config) {
    // Verifica si el service worker se puede encontrar. Si no puede, recarga la página.
    fetch(swUrl, {
      headers: { 'Service-Worker': 'script' },
    })
      .then(response => {
        // Asegúrese de que el service worker existe y que estamos obteniendo un archivo JS.
        const contentType = response.headers.get('content-type');
        if (
          response.status === 404 ||
          (contentType != null && contentType.indexOf('javascript') === -1)
        ) {
          // No se encontró ningún service worker. Probablemente sea una aplicación diferente. Recargue la página.
          navigator.serviceWorker.ready.then(registration => {
            registration.unregister().then(() => {
              window.location.reload();
            });
          });
        } else {
          // Service worker encontrado. Proceda como de costumbre.
          registerValidSW(swUrl, config);
        }
      })
      .catch(() => {
        console.log(
          'No internet connection found. App is running in offline mode.'
        );
      });
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then(registration => {
          registration.unregister();
        })
        .catch(error => {
          console.error(error.message);
        });
    }
  }