import { ErrorHandler } from "@angular/core";

export class AppErrorHandler implements ErrorHandler {
    handleError(error: any): void {
        console.log('Error: ', error);
        // Mosh Adds the toast service to popup with errors
    }

}