# reproduce-yarn-berry-6667

[BUG] `yarn workspaces foreach run` prefix string will mess up console, when
`sudo`.

## prepare

Use docker to prove able to always reproduce.

```sh
$ bash container.sh
+ img=public.ecr.aws/docker/library/archlinux:latest@sha256:812644fa7bb7790deb91c55fb694461706103288dead4395694efad4b0bf0212
+ docker run --rm -it -v /var/run/docker.sock:/var/run/docker.sock -v /tmp/reproduce-yarn-berry-6667:/app -w /app --entrypoint /bin/bash public.ecr.aws/docker/library/archlinux:latest@sha256:812644fa7bb7790deb91c55fb694461706103288dead4395694efad4b0bf0212
[root@e556503f99d5 app]# bash bootstrap.sh
...
+ corepack enable
+ yarn
! Corepack is about to download https://repo.yarnpkg.com/4.6.0/packages/yarnpkg-cli/bin/yarn.js
? Do you want to continue? [Y/n]
➤ YN0065: Yarn will periodically gather anonymous telemetry: https://yarnpkg.com/advanced/telemetry
➤ YN0065: Run yarn config set --home enableTelemetry 0 to disable

➤ YN0000: · Yarn 4.6.0
➤ YN0000: ┌ Resolution step
➤ YN0000: └ Completed
➤ YN0000: ┌ Fetch step
➤ YN0000: └ Completed
➤ YN0000: ┌ Link step
➤ YN0000: └ Completed
➤ YN0000: · Done in 0s 98ms
[root@e556503f99d5 app]#
```

## actual

`yarn workspaces foreach run` prefix string will mess up console, when `sudo`.

```json
"scripts": {
  "reproduce": "sudo xxx"
```

```sh
[root@e556503f99d5 app]# yarn reproduce
[hello]: Process started
[hello]: #0 building with "default" instance using docker driver
                                                                [hello]:
                                                                         [hello]: #1 [internal] load build definition from Dockerfile
                                                                                                                                     [hello]: #1 transferring dockerfile:
                                                                                                                                                                         [hello]: #1 transferring dockerfile: 163B done
                                      [hello]: #1 DONE 0.4s
                                                           [hello]:
                                                                    [hello]: #2 [internal] load metadata for public.ecr.aws/docker/library/hello-world:latest@sha256:d715f14f9eca81473d9112df50457893aa4d099adeb4729f679006bf5ea12407
                                                    [hello]: #2 DONE 0.7s
                                                                         [hello]:
                                                                                  [hello]: #3 [internal] load .dockerignore
                                                                                                                           [hello]: #3 transferring context:
                                                                                                                                                            [hello]: #3 transferring context: 2B done
                    [hello]: #3 DONE 0.4s
                                         [hello]:
                                                  [hello]: #4 [1/1] FROM public.ecr.aws/docker/library/hello-world:latest@sha256:d715f14f9eca81473d9112df50457893aa4d099adeb4729f679006bf5ea12407
                [hello]: #4 CACHED
                                  [hello]:
                                           [hello]: #5 exporting to image
                                                                         [hello]: #5 exporting layers done
                                                                                                          [hello]: #5 writing image sha256:74cc54e27dc41bb10dc4b2226072d469509f2f22f1a3ce74f4a59661a1d44602 0.0s done
                                    [hello]: #5 DONE 0.2s
                                                         [hello]: Process exited (exit code 0), completed in 0s 160ms
Done in 0s 165ms
[root@e556503f99d5 app]#
```

## expected

- `yarn workspaces foreach run` prefix string will not mess up console, when
  workaround or simulate.

- `yarn workspaces foreach run` prefix string will mess up again when disable
  deno wrapper on `sudo` output

<details>
<summary>console OK when workaround with deno wrapper on `sudo` output</summary>

```sh
[root@e556503f99d5 app]# yarn workaround
[hello]: Process started
[hello]: #0 building with "default" instance using docker driver
[hello]:
[hello]: #1 [internal] load build definition from Dockerfile
[hello]: #1 transferring dockerfile:
[hello]: #1 transferring dockerfile: 163B done
[hello]: #1 DONE 0.4s
[hello]:
[hello]: #2 [internal] load metadata for public.ecr.aws/docker/library/hello-world:latest@sha256:d715f14f9eca81473d9112df50457893aa4d099adeb4729f679006bf5ea12407
[hello]: #2 DONE 0.7s
[hello]:
[hello]: #3 [internal] load .dockerignore
[hello]: #3 transferring context:
[hello]: #3 transferring context: 2B done
[hello]: #3 DONE 0.4s
[hello]:
[hello]: #4 [1/1] FROM public.ecr.aws/docker/library/hello-world:latest@sha256:d715f14f9eca81473d9112df50457893aa4d099adeb4729f679006bf5ea12407
[hello]: #4 CACHED
[hello]:
[hello]: #5 exporting to image
[hello]: #5 exporting layers done
[hello]: #5 writing image sha256:74cc54e27dc41bb10dc4b2226072d469509f2f22f1a3ce74f4a59661a1d44602 0.0s done
[hello]: #5 DONE 0.2s
[hello]: Process exited (exit code 0), completed in 0s 734ms
Done in 0s 738ms
```

</details>

<details>
<summary>console OK when not sudo</summary>

```sh
[root@e556503f99d5 app]# yarn simulate
[hello]: Process started
[hello]: #0 building with "default" instance using docker driver
[hello]:
[hello]: #1 [internal] load build definition from Dockerfile
[hello]: #1 transferring dockerfile:
[hello]: #1 transferring dockerfile: 163B done
[hello]: #1 DONE 0.4s
[hello]:
[hello]: #2 [internal] load metadata for public.ecr.aws/docker/library/hello-world:latest@sha256:d715f14f9eca81473d9112df50457893aa4d099adeb4729f679006bf5ea12407
[hello]: #2 DONE 0.7s
[hello]:
[hello]: #3 [internal] load .dockerignore
[hello]: #3 transferring context:
[hello]: #3 transferring context: 2B done
[hello]: #3 DONE 0.4s
[hello]:
[hello]: #4 [1/1] FROM public.ecr.aws/docker/library/hello-world:latest@sha256:d715f14f9eca81473d9112df50457893aa4d099adeb4729f679006bf5ea12407
[hello]: #4 CACHED
[hello]:
[hello]: #5 exporting to image
[hello]: #5 exporting layers done
[hello]: #5 writing image sha256:74cc54e27dc41bb10dc4b2226072d469509f2f22f1a3ce74f4a59661a1d44602 0.0s done
[hello]: #5 DONE 0.2s
[hello]: Process exited (exit code 0), completed in 0s 91ms
Done in 0s 95ms
```

</details>

<details>
<summary>console messup when disable deno wrapper on `sudo` output</summary>

```sh
# DISABLE_WORKAROUND=1 yarn workaround
[hello]: Process started
[hello]: #0 building with "default" instance using docker driver
                                                                [hello]:
                                                                         [hello]: #1 [internal] load build definition from Dockerfile
                                                                                                                                     [hello]: #1 transferring dockerfile:
           [hello]: #1 transferring dockerfile: 163B done
                                                         [hello]: #1 DONE 0.4s
                                                                              [hello]:
                                                                                       [hello]: #2 [internal] load metadata for public.ecr.aws/docker/library/hello-world:latest@sha256:d715f14f9eca81473d9112df50457893aa4d099adeb4729f679006bf5ea12407
                                                                                          [hello]: #2 DONE 0.7s
                                                                                                               [hello]:
                                                                                                                        [hello]: #3 [internal] load .dockerignore
   [hello]: #3 transferring context:
                                    [hello]: #3 transferring context: 2B done
                                                                             [hello]: #3 DONE 0.4s
                                                                                                  [hello]:
                                                                                                           [hello]: #4 [1/1] FROM public.ecr.aws/docker/library/hello-world:latest@sha256:d715f14f9eca81473d9112df50457893aa4d099adeb4729f679006bf5ea12407
                                                                                            [hello]: #4 CACHED
                                                                                                              [hello]:
                                                                                                                       [hello]: #5 exporting to image
                                                                                                                                                     [hello]: #5 exporting layers done
                        [hello]: #5 writing image sha256:74cc54e27dc41bb10dc4b2226072d469509f2f22f1a3ce74f4a59661a1d44602 0.0s done
                                                                                                                                   [hello]: #5 DONE 0.2s
                                                                                                                                                        [hello]: Process exited (exit code 0), completed in 0s 155ms
Done in 0s 160ms
```

</details>
