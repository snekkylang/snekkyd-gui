import { fs, spawn, tmpdir } from "@sys";
import { decode } from "@sciter";

window.fs = fs;
window.spawn = spawn;
window.tmpdir = tmpdir;

window.readPipe = async (pipe) => {
    let out = [];

    try {
        while (pipe) {
            var buffer = await pipe.read();
            if (buffer.byteLength == 0)
                break;
            var text = decode(buffer);
            out = text.split(/\r?\n/);
        }
    } catch (e) {
        console.log(e);
    }

    return out;
}