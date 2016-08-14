import { provideRouter, RouterConfig } from '@angular/router';

import { ReportComponent } from './report/report.component';
import { ProjectComponent } from './project/project.component';
import { TimesheetComponent } from './timesheet/timesheet.component';

const routes: RouterConfig = [
  { path: 'report', component: ReportComponent },
  { path: 'project', component: ProjectComponent },
  { path: '', component: TimesheetComponent }
  // { path: '**', component: PageNotFoundComponent }
];

export const appRouterProviders = [
  provideRouter(routes)
];