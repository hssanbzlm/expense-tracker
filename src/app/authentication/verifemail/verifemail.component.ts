import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-verifemail',
  templateUrl: './verifemail.component.html',
  styleUrls: ['./verifemail.component.scss'],
})
export class VerifemailComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const codeVerif = this.activatedRoute.snapshot.paramMap.get('codeverif');
    this.verifEmail(codeVerif);
  }

  verifEmail(codeVerif: string) {
    this.authService.verifEmail(codeVerif).subscribe(
      (v) => this.router.navigateByUrl('login'),
      (err) => this.router.navigateByUrl('login')
    );
  }
}
