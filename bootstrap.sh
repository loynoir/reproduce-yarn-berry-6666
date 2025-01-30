#!/bin/bash

set -euxo pipefail

pacman -Sy --disable-sandbox \
    && pacman --noconfirm -S nodejs sudo deno \
    && corepack enable \
    && yarn
