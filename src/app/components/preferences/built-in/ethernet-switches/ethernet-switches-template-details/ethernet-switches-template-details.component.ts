import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from '../../../../../services/server.service';
import { Server } from '../../../../../models/server';
import { ToasterService } from '../../../../../services/toaster.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BuiltInTemplatesService } from '../../../../../services/built-in-templates.service';
import { EthernetSwitchTemplate } from '../../../../../models/templates/ethernet-switch-template';
import { PortsMappingEntity } from '../../../../../models/ethernetHub/ports-mapping-enity';
import { BuiltInTemplatesConfigurationService } from '../../../../../services/built-in-templates-configuration.service';


@Component({
    selector: 'app-ethernet-switches-template-details',
    templateUrl: './ethernet-switches-template-details.component.html',
    styleUrls: ['./ethernet-switches-template-details.component.scss', '../../../preferences.component.scss']
})
export class EthernetSwitchesTemplateDetailsComponent implements OnInit {
    server: Server;
    ethernetSwitchTemplate: EthernetSwitchTemplate;
    inputForm: FormGroup;
    ethernetPorts: PortsMappingEntity[] = [];
    dataSource: PortsMappingEntity[] = [];
    newPort: PortsMappingEntity;

    isSymbolSelectionOpened: boolean = false;

    categories = [];
    consoleTypes: string[] = [];
    portTypes: string[] = [];
    etherTypes: string[] = [];
    displayedColumns: string[] = ['port_number', 'vlan', 'type', 'ethertype'];

    constructor(
        private route: ActivatedRoute,
        private serverService: ServerService,
        private builtInTemplatesService: BuiltInTemplatesService,
        private toasterService: ToasterService,
        private formBuilder: FormBuilder,
        private builtInTemplatesConfigurationService: BuiltInTemplatesConfigurationService,
        private router: Router
    ){
        this.inputForm = this.formBuilder.group({
            templateName: new FormControl('', Validators.required),
            defaultName: new FormControl('', Validators.required),
            symbol: new FormControl('', Validators.required)
        });

        this.newPort = {
            name: '',
            port_number: 0,
        };
    }

    ngOnInit() {
        const server_id = this.route.snapshot.paramMap.get("server_id");
        const template_id = this.route.snapshot.paramMap.get("template_id");
        this.serverService.get(parseInt(server_id, 10)).then((server: Server) => {
            this.server = server;

            this.getConfiguration();
            this.builtInTemplatesService.getTemplate(this.server, template_id).subscribe((ethernetSwitchTemplate: EthernetSwitchTemplate) => {
                this.ethernetSwitchTemplate = ethernetSwitchTemplate;
                this.ethernetPorts = this.ethernetSwitchTemplate.ports_mapping;
                this.dataSource =  this.ethernetSwitchTemplate.ports_mapping;
            });
        });
    }

    getConfiguration() {
        this.categories = this.builtInTemplatesConfigurationService.getCategoriesForEthernetSwitches();
        this.consoleTypes = this.builtInTemplatesConfigurationService.getConsoleTypesForEthernetSwitches();
        this.portTypes = this.builtInTemplatesConfigurationService.getPortTypesForEthernetSwitches();
        this.etherTypes = this.builtInTemplatesConfigurationService.getEtherTypesForEthernetSwitches();
    }

    onAdd() {
        this.ethernetPorts.push(this.newPort);
        this.dataSource = [...this.ethernetPorts];
        
        this.newPort = {
            name: '',
            port_number: 0,
        };
    }

    goBack() {
        this.router.navigate(['/server', this.server.id, 'preferences', 'builtin', 'ethernet-switches']);
    }

    onSave() {
        if (this.inputForm.invalid) {
            this.toasterService.error(`Fill all required fields`);
        } else {
            this.builtInTemplatesService.saveTemplate(this.server, this.ethernetSwitchTemplate).subscribe((ethernetSwitchTemplate: EthernetSwitchTemplate) => {
                this.toasterService.success("Changes saved");
            });
        }
    }

    chooseSymbol() {
        this.isSymbolSelectionOpened = !this.isSymbolSelectionOpened;
    }

    symbolChanged(chosenSymbol: string) {
        this.isSymbolSelectionOpened = !this.isSymbolSelectionOpened;
        this.ethernetSwitchTemplate.symbol = chosenSymbol;
    }
}
