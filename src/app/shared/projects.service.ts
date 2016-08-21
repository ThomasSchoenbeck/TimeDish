import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import '../rxjs-operators';
import { environment } from '../environment';
import { Project } from '../models/project.model';

@Injectable()
export class ProjectsService {

  private projectsURL = environment.API_BASE_URL + '/projects';

  constructor(private http: Http) { }

  getProjects (): Observable<Project[]> {
    return this.http.get(this.projectsURL)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getProjectsById (ArrayOfProjects: Array<any>): Observable<Project[]> {
    console.log(`ProjectService: ArrayOfProjects(length: ${ArrayOfProjects.length}): ${JSON.stringify(ArrayOfProjects)}`);
    if (ArrayOfProjects.length > 0 ) {
      let idString: string = '';

      ArrayOfProjects.forEach(element => {
        // console.log(`ProjectService: element ${JSON.stringify(element.id)}`);
        if (idString === '') {
          idString = idString + '?id=' + element.id;
        } else {
          idString = idString + '&id=' + element.id; 
        }
      });

      console.log(`ProjectService: idString: ${idString}`);
      return this.http.get(this.projectsURL + idString)
                      .map(this.extractData)
                      .catch(this.handleError);
    } else {
      console.log(`ProjectService: return empty Observable`);
      return Observable.of(null);
    }
  }

  updateProject(project: Project): Observable<Project> {
    let body = JSON.stringify({ project });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    console.log(project);
    console.log(body);

    return this.http.put(this.projectsURL + '/' + project.id , project, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    // return body.data || { };
    return body || { };
  }
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
