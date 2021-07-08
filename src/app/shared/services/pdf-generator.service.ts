import { ElementRef, Injectable, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorService {
  constructor() {}

  print(pdfTemplate: HTMLCollectionOf<Element>) {
    var doc = new jsPDF('portrait');
    var arr = [];
    for (let i = 0; i < pdfTemplate.length; i++) {
      const innerArray = [];
      innerArray[0] = pdfTemplate
        .item(i)
        .getElementsByTagName('p')[0].innerText;
      innerArray[1] = pdfTemplate
        .item(i)
        .getElementsByTagName('p')[1].innerText;
      innerArray[2] = pdfTemplate
        .item(i)
        .getElementsByTagName('p')[2].innerText;
      innerArray[3] = pdfTemplate
        .item(i)
        .getElementsByTagName('p')[3].innerText;
      arr.push(innerArray);
    }
    autoTable(doc, {
      head: [['amount', 'remark', 'date', 'balance']],
      body: arr,
    });

    doc.save('cash');
  }
}
