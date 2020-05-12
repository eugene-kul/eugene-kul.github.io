function loadModal() {
    function paramToObj(name, value = '') {
        if (typeof value == 'object') return value

        try {
            return JSON.parse(JSON.stringify(eval("({" + value + "})")))
        }
        catch (e) {
            throw new Error('Error parsing the '+name+' attribute value. ' + e)
        }
    }

    let el = $(this);
        name = el.data('modal-name'),
        param = el.data('modal-param') !== undefined ? el.data('modal-param') : '',
        content_id = el.data('modal-content') !== undefined ? el.data('modal-content') : 'modal_content',
        parts = name.split("::");

    if (parts.length > 1) {
        let componentName = parts.shift(),
            modalName = parts.shift();

        $('#' + content_id).html('');
        el.request(componentName+'::onGetModal', {
            data: {
                'modal-name': modalName,
                'modal-params': paramToObj('modal-params', param),
                'modal-content': content_id
            }
        });
    }
}

$(function () {
    $(this).on('click', '.modal--js', loadModal);
});
