import { Injectable } from "@angular/core";

@Injectable()
export class QemuConfigurationService {
    getConsoleTypes(){
        return ['telnet', 'vnc', 'spice', 'spice+agent', 'none'];
    }

    getDiskInterfaces() {
        return ['ide', 'sata', 'scsi', 'sd', 'mtd', 'floppy', 'pflash', 'virtio', 'none'];
    }

    getNetworkTypes() {
        let networkTypes = [["e1000", "Intel Gigabit Ethernet"],
            ["i82550", "Intel i82550 Ethernet"],
            ["i82551", "Intel i82551 Ethernet"],
            ["i82557a", "Intel i82557A Ethernet"],
            ["i82557b", "Intel i82557B Ethernet"],
            ["i82557c", "Intel i82557C Ethernet"],
            ["i82558a", "Intel i82558A Ethernet"],
            ["i82558b", "Intel i82558B Ethernet"],
            ["i82559a", "Intel i82559A Ethernet"],
            ["i82559b", "Intel i82559B Ethernet"],
            ["i82559c", "Intel i82559C Ethernet"],
            ["i82559er", "Intel i82559ER Ethernet"],
            ["i82562", "Intel i82562 Ethernet"],
            ["i82801", "Intel i82801 Ethernet"],
            ["ne2k_pci", "NE2000 Ethernet"],
            ["pcnet", "AMD PCNet Ethernet"],
            ["rtl8139", "Realtek 8139 Ethernet"],
            ["virtio", "Legacy paravirtualized Network I/O"],
            ["virtio-net-pci", "Paravirtualized Network I/O"],
            ["vmxnet3", "VMWare Paravirtualized Ethernet v3"]];

        return networkTypes;
    }

    getBootPriorities() {
        let bootPriorities = [["HDD", "c"],
            ["CD/DVD-ROM", "d"], 
            ["Network", "n"], 
            ["HDD or Network", "cn"], 
            ["HDD or CD/DVD-ROM", "cd"]];

        return bootPriorities;
    }

    getOnCloseOptions() {
        let onCloseOptions = [["Power off the VM", "power_off"], 
            ["Send the shutdown signal (ACPI)", "shutdown_signal"], 
            ["Save the VM state", "save_vm_state"]];

        return onCloseOptions;
    }

    getCategories() {
        let categories = [["Default", "guest"],
            ["Routers", "routers"],
            ["Switches", "switches"],
            ["End devices", "end_devices"],
            ["Security devices", "security_devices"]];

        return categories;
    }

    getPriorities() {
        let priorities = ["realtime",
            "very high",
            "high",
            "normal",
            "low",
            "very low"];

        return priorities;
    }
}
