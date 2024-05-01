## Creating and Previewing Skill Views

### Creating a New Skill View
To create a new Skill View or View, use the command:
```bash
spruce create.view
```

### Previewing Skill Views
For live reloading and previewing of your Views, use:
```bash
spruce watch.views
```
*Note: Your skill must be registered before you can publish your Skill Views.*

### Root View Controller
This is the primary view for your skill, which is accessible by your Skill's namespace. The creation of the RootViewController should be the first step for each skill.

### Incremental Building
As you make changes to the source, your Views will be incrementally built when you use:
```bash
spruce watch.views
```
*Make sure you have logged in and registered your skill first!*

## Testing View Controllers

Testing involves several steps to ensure your Views perform as expected.

1. **Create Your Test File**
   Begin by creating your test file using the command:
   ```bash
   spruce create.test
   ```
   Choose `AbstractSpruceFixtureTest` or your Skill's primary `AbstractTest` if it has been created.

2. **Writing Your First Failing Test**
   Start by clearing out any existing tests and add your first failing test. Make sure your namespace is correct.
   ```typescript
   @test()
   protected static async canRenderRootSkillView() {
       const vc = this.views.Controller('adventure.root', {})
   }
   ```

3. **Creating Your Root View Controller**
   Use the command `spruce create.view` to create your RootViewController.

4. **Finishing Your First Test**
   Your test should now ensure that the RootViewController always renders successfully.
   ```typescript
   @test()
   protected static async canRenderRootSkillView() {
       const vc = this.views.Controller('adventure.root', {})
       this.render(vc)
   }
   ```
   If this test ever fails, it indicates a problem with the RootViewController.

### Assertion Libraries
Several libraries are available to make writing tests easier:

- `vcAssert`: A general catch-all library for assertions.
- `formAssert`
- `listAssert`
- `buttonAssert`

These are used for constructing failing tests which are an essential part of test-driven development.

### Tests
#### Testing lists

```
export default class RootSkillViewControllerTest extends AbstractSpruceFixtureTest {

  protected static vc: SpyRootSkillView

  protected static async beforeEach() {
    await super.beforeEach()

    this.views.setController('adventure.root', SpyRootSkillView)
    this.vc = this.views.Controller('adventure.root', {}) as SpyRootSkillView
  }

    @test()
    protected static async rendersList() {
        const listVc = listAssert.cardRendersList(this.equipCardVc)

        listAssert.listRendersRow(vc, 'no-entries')

        listVc.addRow({...})
        listVc.addRow({...})
        listVc.addRow({ id: location.id, ...})

        await interactor.clickInRow(vc, 2, 'edit')
        await interactor.clickInRow(vc, location.id, 'edit')
    }

  protected static get equipCardVc() {
    return this.vc.equipCardVc
  }

}

//for accessing the list vc
class SpyRootSkillView extends RootSkilLViewController {
  public equipCardVc: CardViewController
  public equipmentListVc: ListViewController
}

//production
class RootSkillviewController extends AbstractSkillViewController {
  protected equipCardVc: CardViewController
  protected equipmentListVc: ListViewController
    public constructor(options: ViewControllerOptions) {
        super(options)
        this.equipmentListVc = this.Controller('list', {...})
    this.equipCardVc = this.Controller('card', ...)
    }
}
Testing confirmation dialogs
//test
export default class RootSkillViewControllerTest extends AbstractSpruceFixtureTest {
  @test()
  protected static async confirmsBeforeSaving() {
    const formVc = this.vc.getFormVc();

    formVc.setValue("name", "Haircut");

    const confirmVc = await vcAssert.assertRendersConfirm(this.vc, () =>
      interactor.submitForm(formVc)
    );

    await confirmVc.accept();

    const match = await this.Store("services").findOne({});

    assert.isEqual(match.name, "Haircut");
  }

  @test()
  protected static async rejectingConfirmDoesNotSave() {
    const formVc = this.vc.getFormVc();

    await formVc.setValue("name", "Haircut");

    const confirmVc = await vcAssert.assertRendersConfirm(this.vc, () =>
      interactor.submitForm(formVc)
    );

    await confirmVc.reject();

    const match = await this.Store("services").findOne({});

    assert.isNotEqual(match.name, "Haircut");
  }
}

//production
class RootSkillviewController extends AbstractSkillViewController {
  public constructor(options: ViewControllerOptions) {
    super(options);
    this.formCardVc = this.FormCardVc();
  }

  private FormVc() {
    return this.views.Controller(
      "form",
      buildForm({
        id: "service",
        schema: serviceSchema,
        onSubmit: this.handleSubmit.bind(this),
        sections: [
          {
            fields: [
              {
                name: "name",
                hint: "Give it something good!",
              },
              "duration",
            ],
          },
        ],
      })
    );
  }

  private FormCardVc() {
    return this.views.Controller("card", {
      id: "service",
      header: {
        title: "Create your service!",
      },
      body: {
        sections: [
          {
            form: this.formVc.render(),
          },
        ],
      },
    });
  }

  private async handleSubmit({ values }: SubmitHandler<ServiceSchema>) {
    const confirm = await this.confirm({ message: "You ready to do this?" });
    if (confirm) {
      await this.createService(values);
    }
  }

  public getFormVc() {
    return this.formVc;
  }
}
```

#### Testing active record cards
A card with a list that is wicked easy to use and cuts out a ton of reduntant work!

Make sure you load your Active Record Card for it to show any results!

```
export default class RootSkillViewControllerTest extends AbstractSpruceFixtureTest {
  @test()
  protected static async rendersActiveRecordCard() {
    const vc = this.views.Controller("my-skill.root", {});
    const activeVc = vcAssert.assertSkillViewRendersActiveRecordCard(vc);
    assert.isEqual(vc.getActiveRecordCard(), activeVc);

    await this.views.load(vc);

    assert.isTrue(activeVc.getIsLoaded());
  }
}

// Production
export default class RootSkillViewController extends AbstractViewController<Card> {
  public constructor(options: ViewControllerOptions) {
    super(options);
    this.activeRecrodCardVc = this.ActiveRecordVc();
  }

  private ActiveRecordVc() {
    return this.views.Controller(
      "activeRecordCard",
      buildActiveRecordCard({
        header: {
          title: "Your locations",
        },
        eventName: "list-locations::v2020_12_25",
        payload: {
          includePrivateLocations: true,
        },
        responseKey: "locations",
        rowTransformer: (location) => ({ id: location.id, cells: [] }),
      })
    );
  }

  public load(options: SkillViewControllerLoadOptions) {
    const organization = await options.scope.getCurrentOrganization();
    this.activeRecordCardVc.setTarget({ organizationId: organization.id });
  }

  public getActiveRecordCardVc() {
    return this.activeRecordCardVc;
  }
}
```

#### Testing scope
Scoping experience to a specific organization or location.

By default, you will be scoped to your latest organization and location.

Learn more here.

```
@login()
export default class RootSkillViewControllerTest extends AbstractSpruceFixtureTest {
  protected static async beforeEach() {
    await super.beforeEach();
  }

  @test()
  protected static async redirectsWhenNoCurrentOrg() {
    let wasHit = false;

    await vcAssert.assertActionRedirects({
      router: this.views.getRouter(),
      action: () => this.views.load(this.vc),
      destination: {
        id: "organization.add",
      },
    });
  }

  @test()
  @seed("organization", 1)
  protected static async doesNotRedirectWhenCurrentOrg() {
    const organization = await this.fakedOrganizations[0]

    //this is optional, the current org defaults to the newest added
    //this.views.getScope().setCurrentOrganization(organization.id)

    await vcAssert.assertActionDidNotRedirect({
      router: this.views.getRouter(),
      action: () => this.views.load(this.vc),
    });

    assert.isEqualDeep(this.vc.currentOrg, organization);
  }

  @test()
  @seed("organizations", 3)
  protected static async usesOrgFromScope() {
    // since scope loads the newest org by default, we can set
    // it back to the first org to test our productions code
    const [organizations] = await this.fakedOrganizations

    this.views.getScope().setCurrentOrganization(organization.id);

    let wasHit = false;

    await this.views.load(this.vc);

    assert.isEqualDeep(this.vc.currentOrg, organization);
  }
}

//production
class RootSkillviewController extends AbstractSkillViewController {
  public async load(options: SkillViewControllerLoadOptions) {
    const organization = await options.scope.getCurrentOrganization();

    if (!organization) {
      await options.router.redirect("organization.add" as any);
      return;
    }

    this.currentOrganization = organization;
    this.profileCardVc.setRouter(options.router);
    this.profileCardVc.setIsBusy(false);
  }
}
```

#### Testing Stats
```
//test
@login()
export default class RootSkillViewControllerTest extends AbstractSpruceFixtureTest {
  @test()
  protected static rendersStats() {
    vcAssert.assertRendersStats(this.vc.getCardVc());
  }

  @test()
  @seed("organization", 1)
  protected static async rendersExpectedStatsAfterLoad() {
    await this.bootAndLoad();
  }

  private static async bootAndLoad() {
    await this.bootSkill();
    await this.views.load(this.vc);
  }
}

//production
class RootSkillViewController extends AbstractSkillViewController {
  public constructor(options: ViewControllerOptions) {
    super(options);

    this.cardVc = this.CardVc();
  }

  public async load(options: SkillViewControllerLoadOptions) {}
}
```

#### Testing forms
It is important that you test the graceful handling of failed requests on save. Use the eventMocker to make events throw so you can gracefully handle them!
```
//test
@login()
export default class RootSkillViewControllerTest extends AbstractSpruceFixtureTest {

    @test()
    protected static async showsErrorWhenSavingFails() {

        await eventMocker.makeEventThrow('create-organization::v2020_01_01')

        const formVc = this.vc.getFormVc()
        formVc.setValues({...})

        await vcAssert.assertRenderAlert(this.vc, () => interactor.submitForm(formVc))
    }


    @test()
    protected static async savesOrgWhenSubmittingForm() {
        const formVc = this.vc.getFormVc()
        await formVc.setValues({...})
        await vcAssert.assertRendersSuccessAlert(this.vc, () => interactor.subimForm(formVc))

        ...
    }
}

//production
class RootSkillviewController extends AbstractSkillViewController {
    public constructor(options: SkillViewControllerOptions) {
        super(options)
        this.formVc = this.FormVc()
    }

    private FormVc() {
        return this.views.Controller('form', buildForm({
            ...,
            onSubmit: this.handleSubmit.bind(this)
        }))
    }

    private async handleSubmit() {
        const values = this.formVc.getValues()

        try {
            const client = await this.connectToApi()
            await client.emitAndFlattenResponses('create-organization::v2020_01_01', {
                payload: values
            })

            await this.alert({ message: 'You did it!!', style: 'success' })

        } catch (err: any) {
            await this.alert({ message: err.message })
        }
    }
}
```

#### Testing toolbelt
```
//test
export default class RootSkillViewControllerTest extends AbstractSpruceFixtureTest {
    @test()
    protected static rendersToolBelt() {
        tt.assertDoesNotRenderToolBelt(this.vc)

        await this.views.load(this.vc)

        const toolBeltVc = vcAssert.assertRendersToolBelt(this.vc)
        const toolVc = vcAssert.assertToolBeltRendersTool(this.vc, 'edit')

        assert.isTruthy(toolVc, 'Your ToolBelt does not render a tool with a properly rendered CardVc.')
   
    }

  @test()
    protected static async addsTitleSubTitleCard() {
    // check if a tool is an instance of a specific Class
        const toolVc = vcAssert.assertToolInstanceOf(
            this.toolBeltVc,
            'title',
            EventTitleCardViewController
        )

    // check if tool is accessible off the parent view controller
        assert.isEqual(toolVc, this.vc.getTitleCardVc())
    }
  
}

//production
class RootSkillviewController extends AbstractSkillViewController {
    public constructor(options: SkillViewControllerOptions) {
        super(options)

        this.toolBeltVc = this.ToolBelt()
    }

    private ToolBelt() {
        return this.views.Controller('toolBelt', {
            ...,
        })
    }

    public async load(options: SkillViewControllerLoadOptions) {
        this.toolBeltVc.addTool({
            id: 'edit',
            lineIcon: 'globe',
            card: this.views.Controller('card', { ... })
        })
    }

    public renderToolBelt() {
        return this.toolBeltVc.render()
    }
}
```

#### Testing redirects
```
//test
export default class RootSkillViewControllerTest extends AbstractSpruceFixtureTest {
    @test()
    protected static redirectsOnSelectLocation() {
        const locationsCardVc = this.vc.getLocationsCardVc()
        const location = await this.views.getScope().getCurrentLocation()

        await vcAssert.assertActionRedirects({
            router: this.views.getRouter(),
            action: () =>
                interactor.clickButtonInRow(
                    locationsCardVc.getListVc(),
                    location.id,
                    'edit'
                ),
            destination: {
                id: 'locations.root',
                args: {
                    locationId: location.id,
                },
            },
        })
    }
}

//production
class RootSkillviewController extends AbstractSkillViewController {
    public constructor(options: SkillViewControllerOptions) {
        super(options)
        this.locationsCardVc = this.ActiveRecordCardVc()
    }

    public async load(options: SkillViewControllerLoadOptions) {
        this.router = options.router
        await this.locationsCardVc.load()
    }

    private activeRecordCardVc() {
        return this.views.Controller('activeRecordCard', buildActiveRecordCard({
            ...,
            rowTransformer: (location) => ({
                id: location.id
                cells: [
                    {
                        text: {
                            content: location.name
                        },
                    },
                    {
                        button: {
                            id: 'edit',
                            onClick: async () => {
                                await this.router?.redirect('locations.root', {
                                    locationId: location.id
                                })
                            }
                        }
                    }
                ]
            })
        }))
    }

    public getLocationsCardVc() {
        return this.locationsCardVc
    }
}
```
### Authentication
Using `@fake.login()`, you can simulate a client for API requests, which is useful for testing authentication-related scenarios.

### Optimizing Source
To inspect your bundled view controller source, set the `VIEW_PROFILER_STATS_DESTINATION_DIR` in your skill's environment. This will output a file that can be analyzed to see what is included in your bundle.

### Test Hints
The document ends with practical hints for testing, such as looking at existing skills, using `spruce watch.views` for a real-time feedback loop, and checking out `vcAssert.test.ts` in `heartwood-view-controllers` for examples.

## Practice
