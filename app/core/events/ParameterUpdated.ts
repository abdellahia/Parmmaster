import { ArbplClaim } from './../arbplClaim';


export class ParameterUpdated {


    constructor(public parameter: string, public arbpl: ArbplClaim, public name: string) {


    }

}
