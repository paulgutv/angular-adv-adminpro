import { Component, OnDestroy, inject } from '@angular/core';
import { ActivationEnd, Router, Event, Data } from '@angular/router';
import { Observable, Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent implements OnDestroy {
  private router = inject(Router);
  public titulo?: string;
  public tituloSubs$?: Subscription;

  constructor() {
    this.tituloSubs$ = this.getArgumentosRuta()
    .subscribe(({ titulo }) => {
      this.titulo = titulo;
    })
  }

  ngOnDestroy(): void {
    this.tituloSubs$?.unsubscribe();
  }

  getArgumentosRuta(): Observable<Data> {
    return this.router.events
    .pipe(
      filter((event: Event): event is ActivationEnd => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null ),
      map((event: ActivationEnd) => event.snapshot.data)
    )
  }
}
