import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-fiche-media',
  templateUrl: './fiche-media.component.html',
  styleUrls: ['./fiche-media.component.scss']
})
export class FicheMediaComponent {
  @Input() media: any = false;
  @Input() state: any = false;
  @Input() titre: String = '';
  @Input() genre: any = '';
  @Input() synopsis: String = '';
}
