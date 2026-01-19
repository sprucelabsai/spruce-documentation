When a browser or native app loads your Skill, it will start by hitting its `RootSkillViewController`. If your `Skill` has an `AppViewController` declared, it will be loaded first. You can execute code at each stage by implementing a method by the name of the stage.

<img src="{{ '/assets/img/concepts/skill_view_lifecycle.png' | url }}">
