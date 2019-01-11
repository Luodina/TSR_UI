export default {
    "services":
    {
        "server":
            [{
                "location": "AAA",
                "type": "Type1",
                "env": "Development",
                "os": "linux",
                "app": "Application",
                "cpu": "64",
                "memory": "128",
                "disk": "disk1",
                "sw": "Software1",
                "justification": "Justification1",
                "backup": "Data Backup1",
                "hostname": "ha_host"
            }],
        "database":
            [{
                location: 'AAA',
                platform_type: 'Platform',
                os_version: 'OS Version',
                env: 'Development',
                type: 'Microsoft SQL Server',
                db_version: 'Database Version',
                network: 'Network Drive Letter',
                disk: 128,
                sw: 'Software',
                justification: 'Justification',
                backup: 'Yes',
                hostname: 'Hostname',
                sql_server: 'SQL Virtual Server Name',
                sql_instance: 'SQL Instance Name',

                sql_port: 'SQL Port',
                sql_memory: 'Max Memory for SQL',
                sql_account: 'SQL Service account'
            }],
        "dns": [
            {
                "server_type": "MicrosoftWindows Server",
                "app_name": "App Name",
                "failover": "FailOver",
                "ttl": "TTL",
                "load_balancing": "Load Balancing",
                "pool_num": "Pool Number",
                "pr_hostname": "Primary Hostname",


                "pr_ip_addr": "Primary IP Address",

                "pr_port_num": "Primary Port No",

                "st_hostname": "Standby Hostname",
                "st_ip_addr": "Standby IP Address",
                "field": "st_ip_addr",
                "st_port_num": "Standby Port No",

            }
        ],
        "backup": [
            {
                "backup_sw": "Backup Software",
                "fqdn": "FQDN (Production)",
                "fqdn_atl": "FQDN (ATL)",
                "dns": "DNS Reversed Lookup",
                "firewall_protected": "Yes",
                "platform": "Platform",
                "host_type": "Type of host",
                "clustering": "Clustering",
                "cluster_hostname": "Cluster Hostname",
                "remote_standby": "Remote Standby",
                "db_type": "Database Type",
            }
        ],
        "storage": [
            {
                "action_type": "Action Type",
                "cluster_hostname": "Capacity Plan Information",
                "remote_standby": "Number of Disk",
                "db_type": "Size of Disk",
            }
        ],
        "email": [
            {
                "req_type": "Request Type",
                "src_ip": "Source IP",
                "env": "Development",
                "purpose": "Purpose",
                "remarks": "Remarks",
                "emails_num": "Transaction volume (no of emails)",

            }
        ],
        "firewall": [
            {
                "type": "Firewall Request Form ",
                "cc_list": "CC list",
                "endorsment": "Team1",
                "additional_approval": "Additional Required Team Approval",
                "remarks": "Remarks",
                "affected_prj": "Affected Projects",
                "justification": "Justification",

            }
        ],
        "ibra": [
            {
                "ip": "IP",
                "hostname": "Hostname",
                "owner": "Owner",
                "service": "Service",
                "protocol": "Protocol",
                "port_num": "Port Number",
                "purpose": "Purpose",
                "data_classification": "Data Classification",
                "info": "Information"
            }
        ],
        "eCert": [
            {
                "issue_ca": "Issue CA",
                "server_name": "Server Name",
                "srv_location": "Server Location",
                "site_access": "Site Accessibility",
                "site_addr": "Site Address",
                "web_app": "Web Applications",
                "users": "Intended Users",
                "req_type": "Request Type",
                "hash_alg": "Hashing Algorithm",
                "csr_file": "CSR File"
            }
        ],
        "userAccount": [
            {
                "location": "XXX"
            },
        ],
        "fileAdmin": [
            {
                "location": "YYYYY",
            },
        ]
    }

}
