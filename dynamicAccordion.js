import { LightningElement, api, wire } from 'lwc';
import getAccordionData from '@salesforce/apex/ProductController.getAccordionData';

export default class DynamicAccordion extends LightningElement {
    @api recordId;
    @api title; 
    accordionData = [];

    hasData = false;

    @wire(getAccordionData, { productId: '$recordId' })
    wiredAccordionData({ error, data }) {
        if (data) {
            try {
                this.accordionData = JSON.parse(data);
                this.hasData = true;
            } catch (e) {
                console.error('Erro ao processar dados do accordion:', e);
            }
        } else if (error) {
            console.error('Erro ao buscar os dados do accordion:', error);
        }
    }

    activeSections = '';

    handleSectionToggle(event) {
        const openSections = event.detail.openSections;

        if (openSections.length === 0) {
            this.activeSectionsMessage = 'All sections are closed';
        } else {
            this.activeSectionsMessage =
                'Open sections: ' + openSections.join(', ');
        }
    }
}
