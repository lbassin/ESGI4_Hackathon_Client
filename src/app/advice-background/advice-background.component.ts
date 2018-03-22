import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advice-background',
  templateUrl: './advice-background.component.html',
  styleUrls: ['./advice-background.component.scss']
})
export class AdviceBackgroundComponent implements OnInit {
  private advices = [
    {
     message: 'Donne moi la note de Game of Thrones',
      media: 'https://image.tmdb.org/t/p/original/gX8SYlnL9ZznfZwEH4KJUePBFUM.jpg'
    },
    {
      message: 'Donne moi les séries similaires à Flash',
      media: 'https://image.tmdb.org/t/p/original/6ZdQTBy20HzWudZthAV7NkZWfIb.jpg'
    },
    {
      message: 'Donne moi les séries similaires à Arrow',
      media: 'https://image.tmdb.org/t/p/original/scivLGg7zdqmdw5eDW3rvrEavr6.jpg'
    },
    {
      message: 'Donne moi les séries similaires à Lucifer',
      media: 'https://image.tmdb.org/t/p/original/6kZCuvbirx6ibJfaWqwV2p90yPI.jpg'
    }
  ];
  private current: { message: string; media: string };
  constructor() {
    const rand = (Math.floor(Math.random() * (this.advices.length )) + 1) - 1;
    this.current = this.advices[rand];
  }

  getBackground() {
    return this.current.media;
  }
  getMessage() {
    return this.current.message;
  }
  ngOnInit() {
  }

}
