const qrcode = require('qrcode-terminal');

module.exports = {
    name: 'qr',
    execute(client) {
        qrcode.generate(qr, { small: true });
    }
}