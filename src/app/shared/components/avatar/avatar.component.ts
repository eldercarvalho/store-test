import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input() src: string;
  @Input() alt: string;
  @Input() width: number = 45;
  @Input() height: number = 45;

  constructor() { }

  ngOnInit() {
  }

}
