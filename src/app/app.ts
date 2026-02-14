import { Component, signal, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  protected readonly title = signal('Para Ileny');
  protected readonly showContent = signal(false);

  protected readonly stanzas = signal([
    {
      lines: [
        'Tus ojos, tan hermosos como el cielo,',
        'son dos luceros que alumbran mi sendero,',
        'en ellos veo reflejado el universo entero,',
        'y en su brillo encuentro mi más dulce consuelo.'
      ],
      visible: false
    },
    {
      lines: [
        'Tu piel tan cálida, como el sol de primavera,',
        'me envuelve en un abrazo que nunca quisiera soltar,',
        'cada roce tuyo es como una caricia primera,',
        'un fuego suave que no deja de brillar.'
      ],
      visible: false
    },
    {
      lines: [
        'Tus labios tiernos, pétalos de rosa,',
        'guardan palabras que me hacen temblar,',
        'cada susurro tuyo es una ola preciosa,',
        'que llega a mi orilla sin poder parar.'
      ],
      visible: false
    },
    {
      lines: [
        'Tu compañía es tan dulce como la miel,',
        'cada momento a tu lado es un regalo del cielo,',
        'contigo los días saben a pastel,',
        'y las noches se pintan de terciopelo.'
      ],
      visible: false
    },
    {
      lines: [
        'Y esa sonrisa… ay, esa sonrisa tuya,',
        'me está volviendo loco, no puedo negarlo,',
        'es la luz que entre las sombras me enamora,',
        'y aunque quisiera, no podría evitar amarlo.'
      ],
      visible: false
    },
    {
      lines: [
        'Ileny, tus ojos son mi cielo infinito,',
        'tu piel es mi refugio, tu boca mi suspiro,',
        'en cada latido escribo tu nombre bendito,',
        'porque contigo, amor mío, por fin respiro.'
      ],
      visible: false
    }
  ]);

  protected readonly floatingElements = signal(
    Array.from({ length: 20 }, (_, i) => ({
      symbol: ['✨', '💕', '🌸', '⭐', '🦋', '💫', '🌺', '♥'][i % 8],
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 8 + Math.random() * 12,
      size: 0.6 + Math.random() * 1.2
    }))
  );

  @ViewChildren('stanzaEl') stanzaElements!: QueryList<ElementRef>;

  ngAfterViewInit() {
    // Trigger entrance animation
    setTimeout(() => this.showContent.set(true), 300);

    // Intersection Observer for stanza fade-in
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    this.stanzaElements.forEach((el) => {
      observer.observe(el.nativeElement);
    });
  }
}
