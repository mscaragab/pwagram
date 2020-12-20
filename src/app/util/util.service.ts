import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private http: HttpClient) {}

  enableNotifications() {
    if ('serviceWorker' in navigator) {
      Notification.requestPermission((result) => {
        console.log('User Choice', result);
        if (result === 'granted') {
          navigator.serviceWorker.ready.then((sw) => {
            sw.pushManager.getSubscription().then((sub) => {
              if (sub == null) {
                var vapidPublicKey =
                  'BKapuZ3XLgt9UZhuEkodCrtnfBo9Smo-w1YXCIH8YidjHOFAU6XHpEnXefbuYslZY9vtlEnOAmU7Mc-kWh4gfmE';
                var convertedVapidPublicKey = this.urlBase64ToUint8Array(
                  vapidPublicKey
                );
                sw.pushManager.subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: convertedVapidPublicKey,
                });
              }
            });
          });
        }
      });
    }
  }

  getLocation(): Promise<string> {
    const promise = new Promise<string>((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          // const lat = '29.972890';
          // const long = '30.952653';
          this.http
            .get<{ display_name: string }>(
              'https://us1.locationiq.com/v1/reverse.php?key=' +
                environment.LOCATIONIQ_ACCESS_TOKEN +
                '&lat=' +
                lat +
                '&lon=' +
                long +
                '&format=json'
            )
            .subscribe(
              (res) => {
                if (res && res.display_name) {
                  resolve(res.display_name);
                } else {
                  resolve(null);
                }
              },
              (err) => {
                resolve(null);
              }
            );
        });
      } else {
        resolve(null);
      }
    });

    return promise;
  }

  showNotification(title: string, content: string, image: string) {
    if ('serviceWorker' in navigator) {
      Notification.requestPermission((result) => {
        console.log('User Choice', result);
        if (result === 'granted') {
          var options = {
            body: 'New Post: ' + title,
            icon: '/assets/icons/icon-256.png',
            image: image,
            lang: 'en-US', // BCP 47,
            vibrate: [100, 50, 200],
            badge: '/assets/images/post-25.png',
            tag: 'new-post',
            renotify: true,
            actions: [
              {
                action: 'confirm',
                title: 'Okay',
                icon: '/assets/icons/icon-256.png',
              },
              {
                action: 'cancel',
                title: 'Cancel',
                icon: '/assets/icons/icon-256.png',
              },
            ],
          };

          navigator.serviceWorker.ready.then((sw) => {
            sw.showNotification('New post was published!', options);
          });
        }
      });
    }
  }

  private urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}
