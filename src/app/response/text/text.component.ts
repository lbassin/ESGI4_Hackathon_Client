import {Component, OnInit} from '@angular/core';
import {ResponseComponent} from '../response.component';

@Component({
  templateUrl: './text.component.html'
})
export class TextComponent extends ResponseComponent implements OnInit {

  protected message: string;

  public ngOnInit(): void {
    this.message = this.data.message;
  }

}
