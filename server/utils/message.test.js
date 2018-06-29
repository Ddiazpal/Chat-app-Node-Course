var expect = require('expect');
    
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=>{
    it('Should generate the correct message object', ()=>{
        var from = "jen";
        var text = "some message here";
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});

describe('generateLocationMessage', () => {
    it('Should generate correct location object', ()=>{
        var from = 'dev';
        var latitude = 15;
        var longitude = 19;
        var url = `https://www.google.com/maps?q=15,19`
        var message = generateLocationMessage(from, latitude, longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    });
});