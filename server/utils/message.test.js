var expect = require('expect');
    
var {generateMessage} = require('./message');

describe('generateMessage', ()=>{
    it('Should generate the correct message object', ()=>{
        var from = "jen";
        var text = "some message here";
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});