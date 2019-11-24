import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faTrashAlt,
  faTrash,
  faComments,
  faPlus,
  faMinus,
  faHome,
  faCog,
  faInfo,
  faInfoCircle,
  faSignOutAlt,
  faStickyNote,
  faExternalLinkAlt,
  faCheck,
  faLink,
  faEdit,
  faEye,
  faTimes,
  faTimesCircle,
  faBoxOpen,
  faCamera,

  fas
 } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    FontAwesomeModule
  ]
})
export class FaModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
  library.addIconPacks(fas);
  library.addIcons(
    faTrashAlt,
    faTrash,
    faComments,
    faPlus,
    faMinus,
    faHome,
    faCog,
    faInfo,
    faInfoCircle,
    faSignOutAlt,
    faStickyNote,
    faExternalLinkAlt,
    faCheck,
    faLink,
    faEdit,
    faEye,
    faTimes,
    faTimesCircle,
    faBoxOpen,
    faCamera);
  }
}
