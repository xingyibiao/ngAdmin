import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultUrl'
})
export class DefaultUrlPipe implements PipeTransform {

  transform(value: string, args?: string): string {
    const defaultUrl = args || 'assets/defaultAvator.png'
    return value || defaultUrl;
  }

}
