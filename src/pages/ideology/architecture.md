# Small Trunk, Big Branches.

## Introduction

Sprucebot is a sophisticated development platform designed for the creation of scalable, enterprise-grade applications. With a focus on modularity and user experience, it provides developers with a set of tools and services, encapsulated in what we refer to as "Skills", to build intuitive solutions. At the core of Sprucebot's architecture is Mercury, a powerful event engine that facilitates seamless interactions between Skills and system components.

## Mercury: The Heart of Sprucebot

Mercury serves as the central nervous system of Sprucebot, orchestrating the flow of information and commands across the platform. It powers the Event Engine, manages the Skill Registry, and operates the Conversational State Machine, which together form the backbone of Sprucebot's architecture.

### Event Engine

The Event Engine is pivotal in enabling reactive and proactive functionalities within Sprucebot. It processes various types of events:

- **Reactive Events**: Triggered by user actions such as `did-arrive`, `book-appointment`, `check-in`, `press-button`, and `checkout`.
- **Preemptive Events**: Initiated in anticipation of user actions, including `will-arrive`, `checkout`, and `message`.
- **Command Events**: Direct results of user commands, which can target virtually anything within the Spruce ecosystem, including smart devices, businesses, and logistics.

Developers can introduce and manage new events into Mercury via Event Contracts using the `spruce create.event` and `spruce sync.events` commands.

### Skill Registry

The Skill Registry is responsible for managing the lifecycle of Skills, from creation to deployment. It involves:

- **Registration**: Adding new Skills to the system.
- **Update**: Keeping Skills current with the latest features and fixes.
- **Permission Contracts**: Ensuring each Skill adheres to defined permission protocols.

### Conversational State Machine

The Conversational State Machine is a complex system that manages messaging and authorizations, normalizing interactions across various platforms, including SMS, Facebook, WhatsApp, and more. It ensures a consistent conversational experience regardless of the communication medium.

## Skills: Building Blocks of Sprucebot 

Skills are full-stack, modular applications that focus on specific functionalities or experiences. They can be thought of as microservices that perform discrete tasks, such as scheduling (Shifts), booking (Appointments), sending reminders, collecting feedback, and creating detailed profiles (Profile).

## Developer Tools and Commands

Sprucebot equips developers with a robust set of tools and commands for building and maintaining Skills:

- **Tests**: Following the test-driven development philosophy, developers can create and run tests using the `spruce create.test` and `spruce test` commands.
- **Events**: Developers can manage events with `spruce create.event` and `spruce sync.events`.
- **Listeners**: To respond to events, developers can create listeners with `spruce create.listener`.
- **Schemas**: Data structures are defined with `spruce create.schema`, and synchronizations are handled with `spruce sync.schemas`.
- **Errors**: Error management is streamlined with `spruce create.error` and `spruce sync.errors`.
- **Stores**: Data storage solutions are set up with `spruce create.store`.
- **Conversations**: Developers can design conversation flows with `spruce create.conversation` and test them with `spruce test.conversation`.
- **Views**: Pixel-based interfaces are created using the Heartwood Design System with the `spruce create.view` command.

## Connectivity and Integration

Sprucebot's connectivity extends across various devices and sectors, facilitating integration with:

- **Smart Devices**: Including smart speakers and appliances.
- **Businesses**: Integrating with business processes for a seamless experience.
- **Robotics and Logistics**: Working alongside robots and logistic systems for improved efficiency.
- **Health Sector**: Offering applications in health monitoring and support.
- **Heartwood**: Utilizing the Heartwood Design System for building user interfaces.
- **People**: Engaging with users through personalized experiences.

## Conclusion

Sprucebot's architecture is a testament to the platform's commitment to modularity, intuitiveness, and enterprise readiness. It represents a leap forward in application development, providing developers with the tools necessary to create solutions that are both powerful and user-friendly.

## Appendix

- **Glossary**: A section devoted to defining technical terms used throughout the documentation.
- **FAQs**: A compilation of answers to commonly asked questions about Sprucebot.
- **Additional Resources**: A curated list of links to further documentation, tutorials, and community forums for developers.

