## Skill View Layouts

`SkillViews` can be rendered using a few different layouts. There is a `buildSkillViewLayout(...)` helper available to make it easy. 

> **Note:** Because `Layouts` are presentation only, there isn't any testing that needs to be done for them.

### Layouts in Storybook

You can see the different layout options in the `SkillView` `Layouts` Storybook.

<div class="grid-buttons">
    <a class="btn" href="https://storybook.spruce.bot/iframe.html?args=&globals=&id=components-skill-views--layouts&viewMode=story">View Storybook</a>
</div>

> **Note:** In this Storybook example, you'll see "Legacy" layouts. Those are the old way of rendering layouts and are not recommended for new development.

### The `BuildSkillViewLayout` Interfaces

```ts

// The function that builds the layout
function buildSkillViewLayout(layout: LayoutStyle, cards: SkillViewLayoutCards): SkillView

// All the options for layout styles
type LayoutStyle = ("big-left" | "big-right" | "big-top" | "big-top-left" | "grid")

// The interface for the second parameter of the function, where Card is a rendered CardViewController
interface SkillViewLayoutCards {
    leftCards?: Card[];
    rightCards?: Card[];
    topCards?: Card[];
    cards?: Card[];
    bottomCards?: Card[];
}

```

### Example Rendering a Layout

```ts
import { 
    AbstractSkillViewController,
    CardViewController,
    buildSkillViewLayout,
    SkillView,
} from '@sprucelabs/heartwood-view-controllers'

class RootSkillView extends AbstractSkillViewController {
    private card1Vc: CardViewController
    private card2Vc: CardViewController

    public constructor(options: ViewControllerOptions) {
        super(options)
        this.card1Vc = this.Card1Vc()
        this.card2Vc = this.Card2Vc()
    }

    private Card1Vc() {
        return this.Controller('card', {
            header: {
                title: 'Hello, World!',
            },
        })
    }

    private Card2Vc() {
        return this.Controller('card', {
            header: {
                title: 'Hello, World!',
            },
        })
    }

    public render(): SkillView {
        return buildSkillViewLayout('big-left', {
            leftCards: [this.card1Vc.render()],
            rightCards: [this.card2Vc.render()],
        })
    }
}
```

### Layout Options
Not all `Card` properties are supported in all layouts. Here is a list of the supported properties for each layout:

- `big-left`:
    - `leftCards`
    - `rightCards`
- `big-right`:
    - `rightCards`
    - `leftCards`
- `big-top`:
    - `topCards`
    - `bottomCards`
- `big-top-left`:
    - `leftCards`
    - `rightCards`
    - `bottomCards`
- `big-top-right`:
    - `rightCards`
    - `leftCards`
    - `bottomCards`
- `grid`:
    - `cards`
