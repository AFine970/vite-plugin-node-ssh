import type { Plugin } from "vite";
import type { Config } from "node-ssh";
import { NodeSSH } from "node-ssh";

interface UserConfig {
  config: Config;
  callback: (ssh: NodeSSH) => Promise<void>;
}

export { NodeSSH };

export function vitePluginNodeSsh({ config, callback }: UserConfig): Plugin {
  const ssh = new NodeSSH();
  return {
    name: "vite-plugin-node-ssh",
    apply: "build",
    closeBundle: async () => {
      try {
        await ssh.connect(config);
        await callback(ssh);
        await ssh.dispose();
      } catch (error) {
        console.error(error);
        process.exit(-1);
      }
    },
  };
}
