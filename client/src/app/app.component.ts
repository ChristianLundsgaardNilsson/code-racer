import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [ RouterOutlet ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    navItems = [
        { label: 'Play', href: 'racetrack' },
        { label: 'Leaderboard', href: '#' },
        { label: 'Learn more', href: '#' },
        { label: 'About', href: '#' },
    ];
}
