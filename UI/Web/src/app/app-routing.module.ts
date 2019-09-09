import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
    {
        path: 'sample',
        loadChildren: () => import('./main/sample/sample.module').then(m => m.SampleModule)
    },
    {
        path: 'templates',
        loadChildren: () => import('./templates/templates.module').then(m => m.TemplatesModule)
    },
    // { path: 'not-found', component: NotFoundComponent },
    { path: '', redirectTo: '/templates/new-template', pathMatch: 'full' },
    { path: '**', redirectTo: '/templates/new-template', pathMatch: 'full' },
    // { path: '**',  redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
