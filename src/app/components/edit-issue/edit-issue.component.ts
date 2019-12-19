import { Component, OnInit, NgZone } from '@angular/core';
import { BugService } from '../../shared/bug.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-issue',
  templateUrl: './edit-issue.component.html',
  styleUrls: ['./edit-issue.component.css']
})

export class EditIssueComponent implements OnInit {
  IssuesList: any = [];
  updateIssueForm: FormGroup;
  
  ngOnInit() {
    this.updateForm()
  }

  constructor(
    private actRoute: ActivatedRoute,    
    public bugService: BugService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router
  ) { 

    //Validaciones
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.bugService.GetIssue(id).subscribe((data) => {
      this.updateIssueForm = this.fb.group({
        NOMBRE: [data.NOMBRE,Validators.required],//validaciones
        CONS_TIPOCLIENTE: [data.CONS_TIPOCLIENTE,Validators.required]
      })
    })
  }

  updateForm(){
    this.updateIssueForm = this.fb.group({
      NOMBRE: ['',Validators.required], //validaciones
      CONS_TIPOCLIENTE: ['',Validators.required]
    })    
  }

  submitForm(){ 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.bugService.UpdateBug(id, this.updateIssueForm.value).subscribe(res => {
      this.ngZone.run(() => this.router.navigateByUrl('/issues-list'))
    })
  }



}