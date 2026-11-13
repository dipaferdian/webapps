# Cybersecurity Fundamentals Roadmap

**Track:** Beginner → Upper Intermediate\
**Scope:** General cybersecurity foundations (not limited to web
security)\
**Purpose:** Build a broad understanding of how computer systems work,
how they communicate, how security controls are designed, and how
vulnerabilities are analyzed.

------------------------------------------------------------------------

## 1. Learning Goals

By completing this roadmap, you should be able to:

-   Explain how computers, operating systems, and programs work.
-   Understand network communication and common protocols.
-   Understand the role of cryptography in protecting information.
-   Apply fundamental security principles to real systems.
-   Understand identity, authentication, authorization, and access
    control.
-   Assess the security of systems, networks, applications, and
    infrastructure.
-   Understand basic security operations and incident response.
-   Analyze vulnerabilities, explain their root causes, and document
    findings.
-   Choose a cybersecurity specialization based on a strong common
    foundation.

This roadmap emphasizes **understanding mechanisms**, not memorizing
attack names or tools.

## 2. Roadmap Overview

  -----------------------------------------------------------------------
  Phase                   Domain                  Target Level
  ----------------------- ----------------------- -----------------------
  1                       Computer Systems        Beginner
                          Fundamentals            

  2                       Operating System        Beginner → Elementary
                          Fundamentals            

  3                       Programming & Scripting Beginner → Elementary
                          Fundamentals            

  4                       Networking Fundamentals Elementary

  5                       Protocols &             Elementary →
                          Communication Security  Intermediate

  6                       Cryptography            Intermediate
                          Fundamentals            

  7                       Security Principles &   Intermediate
                          Architecture            

  8                       Identity & Access       Intermediate
                          Management              

  9                       System, Application &   Intermediate → Upper
                          Network Security        Intermediate

  10                      Infrastructure,         Upper Intermediate
                          Virtualization & Cloud  
                          Security                

  11                      Security Operations &   Upper Intermediate
                          Incident Response       

  12                      Vulnerability Analysis  Upper Intermediate →
                          & Security Research     Research Foundation
  -----------------------------------------------------------------------

The phases are ordered to build dependencies, but some topics can be
revisited as your understanding grows.

------------------------------------------------------------------------

# 3. Detailed Curriculum

## Phase 1 --- Computer Systems Fundamentals

**Level:** Beginner

### Goal

Understand the basic components of a computer and how programs execute.

### Topics

-   [ ] Computer architecture
-   [ ] CPU and instruction execution
-   [ ] Registers
-   [ ] RAM and memory hierarchy
-   [ ] Storage and filesystems
-   [ ] Binary and hexadecimal representation
-   [ ] Bits, bytes, and bitwise operations
-   [ ] Endianness
-   [ ] Stack and heap
-   [ ] Processes and threads (introductory)
-   [ ] Virtual memory (introductory)
-   [ ] Kernel space and user space

### Practical Exercises

-   [ ] Convert between binary, decimal, and hexadecimal.
-   [ ] Inspect CPU, memory, and storage usage.
-   [ ] Observe running processes.
-   [ ] Compile and run a small program.
-   [ ] Use a debugger to step through program execution.
-   [ ] Observe basic stack and heap behavior.

### Suggested Tools

-   Linux terminal
-   `top` / `htop`
-   `free`
-   `lscpu`
-   `gdb` (introductory)

### Completion Criteria

-   [ ] Explain the roles of CPU, RAM, and storage.
-   [ ] Explain how a program is executed.
-   [ ] Explain the difference between stack and heap.
-   [ ] Explain the difference between kernel space and user space.
-   [ ] Understand basic binary and hexadecimal representations.

------------------------------------------------------------------------

## Phase 2 --- Operating System Fundamentals

**Level:** Beginner → Elementary

### Goal

Understand how an operating system manages resources, executes programs,
and enforces permissions.

### Topics

-   [ ] Operating system architecture
-   [ ] Linux architecture
-   [ ] Windows architecture fundamentals
-   [ ] Filesystem hierarchy
-   [ ] Users and groups
-   [ ] File permissions and ownership
-   [ ] Process management
-   [ ] Thread management
-   [ ] Process states
-   [ ] System calls
-   [ ] Memory management
-   [ ] Virtual memory
-   [ ] Kernel fundamentals
-   [ ] User space and kernel space
-   [ ] Privilege separation
-   [ ] Inter-process communication (IPC)
-   [ ] Services and daemons
-   [ ] Environment variables
-   [ ] Basic system logging

### Practical Exercises

-   [ ] Create users and groups.
-   [ ] Change file ownership and permissions.
-   [ ] Inspect processes and their relationships.
-   [ ] Identify which process listens on a port.
-   [ ] Observe system calls with `strace`.
-   [ ] Inspect Linux logs.
-   [ ] Explore Windows processes and services using built-in tools or
    Process Explorer.
-   [ ] Compare standard-user and administrator/root privileges.

### Suggested Tools

-   `ps`
-   `top` / `htop`
-   `ss`
-   `lsof`
-   `strace`
-   `journalctl`
-   Windows Task Manager
-   Process Explorer

### Completion Criteria

-   [ ] Explain how an OS manages processes and memory.
-   [ ] Explain users, groups, permissions, and privileges.
-   [ ] Explain what system calls do.
-   [ ] Explain process isolation at a basic level.
-   [ ] Identify basic OS misconfigurations involving permissions.

------------------------------------------------------------------------

## Phase 3 --- Programming & Scripting Fundamentals

**Level:** Beginner → Elementary

### Goal

Develop enough programming knowledge to read code, understand program
behavior, automate tasks, and investigate software.

### Topics

-   [ ] Variables and data types
-   [ ] Conditions and loops
-   [ ] Functions
-   [ ] Arrays and data structures
-   [ ] Strings and byte representations
-   [ ] File handling
-   [ ] Error handling
-   [ ] Memory management fundamentals
-   [ ] Pointers and references
-   [ ] Program execution flow
-   [ ] Debugging
-   [ ] Networking programming fundamentals
-   [ ] Scripting and automation
-   [ ] Reading source code
-   [ ] Dependency management

### Suggested Languages

  Language     Learning Purpose
  ------------ --------------------------------------------------
  Python       Scripting, automation, and security tooling
  C            Memory, pointers, and low-level program behavior
  Go           Concurrency and network programming
  JavaScript   Web application behavior and browser-side code

You do not need to master all four languages immediately. Start with one
language for general programming and introduce C when studying memory
and low-level concepts.

### Practical Exercises

-   [ ] Write a program that reads and processes files.
-   [ ] Parse structured data such as JSON.
-   [ ] Write a simple TCP client and server.
-   [ ] Debug a program and inspect variable values.
-   [ ] Experiment with pointers and memory allocation in C.
-   [ ] Write scripts to automate repetitive local tasks.
-   [ ] Read and explain a small open-source codebase.

### Completion Criteria

-   [ ] Read and understand basic source code.
-   [ ] Explain how data moves through a program.
-   [ ] Understand basic pointers and memory behavior.
-   [ ] Write scripts for simple automation.
-   [ ] Debug a program systematically.

------------------------------------------------------------------------

## Phase 4 --- Networking Fundamentals

**Level:** Elementary

### Goal

Understand how devices communicate across local networks and the
internet.

### Topics

-   [ ] OSI model
-   [ ] TCP/IP model
-   [ ] Encapsulation and decapsulation
-   [ ] IPv4 and IPv6
-   [ ] MAC addresses
-   [ ] ARP and Neighbor Discovery
-   [ ] Subnetting
-   [ ] Routing
-   [ ] Switching
-   [ ] VLANs
-   [ ] TCP and UDP
-   [ ] TCP three-way handshake
-   [ ] TCP connection termination
-   [ ] ICMP
-   [ ] DNS
-   [ ] DHCP
-   [ ] NAT
-   [ ] Ports and sockets
-   [ ] Network topologies
-   [ ] Basic firewall concepts

### Practical Exercises

-   [ ] Inspect network interfaces and IP addresses.
-   [ ] Calculate basic subnets.
-   [ ] Inspect routing tables.
-   [ ] Observe ARP traffic.
-   [ ] Capture TCP and UDP traffic.
-   [ ] Analyze a TCP handshake in Wireshark.
-   [ ] Perform DNS lookups with `dig` and `host`.
-   [ ] Trace a route to a permitted destination.
-   [ ] Build a small isolated network lab.

### Suggested Tools

-   Wireshark
-   `tcpdump`
-   `ip`
-   `ss`
-   `ping`
-   `traceroute`
-   `dig`
-   `host`

### Completion Criteria

-   [ ] Explain how packets travel between devices.
-   [ ] Explain the roles of IP, MAC, and port numbers.
-   [ ] Explain TCP versus UDP.
-   [ ] Explain basic routing and switching.
-   [ ] Explain DNS resolution and DHCP.
-   [ ] Read and interpret a basic packet capture.

------------------------------------------------------------------------

## Phase 5 --- Protocols & Communication Security

**Level:** Elementary → Intermediate

### Goal

Understand the protocols used by different systems and the security
properties of their communication.

### Topics

  Protocol       Main Purpose
  -------------- ------------------------------
  HTTP / HTTPS   Web communication
  DNS            Domain name resolution
  SSH            Secure remote administration
  TLS            Encrypted communication
  SMTP           Email transmission
  IMAP / POP3    Email retrieval
  FTP / SFTP     File transfer
  SMB            Network file sharing
  LDAP           Directory services
  Kerberos       Network authentication
  DHCP           Network configuration
  NTP            Time synchronization

Additional concepts:

-   [ ] Protocol state and message structure
-   [ ] Cleartext versus encrypted protocols
-   [ ] Authentication mechanisms
-   [ ] Certificate-based authentication
-   [ ] Protocol negotiation
-   [ ] Secure configuration
-   [ ] Legacy protocol risks
-   [ ] Network service exposure

### Practical Exercises

-   [ ] Inspect protocol traffic in Wireshark.
-   [ ] Configure an SSH server in a lab.
-   [ ] Inspect TLS certificates.
-   [ ] Configure a local DNS service.
-   [ ] Observe DHCP behavior in an isolated network.
-   [ ] Compare encrypted and unencrypted protocol traffic where safe
    and permitted.
-   [ ] Review service configurations and disable unnecessary services.

### Completion Criteria

-   [ ] Explain the purpose of common network protocols.
-   [ ] Understand how protocols establish communication.
-   [ ] Identify whether communication is encrypted.
-   [ ] Understand basic protocol authentication.
-   [ ] Recognize insecure or unnecessary network services.

------------------------------------------------------------------------

## Phase 6 --- Cryptography Fundamentals

**Level:** Intermediate

### Goal

Understand the cryptographic mechanisms used to protect confidentiality,
integrity, authenticity, and keys.

### Topics

-   [ ] Cryptographic terminology
-   [ ] Cryptographic primitives
-   [ ] Hash functions
-   [ ] Password hashing
-   [ ] Salting
-   [ ] Key derivation functions (KDFs)
-   [ ] Symmetric encryption
-   [ ] Asymmetric encryption
-   [ ] Public and private keys
-   [ ] Digital signatures
-   [ ] Message authentication codes (MACs)
-   [ ] Key exchange
-   [ ] Diffie-Hellman
-   [ ] Randomness and secure random number generation
-   [ ] TLS fundamentals
-   [ ] Public Key Infrastructure (PKI)
-   [ ] Certificate Authorities
-   [ ] Certificate validation
-   [ ] Key management

### Practical Exercises

-   [ ] Calculate hashes and compare outputs.
-   [ ] Generate and inspect keys using OpenSSL.
-   [ ] Create a local test certificate.
-   [ ] Verify a digital signature.
-   [ ] Inspect a certificate chain.
-   [ ] Observe a TLS handshake.
-   [ ] Compare password hashing with general-purpose hashing.
-   [ ] Identify common mistakes in cryptographic configuration.

### Suggested Tools

-   OpenSSL
-   Python cryptography library (for learning and controlled
    experiments)

### Completion Criteria

-   [ ] Explain hashing versus encryption.
-   [ ] Explain symmetric versus asymmetric cryptography.
-   [ ] Explain digital signatures and MACs.
-   [ ] Explain key exchange at a conceptual level.
-   [ ] Explain PKI and certificate validation.
-   [ ] Recognize why key management is critical.

**Important:** Prefer established cryptographic libraries and protocols.
Do not design your own cryptographic algorithms for real security
systems.

------------------------------------------------------------------------

## Phase 7 --- Security Principles & Architecture

**Level:** Intermediate

### Goal

Understand the principles used to design, evaluate, and protect systems
across all cybersecurity domains.

### Topics

-   [ ] CIA Triad
-   [ ] Confidentiality
-   [ ] Integrity
-   [ ] Availability
-   [ ] Authentication
-   [ ] Authorization
-   [ ] Accountability and auditing
-   [ ] Least Privilege
-   [ ] Defense in Depth
-   [ ] Fail-Safe Defaults
-   [ ] Complete Mediation
-   [ ] Separation of Duties
-   [ ] Attack Surface
-   [ ] Trust Boundaries
-   [ ] Threat Modeling
-   [ ] Risk Assessment
-   [ ] Security by Design
-   [ ] Secure Defaults
-   [ ] Zero Trust principles
-   [ ] Security policies and controls

### Practical Exercises

-   [ ] Draw a system architecture diagram.
-   [ ] Identify assets, threats, and trust boundaries.
-   [ ] Create a basic threat model.
-   [ ] Map an application's attack surface.
-   [ ] Review access permissions using least privilege.
-   [ ] Identify preventive, detective, and corrective controls.
-   [ ] Evaluate a system design for security weaknesses.

### Completion Criteria

-   [ ] Explain the CIA Triad.
-   [ ] Distinguish threats, vulnerabilities, risks, and impacts.
-   [ ] Identify trust boundaries.
-   [ ] Create a basic threat model.
-   [ ] Explain defense in depth and least privilege.
-   [ ] Recommend security controls based on identified risks.

------------------------------------------------------------------------

## Phase 8 --- Identity & Access Management

**Level:** Intermediate

### Goal

Understand how identities are created, authenticated, authorized, and
managed across systems.

### Topics

-   [ ] Digital identity
-   [ ] Authentication
-   [ ] Authorization
-   [ ] Access control models
-   [ ] Discretionary Access Control (DAC)
-   [ ] Mandatory Access Control (MAC)
-   [ ] Role-Based Access Control (RBAC)
-   [ ] Attribute-Based Access Control (ABAC)
-   [ ] Access Control Lists (ACL)
-   [ ] Password security
-   [ ] Multi-Factor Authentication (MFA)
-   [ ] Session management
-   [ ] Single Sign-On (SSO)
-   [ ] OAuth 2.0
-   [ ] OpenID Connect
-   [ ] Kerberos fundamentals
-   [ ] LDAP and directory services
-   [ ] Privileged Access Management (PAM)
-   [ ] Identity lifecycle

### Practical Exercises

-   [ ] Create users and groups on Linux.
-   [ ] Configure file and resource permissions.
-   [ ] Implement a basic authentication system in a lab.
-   [ ] Implement role-based authorization.
-   [ ] Explore LDAP in a controlled environment.
-   [ ] Study an SSO flow.
-   [ ] Inspect session and token lifecycles.
-   [ ] Review privileged accounts and excessive permissions.

### Completion Criteria

-   [ ] Explain authentication versus authorization.
-   [ ] Explain common access control models.
-   [ ] Understand identity lifecycle.
-   [ ] Understand session and token management.
-   [ ] Explain privileged access management.
-   [ ] Identify excessive or incorrectly assigned privileges.

------------------------------------------------------------------------

## Phase 9 --- System, Application & Network Security

**Level:** Intermediate → Upper Intermediate

### Goal

Apply security principles to operating systems, applications, endpoints,
and networks.

### A. System Security

-   [ ] Operating System Hardening
-   [ ] Linux Security
-   [ ] Windows Security
-   [ ] User and privilege management
-   [ ] Process isolation
-   [ ] Kernel security fundamentals
-   [ ] Endpoint Security
-   [ ] Antivirus and EDR fundamentals
-   [ ] Secure Boot
-   [ ] File Integrity Monitoring
-   [ ] Patch management
-   [ ] System configuration security

### B. Network Security

-   [ ] Firewall architecture
-   [ ] Stateful and stateless filtering
-   [ ] IDS and IPS
-   [ ] Network segmentation
-   [ ] VPN
-   [ ] Network Access Control
-   [ ] Network monitoring
-   [ ] Packet analysis
-   [ ] Wireless security fundamentals
-   [ ] Secure network administration

### C. Application Security

-   [ ] Secure coding principles
-   [ ] Input validation
-   [ ] Output encoding
-   [ ] Memory safety
-   [ ] Authentication security
-   [ ] Authorization security
-   [ ] API security
-   [ ] Web security
-   [ ] Dependency security
-   [ ] Secure Software Development Lifecycle (SSDLC)
-   [ ] Security testing fundamentals

### Practical Exercises

-   [ ] Harden a Linux server in a lab.
-   [ ] Configure firewall rules.
-   [ ] Inspect network traffic.
-   [ ] Explore an IDS using controlled traffic.
-   [ ] Review system permissions.
-   [ ] Build a small application using secure coding practices.
-   [ ] Review dependencies for known vulnerabilities.

### Completion Criteria

-   [ ] Explain the differences between system, network, and application
    security.
-   [ ] Apply basic OS hardening.
-   [ ] Understand firewall, IDS, and IPS roles.
-   [ ] Understand endpoint protection.
-   [ ] Apply basic secure coding principles.
-   [ ] Explain patch and dependency management.

------------------------------------------------------------------------

## Phase 10 --- Infrastructure, Virtualization & Cloud Security

**Level:** Upper Intermediate

### Goal

Understand the security of modern infrastructure and the environments
used to deploy systems.

### Topics

-   [ ] Virtualization fundamentals
-   [ ] Hypervisors
-   [ ] Virtual Machines
-   [ ] VM isolation
-   [ ] Container architecture
-   [ ] Docker security
-   [ ] Kubernetes fundamentals
-   [ ] Cloud computing models
-   [ ] IaaS, PaaS, and SaaS
-   [ ] Cloud IAM
-   [ ] Cloud networking
-   [ ] Cloud storage security
-   [ ] Secrets management
-   [ ] Infrastructure as Code
-   [ ] Configuration management
-   [ ] Distributed systems
-   [ ] Microservices security
-   [ ] Shared Responsibility Model

### Practical Exercises

-   [ ] Build a virtual machine lab.
-   [ ] Build an isolated Docker environment.
-   [ ] Inspect container permissions and isolation.
-   [ ] Configure network segmentation.
-   [ ] Explore a cloud IAM environment or local equivalent.
-   [ ] Review cloud storage access policies.
-   [ ] Deploy a small multi-service application.
-   [ ] Identify trust boundaries between services.

### Completion Criteria

-   [ ] Explain virtualization and containerization.
-   [ ] Understand basic isolation boundaries.
-   [ ] Explain cloud service models.
-   [ ] Understand cloud IAM and storage permissions.
-   [ ] Explain the Shared Responsibility Model.
-   [ ] Understand basic service-to-service security.

------------------------------------------------------------------------

## Phase 11 --- Security Operations & Incident Response

**Level:** Upper Intermediate

### Goal

Understand how security events are monitored, investigated, and handled.

### Topics

-   [ ] Security monitoring
-   [ ] Logging fundamentals
-   [ ] Linux system logs
-   [ ] Windows Event Logs
-   [ ] Network monitoring
-   [ ] SIEM fundamentals
-   [ ] EDR fundamentals
-   [ ] Threat Intelligence
-   [ ] Indicators of Compromise (IOC)
-   [ ] Incident Response Lifecycle
-   [ ] Digital Forensics fundamentals
-   [ ] Malware analysis fundamentals
-   [ ] Memory forensics
-   [ ] Filesystem forensics
-   [ ] Timeline analysis
-   [ ] Evidence handling
-   [ ] Incident documentation

### Practical Exercises

-   [ ] Analyze Linux authentication logs.
-   [ ] Inspect Windows Event Logs.
-   [ ] Generate and investigate events in a lab.
-   [ ] Identify suspicious process behavior.
-   [ ] Analyze a controlled network capture.
-   [ ] Build a basic incident timeline.
-   [ ] Write an incident report.
-   [ ] Practice preserving evidence in a controlled lab.

### Completion Criteria

-   [ ] Explain the purpose of security monitoring.
-   [ ] Understand logs and event sources.
-   [ ] Identify basic suspicious activity.
-   [ ] Explain the incident response lifecycle.
-   [ ] Understand basic forensic evidence handling.
-   [ ] Produce a clear incident report.

------------------------------------------------------------------------

## Phase 12 --- Vulnerability Analysis & Security Research

**Level:** Upper Intermediate → Research Foundation

### Goal

Combine knowledge from previous phases to understand, reproduce,
analyze, and report security weaknesses.

### Topics

-   [ ] Vulnerability fundamentals
-   [ ] Vulnerability lifecycle
-   [ ] Common Weakness Enumeration (CWE)
-   [ ] Common Vulnerabilities and Exposures (CVE)
-   [ ] Common Vulnerability Scoring System (CVSS)
-   [ ] Vulnerability assessment
-   [ ] Penetration testing methodology
-   [ ] Attack surface analysis
-   [ ] Exploit development fundamentals
-   [ ] Reverse engineering fundamentals
-   [ ] Static analysis
-   [ ] Dynamic analysis
-   [ ] Fuzzing fundamentals
-   [ ] Source code auditing
-   [ ] Root cause analysis
-   [ ] Vulnerability chaining
-   [ ] Vulnerability reporting
-   [ ] Responsible disclosure

### Practical Exercises

-   [ ] Read and analyze public CVE reports.
-   [ ] Map a deliberately vulnerable lab system.
-   [ ] Identify a weakness in a controlled environment.
-   [ ] Analyze the root cause of a vulnerability.
-   [ ] Review source code for unsafe behavior.
-   [ ] Reproduce a vulnerability in an authorized lab.
-   [ ] Create a minimal proof of concept.
-   [ ] Write a technical vulnerability report.
-   [ ] Recommend and verify mitigations.

### Completion Criteria

-   [ ] Explain the difference between a vulnerability, exploit, and
    risk.
-   [ ] Analyze a vulnerability's root cause.
-   [ ] Perform a basic vulnerability assessment.
-   [ ] Reproduce findings in an authorized environment.
-   [ ] Understand basic static and dynamic analysis.
-   [ ] Write a reproducible technical report.

------------------------------------------------------------------------

# 4. Specialization Paths After the Foundation

The foundation is shared. Specialization comes afterward; you do not
need to master every advanced domain.

  -----------------------------------------------------------------------
  Specialization                      Main Areas
  ----------------------------------- -----------------------------------
  Offensive Security                  Penetration Testing, Red Teaming,
                                      Exploit Development, Adversary
                                      Simulation

  Defensive Security                  SOC, Blue Team, Detection
                                      Engineering, Incident Response,
                                      Threat Hunting

  Application Security                Secure Code Review, Web Security,
                                      API Security, Product Security,
                                      DevSecOps

  Low-Level Security                  Reverse Engineering, Malware
                                      Analysis, Binary Exploitation,
                                      Kernel Security

  Infrastructure & Cloud Security     Cloud Security, Network Security,
                                      Container Security, Infrastructure
                                      Security

  Security Research                   Vulnerability Research, Fuzzing,
                                      Protocol Research, Security
                                      Engineering
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 5. Learning Levels and Evaluation

Use the same four-level progression for each domain.

  -----------------------------------------------------------------------
  Level                   Focus                   Expected Ability
  ----------------------- ----------------------- -----------------------
  Beginner                Recognize concepts      Explain terminology and
                                                  purpose

  Elementary              Understand mechanisms   Explain how a component
                                                  works

  Intermediate            Implement and inspect   Build, configure, and
                                                  analyze

  Upper Intermediate      Security analysis       Identify weaknesses,
                                                  explain root causes,
                                                  and recommend
                                                  mitigations
  -----------------------------------------------------------------------

Do not advance based only on the number of topics completed. Advance
when you can demonstrate the expected ability.

## Recommended Learning Cycle

1.  **Understand** --- Learn the concept and its internal mechanism.
2.  **Build** --- Implement or configure it in a lab.
3.  **Inspect** --- Observe its behavior with suitable tools.
4.  **Test** --- Experiment with expected and unexpected behavior.
5.  **Analyze** --- Explain what happened and why.
6.  **Secure** --- Apply appropriate mitigations.
7.  **Document** --- Record the experiment, findings, and conclusions.

Use isolated systems and environments you own or are explicitly
authorized to test.

------------------------------------------------------------------------

# 6. Main Books and Learning References

These are suggested references, not a requirement to read every book
cover to cover.

  Domain                 Reference
  ---------------------- ----------------------------------------------
  Computer Systems       Computer Systems: A Programmer's Perspective
  Operating Systems      Operating Systems: Three Easy Pieces
  Networking             Computer Networking: A Top-Down Approach
  Cryptography           Serious Cryptography
  Security Principles    Security Engineering --- Ross Anderson
  Application Security   Web Application Security --- Andrew Hoffman
  Network Security       Network Security Essentials
  Incident Response      Incident Response & Computer Forensics

### Official and Free Resources

-   [NIST Cybersecurity Resources](https://csrc.nist.gov/)
-   [MITRE ATT&CK](https://attack.mitre.org/)
-   [MITRE CWE](https://cwe.mitre.org/)
-   [CISA](https://www.cisa.gov/)
-   [OWASP](https://owasp.org/)
-   [RFC Editor](https://www.rfc-editor.org/)
-   [Linux man-pages](https://man7.org/linux/man-pages/)
-   [Open Security Training](https://opensecuritytraining.info/)

------------------------------------------------------------------------

# 7. Priority Structure

Not every phase requires the same depth at the beginning.

## Core Foundations --- Learn Thoroughly

-   [ ] Computer Systems
-   [ ] Operating Systems
-   [ ] Programming
-   [ ] Networking
-   [ ] Protocols
-   [ ] Cryptography
-   [ ] Security Principles
-   [ ] Identity & Access Management

## Applied Foundations --- Learn Through Practice

-   [ ] System Security
-   [ ] Network Security
-   [ ] Application Security
-   [ ] Infrastructure Security
-   [ ] Cloud Security
-   [ ] Security Operations

## Research Preparation --- Learn the Fundamentals

-   [ ] Vulnerability Analysis
-   [ ] Reverse Engineering
-   [ ] Malware Analysis
-   [ ] Exploit Development
-   [ ] Digital Forensics
-   [ ] Fuzzing

------------------------------------------------------------------------

# 8. Progress Tracker

Mark a phase complete only when you have met its completion criteria,
not merely when you have read the material.

-   [ ] Phase 1 --- Computer Systems Fundamentals
-   [ ] Phase 2 --- Operating System Fundamentals
-   [ ] Phase 3 --- Programming & Scripting Fundamentals
-   [ ] Phase 4 --- Networking Fundamentals
-   [ ] Phase 5 --- Protocols & Communication Security
-   [ ] Phase 6 --- Cryptography Fundamentals
-   [ ] Phase 7 --- Security Principles & Architecture
-   [ ] Phase 8 --- Identity & Access Management
-   [ ] Phase 9 --- System, Application & Network Security
-   [ ] Phase 10 --- Infrastructure, Virtualization & Cloud Security
-   [ ] Phase 11 --- Security Operations & Incident Response
-   [ ] Phase 12 --- Vulnerability Analysis & Security Research

------------------------------------------------------------------------

# 9. Recommended Starting Point

Start at **Phase 1 --- Computer Systems Fundamentals**.

Even if you have already used Linux, Docker, DNS, HTTP, Node.js, or Go,
revisit the underlying concepts and evaluate them against the completion
criteria.

The objective is not to start from zero in every topic. It is to
identify gaps and build a connected mental model of how computer systems
work and how security applies to them.

**Guiding principle:** Understand the system first, understand its trust
boundaries second, and study how it can fail or be attacked third.
