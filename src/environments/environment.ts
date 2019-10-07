// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: 'https://',
  firebase : {
    apiKey: 'AIzaSyBEPrcw4wH-5vZJx_sANl-gSncRP20gxR4',
    authDomain: 'malpinsoft-site.firebaseapp.com',
    databaseURL: 'https://malpinsoft-site.firebaseio.com',
    projectId: 'malpinsoft-site',
    storageBucket: 'malpinsoft-site.appspot.com',
    messagingSenderId: '733226338936',
    appId: '1:733226338936:web:27e7e7bc611acc6adebb8d'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
