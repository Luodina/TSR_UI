export default {
    "services":
    {
        "server":
            [
                {
                    "stage_id": 1,
                    "stage_name": "reqManager",
                    "name": "Requester Manager Approval",
                    "status": "Pending"
                },
                {
                    "stage_id": 2,
                    "stage_name": "supManager",
                    "name": "Support Team Approval",
                    "approvers": [{
                        "group_id": 4,
                        "init_name": "T3SupportMgr"
                    }]
                },
                {
                    "stage_id": 3,
                    "stage_name": "supTeam",
                    "approvers": [{
                        "group_id": 9,
                        "init_name": "T3Support"
                    }]
                }
            ],
        "database":
            [
                {
                    "stage_id": 1,
                    "name": "Requester Manager Approval",
                    "stage_name": "reqManager",
                    "status": "Pending",
                    "approvedBy": "Unknown"
                },
                {
                    "stage_id": 2,
                    "name": "Support Team Approval",
                    "stage_name": "supTeam",
                    "approvers": [{
                        "group_id": 5,
                        "init_name": "SC3SupportMgr",
                        "people": []
                    }],
                    "status": "Waiting",
                    "approvedBy": "Unknown"
                },
                {
                    "stage_id": 3,
                    "stage_name": "supTeam",
                    "approvers": [{
                        "group_id": 10,
                        "init_name": "SC3Support",
                        "people": []
                    }],
                    "name": "Support Team Handling",
                    "status": "Waiting",
                    "approvedBy": "Unknown"
                }
            ],
        "dns": [
            {
                "stage_id": 3,
                "name": "Support Team Approval"
            },
            {
                "stage_id": 4,
                "name": "Support Team Handling"
            }
        ],
        "backup": [
            {
                "stage_id": 3,
                "name": "Support Team Approval"
            },
            {
                "stage_id": 4,
                "name": "Support Team Handling"
            }
        ],
        "storage": [
            {
                "stage_id": 3,
                "name": "Support Team Approval"
            },
            {
                "stage_id": 4,
                "name": "Support Team Handling"
            }
        ],
        "email": [
            {
                "stage_id": 2,
                "name": "Support Team Manager Approval",
            },
            {
                "stage_id": 3,
                "name": "Support Team Approval"
            },
            {
                "stage_id": 4,
                "name": "Support Team Handling"
            }
        ],
        "firewall": [
            {
                "stage_id": 2,
                "stage_name": "reqTeamManager",
                "name": "RequesterTeam Manager Approval",
            },
            {
                "stage_id": 3,
                "name": "Support Team Approval"
            },
            {
                "stage_id": 4,
                "name": "Support Team Handling"
            }
        ],
        "ibra": [

        ],
        "eCert": [
            {
                "stage_id": 2,
                "name": "Support Team Manager Approval",
            },
            {
                "stage_id": 3,
                "name": "Support Team Approval"
            },
            {
                "stage_id": 4,
                "name": "Support Team Handling"
            }
        ],
        "userAccount": [

        ],
        "fileAdmin": [

            {
                "stage_id": 3,
                "name": "Support Team Approval"
            },
            {
                "stage_id": 4,
                "name": "Support Team Handling"
            }
        ]
    }

}
