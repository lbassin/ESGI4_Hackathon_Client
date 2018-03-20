import {Component, OnInit} from '@angular/core';
import {ResponseComponent} from '../response.component';

@Component({
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent extends ResponseComponent implements OnInit {

  protected cards: Array<{ title: string, media: string, caption: string }>;
  protected message: string;

  public ngOnInit(): void {
    this.cards = this.data.cards;
    this.message = this.data.message;
  }

}
