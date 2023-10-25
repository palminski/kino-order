import { Component, OnInit} from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})

export class DataComponent implements OnInit {

  //this will hold the data we grab from our server
  users: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getUsers().subscribe(data => {
      this.users = data;
    });
  }
}
