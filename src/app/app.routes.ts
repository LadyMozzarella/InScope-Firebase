import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { AuthGuardService } from './services/auth-guard.service';
import { TaskComponent } from './task/task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskKanbanComponent } from './task-kanban/task-kanban.component';
import { ProjectSettingsComponent } from './project-settings/project-settings.component';
import { TasksViewComponent } from './tasks-view/tasks-view.component';
import { TaskViewComponent } from './task-view/task-view.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const router: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'project/:id', component: ProjectComponent, canActivate: [AuthGuardService], children: [
    { path: 'task', component: TasksViewComponent, children: [
      { path: 'list', component: TaskListComponent },
      { path: 'kanban', component: TaskKanbanComponent },
      { path: 'create', component: TaskEditComponent },
      { path: ':id', component: TaskComponent, children: [
        { path: '', component: TaskViewComponent },
        { path: 'edit', component: TaskEditComponent }
      ]},
    ]},
    { path: 'settings', component: ProjectSettingsComponent }
  ]},
  { path: '**', component: PageNotFoundComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
