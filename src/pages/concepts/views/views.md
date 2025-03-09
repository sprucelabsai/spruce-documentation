# Views

`Views` are the building blocks of the front-end experience in Spruce. Every `Skill` can register `Skill Views` that are comprised of `CardViewControllers`. A `Skill View` also renders a `NavigationViewController` that is comprised of `NavigationButtonViews`. By default, the skill's `RootSkillViewController` is the first view that is rendered. 

<img style="margin:0 auto; display:block;" src="../../assets/img/concepts/skill_view_with_cards.png">

A `CardViewController` has a `CardHeader`, `CardBody`, and `CardFooter`. The `CardBody` is comprised of many `CardSections`. See the diagrams below to understand how cards are constructed.

<img style="margin:0 auto; display:block;" src="../../assets/img/concepts/skill_view_and_card.png">

Every other type of `ViewController` (listed below) is rendered inside a `CardSection`. This allows for a consistent look and feel across all views in the Spruce ecosystem.


{% include_raw "important-classes.md" "concepts/views" %}

{% include_raw "skill-view-lifecycle.md" "concepts/views" %}

{% include_raw "root-skill-view.md" "concepts/views" %}

{% include_raw "app-view-controller.md" "concepts/views" %}

{% include_raw "rendering-skill-views.md" "concepts/views" %}

{% include_raw "rendering-cards.md" "concepts/views" %}

{% include_raw "rendering-layouts.md" "concepts/views" %}

{% include_raw "rendering-dialogs.md" "concepts/views" %}

{% include_raw "rendering-forms.md" "concepts/views" %}

{% include_raw "crud.md" "concepts/views" %}

{% include_raw "rendering-location-address.md" "concepts/views" %}

{% include_raw "navigation.md" "concepts/navigation" %}

{% include_raw "view-controller-plugins.md" "concepts/views" %}

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>