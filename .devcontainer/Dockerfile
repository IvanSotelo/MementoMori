FROM mcr.microsoft.com/devcontainers/typescript-node:20
ENV PNPM_HOME=/app/pnpm
RUN corepack enable pnpm
COPY . /app

WORKDIR /app

# COPY pnpm-lock.yaml ./

# # optional: only needed if you've patched any packages
# COPY patches patches    

# # pre-loads required packages from pnpm-lock.yaml into the store,
# # ready to be installed with `pnpm install`
RUN pnpm config set store-dir /home/node/.local/share/pnpm/store