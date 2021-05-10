function dropZone(params) {
    const container = params.container;
    const filter = container.getAttribute("accept-drop") || params.filter || "*";
    const callback = params.ondrop;

    if (!(container instanceof Element))
        throw "no container";

    const REGEXP_PARTS = /(\*|\?)/g;
    var extensions = filter.split(";");
    extensions = extensions.map((mask) => new RegExp(mask.replace(REGEXP_PARTS, '\.$1')));

    var files = [];

    function checkFiles(list) {
        if (!Array.isArray(list)) {
            list = [list];
        }
        function flt(fn) {
            for (let x of extensions) {
                if (x.test(fn))
                    return true;
            }
            return false;
        }
        files = list.filter(flt);
        return files.length > 0;
    }

    container.on("dragaccept", function (evt) {
        var detail = evt.detail;
        if ((detail.dataType == "file") && checkFiles(detail.data)) {
            evt.stopPropagation();
        }
    });

    container.on("drag", function (evt) {
        evt.stopPropagation();
    });

    container.on("drop", function (evt) {
        if (files.length) {
            callback(files);
        }
        evt.stopPropagation();
    });
}