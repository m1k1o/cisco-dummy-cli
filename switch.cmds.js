let switch_cmds = 
[
	{
		"group": "General switch configuration",
		"commands": [
			{
				"enabled": false,
				"mode": "",
				"description": "enable"
            },
            
            // EXISTS
			{
				"enabled": true,
				"mode": "",
				"description": "{exit|disable}"
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "{exit|end}"
			},
			{
				"enabled": true,
				"mode": "config-line",
				"description": "{exit|end}"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "{exit|end}"
			},
			{
				"enabled": true,
				"mode": "config-vlan",
				"description": "{exit|end}"
			},
			// EXISTS

			{
				"enabled": true,
				"mode": "",
				"description": "erase startup-config"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "delete flash:config.text"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "delete flash:vlan.dat"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "reload"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "configure terminal"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "copy {running-config|tftp} {startup-config|tftp}"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "write"
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "no ip domain-lookup"
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "hostname <name>"
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "enable {password|secret} <password>"
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "line console 0"
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "line vty 0 15"
			},
			{
				"enabled": true,
				"mode": "config-line",
				"description": "login"
			},
			{
				"enabled": true,
				"mode": "config-line",
				"description": "password <password>"
			},
			{
				"enabled": true,
				"mode": "config-line",
				"description": "logging synchronous"
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "service password-encryption"
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "default interface <fa0/1>"
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "interface fastethernet <port_number>"
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "interface vlan <vlan_number>"
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "interface range <fa0/1-10>"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "ip address <address> <mask>"
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "ip default-gateway <ip_address>"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "duplex {full|half}"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "speed {10|100}"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "description <text>"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "shutdown"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "no shutdown"
			}
		]
	},
	{
		"group": "Switch diagnostics",
		"commands": [
			{
				"enabled": true,
				"mode": "",
				"description": "show version"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show running-config"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show startup-config"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show ip interface brief"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show interface"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show interface <interface_type_number>"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show interface <interface_type_number> switchport"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show interface status"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show post"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show flash"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "dir flash:"
			}
		]
	},
	{
		"group": "Managing MAC address table",
		"commands": [
			{
				"enabled": true,
				"mode": "",
				"description": "show mac address-table"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "clear mac address-table dynamic"
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "mac address-table static <mac_address> vlan <id> interface <fa0/1>"
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "mac address-table aging-time <max-aging-time>"
			}
		]
	},
	{
		"group": "VLAN commands",
		"commands": [
			{
				"enabled": true,
				"mode": "",
				"description": "delete flash:vlan.dat"
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "vlan <vlan_number>"
			},
			{
				"enabled": true,
				"mode": "config-vlan",
				"description": "name <name>"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "switchport mode access"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "switchport access vlan <vlan_number>"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "switchport trunk encapsulation {isl|dot1q}"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "switchport mode trunk"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "switchport trunk native vlan <vlan_number>"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "switchport trunk allowed vlan <vlan-list>"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "switchport trunk allowed vlan remove <vlan-list>"
			},

			{
				"enabled": true,
				"mode": "",
				"description": "show vlan brief"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show vlan id <vlan_number>"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show vlan name <vlan_name>"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show interfaces trunk"
			}
		]
	},
	{
		"group": "SSH",
		"commands": [
			{
				"enabled": true,
				"mode": "config",
				"description": "ip domain-name <domain>"
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "crypto key generate rsa"
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "username <name> password <password>"
			},
			{
				"enabled": true,
				"mode": "config-line",
				"description": "login local"
			},
			{
				"enabled": true,
				"mode": "config-line",
				"description": "transport input ssh"
			}
		]
	},
	{
		"group": "STP",
		"commands": [
			{
				"enabled": true,
				"mode": "config",
				"description": "spanning-tree mode {pvst|rapid-pvst}"
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "spanning-tree portfast default"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "spanning-tree portfast"
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "spanning-tree portfast bpduguard"
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "no spanning-tree"
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "no spanning-tree vlan <vlan-list>"
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "spanning-tree vlan <vlan-list> priorioty <num>"
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "spanning-tree vlan <vlan-list> root {primary|secondary}"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "spanning-tree vlan <vlan-list> cost <num>"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "spanning-tree vlan <vlan-list> port-priority <num>"
			},

			{
				"enabled": true,
				"mode": "",
				"description": "show spanning-tree"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show spanning-tree detail"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show spanning-tree interface <type_number>"
			}
		]
	}
]