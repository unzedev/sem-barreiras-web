import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss']
})
export class DonationComponent implements OnInit {
  pixKey = '24.236.775/0001-29';
  qrCodeUrl = '../assets/img/qrcode-pix.png';
  copySuccess = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  copyPixKey(): void {
    navigator.clipboard.writeText(this.pixKey).then(() => {
      this.copySuccess = true;
      // Feedback visual e sonoro para usuários com deficiência auditiva
      setTimeout(() => {
        this.copySuccess = false;
      }, 3000);
      console.log('Chave PIX copiada para a área de transferência');
    }).catch(err => {
      console.error('Erro ao copiar chave PIX: ', err);
    });
  }
}
