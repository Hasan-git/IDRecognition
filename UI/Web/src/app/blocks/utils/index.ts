import { FormGroup, NgForm } from '@angular/forms';
import * as _ from 'lodash';


export class AppUtils {

    /**
     * 
     * 
     * @static
     * @param {NgForm} form 
     * @param {boolean} showErrors 
     * @returns {boolean} Boolean
     * 
     * @memberOf AppUtils
     */
    public static validateForm(form: NgForm, showErrors: boolean): boolean {
        if (!form.valid) {
            if (showErrors) {
                _.map(form.controls, (value, key) => {
                    form.controls[key].markAsDirty();
                    form.controls[key].markAsTouched();
                });
            }
            return false;
        }
        return true;
    }

}