import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isShow: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute) {}

  onNavigate(path: string) {
    this.router.navigate([path], { relativeTo: this.route })
  }

  onShowNotice() {
    this.isShow = false;
  }

  hideNotice() {
    this.isShow = true;
  }

}
