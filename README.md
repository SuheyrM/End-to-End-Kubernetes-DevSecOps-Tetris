# End-to-End Kubernetes DevSecOps Platform (Tetris Application)

This project demonstrates a **complete DevSecOps pipeline** used to build, secure, and deploy a containerized **React-based Tetris application** on **Amazon EKS** using a **GitOps delivery model with ArgoCD**.

The platform showcases modern cloud-native engineering practices including:

- Infrastructure as Code
- Automated CI/CD pipelines
- Multi-layer security scanning
- GitOps continuous delivery
- Kubernetes container orchestration

---
![Express - End-to-End Kubernetes DevsecOps Tetris Game](https://github.com/user-attachments/assets/e07af73b-cc66-447a-a570-3f1110a6d307)    ![Tetris](https://github.com/user-attachments/assets/b75e751a-5077-4504-b55b-25a122243aed)

---
## Architecture Overview

```text
Developer
   │
   ▼
GitHub Repository
   │
   ▼
Jenkins CI Pipeline
   │
   ├── SonarQube (Code Quality)
   ├── OWASP Dependency Check
   └── Trivy Container Scan
   │
   ▼
Docker Build
   │
   ▼
Amazon ECR
   │
   ▼
ArgoCD GitOps Deployment
   │
   ▼
Amazon EKS Kubernetes Cluster
   │
   ▼
AWS LoadBalancer
   │
   ▼
Public Tetris Application
```

Built an automated CI/CD pipeline using Jenkins
Implemented multi-layer security scanning
SonarQube (code quality)
OWASP Dependency Check
Trivy container scanning
Containerized the application using Docker
Stored container images in Amazon ECR
Deployed applications to Amazon EKS
Implemented GitOps deployment using ArgoCD
Enabled automatic rolling updates
Exposed the application through a Kubernetes LoadBalancer backed by AWS ELB
Provisioned the entire infrastructure using Terraform

DevSecOps Pipeline

CI Pipeline (Jenkins)

Pull source code from GitHub

Run SonarQube code analysis

Install dependencies

Run OWASP Dependency Check

Build Docker image

Scan container with Trivy

Push image to Amazon ECR

CD Pipeline (ArgoCD GitOps)

ArgoCD monitors the Git repository
Detects new application changes
Synchronizes Kubernetes manifests
Deploys updated application to EKS
Performs rolling updates of Kubernetes pods

Technologies Used
| Category                | Tools                         |
| ----------------------- | ----------------------------- |
| Cloud Platform          | AWS (EKS, ECR, ELB)           |
| Infrastructure as Code  | Terraform                     |
| Containerization        | Docker                        |
| CI/CD                   | Jenkins                       |
| GitOps Deployment       | ArgoCD                        |
| Container Orchestration | Kubernetes                    |
| Security Scanning       | Trivy, OWASP Dependency-Check |
| Code Quality            | SonarQube                     |

## Project Structure

```text
.
├── app
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── jenkins
│   └── Jenkinsfile
│
├── kubernetes
│   └── tetris.yaml
│
├── terraform
│   └── eks
│       ├── eks.tf
│       ├── vpc.tf
│       ├── providers.tf
│       └── outputs.tf
│
├── screenshots
│   └── tetris-demo.gif
│
├── Dockerfile
└── README.md
```
Infrastructure Provisioning

Infrastructure is provisioned using Terraform.

Resources created:
VPC
Subnets
Internet Gateway
NAT Gateway
Security Groups
Amazon EKS Cluster
EKS Node Group

Run the following commands to deploy infrastructure:
terraform init
terraform apply

Kubernetes Deployment
The application is deployed using Kubernetes manifests.
kubectl apply -f kubernetes/tetris.yaml

Security Scanning
The pipeline integrates multiple security layers:
| Tool                   | Purpose                          |
| ---------------------- | -------------------------------- |
| SonarQube              | Static code analysis             |
| OWASP Dependency Check | Vulnerable dependency detection  |
| Trivy                  | Container vulnerability scanning |

Outcome

Successfully implemented a fully automated DevSecOps pipeline capable of:
Securely building applications
Scanning for vulnerabilities
Deploying containerized workloads
Managing infrastructure with Terraform
Delivering applications via Kubernetes using GitOps

