<script>
    import { beforeUpdate, afterUpdate, onMount } from "svelte";

    export let code;

    const tokenColors = {
        keyword1: "5499D2",
        keyword2: "C586C0",
        ident: "9CDCFE",
        closure: "4EC9B0",
        call: "DCDCAA",
        string: "CE9178",
        number: "B5CEA8",
        default: "D4D4D4",
    };

    let parsedTokens = [];
    let token = {
        position: {
            line: 0
        }
    };

    function updateCode() {
        const lexer = Snekky.tokenizeString("test.snek", code);
        parsedTokens = [];
        token = lexer.readToken();
        while (token.type.toString() !== "Eof") {
            let color = tokenColors.default;
            switch (token.type.toString().toLowerCase()) {
                case "let":
                case "mut":
                case "in":
                case "true":
                case "false":
                case "null":
                case "function":
                    color = tokenColors.keyword1;
                    break;
                case "if":
                case "else":
                case "while":
                case "break":
                case "continue":
                case "return":
                case "for":
                case "when":
                case "import":
                    color = tokenColors.keyword2;
                    break;
                case "ident":
                    if (/^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/.test(token.literal)) {
                        color = tokenColors.closure;
                    } else if (lexer.peekToken().type.toString() == "LParen") {
                        color = tokenColors.call;
                    } else {
                        color = tokenColors.ident;
                    }
                    break;
                case "string":
                    color = tokenColors.string;
                    break;
                case "number":
                    color = tokenColors.number;
                    break;
            }

            parsedTokens.push({
                value: `${code.substr(
                    token.position.position,
                    token.literal.length
                )}${code.substring(
                    token.position.position + token.literal.length,
                    lexer.peekToken().position.position
                )}`,
                color: color,
            });

            token = lexer.readToken();
        }
    }

    onMount(updateCode);
    beforeUpdate(updateCode);
    afterUpdate(updateCode);
</script>

<pre
    class="editor">
    <div class="lines">
        {#each {length: token.position.line} as _, i}
            <div class="line">{i + 1}</div>
        {/each}
    </div>

    <div class="content">
        {#each parsedTokens as token}
            <span class="token" style="color: #{token.color};">{token.value}</span>
        {/each}
    </div>
</pre>

<style>
    .editor {
        height: 1*;
        width: 1*;
        padding: 10px;
        flow: horizontal;
        overflow: auto;
    }

    .line,
    .token {
        font-family: "Consolas";
        font-size: 14px;
    }

    .line {
        text-align: right;
        color: white;
        color: #858585;
        padding: 0 15px 0 5px;
    }
</style>
