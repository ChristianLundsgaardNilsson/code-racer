import { Route } from '@angular/router';

export interface RouteData {
    id: string;
}

interface CustomRoute extends Route {
    data?: RouteData;
    children?: CustomRoute[];
}

export const routes: CustomRoute[] = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/landing/landing.component')
            .then(m => m.LandingComponent),
        data: {
            id: 'landing',
        },
    },
    {
        path: 'racetrack',
        pathMatch: 'full',
        loadComponent: () => import('./pages/racetrack/racetrack.component')
            .then(m => m.RacetrackComponent),
        data: {
            id: 'racetrack',
        },
    },
    {
        path: '**',
        redirectTo: '',
    },
];
