import { Observable } from 'rxjs/Observable';

export class PopAlertOptions {
    showAlert?: boolean = true;
    showHeader?: boolean = true;
    headerText?: string = 'Saved!';
    showBody?: boolean = true;
    bodyText?: string = 'Your item has been saved.';
    showFooter?: boolean = true;
    onButtonClick?: () => void;
    okButtonText?: string = 'Ok';
    okButtonEnabled?: boolean = true;
    cancelButtonText?: string = 'Cancel';
    cancelButtonEnabled?: boolean = true;
    showCancelButton?: boolean = false;
    isError?: boolean = false;
    isModal?: boolean = false;
    template?: any;
    modalType: 'success' | 'error' | 'warning' | 'modal';
    subHeaderText?: string;
    showBackground?: boolean = true;
    position?: 'top' | 'top-right' | 'bottom' | 'center' | 'left' | 'right' = 'center';
}