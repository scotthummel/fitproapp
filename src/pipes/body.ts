import {Injectable, Pipe, PipeTransform} from "@angular/core";
//import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'bodyHMTL',
  pure: false
})
export class BodyHTML implements PipeTransform {
  // constructor(private sanitizer:DomSanitizer){}

  transform(string: string) {
    let div = document.createElement("div");
    div.insertAdjacentHTML("afterbegin", string);

    let spaces = new RegExp(String.fromCharCode(160), "g");
    let sentences = div.textContent.replace('↵', '').replace(spaces, '');

    let p1 = sentences.split('. ')[0];
    let p2 = sentences.split('. ')[1];
    let p3 = sentences.split('. ')[2];

    return '<p>' + p1 + '. ' + p2 + '. ' + p3 + '.</p>'

    //return this.sanitizer.bypassSecurityTrustHtml(string);
  }
}
