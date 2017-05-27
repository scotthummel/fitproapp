import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class CommonService {
    private notify = new Subject<any>();
    /**
     * Observable string streams
     */
    notifyObservable$ = this.notify.asObservable();

    constructor(){}

    public notifyOther(data: any) {
      console.log(data);
        try {
            this.notify.next(data);
        } catch(e) {
          console.log(e)
        }
    }
}
