# reproduce-yarn-berry-6667

[BUG] `yarn workspaces foreach run` prefix string mess up console

## expected

`yarn workspaces foreach run` prefix string will not mess up console

## actual

`yarn workspaces foreach run` prefix string mess up console

## reproduce

```sh
$ yarn
➤ YN0000: · Yarn 4.6.0
➤ YN0000: ┌ Resolution step
➤ YN0000: └ Completed
➤ YN0000: ┌ Fetch step
➤ YN0000: └ Completed
➤ YN0000: ┌ Link step
➤ YN0000: └ Completed
➤ YN0000: · Done in 0s 44ms
$ yarn build
[hello]: Process started
[hello]: #0 building with "default" instance using docker driver
                                                                [hello]: 
                                                                         [hello]: #1 [internal] load build definition from Dockerfile
                                                                                                                                     [hello]: #1 transferring dockerfile:
                                 [hello]: #1 transferring dockerfile: 90B done
                                                                              [hello]: #1 DONE 0.6s
                                                                                                   [hello]: 
                                                                                                            [hello]: #2 [internal] load metadata for mcr.microsoft.com/devcontainers/base:alpine-3.20
                                                             [hello]: #2 DONE 1.3s
                                                                                  [hello]: 
                                                                                           [hello]: #3 [internal] load .dockerignore
                                                                                                                                    [hello]: #3 transferring context:
                             [hello]: #3 transferring context: 2B done
                                                                      [hello]: #3 DONE 0.5s
                                                                                           [hello]: 
                                                                                                    [hello]: #4 [1/1] FROM mcr.microsoft.com/devcontainers/base:alpine-3.20@sha256:5212d8ed44c89bfadad14a03104ef75b09c5de8642a58721c271f2e9155f5023
                                                                                                           [hello]: #4 CACHED
                                                                                                                             [hello]: 
                                                                                                                                      [hello]: #5 exporting to image
                            [hello]: #5 exporting layers
                                                        [hello]: #5 exporting layers done
                                                                                         [hello]: #5 writing image sha256:6609a4e82f8b1d391aec77dd37288540ce9437dfbdcb28bcf8a9a6bf9d89d493
                                                  [hello]: #5 writing image sha256:6609a4e82f8b1d391aec77dd37288540ce9437dfbdcb28bcf8a9a6bf9d89d493 0.3s done
                     [hello]: #5 DONE 0.6s
                                          [hello]: Process exited (exit code 0), completed in 6s 420ms
Done in 6s 423ms
$ 
```
