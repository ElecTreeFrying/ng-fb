# NgFb

Follow-up demo-application, AngularPH: Code Fusion, November 25, 2017 at VentureSpace 724 Shaw Blvd, Mandaluyong, 1552 Metro Manila


## DEMO - [ng-fb][1-link]


## Usage

*   `git clone https://github.com/ElecTreeFrying/ng-fb.git`
*   `cd ng-fb`
*   `npm install`

Create an account [firebase console][2-link].

1.  Select _Add Project_
1.  Select Authentications
1.  Click copy **WEB SETUP**

1.  Create the environment files below in `src/environments/`.

    **environment.prod.ts**

    ```
    export const environment = {
      production: true,
      firebaseConfig: { **WEB SETUP** }
    };

    ```

    **environment.ts**

    ```
    export const environment = {
      production: false,
      firebaseConfig: { **WEB SETUP** }
    };

    ```

[1-link]: https://ng-fb-57b7f.firebaseapp.com
[2-link]: https://console.firebase.google.com
