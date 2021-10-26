// import { Injectable } from '@angular/core';
// import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
// import { StudentProfile } from '../models/student-profile.model';
// import { Observable, of } from 'rxjs';
// import { StudentService } from '../services/student.service';
// import { catchError } from 'rxjs/operators';
// import { AlertifyService } from '../services/alertify.service';

// @Injectable()
// export class GetStudentProfileResolver implements Resolve<StudentProfile> {

//     constructor(private studentService: StudentService, private alertify: AlertifyService, private router: Router) {}
//     resolve(route: ActivatedRouteSnapshot): Observable<StudentProfile> {
//         return this.studentService.studentProfile().pipe(
//             catchError(error => {
//                 this.alertify.message('unable to retrieve data, please retry');
//                 this.router.navigate(['/']);
//                 return of(null);
//             })
//         );

//     }
// }

