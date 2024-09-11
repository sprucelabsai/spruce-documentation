# SpruceCLI

The `SpruceCLI` is a command line interface that allows you to interact with your Spruce environment. You can view the [source code on GitHub](https://github.com/sprucelabsai-community/spruce-cli-workspace/tree/master/packages/spruce-cli).

You can manually install it with `yarn` by running:

```bash
yarn global add @sprucelabs/spruce-cli
```

## Help Docs

```bash
spruce --help
```


```bash

 ███████╗ ██████╗  ██████╗  ██╗   ██╗  ██████╗ ███████╗ ██████╗   ██████╗  ████████╗
 ██╔════╝ ██╔══██╗ ██╔══██╗ ██║   ██║ ██╔════╝ ██╔════╝ ██╔══██╗ ██╔═══██╗ ╚══██╔══╝
 ███████╗ ██████╔╝ ██████╔╝ ██║   ██║ ██║      █████╗   ██████╔╝ ██║   ██║    ██║
 ╚════██║ ██╔═══╝  ██╔══██╗ ██║   ██║ ██║      ██╔══╝   ██╔══██╗ ██║   ██║    ██║
 ███████║ ██║      ██║  ██║ ╚██████╔╝ ╚██████╗ ███████╗ ██████╔╝ ╚██████╔╝    ██║
 ╚══════╝ ╚═╝      ╚═╝  ╚═╝  ╚═════╝   ╚═════╝ ╚══════╝ ╚═════╝   ╚═════╝     ╚═╝


Usage: spruce [options] [command]

Options:
  --no-color              
  -d, --directory <path>  
  -v, --version          
  -h, --help             

Commands:
  add.dependency [options] [namespace]                
  boot [options]                                      
  create.conversation [options]                       
  create.error [options]                              
  create.event [options]                              
  create.log.transport [options]                      
  create.module|create.node [destination] [options]   
  create.organization [options]                      
  create.permissions|create.permission [options]
  create.schema [options]                             
  create.skill [options] [destination]                
  create.store [options]                              
  create.test [options]                               
  create.theme                                        
  create.view [options]                               
  create.view.plugin [options]
  dashboard                                           
  deploy.heroku [options]                             
  disable.cache|stop.cache                            
  enable.cache|start.cache                            
  install.skill [options]                             
  listen.event|create.listener [options]              
  login [options]                                     
  login.skill [options]                               
  logout                                              
  manage.dependencies|remove.dependency               
  onboard                                             
  pull.event.contracts [options]                      
  rebuild [options]                                   
  register.skill|register [options]                   
  set.remote [options] [remote]                       
  setup.polish
  setup.sandbox [options]                             
  setup.testing [options]                             
  setup.vscode [options]                              
  sync.errors [options]                               
  sync.events [options]                               
  sync.fields [options]                               
  sync.listeners
  sync.permissions [options]
  sync.schemas [options]                              
  sync.stores                                         
  sync.views                                          
  test [options]                                      
  test.conversation|chat [options]                    
  update.dependencies|upgrade.dependencies            
  upgrade|update [options]                            
  watch.views                                         
  whoami                                              
```