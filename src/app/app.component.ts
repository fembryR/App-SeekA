import { Component } from '@angular/core';

interface Menu{
  icon: string;
  name: string;
  redirectTo: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  menu: Menu []=[
    {
      icon: "home-outline",
      name: "Home",
      redirectTo: '/home' 
    },
    {
      icon: "log-out-outline",
      name: "Log-Out",
      redirectTo: '/login'
    }
  ]

  constructor() {}
}
