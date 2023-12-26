---
title: What is Sprucebot?
---
Spruce is a development platform designed to facilitate the creation of enterprise-grade solutions, emphasizing both beauty and intuitiveness. It's currently in active development, with Sprucebot serving as a "robot co-pilot" to guide developers through the process of building applications using this platform.

### Core Concept: Skills

At the heart of Spruce's ideology is the concept of "Skills." These are essentially micro-apps, macro-services, or domain-services. Each Skill is a full-stack application that is hyper-focused on a specific real-world or digital experience. The idea is to create modular, focused components that address discrete needs or functionalities.

#### Examples of Skills
1. **Shifts**: For scheduling teams.
2. **Appointments**: To enable booking with team members.
3. **Reminders**: For timely notifications.
4. **Feedback**: To continually improve services.
5. **Profile**: For creating detailed profiles of guests and team members.
6. **Little Black Book**: A feature for personalizing services based on guest notes.

In a more extensive enterprise setting, additional Skills might include:
- **Groups**: For managing multiple locations.
- **Enterprise Service Management**: To implement service menu changes.
- **Forms**: For creating custom intake forms.
- **Waivers**: To require form completion before providing services.

### Key Principles of Spruce

1. **Focus and Modularity**: Each Skill is designed to solve one specific problem. When a Skill starts addressing a second problem, it's time to create a new Skill. This approach ensures clarity and focus in application development.

2. **Inter-Skill Communication**: Despite being focused on individual tasks, Skills can easily communicate with each other. This communication is facilitated through a socket-based system, ensuring speed and efficiency.

3. **Typescript-Based Development**: Sprucebot and the associated Skills are built entirely in Typescript. This choice brings several advantages, including the ease of sharing types between Skills, which simplifies distributed teamwork.

4. **Integration with AI**: While Sprucebot itself doesn't train large language models due to its Typescript foundation, it seamlessly integrates with various types of AI through their APIs. This integration is part of what Spruce refers to as the "4th runtime."

### The Ideology Behind Spruce

Spruce's ideology revolves around creating a development ecosystem that is not only efficient and scalable but also enjoyable to work with. The focus on Skills as modular, focused solutions to specific problems reflects a broader philosophy of simplicity, clarity, and modularity in software development. By breaking down complex enterprise needs into smaller, manageable Skills, Spruce aims to streamline the development process, making it more accessible and less overwhelming.

The emphasis on Typescript and the ease of inter-Skill communication highlights a commitment to modern, efficient, and collaborative software development practices. Spruce's approach is to leverage the strengths of Typescript for better team collaboration and to ensure that different components of a larger system can work together seamlessly and efficiently.

In summary, Spruce is more than just a set of tools for building applications; it represents a holistic approach to software development. This approach is characterized by a focus on modularity, efficiency, collaboration, and the integration of advanced technologies like AI. By adhering to these principles, Spruce aims to empower developers to create sophisticated, enterprise-grade solutions that are both powerful and user-friendly.