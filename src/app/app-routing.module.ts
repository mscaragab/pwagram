import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { FeedComponent } from './feed/feed.component'
import { HelpComponent } from './help/help.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { OfflineComponent } from './offline/offline.component'
import { PostComponent } from './post/post.component'

const routes: Routes = [
  { path: '', redirectTo: '/feed', pathMatch: 'full' },
  { path: 'feed', component: FeedComponent },
  { path: 'post', component: PostComponent },
  { path: 'help', component: HelpComponent },
  { path: 'offline', component: OfflineComponent },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
