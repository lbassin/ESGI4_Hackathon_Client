import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-fiche-media',
  templateUrl: './fiche-media.component.html',
  styleUrls: ['./fiche-media.component.scss']
})
export class FicheMediaComponent implements OnInit, OnChanges {
  @Input() media: any = false;
  @Input() state: any = false;
  @Input() titre: String = '';
  @Input() genre: any = '';
  @Input() synopsis: String = '';

  constructor(public cd: ChangeDetectorRef) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
     console.log(changes);
    console.log(this.synopsis);
    this.cd.detectChanges();
  }

}
