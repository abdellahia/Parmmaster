import { Injectable } from '@angular/core';

@Injectable()
export class SorterService {

// tslint:disable-next-line: indent
	property: string = null;
// tslint:disable-next-line: indent
	direction = 1;

    sort(collection: any[], prop: string) {
        this.property = prop;
        this.direction = (this.property === prop) ? this.direction * -1 : 1;

        collection.sort((a: any, b: any) => {
            let aVal: any;
            let bVal: any;

            // Handle resolving complex properties such as 'state.name' for prop value
            if (prop && prop.indexOf('.') > -1) {
              aVal = this.resolveProperty(prop, a);
              bVal = this.resolveProperty(prop, b);
            } else {
              aVal = a[prop];
              bVal = b[prop];
            }

            // Fix issues that spaces before/after string value can cause such as ' San Francisco'
            if (this.isString(aVal))  {
// tslint:disable-next-line: no-conditional-assignment
                if ( aVal = aVal.trim()) { aVal = aVal.trim().toUpperCase(); }
            }
            if (this.isString(bVal))  {
// tslint:disable-next-line: no-conditional-assignment
              if ( bVal = bVal.trim()) { bVal = bVal.trim().toUpperCase(); }
          }

            if (aVal === bVal) {
                return 0;
            } else if (aVal > bVal) {
                return this.direction * -1;
            } else {
                return this.direction * 1;
            }
        });
    }

    isString(val: any): boolean {
      return (val && (typeof val === 'string' || val instanceof String));
    }

    resolveProperty(path: string, obj: any) {
// tslint:disable-next-line: only-arrow-functions
      return path.split('.').reduce(function(prev, curr) {
          return (prev ? prev[curr] : undefined);
      }, obj || self);
    }

}
