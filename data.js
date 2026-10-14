window.SESSION = {
 "sessionId": "tb-2026-10-training",
 "group": "Transparent Battlefield",
 "domain": "Russian innovation cycle for EW/UAS in the Russia-Ukraine war",
 "researchQuestion": "How did the Russian military innovation ecosystem around drones and electronic warfare (EW) make fast innovation possible between 2023 and 2026, and which of its mechanisms can NATO countries use to speed up their own innovation cycles?",
 "subQuestions": [
  "Who. Which state and non-state actors make up the ecosystem, and what role does each play?",
  "How it works. How does a drone or EW innovation move from a need at the front to a fielded system, and what slows it down?",
  "NATO countries. What NATO and Western militaries learn from this war, and how they develop, use and counter drones and EW themselves."
 ],
 "hltps": [
  "Ecosystem Actor Type",
  "Innovation Pipeline Stage",
  "Innovation Mechanism And Enabler",
  "Speed Dynamics",
  "Technology Domain",
  "Unmanned Intelligence Gathering Context",
  "Organizational And Command Level",
  "Temporal Phase",
  "Combatant Lessons Learned And Applied (Russia And Ukraine)",
  "Lesson Holder And Vantage Point",
  "NATO Observer Lessons Learned"
 ],
 "rules": [
  [
   "One label per dimension",
   "Look at each dimension separately and choose at most one third-level label for it."
  ],
  [
   "Only what the text says",
   "Give a label only when the text itself supports it. Do not infer from background knowledge what the text does not say."
  ],
  [
   "Do not force a fit",
   "If no element of a dimension applies, leave that dimension empty."
  ],
  [
   "Empty is a valid answer",
   "If no dimension applies at all, label nothing. The prompt says so explicitly, and the model did it for 581 of the 1,000 chunks in this run."
  ],
  [
   "What gets no labels",
   "Generic Ministry of Defence loss tallies, politics, humanitarian aid or ceremonial text with no substantive drone, EW, innovation or lessons content. That one sentence is the entire relevance rule."
  ],
  [
   "Confidence",
   "How certain you are, where the middle of the scale means a coin flip. Lower it when the text is short, ambiguous or lacks context. The model used 0-100; you have 1-5."
  ]
 ],
 "promptText": "You are an expert annotator. Your task is to classify ONE text chunk at a time\naccording to a fixed, multi-dimensional taxonomy. You never invent categories:\nevery label you give must appear exactly in the taxonomy below.\n\nDOMAIN\nRussian Innovation cycle for EW/UAS in the Russia-Ukraine war\n\nRESEARCH QUESTION\nHow did the Russian military innovation ecosystem around drones and electronic warfare (EW) make fast innovation possible between 2023 and 2026, and which of its mechanisms can NATO countries use to speed up their own innovation cycles?\n\n1. **Who.** Which state and non-state actors make up the ecosystem, and what role does each play?\n2. **How it works.** How does a drone or EW innovation move from a need at the front to a fielded system, and what slows it down?\n3. **NATO countries.** What NATO and Western militaries learn from this war, and how they develop, use and counter drones and EW themselves.\n---------------------------------------------------------------------\nTAXONOMY\n---------------------------------------------------------------------\nThe taxonomy has three levels. Each HLTP is an independent dimension (a lens).\nEach row below is one complete classification path, in CSV format\n(comma-separated; a name that contains a comma is wrapped in double quotes):\n\n    [ the 235 taxonomy rows are omitted here — they are\n      the dropdowns you are filling in ]\n\n------\nDECISION RULES\n---------------------------------------------------------------------\n1. Look at each HLTP separately. For each HLTP, choose AT MOST ONE 3rd Level TE.\n2. Only give a label when the text itself supports it. Do not infer from\n   background knowledge what the text does not say.\n3. If no element of an HLTP applies, give no label for that HLTP. Do not force a fit.\n4. If no HLTP applies at all, return an empty \"labels\" list and explain why\n   in \"reasoning\".\n5. Use the exact spelling and capitalization of the taxonomy, without the CSV\n   quotation marks. A label that is not in the taxonomy is an error.\n6. The text may be in Russian or another language. Classify the meaning, and\n   quote the text spans in the original language.\n\n---------------------------------------------------------------------\nJUSTIFICATION\n---------------------------------------------------------------------\nFor every label, quote the exact words from the chunk that led to it\n(\"text_spans\") and give a one-sentence explanation (\"reasoning\").\nGive a confidence between 0 and 100, where 100 means fully certain and 50 means\na coin flip. Calibrate honestly: lower the score when the text is short,\nambiguous or lacks context.\n\n---------------------------------------------------------------------\nOUTPUT FORMAT\n---------------------------------------------------------------------\nReturn strict JSON only, no extra text, with exactly these fields:\n\n{\n  \"chunk_id\": \"<the chunk_id given below>\",\n  \"labels\": [\n    {\n      \"HLTP\": \"<exactly as in the taxonomy>\",\n      \"2nd Level TE\": \"<exactly as in the taxonomy>\",\n      \"3rd Level TE\": \"<exactly as in the taxonomy>\",\n      \"text_spans\": [\"<exact quote from the chunk>\"],\n      \"reasoning\": \"<one sentence>\",\n      \"confidence\": <0-100>\n    }\n  ],\n  \"reasoning\": \"<one or two sentences on the chunk as a whole>\"\n}\n\n---------------------------------------------------------------------\nGUIDANCE ON THE LESSONS-LEARNED AND INTELLIGENCE HLTPs\n---------------------------------------------------------------------\n- \"Combatant Lessons Learned And Applied (Russia And Ukraine)\": lessons that the\n  fighting parties (Russia, Ukraine) learned through participation in combat AND applied\n  in the frontline/combat environment or their own forces (tactics changed after losses,\n  design fixes from field experience, unit reorganizations, doctrine or procurement changes\n  driven by battlefield evidence). The 2nd level is the level of application (tactical,\n  operational, strategic/institutional), flow across levels, trigger, or application status.\n  These chunks are especially important to the research: look for them carefully, but\n  label only when the text itself supports a lesson that was drawn from combat experience.\n- \"NATO Observer Lessons Learned\": lessons NATO/Western actors draw by OBSERVING and\n  ANALYSING the war without participating. Use the topic rows for WHAT is learned; use\n  \"Observation And Analysis Methods\", \"Transferability And Applicability Limits\" and\n  \"Adoption Into National Forces\" for HOW it is obtained, how far it transfers, and whether it\n  is adopted by national forces or the alliance. Never use this HLTP for lessons the\n  belligerents themselves apply; never use the combatant HLTP for NATO observation.\n- \"Lesson Holder And Vantage Point\": who holds the lesson (Russian forces, Ukrainian\n  forces, mutual adaptation, or a non-participant observer). Label it whenever a lesson is\n  discussed and the holder is clear from the text.\n- \"Unmanned Intelligence Gathering Context\": use when unmanned systems are used for\n  intelligence, surveillance, reconnaissance, targeting support, BDA, or when counter-ISR\n  (concealment, detection of enemy drones) or ISR limits are discussed. Platforms still go\n  under Technology Domain.\n- Generic MoD loss tallies, politics, humanitarian aid or ceremonial text with no substantive\n  drone/EW/innovation/lessons content get no labels. Do not infer beyond the text.\n- Take care that long chunks may be truncated by the Read tool; read all of them.",
 "runFacts": [
  [
   "Model",
   "Claude Sonnet 5.5, with no special settings - so not temperature 0."
  ],
  [
   "Taxonomy",
   "11 dimensions, 59 second-level and 235 third-level elements. 110 of the 235 were never used on this run, and 9 second-level elements never appeared at all."
  ],
  [
   "Corpus",
   "1,000 chunks, all from January to March 2026. 85% news via the Integrum archive, 8% Telegram, 999 of 1,000 in Russian. No Ministry of Defence, Rostec or company sources at all."
  ],
  [
   "Empty results",
   "581 of the 1,000 chunks came back with no label. Nothing failed technically - the model found nothing to attach."
  ],
  [
   "Known overlap",
   "Two dimensions co-occur 94% of the time and three second-level elements overlap completely. If two labels feel as though they always go together, you are seeing something real."
  ]
 ],
 "benchmark": 20,
 "taxonomy": [
  [
   "Ecosystem Actor Type",
   "Ministry Of Defense And State Military Structures",
   "Unmanned Systems Forces (Rubicon-Type Centers)"
  ],
  [
   "Ecosystem Actor Type",
   "Ministry Of Defense And State Military Structures",
   "Electronic Warfare Troops Command"
  ],
  [
   "Ecosystem Actor Type",
   "Ministry Of Defense And State Military Structures",
   "General Staff Requirements Branch"
  ],
  [
   "Ecosystem Actor Type",
   "Ministry Of Defense And State Military Structures",
   "Military Acceptance Inspectorate (Voyenpriyomka)"
  ],
  [
   "Ecosystem Actor Type",
   "State-Owned Defense Industry",
   "Rostec And Kalashnikov Concern Design Bureaus"
  ],
  [
   "Ecosystem Actor Type",
   "State-Owned Defense Industry",
   "Zala Aero Group"
  ],
  [
   "Ecosystem Actor Type",
   "State-Owned Defense Industry",
   "KRET Electronic Warfare Conglomerate"
  ],
  [
   "Ecosystem Actor Type",
   "State-Owned Defense Industry",
   "State Arsenal Production Lines"
  ],
  [
   "Ecosystem Actor Type",
   "Volunteer And Grassroots Networks",
   "Crowdfunded Drone Battalions"
  ],
  [
   "Ecosystem Actor Type",
   "Volunteer And Grassroots Networks",
   "Telegram-Coordinated Workshops"
  ],
  [
   "Ecosystem Actor Type",
   "Volunteer And Grassroots Networks",
   "Regional Patriotic Fund Drives"
  ],
  [
   "Ecosystem Actor Type",
   "Volunteer And Grassroots Networks",
   "Veteran-Run Repair Hubs"
  ],
  [
   "Ecosystem Actor Type",
   "Private Commercial And Dual-Use Tech Sector",
   "Small FPV Assembly Firms"
  ],
  [
   "Ecosystem Actor Type",
   "Private Commercial And Dual-Use Tech Sector",
   "Consumer Electronics Repurposing Shops"
  ],
  [
   "Ecosystem Actor Type",
   "Private Commercial And Dual-Use Tech Sector",
   "Software And Firmware Developer Collectives"
  ],
  [
   "Ecosystem Actor Type",
   "Private Commercial And Dual-Use Tech Sector",
   "Component Import And Re-Export Brokers"
  ],
  [
   "Ecosystem Actor Type",
   "Front-Line Units And Soldier-Innovators",
   "Battalion-Level Drone Companies"
  ],
  [
   "Ecosystem Actor Type",
   "Front-Line Units And Soldier-Innovators",
   "Self-Taught Pilot-Technicians"
  ],
  [
   "Ecosystem Actor Type",
   "Front-Line Units And Soldier-Innovators",
   "Informal Unit Workshops"
  ],
  [
   "Ecosystem Actor Type",
   "Front-Line Units And Soldier-Innovators",
   "Peer-To-Peer Tactics Forums"
  ],
  [
   "Ecosystem Actor Type",
   "Foreign And Sanctions-Evasion Suppliers",
   "Chinese Component Resellers"
  ],
  [
   "Ecosystem Actor Type",
   "Foreign And Sanctions-Evasion Suppliers",
   "Shell-Company Procurement Networks"
  ],
  [
   "Ecosystem Actor Type",
   "Foreign And Sanctions-Evasion Suppliers",
   "Iranian Systems Transfer Channels"
  ],
  [
   "Ecosystem Actor Type",
   "Foreign And Sanctions-Evasion Suppliers",
   "Parallel-Import Logistics Chains"
  ],
  [
   "Innovation Pipeline Stage",
   "Need Identification",
   "Front-Line After-Action Reporting"
  ],
  [
   "Innovation Pipeline Stage",
   "Need Identification",
   "Loss And Damage Statistics Analysis"
  ],
  [
   "Innovation Pipeline Stage",
   "Need Identification",
   "Soldier Feedback Channels"
  ],
  [
   "Innovation Pipeline Stage",
   "Need Identification",
   "Enemy Capability Observation"
  ],
  [
   "Innovation Pipeline Stage",
   "Prototyping And Rapid Modification",
   "Field Workshop Retrofits"
  ],
  [
   "Innovation Pipeline Stage",
   "Prototyping And Rapid Modification",
   "3D-Printed Component Iteration"
  ],
  [
   "Innovation Pipeline Stage",
   "Prototyping And Rapid Modification",
   "Open-Source Firmware Tweaks"
  ],
  [
   "Innovation Pipeline Stage",
   "Prototyping And Rapid Modification",
   "Captured-Equipment Reverse Engineering"
  ],
  [
   "Innovation Pipeline Stage",
   "Testing And Validation",
   "Informal Front-Line Trials"
  ],
  [
   "Innovation Pipeline Stage",
   "Testing And Validation",
   "Military Acceptance Certification"
  ],
  [
   "Innovation Pipeline Stage",
   "Testing And Validation",
   "Live-Fire Proving Grounds"
  ],
  [
   "Innovation Pipeline Stage",
   "Testing And Validation",
   "Electronic Warfare Range Testing"
  ],
  [
   "Innovation Pipeline Stage",
   "Procurement And Resourcing",
   "State Defense Order Contracting"
  ],
  [
   "Innovation Pipeline Stage",
   "Procurement And Resourcing",
   "Crowdfunded Direct Purchase"
  ],
  [
   "Innovation Pipeline Stage",
   "Procurement And Resourcing",
   "Regional Government Grants"
  ],
  [
   "Innovation Pipeline Stage",
   "Procurement And Resourcing",
   "Sanctions-Evasion Component Sourcing"
  ],
  [
   "Innovation Pipeline Stage",
   "Production Scaling",
   "State Factory Mass Production"
  ],
  [
   "Innovation Pipeline Stage",
   "Production Scaling",
   "Distributed Small-Workshop Assembly"
  ],
  [
   "Innovation Pipeline Stage",
   "Production Scaling",
   "Modular Kit Standardization"
  ],
  [
   "Innovation Pipeline Stage",
   "Production Scaling",
   "Component Supply Chain Expansion"
  ],
  [
   "Innovation Pipeline Stage",
   "Fielding And Distribution",
   "Unit-Level Equipment Issue"
  ],
  [
   "Innovation Pipeline Stage",
   "Fielding And Distribution",
   "Training And Pilot Certification"
  ],
  [
   "Innovation Pipeline Stage",
   "Fielding And Distribution",
   "Logistics To Front-Line Depots"
  ],
  [
   "Innovation Pipeline Stage",
   "Fielding And Distribution",
   "Cross-Unit Knowledge Transfer"
  ],
  [
   "Innovation Pipeline Stage",
   "Feedback And Iteration Loop",
   "Combat Data Collection"
  ],
  [
   "Innovation Pipeline Stage",
   "Feedback And Iteration Loop",
   "Rapid Design Revision Cycles"
  ],
  [
   "Innovation Pipeline Stage",
   "Feedback And Iteration Loop",
   "Telegram And Chat After-Action Sharing"
  ],
  [
   "Innovation Pipeline Stage",
   "Feedback And Iteration Loop",
   "Formal Lessons-Learned Reporting"
  ],
  [
   "Innovation Mechanism And Enabler",
   "Decentralized Procurement And Funding",
   "Crowdfunding Platforms"
  ],
  [
   "Innovation Mechanism And Enabler",
   "Decentralized Procurement And Funding",
   "Regional Patron Sponsorship"
  ],
  [
   "Innovation Mechanism And Enabler",
   "Decentralized Procurement And Funding",
   "Direct Unit Purchasing Authority"
  ],
  [
   "Innovation Mechanism And Enabler",
   "Decentralized Procurement And Funding",
   "Volunteer Logistics Networks"
  ],
  [
   "Innovation Mechanism And Enabler",
   "Informal Knowledge Networks",
   "Telegram Channel Tactics-Sharing"
  ],
  [
   "Innovation Mechanism And Enabler",
   "Informal Knowledge Networks",
   "Pilot Training Exchange Programs"
  ],
  [
   "Innovation Mechanism And Enabler",
   "Informal Knowledge Networks",
   "Cross-Unit Technician Rotation"
  ],
  [
   "Innovation Mechanism And Enabler",
   "Informal Knowledge Networks",
   "Open-Source Community Forums"
  ],
  [
   "Innovation Mechanism And Enabler",
   "Reverse Engineering And Adaptation",
   "Captured NATO And Western Equipment Exploitation"
  ],
  [
   "Innovation Mechanism And Enabler",
   "Reverse Engineering And Adaptation",
   "Commercial Drone Repurposing"
  ],
  [
   "Innovation Mechanism And Enabler",
   "Reverse Engineering And Adaptation",
   "Civilian Electronics Component Reuse"
  ],
  [
   "Innovation Mechanism And Enabler",
   "Reverse Engineering And Adaptation",
   "Foreign Firmware Modification"
  ],
  [
   "Innovation Mechanism And Enabler",
   "Centralized Specialized Units",
   "Rubicon-Style Unmanned Systems Centers"
  ],
  [
   "Innovation Mechanism And Enabler",
   "Centralized Specialized Units",
   "Dedicated Electronic Warfare Brigades"
  ],
  [
   "Innovation Mechanism And Enabler",
   "Centralized Specialized Units",
   "Cross-Domain Integration Cells"
  ],
  [
   "Innovation Mechanism And Enabler",
   "Centralized Specialized Units",
   "Rapid-Adoption Pilot Programs"
  ],
  [
   "Innovation Mechanism And Enabler",
   "Industrial Mobilization Measures",
   "Defense Order Streamlining Decrees"
  ],
  [
   "Innovation Mechanism And Enabler",
   "Industrial Mobilization Measures",
   "Sanctions-Evasion Supply Chains"
  ],
  [
   "Innovation Mechanism And Enabler",
   "Industrial Mobilization Measures",
   "Dual-Use Manufacturing Conversion"
  ],
  [
   "Innovation Mechanism And Enabler",
   "Industrial Mobilization Measures",
   "Component Stockpiling Programs"
  ],
  [
   "Innovation Mechanism And Enabler",
   "Data And AI-Enabled Targeting",
   "Automated Target Recognition Software"
  ],
  [
   "Innovation Mechanism And Enabler",
   "Data And AI-Enabled Targeting",
   "Drone Swarm Coordination Algorithms"
  ],
  [
   "Innovation Mechanism And Enabler",
   "Data And AI-Enabled Targeting",
   "Signals-Intelligence Fusion Tools"
  ],
  [
   "Innovation Mechanism And Enabler",
   "Data And AI-Enabled Targeting",
   "Machine-Vision Terminal Guidance"
  ],
  [
   "Speed Dynamics",
   "Acceleration Factors",
   "Direct Front-To-Factory Feedback Channels"
  ],
  [
   "Speed Dynamics",
   "Acceleration Factors",
   "Low-Cost Commercial Component Availability"
  ],
  [
   "Speed Dynamics",
   "Acceleration Factors",
   "Decentralized Unit-Level Modification Authority"
  ],
  [
   "Speed Dynamics",
   "Acceleration Factors",
   "Crowdfunded Bypass Of Formal Procurement"
  ],
  [
   "Speed Dynamics",
   "Bottleneck And Friction Factors",
   "Formal Defense-Order Bureaucratic Delays"
  ],
  [
   "Speed Dynamics",
   "Bottleneck And Friction Factors",
   "Military Acceptance Certification Backlogs"
  ],
  [
   "Speed Dynamics",
   "Bottleneck And Friction Factors",
   "Inter-Service Rivalry Over Unmanned Systems Control"
  ],
  [
   "Speed Dynamics",
   "Bottleneck And Friction Factors",
   "Corruption And Diverted Funding"
  ],
  [
   "Speed Dynamics",
   "Mixed Or Conditional Factors",
   "Centralization That Standardizes But Slows Adaptation"
  ],
  [
   "Speed Dynamics",
   "Mixed Or Conditional Factors",
   "Sanctions Raising Cost While Spurring Substitution"
  ],
  [
   "Speed Dynamics",
   "Mixed Or Conditional Factors",
   "Specialized Units Concentrating Expertise But Limiting Access"
  ],
  [
   "Speed Dynamics",
   "Mixed Or Conditional Factors",
   "Volunteer Network Reliance With Variable Reliability"
  ],
  [
   "Speed Dynamics",
   "Counter-Adaptation Lag",
   "Delayed Response To Ukrainian Counter-UAS Tactics"
  ],
  [
   "Speed Dynamics",
   "Counter-Adaptation Lag",
   "Frequency-Hopping Countermeasure Gaps"
  ],
  [
   "Speed Dynamics",
   "Counter-Adaptation Lag",
   "Slow Doctrine Updates Following Battlefield Losses"
  ],
  [
   "Speed Dynamics",
   "Counter-Adaptation Lag",
   "Persistent Single-Point-Of-Failure Component Shortages"
  ],
  [
   "Technology Domain",
   "Strike And Loitering Munition Drones",
   "FPV Kamikaze Drones"
  ],
  [
   "Technology Domain",
   "Strike And Loitering Munition Drones",
   "Long-Range Loitering Munitions"
  ],
  [
   "Technology Domain",
   "Strike And Loitering Munition Drones",
   "Fiber-Optic Guided Drones"
  ],
  [
   "Technology Domain",
   "Strike And Loitering Munition Drones",
   "Swarm-Capable Strike Systems"
  ],
  [
   "Technology Domain",
   "ISR And Reconnaissance Drones",
   "Fixed-Wing Surveillance UAVs"
  ],
  [
   "Technology Domain",
   "ISR And Reconnaissance Drones",
   "Quadcopter Spotting Drones"
  ],
  [
   "Technology Domain",
   "ISR And Reconnaissance Drones",
   "Signals-Collection UAVs"
  ],
  [
   "Technology Domain",
   "ISR And Reconnaissance Drones",
   "Target-Designation Relay Drones"
  ],
  [
   "Technology Domain",
   "Electronic Warfare Offensive And Jamming",
   "GPS And GNSS Jamming Systems"
  ],
  [
   "Technology Domain",
   "Electronic Warfare Offensive And Jamming",
   "Communications And Datalink Jammers"
  ],
  [
   "Technology Domain",
   "Electronic Warfare Offensive And Jamming",
   "Counter-Drone Frequency Disruption"
  ],
  [
   "Technology Domain",
   "Electronic Warfare Offensive And Jamming",
   "Decoy And Spoofing Emitters"
  ],
  [
   "Technology Domain",
   "Electronic Warfare Defensive And Protective",
   "Vehicle-Mounted Counter-FPV Systems"
  ],
  [
   "Technology Domain",
   "Electronic Warfare Defensive And Protective",
   "Convoy And Route Protection Jammers"
  ],
  [
   "Technology Domain",
   "Electronic Warfare Defensive And Protective",
   "Position-Location Masking Equipment"
  ],
  [
   "Technology Domain",
   "Electronic Warfare Defensive And Protective",
   "Anti-Drone Detection Sensors"
  ],
  [
   "Technology Domain",
   "Counter-UAS Kinetic Systems",
   "Interceptor Drone Defenses"
  ],
  [
   "Technology Domain",
   "Counter-UAS Kinetic Systems",
   "Point-Defense Anti-Drone Guns"
  ],
  [
   "Technology Domain",
   "Counter-UAS Kinetic Systems",
   "Net And Capture Interceptor Drones"
  ],
  [
   "Technology Domain",
   "Counter-UAS Kinetic Systems",
   "Layered Air-Defense Integration"
  ],
  [
   "Technology Domain",
   "Communications And Guidance Infrastructure",
   "Fiber-Optic Control Links"
  ],
  [
   "Technology Domain",
   "Communications And Guidance Infrastructure",
   "Encrypted Datalink Systems"
  ],
  [
   "Technology Domain",
   "Communications And Guidance Infrastructure",
   "Satellite-Relay Backup Links"
  ],
  [
   "Technology Domain",
   "Communications And Guidance Infrastructure",
   "Terminal Guidance Sensor Packages"
  ],
  [
   "Unmanned Intelligence Gathering Context",
   "Collection Mission Type",
   "Tactical Reconnaissance And Spotting"
  ],
  [
   "Unmanned Intelligence Gathering Context",
   "Collection Mission Type",
   "Persistent Area Surveillance"
  ],
  [
   "Unmanned Intelligence Gathering Context",
   "Collection Mission Type",
   "Signals And Electronic Order-Of-Battle Collection"
  ],
  [
   "Unmanned Intelligence Gathering Context",
   "Collection Mission Type",
   "Battle Damage Assessment And Post-Strike Imaging"
  ],
  [
   "Unmanned Intelligence Gathering Context",
   "Reconnaissance-Strike Integration",
   "Target Designation For Artillery And Air Strikes"
  ],
  [
   "Unmanned Intelligence Gathering Context",
   "Reconnaissance-Strike Integration",
   "Real-Time Sensor-To-Shooter Handoff"
  ],
  [
   "Unmanned Intelligence Gathering Context",
   "Reconnaissance-Strike Integration",
   "Drone-Directed Fire Adjustment"
  ],
  [
   "Unmanned Intelligence Gathering Context",
   "Reconnaissance-Strike Integration",
   "Targeting Of Enemy Drone Control And Communications Nodes"
  ],
  [
   "Unmanned Intelligence Gathering Context",
   "Intelligence Processing And Dissemination",
   "Video And Telemetry Feed Distribution"
  ],
  [
   "Unmanned Intelligence Gathering Context",
   "Intelligence Processing And Dissemination",
   "Geolocation And Imagery Analysis"
  ],
  [
   "Unmanned Intelligence Gathering Context",
   "Intelligence Processing And Dissemination",
   "AI-Assisted Target Detection From Collected Imagery"
  ],
  [
   "Unmanned Intelligence Gathering Context",
   "Intelligence Processing And Dissemination",
   "Cross-Unit Intelligence Sharing Networks"
  ],
  [
   "Unmanned Intelligence Gathering Context",
   "Counter-ISR And Concealment",
   "Enemy Drone Detection And Warning"
  ],
  [
   "Unmanned Intelligence Gathering Context",
   "Counter-ISR And Concealment",
   "Thermal And Visual Signature Masking"
  ],
  [
   "Unmanned Intelligence Gathering Context",
   "Counter-ISR And Concealment",
   "Deception And Decoy Employment"
  ],
  [
   "Unmanned Intelligence Gathering Context",
   "Counter-ISR And Concealment",
   "Denial Of Enemy Reconnaissance Drones"
  ],
  [
   "Unmanned Intelligence Gathering Context",
   "Intelligence Collection Constraints",
   "Sensor Range And Endurance Limits"
  ],
  [
   "Unmanned Intelligence Gathering Context",
   "Intelligence Collection Constraints",
   "Weather And Electronic Interference Degradation"
  ],
  [
   "Unmanned Intelligence Gathering Context",
   "Intelligence Collection Constraints",
   "Data Link And Satellite Dependency Risks"
  ],
  [
   "Unmanned Intelligence Gathering Context",
   "Intelligence Collection Constraints",
   "Analyst And Operator Capacity Shortfalls"
  ],
  [
   "Organizational And Command Level",
   "Tactical Unit Level",
   "Company And Battalion Drone Teams"
  ],
  [
   "Organizational And Command Level",
   "Tactical Unit Level",
   "Platoon-Level EW Detachments"
  ],
  [
   "Organizational And Command Level",
   "Tactical Unit Level",
   "Individual Soldier-Technicians"
  ],
  [
   "Organizational And Command Level",
   "Tactical Unit Level",
   "Local Repair And Assembly Points"
  ],
  [
   "Organizational And Command Level",
   "Operational Formation Level",
   "Brigade Unmanned Systems Companies"
  ],
  [
   "Organizational And Command Level",
   "Operational Formation Level",
   "Army-Level EW Battalions"
  ],
  [
   "Organizational And Command Level",
   "Operational Formation Level",
   "Cross-Brigade Coordination Cells"
  ],
  [
   "Organizational And Command Level",
   "Operational Formation Level",
   "Regional Logistics Hubs"
  ],
  [
   "Organizational And Command Level",
   "Strategic National Level",
   "Ministry Of Defense Procurement Directorates"
  ],
  [
   "Organizational And Command Level",
   "Strategic National Level",
   "National Industrial Mobilization Bodies"
  ],
  [
   "Organizational And Command Level",
   "Strategic National Level",
   "Presidential And Security Council Directives"
  ],
  [
   "Organizational And Command Level",
   "Strategic National Level",
   "National Training And Doctrine Centers"
  ],
  [
   "Organizational And Command Level",
   "International And Transnational Level",
   "Foreign State Technology Transfer"
  ],
  [
   "Organizational And Command Level",
   "International And Transnational Level",
   "Sanctions-Evasion Trade Networks"
  ],
  [
   "Organizational And Command Level",
   "International And Transnational Level",
   "Cross-Border Component Supply Chains"
  ],
  [
   "Organizational And Command Level",
   "International And Transnational Level",
   "Allied-State Joint Production Arrangements"
  ],
  [
   "Temporal Phase",
   "2023 Improvisation Phase",
   "Ad Hoc Volunteer Drone Funding"
  ],
  [
   "Temporal Phase",
   "2023 Improvisation Phase",
   "Early FPV Adoption From Ukrainian Example"
  ],
  [
   "Temporal Phase",
   "2023 Improvisation Phase",
   "Initial Electronic Warfare Unit Reorganization"
  ],
  [
   "Temporal Phase",
   "2023 Improvisation Phase",
   "Reactive Front-Line Workarounds"
  ],
  [
   "Temporal Phase",
   "2024 Consolidation Phase",
   "Formation Of Centralized Unmanned Systems Commands"
  ],
  [
   "Temporal Phase",
   "2024 Consolidation Phase",
   "Scaling Of Domestic FPV Production"
  ],
  [
   "Temporal Phase",
   "2024 Consolidation Phase",
   "Standardization Of Training Programs"
  ],
  [
   "Temporal Phase",
   "2024 Consolidation Phase",
   "Expansion Of Sanctions-Evasion Supply Chains"
  ],
  [
   "Temporal Phase",
   "2025 Institutionalization Phase",
   "Formal Doctrine Integration Of Drones And EW"
  ],
  [
   "Temporal Phase",
   "2025 Institutionalization Phase",
   "Dedicated Budget Lines And Procurement Reform"
  ],
  [
   "Temporal Phase",
   "2025 Institutionalization Phase",
   "Maturing Fiber-Optic Counter-Jamming Drones"
  ],
  [
   "Temporal Phase",
   "2025 Institutionalization Phase",
   "Established Feedback-To-Industry Pipelines"
  ],
  [
   "Temporal Phase",
   "2026 Maturation And Plateau Phase",
   "Persistent Bottlenecks Despite Institutionalization"
  ],
  [
   "Temporal Phase",
   "2026 Maturation And Plateau Phase",
   "Counter-Adaptation By Opposing Force"
  ],
  [
   "Temporal Phase",
   "2026 Maturation And Plateau Phase",
   "Diminishing Marginal Returns On Scaling"
  ],
  [
   "Temporal Phase",
   "2026 Maturation And Plateau Phase",
   "Emerging Next-Generation AI-Guided Systems"
  ],
  [
   "Combatant Lessons Learned And Applied (Russia And Ukraine)",
   "Tactical Lessons Applied In Combat",
   "Employment And Tactics Adjustments After Losses"
  ],
  [
   "Combatant Lessons Learned And Applied (Russia And Ukraine)",
   "Tactical Lessons Applied In Combat",
   "Equipment Protection And Survivability Fixes"
  ],
  [
   "Combatant Lessons Learned And Applied (Russia And Ukraine)",
   "Tactical Lessons Applied In Combat",
   "Crew Procedures And Drill Changes"
  ],
  [
   "Combatant Lessons Learned And Applied (Russia And Ukraine)",
   "Tactical Lessons Applied In Combat",
   "Counter-Drone Behavior And Signature Discipline"
  ],
  [
   "Combatant Lessons Learned And Applied (Russia And Ukraine)",
   "Operational Lessons Applied In Formations",
   "Reorganization Of Drone And EW Units Based On Combat Results"
  ],
  [
   "Combatant Lessons Learned And Applied (Russia And Ukraine)",
   "Operational Lessons Applied In Formations",
   "Integration Of Drones And EW Into Combined-Arms Planning"
  ],
  [
   "Combatant Lessons Learned And Applied (Russia And Ukraine)",
   "Operational Lessons Applied In Formations",
   "Reconnaissance-Strike Cycle Compression"
  ],
  [
   "Combatant Lessons Learned And Applied (Russia And Ukraine)",
   "Operational Lessons Applied In Formations",
   "Logistics And Route Protection Adaptation"
  ],
  [
   "Combatant Lessons Learned And Applied (Russia And Ukraine)",
   "Strategic And Institutional Lessons Applied",
   "Doctrine Revision From Battlefield Experience"
  ],
  [
   "Combatant Lessons Learned And Applied (Russia And Ukraine)",
   "Strategic And Institutional Lessons Applied",
   "Force Structure And Command Creation Driven By Combat Evidence"
  ],
  [
   "Combatant Lessons Learned And Applied (Russia And Ukraine)",
   "Strategic And Institutional Lessons Applied",
   "Procurement And Requirements Reform Driven By Frontline Feedback"
  ],
  [
   "Combatant Lessons Learned And Applied (Russia And Ukraine)",
   "Strategic And Institutional Lessons Applied",
   "Training System Redesign From Combat Experience"
  ],
  [
   "Combatant Lessons Learned And Applied (Russia And Ukraine)",
   "Lesson Flow Across Levels",
   "Bottom-Up Escalation Of Tactical Lessons"
  ],
  [
   "Combatant Lessons Learned And Applied (Russia And Ukraine)",
   "Lesson Flow Across Levels",
   "Top-Down Dissemination Of Doctrinal Updates"
  ],
  [
   "Combatant Lessons Learned And Applied (Russia And Ukraine)",
   "Lesson Flow Across Levels",
   "Lateral Peer Exchange Between Units"
  ],
  [
   "Combatant Lessons Learned And Applied (Russia And Ukraine)",
   "Lesson Flow Across Levels",
   "Foreign Or Allied Experience Adopted By Combatants"
  ],
  [
   "Combatant Lessons Learned And Applied (Russia And Ukraine)",
   "Lesson Triggers And Evidence",
   "Battlefield Losses And Failure Analysis"
  ],
  [
   "Combatant Lessons Learned And Applied (Russia And Ukraine)",
   "Lesson Triggers And Evidence",
   "Enemy Countermeasure Or Adaptation"
  ],
  [
   "Combatant Lessons Learned And Applied (Russia And Ukraine)",
   "Lesson Triggers And Evidence",
   "Captured Or Destroyed Equipment Examination"
  ],
  [
   "Combatant Lessons Learned And Applied (Russia And Ukraine)",
   "Lesson Triggers And Evidence",
   "Newly Appeared Threat Or Capability"
  ],
  [
   "Combatant Lessons Learned And Applied (Russia And Ukraine)",
   "Lesson Application Status",
   "Applied And Confirmed By Combat Results"
  ],
  [
   "Combatant Lessons Learned And Applied (Russia And Ukraine)",
   "Lesson Application Status",
   "Adopted But Not Yet Validated"
  ],
  [
   "Combatant Lessons Learned And Applied (Russia And Ukraine)",
   "Lesson Application Status",
   "Identified But Not Yet Applied"
  ],
  [
   "Combatant Lessons Learned And Applied (Russia And Ukraine)",
   "Lesson Application Status",
   "Reverted Or Failed Adaptation"
  ],
  [
   "Lesson Holder And Vantage Point",
   "Combatant Participant",
   "Russian Armed Forces And Affiliated Units"
  ],
  [
   "Lesson Holder And Vantage Point",
   "Combatant Participant",
   "Ukrainian Armed Forces And Affiliated Units"
  ],
  [
   "Lesson Holder And Vantage Point",
   "Combatant Participant",
   "Mutual Adaptation Between Russian And Ukrainian Forces"
  ],
  [
   "Lesson Holder And Vantage Point",
   "Non-Participant Observer",
   "NATO Member Militaries And Ministries"
  ],
  [
   "Lesson Holder And Vantage Point",
   "Non-Participant Observer",
   "NATO And Allied Institutional Bodies"
  ],
  [
   "Lesson Holder And Vantage Point",
   "Non-Participant Observer",
   "Non-NATO Foreign Observers"
  ],
  [
   "Lesson Holder And Vantage Point",
   "Non-Participant Observer",
   "Independent Analysts And Industry"
  ],
  [
   "NATO Observer Lessons Learned",
   "Tactical And Employment Lessons",
   "Decentralized Pilot Authority At The Unit Level"
  ],
  [
   "NATO Observer Lessons Learned",
   "Tactical And Employment Lessons",
   "FPV Mass And Attrition Economics"
  ],
  [
   "NATO Observer Lessons Learned",
   "Tactical And Employment Lessons",
   "Signature Discipline Against Pervasive ISR"
  ],
  [
   "NATO Observer Lessons Learned",
   "Tactical And Employment Lessons",
   "Combined-Arms Integration Of Drones And Fires"
  ],
  [
   "NATO Observer Lessons Learned",
   "Technological And Capability Lessons",
   "GNSS-Independent Navigation As A Baseline Requirement"
  ],
  [
   "NATO Observer Lessons Learned",
   "Technological And Capability Lessons",
   "Fiber-Optic Control As A Jam-Resistant Fallback"
  ],
  [
   "NATO Observer Lessons Learned",
   "Technological And Capability Lessons",
   "Layered Counter-UAS At Every Echelon"
  ],
  [
   "NATO Observer Lessons Learned",
   "Technological And Capability Lessons",
   "Mass-Produced Low-Cost Systems Over Scarce High-End Platforms"
  ],
  [
   "NATO Observer Lessons Learned",
   "Industrial And Procurement Lessons",
   "Rapid-Iteration Acquisition Pathways"
  ],
  [
   "NATO Observer Lessons Learned",
   "Industrial And Procurement Lessons",
   "Surge Production And Warm Industrial Base Planning"
  ],
  [
   "NATO Observer Lessons Learned",
   "Industrial And Procurement Lessons",
   "Component Supply Chain De-Risking"
  ],
  [
   "NATO Observer Lessons Learned",
   "Industrial And Procurement Lessons",
   "Public-Private Co-Development Arrangements"
  ],
  [
   "NATO Observer Lessons Learned",
   "Doctrinal And Organizational Lessons",
   "Dedicated Unmanned Systems Commands"
  ],
  [
   "NATO Observer Lessons Learned",
   "Doctrinal And Organizational Lessons",
   "Electromagnetic Spectrum Management As A Core Discipline"
  ],
  [
   "NATO Observer Lessons Learned",
   "Doctrinal And Organizational Lessons",
   "Drone And EW Integration Into Combined Arms Doctrine"
  ],
  [
   "NATO Observer Lessons Learned",
   "Doctrinal And Organizational Lessons",
   "Training Pipelines Redesigned For Mass Pilot Throughput"
  ],
  [
   "NATO Observer Lessons Learned",
   "Strategic And Cautionary Lessons",
   "Legal And Ethical Limits On Crowdfunded Lethal Aid"
  ],
  [
   "NATO Observer Lessons Learned",
   "Strategic And Cautionary Lessons",
   "Overreliance Risk In Volunteer-Based Logistics"
  ],
  [
   "NATO Observer Lessons Learned",
   "Strategic And Cautionary Lessons",
   "Alliance Interoperability And Standardization Costs"
  ],
  [
   "NATO Observer Lessons Learned",
   "Strategic And Cautionary Lessons",
   "Escalation And Signaling Risks Of EW Employment"
  ],
  [
   "NATO Observer Lessons Learned",
   "Intelligence And ISR Lessons",
   "Persistent Drone ISR As A Baseline Echelon Capability"
  ],
  [
   "NATO Observer Lessons Learned",
   "Intelligence And ISR Lessons",
   "Sensor-To-Shooter Latency Reduction"
  ],
  [
   "NATO Observer Lessons Learned",
   "Intelligence And ISR Lessons",
   "Survivable Reconnaissance Under Jamming And Counter-UAS"
  ],
  [
   "NATO Observer Lessons Learned",
   "Intelligence And ISR Lessons",
   "Intelligence Fusion Across Echelons And Allies"
  ],
  [
   "NATO Observer Lessons Learned",
   "Observation And Analysis Methods",
   "Open-Source And Footage Analysis"
  ],
  [
   "NATO Observer Lessons Learned",
   "Observation And Analysis Methods",
   "Liaison And Observer Exchanges With Ukraine"
  ],
  [
   "NATO Observer Lessons Learned",
   "Observation And Analysis Methods",
   "Wargaming And Exercise Experimentation"
  ],
  [
   "NATO Observer Lessons Learned",
   "Observation And Analysis Methods",
   "Captured Equipment And Debris Assessment By Western Labs"
  ],
  [
   "NATO Observer Lessons Learned",
   "Transferability And Applicability Limits",
   "Scenario Differences Between Ukraine And NATO Theaters"
  ],
  [
   "NATO Observer Lessons Learned",
   "Transferability And Applicability Limits",
   "Risk Of Overfitting To The Current Conflict"
  ],
  [
   "NATO Observer Lessons Learned",
   "Transferability And Applicability Limits",
   "Adversary Adaptation After Lessons Become Public"
  ],
  [
   "NATO Observer Lessons Learned",
   "Transferability And Applicability Limits",
   "Industrial And Resource Scale Differences"
  ],
  [
   "NATO Observer Lessons Learned",
   "Adoption Into National Forces",
   "Doctrine And Concept Updates In National Forces"
  ],
  [
   "NATO Observer Lessons Learned",
   "Adoption Into National Forces",
   "Rapid Acquisition Pilots And Procurement Changes"
  ],
  [
   "NATO Observer Lessons Learned",
   "Adoption Into National Forces",
   "Training And Exercise Redesign"
  ],
  [
   "NATO Observer Lessons Learned",
   "Adoption Into National Forces",
   "Alliance-Level Standards And Capability Targets"
  ]
 ],
 "chunks": [
  {
   "id": "694",
   "source": "Telegram · Репортёр Руденко V · 2026-01-27",
   "text_en": "**Crews of strike FPV drone operators from the unmanned systems forces of the special-purpose formation of the \"Center\" Group of Forces have taken control of the Ukrainian Armed Forces' logistics routes, destroying equipment and enemy personnel near Krasnoarmeysk**",
   "text_orig": "**Расчёты операторов ударных FPV-дронов войск беспилотных систем соединения специального назначения ГрВ «Центр», взяли под свой контроль логистические маршруты ВСУ уничтожив технику и личный состав противника под Красноармейском**\n\n[**Подписывайтесь на мой канал в MAX!**](https://max.ru/RtrDonetsk)",
   "translated": true,
   "key": [
    {
     "h": "Technology Domain",
     "l2": "Strike And Loitering Munition Drones",
     "l3": "FPV Kamikaze Drones",
     "conf": 80,
     "why": "Strike FPV drone crews destroyed enemy assets."
    },
    {
     "h": "Ecosystem Actor Type",
     "l2": "Ministry Of Defense And State Military Structures",
     "l3": "Unmanned Systems Forces (Rubicon-Type Centers)",
     "conf": 55,
     "why": "Operators belong to an Unmanned Systems Forces unit."
    }
   ],
   "key_why": "FPV crews of unmanned systems forces interdicting logistic routes."
  },
  {
   "id": "1",
   "source": "Bluesky · Anton Gerashchenko · 2026-01-28",
   "text_en": "According to the GFP, Ukraine received high marks for the army strength, personnel and reserves strength, the availability of equipment, and the active use of unmanned systems. Other advantages include a developed railway network, coal production, and significant defense funding.",
   "text_orig": "According to the GFP, Ukraine received high marks for the army strength, personnel and reserves strength, the availability of equipment, and the active use of unmanned systems. Other advantages include a developed railway network, coal production, and significant defense funding.",
   "translated": true,
   "key": [],
   "key_why": "Generic strength ranking mentioning unmanned systems only in passing; no substantive innovation content."
  },
  {
   "id": "927",
   "source": "Telegram · СОЛОВЬЁВ · 2026-01-27",
   "text_en": "📸 Become a legend! Are you between 18 and 35? This is your chance. The elite unit — the \"Rubicon-BARS\" UAV Center — is selecting and training those who want to become drone operators. If everything checks out, there is an exclusive 6–12 month contract and a signing bonus of a million rubles. Combat veteran status, benefits and other bonuses go without saying. The number of candidates is limited! Hurry to submit an application via a special Telegram bot or by phone. [contact details omitted]",
   "text_orig": "📸 Стань легендой! Тебе от 18 до 35 лет? Это твой шанс. Элитное подразделение — Центр БПЛА «Рубикон-БАРС» — проводит отбор и обучение тех, кто хочет стать оператором дронов. Если всё ок, то эксклюзивный контракт 6-12 месяцев и подписной бонус в миллион рублей. Статус ветерана боевых действий, льготы и другие бонусы — само собой. Количество кандидатов ограничено! Успей оставить заявку в специальном Telegram-боте: @bplapilotbot или звони по телефону: +74951505757\n\n🇷🇺 [Подпишись на Соловьёва!](https://max.ru/SolovievLive)",
   "translated": true,
   "key": [
    {
     "h": "Ecosystem Actor Type",
     "l2": "Ministry Of Defense And State Military Structures",
     "l3": "Unmanned Systems Forces (Rubicon-Type Centers)",
     "conf": 80,
     "why": "The Rubicon-BARS UAV center is presented as an elite unit recruiting and training drone operators."
    },
    {
     "h": "Innovation Pipeline Stage",
     "l2": "Fielding And Distribution",
     "l3": "Training And Pilot Certification",
     "conf": 60,
     "why": "Selection and training of drone operators corresponds to pilot training."
    }
   ],
   "key_why": "Recruitment advert for drone operators of the Rubicon-BARS center."
  },
  {
   "id": "697",
   "source": "Telegram · Репортёр Руденко V · 2026-01-30",
   "text_en": "**Crews of T-72B3M tanks of the 15th Separate Guards Motor Rifle Aleksandriya Brigade, 2nd Combined Arms Army, \"Center\" Group of Forces, destroyed a camouflaged strongpoint of Ukrainian formations set up in a tree line**\n\nThe exact coordinates of the target were obtained from ground reconnaissance units and confirmed by operators of the unmanned systems forces.\n\nFire adjustment and strike assessment were carried out in real time by UAV operators. According to objective monitoring data, the strongpoint was completely destroyed together with the enemy personnel inside.\n\nTank commander Andrey Dremin spoke about the combat missions.",
   "text_orig": "**Экипажи танков Т-72Б3М 15-й отдельной гвардейской мотострелковой Александрийской бригады 2-й общевойсковой армии группировки войск «Центр»  уничтожили замаскированный опорный пункт формирований ВСУ, оборудованный в лесополосе**\n\n Точные координаты цели были получены от подразделений наземной разведки и подтверждены операторами войск беспилотных систем\n\n Корректировка огня и контроль поражения цели осуществлялись в режиме реального времени операторами БПЛА. По данным объективного контроля, опорный пункт был полностью уничтожен вместе с находившейся в нём живой силой противника.\n\nО выполнении боевых задач рассказал командир танка, Андрей Дремин.\n\n[**Подписывайтесь на мой канал в MAX!**](https://max.ru/RtrDonetsk)",
   "translated": true,
   "key": [
    {
     "h": "Unmanned Intelligence Gathering Context",
     "l2": "Reconnaissance-Strike Integration",
     "l3": "Drone-Directed Fire Adjustment",
     "conf": 90,
     "why": "UAV operators adjusted tank fire and assessed the strike in real time."
    }
   ],
   "key_why": "Tank crews destroyed a strongpoint using drone-provided fire adjustment."
  },
  {
   "id": "676",
   "source": "Telegram · Zлой Пруф️ · 2026-02-15",
   "text_en": "**North Korean troops are mastering combat drones and electronic warfare in the war against Ukraine, says Ukrainian military intelligence (HUR)**\n\n\"We see clearly: according to Ukrainian military intelligence, North Korean servicemen operate and use combat drones. And not only drones.\n\nImportantly, they already know how to use electronic reconnaissance and electronic warfare equipment,\" said HUR representative A. Chernyak.\n\nHe added that at present only three armies in the world have real experience of conducting modern unmanned technological warfare: the Ukrainian Armed Forces, the Russian army, and the North Korean army.",
   "text_orig": "**Военные КНДР осваивают боевые дроны и радиоэлектронную борьбу в войне против Украине, - ГУР**\n**\n**«Мы четко видим: по информации военной разведки Украины, военнослужащие Северной Кореи управляют, используют боевые дроны. И не только дроны.\n\nВажно, что они уже умеют пользоваться средствами радиоэлектронной разведки и радиоэлектронной борьбы», - заявил представитель ГУР Украины А. Черняк.\n\nОн добавил, что в настоящее время только три армии в мире обладают реальным опытом ведения современной беспилотной технологической войны - ВСУ, армия России, а также армия Северной Кореи.\n\n[Zлой Пруф Телеграм](https://t.me/proofzzz)\n[Zлой Пруф в МАХ](https://max.ru/public217238185)",
   "translated": true,
   "key": [],
   "key_why": "Ukrainian intelligence statement about North Korean troops using drones and EW; not tied to the taxonomy's Russian innovation or NATO lessons."
  },
  {
   "id": "684",
   "source": "Telegram · Сводки и Аналитика СВО (Резерв) · 2026-02-17",
   "text_en": "❗**Ukrainians with combat experience will train German soldiers, Der Spiegel reports.**\n\nThe Ukrainian soldiers are supposed to \"improve their skills\" in operating drones and teach them to use mobile applications for planning combat operations, the article says. How exactly the training will take place is not yet clear. Ukrainian soldiers could arrive in Germany in the near future to work with combat infantry units of the ground forces, the article notes.",
   "text_orig": "❗**Украинцы с боевым опытом будут обучать немецких военных, пишет Der Spiegel.**\n\nВэсэушники должны будут «повысить их навыки» управления дронами и научить использовать мобильные приложения для планирования боевых действий, говорится в статье. Как именно пройдёт обучение, пока неясно. Украинские солдаты могут прибыть в Германию уже в ближайшее время для работы с боевыми подразделениями пехоты сухопутных войск, отмечается в материале.\n\n📱 [**СВОДКИ-ПОДПИСАТЬСЯ**](https://t.me/rezervsvo)",
   "translated": true,
   "key": [
    {
     "h": "NATO Observer Lessons Learned",
     "l2": "Observation And Analysis Methods",
     "l3": "Liaison And Observer Exchanges With Ukraine",
     "conf": 80,
     "why": "Ukrainian combat-experienced soldiers will train German troops in drone use."
    },
    {
     "h": "Lesson Holder And Vantage Point",
     "l2": "Non-Participant Observer",
     "l3": "NATO Member Militaries And Ministries",
     "conf": 70,
     "why": "German military is the recipient of Ukrainian experience."
    }
   ],
   "key_why": "Report of Ukrainian veterans training Germany's army on drones."
  },
  {
   "id": "904",
   "source": "Telegram · Кирилл Фёдоров / Война История Оружие · 2026-02-16",
   "text_en": "💥🇷🇺 The work of Russian TOS-1A \"Solntsepyok\" systems, and of FPV drones with thermobaric charges, against the temporary deployment points of Ukrainian soldiers",
   "text_orig": "💥🇷🇺 Работа русских ТОС-1А \"Солнцепёк\", а также FPV-дронов с термобарическими зарядами по ПВД ВСУшников \n\n@The_Wrong_Side\n\n**У кого не грузит — **[**ПОДПИШИСЬ на MAX**](https://max.ru/warhistoryalconafter)\n\n[Подписаться на канал](https://t.me/warhistoryalconafter)",
   "translated": true,
   "key": [
    {
     "h": "Technology Domain",
     "l2": "Strike And Loitering Munition Drones",
     "l3": "FPV Kamikaze Drones",
     "conf": 65,
     "why": "FPV drones with thermobaric charges used against positions."
    }
   ],
   "key_why": "Labelled on drone/EW content only."
  },
  {
   "id": "678",
   "source": "Telegram · Два майора · 2026-02-15",
   "text_en": "**Sochi, Krasnodar Krai.** Overnight our forces repelled a massed enemy attack.\n\nIn the period from 20:00 to 23:00 Moscow time alone, **55 Ukrainian fixed-wing-type UAVs were destroyed**:\n▪️ **29** UAVs over the Sea of Azov,\n▪️ **23** UAVs over the territory of Krasnodar Krai,\n▪️ **3** UAVs over the Black Sea.\n\nSirens sounded along the whole coast.\n\n**In the settlement of Volna in Temryuk District, a fuel tank caught fire from falling UAV debris.** 67 people and 20 vehicles, including staff of the Russian Emergencies Ministry for Krasnodar Krai, were deployed to put out the fire.",
   "text_orig": "**Сочи, Краснодарский край.** Ночью наши отражали массированный налёт противника. \n\n Только в период с 20.00 мск до 23.00 мск  **уничтожены 55 украинских БПЛА**  самолетного типа:\n▪️ **29** БПЛА – над акваторией Азовского моря,\n▪️ **23** БПЛА – над территорией Краснодарского края,\n▪️ **3** БПЛА – над акваторией Черного моря.\n\nСирены ревели по всему побережью.\n\n**В пос. Волна Темрюкского района из-за падения обломков БПЛА загорелся резервуар с нефтепродуктами**.   К ликвидации пожара привлечены 67 человек, 20 единиц техники, в том числе сотрудники МЧС России по Краснодарскому краю.\n\n[Два майора](https://t.me/dva_majors)** **✨ [Два майора в МАХ](https://max.ru/dva_majors)",
   "translated": true,
   "key": [],
   "key_why": "Air defense tally of downed Ukrainian drones; no innovation content."
  },
  {
   "id": "188",
   "source": "News archive · RT на русском (russian.rt.com) · 2026-02-27",
   "text_en": "A soldier with the call sign Smolensk described how he lured Ukrainian forces with captured Starlink\n\n(Source: RT in Russian, 27.02.2026)\n\nRussian army soldiers placed captured Starlink antennas at non-existent positions on the front line in the Kharkiv region, which Ukrainian troops struck without result.\n\nThis was stated to RIA Novosti by a scout with the call sign Smolensk.\n\n\"We used captured Starlink equipment found at occupied Ukrainian Armed Forces positions, and we also printed the housings ourselves on 3D printers,\" the soldier said.\n\nBecause of this move by the Russian Armed Forces, Ukrainian forces were forced to expend shells and UAVs.\n\nEarlier Zelensky said that Ukrainian units were experiencing problems with the operation of Starlink terminals.\n\nThe head of the Russian army's main communications directorate, Valery Tishkov, said that Russian forces had used Starlink in the SVO zone (the \"special military operation\" zone) to mislead Ukrainian forces.",
   "text_orig": "Боец Смоленск рассказал, как заманивал ВСУ трофейными Starlink\n\n\n\n\n\n\n\nБоец Смоленск рассказал, как заманивал ВСУ трофейными\n\n**Starlink**\n\n|  |\n| --- |\n| **Источник: RT на русском (russian.rt.com)   Дата выпуска: 27.02.2026 05:18   Заглавие:   Боец Смоленск рассказал, как заманивал ВСУ трофейными  **Starlink**** |\n\n\nБойцы армии России располагали трофейные антенны\n\n**Starlink**\n\nна несуществующих позициях на линии фронта в Харьковской области, по которым украинские войска наносили безрезультатные удары.\n\nРИА Новости\n\nОб этом\nРИА Новости\nзаявил разведчик с позывным Смоленск.\n\n\"Мы использовали трофейное оборудование\n\n**Starlink**\n\n, найденное на занятых позициях ВСУ, а также сами печатали корпуса на 3D-принтерах\", - рассказал боец.\n\nИз-за данного хода ВС России ВСУ были вынуждены расходовать снаряды и БПЛА.\n\nРанее Зеленский заявил, что украинские подразделения сталкиваются с проблемами в работе терминалов\n\n**Starlink**\n\n.\n\nНачальник главного управления связи российской армии Валерий Тишков сказал, что ВС России использовали\n\n**Starlink**\n\nв зоне\n\n**СВО**\n\nдля введения ВСУ в заблуждение.",
   "translated": true,
   "key": [
    {
     "h": "Unmanned Intelligence Gathering Context",
     "l2": "Counter-ISR And Concealment",
     "l3": "Deception And Decoy Employment",
     "conf": 50,
     "why": "Captured Starlink antennas placed at non-existent positions to draw Ukrainian strikes."
    },
    {
     "h": "Innovation Mechanism And Enabler",
     "l2": "Reverse Engineering And Adaptation",
     "l3": "Captured NATO And Western Equipment Exploitation",
     "conf": 45,
     "why": "Captured Western Starlink gear reused as decoys."
    },
    {
     "h": "Innovation Pipeline Stage",
     "l2": "Prototyping And Rapid Modification",
     "l3": "3D-Printed Component Iteration",
     "conf": 50,
     "why": "Soldiers 3D-printed housings for decoy antennas."
    }
   ],
   "key_why": "Unit-level decoy deception using captured and 3D-printed Starlink antennas."
  },
  {
   "id": "679",
   "source": "Telegram · Два майора · 2026-02-17",
   "text_en": "**Konstantinovka direction**\n\nCombat work of UAV operators in the vicinity of **Konstantinovka.**\n\nThe enemy increasingly uses **ground robotic complexes (NRTK)** to supply forward positions, trying to reduce personnel losses when delivering equipment and ammunition. This video records the destruction of several such complexes carrying **heavy UAVs** 01:00.\n\n✨ Timely detection of targets disrupted the delivery of the cargo to the enemy's positions. What was meant to work against our units that night never reached its destination.\n\nAfter losing the NRTK, the enemy sent a reconnaissance quadcopter to assess the situation. The attempt ended in the **loss of that drone as well** 01:50.\n\n⭐️ During the same night the operators also engaged enemy vehicles and several armored vehicles.\n\n✨⭐️ It is worth noting separately: the enemy actively uses such robotic platforms together with stable satellite internet channels (Starlink), which makes it possible to control equipment remotely and out of line of sight. This clearly shows how critical the issue of stable communications and **our own solutions** for remote control of supply equipment at the front is becoming.",
   "text_orig": "**Константиновское направление**\n\nБоевая работа операторов БПЛА в окрестностях **н.п. Константиновка.**\n\nПротивник всё чаще использует **НРТК** для снабжения передовых позиций, стараясь снизить потери личного состава при подвозе техники и боекомплекта. В данном ролике зафиксировано уничтожение нескольких таких комплексов, перевозивших **тяжёлые БПЛА** 01:00.\n\n✨ Своевременное выявление целей сорвало доставку груза к позициям противника. То, что должно было работать по нашим подразделениям этой ночью, до места назначения не дошло.\n\nПосле потери НРТК противник направил разведывательный квадрокоптер для оценки обстановки. Попытка закончилась **потерей и этого дрона** 01:50.\n\n⭐️ В течение той же ночи операторы также отработали по автомобильной технике противника и нескольким единицам бронемашин.\n\n✨⭐️ Отдельно стоит отметить: подобные роботизированные платформы противник активно применяет в связке со стабильными каналами связи спутникового интернета (Starlink), что позволяет управлять техникой на удалении и вне прямой видимости. Это наглядно показывает, насколько критичным становится вопрос устойчивой связи и **собственных решений** для дистанционного управления техникой снабжения на переднем крае.\n\n[Два майора](https://t.me/dva_majors)** ****✨**** **[Два майора в МАХ](https://max.ru/dva_majors)",
   "translated": true,
   "key": [
    {
     "h": "Combatant Lessons Learned And Applied (Russia And Ukraine)",
     "l2": "Lesson Triggers And Evidence",
     "l3": "Newly Appeared Threat Or Capability",
     "conf": 50,
     "why": "Enemy ground robotic supply platforms with Starlink are noted as a new threat and a call for own solutions."
    },
    {
     "h": "Lesson Holder And Vantage Point",
     "l2": "Combatant Participant",
     "l3": "Russian Armed Forces And Affiliated Units",
     "conf": 50,
     "why": "Russian side draws the implication that it needs its own robust remote-control solutions."
    },
    {
     "h": "Technology Domain",
     "l2": "Communications And Guidance Infrastructure",
     "l3": "Satellite-Relay Backup Links",
     "conf": 50,
     "why": "Starlink satellite links are used to control robotic platforms beyond line of sight."
    }
   ],
   "key_why": "Frontline report on destroying enemy ground robots carrying heavy drones, with a remark on the need for own comms solutions."
  },
  {
   "id": "685",
   "source": "Telegram · Сводки и Аналитика СВО (Резерв) · 2026-02-15",
   "text_en": "❗ According to Ukraine's military intelligence (GUR), North Korean armed forces remain involved in joint operations with Russian units. They are reported to be absorbing combat experience with an emphasis on the use of unmanned systems, as well as electronic reconnaissance and electronic warfare technologies.",
   "text_orig": "❗**По данным ГУР*, ВС КНДР по-прежнему задействованы в совместных операциях с российскими подразделениями. Сообщается, что они осваивают опыт ведения боевых действий с акцентом на использование беспилотников, а также технологии радиоэлектронной разведки и борьбы. **\n\n__*— террористическая организация __**\n**\n📱 [**СВОДКИ-ПОДПИСАТЬСЯ**](https://t.me/rezervsvo)",
   "translated": true,
   "key": [
    {
     "h": "Combatant Lessons Learned And Applied (Russia And Ukraine)",
     "l2": "Lesson Flow Across Levels",
     "l3": "Foreign Or Allied Experience Adopted By Combatants",
     "conf": 45,
     "why": "DPRK forces learn drone and EW combat experience in joint operations with Russian units."
    },
    {
     "h": "Lesson Holder And Vantage Point",
     "l2": "Combatant Participant",
     "l3": "Russian Armed Forces And Affiliated Units",
     "conf": 40,
     "why": "DPRK troops operate alongside Russian units."
    }
   ],
   "key_why": "Short note on North Korean troops learning drone and EW practice with Russian units."
  },
  {
   "id": "700",
   "source": "Telegram · Шейх Тамир · 2026-02-16",
   "text_en": "❗️ US and Dutch veterans flying F-16s have begun shooting down Russian missiles and UAVs — Intelligence Online\n\nA secret international F-16 squadron has been set up within Ukraine's air defence to strengthen the protection of Kyiv and the surrounding region.",
   "text_orig": "❗️Ветераны США и Нидерландов на F-16 начали сбивать российские ракеты и БПЛА, — Intelligence Online\n\nВ ПВО Украины создана секретная международная эскадрилья F-16 для усиления защиты Киева и области.\n\nФиолетовые лучи 95 квпртала",
   "translated": true,
   "key": [],
   "key_why": "F-16 air defence news item; no drone/EW innovation content."
  },
  {
   "id": "688",
   "source": "Telegram · Военный Осведомитель · 2026-02-04",
   "text_en": "Citizens who have signed a contract to serve in the mobilisation manpower reserve are practising skills in countering a notional enemy's kamikaze drones in order to protect critical infrastructure facilities.\n\nThe training is taking place as part of special assemblies of mobile fire groups at one of the combined-arms training ranges of the Southern Military District.\n\nOn completion of the special assemblies, the citizens in the mobilisation manpower reserve will be distributed to critical infrastructure facilities in their own region of the Russian Federation. Reservists are not used to take part in the special military operation.",
   "text_orig": "Граждане, заключившие контракт о пребывании в мобилизационном людском резерве, отрабатывают навыки по противодействию дронам камикадзе условного противника для защиты объектов критической инфраструктуры. \n \nЗанятия проходят в рамках специальных сборов мобильных огневых групп на одном из общевойсковых полигонов Южного военного округа.\n\nПо завершении специальных сборов граждане, пребывающие в мобилизационном людском резерве, будут распределены по объектам критической инфраструктуры на территории своего субъекта Российской Федерации. Резервисты не привлекаются для участия в СВО.\n\n[**Военный Осведомитель**](https://t.me/milinfolive)",
   "translated": true,
   "key": [
    {
     "h": "Innovation Pipeline Stage",
     "l2": "Fielding And Distribution",
     "l3": "Training And Pilot Certification",
     "conf": 55,
     "why": "Reservists are trained in counter-kamikaze-drone skills at a range."
    }
   ],
   "key_why": "Training of mobilization reservists against kamikaze drones to protect infrastructure."
  },
  {
   "id": "943",
   "source": "Telegram · Осведомитель · 2026-02-09",
   "text_en": "On the Zaporizhzhia sector of the front, operators of the “Vostok” Group of Forces have hit yet another formerly Australian M1A1 AIM Abrams belonging to a Ukrainian Armed Forces unit that had attempted to attack in the area of Zaliznychne.",
   "text_orig": "На Запорожском участке фронта операторами ГВ «Восток» поражен еще один некогда австралийский M1A1 AIM Abrams одной из частей ВСУ, которая предприняла попытку атаковать в районе Зализничного. \n\n[**Осведомитель**](https://t.me/infomil_live)",
   "translated": true,
   "key": [],
   "key_why": "No drone/EW/innovation content; news, politics or morale text."
  },
  {
   "id": "151",
   "source": "News archive · Politrussia.com · 2026-02-02",
   "text_en": "Won't help [Anna Sochina. STREAM]\n\nSource: Politrussia.com   Date: 02.02.2026   Title: Won't help [Anna Sochina. STREAM]\n\nAsk a question and make a donation [link]\nSupport the project: [link]\n\nAs part of the effort to counter Russian drones fitted with Starlink terminals, Ukraine has introduced a speed restriction of 75–90 km/h. This does create certain (temporary) difficulties for drones such as the Geran. However, Ukrainian forces themselves have been affected too. We discuss this and other topics live.\n\nAnna on Telegram: [link]\nAnnouncements of all videos and live streams: [link]",
   "text_orig": "Не поможет [Анна Сочина. СТРИМ]\n\n\n\n\n\n|  |\n| --- |\n| **Источник: Politrussia.com   Дата выпуска: 02.02.2026   Заглавие: Не поможет [Анна Сочина. СТРИМ]** |\n\n\nЗадай вопрос и сделай донат https://donatepay.ru/don/PolitRussia\n  \nПомочь проекту: https://politrussia.com/donate/\n  \n  \n\n\n\nВ рамках противодействия российским дронам с терминалами\n\n**Starlink**\n\nна\n\n**Украине**\n\nвведено скоростное ограничение до 75-90 км/ч.\nОпределенные (временные) трудности таким дронам как Герань это создает. Однако пострадали и сами ВСУшники. Эту и другие темы обсуждаем в прямом эфире.\n  \n  \nАнна в Телеграме: https://t.me/annasmaslom\n  \n  \nАнонсы всех видео и прямых эфиров: https://t.me/politrussiacom\n  \nГлавные новости дня: https://t.me/OstashkoNews",
   "translated": true,
   "key": [
    {
     "h": "Technology Domain",
     "l2": "Communications And Guidance Infrastructure",
     "l3": "Satellite-Relay Backup Links",
     "conf": 45,
     "why": "Starlink satellite links are used for controlling drones."
    },
    {
     "h": "Temporal Phase",
     "l2": "2026 Maturation And Plateau Phase",
     "l3": "Counter-Adaptation By Opposing Force",
     "conf": 50,
     "why": "Opposing side restricts or counters the other side's drone communication in 2026."
    }
   ],
   "key_why": "Short stream blurb on Ukrainian speed limits for Starlink terminals used on Russian drones."
  }
 ]
};
