import { NgModule } from '@angular/core';
import {
  Home,
  DollarSign,
  Users,
  UserCheck,
  Globe,
  Edit2,
  X,
  Clipboard,
  Plus,
  Activity,
  Check,
  LogOut,
  Trash2,
  Package,
  ChevronRight,
  Search,
} from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';

const icons = {
  Home,
  DollarSign,
  Users,
  UserCheck,
  Globe,
  Edit2,
  X,
  Clipboard,
  Plus,
  Activity,
  Check,
  LogOut,
  Trash2,
  Package,
  ChevronRight,
  Search,
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
  declarations: [],
})
export class IconsModule {}
