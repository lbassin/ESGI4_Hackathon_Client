import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-response-block',
  templateUrl: './response-block.component.html',
  styleUrls: ['./response-block.component.scss']
})
export class ResponseBlockComponent implements OnInit, OnChanges {

  @Input() listResponse: any;
  ficheMediaResponse: any = '';
  state: any = '';
  constructor(public cd: ChangeDetectorRef) { }

  ngOnInit() {
    console.log(this.listResponse);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.listResponse !== '') {
      console.log(changes);
      this.ficheMediaResponse = JSON.parse(this.listResponse);
      this.state = true;
      this.cd.detectChanges();
    }
  }

}
