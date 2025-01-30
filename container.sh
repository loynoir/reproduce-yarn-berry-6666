#!/bin/bash

set -euxo pipefail

img=public.ecr.aws/docker/library/archlinux:latest@sha256:812644fa7bb7790deb91c55fb694461706103288dead4395694efad4b0bf0212
docker run --rm -it -v /var/run/docker.sock:/var/run/docker.sock -v "$PWD":/app -w /app --entrypoint /bin/bash "$img"
