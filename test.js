import chai from 'chai';  
import chaiHttp from 'chai-http';  
import server from './server.js';  

const { expect } = chai;  
chai.use(chaiHttp);  

describe('Servidor Node.js', () => {    
    it('debería responder con ¡Hola, mundo!', (done) => {  
    chai.request(server)  
        .get('/')  
        .end((err, res) => {  
        expect(res).to.have.status(200);  
        expect(res.text).to.equal('¡Hola, mundo!\n');  
        done();  
        });  
    });  
});