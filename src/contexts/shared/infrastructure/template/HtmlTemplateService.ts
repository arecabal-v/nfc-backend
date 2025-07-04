import { TemplateService, ContactPageData, ContactInfo } from '@contexts/shared/domain/template/TemplateService';

export class HtmlTemplateService implements TemplateService {
  generateContactPage(data: ContactPageData): string {
    const { serialNumber, contactInfo } = data;

    const contactCards = contactInfo.map((contact: ContactInfo) => {
      const typeEmoji = this.getContactTypeEmoji(contact.type);
      const typeLabel = this.getContactTypeLabel(contact.type);

      return `
        <div class="contact-card">
          <div class="contact-header">
            <span class="contact-emoji">${typeEmoji}</span>
            <span class="contact-type">${typeLabel}</span>
          </div>
          <h3 class="contact-name">${contact.name}</h3>
          ${contact.phone ? `
            <div class="contact-info">
              <span class="icon">📞</span>
              <a href="tel:${contact.phone}" class="contact-link">${contact.phone}</a>
            </div>
          ` : ''}
          ${contact.email ? `
            <div class="contact-info">
              <span class="icon">✉️</span>
              <a href="mailto:${contact.email}" class="contact-link">${contact.email}</a>
            </div>
          ` : ''}
          ${contact.company ? `
            <div class="contact-info">
              <span class="icon">🏢</span>
              <span class="contact-text">${contact.company}</span>
            </div>
          ` : ''}
          ${contact.position ? `
            <div class="contact-info">
              <span class="icon">👔</span>
              <span class="contact-text">${contact.position}</span>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    return this.getBaseTemplate(serialNumber, contactCards);
  }

  private getBaseTemplate(serialNumber: string, contactCards: string): string {
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Información de Contacto - ${serialNumber}</title>
        <style>
          ${this.getStyles()}
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📋 Información de Contacto</h1>
            <p>Collar NFC: ${serialNumber}</p>
          </div>
          
          <div class="content">
            <div class="emergency-note">
              <strong>⚠️ En caso de emergencia</strong><br>
              Contacta con las personas listadas a continuación
            </div>
            
            ${contactCards}
          </div>
          
          <div class="footer">
            <p>Esta información fue escaneada desde un collar NFC</p>
            <p>Contacta directamente haciendo clic en los enlaces</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private getStyles(): string {
    return `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        padding: 20px;
      }
      
      .container {
        max-width: 600px;
        margin: 0 auto;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        overflow: hidden;
      }
      
      .header {
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        color: white;
        padding: 30px 20px;
        text-align: center;
      }
      
      .header h1 {
        font-size: 24px;
        margin-bottom: 10px;
      }
      
      .header p {
        opacity: 0.9;
        font-size: 16px;
      }
      
      .content {
        padding: 30px 20px;
      }
      
      .contact-card {
        background: #f8fafc;
        border-radius: 15px;
        padding: 20px;
        margin-bottom: 20px;
        border-left: 4px solid #3b82f6;
      }
      
      .contact-header {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
      }
      
      .contact-emoji {
        font-size: 24px;
        margin-right: 10px;
      }
      
      .contact-type {
        background: #3b82f6;
        color: white;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
      }
      
      .contact-name {
        font-size: 20px;
        color: #1e293b;
        margin-bottom: 15px;
      }
      
      .contact-info {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }
      
      .icon {
        font-size: 16px;
        margin-right: 10px;
        width: 20px;
      }
      
      .contact-link {
        color: #3b82f6;
        text-decoration: none;
        font-weight: 500;
      }
      
      .contact-link:hover {
        text-decoration: underline;
      }
      
      .contact-text {
        color: #64748b;
      }
      
      .footer {
        background: #f1f5f9;
        padding: 20px;
        text-align: center;
        color: #64748b;
        font-size: 14px;
      }
      
      .emergency-note {
        background: #fef3c7;
        border: 1px solid #f59e0b;
        border-radius: 10px;
        padding: 15px;
        margin: 20px 0;
        text-align: center;
      }
      
      .emergency-note strong {
        color: #92400e;
      }
      
      @media (max-width: 480px) {
        body {
          padding: 10px;
        }
        
        .header {
          padding: 20px 15px;
        }
        
        .header h1 {
          font-size: 20px;
        }
        
        .content {
          padding: 20px 15px;
        }
        
        .contact-card {
          padding: 15px;
        }
      }
    `;
  }

  private getContactTypeEmoji(type: string): string {
    const emojis: { [key: string]: string } = {
      'tutor': '👨‍🏫',
      'father': '👨‍👦',
      'mother': '👩‍👧',
      'other': '👤',
    };
    return emojis[type] || '👤';
  }

  private getContactTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'tutor': 'Tutor',
      'father': 'Padre',
      'mother': 'Madre',
      'other': 'Otro',
    };
    return labels[type] || 'Contacto';
  }
}
