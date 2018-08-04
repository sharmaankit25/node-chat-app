var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage',()=>{
  it('Should generate the correct message object',()=>{
    var from = 'JEN';
    var text = 'Some message';
    var message = generateMessage(from,text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,text});
  });
});

describe('generateLocationMessage',()=>{
  it('should generate correct location object',()=>{
    var latitude = 15;
    var longitude = 19;
    var from = 'JEN';
    var url = `https://www.google.com/maps/@${latitude},${longitude},16z`;
    var message = generateLocationMessage(from,latitude,longitude);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,url});
  });
});
