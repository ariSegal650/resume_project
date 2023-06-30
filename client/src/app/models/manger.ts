export class MangerInfo {
  users: number;
  downloads: number;
  monthUsers: number[];
  monthDownloads: number[];
 // month: number[];

 /**
  *
  */
 constructor() {
  this.users=0;
  this.downloads=0;
  this.monthUsers=[12]
  this.monthDownloads=[12]
 }
}
