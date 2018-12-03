let router_cmds = 
[
	{
		"group": "General router configuration",
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
				"mode": "config-subif",
				"description": "{exit|end}"
			},
			{
				"enabled": true,
				"mode": "config-router",
				"description": "{exit|end}"
			},
			{
				"enabled": true,
				"mode": "config-keychain",
				"description": "{exit|end}"
			},
			{
				"enabled": true,
				"mode": "config-keychain-key",
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
				"description": "copy {running-config | tftp} {startup-config | tftp}"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "write"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "clock set <10:00:00> <20_September> <2017>"
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
				"description": "default interface <type> <slot/port>",
				"greedy": true
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "interface <type> <slot/port>",
				"greedy": true
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "interface range <type> <slot/port>",
				"greedy": true
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "ip address <address> <mask>"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "clock rate <bps>"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "no shutdown"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "description <text>"
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "banner motd # <message> #"
			}
		]
	},
	{
		"group": "Router diagnostics",
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
				"description": "show ip route"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show ip route <network-address> <mask>"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show ip protocols"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show ip interface"
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
				"description": "show interface <type> <slot/port>",
				"greedy": true
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show controllers"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show controllers <type> <slot/port>",
				"greedy": true
			}
		]
	},
	{
		"group": "Router-on-a-stick",
		"commands": [
			{
				"enabled": true,
				"mode": "config",
				"description": "interface <type> <slot/port>",
				"greedy": true
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "duplex {full|half}"
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
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "interface <type> <slot/port.subif_number>",
				"greedy": true
			},
			{
				"enabled": true,
				"mode": "config-subif",
				"description": "encapsulation dot1q <vlan_number>"
			},
			{
				"enabled": true,
				"mode": "config-subif",
				"description": "ip address <gateway-IP-of-VLAN> <mask>"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show vlans"
			}
		]
	},
	{
		"group": "Static route",
		"commands": [
			{
				"enabled": true,
				"mode": "config",
				"description": "ip route <network-address> <mask>"
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "ip route <network-address> <mask> <outgoing-interface>"
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "ip route <network-address> <mask> <outgoing-interface> <next-hopaddress>"
			},
			{
				"enabled": true,
				"mode": "config",
				"description": "ip route <network-address> <mask> <outgoing-interface> <next-hopaddress> <administrative-distance>"
			}
		]
	},
	{
		"group": "RIP",
		"commands": [
			{
				"enabled": true,
				"mode": "config",
				"description": "router rip"
			},
			{
				"enabled": true,
				"mode": "config-router",
				"description": "network <network-address>"
			},
			{
				"enabled": true,
				"mode": "config-router",
				"description": "version 2"
			},
			{
				"enabled": true,
				"mode": "config-router",
				"description": "no auto-summary"
			},
			{
				"enabled": true,
				"mode": "config-router",
				"description": "passive-interface <interface-type_number>"
			},
			{
				"enabled": true,
				"mode": "config-router",
				"description": "default-information originate"
			},
			{
				"enabled": true,
				"mode": "config-router",
				"description": "timers basic <update> <invalid> <holddown> <flush>"
			},

			{
				"enabled": true,
				"mode": "config",
				"description": "key chain <name>" //does not need to match
			},
			{
				"enabled": true,
				"mode": "config-keychain",
				"description": "key <number>" //needs to match
			},
			{
				"enabled": true,
				"mode": "config-keychain-key",
				"description": "key-string <password>" //needs to match
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "ip rip authentication key-chain <name>"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "ip rip authentication mode {text|md5}"
			},

			{
				"enabled": true,
				"mode": "",
				"description": "debug ip rip"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show ip rip database"
			}
		]
	},
	{
		"group": "EIGRP",
		"commands": [
			{
				"enabled": true,
				"mode": "config",
				"description": "router eigrp <AS-number>"
			},
			{
				"enabled": true,
				"mode": "config-router",
				"description": "network <network-address>"
			},
			{
				"enabled": true,
				"mode": "config-router",
				"description": "network <network-address> <wildcard-mask>"
			},
			{
				"enabled": true,
				"mode": "config-router",
				"description": "no auto-summary"
			},
			{
				"enabled": true,
				"mode": "config-router",
				"description": "passive-interface <interface-type_number>"
			},
			{
				"enabled": true,
				"mode": "config-router",
				"description": "redistribute static"
			},
			{
				"enabled": true,
				"mode": "config-router",
				"description": "variance <metric-multiplier>"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "bandwidth <value-in-kbps>"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "delay <value-in-tens-of-microseconds>"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "ip hello-interval eigrp <AS-number> <sec>"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "ip hold-time eigrp <AS-number> <sec>"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "ip summary-address eigrp <AS-number> <summary-address> <summarymask>"
			},

			{
				"enabled": true,
				"mode": "config",
				"description": "key chain <name>" //does not need to match
			},
			{
				"enabled": true,
				"mode": "config-keychain",
				"description": "key <number>" //needs to match
			},
			{
				"enabled": true,
				"mode": "config-keychain-key",
				"description": "key-string <password>" //needs to match
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "ip authentication key-chain eigrp <AS-number> <name>"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "ip authentication mode eigrp <AS-number> md5"
			},

			{
				"enabled": true,
				"mode": "",
				"description": "show ip eigrp neighbors"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show ip eigrp neighbors <interface>"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show ip eigrp neighbors <AS-number>"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show ip eigrp topology"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show ip eigrp topology <AS-number>"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show ip eigrp topology <network-address> <mask>"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show ip eigrp topology all-links"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show ip eigrp interfaces"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show ip eigrp interfaces <AS-number>"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show ip eigrp traffic"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show ip eigrp traffic <AS-number>"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "debug eigrp {fsm|packet}"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "debug ip eigrp"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "debug ip eigrp neighbor <neighbor-address>"
			}
		]
	},
	{
		"group": "OSPF",
		"commands": [
			{
				"enabled": true,
				"mode": "config",
				"description": "router ospf <process-id>"
			},
			{
				"enabled": true,
				"mode": "config-router",
				"description": "router-id <ipv4-address>"
			},
			{
				"enabled": true,
				"mode": "config-router",
				"description": "network <net-address> <wildcard-mask> area <area-id>"
			},
			{
				"enabled": true,
				"mode": "config-router",
				"description": "passive-interface <interface-type_number>"
			},
			{
				"enabled": true,
				"mode": "config-router",
				"description": "auto-cost reference-bandwidth <value-in-Mbps>"
			},
			{
				"enabled": true,
				"mode": "config-router",
				"description": "default-information originate"
			},
			{
				"enabled": true,
				"mode": "config-router",
				"description": "area <area-id> range <summary-address> <subnet-mask>"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "ip ospf cost <value>"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "bandwidth <value-in-kbps>"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "ip ospf priority <value>"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "ip ospf {hello-interval|dead-interval} <seconds>"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "ip ospf network <network-type>"
			},

			{
				"enabled": true,
				"mode": "config-router",
				"description": "area <area-id> authentication"
			},
			{
				"enabled": true,
				"mode": "config-router",
				"description": "area <area-id> authentication message-digest"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "ip ospf authentication"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "ip ospf authentication message-digest"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "ip ospf authentication-key <password>"
			},
			{
				"enabled": true,
				"mode": "config-if",
				"description": "ip ospf message-digest-key <key-number> md5 <password>"
			},

			{
				"enabled": true,
				"mode": "",
				"description": "show ip ospf neighbor"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show ip ospf neighbor <interface-type_number>"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show ip ospf neighbor <interface-type_number> <neighbor-id>"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show ip ospf interface"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show ip ospf interface <interface-type_number>"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show ip ospf database"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "show ip ospf"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "debug ip ospf"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "debug ip ospf {events|adj}"
			},
			{
				"enabled": true,
				"mode": "",
				"description": "clear ip ospf process"
			}
		]
	}
]