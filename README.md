# CrowdCompute Internal

This document outlines the plan to build a sophisticated workbench for human evaluators, referred to as "raters." Its primary purpose is to serve AI/ML evaluation tasks to a distributed workforce in a secure and controlled environment.

## Project Roadmap

### 1. Foundational Setup & Authentication

- [x] **Initial Project Setup:** A Next.js project has been bootstrapped with `create-next-app`.
- [ ] **Authentication:** Implement a robust authentication system using NextAuth.js. This will include:
  - [ ] Google Authentication
  - [ ] Role-based access control (RBAC) to differentiate between "raters" and "managers."

### 2. Core Platform Features

- [ ] **Task Management:**
  - [ ] **Task Creation:** Managers can create, edit, and assign tasks.
  - [ ] **Task Distribution:** A system for distributing tasks to available raters.
  - [ ] **Task Interface:** A user-friendly interface for raters to view and complete tasks.
- [ ] **Real-time Communication:**
  - [ ] Implement a real-time chat or messaging system for communication between raters and managers.
- [ ] **Data Management:**
  - [ ] **Google Sheets Integration:** Utilize the existing Google Sheets API for data storage and retrieval.
  - [ ] **Secure Data Handling:** Ensure all data is handled securely and in compliance with privacy regulations.

### 3. Advanced Features & Scalability

- [ ] **Monitoring & Analytics:**
  - [ ] **Rater Performance:** Track and analyze rater performance and quality.
  - [ ] **Task Completion Rates:** Monitor task completion rates and identify bottlenecks.
- [ ] **Scalability:**
  - [ ] **Infrastructure:** Deploy the application on a scalable infrastructure (e.g., Vercel, AWS).
  - [ ] **Database:** Migrate from Google Sheets to a more scalable database solution (e.g., PostgreSQL, MongoDB) as the platform grows.

### 4. Testing & Deployment

- [ ] **Testing:**
  - [ ] **Unit Tests:** Write unit tests for all critical components.
  - [ ] **Integration Tests:** Implement integration tests to ensure all parts of the system work together correctly.
- [ ] **Deployment:**
  - [ ] **CI/CD Pipeline:** Set up a continuous integration and deployment (CI/CD) pipeline for automated testing and deployment.
  - [ ] **Production Environment:** Configure a secure and reliable production environment.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.