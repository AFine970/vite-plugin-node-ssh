# vite-plugin-node-ssh Power by [node-ssh](https://www.npmjs.com/package/node-ssh)

> This vite plugin can help you use `node-ssh` to connect your machine after build. You can upload dist and deploy by ssh, and so on.

## Install

```bash
npm i vite-plugin-node-ssh -D
# or
pnpm i vite-plugin-node-ssh -D
```

## Usage

```ts
// vite.config.ts

import { defineConfig } from "vite";
import { vitePluginNodeSsh, NodeSSh } from "vite-plugin-node-ssh";

export default defineConfig({
  plugins: [
    vitePluginNodeSsh({
      config: {
        host: "localhost",
        username: "steel",
        port: 8089,
        password: 1,
      },
      callback: async (ssh: NodeSSH) => {
        // Command
        await ssh
          .execCommand("hh_client --json", { cwd: "/var/www" })
          .then(function (result) {
            console.log("STDOUT: " + result.stdout);
            console.log("STDERR: " + result.stderr);
          });
        // Command with escaped params
        await ssh
          .exec("hh_client", ["--json"], {
            cwd: "/var/www",
            stream: "stdout",
            options: { pty: true },
          })
          .then(function (result) {
            console.log("STDOUT: " + result);
          });
      },
    }),
  ],
});
```

For more api about ssh, please check [**node-ssh**](https://www.npmjs.com/package/node-ssh)
