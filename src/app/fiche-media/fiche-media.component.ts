import {Component, Input, OnInit} from '@angular/core';
import {DetailsService} from '../details.service';

@Component({
  selector: 'app-fiche-media',
  templateUrl: './fiche-media.component.html',
  styleUrls: ['./fiche-media.component.scss']
})
export class FicheMediaComponent implements OnInit {
  @Input() state: any = false;
  @Input() card: any = '';

  constructor(private detailsService: DetailsService) {
  }

  ngOnInit(): void {
    this.detailsService.getEvent().subscribe(data => {
      this.state = data !== null;
      this.card = data;
    });
  }
}
