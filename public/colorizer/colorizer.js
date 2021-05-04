
export function colorize() {
    const isEditor = this.tag == "plaintext";

    var me = this;

    function highlight() {
        var tz = new Tokenizer(me, "script");

        const keywords1 = {
            "let": true,
            "mut": true,
            "in": true,
            "true": true,
            "false": true,
            "null": true,
            "func": true
        };

        const keywords2 = {
            "if": true,
            "else": true,
            "while": true,
            "break": true,
            "continue": true,
            "return": true,
            "for": true,
            "when": true,
            "import": true
        };

        var tt;

        while (tt = tz.nextToken()) {
            switch (tt) {
                case "number": {
                    tz.tokenRange.highlight("number");

                    break;
                }
                case "string": {
                    tz.tokenRange.highlight("string");
                    break;
                }
                case "name": {
                    const val = tz.tokenValue;

                    if (/^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/.test(val)) {
                        tz.tokenRange.highlight("closure");
                    } else if (keywords1[val]) {
                        tz.tokenRange.highlight("keyword1");
                    } else if (keywords2[val]) {
                        tz.tokenRange.highlight("keyword2");
                    } else {
                        tz.tokenRange.highlight("ident");
                    }

                    break;
                }
                case "comment": {
                    tz.tokenRange.highlight("comment");
                    break;
                }
            }
        }
    }

    highlight();

    Object.defineProperty(me, "value", {
        get: () => me.state.value,
        set: value => {
            me.state.value = value.replaceAll("\r\n", "\n");

            highlight();
        }
    });


    let changeHandler;

    me.onChange = handler => {
        changeHandler = handler;
    }

    if (isEditor) {
        this.on("change", () => {
            changeHandler(me.value);
            this.timer(40, highlight); 
        });
    }
}