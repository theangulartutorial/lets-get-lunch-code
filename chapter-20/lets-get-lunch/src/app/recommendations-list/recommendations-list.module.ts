import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendationsListComponent } from './recommendations-list.component';
import { RecommendationsService } from '../services/recommendations/recommendations.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RecommendationsListComponent],
  exports: [RecommendationsListComponent],
  providers: [RecommendationsService]
})
export class RecommendationsListModule { }
