import { Component , Input, OnInit} from '@angular/core';
import { Trainer } from 'src/app/models/trainer';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  @Input() trainer: Trainer;
  birthdate: Date;
  defaultImageUrl: string = "../../../assets/icons/default_avatar.png";
  profileIcon: string | ArrayBuffer;
  profileIconName: string;
  isPreview: boolean = false;

ngOnInit(): void {
  
  this.birthdate = new Date(this.trainer.birthdate);
}

  getHobbieName(input: string): string {
    switch (input) {
      case "soccer":
        return "Jugar Fútbol";
      case "basquetball":
        return "Jugar Basquetball";
      case "tennis":
        return "Jugar Tennis";
      case "voleiball":
        return "Jugar Voleiball";
      case "fifa":
        return "Jugar Fifa";
      case "gaming":
        return "Jugar Videojuegos";
      default:
        return "N/A";
    }
  }


}
