
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ParameterUpdated } from './events/ParameterUpdated';
import { ArbplChanged } from './events/ArbplChanged';


@Injectable()
export class MessageBus {
    private arbplSource = new BehaviorSubject<ArbplChanged>(null);
    currentArbpl = this.arbplSource.asObservable();

    changeArbpl(payload: ArbplChanged) {
        this.arbplSource.next(payload);
    }

// tslint:disable-next-line: use-life-cycle-interface
    ngOnInit() {

    }
}
