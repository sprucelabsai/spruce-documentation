Spruce is built entirely in TypeScript. This `SkillViewController` will render a full screen view with a `CardViewController` on it with a title and a subtitle. All ViewControllers (and SkillViewControllers) reduce down to a `ViewModel` that return from render(). In Spruce, 100% of the styling is handled by [Heartwood](../../concepts/views/) ([Storybook](https://storybook.spruce.bot)).

```typescript
import {
  AbstractSkillViewController,
  CardViewController,
  ViewControllerOptions,
  buildSkillViewLayout,
  SkillView
} from '@sprucelabs/heartwood-view-controllers'

export default class RootSkillViewController extends AbstractSkillViewController {
  public static id = 'root'
  protected cardVc: CardViewController

  public constructor(options: ViewControllerOptions) {
    super(options)

    this.cardVc = this.Controller('card', {
      header: {
        title: 'Hello, World!',
        subtitle: 'This is a card'
      }
    })
  }

  public render(): SkillView {
    return buildSkillViewLayout('grid', {
      cards: [this.cardVc.render()]
    })
  }
}
```
