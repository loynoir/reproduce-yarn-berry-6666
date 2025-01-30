async function cp_output_workaround(cp: Deno.ChildProcess) {
    await Promise.all([
        (async () => {
            for await (const el of cp.stdout) {
                Deno.stdout.write(el);
            }
        })(),
        (async () => {
            for await (const el of cp.stderr) {
                Deno.stderr.write(el);
            }
        })(),
    ]);
}

const command = new Deno.Command("sudo", {
    args: ["node", "./simulate.mjs"],
    stdout: "piped",
    stderr: "piped",
});
const cp = command.spawn();
await cp_output_workaround(cp);
await cp.output();
