import { Component, OnInit } from '@angular/core';
import { BugService } from '../../shared/bug.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {

  IssuesList: any = [];


  ngOnInit() {

    this.loadEmployees();
  }

  constructor(
    public bugService: BugService
  ){ }



   // Issues list
   loadEmployees() {

    return this.bugService.GetIssues().subscribe((data: {}) => {
      this.IssuesList = data;
      console.log(">>>>");
      })
  }

    // Delete issue
    deleteIusse(data){
      console.log(data);
      var index = index = this.IssuesList.map(x => {return x.NOMBRE}).indexOf(data.NOMBRE);
       return this.bugService.DeleteBug(data).subscribe(res => {
        this.IssuesList.splice(index, 1)
         console.log('CLIENTE BORRADO!')
       })
    }

}
